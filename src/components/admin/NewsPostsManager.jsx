import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { Button } from "../Button";

const EMPTY_POST = { embed_url: "", caption: "", published_at: new Date().toISOString().slice(0, 10) };

export function NewsPostsManager() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newPost, setNewPost] = useState(EMPTY_POST);
  const [status, setStatus] = useState(null);

  async function loadPosts() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("news_posts")
        .select("*")
        .order("published_at", { ascending: false });
      if (error) {
        setStatus({ type: "error", text: error.message });
      } else {
        setPosts(data ?? []);
      }
    } catch (err) {
      setStatus({ type: "error", text: err.message });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPosts();
  }, []);

  async function handleAddPost(event) {
    event.preventDefault();
    setStatus(null);
    const { data, error } = await supabase
      .from("news_posts")
      .insert({ ...newPost, caption: newPost.caption || null })
      .select()
      .single();
    if (error) {
      setStatus({ type: "error", text: error.message });
      return;
    }
    setPosts((current) => [data, ...current]);
    setNewPost(EMPTY_POST);
  }

  async function handleDelete(id) {
    setStatus(null);
    const { error } = await supabase.from("news_posts").delete().eq("id", id);
    if (error) {
      setStatus({ type: "error", text: error.message });
      return;
    }
    setPosts((current) => current.filter((post) => post.id !== id));
  }

  return (
    <div>
      <h2 className="font-serif text-xl font-semibold text-ink">Notícias</h2>

      {status && (
        <p className={`mt-3 text-sm ${status.type === "error" ? "text-liturgical-red" : "text-green-mid"}`}>
          {status.text}
        </p>
      )}

      <form onSubmit={handleAddPost} className="mt-4 grid grid-cols-1 gap-3 border border-stone-200 p-4 sm:grid-cols-2">
        <input
          required
          aria-label="URL do post do Instagram"
          placeholder="URL do post do Instagram"
          value={newPost.embed_url}
          onChange={(event) => setNewPost((p) => ({ ...p, embed_url: event.target.value }))}
          className="border border-stone-200 bg-stone-50 px-3 py-2 text-sm sm:col-span-2"
        />
        <input
          aria-label="Legenda (opcional)"
          placeholder="Legenda (opcional)"
          value={newPost.caption}
          onChange={(event) => setNewPost((p) => ({ ...p, caption: event.target.value }))}
          className="border border-stone-200 bg-stone-50 px-3 py-2 text-sm"
        />
        <input
          type="date"
          aria-label="Data de publicação"
          value={newPost.published_at}
          onChange={(event) => setNewPost((p) => ({ ...p, published_at: event.target.value }))}
          className="border border-stone-200 bg-stone-50 px-3 py-2 text-sm"
        />
        <Button type="submit" variant="primary" className="sm:col-span-2 sm:justify-self-start">
          Publicar
        </Button>
      </form>

      {loading ? (
        <p className="mt-4 text-ink/60">Carregando…</p>
      ) : (
        <ul className="mt-6 divide-y divide-stone-200">
          {posts.map((post) => (
            <li key={post.id} className="flex items-center justify-between gap-4 py-4">
              <div className="min-w-0">
                <p className="truncate text-sm text-ink">{post.embed_url}</p>
                <p className="text-xs text-ink/60">
                  {post.caption ?? "Sem legenda"} ·{" "}
                  {new Date(post.published_at).toLocaleDateString("pt-BR")}
                </p>
              </div>
              <Button type="button" variant="secondary" onClick={() => handleDelete(post.id)}>
                Excluir
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
