import { useEffect } from "react";
import { Hero } from "../components/Hero";
import { TrinityDivider } from "../components/TrinityDivider";
import { ImportantDates } from "../components/ImportantDates";
import { ScriptureQuote } from "../components/ScriptureQuote";
import { SacramentsGrid } from "../components/SacramentsGrid";
import { Reveal } from "../components/Reveal";
import { Button } from "../components/Button";
import { useContactInfo } from "../hooks/useContactInfo";
import { IconCalendar, IconTrinity, IconScroll } from "../components/icons";

const PILLARS = [
  {
    title: "Celebrar",
    text: "Missas de terça a domingo, na Igreja Matriz — confira os horários atualizados e venha participar da Eucaristia com a comunidade.",
    to: "/missas",
    cta: "Ver horários",
    icon: IconCalendar,
    accent: "bg-gold text-stone-900",
  },
  {
    title: "Pertencer",
    text: "Batismo, matrimônio, intenções de missa e outros sacramentos, sempre pela secretaria paroquial — o primeiro passo é uma conversa com a nossa equipe.",
    to: "/contato",
    cta: "Falar com a secretaria",
    icon: IconTrinity,
    accent: "bg-green-deep text-stone-50",
  },
  {
    title: "Conhecer",
    text: "Mais de 130 anos de história, da antiga capela de madeira à Torre Monumento — conheça os marcos que formam a nossa identidade.",
    to: "/sobre",
    cta: "Ler a história",
    icon: IconScroll,
    accent: "bg-terracotta text-stone-50",
  },
];

export function Home() {
  const { contact } = useContactInfo();

  useEffect(() => {
    document.title = "Paróquia São José — Orlândia-SP";
  }, []);

  return (
    <div>
      <Hero />

      <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <Reveal className="mx-auto max-w-xl text-center">
          <TrinityDivider className="mb-8" />
          <p className="font-sans text-sm text-ink/60">
            Assim como os três sinos da Torre Monumento soam juntos em uma só
            voz, a nossa comunidade se apoia em três pilares.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {PILLARS.map((pillar, index) => (
            <Reveal
              key={pillar.title}
              delay={index * 120}
              className="group flex flex-col gap-4 rounded-2xl border border-stone-200 bg-stone-50 p-7 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift"
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${pillar.accent} transition-transform duration-300 group-hover:scale-110`}
              >
                <pillar.icon className="h-6 w-6" />
              </div>
              <h2 className="font-serif text-xl font-semibold text-ink">{pillar.title}</h2>
              <p className="flex-1 text-sm leading-relaxed text-ink/70">{pillar.text}</p>
              <Button as="link" to={pillar.to} variant="secondary" className="self-start">
                {pillar.cta}
              </Button>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mesh-emerald grain-overlay relative overflow-hidden py-20 text-stone-50 md:py-24">
        <div className="relative z-10 mx-auto max-w-6xl px-6">
          <Reveal className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-stone-50/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-gold-bright">
                Calendário litúrgico
              </span>
              <h2 className="mt-4 font-serif text-3xl font-semibold md:text-4xl">Datas importantes</h2>
              <p className="mt-2 max-w-md text-stone-50/75">
                Ao longo do ano, com destaque para a festa do nosso padroeiro.
              </p>
            </div>
          </Reveal>
          <div className="mt-10">
            <ImportantDates />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 md:py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <ScriptureQuote
            className="mx-auto"
            text="Chamarás seu nome Jesus, porque ele salvará o seu povo dos pecados"
            reference="Mt 1,21"
          />
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20 md:pb-24">
        <Reveal className="mb-10 max-w-xl">
          <span className="text-xs font-medium uppercase tracking-wide text-terracotta">
            Vida sacramental
          </span>
          <h2 className="mt-3 font-serif text-2xl font-semibold text-ink md:text-3xl">
            Sete sacramentos, uma só fé
          </h2>
          <p className="mt-3 text-ink/70">
            Da Eucaristia celebrada em toda missa ao Matrimônio preparado com
            cuidado — conheça os sacramentos que marcam a vida da comunidade.
          </p>
        </Reveal>
        <SacramentsGrid whatsappUrl={contact.whatsapp_url} />
      </section>

      <section className="relative overflow-hidden bg-stone-200/50 py-16 md:py-20">
        <Reveal className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-6 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-serif text-2xl font-semibold text-ink md:text-3xl">
              Venha nos visitar
            </h2>
            <p className="mt-2 max-w-md text-ink/70">
              A Igreja Matriz está de portas abertas. Fale com a secretaria
              para agendar um sacramento ou tirar dúvidas.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button as="link" to="/contato" variant="primary">
              Fale com a paróquia
            </Button>
            <Button as="a" href={contact.whatsapp_url} target="_blank" rel="noreferrer" variant="secondary">
              WhatsApp
            </Button>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
