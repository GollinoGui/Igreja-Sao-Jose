// Índice de eventos do calendário litúrgico/paroquial por dia, combinando
// as datas manuais de content.js (fixas e móveis) com as solenidades/festas
// geradas em liturgicalFeasts.generated.json. Usado pelo LiturgicalCalendar
// (página /calendario) — a Home usa a versão resumida em ImportantDates.jsx,
// que só olha para a próxima ocorrência de cada data.
import { IMPORTANT_DATES } from "./content";
import { getMovableFeasts } from "./liturgicalCalendar";
import GENERATED_FEASTS from "../data/liturgicalFeasts.generated.json";

export function dateKey(date) {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

/**
 * Constrói um Map (dateKey -> eventos[]) com todas as datas especiais dos
 * anos informados. `years` deve cobrir todo ano civil que aparece na grade
 * visível do mês (o mês atual e, nas bordas do grid, o anterior/seguinte).
 */
export function buildEventsIndex(years) {
  const index = new Map();

  function add(date, event) {
    const key = dateKey(date);
    if (!index.has(key)) index.set(key, []);
    index.get(key).push(event);
  }

  for (const year of years) {
    const movableFeasts = getMovableFeasts(year);

    for (const item of IMPORTANT_DATES) {
      const date = item.movable ? movableFeasts[item.movable] : new Date(year, item.month - 1, item.day);
      if (!date) continue;
      add(date, {
        key: `${item.key}-${year}`,
        label: item.label,
        note: item.note ?? null,
        highlight: !!item.highlight,
        color: item.liturgicalColor ?? null,
      });
    }
  }

  const relevantYears = new Set(years);
  for (const feast of GENERATED_FEASTS) {
    if (!relevantYears.has(feast.year)) continue;
    add(new Date(feast.year, feast.month - 1, feast.day), {
      key: `${feast.key}-${feast.year}`,
      label: feast.label,
      note: null,
      highlight: false,
      color: feast.color ?? null,
    });
  }

  return index;
}
