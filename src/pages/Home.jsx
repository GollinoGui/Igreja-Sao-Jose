import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Hero } from "../components/Hero";
import { TrinityDivider } from "../components/TrinityDivider";
import { LiturgicalCalendar } from "../components/LiturgicalCalendar";
import { ScriptureQuote } from "../components/ScriptureQuote";
import { BibleAnimation } from "../components/BibleAnimation";
import { SacramentsCoverflow } from "../components/SacramentsCoverflow";
import { GallerySection } from "../components/GallerySection";
import { InstagramEmbed } from "../components/InstagramEmbed";
import { Reveal } from "../components/Reveal";
import { Button } from "../components/Button";
import { useContactInfo } from "../hooks/useContactInfo";
import { useDailyReading } from "../hooks/useDailyReading";
import { useMassSchedule } from "../hooks/useMassSchedule";
import { useNewsPosts } from "../hooks/useNewsPosts";
import { groupMassScheduleByDay } from "../lib/massSchedule";
import { IconCalendar, IconTrinity, IconScroll, IconChevronRight, IconCornerFlourish } from "../components/icons";

const PILLARS = [
  {
    title: "Celebrar",
    text: "Missas de terça a domingo, na Igreja Matriz. Confira os horários atualizados e venha participar da Eucaristia com a comunidade.",
    to: "/missas",
    cta: "Ver horários",
    icon: IconCalendar,
    ring: "border-gold text-gold",
    link: "text-gold hover:text-gold-bright",
  },
  {
    title: "Pertencer",
    text: "Batismo, matrimônio, intenções de missa e outros sacramentos, sempre pela secretaria paroquial. O primeiro passo é uma conversa com a nossa equipe.",
    to: "/contato",
    cta: "Falar com a secretaria",
    icon: IconTrinity,
    ring: "border-green-deep text-green-deep",
    link: "text-green-deep hover:text-green-mid",
    lead: true,
  },
  {
    title: "Conhecer",
    text: "Mais de 130 anos de história, da antiga capela de madeira à Torre Monumento. Conheça os marcos que formam a nossa identidade.",
    to: "/sobre",
    cta: "Ler a história",
    icon: IconScroll,
    ring: "border-terracotta text-terracotta",
    link: "text-terracotta hover:text-terracotta-bright",
  },
];

