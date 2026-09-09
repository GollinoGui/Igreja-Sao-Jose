import { GALLERY_PHOTOS } from "../lib/content";

// Uma fileira por linha, sentido alternado — dá o efeito de tapeçaria
// tecida em vez de tudo deslizando junto pro mesmo lado. `offset` desloca
// o ponto de partida de cada fileira dentro de GALLERY_PHOTOS pra não
// mostrar a mesma foto três vezes alinhada verticalmente logo de cara.
const ROWS = [
  { speed: 62, direction: "left", offset: 0 },
  { speed: 78, direction: "right", offset: 2 },
  { speed: 54, direction: "left", offset: 4 },
];

function GalleryRow({ speed, direction, offset }) {
  const total = GALLERY_PHOTOS.length;
  const ordered = GALLERY_PHOTOS.map((_, i) => GALLERY_PHOTOS[(i + offset) % total]);
  // Triplicado (não só duplicado): com poucas fotos-placeholder, o próprio
  // conteúdo de UMA volta já é curto — duplicar deixaria o "salto" do loop
  // (translateX -50%) visível na tela em telas largas. Triplicar garante
  // que sempre sobra conteúdo fora da viewport nas duas pontas.
  const cards = [...ordered, ...ordered, ...ordered];
  const animationClass = direction === "left" ? "animate-marquee-left" : "animate-marquee-right";

  return (
    <div className="flex w-full overflow-hidden">
      <div className={`flex shrink-0 gap-6 ${animationClass}`} style={{ "--marquee-speed": `${speed}s` }}>
        {cards.map((photo, idx) => (
          <div
            key={`${photo.id}-${idx}`}
            className="h-36 w-52 shrink-0 overflow-hidden rounded-xl shadow-lift sm:h-44 sm:w-64 md:h-52 md:w-72"
          >
            <img src={photo.url} alt={photo.alt} loading="lazy" className="h-full w-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Galeria em fileiras diagonais e contínuas, revelada por GallerySection
 * (ver hooks/useCarpetPush.js). As fileiras nunca pausam — só a abertura
 * "de tapete" da seção-mãe congela ao terminar, a galeria em si continua
 * passando as imagens pro resto da sessão. Puramente decorativa —
 * fotos-placeholder sem legenda (ver GALLERY_PHOTOS) — por isso `alt=""`
 * em todas e nenhum texto/controle aqui dentro; a seção pai já marca
 * `aria-hidden`.
 */
export function DiagonalGallery() {
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-stone-900">
      <div className="flex w-[160%] -rotate-[14deg] flex-col gap-6">
        {ROWS.map((row) => (
          <GalleryRow key={row.offset} {...row} />
        ))}
      </div>
    </div>
  );
}
