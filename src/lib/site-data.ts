import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import { emptyProfile, type Block, type Profile, type Section, type SectionWithBlocks } from "@/lib/types";

export type SiteData = {
  profile: Profile;
  sections: SectionWithBlocks[];
};

// cache() déduplique l'appel entre generateMetadata() et la page elle-même
// pour un même rendu serveur.
export const getSiteData = cache(async (): Promise<SiteData> => {
  const supabase = await createClient();

  const [{ data: settings }, { data: sections }, { data: blocks }] = await Promise.all([
    supabase.from("site_settings").select("profile").eq("id", 1).maybeSingle(),
    supabase.from("sections").select("*").order("order_index"),
    supabase.from("blocks").select("*").order("order_index"),
  ]);

  const blocksBySection = new Map<string, Block[]>();
  (blocks ?? []).forEach((raw) => {
    const block = raw as Block;
    const list = blocksBySection.get(block.section_id) ?? [];
    list.push(block);
    blocksBySection.set(block.section_id, list);
  });

  const profile: Profile = {
    ...emptyProfile,
    ...((settings?.profile as Partial<Profile> | undefined) ?? {}),
  };

  return {
    profile,
    sections: ((sections ?? []) as Section[]).map((section) => ({
      ...section,
      blocks: blocksBySection.get(section.id) ?? [],
    })),
  };
});
