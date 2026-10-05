import { redirect } from "next/navigation";
import { auth } from "@/auth";
import FormEnvio from "@/components/FormEnvio";

export const metadata = { title: "Contar minha história" };

export default async function Enviar() {
  const sessao = await auth();
  if (!sessao?.user) redirect("/entrar");

  return (
    <section className="container py-5" style={{ maxWidth: 760 }}>
      <h1 className="display-6">Conte o que Jesus fez na sua vida</h1>
      <p className="text-suave mb-4">
        Grave um vídeo de 1 a 3 minutos. Seja natural: fale como estava antes, o que aconteceu e como está hoje.
      </p>
      <div className="row g-3 mb-4 small">
        {[
          ["bi-brightness-high", "Grave em lugar iluminado"],
          ["bi-mic", "Evite barulho ao fundo"],
          ["bi-phone-landscape", "Celular na horizontal"],
        ].map(([icone, texto]) => (
          <div className="col-md-4" key={texto}>
            <div className="cartao p-3 d-flex align-items-center gap-2"><i className={`bi ${icone} text-ouro fs-5`} />{texto}</div>
          </div>
        ))}
      </div>
      <FormEnvio />
    </section>
  );
}
