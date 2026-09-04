import { useEffect, useRef, useState } from "react";

/**
 * Guia a entrada, por scroll, da imagem diagonal da igreja em Hero.jsx.
 *
 * `progress` vai de 0 a 1 conforme o meio do Hero (heroRef) avança até a
 * base da seção de história (historyRef) cruzar o meio da viewport — o
 * gatilho é relativo ao viewport, não à posição absoluta no documento,
 * para o efeito se comportar de forma parecida em qualquer altura de tela.
 *
 * `span` mede, em pixels relativos ao wrapper posicionado (o pai
 * `relative` comum a heroRef e historyRef), o intervalo vertical que a
 * imagem diagonal deve ocupar: do meio do Hero até o fim da seção de
 * história.
 */
export function useDiagonalReveal(heroRef, historyRef) {
  const [progress, setProgress] = useState(0);
  const [span, setSpan] = useState({ top: 0, height: 0 });
  const ticking = useRef(false);

  useEffect(() => {
    function measure() {
      const heroEl = heroRef.current;
      const historyEl = historyRef.current;
      if (!heroEl || !historyEl) return;

      const top = heroEl.offsetTop + heroEl.offsetHeight / 2;
      const bottom = historyEl.offsetTop + historyEl.offsetHeight;
      setSpan({ top, height: Math.max(0, bottom - top) });
    }

    function updateProgress() {
      ticking.current = false;
      const heroEl = heroRef.current;
      const historyEl = historyRef.current;
      if (!heroEl || !historyEl) return;

      const heroRect = heroEl.getBoundingClientRect();
      const historyRect = historyEl.getBoundingClientRect();
      const startY = heroRect.top + heroRect.height / 2;
      const endY = historyRect.bottom;
      const trigger = window.innerHeight * 0.5;

      if (endY <= startY) {
        setProgress(1);
        return;
      }

      const raw = (trigger - startY) / (endY - startY);
      setProgress(Math.min(1, Math.max(0, raw)));
    }

    function handleScroll() {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(updateProgress);
    }

    function handleResize() {
      measure();
      updateProgress();
    }

    measure();
    updateProgress();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [heroRef, historyRef]);

  return { progress, span };
}
