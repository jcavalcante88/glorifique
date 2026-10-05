import Link from "next/link";
import { categoria } from "@/lib/categorias";

function minutos(seg) {
  if (!seg) return null;
  return `${Math.floor(seg / 60)}:${String(seg % 60).padStart(2, "0")}`;
}

export default function TestemunhoCard({ t }) {
  const cat = categoria(t.categoria);
  return (
    <Link href={`/testemunhos/${t.id}`} className="text-decoration-none text-reset d-block h-100">
      <article className="cartao cartao-hover p-3 h-100 revelar">
        <div className="testemunho-thumb mb-3">
          {/* #t=0.5 mostra um quadro do vídeo como capa, sem baixar o vídeo inteiro */}
          <video src={`${t.videoUrl}#t=0.5`} preload="metadata" muted playsInline />
          <span className="play"><i className="bi bi-play-circle-fill" /></span>
          {t.duracaoSeg && (
            <span className="position-absolute bottom-0 end-0 m-2 badge bg-dark bg-opacity-75">
              {minutos(t.duracaoSeg)}
            </span>
          )}
        </div>
        <span className="selo mb-2" style={{ "--cor": cat.cor }}>
          <i className={`bi ${cat.icone}`} /> {cat.nome}
        </span>
        <h3 className="h5 mt-2 mb-1">{t.titulo}</h3>
        <p className="text-suave small mb-0">
          {t.autorNome || "Anônimo"} · <i className="bi bi-eye" /> {t.visualizacoes}
        </p>
      </article>
    </Link>
  );
}
