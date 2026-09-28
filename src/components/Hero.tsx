import type { Profile, SectionWithBlocks } from "@/lib/types";
import { calculateAge } from "@/lib/age";
import { PlaceholderBox } from "./PlaceholderBox";
import { ZoomableImage } from "./ZoomableImage";

export function Hero({ section, profile }: { section: SectionWithBlocks; profile: Profile }) {
  const titleLines = (section.extra?.titleLines as string[] | undefined) ?? [];
  const accentIndex = (section.extra?.accentIndex as number | undefined) ?? titleLines.length - 1;
  const portrait = section.blocks.find((b) => b.type === "hero_portrait");
  const portraitUrl = portrait?.images?.[0]?.url ?? null;
  const age = profile.birthDate ? calculateAge(profile.birthDate) : null;

  return (
    <header className="hero">
      <div className="hero-blob hero-blob-a" aria-hidden="true" />
      <div className="hero-blob hero-blob-b" aria-hidden="true" />
      <div className="hero-blob hero-blob-c" aria-hidden="true" />
      <div className="wrap hero-grid">
        <div className="reveal in">
          <span className="kicker">{section.kicker}</span>
          <h1 className="hero-title">
            {titleLines.map((line, i) => (
              <span className="line-mask" key={i}>
                <span
                  className={`line-inner ${i === accentIndex ? "accent" : ""}`}
                  style={{ animationDelay: `${1.5 + i * 0.16}s` }}
                >
                  {line}
                </span>
              </span>
            ))}
          </h1>
          <p className="lede">{section.intro}</p>
          {section.extra?.footnote ? (
            <p className="hero-footnote">{section.extra.footnote as string}</p>
          ) : null}
          <div className="chips">
            <span className="chip">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M12 21s-7-6.1-7-11a7 7 0 1 1 14 0c0 4.9-7 11-7 11z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
              {profile.location}
            </span>
            {age !== null && (
              <span className="chip">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 3" />
                </svg>
                {age} ans
              </span>
            )}
            {profile.hasLicenseB && (
              <span className="chip">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <rect x="3" y="6" width="18" height="12" rx="2" />
                  <path d="M3 10h18" />
                </svg>
                Permis B
              </span>
            )}
            <span className="chip">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m3 7 9 6 9-6" />
              </svg>
              {profile.email}
            </span>
            <span className="chip">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
              </svg>
              {profile.phone}
            </span>
            {profile.linkedinUrl && (
              <a
                className="chip"
                href={profile.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <rect x="3" y="3" width="18" height="18" rx="3" />
                  <path d="M8 11v5M8 8v.01M12 16v-3a2 2 0 0 1 4 0v3M12 13v3" />
                </svg>
                LinkedIn
              </a>
            )}
            {profile.githubUrl && (
              <a
                className="chip"
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
                  <path d="M12 2a10 10 0 0 0-3.16 19.5c.5.1.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.15-1.11-1.46-1.11-1.46-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.91-1.3 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2z" />
                </svg>
                GitHub
              </a>
            )}
          </div>
          <div className="cta-row">
            <a className="btn btn-primary" href={profile.cvUrl} download={profile.cvFileName}>
              Télécharger mon CV
            </a>
            <a className="btn btn-ghost" href={profile.lmUrl} download={profile.lmFileName}>
              Télécharger ma lettre de motivation
            </a>
            <a className="btn btn-ghost" href="#parcours">
              Découvrir mon parcours
            </a>
          </div>
        </div>
        <div className="portrait reveal in">
          {portraitUrl ? (
            <ZoomableImage
              src={portraitUrl}
              alt="Photo de profil"
              fill
              style={{ objectFit: "cover" }}
            />
          ) : (
            <PlaceholderBox
              label="Photo de profil"
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
                  <path d="M4 20a8 8 0 0 1 16 0" />
                  <circle cx="12" cy="8" r="4" />
                </svg>
              }
            />
          )}
        </div>
      </div>
    </header>
  );
}
