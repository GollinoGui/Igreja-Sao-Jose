import { useMemo } from "react";
import { IMPORTANT_DATES } from "../lib/content";
import { getMovableFeasts } from "../lib/liturgicalCalendar";
import { Reveal } from "./Reveal";
import { IconStar, IconCalendar } from "./icons";

function resolveDate(item, movableFeasts, year) {
  if (item.movable) {
    const date = movableFeasts[item.movable];
    return date ?? null;
  }
  return new Date(year, item.month - 1, item.day);
}

function formatDate(date) {
  if (!date) return "a definir";
  return `${date.getDate()} de ${date.toLocaleDateString("pt-BR", { month: "long" })}`;
}

function daysUntil(date) {
  if (!date) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(date);
  target.setHours(0, 0, 0, 0);
  const diff = Math.round((target - today) / 86_400_000);
  return diff;
}

export function ImportantDates() {
  const year = new Date().getFullYear();
  const movableFeasts = useMemo(() => getMovableFeasts(year), [year]);

  const items = useMemo(() => {
    return IMPORTANT_DATES.map((item) => {
      const date = resolveDate(item, movableFeasts, year);
      let diff = daysUntil(date);
      if (diff !== null && diff < 0) {
        const nextYearFeasts = item.movable ? getMovableFeasts(year + 1) : null;
        const nextDate = item.movable
          ? nextYearFeasts[item.movable]
          : new Date(year + 1, item.month - 1, item.day);
        diff = daysUntil(nextDate);
      }
      return { ...item, date, diff };
    });
  }, [movableFeasts, year]);

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
