import { useRef } from "react";
import { Button } from "./Button";
import { LiturgicalIndicator } from "./LiturgicalIndicator";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { useDiagonalReveal } from "../hooks/useDiagonalReveal";
import igrejaFrontal from "../assets/images/igreja-frontal.jpg";
import igrejaDiagonal from "../assets/images/igreja-diagonal.png";

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
    <div className="relative">
      {/* foto diagonal — entrada no scroll, do meio do Hero ao fim da
          seção de história, deslizando da esquerda como se surgisse
          dentro de uma tela */}
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
            className="h-full w-[58%] min-w-[320px] max-w-[620px] object-contain object-left-bottom"
          />
        </div>
      </div>

      <section
        ref={heroRef}
        className="relative z-10 mx-auto max-w-6xl px-6 pb-20 pt-16 md:pb-28 md:pt-24"
      >
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[55%_45%] md:items-center">
          <div>
            <p
              className={`mb-4 font-sans text-sm font-medium tracking-wide text-green-mid ${stepClass()}`}
              style={stepStyle(0)}
            >
              Orlândia, SP · Diocese de Franca
            </p>
            <h1
              className={`font-serif text-4xl font-semibold leading-tight text-ink md:text-5xl lg:text-[56px] ${stepClass()}`}
              style={stepStyle(0)}
            >
              Paróquia São José
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

          <div className={stepClass()} style={stepStyle(450)}>
            <img
              src={igrejaFrontal}
              alt="Fachada da Igreja Matriz São José"
              className="h-64 w-full rounded-2xl object-cover md:h-full md:max-h-[420px]"
            />
          </div>
        </div>
      </section>

      <section ref={historyRef} className="relative z-10 bg-stone-200/60">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          {/* em mobile, a foto diagonal aparece aqui, estática e empilhada */}
          <img
            src={igrejaDiagonal}
            alt="Igreja Matriz São José vista em ângulo diagonal"
            className="mb-8 h-56 w-full object-contain object-left-bottom md:hidden"
          />

          <div
            className="ml-auto max-w-md"
            style={{
              opacity: textProgress,
              transform: `translateX(${(1 - textProgress) * 32}px)`,
            }}
          >
            <h2 className="font-serif text-2xl font-semibold text-ink md:text-3xl">
              Mais de 130 anos de história
            </h2>
            <p className="mt-4 text-ink/80">
              Erguida com pedras de grês extraídas localmente e inaugurada em
              1899, a Igreja Matriz guarda pinturas de Ângelo Lazarini, uma
              Torre Monumento de 44 metros e um memorial dedicado à água como
              fonte de vida.
            </p>
            <div className="mt-6">
              <Button as="link" to="/sobre" variant="secondary">
                Conheça a nossa história
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
