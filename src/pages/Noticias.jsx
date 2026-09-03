import { useEffect } from "react";
import { useNewsPosts } from "../hooks/useNewsPosts";
import { InstagramEmbed } from "../components/InstagramEmbed";
import { CONTACT_FALLBACK } from "../lib/content";
import { useContactInfo } from "../hooks/useContactInfo";

export function Noticias() {
  const { posts, loading } = useNewsPosts();
  const { contact } = useContactInfo();

  useEffect(() => {
    document.title = "Notícias — Paróquia São José";
  }, []);

  return (
    <div>
      <header className="mx-auto max-w-6xl px-6 pb-10 pt-16 md:pt-20">
        <p className="font-sans text-sm font-medium text-green-mid">Notícias</p>
        <h1 className="mt-3 font-serif text-4xl font-semibold text-ink md:text-5xl">
          Notícias da paróquia
        </h1>
        <p className="mt-6 max-w-xl content-measure text-lg text-ink/80">
          Últimas publicações do{" "}
          <a
            href={contact.instagram_url ?? CONTACT_FALLBACK.instagram_url}
            target="_blank"
            rel="noreferrer"
            className="text-green-mid underline decoration-stone-200 underline-offset-4 hover:text-gold"
          >
            Instagram @matrizsaojoseorl
          </a>
          .
        </p>
      </header>

      <section className="mx-auto max-w-2xl px-6 pb-20">
        {loading && <p className="text-ink/60">Carregando publicações…</p>}

        {!loading && posts.length === 0 && (
          <p className="border-t border-stone-200 py-10 text-ink/60">
            Nenhuma publicação cadastrada ainda. Acompanhe as novidades
            diretamente no Instagram da paróquia.
          </p>
        )}

        <ul className="space-y-12">
          {posts.map((post) => (
            <li key={post.id} className="border-t border-stone-200 pt-8">
              <InstagramEmbed embedUrl={post.embed_url} caption={post.caption} />
              {post.caption && <p className="mt-4 text-ink/80">{post.caption}</p>}
              <p className="mt-2 text-sm text-ink/50">
                {new Date(post.published_at).toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
