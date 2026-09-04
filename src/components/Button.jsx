import { Link } from "react-router-dom";

const VARIANTS = {
  primary:
    "bg-green-deep text-stone-50 shadow-soft hover:bg-green-mid hover:shadow-lift",
  gold: "bg-gold text-stone-900 shadow-soft hover:bg-gold-bright hover:shadow-lift",
  secondary:
    "border border-ink/25 text-ink hover:border-gold hover:text-gold hover:bg-gold/5",
  onDark:
    "border border-stone-50/40 text-stone-50 hover:border-gold-bright hover:text-gold-bright",
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-medium font-sans text-[15px] transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]";

/**
 * Botão/link com a mesma identidade visual em todo o site.
 * Sem "→" no fim do texto e sem letras maiúsculas forçadas.
 */
export function Button({ as = "button", variant = "primary", className = "", children, ...props }) {
  const classes = `${baseClasses} ${VARIANTS[variant] ?? VARIANTS.primary} ${className}`;

  if (as === "link") {
    return (
      <Link className={classes} {...props}>
        {children}
      </Link>
    );
  }

  if (as === "a") {
    return (
      <a className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
