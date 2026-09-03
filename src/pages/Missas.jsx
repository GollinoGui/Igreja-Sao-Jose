import { useEffect, useMemo } from "react";
import { useMassSchedule } from "../hooks/useMassSchedule";
import { ScriptureQuote } from "../components/ScriptureQuote";

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
      <header className="mx-auto max-w-6xl px-6 pb-10 pt-16 md:pt-20">
        <p className="font-sans text-sm font-medium text-green-mid">Missas</p>
        <h1 className="mt-3 font-serif text-4xl font-semibold text-ink md:text-5xl">
          Horários de missa
        </h1>
        <p className="mt-6 max-w-xl content-measure text-lg text-ink/80">
          Celebrações na Igreja Matriz, de terça a domingo.
        </p>
      </header>

      <section className="bg-green-deep py-14 text-stone-50 md:py-16">
        <div className="mx-auto max-w-4xl px-6">
          {isFallback && !loading && (
            <p className="mb-8 border border-gold/40 bg-stone-50/5 px-4 py-3 text-sm text-stone-50/80">
              Horários de referência, sujeitos a confirmação junto à
              secretaria — atualizados periodicamente pela paróquia.
            </p>
          )}

          <ol className="divide-y divide-stone-50/15">
            {grouped.map((group) => (
              <li key={group.day_label} className="flex flex-col gap-3 py-6 sm:flex-row sm:items-baseline sm:justify-between">
                <p className="font-serif text-xl font-semibold">{group.day_label}</p>
                <div className="flex flex-wrap gap-x-6 gap-y-1">
                  {group.items.map((item) => (
                    <span key={item.id} className="font-sans text-lg text-gold">
                      {item.time}
                      {item.note && (
                        <span className="ml-2 text-sm text-stone-50/70">({item.note})</span>
                      )}
                    </span>
                  ))}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <ScriptureQuote
          text="Onde estiverem dois ou três reunidos em meu nome, aí estou no meio deles"
          reference="Mt 18,20"
        />
      </section>
    </div>
  );
}
