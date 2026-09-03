import { useEffect } from "react";

const EMBED_SCRIPT_SRC = "https://www.instagram.com/embed.js";

function loadEmbedScript() {
  if (window.instgrm) {
    window.instgrm.Embeds.process();
    return;
  }

  const existing = document.querySelector(`script[src="${EMBED_SCRIPT_SRC}"]`);
  if (existing) {
    existing.addEventListener("load", () => window.instgrm?.Embeds.process());
    return;
  }

  const script = document.createElement("script");
  script.src = EMBED_SCRIPT_SRC;
  script.async = true;
  document.body.appendChild(script);
}

/**
 * Embed oficial do Instagram (<blockquote class="instagram-media"> +
 * //www.instagram.com/embed.js). O script é carregado uma única vez e
 * reprocessado a cada novo post renderizado.
 */
export function InstagramEmbed({ embedUrl, caption }) {
  useEffect(() => {
    loadEmbedScript();
  }, [embedUrl]);

  return (
    <blockquote
      className="instagram-media"
      data-instgrm-permalink={embedUrl}
      data-instgrm-version="14"
      style={{ background: "#FFF", margin: 0, width: "100%" }}
    >
      <a href={embedUrl} target="_blank" rel="noreferrer">
        {caption || "Ver publicação no Instagram"}
      </a>
    </blockquote>
  );
}
