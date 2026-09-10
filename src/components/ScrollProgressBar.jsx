import { useScrollProgress } from "../hooks/useScrollProgress";
import { useScrollDirection } from "../hooks/useScrollDirection";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import hostia from "../assets/images/hostia.jpg";
import hostiaLocal from "../assets/images/hostia-local.png";

/**
 * Barra fixa no topo do site, ocupando o mesmo espaço da Navbar (ver
 * Layout.jsx). Ela só aparece quando a Navbar some ao rolar para baixo —
 * as duas nunca ficam visíveis ao mesmo tempo. Conforme a pessoa rola a
 * página, uma hóstia percorre a barra até chegar ao ícone fixo à
 * direita — o lugar onde ela repousa (ostensório).
 */
export function ScrollProgressBar() {
  const progress = useScrollProgress();
  const direction = useScrollDirection();
  const prefersReducedMotion = usePrefersReducedMotion();
  const arrived = progress >= 99.5;
  const visible = direction === "down";

  return (
    <div
      role="presentation"
      aria-hidden="true"
      className={`fixed inset-x-0 top-0 z-[70] h-9 transition-transform duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* Camada isolada só para o fundo desfocado: backdrop-blur é caro de
          repintar, e como não muda a cada frame, mantê-lo separado evita
          que o Chrome "prenda" a atualização da barra (que muda em todo
          frame de scroll) à repintura cara do blur, o que fazia a barra só
          parecer se mover quando a rolagem parava. */}
      <div
        className="absolute inset-0 bg-stone-50/95 backdrop-blur"
        style={{
          WebkitMaskImage: "linear-gradient(to bottom, black 65%, transparent 100%)",
          maskImage: "linear-gradient(to bottom, black 65%, transparent 100%)",
        }}
      />
      <div className="relative flex h-9 items-center gap-3 px-4">
        <div className="relative h-[3px] flex-1 rounded-full bg-stone-200">
          <div
            className="h-full rounded-full bg-gold"
            style={{
              width: `${progress}%`,
              transition: prefersReducedMotion ? undefined : "width 120ms linear",
            }}
          />
          <div
            className="absolute top-1/2 h-4 w-4"
            style={{
              left: `${progress}%`,
              transform: "translate(-50%, -50%)",
              transition: prefersReducedMotion ? undefined : "left 120ms linear",
            }}
          >
            <img src={hostia} alt="" className="h-full w-full rounded-full object-cover" />
          </div>
        </div>

        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center transition-transform duration-300 ${
            arrived && !prefersReducedMotion ? "scale-125" : "scale-100"
          }`}
        >
          <img src={hostiaLocal} alt="" className="h-full w-full object-contain" />
        </div>
      </div>
    </div>
  );
}
