import Link from "next/link";
export default function NaoEncontrado() {
  return (
    <section className="container py-5 text-center">
      <i className="bi bi-signpost-split display-3 text-ouro" />
      <h1 className="mt-3">Página não encontrada</h1>
      <p className="text-suave">“Eu sou o caminho, a verdade e a vida.” — João 14:6</p>
      <Link href="/" className="btn btn-ouro rounded-pill px-4">Voltar ao início</Link>
    </section>
  );
}
