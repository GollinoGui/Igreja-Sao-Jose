import { useEffect, useRef, useState } from "react";

/**
 * Progresso de rolagem da página inteira, de 0 a 100. Usado pela
 * ScrollProgressBar para posicionar a hóstia ao longo da barra do topo.
 */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  const ticking = useRef(false);

  useEffect(() => {
    function update() {
      ticking.current = false;
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const max = scrollHeight - clientHeight;
      setProgress(max > 0 ? Math.min(100, Math.max(0, (scrollTop / max) * 100)) : 0);
    }

    function handleScroll() {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return progress;
}
