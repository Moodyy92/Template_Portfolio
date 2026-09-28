"use client";

import { useLayoutEffect, useState } from "react";

// Rendu "visible" par défaut (y compris côté serveur) pour ne jamais laisser
// entrevoir la page en dessous avant que le JS ait pu décider s'il faut
// jouer l'animation ou la sauter (déjà vue cette session / mouvement réduit).
export function IntroOverlay({ name }: { name: string }) {
  const [phase, setPhase] = useState<"visible" | "leaving" | "done">("visible");

  useLayoutEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let seen = true;
    try {
      seen = sessionStorage.getItem("intro-seen") === "1";
    } catch {
      seen = false; // stockage indisponible : on joue l'intro une fois par sécurité
    }

    if (reduce || seen) {
      // Doit être synchrone (useLayoutEffect, pas useEffect) : matchMedia/
      // sessionStorage ne sont lisibles que côté client, donc impossibles à
      // calculer pendant le rendu SSR sans provoquer un flash du rideau.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPhase("done");
      return;
    }

    try {
      sessionStorage.setItem("intro-seen", "1");
    } catch {
      // best-effort
    }

    const leaveTimer = setTimeout(() => setPhase("leaving"), 1500);
    const doneTimer = setTimeout(() => setPhase("done"), 2200);
    return () => {
      clearTimeout(leaveTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div className={`intro-overlay ${phase === "leaving" ? "leaving" : ""}`} aria-hidden="true">
      <span className="intro-text">
        <span className="intro-text-inner">{name || "Bienvenue"}</span>
      </span>
    </div>
  );
}
