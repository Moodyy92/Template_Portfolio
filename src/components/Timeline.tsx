import type { SectionWithBlocks } from "@/lib/types";
import { SectionHead } from "./SectionHead";

export function Timeline({ section }: { section: SectionWithBlocks }) {
  const items = section.blocks.filter((b) => b.type === "timeline_item");

  return (
    <section className="section" id="parcours">
      <div className="wrap">
        <SectionHead kicker={section.kicker} heading={section.heading} intro={section.intro} />

        <div className="timeline">
          {items.map((item) => {
            const year = item.content.year as string;
            const title = item.content.title as string;
            const text = item.content.text as string;
            const hot = Boolean(item.content.hot);
            const badge = item.content.badge as string | undefined;
            const bullets = (item.content.bullets as string[] | undefined) ?? [];
            return (
              <div className={`tl-item reveal ${hot ? "hot" : ""}`} key={item.id}>
                {badge && <span className="badge">{badge}</span>}
                <div className="tl-year">- {year}</div>
                <h3>{title}</h3>
                <p>{text}</p>
                {bullets.length > 0 && (
                  <ul>
                    {bullets.map((bullet, i) => (
                      <li key={i}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
