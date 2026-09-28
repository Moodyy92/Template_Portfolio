"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { BlockType, ImageEntry, Profile } from "@/lib/types";

async function requireUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Non authentifié");
  return supabase;
}

function refresh() {
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function signOutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/admin");
}

export async function reorderSections(orderedIds: string[]) {
  const supabase = await requireUser();
  await Promise.all(
    orderedIds.map((id, index) =>
      supabase.from("sections").update({ order_index: index }).eq("id", id)
    )
  );
  refresh();
}

export async function reorderBlocks(orderedIds: string[]) {
  const supabase = await requireUser();
  await Promise.all(
    orderedIds.map((id, index) =>
      supabase.from("blocks").update({ order_index: index }).eq("id", id)
    )
  );
  refresh();
}

export async function updateSection(
  sectionId: string,
  fields: { kicker?: string | null; heading?: string | null; intro?: string | null; extra?: Record<string, unknown>; visible?: boolean }
) {
  const supabase = await requireUser();
  const { error } = await supabase.from("sections").update(fields).eq("id", sectionId);
  if (error) throw new Error(error.message);
  refresh();
}

export async function updateBlock(
  blockId: string,
  fields: { content?: Record<string, unknown>; images?: ImageEntry[] }
) {
  const supabase = await requireUser();
  const { error } = await supabase.from("blocks").update(fields).eq("id", blockId);
  if (error) throw new Error(error.message);
  refresh();
}

export async function createBlock(
  sectionId: string,
  type: BlockType,
  content: Record<string, unknown>,
  images: ImageEntry[]
) {
  const supabase = await requireUser();
  const { count } = await supabase
    .from("blocks")
    .select("id", { count: "exact", head: true })
    .eq("section_id", sectionId);

  const { error } = await supabase.from("blocks").insert({
    section_id: sectionId,
    type,
    order_index: count ?? 0,
    content,
    images,
  });
  if (error) throw new Error(error.message);
  refresh();
}

export async function deleteBlock(blockId: string) {
  const supabase = await requireUser();
  const { error } = await supabase.from("blocks").delete().eq("id", blockId);
  if (error) throw new Error(error.message);
  refresh();
}

export async function updateProfile(profile: Profile) {
  const supabase = await requireUser();
  const { error } = await supabase
    .from("site_settings")
    .update({ profile })
    .eq("id", 1);
  if (error) throw new Error(error.message);
  refresh();
}
