// Agrupa os horários de missa (useMassSchedule) por dia, preservando a
// ordem de chegada — usado na Home (prévia) e em /missas (lista completa).
export function groupMassScheduleByDay(schedule) {
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
