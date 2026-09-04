import { useEffect } from "react";
import { HISTORY_MILESTONES } from "../lib/content";
import { TrinityDivider } from "../components/TrinityDivider";
import { ScriptureQuote } from "../components/ScriptureQuote";
import { StatCard } from "../components/StatCard";
import { Reveal } from "../components/Reveal";
import { Button } from "../components/Button";
import {
  IconTower,
  IconScroll,
  IconTrinity,
  IconBell,
  IconWater,
  IconWell,
  IconWheel,
  IconStar,
  IconGlobe,
  IconBaptism,
} from "../components/icons";
import igrejaFrontal from "../assets/images/igreja-frontal.jpg";

const MILESTONE_ICONS = {
  1893: IconTower,
  1899: IconTrinity,
  1926: IconScroll,
  1937: IconTrinity,
  1999: IconBell,
  2004: IconWater,
};

const BELLS = [
  { value: "850kg", label: "Sino maior" },
  { value: "650kg", label: "Sino médio" },
  { value: "400kg", label: "Sino menor" },
];

const WATER_MEMORIAL = [
  {
    name: "Batistério ao ar livre",
    icon: IconBaptism,
    text: "Espaço externo dedicado à celebração do Batismo, à luz do dia.",
  },
  {
    name: "Poço de Jacó",
    icon: IconWell,
    text: "Referência ao poço bíblico onde Jesus dialogou com a samaritana (Jo 4).",
  },
  {
    name: "Roda d'Água",
    icon: IconWheel,
    text: "Símbolo do movimento constante da graça, sempre renovada.",
  },
  {
    name: "Estrela",
    icon: IconStar,
    text: "Lembra a estrela que guiou os magos até Belém (Mt 2).",
  },
  {
    name: "Globo",
    icon: IconGlobe,
    text: "Representa a missão da Igreja, enviada ao mundo inteiro.",
  },
];

