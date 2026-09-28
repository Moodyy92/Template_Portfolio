import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON invalide" }, { status: 400 });
  }

  const { name, email, message } = (body ?? {}) as Record<string, unknown>;

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof message !== "string" ||
    !name.trim() ||
    !message.trim() ||
    !EMAIL_RE.test(email)
  ) {
    return NextResponse.json({ error: "Champs invalides" }, { status: 400 });
  }

  const { error } = await getSupabase().from("contact_messages").insert({
    name: name.trim().slice(0, 200),
    email: email.trim().slice(0, 200),
    message: message.trim().slice(0, 5000),
  });

  if (error) {
    return NextResponse.json({ error: "Échec de l'enregistrement" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
