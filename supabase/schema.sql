-- À exécuter dans Supabase → SQL Editor sur un projet neuf (dans l'ordre : ce
-- fichier, puis supabase/seed.sql).

-- ============================================================
-- CONTENU DU SITE (piloté par l'admin)
-- ============================================================

-- Réglages globaux (identité, contact) réutilisés partout sur le site.
create table if not exists public.site_settings (
  id smallint primary key default 1 check (id = 1),
  profile jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);
insert into public.site_settings (id, profile)
values (1, '{}'::jsonb)
on conflict (id) do nothing;

-- Une ligne par section de la page (Hero, Parcours, Réalisations, ...).
-- `order_index` pilote l'ordre d'affichage, `visible` permet de masquer une
-- section sans la supprimer.
create table if not exists public.sections (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  order_index integer not null,
  visible boolean not null default true,
  kicker text,
  heading text,
  intro text,
  extra jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

-- Les éléments répétables à l'intérieur d'une section (une étape de
-- parcours, un projet, une pièce rénovée, une compétence, ...). `content`
-- porte les champs propres à `type`, `images` porte 0..n images
-- ({key, label, url}).
create table if not exists public.blocks (
  id uuid primary key default gen_random_uuid(),
  section_id uuid not null references public.sections(id) on delete cascade,
  type text not null,
  order_index integer not null,
  content jsonb not null default '{}'::jsonb,
  images jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now()
);

create index if not exists blocks_section_id_idx on public.blocks (section_id, order_index);

alter table public.site_settings enable row level security;
alter table public.sections enable row level security;
alter table public.blocks enable row level security;

-- Lecture publique (le site doit pouvoir afficher le contenu sans être connecté).
create policy "site_settings_select_public" on public.site_settings
  for select to anon, authenticated using (true);
create policy "sections_select_public" on public.sections
  for select to anon, authenticated using (true);
create policy "blocks_select_public" on public.blocks
  for select to anon, authenticated using (true);

-- Écriture réservée aux utilisateurs connectés (l'unique compte admin, créé
-- manuellement dans Authentication → Users, aucune inscription publique).
create policy "site_settings_write_admin" on public.site_settings
  for all to authenticated using (true) with check (true);
create policy "sections_write_admin" on public.sections
  for all to authenticated using (true) with check (true);
create policy "blocks_write_admin" on public.blocks
  for all to authenticated using (true) with check (true);

-- ============================================================
-- STOCKAGE DES IMAGES
-- ============================================================

insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

create policy "media_public_read" on storage.objects
  for select to anon, authenticated using (bucket_id = 'media');
create policy "media_admin_insert" on storage.objects
  for insert to authenticated with check (bucket_id = 'media');
create policy "media_admin_update" on storage.objects
  for update to authenticated using (bucket_id = 'media');
create policy "media_admin_delete" on storage.objects
  for delete to authenticated using (bucket_id = 'media');

-- ============================================================
-- FORMULAIRE DE CONTACT + COMPTEUR DE VUES (dépôt uniquement, jamais lus
-- via l'API publique - consulte-les dans Table Editor / SQL Editor)
-- ============================================================

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now(),
  read boolean not null default false
);
alter table public.contact_messages enable row level security;
create policy "contact_messages_insert_anon" on public.contact_messages
  for insert to anon with check (true);
create policy "contact_messages_select_admin" on public.contact_messages
  for select to authenticated using (true);

create table if not exists public.page_views (
  id bigint generated always as identity primary key,
  path text not null,
  referrer text,
  created_at timestamptz not null default now()
);
alter table public.page_views enable row level security;
create policy "page_views_insert_anon" on public.page_views
  for insert to anon with check (true);
create policy "page_views_select_admin" on public.page_views
  for select to authenticated using (true);
