import { Button } from "./Button";
import { ChurchSilhouette } from "./ChurchSilhouette";
import { LiturgicalIndicator } from "./LiturgicalIndicator";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

/**
 * Hero + seção de história curta logo abaixo, tratados como uma unidade
 * porque a imagem da igreja atravessa visualmente as duas: o topo (torres)
 * fica dentro do Hero, a base (fachada/porta) entra na seção seguinte.
 *
 * Em mobile o efeito de sobreposição é simplificado: a imagem vira um
 * bloco normal, empilhado acima do texto, sem position: absolute.
 */
export function Hero() {
  const prefersReducedMotion = usePrefersReducedMotion();

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
      {/* imagem — desktop: absoluta, atravessando Hero + seção de história */}
      <div
        className={`pointer-events-none absolute inset-x-0 top-0 z-0 hidden md:block ${stepClass()}`}
        style={stepStyle(450)}
        aria-hidden="true"
      >
        <div className="mx-auto max-w-6xl px-6">
          <ChurchSilhouette className="ml-auto h-auto w-[46%] min-w-[280px] max-w-[500px]" />
        </div>
      </div>

      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-20 pt-16 md:pb-28 md:pt-24">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[55%_45%]">
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

          {/* espaço reservado para a imagem no grid desktop; em mobile, a
              silhueta aparece aqui mesmo, empilhada e sem sobreposição */}
          <div
            className={`md:hidden ${stepClass()}`}
            style={stepStyle(450)}
          >
            <ChurchSilhouette className="h-64 w-full" />
          </div>
        </div>
      </section>

      <section className="relative z-10 bg-stone-200/60">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <div className="max-w-md">
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
