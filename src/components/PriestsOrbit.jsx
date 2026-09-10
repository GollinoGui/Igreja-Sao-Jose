import { useCallback, useEffect, useRef, useState } from "react";
import { PARISH_PRIESTS } from "../lib/content";
import { Reveal } from "./Reveal";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import {
  IconOrders,
  IconCalendar,
  IconChevronLeft,
  IconChevronRight,
  IconPause,
  IconPlay,
} from "./icons";

const AUTOPLAY_DELAY = 6000;
const SWIPE_THRESHOLD = 45;

// Prefixos de tratamento a ignorar ao gerar as iniciais de quem não tem foto
// cadastrada (ex.: "Pe. Olinto Cremonese" -> "OC", não "PO").
const TITLE_PREFIXES = new Set([
  "pe",
  "padre",
  "frei",
  "dom",
  "mons",
  "monsenhor",
  "cônego",
  "conego",
]);

function getInitials(name) {
  const words = name
    .split(/\s+/)
    .filter((word) => !TITLE_PREFIXES.has(word.toLowerCase().replace(/\.$/, "")));
  const first = words[0]?.[0] ?? "";
  const last = words.length > 1 ? words[words.length - 1][0] : "";
  return (first + last).toUpperCase();
}

// Dois acentos quentes e um verde, alternados por índice — mesmo raciocínio
// de ACCENTS em SacramentsCoverflow.jsx (evita cor litúrgica reservada ao
// indicador do dia e o ciclo de cor "aleatória" por item).
const ACCENTS = [
  { bg: "bg-gold/15", text: "text-gold" },
  { bg: "bg-terracotta-bright/15", text: "text-terracotta-bright" },
  { bg: "bg-green-mid/15", text: "text-green-mid" },
];

const CONTROL_BUTTON =
  "touch-manipulation flex h-9 w-9 items-center justify-center rounded-full border border-stone-50/20 text-stone-50/70 transition-colors duration-200 hover:border-stone-50/40 hover:bg-stone-50/10 hover:text-stone-50";

// Tamanhos por faixa de largura. `minRadius`/`maxRadius` limitam o raio da
// roda — ele cresce com a quantidade de párocos (ver `getOrbitRadius`) até o
// teto de cada faixa, calibrado pra nunca estourar a menor largura de tela
// daquela faixa, mesmo com uma lista longa de párocos.
const SIZE_PRESETS = {
  xs: { avatarSize: 40, cardWidth: "w-40", minRadius: 85, maxRadius: 115 },
  sm: { avatarSize: 46, cardWidth: "w-44", minRadius: 105, maxRadius: 140 },
  md: { avatarSize: 54, cardWidth: "w-48", minRadius: 130, maxRadius: 170 },
  lg: { avatarSize: 64, cardWidth: "w-52", minRadius: 165, maxRadius: 220 },
  xl: { avatarSize: 72, cardWidth: "w-56", minRadius: 200, maxRadius: 300 },
};

function useResponsive() {
  const [screenSize, setScreenSize] = useState("lg");

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      if (width < 480) setScreenSize("xs");
      else if (width < 640) setScreenSize("sm");
      else if (width < 768) setScreenSize("md");
      else if (width < 1024) setScreenSize("lg");
      else setScreenSize("xl");
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return screenSize;
}

// Raio necessário pra manter ~1.25x o diâmetro do avatar entre vizinhos ao
// longo da circunferência, sem passar do teto da faixa de tela.
function getOrbitRadius(count, { avatarSize, minRadius, maxRadius }) {
  const needed = (avatarSize * 1.25 * count) / (2 * Math.PI);
  return Math.min(maxRadius, Math.max(minRadius, needed));
}

// Menor diferença angular entre dois ângulos (sempre em -180..180). Usada
// pra "desembrulhar" a rotação de cada avatar a partir de onde ele
// VISUALMENTE está agora, não recalculando um ângulo canônico isolado a
// cada troca — um cálculo isolado tem empate exato pra quem fica do lado
// oposto da roda (metade das casas de distância, só acontece com número
// par de párocos), e o desempate podia inverter de direção de uma
// renderização pra outra, fazendo o CSS animar quase uma volta inteira em
// vez do passo único que realmente aconteceu (seja ao virar do último
// pároco pro primeiro, seja em qualquer troca que cruze esse ponto).
function wrapAngleDelta(delta) {
  return ((delta % 360) + 540) % 360 - 180;
}

