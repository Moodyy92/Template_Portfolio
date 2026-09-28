import type { SectionWithBlocks } from "@/lib/types";
import { SectionHead } from "./SectionHead";

export function Match({ section }: { section: SectionWithBlocks }) {
  const note = (section.extra?.note as string | undefined) ?? "";
  const rows = section.blocks.filter((b) => b.type === "match_row");

  return (
    <section className="section" id="match">
      <div className="wrap">
        <SectionHead kicker={section.kicker} heading={section.heading} intro={section.intro} />
        {note && <div className="match-note reveal">{note}</div>}
        <div className="match-list">
          {rows.map((row) => {
            const ask = row.content.ask as string;
            const have = row.content.have as string;
            return (
              <div className="match-row reveal" key={row.id}>
                <div className="match-ask">
                  <b>Ce que l&apos;offre demande</b>
                  <span>{ask}</span>
                </div>
                <div className="match-have">
                  <b>Ce que j&apos;ai déjà fait</b>
                  <span>{have}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
