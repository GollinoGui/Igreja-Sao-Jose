import { useEffect, useRef, useState } from "react";

/**
 * Retorna "up" | "down" conforme a direção do scroll, com um limiar mínimo
 * de deslocamento para evitar toggles no menor tremor do trackpad. Sempre
 * "up" perto do topo da página, para a navbar nunca sumir logo de início.
 */
export function useScrollDirection({ threshold = 8, topOffset = 80 } = {}) {
  const [direction, setDirection] = useState("up");
  const lastY = useRef(typeof window !== "undefined" ? window.scrollY : 0);

  useEffect(() => {
    function handleScroll() {
      const currentY = window.scrollY;

      if (currentY < topOffset) {
        setDirection("up");
        lastY.current = currentY;
        return;
      }

      const delta = currentY - lastY.current;
      if (Math.abs(delta) < threshold) return;

      setDirection(delta > 0 ? "down" : "up");
      lastY.current = currentY;
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold, topOffset]);

  return direction;
}
