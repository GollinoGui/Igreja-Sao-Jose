import { useLayoutEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Guia a entrada da imagem diagonal da igreja em Hero.jsx.
 *
 * Dispara uma única vez (ScrollTrigger `once: true`) quando o meio do Hero
 * cruza o centro da viewport: a partir daí a imagem e o card animam com uma
 * tween normal (duração fixa, sem scrub) e ficam parados no estado final —
 * não voltam a animar ao rolar para cima e para baixo de novo, só depois de
 * um reload da página.
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
          once: true,
        },
        defaults: { ease: "power2.out" },
      });

      if (imageEl) {
        tl.fromTo(imageEl, { opacity: 0, x: -48 }, { opacity: 1, x: 0, duration: 1.2 }, 0);
      }
      if (cardEl) {
        tl.fromTo(cardEl, { opacity: 0, x: 32 }, { opacity: 1, x: 0, duration: 1.1 }, 0.5);
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
