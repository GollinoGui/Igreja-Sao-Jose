import { useCallback, useEffect, useRef, useState } from "react";
import { SACRAMENTS } from "../lib/content";
import { WhatsAppButton } from "./WhatsAppButton";
import { Reveal } from "./Reveal";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { SACRAMENT_ICONS, IconChevronLeft, IconChevronRight, IconPause, IconPlay } from "./icons";

const AUTOPLAY_DELAY = 5000;
const SWIPE_THRESHOLD = 45;

// Dois acentos quentes alternados (dourado/terracota) — dão ritmo entre os
// cartões sem cair no ciclo de 3+ cores "aleatórias" nem tocar nas cores
// litúrgicas (reservadas ao indicador do dia, ver src/lib/liturgicalCalendar.js).
const ACCENTS = [
  { bar: "bg-gold", plate: "bg-gold/15 text-gold" },
  { bar: "bg-terracotta-bright", plate: "bg-terracotta-bright/15 text-terracotta-bright" },
];

const CONTROL_BUTTON =
  "touch-manipulation flex h-9 w-9 items-center justify-center rounded-full border border-stone-50/20 text-stone-50/70 transition-colors duration-200 hover:border-stone-50/40 hover:bg-stone-50/10 hover:text-stone-50";

// Posições em coverflow 3D: só o cartão central e um vizinho de cada lado
// ficam visíveis (3 no total) — nada de um 2º par "espiando" ao fundo. Um
// 2º par exigiria, pra dar sensação de profundidade, se projetar bem além
// do vizinho imediato; medido de ponta a ponta (Playwright, várias larguras
// de tela), isso só cabe sem cortar em telas bem largas — em qualquer
// notebook/tablet comum o cartão mais distante acabava com um pedaço cortado
// pelo overflow-hidden da vitrine. 3 cartões cabem inteiros em qualquer
// largura testada (~640px+; abaixo disso o vizinho já nasce colado na borda
// da tela, então uma fatia fina dele ficando fora do quadro é esperada,
// como em qualquer carrossel). Só transform/opacity mudam (nada de filter)
// para a transição ficar leve — compositor-friendly, sem repaint.
//
// `offset` é sempre 0..total-1 (nunca negativo — vem de um módulo em quem
// chama), mas cada cartão precisa de um lado FIXO (esquerda ou direita) pra
// trocar de slide parecer um carrossel deslizando, não um cartão pulando de
// volta pro centro: convertemos pra um offset "com sinal" (-3..3 num total
// de 7) antes de decidir a posição, então um cartão escondido à direita
// (signed +2/+3) continua entrando/saindo pela direita, nunca atravessando
// o centro.
function cardStyle(offset, total) {
  const signed = offset > total / 2 ? offset - total : offset;
  if (signed === 0) {
    return { transform: "translateX(0) scale(1) rotateY(0deg)", opacity: 1, zIndex: 30 };
  }
  if (signed === 1) {
    return { transform: "translateX(64%) scale(0.78) rotateY(-24deg)", opacity: 0.5, zIndex: 20 };
  }
  if (signed === -1) {
    return { transform: "translateX(-64%) scale(0.78) rotateY(24deg)", opacity: 0.5, zIndex: 20 };
  }
  const side = signed > 0 ? 1 : -1;
  return { transform: `translateX(${side * 130}%) scale(0.4) rotateY(0deg)`, opacity: 0, zIndex: 0 };
}

/**
 * Vitrine em coverflow 3D dos sete sacramentos — substitui a grade simples
 * quando se quer destaque visual. Ícone + nome ficam sempre visíveis em
 * todos os cartões (mesmo fora do centro) para não perder a escaneabilidade
 * que a grade original tinha; só a descrição e o CTA aparecem no cartão
 * central, revelados ao focar/centralizar.
 *
 * `aria-labelledby` aponta para o `<h2>` "Sete sacramentos, uma só fé" em
 * Home.jsx (id="sacraments-heading") em vez de repetir o texto num
 * aria-label solto — mantém as duas cópias do título sempre em sincronia.
 *
 * `sacrament.image` (opcional, em src/lib/content.js) troca o cartão em
 * vidro translúcido por uma foto com overlay escuro. Sem imagem, o cartão
 * fica como hoje (ícone sobre vidro escuro fosco).
 */
