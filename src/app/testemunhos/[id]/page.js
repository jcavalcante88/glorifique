import Link from "next/link";
import { notFound } from "next/navigation";
import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { auth } from "@/auth";
import { db } from "@/db";
import { testemunhos, users } from "@/db/schema";
import { categoria } from "@/lib/categorias";
import { contarVisualizacao } from "@/app/acoes";
import { FormConversa, FormDenuncia } from "@/components/Formularios";

export const dynamic = "force-dynamic";

async function buscar(id) {
  if (!z.string().uuid().safeParse(id).success) return null;
  const [t] = await db
    .select({
      id: testemunhos.id,
      titulo: testemunhos.titulo,
      resumo: testemunhos.resumo,
      categoria: testemunhos.categoria,
      videoUrl: testemunhos.videoUrl,
      aceitaContato: testemunhos.aceitaContato,
      visualizacoes: testemunhos.visualizacoes,
      criadoEm: testemunhos.criadoEm,
      autorId: testemunhos.autorId,
      autorNome: users.name,
      autorFoto: users.image,
    })
    .from(testemunhos)
    .innerJoin(users, eq(testemunhos.autorId, users.id))
    .where(and(eq(testemunhos.id, id), eq(testemunhos.status, "aprovado")))
    .limit(1);
  return t ?? null;
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const t = await buscar(id);
  return t ? { title: t.titulo, description: t.resumo.slice(0, 150) } : { title: "Não encontrado" };
}

export default async function Testemunho({ params }) {
  const { id } = await params;
  const t = await buscar(id);
  if (!t) notFound();

  await contarVisualizacao(t.id);
  const sessao = await auth();
  const cat = categoria(t.categoria);
  const primeiroNome = (t.autorNome || "o autor").split(" ")[0];
  const site = process.env.NEXT_PUBLIC_SITE_URL || "";
  const whatsapp = `https://wa.me/?text=${encodeURIComponent(`Veja este testemunho: "${t.titulo}" ${site}/testemunhos/${t.id}`)}`;

  return (
    <section className="container py-5">
      <Link href="/testemunhos" className="text-suave text-decoration-none small">
        <i className="bi bi-arrow-left" /> Voltar
      </Link>

      <div className="row g-4 mt-1">
        <div className="col-lg-8">
          <div className="ratio ratio-16x9 rounded-4 overflow-hidden cartao">
            <video src={t.videoUrl} controls playsInline preload="metadata" />
          </div>
          <span className="selo mt-4" style={{ "--cor": cat.cor }}>
            <i className={`bi ${cat.icone}`} /> {cat.nome}
          </span>
          <h1 className="display-6 mt-2">{t.titulo}</h1>
          <div className="d-flex align-items-center gap-2 text-suave mb-3">
            {t.autorFoto ? (
              <img src={t.autorFoto} alt="" width="32" height="32" className="rounded-circle" referrerPolicy="no-referrer" />
            ) : (
              <i className="bi bi-person-circle fs-4" />
            )}
            <span>{t.autorNome || "Anônimo"}</span>
            <span>·</span>
            <span><i className="bi bi-eye" /> {t.visualizacoes + 1}</span>
          </div>
          <p className="fs-5" style={{ whiteSpace: "pre-line" }}>{t.resumo}</p>

          <div className="d-flex flex-wrap gap-2 mt-4">
            <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-success rounded-pill">
              <i className="bi bi-whatsapp me-1" /> Compartilhar no WhatsApp
            </a>
            <Link href={`/testemunhos?categoria=${cat.slug}`} className="btn btn-contorno rounded-pill">
              Mais histórias de {cat.nome.toLowerCase()}
            </Link>
          </div>
        </div>

        <aside className="col-lg-4">
          <div className="cartao p-4 sticky-lg-top" style={{ top: 96 }}>
            <h2 className="h4"><i className="bi bi-chat-heart text-ouro me-2" />Está passando por isso?</h2>
            {!t.aceitaContato ? (
              <p className="text-suave mb-0">{primeiroNome} preferiu não receber mensagens, mas está orando por quem assiste. 🙏</p>
            ) : !sessao?.user ? (
              <>
                <p className="text-suave">Entre para conversar com {primeiroNome}. É rápido e gratuito.</p>
                <Link href="/entrar" className="btn btn-ouro w-100">Entrar para conversar</Link>
              </>
            ) : sessao.user.id === t.autorId ? (
              <p className="text-suave mb-0">Este é o seu testemunho. Os pedidos de conversa aparecem no seu <Link href="/painel">painel</Link>.</p>
            ) : (
              <FormConversa testemunhoId={t.id} autor={primeiroNome} />
            )}
            {sessao?.user && sessao.user.id !== t.autorId && (
              <div className="mt-4 pt-3 border-top"><FormDenuncia testemunhoId={t.id} /></div>
            )}
          </div>
        </aside>
      </div>
    </section>
  );
}
