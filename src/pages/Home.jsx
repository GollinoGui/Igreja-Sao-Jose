import { useEffect } from "react";
import { Hero } from "../components/Hero";
import { TrinityDivider } from "../components/TrinityDivider";
import { ImportantDates } from "../components/ImportantDates";
import { ScriptureQuote } from "../components/ScriptureQuote";
import { Button } from "../components/Button";

const PILLARS = [
  {
    title: "Celebrar",
    text: "Missas de terça a domingo, na Igreja Matriz — confira os horários atualizados.",
    to: "/missas",
    cta: "Ver horários",
  },
  {
    title: "Pertencer",
    text: "Batismo, matrimônio, intenções de missa e outros sacramentos, sempre pela secretaria.",
    to: "/contato",
    cta: "Falar com a secretaria",
  },
  {
    title: "Conhecer",
    text: "Mais de 130 anos de história, da capela de madeira à Torre Monumento.",
    to: "/sobre",
    cta: "Ler a história",
  },
];

export function Home() {
  useEffect(() => {
    document.title = "Paróquia São José — Orlândia-SP";
  }, []);

  return (
    <div>
      <Hero />

      <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <TrinityDivider className="mb-12" />
        <p className="text-center font-sans text-sm text-ink/60">
          Assim como os três sinos da Torre Monumento soam juntos em uma só
          voz, a nossa comunidade se apoia em três pilares.
        </p>
        <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-3">
          {PILLARS.map((pillar) => (
            <div key={pillar.title} className="flex flex-col gap-3">
              <h2 className="font-serif text-xl font-semibold text-ink">{pillar.title}</h2>
              <p className="flex-1 text-sm text-ink/75">{pillar.text}</p>
              <Button as="link" to={pillar.to} variant="secondary" className="self-start">
                {pillar.cta}
              </Button>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-green-deep py-16 text-stone-50 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="font-serif text-2xl font-semibold md:text-3xl">Datas importantes</h2>
          <p className="mt-2 max-w-md text-stone-50/75">
            Do calendário litúrgico ao longo do ano, com destaque para a festa
            do nosso padroeiro.
          </p>
          <div className="mt-8">
            <ImportantDates />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <ScriptureQuote
          text="Chamarás seu nome Jesus, porque ele salvará o seu povo dos pecados"
          reference="Mt 1,21"
        />
      </section>
    </div>
  );
}
