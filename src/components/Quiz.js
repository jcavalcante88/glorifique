"use client";

import { useState } from "react";
import Link from "next/link";
import { perguntasPorLetra } from "@/lib/livros";

const todas = perguntasPorLetra();

function embaralhar(lista) {
  const copia = [...lista];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

export default function Quiz() {
  const [perguntas, setPerguntas] = useState(null); // null = tela inicial
  const [indice, setIndice] = useState(0);
  const [escolha, setEscolha] = useState(null);
  const [acertos, setAcertos] = useState(0);

  function comecar() {
    setPerguntas(embaralhar(todas));
    setIndice(0);
    setEscolha(null);
    setAcertos(0);
  }

  function responder(opcao) {
    if (escolha !== null) return;
    setEscolha(opcao);
    if (opcao === perguntas[indice].total) setAcertos((a) => a + 1);
  }

  function proxima() {
    setEscolha(null);
    setIndice((i) => i + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /* ---------- Tela inicial ---------- */
  if (!perguntas) {
    return (
      <div className="cartao p-4 p-md-5 text-center">
        <i className="bi bi-book-half display-4 text-ouro" />
        <h2 className="h3 mt-3">Quantos livros começam com...?</h2>
        <p className="text-suave mx-auto" style={{ maxWidth: 520 }}>
          São {todas.length} perguntas que passam pelos 66 livros da Bíblia. Depois de cada resposta,
          você vê quais são os livros e um resumo de cada um.
        </p>
        <p className="small text-suave mx-auto" style={{ maxWidth: 520 }}>
          <i className="bi bi-info-circle me-1" />
          Livros com número contam separados e pela letra do nome. Ex.: 1 e 2 Samuel são 2 livros com “S”.
        </p>
        <button className="btn btn-ouro btn-lg rounded-pill px-4 mt-2" onClick={comecar}>
          <i className="bi bi-play-fill me-1" /> Começar
        </button>
      </div>
    );
  }

  /* ---------- Resultado final ---------- */
  if (indice >= perguntas.length) {
    const pct = acertos / perguntas.length;
    const mensagem =
      pct === 1 ? "Perfeito! Você conhece muito bem a Bíblia. 🙌"
      : pct >= 0.7 ? "Muito bem! Você está afiado nas Escrituras."
      : pct >= 0.4 ? "Bom começo! Cada pergunta é uma chance de aprender."
      : "Que tal ler um livro novo da Bíblia esta semana?";
    return (
      <div className="cartao p-4 p-md-5 text-center">
        <i className="bi bi-trophy display-4 text-ouro" />
        <h2 className="h3 mt-3">Você acertou {acertos} de {perguntas.length}</h2>
        <p className="text-suave">{mensagem}</p>
        <p className="fst-italic text-suave small">
          “Lâmpada para os meus pés é tua palavra, e luz para o meu caminho.” <span className="text-ouro">— Salmos 119:105</span>
        </p>
        <div className="d-flex flex-wrap justify-content-center gap-2 mt-3">
          <button className="btn btn-ouro rounded-pill px-4" onClick={comecar}>
            <i className="bi bi-arrow-repeat me-1" /> Jogar de novo
          </button>
          <Link href="/testemunhos" className="btn btn-contorno rounded-pill px-4">Ver testemunhos</Link>
        </div>
      </div>
    );
  }

  /* ---------- Pergunta ---------- */
  const p = perguntas[indice];
  const respondeu = escolha !== null;
  const acertou = escolha === p.total;

  return (
    <div className="cartao p-4 p-md-5">
      <div className="d-flex justify-content-between small text-suave mb-2">
        <span>Pergunta {indice + 1} de {perguntas.length}</span>
        <span><i className="bi bi-check-circle me-1" />{acertos} acertos</span>
      </div>
      <div className="progress mb-4" style={{ height: 6 }} role="progressbar" aria-label="Progresso do quiz"
        aria-valuenow={indice} aria-valuemin={0} aria-valuemax={perguntas.length}>
        <div className="progress-bar quiz-progresso" style={{ width: `${(indice / perguntas.length) * 100}%` }} />
      </div>

      <div className="text-center">
        <div className="quiz-letra" aria-hidden="true">{p.letra}</div>
        <h2 className="h4 mb-4">Quantos livros da Bíblia começam com a letra <span className="text-ouro">{p.letra}</span>?</h2>
      </div>

      <div className="row g-3 mb-2">
        {p.opcoes.map((opcao) => {
          let estilo = "btn-contorno";
          if (respondeu && opcao === p.total) estilo = "quiz-certa";
          else if (respondeu && opcao === escolha) estilo = "quiz-errada";
          return (
            <div className="col-6 col-md-3" key={opcao}>
              <button
                className={`btn ${estilo} w-100 py-3 fs-4 fw-bold rounded-4`}
                onClick={() => responder(opcao)}
                disabled={respondeu}
              >
                {opcao}
              </button>
            </div>
          );
        })}
      </div>

      {respondeu && (
        <div className="mt-4" aria-live="polite">
          <div className={`alert ${acertou ? "alert-success" : "alert-warning"} d-flex align-items-center gap-2`}>
            <i className={`bi ${acertou ? "bi-check-circle-fill" : "bi-lightbulb-fill"} fs-5`} />
            <span>
              {acertou ? "Acertou! " : `Quase! A resposta certa é ${p.total}. `}
              {p.total === 1 ? "Só 1 livro começa" : `São ${p.total} livros que começam`} com “{p.letra}”:
            </span>
          </div>

          <ul className="list-unstyled d-grid gap-2 mb-4">
            {p.livros.map((livro) => (
              <li key={livro.nome} className="quiz-livro p-3 rounded-3">
                <div className="d-flex align-items-center gap-2 mb-1">
                  <strong className="text-ouro">{livro.nome}</strong>
                  <span className="badge rounded-pill text-bg-dark border">
                    {livro.t === "AT" ? "Antigo Testamento" : "Novo Testamento"}
                  </span>
                </div>
                <span className="text-suave small">{livro.resumo}</span>
              </li>
            ))}
          </ul>

          <div className="text-center">
            <button className="btn btn-ouro rounded-pill px-4" onClick={proxima}>
              {indice + 1 < perguntas.length ? <>Próxima pergunta <i className="bi bi-arrow-right ms-1" /></> : <>Ver resultado <i className="bi bi-trophy ms-1" /></>}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
