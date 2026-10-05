"use server";
// Server Actions: funções que rodam SOMENTE no servidor.
// Regra de ouro: toda ação verifica login, limite de uso e valida os dados com Zod.

import { and, eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth, signIn, signOut } from "@/auth";
import { db } from "@/db";
import { testemunhos, pedidosConversa, denuncias } from "@/db/schema";
import { limites } from "@/lib/ratelimit";
import { testemunhoSchema, conversaSchema, denunciaSchema } from "@/lib/validacao";

async function exigirLogin() {
  const sessao = await auth();
  if (!sessao?.user?.id) redirect("/entrar");
  return sessao.user;
}

async function exigirAdmin() {
  const usuario = await exigirLogin();
  if (usuario.role !== "admin") throw new Error("Acesso negado");
  return usuario;
}

function primeiroErro(resultado) {
  return resultado.error.issues[0]?.message ?? "Dados inválidos";
}

/* ---------- Login / logout ---------- */

export async function entrarCom(provedor, formData) {
  const destino = "/painel";
  if (provedor === "resend") {
    const email = String(formData.get("email") || "").trim().toLowerCase();
    await signIn("resend", { email, redirectTo: destino });
    return;
  }
  if (!["google", "github"].includes(provedor)) throw new Error("Provedor inválido");
  await signIn(provedor, { redirectTo: destino });
}

export async function sair() {
  await signOut({ redirectTo: "/" });
}

/* ---------- Testemunhos ---------- */

export async function enviarTestemunho(_estado, formData) {
  const usuario = await exigirLogin();

  const { success } = await limites.envio.limit(`acao:${usuario.id}`);
  if (!success) return { erro: "Você atingiu o limite de envios por hora. Tente mais tarde." };

  const resultado = testemunhoSchema.safeParse({
    titulo: formData.get("titulo"),
    resumo: formData.get("resumo"),
    categoria: formData.get("categoria"),
    videoUrl: formData.get("videoUrl"),
    duracaoSeg: formData.get("duracaoSeg") || undefined,
    aceitaContato: formData.get("aceitaContato") === "on",
  });
  if (!resultado.success) return { erro: primeiroErro(resultado) };

  await db.insert(testemunhos).values({ ...resultado.data, autorId: usuario.id });
  revalidatePath("/painel");
  return { ok: "Testemunho enviado! Ele aparecerá no site assim que for revisado. 🙏" };
}

export async function contarVisualizacao(id) {
  await db
    .update(testemunhos)
    .set({ visualizacoes: sql`${testemunhos.visualizacoes} + 1` })
    .where(and(eq(testemunhos.id, id), eq(testemunhos.status, "aprovado")));
}

/* ---------- Quero conversar ---------- */

export async function pedirConversa(_estado, formData) {
  const usuario = await exigirLogin();

  const { success } = await limites.contato.limit(`conversa:${usuario.id}`);
  if (!success) return { erro: "Muitos pedidos em pouco tempo. Tente mais tarde." };

  const resultado = conversaSchema.safeParse({
    testemunhoId: formData.get("testemunhoId"),
    mensagem: formData.get("mensagem"),
  });
  if (!resultado.success) return { erro: primeiroErro(resultado) };

  const [t] = await db
    .select()
    .from(testemunhos)
    .where(eq(testemunhos.id, resultado.data.testemunhoId))
    .limit(1);

  if (!t || t.status !== "aprovado" || !t.aceitaContato)
    return { erro: "Esta pessoa não está recebendo pedidos de conversa." };
  if (t.autorId === usuario.id) return { erro: "Este testemunho é seu 😊" };

  await db.insert(pedidosConversa).values({
    testemunhoId: t.id,
    solicitanteId: usuario.id,
    mensagem: resultado.data.mensagem,
  });
  return { ok: "Pedido enviado! O autor verá sua mensagem no painel dele." };
}

export async function marcarRespondido(formData) {
  const usuario = await exigirLogin();
  const id = String(formData.get("id"));
  // Só o autor do testemunho pode marcar o pedido como respondido
  const [p] = await db
    .select({ id: pedidosConversa.id, autorId: testemunhos.autorId })
    .from(pedidosConversa)
    .innerJoin(testemunhos, eq(pedidosConversa.testemunhoId, testemunhos.id))
    .where(eq(pedidosConversa.id, id))
    .limit(1);
  if (!p || p.autorId !== usuario.id) throw new Error("Acesso negado");

  await db.update(pedidosConversa).set({ status: "respondido" }).where(eq(pedidosConversa.id, id));
  revalidatePath("/painel");
}

/* ---------- Denúncias ---------- */

export async function denunciar(_estado, formData) {
  const usuario = await exigirLogin();
  const { success } = await limites.contato.limit(`denuncia:${usuario.id}`);
  if (!success) return { erro: "Muitas denúncias em pouco tempo." };

  const resultado = denunciaSchema.safeParse({
    testemunhoId: formData.get("testemunhoId"),
    motivo: formData.get("motivo"),
  });
  if (!resultado.success) return { erro: primeiroErro(resultado) };

  await db.insert(denuncias).values({ ...resultado.data, denuncianteId: usuario.id });
  return { ok: "Obrigado. Nossa equipe vai analisar." };
}

/* ---------- Moderação (somente administradores) ---------- */

export async function moderar(formData) {
  await exigirAdmin();
  const id = String(formData.get("id"));
  const status = String(formData.get("status"));
  if (!["aprovado", "rejeitado", "pendente"].includes(status)) throw new Error("Status inválido");

  await db
    .update(testemunhos)
    .set({ status, moderadoEm: new Date() })
    .where(eq(testemunhos.id, id));
  revalidatePath("/admin");
  revalidatePath("/testemunhos");
  revalidatePath("/");
}

export async function resolverDenuncia(formData) {
  await exigirAdmin();
  await db
    .update(denuncias)
    .set({ resolvida: true })
    .where(eq(denuncias.id, String(formData.get("id"))));
  revalidatePath("/admin");
}
