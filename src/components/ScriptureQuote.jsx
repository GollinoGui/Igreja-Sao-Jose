/**
 * Epígrafe bíblica — elemento tipográfico com destaque discreto (aspas
 * grandes em segundo plano), no máximo uma por página.
 */
export function ScriptureQuote({ text, reference, className = "", tone = "light" }) {
  const isDark = tone === "dark";

  return (
    <blockquote className={`relative pl-2 ${className}`}>
      <span
        aria-hidden="true"
        className={`absolute -left-2 -top-6 font-serif text-7xl leading-none ${
          isDark ? "text-stone-50/10" : "text-gold/15"
        }`}
      >
        “
      </span>
      <p className={`relative font-serif text-xl italic leading-snug md:text-2xl ${isDark ? "text-stone-50" : "text-ink/85"}`}>
        {text}
      </p>
      <cite className={`mt-3 block text-sm not-italic ${isDark ? "text-stone-50/55" : "text-ink/50"}`}>
        — {reference}
      </cite>
    </blockquote>
  );
}
