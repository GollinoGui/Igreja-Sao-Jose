import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CLOSED_CLIP = "inset(0% 0% 100% 0%)";
const OPEN_CLIP = "inset(0% 0% 0% 0%)";

/**
 * Abre a galeria diagonal "como um tapete" conforme a pessoa rola pela
 * seção (ver GallerySection.jsx): o painel fica `sticky` no topo enquanto
 * a seção-mãe (alta) passa pela viewport, e um clip-path revela a galeria
 * de cima pra baixo, preso ao progresso do scroll (`scrub`) via
 * start/end "top top" / "bottom bottom" — o mesmo intervalo em que o
 * painel (h-screen, do tamanho da viewport) fica grudado no topo; "bottom
 * bottom" mede o fim da seção contra o RODAPÉ da viewport (não o topo),
 * que é onde o `position: sticky` nativo realmente solta o painel.
 *
 * Ao alcançar o fim da seção (scroll ultrapassa "bottom bottom", exatamente
 * o instante em que o painel sticky se solta e volta ao fluxo normal), a
 * revelação trava aberta e o ScrollTrigger é destruído — não volta a
 * animar rolando pra cima e pra baixo de novo, só depois de um reload da
 * página (mesmo padrão de useDiagonalReveal.js). `onRevealed` roda nesse
 * instante pra congelar a animação contínua da galeria; passe o setter de
 * estado direto (ex.: `setRevealed`), não uma arrow function inline — a
 * identidade estável evita recriar o ScrollTrigger a cada re-render.
 */
export function useCarpetReveal(sectionRef, curtainRef, prefersReducedMotion, onRevealed) {
  useLayoutEffect(() => {
    const sectionEl = sectionRef.current;
    const curtainEl = curtainRef.current;
    if (!sectionEl || !curtainEl) return undefined;

    if (prefersReducedMotion) {
      gsap.set(curtainEl, { clipPath: OPEN_CLIP });
      onRevealed(true);
      return undefined;
    }

    gsap.set(curtainEl, { clipPath: CLOSED_CLIP });

    const ctx = gsap.context(() => {
      gsap.fromTo(
        curtainEl,
        { clipPath: CLOSED_CLIP },
        {
          clipPath: OPEN_CLIP,
          ease: "none",
          scrollTrigger: {
            trigger: sectionEl,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.5,
            onLeave: (self) => {
              // kill() ANTES do gsap.set: matando o ScrollTrigger enquanto ele
              // ainda "possui" o tween ligado via scrub faz o GSAP reassumir o
              // controle do clip-path e voltar pro valor inicial do fromTo —
              // na ordem inversa, o set final não sobrevive. Setando depois
              // de matar o trigger, nada mais mexe na propriedade depois.
              self.kill();
              gsap.set(curtainEl, { clipPath: OPEN_CLIP });
              onRevealed(true);
            },
          },
        }
      );
    }, sectionEl);

    function handleResize() {
      ScrollTrigger.refresh();
    }

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      ctx.revert();
    };
  }, [sectionRef, curtainRef, prefersReducedMotion, onRevealed]);
}
