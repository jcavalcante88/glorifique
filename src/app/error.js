"use client";
export default function Erro({ reset }) {
  return (
    <section className="container py-5 text-center">
      <i className="bi bi-cloud-drizzle display-3 text-ouro" />
      <h1 className="mt-3 h2">Algo não saiu como esperado</h1>
      <p className="text-suave">“Tudo coopera para o bem daqueles que amam a Deus.” — Romanos 8:28</p>
      <button onClick={() => reset()} className="btn btn-ouro rounded-pill px-4">Tentar de novo</button>
    </section>
  );
}
