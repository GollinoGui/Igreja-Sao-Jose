import { useEffect, useState } from "react";
import { DAILY_READING_FALLBACK } from "../lib/content";

// API pública e não-oficial da liturgia diária católica (calendário
// brasileiro). Sem parâmetros, devolve a liturgia do dia atual.
// https://github.com/Dancrf/liturgia-diaria
const API_URL = "https://liturgia.up.railway.app/v2/";

function buildReadingsList(leituras) {
  const list = [];
  if (leituras?.primeiraLeitura?.[0]?.referencia) {
    list.push({ label: "1ª Leitura", reference: leituras.primeiraLeitura[0].referencia });
  }
  if (leituras?.segundaLeitura?.[0]?.referencia) {
    list.push({ label: "2ª Leitura", reference: leituras.segundaLeitura[0].referencia });
  }
  if (leituras?.salmo?.[0]?.referencia) {
    list.push({ label: "Salmo", reference: leituras.salmo[0].referencia });
  }
  if (leituras?.evangelho?.[0]?.referencia) {
    list.push({ label: "Evangelho", reference: leituras.evangelho[0].referencia });
  }
  return list;
}

/**
 * Busca a liturgia do dia (salmo responsorial como epígrafe curta, mais o
 * nome da celebração e as referências das leituras) para a seção da Home.
 * Em caso de falha da API externa, mantém o versículo fixo de fallback e
 * omite os detalhes extras (nome da celebração, lista de leituras).
 */
export function useDailyReading() {
  const [reading, setReading] = useState(DAILY_READING_FALLBACK);
  const [isFallback, setIsFallback] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error(`liturgia: status ${response.status}`);
        const data = await response.json();
        const salmo = data?.leituras?.salmo?.[0];

        if (active && salmo?.refrao && salmo?.referencia) {
          setReading({
            text: salmo.refrao,
            reference: salmo.referencia,
            liturgyName: data.liturgia,
            readings: buildReadingsList(data.leituras),
          });
          setIsFallback(false);
        }
      } catch {
        // API externa fora do ar: fica com o fallback fixo.
      } finally {
        if (active) setLoading(false);
      }
    }

    load();
    return () => {
      active = false;
    };
  }, []);

  return { reading, loading, isFallback };
}
