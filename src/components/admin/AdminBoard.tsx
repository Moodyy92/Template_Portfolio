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
import type { SectionWithBlocks } from "@/lib/types";
import { reorderSections } from "@/app/actions/admin";
import { SortableItem } from "./SortableItem";
import { SectionCard } from "./SectionCard";

export function AdminBoard({ initialSections }: { initialSections: SectionWithBlocks[] }) {
  const router = useRouter();
  const [sections, setSections] = useState(initialSections);
  const [prevInitialSections, setPrevInitialSections] = useState(initialSections);
  if (initialSections !== prevInitialSections) {
    setPrevInitialSections(initialSections);
    setSections(initialSections);
  }

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }));

  async function onDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = sections.findIndex((s) => s.id === active.id);
    const newIndex = sections.findIndex((s) => s.id === over.id);
    const next = arrayMove(sections, oldIndex, newIndex);
    setSections(next);
    await reorderSections(next.map((s) => s.id));
    router.refresh();
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
      <SortableContext items={sections.map((s) => s.id)} strategy={verticalListSortingStrategy}>
        <div className="admin-sections">
          {sections.map((section) => (
            <SortableItem key={section.id} id={section.id}>
              {(drag) => <SectionCard section={section} dragHandleProps={drag} />}
            </SortableItem>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
