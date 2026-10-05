import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { entrarCom } from "@/app/acoes";

export const metadata = { title: "Entrar" };

const ERROS = {
  OAuthAccountNotLinked:
    "Este e-mail já está cadastrado com outra forma de login. Entre usando a mesma forma da primeira vez.",
  Verification: "O link de acesso expirou ou já foi usado. Peça um novo.",
  AccessDenied: "Acesso negado.",
  Default: "Não foi possível entrar. Tente novamente.",
};

export default async function Entrar({ searchParams }) {
  const sessao = await auth();
  if (sessao?.user) redirect("/painel");

  const { error } = await searchParams;
  const mensagemErro = error ? ERROS[error] ?? ERROS.Default : null;

  return (
    <section className="container py-5" style={{ maxWidth: 460 }}>
      <div className="cartao p-4 p-md-5 text-center">
        <img src="/logo.png" alt="" width="72" height="72" className="mb-3 rounded-4" />
        <h1 className="h2">Bem-vindo ao Glorifique</h1>
        <p className="text-suave">Entre para enviar seu testemunho ou conversar com quem já passou pelo mesmo.</p>

        {mensagemErro && <div className="alert alert-danger small text-start">{mensagemErro}</div>}

        <div className="d-grid gap-2 mt-4">
          <form action={entrarCom.bind(null, "google")}>
            <button className="btn btn-light w-100 py-2 fw-semibold" type="submit">
              <i className="bi bi-google me-2 text-danger" /> Continuar com Google
            </button>
          </form>
          <form action={entrarCom.bind(null, "github")}>
            <button className="btn btn-dark border w-100 py-2 fw-semibold" type="submit">
              <i className="bi bi-github me-2" /> Continuar com GitHub
            </button>
          </form>
        </div>

        <div className="d-flex align-items-center my-4 text-suave small">
          <hr className="flex-grow-1" /><span className="px-2">ou com seu e-mail</span><hr className="flex-grow-1" />
        </div>

        <form action={entrarCom.bind(null, "resend")} className="text-start">
          <label htmlFor="email" className="form-label small">E-mail</label>
          <input id="email" name="email" type="email" required maxLength={120} autoComplete="email"
            className="form-control mb-3" placeholder="voce@exemplo.com" />
          <button className="btn btn-ouro w-100 py-2" type="submit">
            <i className="bi bi-envelope-heart me-2" /> Receber link de acesso
          </button>
          <p className="small text-suave mt-2 mb-0">Sem senha: enviamos um link seguro para o seu e-mail.</p>
        </form>
      </div>
    </section>
  );
}
