import { useMemo } from "react";
import { getLiturgicalInfo } from "../lib/liturgicalCalendar";

/**
 * Indicador textual "Hoje: <tempo litúrgico> · <cor>", usado como detalhe
 * pontual (ex: canto da Home). Mesma lógica de src/lib/liturgicalCalendar.js
 * usada na LiturgicalBar.
 */
export function LiturgicalIndicator({ className = "", style }) {
  const info = useMemo(() => getLiturgicalInfo(), []);

  return (
    <div className={`inline-flex items-center gap-2 text-sm text-ink/60 ${className}`} style={style}>
      <span
        aria-hidden="true"
        className="h-2 w-2 rounded-full"
        style={{ backgroundColor: info.hex }}
      />
      <span>
        Hoje: {info.season} · {info.name}
      </span>
    </div>
  );
}
