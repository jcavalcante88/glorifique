import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import "./globals.css";
import Navbar from "@/components/Navbar";
import VersoFixo from "@/components/VersoFixo";
import BootstrapClient from "@/components/BootstrapClient";

const site = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(site),
  title: { default: "Glorifique — histórias reais de transformação", template: "%s · Glorifique" },
  description:
    "Testemunhos em vídeo de pessoas que tiveram a vida transformada por Jesus. Encontre alguém que passou pelo mesmo que você.",
  openGraph: {
    title: "Glorifique",
    description: "Você não ouve uma teoria. Ouve alguém igual a você.",
    locale: "pt_BR",
    type: "website",
  },
};

export const viewport = { themeColor: "#0b1026" };

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" data-bs-theme="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500..700;1,9..144,400..600&family=Manrope:wght@400;500;600;700&display=swap"
        />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <footer className="rodape py-4 mt-5">
          <div className="container d-flex flex-column flex-md-row justify-content-between gap-2 small text-suave">
            <span>
              <img src="/logo.png" alt="" width="20" height="20" className="me-2 rounded-1" />
              Glorifique © {new Date().getFullYear()} · Feito para a glória de Deus
            </span>
            <span className="d-flex gap-3">
              <a href="/privacidade" className="text-suave text-decoration-none">Privacidade</a>
              <a href="/doar" className="text-suave text-decoration-none">Apoie</a>
            </span>
          </div>
        </footer>
        <VersoFixo />
        <BootstrapClient />
      </body>
    </html>
  );
}
