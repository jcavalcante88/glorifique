import Quiz from "@/components/Quiz";

export const metadata = {
  title: "Quiz bíblico",
  description: "Teste o que você sabe sobre os 66 livros da Bíblia e aprenda um pouco sobre cada um.",
};

export default function PaginaQuiz() {
  return (
    <section className="container py-5" style={{ maxWidth: 820 }}>
      <p className="text-ouro fw-bold text-uppercase small mb-1 text-center">Quiz bíblico</p>
      <h1 className="display-6 mb-4 text-center">Você conhece os livros da Bíblia?</h1>
      <Quiz />
    </section>
  );
}
