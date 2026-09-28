"use client";

import { useEffect, useRef, useState } from "react";

// Anime un chiffre ("140+", "1 200") en comptage lorsqu'il entre à l'écran.
// Les valeurs non numériques (ex: "XX %" en TODO) s'affichent telles quelles.
export function StatValue({ value }: { value: string }) {
  const ref = useRef<HTMLElement>(null);
  const [display, setDisplay] = useState(value);
  // Resynchronise l'affichage pendant le rendu si `value` change, plutôt
  // que dans l'effet ci-dessous (qui ne doit gérer que l'observation/anim).
  const [prevValue, setPrevValue] = useState(value);
  if (value !== prevValue) {
    setPrevValue(value);
    setDisplay(value);
  }

  useEffect(() => {
    const match = value.match(/^([\d\s]+)(.*)$/);
    const el = ref.current;
    if (!match || !el) return;

    const target = parseInt(match[1].replace(/\s/g, ""), 10);
    if (!Number.isFinite(target)) return;
    const suffix = match[2];

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          io.disconnect();
          const start = performance.now();
          const duration = 900;

          function frame(now: number) {
            const t = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            setDisplay(`${Math.round(target * eased)}${suffix}`);
            if (t < 1) requestAnimationFrame(frame);
          }
          requestAnimationFrame(frame);
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value]);

  return <b ref={ref}>{display}</b>;
}
