import Link from "next/link";
import { and, desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { testemunhos, users } from "@/db/schema";
import { CATEGORIAS, SLUGS, categoria as acharCategoria } from "@/lib/categorias";
import TestemunhoCard from "@/components/TestemunhoCard";

export const dynamic = "force-dynamic";
export const metadata = { title: "Testemunhos" };

export default async function Testemunhos({ searchParams }) {
  const { categoria } = await searchParams;
  const filtro = SLUGS.includes(categoria) ? categoria : null;

  const lista = await db
    .select({
      id: testemunhos.id,
      titulo: testemunhos.titulo,
      categoria: testemunhos.categoria,
      videoUrl: testemunhos.videoUrl,
      duracaoSeg: testemunhos.duracaoSeg,
      visualizacoes: testemunhos.visualizacoes,
      autorNome: users.name,
    })
    .from(testemunhos)
    .innerJoin(users, eq(testemunhos.autorId, users.id))
    .where(
      filtro
        ? and(eq(testemunhos.status, "aprovado"), eq(testemunhos.categoria, filtro))
        : eq(testemunhos.status, "aprovado")
    )
    .orderBy(desc(testemunhos.criadoEm))
    .limit(60);

  return (
    <section className="container py-5">
      <h1 className="display-5 mb-2">
        {filtro ? acharCategoria(filtro).nome : "Todos os testemunhos"}
      </h1>
      <p className="text-suave mb-4">Escolha uma situação para ver histórias de quem já passou por ela.</p>

      <div className="d-flex flex-wrap gap-2 mb-5">
        <Link href="/testemunhos" className={`btn btn-sm rounded-pill ${!filtro ? "btn-ouro" : "btn-contorno"}`}>
          Todos
        </Link>
        {CATEGORIAS.map((c) => (
          <Link
            key={c.slug}
            href={`/testemunhos?categoria=${c.slug}`}
            className={`btn btn-sm rounded-pill ${filtro === c.slug ? "btn-ouro" : "btn-contorno"}`}
          >
            <i className={`bi ${c.icone} me-1`} /> {c.nome}
          </Link>
        ))}
      </div>

      {lista.length ? (
        <div className="row g-4">
          {lista.map((t) => (
            <div className="col-md-6 col-lg-4" key={t.id}><TestemunhoCard t={t} /></div>
          ))}
        </div>
      ) : (
        <div className="cartao p-5 text-center">
          <i className="bi bi-hourglass-split display-5 text-ouro" />
          <p className="lead mt-3 mb-3">Ainda não há testemunhos aqui. O seu pode ser o primeiro.</p>
          <Link href="/enviar" className="btn btn-ouro rounded-pill px-4">Contar minha história</Link>
        </div>
      )}
    </section>
  );
}
