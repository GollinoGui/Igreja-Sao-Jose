import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { MASS_SCHEDULE_FALLBACK } from "../lib/content";

export function useMassSchedule() {
  const [schedule, setSchedule] = useState(MASS_SCHEDULE_FALLBACK);
  const [isFallback, setIsFallback] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const { data, error: fetchError } = await supabase
          .from("mass_schedule")
          .select("*")
          .order("sort_order", { ascending: true });

        if (!active) return;

        if (fetchError) {
          setError(fetchError);
        } else if (data && data.length > 0) {
          setSchedule(data);
          setIsFallback(false);
        }
      } catch (err) {
        if (active) setError(err);
      } finally {
        if (active) setLoading(false);
      }
    }

    load();
    return () => {
      active = false;
    };
  }, []);

  return { schedule, loading, error, isFallback };
}
