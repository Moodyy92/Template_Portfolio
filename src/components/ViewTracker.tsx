"use client";

import { useEffect } from "react";

// Enregistre une visite anonyme (compteur de vues) via /api/views.
export function ViewTracker() {
  useEffect(() => {
    fetch("/api/views", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        path: window.location.pathname,
        referrer: document.referrer || null,
      }),
      keepalive: true,
    }).catch(() => {
      // best-effort, on n'affiche rien à l'utilisateur
    });
  }, []);

  return null;
}
