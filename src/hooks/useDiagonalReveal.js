import { useLayoutEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Guia a entrada, por scroll, da imagem diagonal da igreja em Hero.jsx.
 *
 * O progresso é conduzido pelo GSAP ScrollTrigger (scrub) em vez de um
 * listener de scroll manual: o `scrub` numérico dá à animação uma pequena
 * inércia (ela "persegue" a posição do scroll suavizada em ~0.9s) em vez
 * de espelhar 1:1 cada evento de scroll — é isso que elimina o efeito de
 * "pulo" e deixa a entrada fluida mesmo com scroll em degraus (roda de
 * mouse). O trigger vai do meio do Hero (heroRef) até o topo da seção de
 * história (historyRef) cruzar o centro da viewport.
 *
 * `span` mede, em pixels relativos ao wrapper posicionado (o pai
 * `relative` comum a heroRef e historyRef), o intervalo vertical que a
 * imagem diagonal deve ocupar: do meio do Hero até o fim da seção de
 * história.
 */
export function useDiagonalReveal(heroRef, historyRef, imageRef, cardRef, prefersReducedMotion) {
  const [span, setSpan] = useState({ top: 0, height: 0 });

  useLayoutEffect(() => {
    const heroEl = heroRef.current;
    const historyEl = historyRef.current;
    const imageEl = imageRef.current;
    const cardEl = cardRef.current;
    if (!heroEl || !historyEl) return undefined;

    function measure() {
      const top = heroEl.offsetTop + heroEl.offsetHeight / 2;
      const bottom = historyEl.offsetTop + historyEl.offsetHeight;
      setSpan({ top, height: Math.max(0, bottom - top) });
    }

    measure();

    if (prefersReducedMotion) {
      if (imageEl) gsap.set(imageEl, { opacity: 1, x: 0 });
      if (cardEl) gsap.set(cardEl, { opacity: 1, x: 0 });
      return undefined;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroEl,
          start: "center center",
          endTrigger: historyEl,
          end: "top center",
          scrub: 0.9,
          invalidateOnRefresh: true,
        },
        defaults: { ease: "power2.out" },
      });

      if (imageEl) {
        tl.fromTo(imageEl, { opacity: 0, x: -48 }, { opacity: 1, x: 0, duration: 0.55 }, 0);
      }
      if (cardEl) {
        tl.fromTo(cardEl, { opacity: 0, x: 32 }, { opacity: 1, x: 0, duration: 0.55 }, 0.45);
      }
    });

    function handleResize() {
      measure();
      ScrollTrigger.refresh();
    }

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      ctx.revert();
    };
  }, [heroRef, historyRef, imageRef, cardRef, prefersReducedMotion]);

  return { span };
}
