"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type LightboxImage = { src: string; alt: string } | null;

const LightboxContext = createContext<{ open: (src: string, alt: string) => void } | null>(null);

export function useLightbox() {
  const ctx = useContext(LightboxContext);
  if (!ctx) throw new Error("useLightbox doit être utilisé dans un LightboxProvider");
  return ctx;
}

export function LightboxProvider({ children }: { children: ReactNode }) {
  const [image, setImage] = useState<LightboxImage>(null);

  useEffect(() => {
    if (!image) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setImage(null);
    }
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [image]);

  return (
    <LightboxContext.Provider value={{ open: (src, alt) => setImage({ src, alt }) }}>
      {children}
      {image && (
        <div
          className="lightbox-overlay"
          onClick={() => setImage(null)}
          role="button"
          aria-label="Fermer l'image agrandie"
          tabIndex={0}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image.src} alt={image.alt} className="lightbox-image" />
        </div>
      )}
    </LightboxContext.Provider>
  );
}
