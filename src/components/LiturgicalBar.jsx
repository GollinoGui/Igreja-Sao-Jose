import { useMemo } from "react";
import { getLiturgicalInfo } from "../lib/liturgicalCalendar";

/**
 * Barra fina no topo da navbar com a cor litúrgica do dia. Camada extra,
 * discreta — não substitui a paleta fixa do site em nenhum outro lugar.
 */
export function LiturgicalBar() {
  const info = useMemo(() => getLiturgicalInfo(), []);

  return (
    <div
      role="presentation"
      aria-hidden="true"
      className="h-[3px] w-full"
      style={{ backgroundColor: info.hex }}
    />
  );
}
