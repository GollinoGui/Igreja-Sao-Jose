import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { buildEventsIndex, dateKey } from "../lib/calendarEvents";
import { getLiturgicalInfo, COLORS } from "../lib/liturgicalCalendar";
import { Reveal } from "./Reveal";
import { IconChevronLeft, IconChevronRight, IconStar, IconCalendar } from "./icons";

const WEEKDAYS = [
  { short: "Dom", full: "Domingo" },
  { short: "Seg", full: "Segunda-feira" },
  { short: "Ter", full: "Terça-feira" },
  { short: "Qua", full: "Quarta-feira" },
  { short: "Qui", full: "Quinta-feira" },
  { short: "Sex", full: "Sexta-feira" },
  { short: "Sáb", full: "Sábado" },
];

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function startOfDay(date) {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
}

function isSameDay(a, b) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function startOfWeek(date) {
  const result = startOfDay(date);
  result.setDate(result.getDate() - result.getDay());
  return result;
}

function endOfWeek(date) {
  const result = startOfDay(date);
  result.setDate(result.getDate() + (6 - result.getDay()));
  return result;
}

function endOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

function buildGridDays(monthDate) {
  const first = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1);
  const gridStart = startOfWeek(first);
  const gridEnd = endOfWeek(endOfMonth(first));

  const days = [];
  for (let cursor = new Date(gridStart); cursor <= gridEnd; cursor.setDate(cursor.getDate() + 1)) {
    days.push(new Date(cursor));
  }
  return days;
}

/**
 * Calendário mensal em tela cheia, no idioma visual da paróquia: cada dia
 * carrega uma lasca da cor litúrgica (ver liturgicalCalendar.js) e, quando
 * há uma solenidade/festa ou data cadastrada em content.js, um marcador —
 * estrela dourada para os destaques do padroeiro, ponto colorido para o
 * resto. Selecionar um dia abre o painel abaixo com o detalhe da celebração.
 */
