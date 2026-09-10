import { useMemo } from "react";
import { IMPORTANT_DATES } from "../lib/content";
import { getMovableFeasts } from "../lib/liturgicalCalendar";
import GENERATED_FEASTS from "../data/liturgicalFeasts.generated.json";
import { Reveal } from "./Reveal";
import { IconStar, IconCalendar } from "./icons";

// Quantos cards mostrar no total: os fixos com `highlight` sempre aparecem,
// o restante do espaço é preenchido pelas datas (manuais + geradas) mais
// próximas de hoje. Ver src/data/liturgicalFeasts.generated.json para as
// solenidades/festas do Calendário Romano Geral (gerado por
// scripts/fetch-liturgical-calendar.mjs a partir da LiturgicalCalendarAPI).
const MAX_ITEMS = 9;

function formatDate(date) {
  if (!date) return "a definir";
  return `${date.getDate()} de ${date.toLocaleDateString("pt-BR", { month: "long" })}`;
}

function daysUntil(date) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(date);
  target.setHours(0, 0, 0, 0);
  return Math.round((target - today) / 86_400_000);
}

// Para cada item, gera as datas candidatas deste ano e do próximo, e
// mantém a ocorrência mais próxima com diff >= 0 (hoje ou no futuro).
function nearestOccurrence(candidates) {
  let best = null;
  for (const { date, ...rest } of candidates) {
    if (!date) continue;
    const diff = daysUntil(date);
    if (diff < 0) continue;
    if (!best || diff < best.diff) best = { ...rest, date, diff };
  }
  return best;
}

export function ImportantDates() {
  const year = new Date().getFullYear();
  const movableFeasts = useMemo(() => getMovableFeasts(year), [year]);
  const movableFeastsNextYear = useMemo(() => getMovableFeasts(year + 1), [year]);

  const items = useMemo(() => {
    const manual = IMPORTANT_DATES.map((item) => {
      const candidates = item.movable
        ? [
            { date: movableFeasts[item.movable] },
            { date: movableFeastsNextYear[item.movable] },
          ]
        : [
            { date: new Date(year, item.month - 1, item.day) },
            { date: new Date(year + 1, item.month - 1, item.day) },
          ];
      return nearestOccurrence(
        candidates.map((c) => ({ ...c, key: item.key, label: item.label, note: item.note, highlight: item.highlight })),
      );
    });

    const generatedByKey = new Map();
    for (const feast of GENERATED_FEASTS) {
      const date = new Date(feast.year, feast.month - 1, feast.day);
      const occurrence = { key: feast.key, label: feast.label, note: null, highlight: false, date };
      const current = generatedByKey.get(feast.key);
      const diff = daysUntil(date);
      if (diff < 0) continue;
      if (!current || diff < current.diff) generatedByKey.set(feast.key, { ...occurrence, diff });
    }

    const all = [...manual, ...generatedByKey.values()].filter(Boolean);
    const highlighted = all.filter((item) => item.highlight);
    const rest = all.filter((item) => !item.highlight).sort((a, b) => a.diff - b.diff);

    return [...highlighted, ...rest].slice(0, MAX_ITEMS);
  }, [movableFeasts, movableFeastsNextYear, year]);

  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, index) => (
        <Reveal
          as="li"
          key={item.key}
          delay={(index % 3) * 90}
          className={`group relative flex items-center justify-between gap-4 overflow-hidden rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 ${
            item.highlight
              ? "bg-gold text-stone-900 shadow-lift"
              : "bg-stone-50/8 text-stone-50 hover:bg-stone-50/12"
          }`}
        >
          <div>
            <div className="flex items-center gap-1.5">
              {item.highlight && <IconStar className="h-3.5 w-3.5" />}
              <p
                className={`font-serif text-lg font-semibold ${
                  item.highlight ? "text-stone-900" : "text-stone-50"
                }`}
              >
                {item.label}
              </p>
            </div>
            {item.note && (
              <p className={`mt-1 text-xs ${item.highlight ? "text-stone-900/70" : "text-stone-50/60"}`}>
                {item.note}
              </p>
            )}
            {item.diff !== null && item.diff >= 0 && item.diff <= 60 && (
              <p className={`mt-1.5 text-xs font-medium ${item.highlight ? "text-stone-900/80" : "text-gold-bright"}`}>
                {item.diff === 0 ? "É hoje" : `Faltam ${item.diff} dias`}
              </p>
            )}
          </div>
          <span
            className={`flex shrink-0 items-center gap-1.5 whitespace-nowrap font-sans text-sm font-medium ${
              item.highlight ? "text-stone-900" : "text-stone-50/75"
            }`}
          >
            <IconCalendar className="h-3.5 w-3.5 opacity-60" />
            {formatDate(item.date)}
          </span>
        </Reveal>
      ))}
    </ul>
  );
}
