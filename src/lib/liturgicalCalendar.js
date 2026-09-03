// Calendário litúrgico simplificado.
//
// Não é uma tabela litúrgica oficial completa (isso exigiria o calendário
// próprio da Diocese de Franca, ano a ano). A ideia aqui é dar um indicador
// de bom-senso da cor litúrgica do dia, calculado a partir de datas fixas
// conhecidas e da data da Páscoa (via algoritmo computus de Meeus/Jones/Butcher,
// calendário gregoriano), com fallback para Tempo Comum (verde) no restante
// do ano.

function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function sameDayAndMonth(date, month, day) {
  return date.getMonth() === month && date.getDate() === day;
}

function stripTime(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

/**
 * Data da Páscoa (algoritmo computus de Meeus/Jones/Butcher, gregoriano).
 */
export function getEasterDate(year) {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31); // 3 = março, 4 = abril
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, month - 1, day);
}

/**
 * Datas móveis do ano derivadas da Páscoa.
 */
export function getMovableFeasts(year) {
  const easter = stripTime(getEasterDate(year));
  return {
    ashWednesday: addDays(easter, -46),
    palmSunday: addDays(easter, -7),
    holyThursday: addDays(easter, -3),
    goodFriday: addDays(easter, -2),
    holySaturday: addDays(easter, -1),
    easterSunday: easter,
    pentecost: addDays(easter, 49),
    corpusChristi: addDays(easter, 60),
  };
}

/**
 * Início do Advento: domingo mais próximo de 30 de novembro (4º domingo
 * antes do Natal).
 */
function getAdventStart(year) {
  const christmas = new Date(year, 11, 25);
  const lastSundayBeforeChristmas = addDays(christmas, -christmas.getDay());
  return addDays(lastSundayBeforeChristmas, -21);
}

const COLORS = {
  green: { name: "Verde", hex: "var(--color-green-deep)", token: "green-deep" },
  purple: { name: "Roxo", hex: "var(--color-liturgical-purple)", token: "liturgical-purple" },
  red: { name: "Vermelho", hex: "var(--color-liturgical-red)", token: "liturgical-red" },
  white: { name: "Branco e Dourado", hex: "var(--color-gold)", token: "gold" },
};

/**
 * Retorna { season, color } para uma data (padrão: hoje).
 * `color` é uma das chaves de COLORS; `season` é um rótulo legível.
 */
export function getLiturgicalInfo(date = new Date()) {
  const today = stripTime(date);
  const year = today.getFullYear();
  const feasts = getMovableFeasts(year);
  const adventStart = stripTime(getAdventStart(year));
  const christmasStart = new Date(year, 11, 25);
  // Tempo do Natal vai até o domingo do Batismo do Senhor; simplificado
  // aqui como "até 6 de janeiro" para não exigir cálculo de domingos.
  const epiphanyEnd = new Date(year, 0, 6);

  // Datas fixas de destaque (branco/dourado): solenidades marianas e do Senhor.
  if (sameDayAndMonth(today, 11, 25)) {
    return { season: "Natal do Senhor", ...COLORS.white };
  }
  if (sameDayAndMonth(today, 11, 8)) {
    return { season: "Imaculada Conceição", ...COLORS.white };
  }
  if (sameDayAndMonth(today, 2, 19)) {
    return { season: "Solenidade de São José", ...COLORS.white };
  }

  // Tríduo Pascal e Semana Santa
  if (today.getTime() === stripTime(feasts.palmSunday).getTime()) {
    return { season: "Domingo de Ramos", ...COLORS.red };
  }
  if (today.getTime() === stripTime(feasts.holyThursday).getTime()) {
    return { season: "Quinta-feira Santa", ...COLORS.white };
  }
  if (today.getTime() === stripTime(feasts.goodFriday).getTime()) {
    return { season: "Sexta-feira Santa", ...COLORS.red };
  }
  if (today.getTime() === stripTime(feasts.holySaturday).getTime()) {
    return { season: "Sábado Santo", ...COLORS.purple };
  }

  // Tempo Pascal (Páscoa até véspera de Pentecostes)
  if (today >= stripTime(feasts.easterSunday) && today < stripTime(feasts.pentecost)) {
    return { season: "Tempo Pascal", ...COLORS.white };
  }
  if (today.getTime() === stripTime(feasts.pentecost).getTime()) {
    return { season: "Pentecostes", ...COLORS.red };
  }

  // Quaresma (Quarta-feira de Cinzas até véspera do Domingo de Ramos)
  if (today >= stripTime(feasts.ashWednesday) && today < stripTime(feasts.palmSunday)) {
    return { season: "Quaresma", ...COLORS.purple };
  }

  // Tempo do Natal (25/12 a 6/1, atravessando o ano-novo)
  if (today >= christmasStart || today <= epiphanyEnd) {
    return { season: "Tempo do Natal", ...COLORS.white };
  }

  // Advento
  if (today >= adventStart && today < christmasStart) {
    return { season: "Advento", ...COLORS.purple };
  }

  // Fallback: Tempo Comum
  return { season: "Tempo Comum", ...COLORS.green };
}