export function Sobre() {
  useEffect(() => {
    document.title = "Sobre — Paróquia São José";
  }, []);

  return (
    <div>
      <header className="relative overflow-hidden">
        <div className="absolute inset-0" aria-hidden="true">
          <img src={igrejaFrontal} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/80 to-stone-900/40" />
          <div className="grain-overlay absolute inset-0" />
        </div>
        <div className="relative z-10 mx-auto max-w-6xl px-6 pb-16 pt-24 md:pb-24 md:pt-32">
          <Reveal>
            <p className="flex items-center gap-2 font-sans text-sm font-medium text-gold-bright">
              <span className="h-px w-8 bg-gold-bright" aria-hidden="true" />
              Sobre a paróquia
            </p>
            <h1 className="mt-4 max-w-2xl font-serif text-4xl font-semibold leading-tight text-stone-50 md:text-6xl">
              Uma história de mais de 130 anos
            </h1>
            <p className="mt-6 max-w-xl text-lg text-stone-50/80">
              Da antiga capela de madeira à Igreja Matriz erguida em pedra, a
              Paróquia São José acompanha a história de Orlândia desde o fim
              do século XIX.
            </p>
          </Reveal>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-20 md:py-24">
        <Reveal className="mb-14 max-w-lg">
          <span className="text-xs font-medium uppercase tracking-wide text-terracotta">
            Linha do tempo
          </span>
          <h2 className="mt-3 font-serif text-2xl font-semibold text-ink md:text-3xl">
            Marcos de uma comunidade em construção
          </h2>
        </Reveal>

        <ol className="relative space-y-10 border-l border-stone-200 pl-8 md:pl-10">
          {HISTORY_MILESTONES.map((item, index) => {
            const Icon = MILESTONE_ICONS[item.year] ?? IconTrinity;
            return (
              <Reveal as="li" key={item.year} delay={index * 80} className="relative">
                <span
                  aria-hidden="true"
                  className="absolute -left-[46px] top-0 flex h-8 w-8 items-center justify-center rounded-full border border-gold bg-stone-50 text-gold md:-left-[54px]"
                >
                  <Icon className="h-4 w-4" />
                </span>
                <p className="font-sans text-sm font-semibold text-gold">{item.year}</p>
                <h3 className="mt-1 font-serif text-xl font-semibold text-ink md:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-2 max-w-xl content-measure text-ink/75">{item.text}</p>
              </Reveal>
            );
          })}
        </ol>
      </section>

      <section className="mesh-emerald grain-overlay relative overflow-hidden py-20 text-stone-50 md:py-24">
        <div className="relative z-10 mx-auto max-w-6xl px-6">
          <Reveal className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_1fr] md:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-stone-50/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-gold-bright">
                <IconTower className="h-3.5 w-3.5" />
                1999
              </span>
              <h2 className="mt-4 font-serif text-3xl font-semibold md:text-4xl">
                Torre Monumento
              </h2>
              <p className="mt-4 max-w-md text-stone-50/80">
                Erguida ao completar 100 anos de paróquia, com 44 metros de
                altura, dedicada a Rex regum e Dominus dominatum (Cristo Rei).
                Abriga três sinos de aço fundido — um conjunto que muitos
                fiéis associam à Santíssima Trindade.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4 sm:gap-6">
              {BELLS.map((bell) => (
                <div
                  key={bell.label}
                  className="flex flex-col items-center gap-3 rounded-2xl bg-stone-50/8 p-5 text-center"
                >
                  <IconBell className="h-7 w-7 text-gold-bright" />
                  <StatCard tone="dark" value={bell.value} label={bell.label} className="flex-col items-center text-center" />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 md:py-24">
        <Reveal className="mb-12 max-w-lg">
          <span className="text-xs font-medium uppercase tracking-wide text-terracotta">
            2004
          </span>
          <h2 className="mt-3 font-serif text-2xl font-semibold text-ink md:text-3xl">
            Memorial Vocacional das Águas
          </h2>
          <p className="mt-3 text-ink/70">
            Idealizado pelo Pe. Olinto Cremonese na Campanha da Fraternidade
            de 2004 ("Água, fonte de vida"), reúne cinco elementos dispostos
            em torno da Igreja Matriz.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {WATER_MEMORIAL.map((element, index) => (
            <Reveal
              key={element.name}
              delay={index * 80}
              className="flex flex-col gap-3 rounded-2xl border border-stone-200 bg-stone-50 p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-deep/8 text-green-deep">
                <element.icon className="h-5 w-5" />
              </div>
              <h3 className="font-serif text-base font-semibold text-ink">{element.name}</h3>
              <p className="text-sm text-ink/65">{element.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <TrinityDivider className="mx-auto max-w-6xl px-6" />

      <section className="mx-auto max-w-6xl px-6 py-20 md:py-24">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[0.9fr_1.1fr] md:items-start">
          <Reveal direction="left" className="md:sticky md:top-32">
            <span className="text-xs font-medium uppercase tracking-wide text-terracotta">
              Devoção
            </span>
            <h2 className="mt-3 font-serif text-3xl font-semibold text-ink md:text-4xl">
              Dois José,
              <br />
              uma mesma providência
            </h2>
          </Reveal>
          <Reveal direction="right" delay={100}>
            <div className="space-y-4 content-measure text-ink/80">
              <p>
                A tradição cristã sempre viu, no José do Antigo Testamento,
                uma figura que anuncia o José do Evangelho. O filho de Jacó,
                contador de sonhos, foi vendido pelos próprios irmãos e,
                ainda assim, tornou-se governador do Egito — posição da qual
                salvaria seu povo da fome (Gn 37–50).
              </p>
              <p>
                Muitos séculos depois, outro José — esposo de Maria — é
                também guiado por sonhos e pela visita de um anjo. É ele quem
                recebe, em sono, a missão de acolher o filho que Maria
                esperava, e quem mais tarde conduz a Sagrada Família em fuga
                para o Egito, o mesmo lugar onde o primeiro José havia
                reinado (Mt 1–2).
              </p>
              <p>
                Dois homens chamados José, dois caminhos até o Egito, uma
                mesma confiança na providência de Deus — um paralelo que a
                Igreja recorda com carinho especial numa paróquia que leva o
                nome do segundo.
              </p>
            </div>
            <ScriptureQuote
              className="mt-8"
              text="Um anjo do Senhor lhe apareceu em sonho e disse: José, filho de Davi, não temas receber Maria, tua mulher"
              reference="Mt 1,20"
            />
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-stone-200/50 py-16 md:py-20">
        <Reveal className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-6 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-serif text-2xl font-semibold text-ink md:text-3xl">
              Faça parte desta história
            </h2>
            <p className="mt-2 max-w-md text-ink/70">
              Participe das celebrações e conheça de perto a Igreja Matriz
              São José.
            </p>
          </div>
          <Button as="link" to="/missas" variant="primary">
            Ver horários de missa
          </Button>
        </Reveal>
      </section>
    </div>
  );
}
