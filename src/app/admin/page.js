import { redirect } from "next/navigation";
import { asc, desc, eq } from "drizzle-orm";
import { auth } from "@/auth";
import { db } from "@/db";
import { testemunhos, denuncias, users } from "@/db/schema";
import { categoria } from "@/lib/categorias";
import { moderar, resolverDenuncia } from "@/app/acoes";

export const metadata = { title: "Moderação", robots: { index: false } };

export default async function Admin() {
  const sessao = await auth();
  if (sessao?.user?.role !== "admin") redirect("/");

  const pendentes = await db
    .select({ t: testemunhos, autor: users.name, email: users.email })
    .from(testemunhos)
    .innerJoin(users, eq(testemunhos.autorId, users.id))
    .where(eq(testemunhos.status, "pendente"))
    .orderBy(asc(testemunhos.criadoEm));

  const abertas = await db
    .select({ d: denuncias, titulo: testemunhos.titulo, testemunhoId: testemunhos.id })
    .from(denuncias)
    .innerJoin(testemunhos, eq(denuncias.testemunhoId, testemunhos.id))
    .where(eq(denuncias.resolvida, false))
    .orderBy(desc(denuncias.criadoEm));

  return (
    <section className="container py-5">
      <h1 className="display-6 mb-4"><i className="bi bi-shield-check text-ouro me-2" />Moderação</h1>

      <h2 className="h4 mb-3">Aguardando revisão ({pendentes.length})</h2>
      {pendentes.length === 0 && <p className="text-suave">Nada pendente. Glória a Deus! 🙌</p>}
      <div className="row g-4 mb-5">
        {pendentes.map(({ t, autor, email }) => (
          <div className="col-lg-6" key={t.id}>
            <div className="cartao p-3 h-100">
              <video src={t.videoUrl} controls preload="metadata" className="w-100 rounded-3 mb-3" style={{ maxHeight: 300 }} />
              <span className="selo" style={{ "--cor": categoria(t.categoria).cor }}>{categoria(t.categoria).nome}</span>
              <h3 className="h5 mt-2">{t.titulo}</h3>
              <p className="small text-suave mb-1">{autor} · {email}</p>
              <p className="small" style={{ whiteSpace: "pre-line" }}>{t.resumo}</p>
              <div className="d-flex gap-2">
                <form action={moderar}>
                  <input type="hidden" name="id" value={t.id} />
                  <input type="hidden" name="status" value="aprovado" />
                  <button className="btn btn-success btn-sm"><i className="bi bi-check-lg" /> Aprovar</button>
                </form>
                <form action={moderar}>
                  <input type="hidden" name="id" value={t.id} />
                  <input type="hidden" name="status" value="rejeitado" />
                  <button className="btn btn-outline-danger btn-sm"><i className="bi bi-x-lg" /> Rejeitar</button>
                </form>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2 className="h4 mb-3">Denúncias abertas ({abertas.length})</h2>
      {abertas.length === 0 && <p className="text-suave">Nenhuma denúncia.</p>}
      <ul className="list-unstyled d-grid gap-2">
        {abertas.map(({ d, titulo, testemunhoId }) => (
          <li key={d.id} className="cartao p-3 d-flex flex-wrap justify-content-between align-items-center gap-2">
            <div>
              <a href={`/testemunhos/${testemunhoId}`} target="_blank" className="fw-semibold">{titulo}</a>
              <div className="small text-suave">{d.motivo}</div>
            </div>
            <div className="d-flex gap-2">
              <form action={moderar}>
                <input type="hidden" name="id" value={testemunhoId} />
                <input type="hidden" name="status" value="rejeitado" />
                <button className="btn btn-outline-danger btn-sm">Tirar do ar</button>
              </form>
              <form action={resolverDenuncia}>
                <input type="hidden" name="id" value={d.id} />
                <button className="btn btn-outline-secondary btn-sm">Ignorar</button>
              </form>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
