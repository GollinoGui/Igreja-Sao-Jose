import { useEffect } from "react";
import { useContactInfo } from "../hooks/useContactInfo";
import { OTHER_SERVICES } from "../lib/content";
import { SacramentsGrid } from "../components/SacramentsGrid";
import { WhatsAppButton } from "../components/WhatsAppButton";
import { TrinityDivider } from "../components/TrinityDivider";
import { Reveal } from "../components/Reveal";
import { IconMapPin, IconPhone, IconMail, IconClock } from "../components/icons";

export function Contato() {
  const { contact } = useContactInfo();

  useEffect(() => {
    document.title = "Contato — Paróquia São José";
  }, []);

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    contact.address
  )}`;
  const mapsEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(
    contact.address
  )}&output=embed`;

  const infoItems = [
    { icon: IconMapPin, label: "Endereço", value: contact.address, href: mapsUrl, hrefLabel: "Ver no mapa" },
    { icon: IconPhone, label: "Telefone", value: contact.phone },
    { icon: IconMail, label: "E-mail", value: contact.email },
    { icon: IconClock, label: "Horário de atendimento", value: contact.office_hours },
  ];

  return (
    <div>
      <header className="mesh-stone grain-overlay relative overflow-hidden">
        <div className="relative z-10 mx-auto max-w-6xl px-6 pb-14 pt-24 md:pb-16 md:pt-28">
          <Reveal>
            <p className="flex items-center gap-2 font-sans text-sm font-medium text-green-mid">
              <span className="h-px w-8 bg-gold" aria-hidden="true" />
              Contato
            </p>
            <h1 className="mt-4 font-serif text-4xl font-semibold text-ink md:text-5xl">
              Fale com a paróquia
            </h1>
          </Reveal>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_1fr]">
          <Reveal direction="left" className="space-y-5">
            {infoItems.map((item) => (
              <div key={item.label} className="flex items-start gap-4 rounded-2xl border border-stone-200 bg-stone-50 p-5 shadow-soft">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold/10 text-gold">
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <dt className="font-sans text-sm font-medium text-ink/50">{item.label}</dt>
                  <dd className="mt-0.5 text-ink/85">{item.value}</dd>
                  {item.href && (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-1 inline-block text-sm text-green-mid underline decoration-stone-200 underline-offset-4 hover:text-gold"
                    >
                      {item.hrefLabel}
                    </a>
                  )}
                </div>
              </div>
            ))}
            <WhatsAppButton href={contact.whatsapp_url} className="mt-2" />
          </Reveal>

          <Reveal direction="right" delay={100} className="flex flex-col gap-6">
            <div className="overflow-hidden rounded-2xl border border-stone-200 shadow-soft">
              <iframe
                title="Localização da Paróquia São José no mapa"
                src={mapsEmbedUrl}
                className="h-64 w-full grayscale-[15%] md:h-72"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="rounded-2xl border border-stone-200 bg-stone-50 p-6 shadow-soft">
              <p className="font-serif text-lg font-semibold text-ink">Instagram</p>
              <p className="mt-2 text-sm text-ink/75">
                Acompanhe avisos, fotos de celebrações e a agenda da
                paróquia.
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
          </Reveal>
        </div>
      </section>

      <TrinityDivider className="mx-auto max-w-6xl px-6" />

      <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <Reveal className="mb-10 max-w-xl">
          <h2 className="font-serif text-2xl font-semibold text-ink md:text-3xl">
            Sacramentos e serviços
          </h2>
          <p className="mt-3 content-measure text-ink/75">
            A Igreja reconhece sete sacramentos. Alguns pedem agendamento com
            a secretaria; outros acontecem naturalmente nas celebrações.
          </p>
        </Reveal>
        <SacramentsGrid whatsappUrl={contact.whatsapp_url} />
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <Reveal as="h2" className="font-serif text-xl font-semibold text-ink">
          Outros atendimentos
        </Reveal>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {OTHER_SERVICES.map((service, index) => (
            <Reveal
              key={service.key}
              delay={index * 90}
              className="flex flex-col gap-3 rounded-2xl border border-stone-200 bg-stone-50 p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
            >
              <h3 className="font-serif text-lg font-semibold text-ink">{service.name}</h3>
              <p className="flex-1 text-sm text-ink/75">{service.description}</p>
              <WhatsAppButton href={contact.whatsapp_url} className="mt-1 self-start" />
            </Reveal>
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
