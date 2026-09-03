/**
 * Divisor decorativo do site: uma linha fina com um trevo de três círculos
 * entrelaçados ao centro (o mesmo desenho do favicon), discreto lembrete
 * visual da Santíssima Trindade usado nas transições entre seções — no
 * lugar de uma hairline genérica, mas com a mesma função estrutural.
 */
export function TrinityDivider({ className = "" }) {
  return (
    <div
      role="presentation"
      aria-hidden="true"
      className={`flex items-center gap-4 ${className}`}
    >
      <span className="h-px flex-1 bg-stone-200" />
      <svg viewBox="0 0 32 32" width="20" height="20" className="shrink-0">
        <g fill="none" stroke="var(--color-gold)" strokeWidth="1.6">
          <circle cx="16" cy="11" r="5.2" />
          <circle cx="11.3" cy="19" r="5.2" />
          <circle cx="20.7" cy="19" r="5.2" />
        </g>
      </svg>
      <span className="h-px flex-1 bg-stone-200" />
    </div>
  );
}
