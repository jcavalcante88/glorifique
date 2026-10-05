// Gera o "Pix Copia e Cola" (BR Code, padrão EMV do Banco Central).
// O mesmo texto vira o QR Code que o app do banco lê.

function campo(id, valor) {
  return id + String(valor.length).padStart(2, "0") + valor;
}

function semAcento(texto, max) {
  return texto
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^A-Za-z0-9 ]/g, "")
    .toUpperCase()
    .slice(0, max);
}

export function crc16(texto) {
  let crc = 0xffff;
  for (let i = 0; i < texto.length; i++) {
    crc ^= texto.charCodeAt(i) << 8;
    for (let b = 0; b < 8; b++) {
      crc = crc & 0x8000 ? (crc << 1) ^ 0x1021 : crc << 1;
      crc &= 0xffff;
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, "0");
}

export function gerarPix({ chave, nome, cidade, valor, mensagem, txid = "GLORIFIQUE" }) {
  const contaPix =
    campo("00", "br.gov.bcb.pix") +
    campo("01", chave) +
    (mensagem ? campo("02", mensagem.slice(0, 40)) : "");

  const payload =
    campo("00", "01") +
    campo("26", contaPix) +
    campo("52", "0000") +
    campo("53", "986") +
    (valor && valor > 0 ? campo("54", Number(valor).toFixed(2)) : "") +
    campo("58", "BR") +
    campo("59", semAcento(nome, 25)) +
    campo("60", semAcento(cidade, 15)) +
    campo("62", campo("05", txid.replace(/[^A-Za-z0-9]/g, "").slice(0, 25) || "***")) +
    "6304";

  return payload + crc16(payload);
}

export const PIX = {
  chave: process.env.NEXT_PUBLIC_PIX_CHAVE || "+5511998817076",
  nome: process.env.NEXT_PUBLIC_PIX_NOME || "Jerry Cavalcante",
  cidade: process.env.NEXT_PUBLIC_PIX_CIDADE || "SAO PAULO",
};
