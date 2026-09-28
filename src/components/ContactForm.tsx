"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "sending" | "ok" | "err";

export function ContactForm({ cvUrl }: { cvUrl: string }) {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") || "").trim(),
      email: String(data.get("email") || "").trim(),
      message: String(data.get("message") || "").trim(),
    };

    if (!payload.name || !payload.email || !payload.message) {
      setStatus("err");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("request failed");
      setStatus("ok");
      form.reset();
    } catch {
      setStatus("err");
    }
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <div className="field">
        <label htmlFor="name">Nom</label>
        <input id="name" name="name" type="text" placeholder="Votre nom" required />
      </div>
      <div className="field">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" placeholder="vous@exemple.fr" required />
      </div>
      <div className="field">
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" placeholder="Votre message" required />
      </div>
      <div className="cta-row">
        <button className="btn btn-primary" type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Envoi..." : "Envoyer"}
        </button>
        <a className="btn btn-ghost" href={cvUrl}>
          Voir mon CV
        </a>
      </div>
      <p
        className={`form-status ${status === "ok" ? "ok" : status === "err" ? "err" : ""}`}
        role="status"
      >
        {status === "ok" && "Message envoyé, merci ! Je vous réponds au plus vite."}
        {status === "err" && "Une erreur est survenue - réessayez ou écrivez-moi directement par email."}
      </p>
    </form>
  );
}
