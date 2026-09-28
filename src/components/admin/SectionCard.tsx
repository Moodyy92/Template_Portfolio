"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import type { Block, SectionWithBlocks } from "@/lib/types";
import { SECTION_ADDABLE_BLOCKS, SECTION_LABELS } from "@/lib/admin-config";
import { createBlock, reorderBlocks, updateSection } from "@/app/actions/admin";
import { SortableItem, type DragHandleProps } from "./SortableItem";
import { BlockEditor } from "./BlockEditor";

function blockSummary(block: Block): string {
  const c = block.content as Record<string, unknown>;
  switch (block.type) {
    case "hero_portrait":
      return "Photo de profil";
    case "match_row":
      return String(c.ask ?? "").slice(0, 60) || "(vide)";
    case "timeline_item":
      return `${c.year ?? ""} - ${c.title ?? ""}`;
    case "stat":
      return `${c.value ?? ""} - ${c.label ?? ""}`;
    case "project":
      return String(c.title ?? "(vide)");
    case "testimonial":
      return String(c.author ?? "(vide)");
    case "renovation_room":
      return String(c.title ?? "(vide)");
    case "skill_column":
      return String(c.heading ?? "(vide)");
    default:
      return block.type;
  }
}

export function SectionCard({
  section,
  dragHandleProps,
}: {
  section: SectionWithBlocks;
  dragHandleProps: DragHandleProps;
}) {
  const router = useRouter();
  const [blocks, setBlocks] = useState(section.blocks);
  const [prevBlocks, setPrevBlocks] = useState(section.blocks);
  if (section.blocks !== prevBlocks) {
    setPrevBlocks(section.blocks);
    setBlocks(section.blocks);
  }

  const [editingId, setEditingId] = useState<string | null>(null);
  const [fields, setFields] = useState({
    kicker: section.kicker ?? "",
    heading: section.heading ?? "",
    intro: section.intro ?? "",
    note: (section.extra?.note as string | undefined) ?? "",
    titleLines: ((section.extra?.titleLines as string[] | undefined) ?? []).join("\n"),
    footnote: (section.extra?.footnote as string | undefined) ?? "",
    visible: section.visible,
  });
  const [savingHeader, setSavingHeader] = useState(false);
  const [headerError, setHeaderError] = useState<string | null>(null);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }));

  async function onBlockDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = blocks.findIndex((b) => b.id === active.id);
    const newIndex = blocks.findIndex((b) => b.id === over.id);
    const next = arrayMove(blocks, oldIndex, newIndex);
    setBlocks(next);
    await reorderBlocks(next.map((b) => b.id));
    router.refresh();
  }

  async function onSaveHeader() {
    setSavingHeader(true);
    setHeaderError(null);
    try {
      const { note, titleLines, footnote, ...rest } = fields;
      const extra: Record<string, unknown> = { ...section.extra, note };
      if (section.slug === "hero") {
        extra.titleLines = titleLines
          .split("\n")
          .map((l) => l.trim())
          .filter(Boolean);
        extra.footnote = footnote;
      }
      await updateSection(section.id, { ...rest, extra });
      router.refresh();
    } catch (err) {
      setHeaderError(err instanceof Error ? err.message : "Échec de l'enregistrement.");
    } finally {
      setSavingHeader(false);
    }
  }

  async function onAdd(type: string) {
    const addable = SECTION_ADDABLE_BLOCKS[section.slug]?.find((a) => a.type === type);
    if (!addable) return;
    await createBlock(section.id, addable.type, addable.defaultContent, addable.defaultImages);
    router.refresh();
  }

  const addable = SECTION_ADDABLE_BLOCKS[section.slug] ?? [];

  return (
    <div className="admin-section-card">
      <div className="admin-section-header">
        <button
          type="button"
          className="admin-drag-handle"
          {...dragHandleProps.attributes}
          {...dragHandleProps.listeners}
          aria-label="Déplacer la section"
        >
          ⠿
        </button>
        <strong>{SECTION_LABELS[section.slug] ?? section.slug}</strong>
        <label className="admin-checkbox admin-visible-toggle">
          <input
            type="checkbox"
            checked={fields.visible}
            onChange={async (e) => {
              const visible = e.target.checked;
              setFields((f) => ({ ...f, visible }));
              try {
                await updateSection(section.id, { visible });
                router.refresh();
              } catch (err) {
                setHeaderError(err instanceof Error ? err.message : "Échec de l'enregistrement.");
              }
            }}
          />
          Visible
        </label>
      </div>

      <div className="admin-section-body">
        <div className="admin-field">
          <label>Kicker (petit texte au-dessus du titre)</label>
          <input
            value={fields.kicker}
            onChange={(e) => setFields((f) => ({ ...f, kicker: e.target.value }))}
          />
        </div>
        {section.slug === "hero" ? (
          <div className="admin-field">
            <label>Titre (une ligne par ligne, affichées l&apos;une sous l&apos;autre)</label>
            <textarea
              value={fields.titleLines}
              onChange={(e) => setFields((f) => ({ ...f, titleLines: e.target.value }))}
            />
          </div>
        ) : (
          <div className="admin-field">
            <label>Titre</label>
            <input
              value={fields.heading}
              onChange={(e) => setFields((f) => ({ ...f, heading: e.target.value }))}
            />
          </div>
        )}
        <div className="admin-field">
          <label>Texte d&apos;intro</label>
          <textarea
            value={fields.intro}
            onChange={(e) => setFields((f) => ({ ...f, intro: e.target.value }))}
          />
        </div>
        {section.slug === "hero" && (
          <div className="admin-field">
            <label>Note en petit sous le texte d&apos;intro (ex : explique un astérisque)</label>
            <input
              value={fields.footnote}
              onChange={(e) => setFields((f) => ({ ...f, footnote: e.target.value }))}
              placeholder="* IRL = in real life, en dehors d'internet"
            />
          </div>
        )}
        {section.slug === "match" && (
          <div className="admin-field">
            <label>Bandeau encadré (vert)</label>
            <textarea
              value={fields.note}
              onChange={(e) => setFields((f) => ({ ...f, note: e.target.value }))}
            />
          </div>
        )}
        <div className="admin-actions">
          <button
            type="button"
            className="admin-btn admin-btn-primary"
            onClick={onSaveHeader}
            disabled={savingHeader}
          >
            {savingHeader ? "Enregistrement..." : "Enregistrer la section"}
          </button>
          {headerError && <span className="admin-error">{headerError}</span>}
        </div>

        {blocks.length > 0 && (
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onBlockDragEnd}>
            <SortableContext items={blocks.map((b) => b.id)} strategy={verticalListSortingStrategy}>
              <div className="admin-blocks">
                {blocks.map((block) => (
                  <SortableItem key={block.id} id={block.id}>
                    {(drag) => (
                      <div className="admin-block-row">
                        <div className="admin-block-row-head">
                          <button
                            type="button"
                            className="admin-drag-handle"
                            {...drag.attributes}
                            {...drag.listeners}
                            aria-label="Déplacer le bloc"
                          >
                            ⠿
                          </button>
                          <span className="admin-block-type">{block.type}</span>
                          <span className="admin-block-summary">{blockSummary(block)}</span>
                          <button
                            type="button"
                            className="admin-btn admin-btn-ghost"
                            onClick={() => setEditingId(editingId === block.id ? null : block.id)}
                          >
                            {editingId === block.id ? "Fermer" : "Éditer"}
                          </button>
                        </div>
                        {editingId === block.id && (
                          <BlockEditor block={block} onClose={() => setEditingId(null)} />
                        )}
                      </div>
                    )}
                  </SortableItem>
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}

        {addable.length > 0 && (
          <div className="admin-add-row">
            {addable.map((a) => (
              <button
                key={a.type}
                type="button"
                className="admin-btn admin-btn-ghost"
                onClick={() => onAdd(a.type)}
              >
                + {a.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