export function LiturgicalCalendar() {
  const today = useMemo(() => startOfDay(new Date()), []);
  const [currentMonth, setCurrentMonth] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDay, setSelectedDay] = useState(today);

  const gridDays = useMemo(() => buildGridDays(currentMonth), [currentMonth]);

  const eventsIndex = useMemo(() => {
    const years = [...new Set(gridDays.map((day) => day.getFullYear()))];
    return buildEventsIndex(years);
  }, [gridDays]);

  const selectedEvents = eventsIndex.get(dateKey(selectedDay)) ?? [];
  const selectedLiturgical = useMemo(() => getLiturgicalInfo(selectedDay), [selectedDay]);

  function goToMonth(offset) {
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + offset, 1));
  }

  function goToToday() {
    setCurrentMonth(new Date(today.getFullYear(), today.getMonth(), 1));
    setSelectedDay(today);
  }

  function selectDay(day) {
    setSelectedDay(day);
    if (day.getMonth() !== currentMonth.getMonth() || day.getFullYear() !== currentMonth.getFullYear()) {
      setCurrentMonth(new Date(day.getFullYear(), day.getMonth(), 1));
    }
  }

  return (
    <div>
      <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="font-serif text-2xl font-semibold text-stone-50 md:text-3xl">
            {capitalize(currentMonth.toLocaleDateString("pt-BR", { month: "long", year: "numeric" }))}
          </h3>
          <p className="mt-1 text-sm text-stone-50/60">
            Toque em um dia para ver a celebração e a cor litúrgica.
          </p>
        </div>
        <div className="inline-flex items-center gap-1 self-start rounded-full border border-stone-50/15 p-1 sm:self-auto">
          <button
            type="button"
            onClick={() => goToMonth(-1)}
            aria-label="Mês anterior"
            className="flex h-9 w-9 items-center justify-center rounded-full text-stone-50/70 transition-colors hover:bg-stone-50/10 hover:text-stone-50"
          >
            <IconChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={goToToday}
            className="rounded-full px-4 py-1.5 text-sm font-medium text-stone-50/80 transition-colors hover:bg-stone-50/10 hover:text-stone-50"
          >
            Hoje
          </button>
          <button
            type="button"
            onClick={() => goToMonth(1)}
            aria-label="Próximo mês"
            className="flex h-9 w-9 items-center justify-center rounded-full text-stone-50/70 transition-colors hover:bg-stone-50/10 hover:text-stone-50"
          >
            <IconChevronRight className="h-4 w-4" />
          </button>
        </div>
      </Reveal>

      <Reveal delay={80} className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-stone-50/55">
        <span className="inline-flex items-center gap-1.5">
          <IconStar className="h-3 w-3 text-gold-bright" />
          Destaque da paróquia
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-gold" aria-hidden="true" />
          Solenidade / festa
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="flex items-center gap-0.5" aria-hidden="true">
            {Object.values(COLORS).map((color) => (
              <span key={color.token} className="h-2 w-2 rounded-full" style={{ backgroundColor: color.hex }} />
            ))}
          </span>
          Cor litúrgica do dia
        </span>
      </Reveal>

      <Reveal delay={120} className="mt-6 overflow-hidden rounded-2xl border border-stone-50/10">
        <div className="grid grid-cols-7 text-center text-[11px] font-medium uppercase tracking-wide text-stone-50/50">
          {WEEKDAYS.map((weekday) => (
            <div key={weekday.short} className="border-b border-stone-50/10 py-2.5">
              <abbr title={weekday.full} className="no-underline">
                {weekday.short}
              </abbr>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7">
          {gridDays.map((day) => {
            const inCurrentMonth = day.getMonth() === currentMonth.getMonth();
            const isToday = isSameDay(day, today);
            const isSelected = isSameDay(day, selectedDay);
            const events = eventsIndex.get(dateKey(day)) ?? [];
            const highlight = events.find((event) => event.highlight);
            const info = getLiturgicalInfo(day);

            return (
              <button
                key={day.toISOString()}
                type="button"
                onClick={() => selectDay(day)}
                aria-pressed={isSelected}
                aria-current={isToday ? "date" : undefined}
                aria-label={`${day.getDate()} de ${day.toLocaleDateString("pt-BR", { month: "long" })}${
                  isToday ? ", hoje" : ""
                }${highlight ? `, ${highlight.label}` : ""}`}
                className={`group relative flex min-h-[60px] flex-col items-start gap-1.5 border-b border-r border-stone-50/10 p-1.5 text-left transition-colors last:border-r-0 hover:bg-stone-50/10 sm:min-h-[84px] sm:p-2 md:min-h-[104px] ${
                  inCurrentMonth ? "" : "opacity-35"
                }`}
              >
                <time
                  dateTime={day.toISOString().slice(0, 10)}
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-medium sm:h-7 sm:w-7 ${
                    isToday ? "bg-gold text-stone-900" : isSelected ? "text-stone-50 ring-1 ring-gold-bright" : "text-stone-50/80"
                  }`}
                >
                  {day.getDate()}
                </time>

                {events.length > 0 && (
                  <>
                    <div className="flex flex-wrap gap-1 md:hidden">
                      {events.slice(0, 4).map((event) => (
                        <span
                          key={event.key}
                          aria-hidden="true"
                          className="h-1.5 w-1.5 rounded-full"
                          style={{
                            backgroundColor: event.highlight
                              ? "var(--color-gold-bright)"
                              : (COLORS[event.color]?.hex ?? "var(--color-stone-50)"),
                          }}
                        />
                      ))}
                    </div>
                    <div className="hidden w-full md:block">
                      <p className="flex items-center gap-1 text-[11px] leading-tight text-stone-50/75">
                        {highlight && <IconStar className="h-2.5 w-2.5 shrink-0 text-gold-bright" />}
                        <span className="min-w-0 flex-1 truncate">{events[0].label}</span>
                      </p>
                      {events.length > 1 && <p className="text-[10px] text-stone-50/45">+{events.length - 1} mais</p>}
                    </div>
                  </>
                )}

                <span
                  aria-hidden="true"
                  className="absolute inset-x-1.5 bottom-1 h-[3px] rounded-full shadow-[0_0_0_1px_rgba(246,242,232,0.2)]"
                  style={{ backgroundColor: info.hex }}
                />
              </button>
            );
          })}
        </div>
      </Reveal>

      <Reveal delay={160} className="mt-8 rounded-2xl bg-stone-50/8 p-6 sm:p-8">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-gold-bright">
              {capitalize(selectedDay.toLocaleDateString("pt-BR", { weekday: "long" }))}
            </p>
            <h4 className="mt-1 font-serif text-xl font-semibold text-stone-50 sm:text-2xl">
              {selectedDay.getDate()} de {capitalize(selectedDay.toLocaleDateString("pt-BR", { month: "long" }))}
            </h4>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full border border-stone-50/15 px-3 py-1.5 text-xs font-medium text-stone-50/80">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: selectedLiturgical.hex }} aria-hidden="true" />
            {selectedLiturgical.season}
          </span>
        </div>

        <div className="mt-5 flex flex-col gap-3 border-t border-stone-50/10 pt-5">
          {selectedEvents.length > 0 ? (
            selectedEvents.map((event) => (
              <div key={event.key} className="flex items-start gap-2.5">
                {event.highlight ? (
                  <IconStar className="mt-0.5 h-4 w-4 shrink-0 text-gold-bright" />
                ) : (
                  <IconCalendar className="mt-0.5 h-4 w-4 shrink-0 text-stone-50/40" />
                )}
                <div>
                  <p className="font-serif text-base font-medium text-stone-50">{event.label}</p>
                  {event.note && <p className="text-sm text-stone-50/55">{event.note}</p>}
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-stone-50/60">
              Nenhuma celebração especial neste dia. Confira os{" "}
              <Link to="/missas" className="font-medium text-gold-bright underline-offset-4 hover:underline">
                horários de missa
              </Link>
              .
            </p>
          )}
        </div>
      </Reveal>
    </div>
  );
}
