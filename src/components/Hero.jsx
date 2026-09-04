import { useRef } from "react";
import { Button } from "./Button";
import { LiturgicalIndicator } from "./LiturgicalIndicator";
import { StatCard } from "./StatCard";
import { IconTower, IconBell, IconTrinity, IconCalendar } from "./icons";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { useDiagonalReveal } from "../hooks/useDiagonalReveal";
import igrejaFrontal from "../assets/images/igreja-frontal.jpg";
import igrejaDiagonal from "../assets/images/igreja-diagonal.png";

const HERO_STATS = [
  { value: "1899", label: "Inauguração", icon: IconCalendar },
  { value: "130+", label: "Anos de história", icon: IconTrinity },
  { value: "44m", label: "Torre monumento", icon: IconTower },
  { value: "3", label: "Sinos de aço", icon: IconBell },
];

/**
 * Hero + seção de história curta, tratados como uma unidade porque a
 * fachada da igreja atravessa visualmente as duas em duas etapas:
 *
 * 1. No Hero, a foto frontal aparece ao lado do texto (arredondada,
 *    centralizada verticalmente no desktop; empilhada abaixo do texto
 *    no mobile), com a entrada de fade-up padrão do site.
 * 2. Entrada no scroll: a partir do meio do Hero, a foto diagonal da
 *    igreja desliza da esquerda para a direita até sua posição final,
 *    como se estivesse sendo revelada dentro de uma tela — ocupando o
 *    intervalo do meio do Hero até o fim da seção de história (medido em
 *    useDiagonalReveal.js). Ela fica à esquerda da seção de história; o
 *    texto, à direita, aparece logo em seguida, com um pequeno atraso em
 *    relação à foto.
 *
 * Em mobile a foto diagonal vira um bloco empilhado normal, sem overlap
 * nem scroll-link, para manter o efeito simples em telas pequenas.
 */