export function Home() {
  const { contact } = useContactInfo();
  const { reading } = useDailyReading();
  const { schedule } = useMassSchedule();
  const { posts, loading: postsLoading } = useNewsPosts();

  const groupedSchedule = useMemo(() => groupMassScheduleByDay(schedule), [schedule]);
  const recentPosts = posts.slice(0, 2);

  useEffect(() => {
    document.title = "Paróquia São José — Orlândia-SP";
  }, []);

  return (
    <div>
      <Hero />

      <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <Reveal className="mx-auto max-w-xl text-center">
          <TrinityDivider className="mb-8" />
          <h2 className="font-serif text-2xl font-semibold text-ink md:text-3xl">
            Uma só voz, três pilares
          </h2>
          <p className="mt-3 font-sans text-sm text-ink/60">
            Assim como os três sinos da Torre Monumento soam juntos, a nossa
            comunidade se apoia nestes pilares: cada um com seu papel, todos
            voltados para a mesma fé.
          </p>
        </Reveal>

        <div className="relative mt-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-8 hidden h-px bg-stone-200 md:block"
          />
          <div className="grid grid-cols-1 gap-y-12 md:grid-cols-3 md:divide-x md:divide-stone-200">
            {PILLARS.map((pillar, index) => (
              <Reveal
                key={pillar.title}
                delay={index * 120}
                className="group flex flex-col gap-4 md:px-8 md:first:pl-0 md:last:pr-0"
              >
                <div className="flex h-16 items-center">
                  <div
                    className={`flex items-center justify-center rounded-full border-2 bg-stone-50 transition-transform duration-300 group-hover:scale-110 ${pillar.ring} ${
                      pillar.lead ? "h-16 w-16" : "h-14 w-14"
                    }`}
                  >
                    <pillar.icon className={pillar.lead ? "h-7 w-7" : "h-6 w-6"} />
                  </div>
                </div>
                <h3 className="font-serif text-xl font-semibold text-ink">{pillar.title}</h3>
                <p className="flex-1 text-sm leading-relaxed text-ink/70">{pillar.text}</p>
                <Link
                  to={pillar.to}
                  className={`inline-flex items-center gap-1.5 text-sm font-medium transition-colors ${pillar.link}`}
                >
                  {pillar.cta}
                  <IconChevronRight className="h-3.5 w-3.5" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mesh-stone relative overflow-hidden py-20 md:py-24">
        <div className="relative z-10 mx-auto max-w-6xl px-6">
          <Reveal className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="text-xs font-medium uppercase tracking-wide text-gold">
                Missas
              </span>
              <h2 className="mt-4 font-serif text-2xl font-semibold text-ink md:text-3xl">
                Próximas celebrações
              </h2>
              <p className="mt-2 max-w-md text-ink/70">
                Participe da Eucaristia com a comunidade, na Igreja Matriz.
              </p>
            </div>
            <Link
              to="/missas"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-green-deep hover:text-green-mid"
            >
              Ver todos os horários
              <IconChevronRight className="h-3.5 w-3.5" />
            </Link>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
            {groupedSchedule.map((group, index) => (
              <Reveal
                key={group.day_label}
                delay={index * 90}
                className="flex flex-col gap-3 rounded-2xl border border-stone-200 bg-stone-50 p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
              >
                <p className="font-serif text-lg font-semibold text-ink">{group.day_label}</p>
                <div className="flex flex-wrap gap-x-4 gap-y-1.5">
                  {group.items.map((item) => (
                    <span key={item.id} className="font-sans text-base font-medium text-green-deep">
                      {item.time}
                      {item.note && (
                        <span className="ml-1.5 text-xs font-normal text-ink/50">({item.note})</span>
                      )}
                    </span>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
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
            <LiturgicalCalendar />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-28 md:py-36">
        <Reveal className="relative mx-auto max-w-2xl px-8 text-center sm:px-12">
          <IconCornerFlourish
            className="pointer-events-none absolute -left-1 -top-1 h-9 w-9 text-gold/40 sm:-left-3 sm:-top-3 sm:h-12 sm:w-12"
          />
          <IconCornerFlourish
            className="pointer-events-none absolute -right-1 -top-1 h-9 w-9 -scale-x-100 text-gold/40 sm:-right-3 sm:-top-3 sm:h-12 sm:w-12"
          />
          <IconCornerFlourish
            className="pointer-events-none absolute -bottom-1 -left-1 h-9 w-9 -scale-y-100 text-gold/40 sm:-bottom-3 sm:-left-3 sm:h-12 sm:w-12"
          />
          <IconCornerFlourish
            className="pointer-events-none absolute -bottom-1 -right-1 h-9 w-9 -scale-100 text-gold/40 sm:-bottom-3 sm:-right-3 sm:h-12 sm:w-12"
          />
          <span className="text-xs font-medium uppercase tracking-wide text-gold">
            Liturgia do dia
          </span>
          {reading.liturgyName && (
            <p className="mt-3 font-serif text-lg text-ink/55">{reading.liturgyName}</p>
          )}
          <BibleAnimation className="mx-auto mt-10 mb-6 h-40 w-40 md:h-56 md:w-56" />
          <ScriptureQuote
            className="mx-auto"
            text={reading.text}
            reference={reading.reference}
          />
          {reading.readings?.length > 0 && (
            <div className="mx-auto mt-12 flex max-w-lg flex-wrap items-center justify-center gap-x-8 gap-y-3 border-t border-stone-200 pt-8">
              {reading.readings.map((item) => (
                <span key={item.label} className="text-sm text-ink/55">
                  <span className="font-medium text-ink/75">{item.label}</span> {item.reference}
                </span>
              ))}
            </div>
          )}
        </Reveal>
      </section>

      <GallerySection />

      <section className="mesh-emerald grain-overlay relative overflow-hidden py-14 text-stone-50 md:py-16">
        <div className="relative z-10 mx-auto max-w-6xl px-6">
          <Reveal className="mb-8 max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-stone-50/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-gold-bright">
              Vida sacramental
            </span>
            <h2 id="sacraments-heading" className="mt-4 font-serif text-2xl font-semibold md:text-3xl">
              Sete sacramentos, uma só fé
            </h2>
            <p className="mt-3 text-stone-50/75">
              Da Eucaristia celebrada em toda missa ao Matrimônio preparado com
              cuidado — conheça os sacramentos que marcam a vida da comunidade.
            </p>
          </Reveal>
          <SacramentsCoverflow whatsappUrl={contact.whatsapp_url} />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 md:py-24">
        <Reveal className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-xs font-medium uppercase tracking-wide text-terracotta">
              Notícias
            </span>
            <h2 className="mt-4 font-serif text-2xl font-semibold text-ink md:text-3xl">
              Do Instagram da paróquia
            </h2>
            <p className="mt-2 max-w-md text-ink/70">
              Acompanhe avisos, fotos de celebrações e a agenda da comunidade.
            </p>
          </div>
          <Link
            to="/noticias"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-terracotta hover:text-terracotta-bright"
          >
            Ver mais notícias
            <IconChevronRight className="h-3.5 w-3.5" />
          </Link>
        </Reveal>

        {!postsLoading && recentPosts.length === 0 && (
          <Reveal className="mt-10 rounded-2xl border border-dashed border-stone-200 p-8 text-center text-ink/60">
            Nenhuma publicação cadastrada ainda. Acompanhe as novidades
            diretamente no{" "}
            <a
              href={contact.instagram_url}
              target="_blank"
              rel="noreferrer"
              className="text-green-mid underline decoration-stone-200 underline-offset-4 hover:text-gold"
            >
              Instagram @matrizsaojoseorl
            </a>
            .
          </Reveal>
        )}

        {recentPosts.length > 0 && (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {recentPosts.map((post, index) => (
              <Reveal
                key={post.id}
                delay={index * 100}
                className="rounded-2xl border border-stone-200 bg-stone-50 p-2 shadow-soft"
              >
                <InstagramEmbed embedUrl={post.embed_url} caption={post.caption} />
              </Reveal>
            ))}
          </div>
        )}
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
