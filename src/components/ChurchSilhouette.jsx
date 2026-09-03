/**
 * Placeholder da fachada da Igreja Matriz enquanto a foto real não chega.
 * É um SVG em silhueta sólida (duas torres + corpo central), pensado para
 * ocupar o mesmo espaço/proporção que a foto recortada vai ocupar.
 *
 * QUANDO A FOTO REAL CHEGAR:
 * 1. Salve o arquivo recortado (fundo transparente) em
 *    src/assets/images/igreja-recorte.png
 * 2. Troque o uso de <ChurchSilhouette /> por
 *    <img src={igrejaRecorte} alt="Fachada da Igreja Matriz São José" />
 *    no componente Hero (mesmas classes de posicionamento).
 * O PNG com fundo transparente encaixa sem quebrar o layout, pois o
 * wrapper em Hero.jsx já controla altura/posição via CSS, não a imagem.
 */
export function ChurchSilhouette({ className = "", fill = "var(--color-green-deep)" }) {
  return (
    <svg
      viewBox="0 0 400 640"
      className={className}
      preserveAspectRatio="xMidYMax meet"
      role="img"
      aria-label="Ilustração da fachada da Igreja Matriz São José, com duas torres"
    >
      <g fill={fill}>
        {/* torre esquerda */}
        <rect x="30" y="160" width="80" height="360" />
        <polygon points="30,160 70,80 110,160" />
        <rect x="60" y="200" width="20" height="34" opacity="0.35" />
        <circle cx="70" cy="130" r="6" opacity="0.5" />

        {/* torre direita */}
        <rect x="290" y="160" width="80" height="360" />
        <polygon points="290,160 330,80 370,160" />
        <rect x="320" y="200" width="20" height="34" opacity="0.35" />
        <circle cx="330" cy="130" r="6" opacity="0.5" />

        {/* corpo central */}
        <rect x="115" y="220" width="170" height="300" />
        <polygon points="115,220 200,140 285,220" />

        {/* cruz no topo */}
        <rect x="196" y="90" width="8" height="46" />
        <rect x="182" y="104" width="36" height="8" />

        {/* rosácea */}
        <circle cx="200" cy="260" r="26" opacity="0.35" />

        {/* porta */}
        <path d="M180 520 v-70 a20 20 0 0 1 40 0 v70 z" opacity="0.5" />
      </g>
    </svg>
  );
}
