import { useEffect } from "react";
import { useContactInfo } from "../hooks/useContactInfo";
import { OTHER_SERVICES } from "../lib/content";
import { SacramentsGrid } from "../components/SacramentsGrid";
import { WhatsAppButton } from "../components/WhatsAppButton";
import { TrinityDivider } from "../components/TrinityDivider";

export function Contato() {
  const { contact } = useContactInfo();

  useEffect(() => {
    document.title = "Contato — Paróquia São José";
  }, []);

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    contact.address
  )}`;

  return (
    <div>
      <header className="mx-auto max-w-6xl px-6 pb-10 pt-16 md:pt-20">
        <p className="font-sans text-sm font-medium text-green-mid">Contato</p>
        <h1 className="mt-3 font-serif text-4xl font-semibold text-ink md:text-5xl">
          Fale com a paróquia
        </h1>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[55%_45%]">
          <div>
            <dl className="space-y-5">
              <div>
                <dt className="font-sans text-sm font-medium text-gold">Endereço</dt>
                <dd className="mt-1 text-ink/85">{contact.address}</dd>
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 inline-block text-sm text-green-mid underline decoration-stone-200 underline-offset-4 hover:text-gold"
                >
                  Ver no mapa
                </a>
              </div>
              <div>
                <dt className="font-sans text-sm font-medium text-gold">Telefone</dt>
                <dd className="mt-1 text-ink/85">{contact.phone}</dd>
              </div>
              <div>
                <dt className="font-sans text-sm font-medium text-gold">E-mail</dt>
                <dd className="mt-1 text-ink/85">{contact.email}</dd>
              </div>
              <div>
                <dt className="font-sans text-sm font-medium text-gold">Horário de atendimento</dt>
                <dd className="mt-1 text-ink/85">{contact.office_hours}</dd>
              </div>
            </dl>
            <WhatsAppButton href={contact.whatsapp_url} className="mt-6" />
          </div>

          <div className="border border-stone-200 p-6">
            <p className="font-serif text-lg font-semibold text-ink">Instagram</p>
            <p className="mt-2 text-sm text-ink/75">
              Acompanhe avisos, fotos de celebrações e a agenda da paróquia.
            </p>
            <a
              href={contact.instagram_url}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-block text-sm text-green-mid underline decoration-stone-200 underline-offset-4 hover:text-gold"
            >
              @matrizsaojoseorl
            </a>
          </div>
        </div>
      </section>

      <TrinityDivider className="mx-auto max-w-6xl px-6" />

      <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <h2 className="font-serif text-2xl font-semibold text-ink md:text-3xl">
          Sacramentos e serviços
        </h2>
        <p className="mt-3 max-w-xl content-measure text-ink/75">
          A Igreja reconhece sete sacramentos. Alguns pedem agendamento com a
          secretaria; outros acontecem naturalmente nas celebrações.
        </p>
        <div className="mt-8">
          <SacramentsGrid whatsappUrl={contact.whatsapp_url} />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <h2 className="font-serif text-xl font-semibold text-ink">Outros atendimentos</h2>
        <div className="mt-6 grid grid-cols-1 gap-px bg-stone-200 sm:grid-cols-2">
          {OTHER_SERVICES.map((service) => (
            <div key={service.key} className="flex flex-col gap-3 bg-stone-50 p-6">
              <h3 className="font-serif text-lg font-semibold text-ink">{service.name}</h3>
              <p className="flex-1 text-sm text-ink/75">{service.description}</p>
              <WhatsAppButton href={contact.whatsapp_url} className="mt-1 self-start" />
            </div>
          ))}
        </div>
        <p className="mt-8 text-sm text-ink/60">
          Prefere resolver pessoalmente? A secretaria atende de segunda a
          sexta, das 8h às 18h, e aos sábados, das 8h às 11h30.
        </p>
      </section>
    </div>
  );
}
