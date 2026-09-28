"use client";

import { useRef, useState, type ChangeEvent } from "react";
import { createClient } from "@/lib/supabase/browser";

export function ImageUploader({
  label,
  url,
  onChange,
}: {
  label: string;
  url: string | null;
  onChange: (url: string | null) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onFileSelected(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError(null);

    const supabase = createClient();
    const ext = file.name.split(".").pop() ?? "jpg";
    const path = `blocks/${crypto.randomUUID()}.${ext}`;

    const { error: uploadError } = await supabase.storage.from("media").upload(path, file, {
      cacheControl: "3600",
      upsert: false,
    });

    if (uploadError) {
      setError("Échec de l'upload.");
      setUploading(false);
      return;
    }

    const { data } = supabase.storage.from("media").getPublicUrl(path);
    onChange(data.publicUrl);
    setUploading(false);
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div className="admin-image-uploader">
      <span className="admin-image-label">{label}</span>
      {url ? (
        <div className="admin-image-preview">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={url} alt={label} />
          <button
            type="button"
            className="admin-btn admin-btn-ghost"
            onClick={() => onChange(null)}
          >
            Retirer
          </button>
        </div>
      ) : (
        <div className="admin-image-empty">Aucune image</div>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={onFileSelected}
        disabled={uploading}
      />
      {uploading && <span className="admin-image-status">Envoi...</span>}
      {error && <span className="admin-error">{error}</span>}
    </div>
  );
}
