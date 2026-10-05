"use client";
import { useActionState, useState } from "react";
import { upload } from "@vercel/blob/client";
import { enviarTestemunho } from "@/app/acoes";
import { CATEGORIAS } from "@/lib/categorias";

const TIPOS = ["video/mp4", "video/webm", "video/quicktime"];
const MAX_MB = 150;
const MAX_SEG = 240; // 4 min de tolerância

function lerDuracao(arquivo) {
  return new Promise((resolve) => {
    const v = document.createElement("video");
    v.preload = "metadata";
    v.onloadedmetadata = () => { URL.revokeObjectURL(v.src); resolve(Math.round(v.duration)); };
    v.onerror = () => resolve(null);
    v.src = URL.createObjectURL(arquivo);
  });
}

export default function FormEnvio() {
  const [estado, acao, salvando] = useActionState(enviarTestemunho, null);
  const [video, setVideo] = useState(null); // { url, duracao }
  const [progresso, setProgresso] = useState(0);
  const [erroVideo, setErroVideo] = useState("");
  const [enviandoVideo, setEnviandoVideo] = useState(false);

  async function escolherVideo(e) {
    const arquivo = e.target.files?.[0];
    setErroVideo("");
    setVideo(null);
    if (!arquivo) return;

    if (!TIPOS.includes(arquivo.type)) return setErroVideo("Envie um vídeo MP4, WEBM ou MOV.");
    if (arquivo.size > MAX_MB * 1024 * 1024) return setErroVideo(`O vídeo passa de ${MAX_MB} MB.`);

    const duracao = await lerDuracao(arquivo);
    if (duracao && duracao > MAX_SEG) return setErroVideo("O vídeo deve ter no máximo 3 minutos.");
    if (duracao && duracao < 10) return setErroVideo("O vídeo está muito curto.");

    try {
      setEnviandoVideo(true);
      const extensao = arquivo.name.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") || "mp4";
      const blob = await upload(`testemunhos/video.${extensao}`, arquivo, {
        access: "public",
        handleUploadUrl: "/api/upload",
        contentType: arquivo.type,
        onUploadProgress: ({ percentage }) => setProgresso(Math.round(percentage)),
      });
      setVideo({ url: blob.url, duracao });
    } catch (err) {
      setErroVideo(err.message || "Falha ao enviar o vídeo.");
    } finally {
      setEnviandoVideo(false);
    }
  }

  if (estado?.ok) {
    return (
      <div className="cartao p-5 text-center">
        <i className="bi bi-check-circle display-3 text-success" />
        <h2 className="h3 mt-3">Glória a Deus!</h2>
        <p className="text-suave">{estado.ok}</p>
        <a href="/painel" className="btn btn-ouro rounded-pill px-4">Ir para meu painel</a>
      </div>
    );
  }

  return (
    <form action={acao} className="cartao p-4 p-md-5">
      <div className="mb-4">
        <label className="form-label fw-semibold">1. Seu vídeo</label>
        <input type="file" accept="video/mp4,video/webm,video/quicktime" capture="user"
          className="form-control" onChange={escolherVideo} disabled={enviandoVideo} />
        {enviandoVideo && (
          <div className="progress mt-2" role="progressbar" aria-valuenow={progresso} aria-valuemin={0} aria-valuemax={100}>
            <div className="progress-bar progress-bar-striped progress-bar-animated bg-warning" style={{ width: `${progresso}%` }}>{progresso}%</div>
          </div>
        )}
        {erroVideo && <div className="text-danger small mt-2">{erroVideo}</div>}
        {video && (
          <div className="mt-3">
            <video src={video.url} controls className="w-100 rounded-3" style={{ maxHeight: 320 }} />
            <div className="text-success small mt-1"><i className="bi bi-check2-circle" /> Vídeo enviado</div>
          </div>
        )}
        <input type="hidden" name="videoUrl" value={video?.url || ""} />
        <input type="hidden" name="duracaoSeg" value={video?.duracao || ""} />
      </div>

      <div className="mb-3">
        <label htmlFor="titulo" className="form-label fw-semibold">2. Título</label>
        <input id="titulo" name="titulo" className="form-control" required minLength={5} maxLength={80}
          placeholder="Ex.: Fui liberto do álcool depois de 15 anos" />
      </div>

      <div className="mb-3">
        <label htmlFor="categoria" className="form-label fw-semibold">3. O que você viveu?</label>
        <select id="categoria" name="categoria" className="form-select" required defaultValue="">
          <option value="" disabled>Escolha uma situação</option>
          {CATEGORIAS.map((c) => <option key={c.slug} value={c.slug}>{c.nome}</option>)}
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="resumo" className="form-label fw-semibold">4. Resumo da sua história</label>
        <textarea id="resumo" name="resumo" className="form-control" rows={4} required minLength={20} maxLength={600}
          placeholder="Em poucas linhas: como era, o que aconteceu, como está hoje." />
      </div>

      <div className="form-check form-switch mb-4">
        <input className="form-check-input" type="checkbox" role="switch" id="aceitaContato" name="aceitaContato" defaultChecked />
        <label className="form-check-label" htmlFor="aceitaContato">
          Aceito que pessoas passando pelo mesmo me enviem pedidos de conversa
        </label>
      </div>

      {estado?.erro && <div className="alert alert-danger">{estado.erro}</div>}

      <button className="btn btn-ouro btn-lg w-100 rounded-pill" disabled={!video || salvando || enviandoVideo}>
        {salvando ? <span className="spinner-border spinner-border-sm" /> : <><i className="bi bi-send me-2" />Enviar testemunho</>}
      </button>
      <p className="small text-suave text-center mt-3 mb-0">
        <i className="bi bi-shield-check me-1" />Todo testemunho é revisado antes de aparecer no site.
      </p>
    </form>
  );
}
