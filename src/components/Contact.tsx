import type { Profile, SectionWithBlocks } from "@/lib/types";
import { ContactForm } from "./ContactForm";

export function Contact({ section, profile }: { section: SectionWithBlocks; profile: Profile }) {
  return (
    <section className="section" id="contact">
      <div className="wrap">
        <div className="contact reveal">
          <div className="contact-grid">
            <div>
              <h2 className="mask-heading">
                <span className="mask-heading-inner">{section.heading}</span>
              </h2>
              <p>
                {section.intro} Ou par email à{" "}
                <a href={`mailto:${profile.email}`} style={{ color: "var(--gold)" }}>
                  {profile.email}
                </a>
                .
              </p>
            </div>
            <ContactForm cvUrl={profile.cvUrl} />
          </div>
        </div>
      </div>
    </section>
  );
}
