"use client";

import { useState } from "react";
import { BLOCK_FIELDS, type FieldDef } from "@/lib/admin-config";
import { deleteBlock, updateBlock } from "@/app/actions/admin";
import type { Block, BlockType, ImageEntry } from "@/lib/types";
import { ImageUploader } from "./ImageUploader";

function fieldToInputValue(kind: FieldDef["kind"], value: unknown): string {
  if (kind === "list") return Array.isArray(value) ? value.join("\n") : "";
  if (kind === "tags") return Array.isArray(value) ? value.join(", ") : "";
  return typeof value === "string" ? value : "";
}

function inputValueToField(kind: FieldDef["kind"], raw: string): unknown {
  if (kind === "list")
    return raw
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
  if (kind === "tags")
    return raw
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  return raw;
}

export function BlockEditor({ block, onClose }: { block: Block; onClose: () => void }) {
  const fields = BLOCK_FIELDS[block.type as BlockType] ?? [];
  const [content, setContent] = useState<Record<string, unknown>>(block.content);
  const [images, setImages] = useState<ImageEntry[]>(block.images ?? []);
  const [status, setStatus] = useState<"idle" | "saving" | "err">("idle");

  function setField(key: string, value: unknown) {
    setContent((c) => ({ ...c, [key]: value }));
  }

  function setImage(key: string, url: string | null) {
    setImages((imgs) => imgs.map((img) => (img.key === key ? { ...img, url } : img)));
  }

  async function onSave() {
    setStatus("saving");
    try {
      await updateBlock(block.id, { content, images });
      onClose();
    } catch {
      setStatus("err");
    }
  }

  async function onDelete() {
    if (!confirm("Supprimer ce bloc ?")) return;
    setStatus("saving");
    try {
      await deleteBlock(block.id);
      onClose();
    } catch {
      setStatus("err");
    }
  }

  return (
    <div className="admin-block-editor">
      {fields.map((field) => (
        <div className="admin-field" key={field.key}>
          <label>{field.label}</label>
          {field.kind === "checkbox" ? (
            <label className="admin-checkbox">
              <input
                type="checkbox"
                checked={Boolean(content[field.key])}
                onChange={(e) => setField(field.key, e.target.checked)}
              />
            </label>
          ) : field.kind === "textarea" || field.kind === "list" ? (
            <textarea
              value={fieldToInputValue(field.kind, content[field.key])}
              onChange={(e) => setField(field.key, inputValueToField(field.kind, e.target.value))}
            />
          ) : field.kind === "select" ? (
            <select
              value={fieldToInputValue("text", content[field.key])}
              onChange={(e) => setField(field.key, e.target.value)}
            >
              {field.options.map((opt) => (
                <option value={opt.value} key={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              type="text"
              value={fieldToInputValue(field.kind, content[field.key])}
              onChange={(e) => setField(field.key, inputValueToField(field.kind, e.target.value))}
            />
          )}
        </div>
      ))}

      {images.length > 0 && (
        <div className="admin-images">
          {images.map((img) => (
            <ImageUploader
              key={img.key}
              label={img.label}
              url={img.url}
              onChange={(url) => setImage(img.key, url)}
            />
          ))}
        </div>
      )}

      <div className="admin-actions">
        <button className="admin-btn admin-btn-primary" onClick={onSave} disabled={status === "saving"}>
          {status === "saving" ? "Enregistrement..." : "Enregistrer"}
        </button>
        <button className="admin-btn admin-btn-ghost" onClick={onClose} type="button">
          Annuler
        </button>
        <button className="admin-btn admin-btn-danger" onClick={onDelete} type="button">
          Supprimer
        </button>
        {status === "err" && <span className="admin-error">Erreur - réessaie.</span>}
      </div>
    </div>
  );
}
