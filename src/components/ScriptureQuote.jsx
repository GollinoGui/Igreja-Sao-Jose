/**
 * Epígrafe bíblica discreta — no máximo uma por página. Elemento
 * tipográfico pequeno, nunca um bloco de destaque.
 */
export function ScriptureQuote({ text, reference, className = "" }) {
  return (
    <p className={`font-serif text-base italic text-ink/70 ${className}`}>
      “{text}” <span className="not-italic text-sm text-ink/50">— {reference}</span>
    </p>
  );
}