// Ângulo de cada pároco pro `activeIndex` dado, "desembrulhado" a partir do
// ângulo anterior de cada um (ver wrapAngleDelta) — computado sempre junto
// com a troca de `activeIndex`, na própria ação que causa a troca (clique,
// teclado, swipe, autoplay), não reagindo a ela depois num efeito.
function computeRotations(priests, activeIndex, total, prevRotations) {
  const rotations = {};
  priests.forEach((priest, index) => {
    const target = ((index - activeIndex) * 360) / total;
    const prevAngle = prevRotations[priest.id];
    rotations[priest.id] = prevAngle === undefined ? target : prevAngle + wrapAngleDelta(target - prevAngle);
  });
  return rotations;
}

/**
 * Roda orbital com os párocos que passaram pela paróquia — o atual incluído
 * (`current: true` em PARISH_PRIESTS, ver src/lib/content.js). Abre já
 * centralizada nele, não no primeiro item da lista.
 */
export function PriestsOrbit() {
  const priests = PARISH_PRIESTS;
  const total = priests.length;
  const currentPriestIndex = Math.max(
    0,
    priests.findIndex((priest) => priest.current)
  );

  // `activeIndex` e `rotations` sempre trocam juntos, numa única atualização
  // (ver goToIndex) — nunca um efeito reagindo à mudança do outro.
  const [wheel, setWheel] = useState(() => ({
    activeIndex: currentPriestIndex,
    rotations: computeRotations(priests, currentPriestIndex, total, {}),
  }));
  const { activeIndex, rotations } = wheel;
  const [isHovering, setIsHovering] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const prefersReducedMotion = usePrefersReducedMotion();
  const screenSize = useResponsive();

  const preset = SIZE_PRESETS[screenSize];
  const { avatarSize, cardWidth } = preset;
  const radius = getOrbitRadius(total, preset);
  const containerSize = radius * 2 + avatarSize + 32;

  const goToIndex = useCallback(
    (index) => {
      setWheel((prev) => ({
        activeIndex: index,
        rotations: computeRotations(priests, index, total, prev.rotations),
      }));
    },
    [priests, total]
  );
  const next = useCallback(
    () => setWheel((prev) => {
      const index = (prev.activeIndex + 1) % total;
      return { activeIndex: index, rotations: computeRotations(priests, index, total, prev.rotations) };
    }),
    [priests, total]
  );
  const prev = useCallback(
    () => setWheel((prevState) => {
      const index = (prevState.activeIndex - 1 + total) % total;
      return { activeIndex: index, rotations: computeRotations(priests, index, total, prevState.rotations) };
    }),
    [priests, total]
  );

  useEffect(() => {
    if (prefersReducedMotion || isHovering || isPaused || total <= 1) return;
    const interval = setInterval(next, AUTOPLAY_DELAY);
    return () => clearInterval(interval);
  }, [prefersReducedMotion, isHovering, isPaused, next, total]);

  function handleKeyDown(event) {
    if (event.key === "ArrowLeft") prev();
    if (event.key === "ArrowRight") next();
  }

  function handleTouchStart(event) {
    touchStartX.current = event.touches[0].clientX;
  }

  function handleTouchEnd(event) {
    const diff = event.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(diff) > SWIPE_THRESHOLD) {
      if (diff < 0) next();
      else prev();
    }
  }

  if (total === 0) return null;

  const active = priests[activeIndex];
  const activeAccent = ACCENTS[activeIndex % ACCENTS.length];
  const transition = prefersReducedMotion ? "none" : "transform 700ms cubic-bezier(0.65, 0, 0.35, 1)";

  return (
    <Reveal
      as="section"
      aria-roledescription="carousel"
      aria-label="Párocos da paróquia"
      tabIndex={0}
      className="relative flex w-full select-none flex-col items-center overflow-hidden px-4 [-webkit-tap-highlight-color:transparent] sm:px-8"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onKeyDown={handleKeyDown}
    >
      <div
        className="relative flex shrink-0 items-center justify-center"
        style={{ width: containerSize, height: containerSize }}
      >
        {/* Cartão do pároco selecionado, no centro da roda — entre os dois
            níveis de z-index da órbita (ver comentário abaixo). */}
        <div
          className={`relative z-[15] rounded-2xl border border-stone-50/15 bg-stone-50/10 p-4 text-center backdrop-blur-md sm:p-5 ${cardWidth}`}
        >
          {active.photo ? (
            <img
              src={active.photo}
              alt=""
              className="mx-auto -mt-10 h-16 w-16 rounded-full border-4 border-stone-50 object-cover shadow-md sm:-mt-12 sm:h-20 sm:w-20"
            />
          ) : (
            <span
              className={`mx-auto -mt-10 flex h-16 w-16 items-center justify-center rounded-full border-4 border-stone-50 font-serif text-lg font-semibold shadow-md sm:-mt-12 sm:h-20 sm:w-20 sm:text-xl ${activeAccent.bg} ${activeAccent.text}`}
              aria-hidden="true"
            >
              {getInitials(active.name)}
            </span>
          )}

          {active.current && (
            <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-gold-bright/20 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wide text-gold-bright">
              Pároco atual
            </span>
          )}

          <h3 className="mt-2 text-balance font-serif text-lg font-semibold text-stone-50 sm:text-xl">
            {active.name}
          </h3>
          <div className="mt-1.5 flex items-center justify-center gap-1.5 text-sm text-stone-50/70">
            <IconOrders className="h-3.5 w-3.5 shrink-0" />
            <span>{active.role}</span>
          </div>
          <div className="mt-0.5 flex items-center justify-center gap-1.5 text-xs text-stone-50/55">
            <IconCalendar className="h-3.5 w-3.5 shrink-0" />
            <span>{active.period}</span>
          </div>
        </div>

        {/* Párocos em órbita, com contrarrotação pra manter o avatar em pé */}
        {priests.map((priest, index) => {
          const rotation = rotations[priest.id] ?? ((index - activeIndex) * 360) / total;
          const isActive = index === activeIndex;
          const accent = ACCENTS[index % ACCENTS.length];

          return (
            <div
              key={priest.id}
              className="absolute"
              style={{
                width: avatarSize,
                height: avatarSize,
                top: `calc(50% - ${avatarSize / 2}px)`,
                left: `calc(50% - ${avatarSize / 2}px)`,
                // O ativo fica por cima do cartão (peeking, como no
                // cartão-avatar "-mt-12" logo abaixo); os demais ficam por
                // baixo do cartão (z-15) — importante com muitos párocos em
                // telas estreitas, onde o raio precisa ser pequeno demais
                // pra todo mundo caber sem passar por trás do cartão.
                zIndex: isActive ? 20 : 10,
                transform: `rotate(${rotation}deg) translateY(-${radius}px)`,
                transition,
              }}
            >
              <div style={{ transform: `rotate(${-rotation}deg)`, transition }} className="h-full w-full">
                <button
                  type="button"
                  onClick={() => goToIndex(index)}
                  aria-current={isActive ? "true" : undefined}
                  aria-label={`Ver ${priest.name}`}
                  className={`flex h-full w-full touch-manipulation items-center justify-center overflow-hidden rounded-full text-xs font-semibold transition-colors duration-300 ${
                    isActive
                      ? "border-[3px] border-gold shadow-lift"
                      : priest.current
                        ? "border-2 border-gold-bright/70 hover:border-gold-bright"
                        : "border-2 border-stone-50/25 hover:border-stone-50/50"
                  }`}
                >
                  {priest.photo ? (
                    <img
                      src={priest.photo}
                      alt=""
                      loading={isActive ? "eager" : "lazy"}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className={`flex h-full w-full items-center justify-center ${accent.bg} ${accent.text}`}>
                      {getInitials(priest.name)}
                    </span>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="relative z-30 mt-8 flex items-center justify-center gap-4 sm:mt-10">
        <button onClick={prev} aria-label="Pároco anterior" className={CONTROL_BUTTON}>
          <IconChevronLeft className="h-4 w-4" />
        </button>

        <span className="min-w-[3.5rem] text-center text-xs font-medium text-stone-50/60">
          {activeIndex + 1} de {total}
        </span>

        <button onClick={next} aria-label="Próximo pároco" className={CONTROL_BUTTON}>
          <IconChevronRight className="h-4 w-4" />
        </button>

        {!prefersReducedMotion && (
          <button
            onClick={() => setIsPaused((prevValue) => !prevValue)}
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
