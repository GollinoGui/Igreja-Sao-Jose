import { SACRAMENTS } from "../lib/content";
import { WhatsAppButton } from "./WhatsAppButton";

/**
 * Os sete sacramentos, lado a lado — mesmo os que não têm CTA de WhatsApp
 * (Eucaristia e Confissão acontecem nas missas, sem agendamento).
 */
export function SacramentsGrid({ whatsappUrl }) {
  return (
    <div className="grid grid-cols-1 gap-px bg-stone-200 sm:grid-cols-2 lg:grid-cols-3">
      {SACRAMENTS.map((sacrament) => (
        <div key={sacrament.key} className="flex flex-col gap-3 bg-stone-50 p-6">
          <h3 className="font-serif text-xl font-semibold text-ink">{sacrament.name}</h3>
          <p className="flex-1 text-sm text-ink/75">{sacrament.description}</p>
          {sacrament.whatsapp ? (
            <WhatsAppButton href={whatsappUrl} className="mt-1 self-start" />
          ) : (
            <span className="mt-1 inline-block w-fit rounded-full bg-stone-200 px-3 py-1 text-xs font-medium text-ink/70">
              Nas celebrações, sem agendamento
            </span>
          )}
        </div>
      ))}

      {/* preenche a última célula da grade (7 não é múltiplo de 2 nem de 3)
          com o mesmo símbolo trinitário usado nos divisores do site */}
      <div className="hidden items-center justify-center gap-3 bg-stone-50 p-6 text-ink/50 sm:flex">
        <svg viewBox="0 0 32 32" width="22" height="22" aria-hidden="true">
          <g fill="none" stroke="var(--color-gold)" strokeWidth="1.6">
            <circle cx="16" cy="11" r="5.2" />
            <circle cx="11.3" cy="19" r="5.2" />
            <circle cx="20.7" cy="19" r="5.2" />
          </g>
        </svg>
        <p className="font-serif text-sm italic">Sete sacramentos, uma só fé</p>
      </div>
    </div>
  );
}
