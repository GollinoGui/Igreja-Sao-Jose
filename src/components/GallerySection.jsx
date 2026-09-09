import { useRef, useState } from "react";
import { DiagonalGallery } from "./DiagonalGallery";
import { useCarpetReveal } from "../hooks/useCarpetReveal";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

/**
 * Seção "escondida" entre a leitura do dia e os sacramentos: some no fluxo
 * normal e só se revela (efeito de tapete se abrindo) enquanto a pessoa
 * rola por ela — ver useCarpetReveal.js. A altura de 220vh da seção é só
 * o "trilho" de scroll pro efeito; o painel visível é sempre 100vh
 * (sticky). Ao final, a animação contínua da galeria congela e a seção
 * vira normal no fluxo — os Sacramentos, logo em seguida no DOM, aparecem
 * embaixo dela como qualquer outra seção.
 *
 * `aria-hidden`: puramente decorativa (fotos-placeholder sem legenda, ver
 * GALLERY_PHOTOS), sem link ou texto único — não faz falta a leitores de
 * tela.
 */
export function GallerySection() {
  const sectionRef = useRef(null);
  const curtainRef = useRef(null);
  const [revealed, setRevealed] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useCarpetReveal(sectionRef, curtainRef, prefersReducedMotion, setRevealed);

  return (
    <section ref={sectionRef} aria-hidden="true" className="relative" style={{ height: "220vh" }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div
          ref={curtainRef}
          className="absolute inset-0"
          style={{
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)",
            maskImage: "linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)",
          }}
        >
          <DiagonalGallery paused={revealed || prefersReducedMotion} />
        </div>
      </div>
    </section>
  );
}
