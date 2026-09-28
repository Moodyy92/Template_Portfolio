import type { ComponentType } from "react";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Match } from "@/components/Match";
import { Timeline } from "@/components/Timeline";
import { Projects } from "@/components/Projects";
import { Renovation } from "@/components/Renovation";
import { Skills } from "@/components/Skills";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { getSiteData } from "@/lib/site-data";
import type { Profile, SectionWithBlocks } from "@/lib/types";

// Le contenu vient de Supabase et peut changer depuis l'admin à tout moment :
// pas de mise en cache statique de cette page.
export const dynamic = "force-dynamic";

type SectionProps = { section: SectionWithBlocks; profile: Profile };

const sectionComponents: Record<string, ComponentType<SectionProps>> = {
  hero: Hero,
  match: Match,
  parcours: Timeline,
  realisations: Projects,
  maison: Renovation,
  competences: Skills,
  contact: Contact,
};

export default async function Home() {
  const { profile, sections } = await getSiteData();

  return (
    <>
      <Nav profile={profile} />
      {sections
        .filter((section) => section.visible)
        .map((section) => {
          const SectionComponent = sectionComponents[section.slug];
          if (!SectionComponent) return null;
          return <SectionComponent key={section.id} section={section} profile={profile} />;
        })}
      <Footer profile={profile} />
    </>
  );
}
