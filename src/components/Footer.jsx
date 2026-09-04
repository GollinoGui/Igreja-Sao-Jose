import { Link } from "react-router-dom";
import { useContactInfo } from "../hooks/useContactInfo";
import { useMassSchedule } from "../hooks/useMassSchedule";
import { IconTrinity, IconMapPin, IconPhone, IconMail } from "./icons";

const QUICK_LINKS = [
  { to: "/sobre", label: "Sobre" },
  { to: "/missas", label: "Missas" },
  { to: "/noticias", label: "Notícias" },
  { to: "/contato", label: "Contato" },
];

export function Footer() {
  const { contact } = useContactInfo();
  const { schedule } = useMassSchedule();
  const year = new Date().getFullYear();
  const nextFew = schedule.slice(0, 4);

  return (
    <footer className="mesh-emerald grain-overlay relative overflow-hidden text-stone-50">
      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 py-16 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <IconTrinity className="h-6 w-6 text-gold-bright" />
            <p className="font-serif text-lg font-semibold">Paróquia São José</p>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-stone-50/70">
            Desde 1899, comunidade viva em Orlândia-SP, na Diocese de Franca —
            reunida em torno da fé e da devoção ao nosso padroeiro.
          </p>
          <div className="mt-5 flex items-start gap-2 text-sm text-stone-50/75">
            <IconMapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-bright" />
            <span>{contact.address}</span>
          </div>
          <div className="mt-2 flex items-center gap-2 text-sm text-stone-50/75">
            <IconPhone className="h-4 w-4 shrink-0 text-gold-bright" />
            <span>{contact.phone}</span>
          </div>
          <div className="mt-2 flex items-center gap-2 text-sm text-stone-50/75">
            <IconMail className="h-4 w-4 shrink-0 text-gold-bright" />
            <span>{contact.email}</span>
          </div>
        </div>

        <div>
          <p className="font-sans text-xs font-semibold uppercase tracking-wider text-gold-bright">
            Navegação
          </p>
          <ul className="mt-4 space-y-2.5">
            {QUICK_LINKS.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="text-sm text-stone-50/75 transition-colors hover:text-gold-bright"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-sans text-xs font-semibold uppercase tracking-wider text-gold-bright">
            Próximas missas
          </p>
          <ul className="mt-4 space-y-2.5">
            {nextFew.map((item) => (
              <li key={item.id} className="flex items-baseline justify-between gap-3 text-sm">
                <span className="text-stone-50/70">{item.day_label}</span>
                <span className="font-medium text-stone-50">{item.time}</span>
              </li>
            ))}
          </ul>
          <Link
            to="/missas"
            className="mt-4 inline-block text-sm text-gold-bright underline decoration-gold-bright/30 underline-offset-4 hover:text-stone-50"
          >
            Ver todos os horários
          </Link>
        </div>

        <div>
          <p className="font-sans text-xs font-semibold uppercase tracking-wider text-gold-bright">
            Siga a paróquia
          </p>
          <a
            href={contact.instagram_url}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-block text-sm text-stone-50/75 transition-colors hover:text-gold-bright"
          >
            Instagram @matrizsaojoseorl
          </a>
          <a
            href={contact.whatsapp_url}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-stone-50/10 px-4 py-2.5 text-sm font-medium text-stone-50 transition-colors hover:bg-stone-50/20"
          >
            Falar no WhatsApp
          </a>
        </div>
      </div>

      <div className="relative z-10 border-t border-stone-50/10">
        <p className="mx-auto flex max-w-6xl flex-col gap-1 px-6 py-6 text-xs text-stone-50/55 sm:flex-row sm:items-center sm:justify-between">
          <span>© {year} Paróquia São José — Orlândia-SP, Diocese de Franca.</span>
          <span>Feito com fé e cuidado pela comunidade.</span>
        </p>
      </div>
    </footer>
  );
}
