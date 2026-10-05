// Pontinhos de luz que sobem no fundo do hero (posições fixas = sem diferença servidor/navegador)
const PONTOS = [
  [5, 9, 0], [12, 12, 3], [20, 8, 6], [28, 14, 1], [36, 10, 4], [44, 13, 7],
  [52, 9, 2], [60, 12, 5], [68, 10, 8], [76, 14, 0.5], [84, 9, 3.5], [92, 11, 6.5],
];

export default function Particulas() {
  return (
    <div className="particulas" aria-hidden="true">
      {PONTOS.map(([esquerda, duracao, atraso], i) => (
        <span
          key={i}
          style={{ left: `${esquerda}%`, animationDuration: `${duracao}s`, animationDelay: `${atraso}s` }}
        />
      ))}
    </div>
  );
}
