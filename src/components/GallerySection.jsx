import { useRef } from "react";
import { DiagonalGallery } from "./DiagonalGallery";
import { useCarpetPush } from "../hooks/useCarpetPush";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

/**
 * Seção "escondida" entre a leitura do dia e os sacramentos: nasce com
 * altura 0 (Sacramentos aparece logo abaixo da leitura do dia à primeira
 * vista) e cresce suavemente conforme a pessoa rola, empurrando
 * Sacramentos pra baixo — ver useCarpetPush.js. `markerRef` é só o
 * gatilho do scroll (altura 0, nunca muda de tamanho); `boxRef` é quem
 * de fato cresce. O conteúdo interno é fixo em 100vh e fica ancorado no
 * topo; `overflow-hidden` na seção revela cada vez mais dele conforme a
 * altura cresce, como um tapete se abrindo de cima pra baixo. Ao
 * concluir, a seção trava nessa altura e vira uma seção normal do fluxo.
 *
 * `aria-hidden`: puramente decorativa (fotos-placeholder sem legenda, ver
 * GALLERY_PHOTOS), sem link ou texto único — não faz falta a leitores de
 * tela.
 */
export function GallerySection() {
  const markerRef = useRef(null);
  const boxRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useCarpetPush(markerRef, boxRef, prefersReducedMotion);

  return (
    <>
      <div ref={markerRef} aria-hidden="true" style={{ height: 0 }} />
      <section ref={boxRef} aria-hidden="true" className="relative w-full overflow-hidden" style={{ height: 0 }}>
        <div
          className="absolute inset-x-0 top-0"
          style={{
            height: "100vh",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 8%, black 100%)",
            maskImage: "linear-gradient(to bottom, transparent 0%, black 8%, black 100%)",
          }}
        >
          <DiagonalGallery />
          {/* Em vez de esmaecer pra transparente (o que revelaria o creme
              de fundo da página), esmaece pro mesmo verde do mesh-emerald
              dos Sacramentos — a transição parece fusão com a seção
              seguinte, não um "buraco" antes dela. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3"
            style={{ background: "linear-gradient(to bottom, transparent 0%, var(--color-green-deep) 100%)" }}
          />
        </div>
      </section>
    </>
  );
}
