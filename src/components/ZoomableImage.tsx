"use client";

import Image, { type ImageProps } from "next/image";
import { useLightbox } from "./Lightbox";

// Enveloppe un <Image fill /> déjà placé dans un conteneur `position:
// relative` existant : clique pour l'agrandir dans la lightbox, reclique
// (ou Échap, ou clique en dehors) pour la refermer.
export function ZoomableImage({ alt, ...rest }: ImageProps & { alt: string }) {
  const { open } = useLightbox();
  const src = typeof rest.src === "string" ? rest.src : "";

  return (
    <button
      type="button"
      className="zoomable-image-btn"
      onClick={() => open(src, alt)}
      aria-label={`Agrandir l'image : ${alt}`}
    >
      <Image {...rest} alt={alt} />
      <span className="zoomable-image-hint" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-4.3-4.3M11 8v6M8 11h6" />
        </svg>
      </span>
    </button>
  );
}
