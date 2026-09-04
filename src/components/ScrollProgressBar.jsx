import { useScrollProgress } from "../hooks/useScrollProgress";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import hostia from "../assets/images/hostia.jpg";
import hostiaLocal from "../assets/images/hostia-local.png";

/**
 * Barra fixa no topo do site, acima da Navbar (ver Layout.jsx e o
 * `sticky top-6` da Navbar, que reserva o espaço desta barra). Conforme a
 * pessoa rola a página, uma hóstia percorre a barra até chegar ao ícone
 * fixo à direita — o lugar onde ela repousa (ostensório).
 */
export function ScrollProgressBar() {
  const progress = useScrollProgress();
  const prefersReducedMotion = usePrefersReducedMotion();
  const arrived = progress >= 99.5;

  return (
    <div
      role="presentation"
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[70] flex h-6 items-center gap-3 bg-stone-50/95 px-4 backdrop-blur"
    >
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
        className={`flex h-5 w-5 shrink-0 items-center justify-center transition-transform duration-300 ${
          arrived && !prefersReducedMotion ? "scale-125" : "scale-100"
        }`}
      >
        <img src={hostiaLocal} alt="" className="h-full w-full object-contain" />
      </div>
    </div>
  );
}
