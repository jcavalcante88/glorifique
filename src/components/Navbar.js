import Link from "next/link";
import { auth } from "@/auth";
import { sair } from "@/app/acoes";

export default async function Navbar() {
  const sessao = await auth();
  const usuario = sessao?.user;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-glorifique sticky-top">
      <div className="container">
        <Link href="/" className="navbar-brand marca d-flex align-items-center gap-2">
          <img src="/logo.png" alt="" width="38" height="38" className="rounded-2" />
          Glorifique
        </Link>
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#menu"
          aria-controls="menu"
          aria-expanded="false"
          aria-label="Abrir menu"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="menu">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-2">
            <li className="nav-item">
              <Link className="nav-link" href="/testemunhos">
                <i className="bi bi-play-circle me-1" /> Testemunhos
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/enviar">
                <i className="bi bi-camera-video me-1" /> Contar minha história
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/quiz">
                <i className="bi bi-book-half me-1" /> Quiz
              </Link>
            </li>

            {usuario ? (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle d-flex align-items-center gap-2"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {usuario.image ? (
                    <img src={usuario.image} alt="" width="30" height="30" className="rounded-circle" referrerPolicy="no-referrer" />
                  ) : (
                    <i className="bi bi-person-circle fs-5" />
                  )}
                  <span className="d-lg-none">{usuario.name || usuario.email}</span>
                </a>
                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-dark">
                  <li><Link className="dropdown-item" href="/painel"><i className="bi bi-grid me-2" />Meu painel</Link></li>
                  {usuario.role === "admin" && (
                    <li><Link className="dropdown-item" href="/admin"><i className="bi bi-shield-check me-2" />Moderação</Link></li>
                  )}
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <form action={sair}>
                      <button className="dropdown-item" type="submit"><i className="bi bi-box-arrow-right me-2" />Sair</button>
                    </form>
                  </li>
                </ul>
              </li>
            ) : (
              <li className="nav-item ms-lg-2">
                <Link href="/entrar" className="btn btn-ouro btn-sm px-3 rounded-pill">
                  <i className="bi bi-box-arrow-in-right me-1" /> Entrar
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
