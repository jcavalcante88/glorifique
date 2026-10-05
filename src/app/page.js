import Link from "next/link";
import { desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { testemunhos, users } from "@/db/schema";
import { CATEGORIAS } from "@/lib/categorias";
import TestemunhoCard from "@/components/TestemunhoCard";
import Particulas from "@/components/Particulas";

export const dynamic = "force-dynamic";

async function recentes() {
  try {
    return await db
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
      .where(eq(testemunhos.status, "aprovado"))
      .orderBy(desc(testemunhos.criadoEm))
      .limit(6);
  } catch {
    return [];
  }
}

export default async function Inicio() {
  const lista = await recentes();

  return (
    <>
      {/* ---------- HERO ---------- */}
      <section className="hero text-center">
        <div className="hero-raios" aria-hidden="true" />
        <Particulas />
        <div className="container position-relative">
          <img src="/logo.png" alt="" className="hero-pomba mb-4 rounded-4" />
          <h1 className="titulo-gloria mb-3">
            Você não ouve uma teoria.<br />Ouve alguém igual a você.
          </h1>
          <p className="lead text-suave mx-auto mb-4" style={{ maxWidth: 640 }}>
            Histórias reais, em vídeos curtos, de pessoas que tiveram a vida transformada por Jesus.
            Encontre quem passou pelo mesmo que você — e converse com ela.
          </p>
          <div className="d-flex flex-wrap justify-content-center gap-3">
            <Link href="/testemunhos" className="btn btn-ouro btn-lg rounded-pill px-4">
              <i className="bi bi-play-fill me-1" /> Assistir testemunhos
            </Link>
            <Link href="/enviar" className="btn btn-contorno btn-lg rounded-pill px-4">
              <i className="bi bi-camera-video me-1" /> Contar minha história
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- O QUE VOCÊ ESTÁ VIVENDO? ---------- */}
      <section className="container py-5">
        <div className="text-center mb-4 revelar">
          <p className="text-ouro fw-bold text-uppercase small mb-1">Encontre sua história</p>
          <h2 className="display-6">O que você está vivendo hoje?</h2>
        </div>
        <div className="row g-3">
          {CATEGORIAS.map((c, i) => (
            <div className="col-6 col-md-4 col-lg-3" key={c.slug}>
              <Link
                href={`/testemunhos?categoria=${c.slug}`}
                className="cartao cartao-hover categoria-chip revelar"
                style={{ "--cor": c.cor, transitionDelay: `${(i % 4) * 70}ms` }}
              >
                <i className={`bi ${c.icone}`} />
                <span className="fw-semibold">{c.nome}</span>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- RECENTES ---------- */}
      <section className="container py-5">
        <div className="d-flex justify-content-between align-items-end mb-4 revelar">
          <div>
            <p className="text-ouro fw-bold text-uppercase small mb-1">Novos testemunhos</p>
            <h2 className="display-6 m-0">Vidas transformadas</h2>
          </div>
          <Link href="/testemunhos" className="text-ouro text-decoration-none fw-semibold">
            Ver todos <i className="bi bi-arrow-right" />
          </Link>
        </div>
        {lista.length ? (
          <div className="row g-4">
            {lista.map((t) => (
              <div className="col-md-6 col-lg-4" key={t.id}><TestemunhoCard t={t} /></div>
            ))}
          </div>
        ) : (
          <div className="cartao p-5 text-center revelar">
            <i className="bi bi-camera-reels display-4 text-ouro" />
            <p className="lead mt-3 mb-3">Seja a primeira pessoa a contar o que Deus fez na sua vida.</p>
            <Link href="/enviar" className="btn btn-ouro rounded-pill px-4">Enviar meu testemunho</Link>
          </div>
        )}
      </section>

      {/* ---------- COMO FUNCIONA ---------- */}
      <section className="container py-5">
        <h2 className="display-6 text-center mb-5 revelar">Como funciona</h2>
        <div className="row g-4">
          {[
            ["Grave", "Um vídeo de 1 a 3 minutos, do seu celular, contando como Jesus mudou sua vida.", "bi-phone"],
            ["Compartilhe", "Escolha a situação que você viveu. Nossa equipe revisa com carinho antes de publicar.", "bi-send"],
            ["Converse", "Quem está passando pelo mesmo pode pedir para conversar com você, se você permitir.", "bi-chat-heart"],
          ].map(([titulo, texto, icone], i) => (
            <div className="col-md-4" key={titulo}>
              <div className="cartao p-4 h-100 revelar" style={{ transitionDelay: `${i * 120}ms` }}>
                <div className="d-flex align-items-center gap-3 mb-3">
                  <span className="passo-numero">{i + 1}</span>
                  <i className={`bi ${icone} fs-3 text-ouro`} />
                </div>
                <h3 className="h4">{titulo}</h3>
                <p className="text-suave mb-0">{texto}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- DOAÇÃO ---------- */}
      <section className="container py-5">
        <div className="cartao p-4 p-md-5 text-center revelar" style={{ background: "linear-gradient(135deg, rgba(243,201,105,.12), rgba(255,255,255,.02))" }}>
          <i className="bi bi-heart-fill text-danger fs-1" />
          <h2 className="mt-3">Ajude a levar esperança a mais pessoas</h2>
          <p className="text-suave mx-auto" style={{ maxWidth: 560 }}>
            Sua doação mantém os servidores, o armazenamento dos vídeos e a equipe de moderação.
          </p>
          <Link href="/doar" className="btn btn-ouro btn-lg rounded-pill px-4 mt-2">
            <i className="bi bi-qr-code me-1" /> Doar com Pix
          </Link>
        </div>
      </section>
    </>
  );
}
