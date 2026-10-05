// Situações de vida — cada testemunho pertence a uma delas.
// "icone" usa os nomes do Bootstrap Icons (https://icons.getbootstrap.com)
export const CATEGORIAS = [
  { slug: "vicios", nome: "Vícios", icone: "bi-unlock", cor: "#e07a5f" },
  { slug: "luto", nome: "Luto", icone: "bi-flower1", cor: "#9b8ec4" },
  { slug: "depressao", nome: "Depressão", icone: "bi-cloud-sun", cor: "#6c9bd2" },
  { slug: "ansiedade", nome: "Ansiedade", icone: "bi-wind", cor: "#5fb3a1" },
  { slug: "familia", nome: "Família restaurada", icone: "bi-house-heart", cor: "#e8b54a" },
  { slug: "divorcio", nome: "Divórcio", icone: "bi-heartbreak", cor: "#d4778f" },
  { slug: "prisao", nome: "Prisão", icone: "bi-door-open", cor: "#8a9a5b" },
  { slug: "ateismo", nome: "Do ateísmo à fé", icone: "bi-question-circle", cor: "#7aa6c2" },
  { slug: "doenca", nome: "Doença e cura", icone: "bi-heart-pulse", cor: "#cf6f6f" },
  { slug: "financeiro", nome: "Crise financeira", icone: "bi-wallet2", cor: "#c99a4b" },
  { slug: "solidao", nome: "Solidão", icone: "bi-person-heart", cor: "#b08fc7" },
  { slug: "outros", nome: "Outras histórias", icone: "bi-stars", cor: "#a0a8c0" },
];

export const SLUGS = CATEGORIAS.map((c) => c.slug);

export function categoria(slug) {
  return CATEGORIAS.find((c) => c.slug === slug) ?? CATEGORIAS.at(-1);
}
