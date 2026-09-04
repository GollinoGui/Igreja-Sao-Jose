import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useScrollDirection } from "../hooks/useScrollDirection";
import { LiturgicalBar } from "./LiturgicalBar";
import { IconTrinity } from "./icons";

const LINKS = [
  { to: "/", label: "Início" },
  { to: "/sobre", label: "Sobre" },
  { to: "/missas", label: "Missas" },
  { to: "/noticias", label: "Notícias" },
  { to: "/contato", label: "Contato" },
];

function linkClasses({ isActive }) {
  return `group relative py-1 font-sans text-[15px] transition-colors ${
    isActive ? "text-gold" : "text-ink hover:text-green-mid"
  }`;
}

function NavUnderline({ isActive }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute -bottom-1 left-0 h-[1.5px] w-full origin-left scale-x-0 bg-gold transition-transform duration-300 group-hover:scale-x-100 ${
        isActive ? "scale-x-100" : ""
      }`}
    />
  );
}

export function Navbar() {
  const direction = useScrollDirection();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 12);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-6 z-50 bg-stone-50/90 backdrop-blur-md transition-all duration-300 ${
        direction === "down" && !menuOpen ? "-translate-y-full" : "translate-y-0"
      } ${scrolled ? "shadow-soft" : ""}`}
    >
      <LiturgicalBar />
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <NavLink to="/" className="group flex items-center gap-2.5 font-serif text-lg font-semibold text-ink">
          <IconTrinity className="h-5 w-5 shrink-0 text-gold transition-transform duration-500 group-hover:rotate-[20deg]" />
          <span>Paróquia São José</span>
        </NavLink>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Navegação principal">
          {LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.to === "/"} className={linkClasses}>
              {({ isActive }) => (
                <>
                  {link.label}
                  <NavUnderline isActive={isActive} />
                </>
              )}
            </NavLink>
          ))}
          <NavLink
            to="/contato"
            className="rounded-full bg-green-deep px-5 py-2.5 font-sans text-sm font-medium text-stone-50 shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:bg-green-mid hover:shadow-lift"
          >
            Fale conosco
          </NavLink>
        </nav>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/20 transition-colors hover:border-gold md:hidden"
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

      <nav
        id="mobile-menu"
        aria-label="Navegação principal (mobile)"
        className={`grid overflow-hidden border-stone-200 bg-stone-50 transition-all duration-300 md:hidden ${
          menuOpen ? "grid-rows-[1fr] border-t opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="flex flex-col gap-1 overflow-hidden px-6 py-4">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                `rounded-lg px-3 py-3 font-sans text-base transition-colors ${
                  isActive ? "bg-gold/10 text-gold" : "text-ink hover:bg-stone-200/60"
                }`
              }
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  );
}
