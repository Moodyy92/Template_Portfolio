"use client";

import { useState, type FormEvent } from "react";
import { updateProfile } from "@/app/actions/admin";
import type { Profile } from "@/lib/types";

export function ProfileForm({ profile }: { profile: Profile }) {
  const [form, setForm] = useState<Profile>(profile);
  const [status, setStatus] = useState<"idle" | "saving" | "ok" | "err">("idle");

  function set<K extends keyof Profile>(key: K, value: Profile[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("saving");
    try {
      await updateProfile(form);
      setStatus("ok");
    } catch {
      setStatus("err");
    }
  }

  return (
    <form className="admin-card" onSubmit={onSubmit}>
      <div className="admin-field">
        <label>Nom</label>
        <input value={form.name} onChange={(e) => set("name", e.target.value)} />
      </div>
      <div className="admin-field">
        <label>Poste visé</label>
        <input value={form.targetRole} onChange={(e) => set("targetRole", e.target.value)} />
      </div>
      <div className="admin-field">
        <label>Département</label>
        <input value={form.department} onChange={(e) => set("department", e.target.value)} />
      </div>
      <div className="admin-field">
        <label>Localisation (affichée)</label>
        <input value={form.location} onChange={(e) => set("location", e.target.value)} />
      </div>
      <div className="admin-field">
        <label>Email</label>
        <input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} />
      </div>
      <div className="admin-field">
        <label>Téléphone</label>
        <input value={form.phone} onChange={(e) => set("phone", e.target.value)} />
      </div>
      <div className="admin-field">
        <label>Lien du CV (PDF)</label>
        <input value={form.cvUrl} onChange={(e) => set("cvUrl", e.target.value)} />
      </div>
      <div className="admin-field">
        <label>Nom du fichier CV au téléchargement</label>
        <input value={form.cvFileName} onChange={(e) => set("cvFileName", e.target.value)} />
      </div>
      <div className="admin-field">
        <label>Lien de la lettre de motivation (PDF)</label>
        <input value={form.lmUrl} onChange={(e) => set("lmUrl", e.target.value)} />
      </div>
      <div className="admin-field">
        <label>Nom du fichier lettre de motivation au téléchargement</label>
        <input value={form.lmFileName} onChange={(e) => set("lmFileName", e.target.value)} />
      </div>
      <div className="admin-field">
        <label>Profil LinkedIn (laisser vide pour masquer la puce)</label>
        <input
          value={form.linkedinUrl}
          onChange={(e) => set("linkedinUrl", e.target.value)}
          placeholder="https://www.linkedin.com/in/..."
        />
      </div>
      <div className="admin-field">
        <label>Profil GitHub (laisser vide pour masquer la puce)</label>
        <input
          value={form.githubUrl}
          onChange={(e) => set("githubUrl", e.target.value)}
          placeholder="https://github.com/..."
        />
      </div>
      <div className="admin-field">
        <label>Date de naissance (laisser vide pour masquer l&apos;âge)</label>
        <input
          type="date"
          value={form.birthDate}
          onChange={(e) => set("birthDate", e.target.value)}
        />
      </div>
      <label className="admin-checkbox">
        <input
          type="checkbox"
          checked={form.hasLicenseB}
          onChange={(e) => set("hasLicenseB", e.target.checked)}
        />
        Afficher la puce « Permis B »
      </label>
      <div className="admin-actions">
        <button className="admin-btn admin-btn-primary" type="submit" disabled={status === "saving"}>
          {status === "saving" ? "Enregistrement..." : "Enregistrer"}
        </button>
        {status === "ok" && <span className="admin-status-ok">Enregistré.</span>}
        {status === "err" && <span className="admin-error">Erreur - réessaie.</span>}
      </div>
    </form>
  );
}
