// Busca o Calendário Romano Geral na LiturgicalCalendarAPI
// (https://litcal.johnromanodorazio.com) em tempo de build e gera um JSON
// estático com as solenidades e festas de data fixa, já traduzidas para
// pt-BR. Isso evita chamadas de rede no navegador (a API não envia cabeçalho
// CORS) e mantém o site funcionando mesmo se a API estiver fora do ar — o
// build reaproveita o JSON já commitado quando o fetch falha.
//
// Rodar manualmente: npm run generate:liturgical
// Também roda automaticamente antes de `npm run build` (script "prebuild").
import { writeFile, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { LITURGICAL_FEAST_NAMES, MANUALLY_CURATED_KEYS } from "../src/lib/liturgicalFeastNames.js";

const API_BASE = "https://litcal.johnromanodorazio.com/api/v5/calendar";
const OUTPUT_PATH = fileURLToPath(
  new URL("../src/data/liturgicalFeasts.generated.json", import.meta.url),
);

// Só nos interessam solenidades (6) e festas (4) — exclui tempos móveis
// baseados em domingo (grade 5 e 7, já cobertos por getMovableFeasts) e
// memórias/memórias facultativas (0-3), numerosas demais para um widget de
// destaques da home.
const RELEVANT_GRADES = new Set([4, 6]);

async function fetchYear(year) {
  const url = `${API_BASE}?year=${year}&locale=en`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`LiturgicalCalendarAPI respondeu ${res.status} para ${url}`);
  }
  const data = await res.json();
  return data.litcal;
}

function extractFeasts(events) {
  const seen = new Set();
  const feasts = [];
  const missingTranslations = new Set();

  for (const event of events) {
    if (!RELEVANT_GRADES.has(event.grade)) continue;
    if (event.event_key.endsWith("_vigil")) continue;
    if (MANUALLY_CURATED_KEYS.has(event.event_key)) continue;

    const label = LITURGICAL_FEAST_NAMES[event.event_key];
    if (!label) {
      missingTranslations.add(`${event.event_key} (${event.name})`);
      continue;
    }

    const date = new Date(event.date);
    const dedupeKey = `${event.event_key}-${date.getUTCFullYear()}`;
    if (seen.has(dedupeKey)) continue;
    seen.add(dedupeKey);

    feasts.push({
      key: event.event_key,
      label,
      year: date.getUTCFullYear(),
      month: date.getUTCMonth() + 1,
      day: date.getUTCDate(),
      color: event.color?.[0] ?? null,
    });
  }

  return { feasts, missingTranslations };
}

async function main() {
  const now = new Date();
  const years = [now.getFullYear(), now.getFullYear() + 1];

  let allFeasts = [];
  const allMissing = new Set();

  try {
    for (const year of years) {
      const events = await fetchYear(year);
      const { feasts, missingTranslations } = extractFeasts(events);
      allFeasts.push(...feasts);
      for (const m of missingTranslations) allMissing.add(m);
    }
  } catch (err) {
    console.warn(
      `[liturgical-calendar] Falha ao buscar dados da LiturgicalCalendarAPI: ${err.message}`,
    );
    console.warn(
      "[liturgical-calendar] Mantendo o JSON gerado anteriormente (se existir).",
    );
    try {
      await readFile(OUTPUT_PATH, "utf8");
      console.warn("[liturgical-calendar] Build seguirá com o arquivo já existente.");
      return;
    } catch {
      console.warn(
        "[liturgical-calendar] Nenhum arquivo anterior encontrado; gerando lista vazia.",
      );
      allFeasts = [];
    }
  }

  allFeasts.sort((a, b) => a.year - b.year || a.month - b.month || a.day - b.day);

  await writeFile(OUTPUT_PATH, JSON.stringify(allFeasts, null, 2) + "\n", "utf8");
  console.log(
    `[liturgical-calendar] ${allFeasts.length} festas escritas em ${path.relative(process.cwd(), OUTPUT_PATH)}`,
  );

  if (allMissing.size > 0) {
    console.warn(
      `[liturgical-calendar] ${allMissing.size} evento(s) sem tradução em src/lib/liturgicalFeastNames.js (ignorados):`,
    );
    for (const m of allMissing) console.warn(`  - ${m}`);
  }
}

main();
