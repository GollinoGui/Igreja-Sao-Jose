import { Link } from "react-router-dom";
import { useContactInfo } from "../hooks/useContactInfo";

const QUICK_LINKS = [
  { to: "/sobre", label: "Sobre" },
  { to: "/missas", label: "Missas" },
  { to: "/noticias", label: "Notícias" },
  { to: "/contato", label: "Contato" },
];

export function Footer() {
  const { contact } = useContactInfo();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-green-deep text-stone-50">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-14 md:grid-cols-3">
        <div>
          <p className="font-serif text-lg font-semibold">Paróquia São José</p>
          <p className="mt-3 text-sm text-stone-50/80">{contact.address}</p>
          <p className="mt-2 text-sm text-stone-50/80">{contact.phone}</p>
        </div>

        <div>
          <p className="font-sans text-sm font-medium text-gold">Links rápidos</p>
          <ul className="mt-3 space-y-2">
            {QUICK_LINKS.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="text-sm text-stone-50/80 hover:text-gold">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-sans text-sm font-medium text-gold">Siga a paróquia</p>
          <a
            href={contact.instagram_url}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-block text-sm text-stone-50/80 hover:text-gold"
          >
            Instagram @matrizsaojoseorl
          </a>
        </div>
      </div>

      <div className="border-t border-stone-50/15">
        <p className="mx-auto max-w-6xl px-6 py-5 text-xs text-stone-50/60">
          © {year} Paróquia São José — Orlândia-SP, Diocese de Franca.
        </p>
      </div>
    </footer>
  );
}
