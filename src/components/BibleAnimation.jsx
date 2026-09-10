import { useEffect, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useInView } from "../hooks/useInView";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import bookAnimation from "../assets/animations/book.lottie?url";

const LAST_FRAME = 48;

/**
 * Bíblia animada (dotLottie) que abre e fecha em loop (vaivém) a partir do
 * momento em que entra na tela. Com prefers-reduced-motion, nasce direto no
 * último quadro (livro aberto), sem animar.
 */
export function BibleAnimation({ className = "" }) {
  const [ref, inView] = useInView({ threshold: 0.4 });
  const prefersReducedMotion = usePrefersReducedMotion();
  const [dotLottie, setDotLottie] = useState(null);

  useEffect(() => {
    if (!dotLottie) return;

    const showOpenBook = () => dotLottie.setFrame(LAST_FRAME);

    if (dotLottie.isLoaded) {
      if (prefersReducedMotion) showOpenBook();
      return;
    }

    const handleReady = () => {
      if (prefersReducedMotion) showOpenBook();
    };
    dotLottie.addEventListener("ready", handleReady);
    return () => dotLottie.removeEventListener("ready", handleReady);
  }, [dotLottie, prefersReducedMotion]);

  useEffect(() => {
    if (!dotLottie || prefersReducedMotion || !inView) return;
    if (dotLottie.isLoaded) {
      dotLottie.play();
    } else {
      const handleReady = () => dotLottie.play();
      dotLottie.addEventListener("ready", handleReady);
      return () => dotLottie.removeEventListener("ready", handleReady);
    }
  }, [dotLottie, inView, prefersReducedMotion]);

  return (
    <div ref={ref} className={className} aria-hidden="true">
      <DotLottieReact
        src={bookAnimation}
        autoplay={false}
        loop
        mode="bounce"
        dotLottieRefCallback={setDotLottie}
      />
    </div>
  );
}
