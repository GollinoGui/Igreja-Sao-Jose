import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useScrollDirection } from "../hooks/useScrollDirection";
import { LiturgicalBar } from "./LiturgicalBar";

const LINKS = [
  { to: "/", label: "Início" },
  { to: "/sobre", label: "Sobre" },
  { to: "/missas", label: "Missas" },
  { to: "/noticias", label: "Notícias" },
  { to: "/contato", label: "Contato" },
];

function linkClasses({ isActive }) {
  return `font-sans text-[15px] transition-colors ${
    isActive ? "text-gold" : "text-ink hover:text-green-mid"
  }`;
}

export function Navbar() {
  const direction = useScrollDirection();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className={`sticky top-6 z-50 bg-stone-50/95 backdrop-blur transition-transform duration-300 ${
        direction === "down" && !menuOpen ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <LiturgicalBar />
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <NavLink to="/" className="font-serif text-lg font-semibold text-ink">
          Paróquia São José
        </NavLink>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Navegação principal">
          {LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.to === "/"} className={linkClasses}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/20 md:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
            {menuOpen ? (
              <path
                d="M2 2l14 14M16 2L2 16"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            ) : (
              <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                <line x1="1" y1="4" x2="17" y2="4" />
                <line x1="1" y1="9" x2="17" y2="9" />
                <line x1="1" y1="14" x2="17" y2="14" />
              </g>
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <nav
          id="mobile-menu"
          aria-label="Navegação principal (mobile)"
          className="flex flex-col gap-1 border-t border-stone-200 bg-stone-50 px-6 py-4 md:hidden"
        >
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                `rounded-lg px-3 py-3 font-sans text-base ${
                  isActive ? "bg-stone-200 text-gold" : "text-ink"
                }`
              }
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}
