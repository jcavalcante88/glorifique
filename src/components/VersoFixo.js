// Mensagem fixa no rodapé de todas as páginas
export default function VersoFixo() {
  return (
    <aside className="verso-fixo" aria-label="Versículo">
      <i className="bi bi-stars text-ouro d-none d-sm-inline" aria-hidden="true" />
      <p className="m-0">
        <sup>8</sup> Se eu subir aos céus, lá estás; se eu fizer a minha cama no Sheol, também lá estás.{" "}
        <cite>— Salmos 139:8</cite>
      </p>
    </aside>
  );
}
