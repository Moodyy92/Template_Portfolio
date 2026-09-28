import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    body = {};
  }

  const { path, referrer } = (body ?? {}) as Record<string, unknown>;

  const { error } = await getSupabase().from("page_views").insert({
    path: typeof path === "string" ? path.slice(0, 500) : "/",
    referrer: typeof referrer === "string" ? referrer.slice(0, 500) : null,
  });

  if (error) {
    // best-effort : on ne bloque jamais l'affichage du site pour un compteur
    return NextResponse.json({ ok: false }, { status: 200 });
  }

  return NextResponse.json({ ok: true });
}
