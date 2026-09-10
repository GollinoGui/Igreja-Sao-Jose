import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * "Empurra" os Sacramentos pra baixo conforme a pessoa rola: a seção da
 * galeria (ver GallerySection.jsx) nasce com altura 0 — à primeira vista
 * os Sacramentos aparecem logo abaixo da leitura do dia, sem vão nenhum —
 * e cresce suavemente, preso ao scroll (`scrub`), até preencher a tela.
 *
 * Primeira tentativa interceptava wheel/touch e somava o delta bruto na
 * altura, sem nenhum suavizador — na Playwright parecia ótimo (evento
 * sintético, 16ms entre ticks), mas num mouse/trackpad real um wheel-tick
 * já pode valer 100+px de uma vez, e sem easing isso vira um "pulo" em
 * vez de crescer aos poucos. O `scrub` do GSAP resolve isso de fábrica:
 * interpola a altura suavemente em direção ao progresso do scroll (em vez
 * de aplicá-lo cru), então mesmo uma rolagem brusca fica visível como
 * crescimento gradual — e funciona igual em wheel/touch/teclado/scrollbar
 * de graça, sem precisar interceptar cada tipo de input à mão.
 *
 * O gatilho do ScrollTrigger é `markerRef` (um irmão de altura 0 logo
 * antes da seção, nunca redimensionado) e não a própria seção que cresce
 * — se o gatilho fosse o elemento cuja altura estamos animando, o GSAP
 * poderia se confundir sobre onde "start"/"end" caem conforme a altura
 * muda. O intervalo "top 70%" → "top 10%" (~60% da viewport de scroll)
 * cresce mais rápido do que a página rola nesse trecho, por isso a borda
 * de baixo da seção — e os Sacramentos, logo depois no DOM — realmente
 * *descem* na tela conforme a galeria abre, em vez de só aparecer já
 * pronta.
 *
 * Ao alcançar o fim (scroll ultrapassa "top 10%", ou seja, a seção já
 * teria virado normal), a abertura trava cheia e o ScrollTrigger é
 * destruído — não anima de novo rolando pra cima e pra baixo, só depois
 * de um reload (mesmo padrão de useDiagonalReveal.js). Importante: o
 * `kill()` tem que vir ANTES do `gsap.set()` final — na ordem inversa, o
 * GSAP reassume a propriedade ao matar o trigger e desfaz o set.
 */
export function useCarpetPush(markerRef, boxRef, prefersReducedMotion) {
  useLayoutEffect(() => {
    const markerEl = markerRef.current;
    const boxEl = boxRef.current;
    if (!markerEl || !boxEl) return undefined;

    const targetHeight = window.innerHeight;

    if (prefersReducedMotion) {
      boxEl.style.height = `${targetHeight}px`;
      return undefined;
    }

    boxEl.style.height = "0px";

    const ctx = gsap.context(() => {
      gsap.fromTo(
        boxEl,
        { height: "0px" },
        {
          height: `${targetHeight}px`,
          ease: "none",
          scrollTrigger: {
            trigger: markerEl,
            start: "top 70%",
            end: "top 10%",
            scrub: 0.8,
            onLeave: (self) => {
              self.kill();
              gsap.set(boxEl, { height: `${targetHeight}px` });
            },
          },
        }
      );
    });

    function handleResize() {
      ScrollTrigger.refresh();
    }

    window.addEventListener("resize", handleResize);
    console.log(
      "[debug] ScrollTrigger snapshot:",
      JSON.stringify(
        ScrollTrigger.getAll().map((st) => ({
          isThisMarker: st.trigger === markerEl,
          start: Math.round(st.start),
          end: Math.round(st.end),
        }))
      )
    );
    return () => {
      window.removeEventListener("resize", handleResize);
      ctx.revert();
    };
  }, [markerRef, boxRef, prefersReducedMotion]);
}
