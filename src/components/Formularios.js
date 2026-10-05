"use client";
import { useActionState } from "react";
import { pedirConversa, denunciar } from "@/app/acoes";

function Aviso({ estado }) {
  if (estado?.erro) return <div className="alert alert-danger small py-2 mt-2">{estado.erro}</div>;
  if (estado?.ok) return <div className="alert alert-success small py-2 mt-2">{estado.ok}</div>;
  return null;
}

export function FormConversa({ testemunhoId, autor }) {
  const [estado, acao, enviando] = useActionState(pedirConversa, null);
  if (estado?.ok) return <Aviso estado={estado} />;
  return (
    <form action={acao}>
      <input type="hidden" name="testemunhoId" value={testemunhoId} />
      <label htmlFor="mensagem" className="form-label small text-suave">
        Conte para {autor} um pouco do que você está vivendo:
      </label>
      <textarea id="mensagem" name="mensagem" className="form-control mb-2" rows={4}
        minLength={10} maxLength={500} required placeholder="Oi! Vi seu testemunho e estou passando por algo parecido..." />
      <button className="btn btn-ouro w-100" disabled={enviando}>
        {enviando ? <span className="spinner-border spinner-border-sm" /> : <><i className="bi bi-chat-heart me-2" />Quero conversar</>}
      </button>
      <Aviso estado={estado} />
    </form>
  );
}

export function FormDenuncia({ testemunhoId }) {
  const [estado, acao, enviando] = useActionState(denunciar, null);
  if (estado?.ok) return <Aviso estado={estado} />;
  return (
    <details className="small">
      <summary className="text-suave" style={{ cursor: "pointer" }}><i className="bi bi-flag me-1" />Denunciar conteúdo</summary>
      <form action={acao} className="mt-2">
        <input type="hidden" name="testemunhoId" value={testemunhoId} />
        <input name="motivo" className="form-control form-control-sm mb-2" minLength={5} maxLength={300} required placeholder="Qual o problema?" />
        <button className="btn btn-sm btn-outline-danger" disabled={enviando}>Enviar denúncia</button>
        <Aviso estado={estado} />
      </form>
    </details>
  );
}
