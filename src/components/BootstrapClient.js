"use client";
// Carrega o JavaScript do Bootstrap 5 (menu mobile, modais, etc.)
// e ativa a animação "revelar ao rolar" em qualquer elemento com a classe .revelar
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function BootstrapClient() {
  const caminho = usePathname();

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  useEffect(() => {
    const observador = new IntersectionObserver(
      (entradas) =>
        entradas.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visivel");
            observador.unobserve(e.target);
          }
        }),
      { threshold: 0.12 }
    );
    document.querySelectorAll(".revelar:not(.visivel)").forEach((el) => observador.observe(el));
    return () => observador.disconnect();
  }, [caminho]);

  return null;
}
