import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Clé anonyme uniquement : les tables sont protégées par des policies RLS
// insert-only (voir supabase/schema.sql), donc sûr côté client comme serveur.
// Client créé à la demande (pas au chargement du module) pour que le build
// (collecte des routes API) ne casse pas en l'absence de variables d'env.
let client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (!client) {
    client = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
  }
  return client;
}
