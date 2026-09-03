import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { CONTACT_FALLBACK } from "../lib/content";

export function useContactInfo() {
  const [contact, setContact] = useState(CONTACT_FALLBACK);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const { data, error: fetchError } = await supabase
          .from("contact_info")
          .select("*")
          .eq("id", 1)
          .maybeSingle();

        if (!active) return;

        if (fetchError) {
          setError(fetchError);
        } else if (data) {
          setContact(data);
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

  return { contact, loading, error };
}
