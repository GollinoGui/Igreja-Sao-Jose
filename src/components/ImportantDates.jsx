import { useMemo } from "react";
import { IMPORTANT_DATES } from "../lib/content";
import { getMovableFeasts } from "../lib/liturgicalCalendar";

const MONTHS = [
  "jan", "fev", "mar", "abr", "mai", "jun",
  "jul", "ago", "set", "out", "nov", "dez",
];

function formatDate(item, movableFeasts) {
  if (item.movable) {
    const date = movableFeasts[item.movable];
    return date ? `${date.getDate()} de ${date.toLocaleDateString("pt-BR", { month: "long" })}` : "a definir";
  }
  return `${item.day} ${MONTHS[item.month - 1]}`;
}

export function ImportantDates() {
  const movableFeasts = useMemo(() => getMovableFeasts(new Date().getFullYear()), []);

  return (
    <ul className="grid grid-cols-1 gap-px bg-stone-200 sm:grid-cols-2 lg:grid-cols-3">
      {IMPORTANT_DATES.map((item) => (
        <li
          key={item.key}
          className={`flex items-center justify-between gap-4 p-5 ${
            item.highlight ? "bg-green-deep text-stone-50" : "bg-stone-50"
          }`}
        >
          <div>
            <p className={`font-serif text-lg font-semibold ${item.highlight ? "text-gold" : "text-ink"}`}>
              {item.label}
            </p>
            {item.note && (
              <p className={`mt-1 text-xs ${item.highlight ? "text-stone-50/70" : "text-ink/60"}`}>
                {item.note}
              </p>
            )}
          </div>
          <span
            className={`whitespace-nowrap font-sans text-sm font-medium ${
              item.highlight ? "text-stone-50" : "text-ink/70"
            }`}
          >
            {formatDate(item, movableFeasts)}
          </span>
        </li>
      ))}
    </ul>
  );
}
