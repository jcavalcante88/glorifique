import Doacao from "@/components/Doacao";

export const metadata = {
  title: "Doar com Pix",
  description: "Apoie o Glorifique e ajude a levar testemunhos de esperança a mais pessoas.",
};

export default function Doar() {
  return (
    <section className="container py-5" style={{ maxWidth: 880 }}>
      <div className="text-center mb-5">
        <i className="bi bi-heart-fill text-danger display-5" />
        <h1 className="display-6 mt-3">Semeie esperança</h1>
        <p className="text-suave mx-auto" style={{ maxWidth: 560 }}>
          “Cada um dê conforme determinou em seu coração, não com pesar ou por obrigação,
          pois Deus ama quem dá com alegria.” <span className="text-ouro">— 2 Coríntios 9:7</span>
        </p>
      </div>
      <Doacao />
    </section>
  );
}
