import type { SectionWithBlocks } from "@/lib/types";
import { PlaceholderBox } from "./PlaceholderBox";
import { SectionHead } from "./SectionHead";
import { StatValue } from "./StatValue";
import { ZoomableImage } from "./ZoomableImage";

const icons = [
  <svg key="site" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <path d="M3 9h18" />
  </svg>,
  <svg key="desktop" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
    <rect x="2" y="4" width="20" height="14" rx="2" />
    <path d="M8 20h8M12 18v2" />
  </svg>,
  <svg key="web" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
    <path d="M3 6h18v12H3z" />
    <path d="m8 10 3 2-3 2M13 14h3" />
  </svg>,
  <svg key="bot" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
    <rect x="4" y="7" width="16" height="12" rx="3" />
    <circle cx="9" cy="13" r="1.3" />
    <circle cx="15" cy="13" r="1.3" />
    <path d="M12 3v4" />
  </svg>,
];

export function Projects({ section }: { section: SectionWithBlocks }) {
  const stats = section.blocks.filter((b) => b.type === "stat");
  const projects = section.blocks.filter((b) => b.type === "project");
  const testimonials = section.blocks.filter((b) => b.type === "testimonial");

  return (
    <section className="section" id="realisations">
      <div className="wrap">
        <SectionHead kicker={section.kicker} heading={section.heading} intro={section.intro} />

        {stats.length > 0 && (
          <div className="stats reveal">
            {stats.map((stat) => (
              <div className="stat" key={stat.id}>
                <StatValue value={stat.content.value as string} />
                <span>{stat.content.label as string}</span>
              </div>
            ))}
          </div>
        )}

        <div className="projects" style={{ marginTop: 40 }}>
          {projects.map((project, i) => {
            const tag = project.content.tag as string;
            const title = project.content.title as string;
            const text = project.content.text as string;
            const tags = (project.content.tags as string[] | undefined) ?? [];
            const linkLabel = project.content.linkLabel as string | undefined;
            const linkUrl = project.content.linkUrl as string | null | undefined;
            const media = project.images?.[0];

            return (
              <article className={`proj reveal ${i % 2 === 1 ? "even" : ""}`} key={project.id}>
                <div className="proj-media">
                  {media?.url ? (
                    <div style={{ position: "relative", height: "100%", minHeight: 230 }}>
                      <ZoomableImage src={media.url} alt={title} fill style={{ objectFit: "cover" }} />
                    </div>
                  ) : (
                    <PlaceholderBox icon={icons[i % icons.length]} label={media?.label ?? "Capture"} />
                  )}
                </div>
                <div className="proj-body">
                  <div className="proj-tag">{tag}</div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                  <div className="proj-meta">
                    {tags.map((t) => (
                      <span className="tag" key={t}>
                        {t}
                      </span>
                    ))}
                  </div>
                  {linkUrl && (
                    <a className="proj-link" href={linkUrl} target="_blank" rel="noopener noreferrer">
                      {linkLabel} →
                    </a>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        {testimonials.length > 0 && (
          <div className="testimonials">
            {testimonials.map((t) => (
              <blockquote className="testimonial reveal" key={t.id}>
                <p>&ldquo;{t.content.quote as string}&rdquo;</p>
                <footer>{t.content.author as string}</footer>
              </blockquote>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
