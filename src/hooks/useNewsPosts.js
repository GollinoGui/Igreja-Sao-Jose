import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export function useNewsPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const { data, error: fetchError } = await supabase
          .from("news_posts")
          .select("*")
          .order("published_at", { ascending: false });

        if (!active) return;

        if (fetchError) {
          setError(fetchError);
        } else {
          setPosts(data ?? []);
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

  return { posts, loading, error };
}
