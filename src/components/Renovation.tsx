import type { SectionWithBlocks } from "@/lib/types";
import { PlaceholderBox } from "./PlaceholderBox";
import { SectionHead } from "./SectionHead";
import { ZoomableImage } from "./ZoomableImage";

const icons = [
  <svg key="facade" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
    <path d="M3 21h18M5 21V8l7-4 7 4v13" />
  </svg>,
  <svg key="sejour" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
    <rect x="3" y="4" width="18" height="16" rx="1" />
    <path d="M3 14h18" />
  </svg>,
  <svg key="sols" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
    <path d="M4 4h16v16H4z" />
    <path d="M4 12h16M12 4v16" />
  </svg>,
  <svg key="elec" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
    <path d="m13 2-9 12h7l-2 8 9-12h-7z" />
  </svg>,
];

export function Renovation({ section }: { section: SectionWithBlocks }) {
  const rooms = section.blocks.filter((b) => b.type === "renovation_room");

  return (
    <section className="section" id="maison">
      <div className="wrap">
        <SectionHead kicker={section.kicker} heading={section.heading} intro={section.intro} />

        <div className="ba-grid">
          {rooms.map((room, i) => {
            const title = room.content.title as string;
            const avant = room.images?.find((img) => img.key === "avant");
            const apres = room.images?.find((img) => img.key === "apres");
            return (
              <div className="ba reveal" key={room.id}>
                <h3>{title}</h3>
                <div className="ba-pair">
                  <figure className="avant">
                    <figcaption>Avant</figcaption>
                    {avant?.url ? (
                      <div style={{ position: "relative", aspectRatio: "4/3" }}>
                        <ZoomableImage
                          src={avant.url}
                          alt={`${title} - avant`}
                          fill
                          style={{ objectFit: "cover", borderRadius: 14 }}
                        />
                      </div>
                    ) : (
                      <PlaceholderBox icon={icons[i % icons.length]} label='Photo « avant »' />
                    )}
                  </figure>
                  <figure className="apres">
                    <figcaption>Après</figcaption>
                    {apres?.url ? (
                      <div style={{ position: "relative", aspectRatio: "4/3" }}>
                        <ZoomableImage
                          src={apres.url}
                          alt={`${title} - après`}
                          fill
                          style={{ objectFit: "cover", borderRadius: 14 }}
                        />
                      </div>
                    ) : (
                      <PlaceholderBox icon={icons[i % icons.length]} label='Photo « après »' />
                    )}
                  </figure>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
