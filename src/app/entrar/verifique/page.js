export const metadata = { title: "Verifique seu e-mail" };

export default function Verifique() {
  return (
    <section className="container py-5 text-center" style={{ maxWidth: 520 }}>
      <div className="cartao p-5">
        <i className="bi bi-envelope-check display-3 text-ouro" />
        <h1 className="h2 mt-3">Confira seu e-mail</h1>
        <p className="text-suave mb-0">
          Enviamos um link de acesso. Ele vale por 24 horas e só pode ser usado uma vez.
          Não achou? Olhe também na caixa de spam.
        </p>
      </div>
    </section>
  );
}