export function Hero() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const heroRef = useRef(null);
  const historyRef = useRef(null);
  const { progress, span } = useDiagonalReveal(heroRef, historyRef);

  // a foto diagonal termina de deslizar para dentro na primeira metade do
  // intervalo medido; o texto, à direita, começa a aparecer perto do fim
  // dessa entrada e termina no fim do intervalo
  const imageProgress = prefersReducedMotion ? 1 : Math.min(1, progress / 0.5);
  const textProgress = prefersReducedMotion
    ? 1
    : Math.min(1, Math.max(0, (progress - 0.4) / 0.6));

  function stepClass() {
    if (prefersReducedMotion) return "opacity-100";
    return "animate-fade-up opacity-0";
  }

  function stepStyle(delayMs) {
    if (prefersReducedMotion) return undefined;
    return { animationDelay: `${delayMs}ms` };
  }

  return (
    <div className="mesh-stone grain-overlay relative">
      {/* foto diagonal — entrada no scroll, do meio do Hero ao fim da
          seção de história, deslizando da esquerda como se surgisse
          dentro de uma tela. Fica no fundo compartilhado (abaixo do
          conteúdo do Hero e do card da história), nunca atrás do próprio
          fundo do Hero — por isso o mesh-stone/grain subiram para este
          wrapper em vez de ficarem no <section> do Hero. */}
      <div
        className="pointer-events-none absolute inset-x-0 z-0 hidden md:block"
        style={{
          top: span.top,
          height: span.height,
          opacity: imageProgress,
          transform: `translateX(${(1 - imageProgress) * -48}px)`,
        }}
        aria-hidden="true"
      >
        <div className="mx-auto h-full max-w-6xl px-6">
          <img
            src={igrejaDiagonal}
            alt="Igreja Matriz São José vista em ângulo diagonal"
            className="h-full w-[58%] min-w-[320px] max-w-[620px] object-contain object-left-bottom [filter:drop-shadow(0_30px_30px_rgba(20,16,10,0.4))_drop-shadow(0_10px_12px_rgba(20,16,10,0.3))]"
          />
        </div>
      </div>

      <section
        ref={heroRef}
        className="relative z-10 mx-auto max-w-6xl px-6 pb-20 pt-16 md:pb-28 md:pt-24"
      >
        <div
          className="pointer-events-none absolute -top-24 right-[8%] h-72 w-72 rounded-full bg-gold/15 blur-3xl animate-float-slow"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute top-40 left-[4%] h-56 w-56 rounded-full bg-terracotta/10 blur-3xl animate-float-slow [animation-delay:2s]"
          aria-hidden="true"
        />

        <div className="relative z-10 grid grid-cols-1 gap-10 md:grid-cols-[55%_45%] md:items-center">
          <div>
            <p
              className={`mb-4 flex items-center gap-2 font-sans text-sm font-medium tracking-wide text-green-mid ${stepClass()}`}
              style={stepStyle(0)}
            >
              <span className="h-px w-8 bg-gold" aria-hidden="true" />
              Orlândia, SP · Diocese de Franca
            </p>
            <h1
              className={`font-serif text-5xl font-semibold leading-[1.05] tracking-tight text-ink md:text-6xl lg:text-[68px] ${stepClass()}`}
              style={stepStyle(0)}
            >
              Paróquia
              <br />
              <span className="text-green-deep">São José</span>
            </h1>
            <p
              className={`mt-6 max-w-md text-lg text-ink/80 ${stepClass()}`}
              style={stepStyle(150)}
            >
              Desde 1899, uma comunidade reunida em torno da fé, erguida em
              pedra e sustentada pela devoção ao nosso padroeiro, São José.
            </p>
            <div className={`mt-8 flex flex-wrap gap-4 ${stepClass()}`} style={stepStyle(300)}>
              <Button as="link" to="/missas" variant="primary">
                Horários de missa
              </Button>
              <Button as="link" to="/contato" variant="secondary">
                Contato e sacramentos
              </Button>
            </div>
            <LiturgicalIndicator className={`mt-10 ${stepClass()}`} style={stepStyle(300)} />
          </div>

          <div className={`relative ${stepClass()}`} style={stepStyle(450)}>
            <div
              className="absolute -inset-3 -z-10 rounded-[28px] border border-gold/40 md:-inset-4"
              aria-hidden="true"
            />
            <img
              src={igrejaFrontal}
              alt="Fachada da Igreja Matriz São José"
              className="h-64 w-full rounded-2xl object-cover shadow-lift md:h-full md:max-h-[420px]"
            />
          </div>
        </div>

        <dl
          className={`relative z-10 mt-16 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-stone-200 pt-10 sm:grid-cols-4 ${stepClass()}`}
          style={stepStyle(550)}
        >
          {HERO_STATS.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </dl>
      </section>

      <section ref={historyRef} className="relative z-10">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          {/* em mobile, a foto diagonal aparece aqui, estática e empilhada */}
          <img
            src={igrejaDiagonal}
            alt="Igreja Matriz São José vista em ângulo diagonal"
            className="mb-8 h-56 w-full object-contain object-left-bottom [filter:drop-shadow(0_18px_18px_rgba(20,16,10,0.35))] md:hidden"
          />

          {/* fita/faixa verde, não um cartão retangular: cantos cortados
              em diagonal (clip-path) a partir de md, ecoando o corte da
              foto diagonal; sombra via drop-shadow (não box-shadow) para
              acompanhar o contorno recortado */}
          <div
            className="mesh-emerald grain-overlay relative ml-auto max-w-md overflow-hidden rounded-2xl p-8 text-stone-50 shadow-lift md:max-w-lg md:rounded-none md:p-10 md:shadow-none md:[clip-path:polygon(5%_0,100%_0,95%_100%,0_100%)] md:[filter:drop-shadow(0_22px_26px_rgba(15,22,18,0.4))_drop-shadow(0_6px_10px_rgba(15,22,18,0.3))]"
            style={{
              opacity: textProgress,
              transform: `translateX(${(1 - textProgress) * 32}px)`,
            }}
          >
            <div className="relative z-10">
              <span className="inline-flex items-center gap-2 rounded-full bg-stone-50/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-gold-bright">
                <IconTower className="h-3.5 w-3.5" />
                Nossa história
              </span>
              <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight md:text-4xl">
                Mais de 130 anos de história
              </h2>
              <p className="mt-4 text-stone-50/80">
                Erguida com pedras de grês extraídas localmente e inaugurada
                em 1899, a Igreja Matriz guarda pinturas de Ângelo Lazarini,
                uma Torre Monumento de 44 metros e um memorial dedicado à
                água como fonte de vida.
              </p>
              <div className="mt-7">
                <Button as="link" to="/sobre" variant="onDark">
                  Conheça a nossa história
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
