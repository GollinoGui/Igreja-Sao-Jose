import { useEffect, useMemo } from "react";
import { useMassSchedule } from "../hooks/useMassSchedule";
import { ScriptureQuote } from "../components/ScriptureQuote";
import { Reveal } from "../components/Reveal";
import { IconClock } from "../components/icons";

function groupByDay(schedule) {
  const order = [];
  const map = new Map();

  for (const item of schedule) {
    if (!map.has(item.day_label)) {
      map.set(item.day_label, []);
      order.push(item.day_label);
    }
    map.get(item.day_label).push(item);
  }

  return order.map((day_label) => ({ day_label, items: map.get(day_label) }));
}

export function Missas() {
  const { schedule, loading, isFallback } = useMassSchedule();
  const grouped = useMemo(() => groupByDay(schedule), [schedule]);

  useEffect(() => {
    document.title = "Horários de Missa — Paróquia São José";
  }, []);

  return (
    <div>
      <header className="mesh-stone grain-overlay relative overflow-hidden">
        <div className="relative z-10 mx-auto max-w-6xl px-6 pb-14 pt-24 md:pb-16 md:pt-28">
          <Reveal>
            <p className="flex items-center gap-2 font-sans text-sm font-medium text-green-mid">
              <span className="h-px w-8 bg-gold" aria-hidden="true" />
              Missas
            </p>
            <h1 className="mt-4 font-serif text-4xl font-semibold text-ink md:text-5xl">
              Horários de missa
            </h1>
            <p className="mt-6 max-w-xl content-measure text-lg text-ink/80">
              Celebrações na Igreja Matriz, de terça a domingo.
            </p>
          </Reveal>
        </div>
      </header>

      <section className="mesh-emerald grain-overlay relative overflow-hidden py-16 text-stone-50 md:py-20">
        <div className="relative z-10 mx-auto max-w-4xl px-6">
          {isFallback && !loading && (
            <Reveal className="mb-10 flex items-start gap-3 rounded-2xl border border-gold/30 bg-stone-50/5 px-5 py-4 text-sm text-stone-50/80">
              <IconClock className="mt-0.5 h-4 w-4 shrink-0 text-gold-bright" />
              Horários de referência, sujeitos a confirmação junto à
              secretaria — atualizados periodicamente pela paróquia.
            </Reveal>
          )}

          <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {grouped.map((group, index) => (
              <Reveal
                as="li"
                key={group.day_label}
                delay={index * 90}
                className="flex flex-col gap-4 rounded-2xl bg-stone-50/8 p-6 transition-colors duration-300 hover:bg-stone-50/12"
              >
                <p className="font-serif text-xl font-semibold">{group.day_label}</p>
                <div className="flex flex-wrap gap-x-6 gap-y-2">
                  {group.items.map((item) => (
                    <span key={item.id} className="font-sans text-lg font-medium text-gold-bright">
                      {item.time}
                      {item.note && (
                        <span className="ml-2 text-sm font-normal text-stone-50/60">
                          ({item.note})
                        </span>
                      )}
                    </span>
                  ))}
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 md:py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <ScriptureQuote
            className="mx-auto"
            text="Onde estiverem dois ou três reunidos em meu nome, aí estou no meio deles"
            reference="Mt 18,20"
          />
        </Reveal>
      </section>
    </div>
  );
}
