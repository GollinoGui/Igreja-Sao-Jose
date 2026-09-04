import { useEffect } from "react";
import { useNewsPosts } from "../hooks/useNewsPosts";
import { InstagramEmbed } from "../components/InstagramEmbed";
import { CONTACT_FALLBACK } from "../lib/content";
import { useContactInfo } from "../hooks/useContactInfo";
import { Reveal } from "../components/Reveal";

export function Noticias() {
  const { posts, loading } = useNewsPosts();
  const { contact } = useContactInfo();

  useEffect(() => {
    document.title = "Notícias — Paróquia São José";
  }, []);

  return (
    <div>
      <header className="mesh-stone grain-overlay relative overflow-hidden">
        <div className="relative z-10 mx-auto max-w-6xl px-6 pb-14 pt-24 md:pb-16 md:pt-28">
          <Reveal>
            <p className="flex items-center gap-2 font-sans text-sm font-medium text-green-mid">
              <span className="h-px w-8 bg-gold" aria-hidden="true" />
              Notícias
            </p>
            <h1 className="mt-4 font-serif text-4xl font-semibold text-ink md:text-5xl">
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
          </Reveal>
        </div>
      </header>

      <section className="mx-auto max-w-2xl px-6 py-16 md:py-20">
        {loading && <p className="text-ink/60">Carregando publicações…</p>}

        {!loading && posts.length === 0 && (
          <Reveal className="rounded-2xl border border-dashed border-stone-200 p-8 text-center text-ink/60">
            Nenhuma publicação cadastrada ainda. Acompanhe as novidades
            diretamente no Instagram da paróquia.
          </Reveal>
        )}

        <ul className="space-y-8">
          {posts.map((post, index) => (
            <Reveal
              as="li"
              key={post.id}
              delay={index * 80}
              className="rounded-2xl border border-stone-200 bg-stone-50 p-2 shadow-soft"
            >
              <InstagramEmbed embedUrl={post.embed_url} caption={post.caption} />
              {post.caption && <p className="mt-4 px-4 text-ink/80">{post.caption}</p>}
              <p className="mt-2 px-4 pb-2 text-sm text-ink/50">
                {new Date(post.published_at).toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </Reveal>
          ))}
        </ul>
      </section>
    </div>
  );
}
