-- Remplace le tiret cadratin (—) par un tiret simple (-) dans tout le
-- contenu déjà en base. Sans effet si tu n'en as pas (idempotent).
-- À exécuter une fois dans Supabase → SQL Editor.

update public.sections
set
  kicker = replace(kicker, '—', '-'),
  heading = replace(heading, '—', '-'),
  intro = replace(intro, '—', '-'),
  extra = replace(extra::text, '—', '-')::jsonb;

update public.blocks
set content = replace(content::text, '—', '-')::jsonb;
