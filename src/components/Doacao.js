"use client";
import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { gerarPix, PIX } from "@/lib/pix";

const VALORES = [10, 25, 50, 100];

export default function Doacao() {
  const [valor, setValor] = useState(null); // null = a pessoa digita no app do banco
  const [outro, setOutro] = useState("");
  const [qr, setQr] = useState("");
  const [copiado, setCopiado] = useState("");

  const valorFinal = outro ? Number(outro.replace(",", ".")) : valor;
  const codigo = gerarPix({ ...PIX, valor: valorFinal > 0 ? valorFinal : null, mensagem: "Doacao Glorifique" });

  useEffect(() => {
    QRCode.toDataURL(codigo, { width: 280, margin: 1, color: { dark: "#0b1026", light: "#ffffff" } })
      .then(setQr)
      .catch(() => setQr(""));
  }, [codigo]);

  async function copiar(texto, qual) {
    await navigator.clipboard.writeText(texto);
    setCopiado(qual);
    setTimeout(() => setCopiado(""), 2500);
  }

  return (
    <div className="row g-4 align-items-center">
      <div className="col-md-5 text-center">
        <div className="qr-moldura">
          {qr ? <img src={qr} alt="QR Code Pix para doação" width="260" height="260" /> : <div style={{ width: 260, height: 260 }} />}
        </div>
        <p className="small text-suave mt-3 mb-0"><i className="bi bi-phone me-1" />Abra o app do seu banco e escaneie</p>
      </div>

      <div className="col-md-7">
        <div className="cartao p-4">
          <p className="fw-semibold mb-2">Escolha um valor (opcional)</p>
          <div className="d-flex flex-wrap gap-2 mb-3">
            {VALORES.map((v) => (
              <button key={v} type="button"
                className={`btn btn-contorno rounded-pill valor-btn ${valor === v && !outro ? "active" : ""}`}
                onClick={() => { setValor(v); setOutro(""); }}>
                R$ {v}
              </button>
            ))}
            <button type="button" className={`btn btn-contorno rounded-pill valor-btn ${valor === null && !outro ? "active" : ""}`}
              onClick={() => { setValor(null); setOutro(""); }}>
              Livre
            </button>
          </div>
          <div className="input-group mb-4">
            <span className="input-group-text">R$</span>
            <input className="form-control" inputMode="decimal" placeholder="Outro valor" value={outro}
              onChange={(e) => setOutro(e.target.value.replace(/[^0-9,]/g, "").slice(0, 8))} />
          </div>

          <dl className="row small mb-3">
            <dt className="col-4 text-suave">Beneficiário</dt><dd className="col-8 fw-semibold">{PIX.nome}</dd>
            <dt className="col-4 text-suave">Chave Pix</dt>
            <dd className="col-8">
              <span className="fw-semibold">{PIX.chave}</span> <span className="text-suave">(celular)</span>
              <button className="btn btn-link btn-sm p-0 ms-2 text-ouro" onClick={() => copiar(PIX.chave, "chave")}>
                <i className={`bi ${copiado === "chave" ? "bi-check2" : "bi-copy"}`} />
              </button>
            </dd>
          </dl>

          <label className="form-label small text-suave">Pix Copia e Cola</label>
          <div className="copia-cola cartao p-2 mb-3">{codigo}</div>
          <button className="btn btn-ouro w-100 rounded-pill" onClick={() => copiar(codigo, "codigo")}>
            <i className={`bi ${copiado === "codigo" ? "bi-check2-circle" : "bi-clipboard-heart"} me-2`} />
            {copiado === "codigo" ? "Copiado! Cole no app do banco" : "Copiar código Pix"}
          </button>
          <p className="small text-suave mt-3 mb-0">
            <i className="bi bi-shield-lock me-1" />Confira sempre o nome do beneficiário (<strong>{PIX.nome}</strong>) antes de confirmar no banco.
          </p>
        </div>
      </div>
    </div>
  );
}
