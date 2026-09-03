import { Link } from "react-router-dom";

const VARIANTS = {
  primary:
    "bg-green-deep text-stone-50 hover:bg-green-mid",
  secondary:
    "border border-ink/30 text-ink hover:border-gold hover:text-gold",
  onDark:
    "border border-stone-50/40 text-stone-50 hover:border-gold hover:text-gold",
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-medium font-sans text-[15px] transition-colors duration-200";

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
