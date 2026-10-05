import Link from "next/link";
import { redirect } from "next/navigation";
import { desc, eq } from "drizzle-orm";
import { auth } from "@/auth";
import { db } from "@/db";
import { testemunhos, pedidosConversa, users } from "@/db/schema";
import { categoria } from "@/lib/categorias";
import { marcarRespondido } from "@/app/acoes";

export const metadata = { title: "Meu painel" };

const STATUS = {
  pendente: ["Em revisão", "warning"],
  aprovado: ["Publicado", "success"],
  rejeitado: ["Não aprovado", "danger"],
};

export default async function Painel() {
  const sessao = await auth();
  if (!sessao?.user) redirect("/entrar");
  const eu = sessao.user;

  const meus = await db
    .select()
    .from(testemunhos)
    .where(eq(testemunhos.autorId, eu.id))
    .orderBy(desc(testemunhos.criadoEm));

  const pedidos = await db
    .select({
      id: pedidosConversa.id,
      mensagem: pedidosConversa.mensagem,
      status: pedidosConversa.status,
      criadoEm: pedidosConversa.criadoEm,
      titulo: testemunhos.titulo,
      nome: users.name,
      email: users.email,
    })
    .from(pedidosConversa)
    .innerJoin(testemunhos, eq(pedidosConversa.testemunhoId, testemunhos.id))
    .innerJoin(users, eq(pedidosConversa.solicitanteId, users.id))
    .where(eq(testemunhos.autorId, eu.id))
    .orderBy(desc(pedidosConversa.criadoEm));

  return (
    <section className="container py-5">
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
        <div>
          <h1 className="display-6 m-0">Olá, {(eu.name || "irmão(ã)").split(" ")[0]} 👋</h1>
          <p className="text-suave m-0">Acompanhe seus testemunhos e quem quer conversar com você.</p>
        </div>
        <Link href="/enviar" className="btn btn-ouro rounded-pill px-4"><i className="bi bi-plus-lg me-1" />Novo testemunho</Link>
      </div>

      <div className="row g-4">
        <div className="col-lg-6">
          <div className="cartao p-4 h-100">
            <h2 className="h4 mb-3"><i className="bi bi-camera-reels text-ouro me-2" />Meus testemunhos</h2>
            {meus.length === 0 && <p className="text-suave">Você ainda não enviou nenhum testemunho.</p>}
            <ul className="list-unstyled m-0 d-grid gap-3">
              {meus.map((t) => {
                const [rotulo, cor] = STATUS[t.status] ?? STATUS.pendente;
                return (
                  <li key={t.id} className="d-flex justify-content-between align-items-start gap-2 border-bottom pb-3">
                    <div>
                      <div className="fw-semibold">{t.titulo}</div>
                      <small className="text-suave">{categoria(t.categoria).nome} · <i className="bi bi-eye" /> {t.visualizacoes}</small>
                    </div>
                    <span className={`badge text-bg-${cor}`}>{rotulo}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="cartao p-4 h-100">
            <h2 className="h4 mb-3"><i className="bi bi-chat-heart text-ouro me-2" />Pedidos de conversa</h2>
            {pedidos.length === 0 && <p className="text-suave">Nenhum pedido ainda.</p>}
            <ul className="list-unstyled m-0 d-grid gap-3">
              {pedidos.map((p) => (
                <li key={p.id} className="border-bottom pb-3">
                  <div className="d-flex justify-content-between">
                    <strong>{p.nome || "Alguém"}</strong>
                    {p.status === "respondido" ? <span className="badge text-bg-secondary">Respondido</span> : <span className="badge text-bg-warning">Novo</span>}
                  </div>
                  <small className="text-suave d-block mb-1">Sobre: {p.titulo}</small>
                  <p className="mb-2" style={{ whiteSpace: "pre-line" }}>{p.mensagem}</p>
                  <div className="d-flex gap-2">
                    {p.email && (
                      <a className="btn btn-sm btn-contorno" href={`mailto:${p.email}?subject=${encodeURIComponent("Sobre meu testemunho no Glorifique")}`}>
                        <i className="bi bi-envelope me-1" />Responder por e-mail
                      </a>
                    )}
                    {p.status !== "respondido" && (
                      <form action={marcarRespondido}>
                        <input type="hidden" name="id" value={p.id} />
                        <button className="btn btn-sm btn-outline-success"><i className="bi bi-check2" /> Marcar respondido</button>
                      </form>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
