import type { ReactNode } from "react";
import type { SectionWithBlocks } from "@/lib/types";
import { SectionHead } from "./SectionHead";

const columnIcons: Record<string, ReactNode> = {
  code: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M8 3 4 7l4 4M16 3l4 4-4 4M14 4l-4 16" />
    </svg>
  ),
  tool: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M14 7 9 12l-5 5 3 3 5-5 5-5" />
      <path d="m14 7 3-3 3 3-3 3" />
    </svg>
  ),
  people: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20a6 6 0 0 1 12 0M16 6a3 3 0 0 1 0 6M21 20a6 6 0 0 0-4-5.6" />
    </svg>
  ),
};

export function Skills({ section }: { section: SectionWithBlocks }) {
  const columns = section.blocks.filter((b) => b.type === "skill_column");

  return (
    <section className="section" id="competences">
      <div className="wrap">
        <SectionHead kicker={section.kicker} heading={section.heading} />
        <div className="skills">
          {columns.map((col) => {
            const heading = col.content.heading as string;
            const icon = (col.content.icon as string | undefined) ?? "code";
            const items = (col.content.items as string[] | undefined) ?? [];
            return (
              <div className="skillcol reveal" key={col.id}>
                <h3>
                  {columnIcons[icon] ?? columnIcons.code}
                  {heading}
                </h3>
                <ul>
                  {items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
