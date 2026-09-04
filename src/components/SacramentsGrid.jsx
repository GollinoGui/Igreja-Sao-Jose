import { SACRAMENTS } from "../lib/content";
import { WhatsAppButton } from "./WhatsAppButton";
import { Reveal } from "./Reveal";
import { SACRAMENT_ICONS, IconTrinity } from "./icons";

const ACCENTS = ["bg-gold", "bg-green-mid", "bg-terracotta"];

/**
 * Os sete sacramentos, lado a lado — mesmo os que não têm CTA de WhatsApp
 * (Eucaristia e Confissão acontecem nas missas, sem agendamento).
 */
export function SacramentsGrid({ whatsappUrl }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {SACRAMENTS.map((sacrament, index) => {
        const Icon = SACRAMENT_ICONS[sacrament.key];
        const accent = ACCENTS[index % ACCENTS.length];

        return (
          <Reveal
            key={sacrament.key}
            delay={(index % 3) * 90}
            className="group relative flex flex-col gap-3 overflow-hidden rounded-2xl border border-stone-200 bg-stone-50 p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
          >
            <span className={`absolute inset-x-0 top-0 h-1 ${accent}`} aria-hidden="true" />
            {Icon && (
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-stone-200/60 text-green-deep transition-colors duration-300 group-hover:bg-gold/15 group-hover:text-gold">
                <Icon className="h-5 w-5" />
              </div>
            )}
            <h3 className="font-serif text-xl font-semibold text-ink">{sacrament.name}</h3>
            <p className="flex-1 text-sm text-ink/70">{sacrament.description}</p>
            {sacrament.whatsapp ? (
              <WhatsAppButton href={whatsappUrl} className="mt-1 self-start" />
            ) : (
              <span className="mt-1 inline-block w-fit rounded-full bg-stone-200 px-3 py-1 text-xs font-medium text-ink/70">
                Nas celebrações, sem agendamento
              </span>
            )}
          </Reveal>
        );
      })}

      <Reveal
        delay={210}
        className="hidden items-center justify-center gap-3 rounded-2xl border border-dashed border-stone-200 p-6 text-ink/50 sm:flex"
      >
        <IconTrinity className="h-6 w-6 text-gold" />
        <p className="font-serif text-sm italic">Sete sacramentos, uma só fé</p>
      </Reveal>
    </div>
  );
}