export function SacramentsCoverflow({ whatsappUrl }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const prefersReducedMotion = usePrefersReducedMotion();
  const total = SACRAMENTS.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const goToSlide = (idx) => setCurrentIndex(idx);

  function handlePeekKeyDown(event, idx) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      goToSlide(idx);
    }
  }

  useEffect(() => {
    if (prefersReducedMotion || isHovered || isPaused || total <= 1) return;
    const interval = setInterval(nextSlide, AUTOPLAY_DELAY);
    return () => clearInterval(interval);
  }, [prefersReducedMotion, isHovered, isPaused, nextSlide, total]);

  function handleKeyDown(event) {
    if (event.key === "ArrowLeft") prevSlide();
    if (event.key === "ArrowRight") nextSlide();
  }

  function handleTouchStart(event) {
    touchStartX.current = event.touches[0].clientX;
  }

  function handleTouchEnd(event) {
    const diff = event.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(diff) > SWIPE_THRESHOLD) {
      if (diff < 0) nextSlide();
      else prevSlide();
    }
  }

  return (
    <Reveal
      as="section"
      aria-roledescription="carousel"
      aria-labelledby="sacraments-heading"
      tabIndex={0}
      className="relative flex min-h-[380px] w-full select-none flex-col items-center justify-center overflow-hidden px-4 [-webkit-tap-highlight-color:transparent] sm:min-h-[420px] sm:px-8 md:min-h-[460px] md:px-10 lg:px-12"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onKeyDown={handleKeyDown}
    >
      <div
        className="relative flex h-[300px] w-full max-w-[240px] items-center justify-center sm:h-[340px] sm:max-w-[280px] md:h-[380px] md:max-w-[320px] lg:max-w-[360px]"
        style={{ perspective: "1400px" }}
      >
        {SACRAMENTS.map((sacrament, idx) => {
          const offset = (idx - currentIndex + total) % total;
          const isCenter = offset === 0;
          const { transform, opacity, zIndex } = cardStyle(offset, total);
          const Icon = SACRAMENT_ICONS[sacrament.key];
          const accent = ACCENTS[idx % ACCENTS.length];
          const hasImage = Boolean(sacrament.image);
          // Cartões totalmente fora de vista (opacity 0) ficam aria-hidden. Os
          // "espiando" na lateral (offset ±1) são clicáveis, mas continuam
          // <div> (não <button>) mesmo quando interativos: como um cartão
          // alterna entre central e espiando a cada troca de slide, usar tags
          // diferentes faria o React desmontar e remontar o nó a cada troca —
          // e uma transição CSS não anima entre um elemento e seu substituto,
          // só entre dois estilos do MESMO elemento. Manter sempre <div> (com
          // role="button" só quando espiando) é o que deixa o transform
          // animar suavemente em toda troca.
          const isPeeking = !isCenter && opacity > 0;

          return (
            <div
              key={sacrament.key}
              {...(isPeeking
                ? {
                    role: "button",
                    tabIndex: 0,
                    onClick: () => goToSlide(idx),
                    onKeyDown: (event) => handlePeekKeyDown(event, idx),
                    "aria-label": `Ver ${sacrament.name}`,
                  }
                : { "aria-hidden": isCenter ? undefined : true })}
              className={`absolute h-full w-full touch-manipulation overflow-hidden rounded-2xl border border-stone-50/15 shadow-lift ${
                isPeeking ? "cursor-pointer" : ""
              } ${hasImage ? "" : "bg-stone-50/10 backdrop-blur-md"}`}
              style={{
                transform,
                opacity,
                zIndex,
                transformOrigin: "center center",
                transition: "transform 600ms cubic-bezier(0.65, 0, 0.35, 1), opacity 600ms cubic-bezier(0.65, 0, 0.35, 1)",
              }}
            >
              {hasImage && (
                <>
                  <img
                    src={sacrament.image}
                    alt=""
                    loading={isCenter ? "eager" : "lazy"}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div
                    className="absolute inset-0"
                    aria-hidden="true"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(20,16,10,0.15) 0%, rgba(20,16,10,0.1) 30%, rgba(20,16,10,0.75) 65%, rgba(20,16,10,0.95) 100%)",
                    }}
                  />
                </>
              )}

              <span className={`absolute inset-x-0 top-0 h-1.5 ${accent.bar}`} aria-hidden="true" />
              <div className="relative z-10 flex h-full flex-col items-center justify-center gap-3 p-6 text-center">
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl ${
                    hasImage ? "bg-stone-50/15 text-stone-50 backdrop-blur-sm" : accent.plate
                  }`}
                >
                  {Icon && <Icon className="h-7 w-7" />}
                </div>
                <h3 className="text-balance font-serif text-xl font-semibold text-stone-50 md:text-2xl">
                  {sacrament.name}
                </h3>
                <span className={`h-[3px] w-9 rounded-full ${accent.bar}`} aria-hidden="true" />

                <div
                  className={`flex flex-col items-center gap-3 transition-opacity duration-500 ${
                    isCenter ? "opacity-100" : "opacity-0"
                  }`}
                  style={{ pointerEvents: isCenter ? "auto" : "none" }}
                  aria-hidden={isCenter ? undefined : true}
                >
                  <p className="line-clamp-4 text-sm text-stone-50/85">{sacrament.description}</p>
                  {isCenter &&
                    (sacrament.whatsapp ? (
                      <WhatsAppButton href={whatsappUrl} className="mt-1" />
                    ) : (
                      <span className="mt-1 inline-block w-fit rounded-full bg-stone-50/15 px-3 py-1 text-xs font-medium text-stone-50 backdrop-blur-sm">
                        Nas celebrações, sem agendamento
                      </span>
                    ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="relative z-30 mt-8 flex flex-wrap items-center justify-center gap-4">
        <button onClick={prevSlide} aria-label="Sacramento anterior" className={CONTROL_BUTTON}>
          <IconChevronLeft className="h-4 w-4" />
        </button>

        <div className="flex items-center justify-center gap-2">
          {SACRAMENTS.map((sacrament, idx) => (
            <button
              key={sacrament.key}
              onClick={() => goToSlide(idx)}
              aria-label={`Ver ${sacrament.name}`}
              aria-current={idx === currentIndex ? "true" : undefined}
              className={`touch-manipulation h-2 rounded-full transition-[width,background-color,box-shadow] duration-300 ${
                idx === currentIndex
                  ? "w-7 bg-gold shadow-[0_0_10px_rgba(176,138,62,0.6)]"
                  : "w-2 bg-stone-50/25 hover:bg-stone-50/40"
              }`}
            />
          ))}
        </div>

        <button onClick={nextSlide} aria-label="Próximo sacramento" className={CONTROL_BUTTON}>
          <IconChevronRight className="h-4 w-4" />
        </button>

        {!prefersReducedMotion && (
          <button
            onClick={() => setIsPaused((prev) => !prev)}
            aria-label={isPaused ? "Retomar rotação automática" : "Pausar rotação automática"}
            className={CONTROL_BUTTON}
          >
            {isPaused ? <IconPlay className="h-3.5 w-3.5" /> : <IconPause className="h-3.5 w-3.5" />}
          </button>
        )}
      </div>
    </Reveal>
  );
}
