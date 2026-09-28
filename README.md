# Portfolio Template - candidature en une page

Site de candidature en une page, entièrement piloté par un admin : Next.js (App Router, TS) +
Supabase (contenu, formulaire de contact, compteur de vues, stockage d'images) + déploiement
Vercel. Thème clair/sombre, animations, glisser-déposer, tout inclus.

## Contenu

Tout le texte et les images du site vivent dans Supabase (tables `sections` / `blocks` /
`site_settings`), pas dans le code. Deux façons de les modifier :

- **Depuis l'admin** (`/admin`, voir plus bas) : glisser-déposer pour réordonner, formulaires
  pour éditer le texte, upload d'image par bloc. C'est le chemin normal une fois le site en ligne.
- **Avant la première mise en ligne** : édite directement [`supabase/seed.sql`](supabase/seed.sql)
  avec tes vraies infos avant de l'exécuter, pour ne pas avoir à tout retaper depuis l'admin.

## Mise en route locale

```bash
npm install
cp .env.local.example .env.local   # puis renseigne tes clés Supabase
npm run dev
```

## Supabase

1. Crée un projet sur [supabase.com](https://supabase.com).
2. SQL Editor → exécute [`supabase/schema.sql`](supabase/schema.sql) (tables `site_settings`,
   `sections`, `blocks`, `contact_messages`, `page_views` + policies RLS + bucket de stockage
   `media`). Lecture publique du contenu, écriture réservée aux utilisateurs connectés.
3. SQL Editor → exécute [`supabase/seed.sql`](supabase/seed.sql) pour peupler le contenu de
   départ (des placeholders entre crochets `[...]` à remplacer ensuite).
4. Authentication → Users → **Add user** : crée ton unique compte admin (email + mot de passe,
   coche "Auto Confirm User"). Il n'y a pas d'inscription publique - c'est le seul moyen de créer
   ce compte.
5. Project Settings → API : copie l'URL du projet et la clé `anon public` dans `.env.local`
   (voir `.env.local.example`).

## Espace admin

`/admin/login` - connecte-toi avec le compte créé à l'étape 4. Depuis `/admin` tu peux :

- réordonner les sections et, à l'intérieur de chacune, les éléments (étapes de parcours,
  projets, ...) par glisser-déposer ;
- éditer le texte de chaque bloc, en ajouter ou en supprimer ;
- uploader les images (photo de profil, captures de projets, ...) - stockées dans le bucket
  Supabase Storage `media` ;
- masquer une section sans la supprimer (case « Visible ») - utile par exemple pour la section
  "avant / après", pensée pour un projet de rénovation mais optionnelle.

`/admin/settings` - infos globales réutilisées partout sur le site (nom, contact, CV, lettre de
motivation, réseaux, date de naissance pour l'âge affiché).

Les messages du formulaire de contact et les stats de vues ne sont pas dans l'admin
(volontairement, pour rester simple) : consulte-les dans Table Editor / SQL Editor du dashboard
Supabase (tables `contact_messages`, `page_views`).

## Déploiement Vercel

1. Pousse le repo sur GitHub.
2. Importe-le sur [vercel.com/new](https://vercel.com/new).
3. Renseigne `NEXT_PUBLIC_SUPABASE_URL` et `NEXT_PUBLIC_SUPABASE_ANON_KEY` dans Project
   Settings → Environment Variables (mêmes valeurs que `.env.local`).
4. Déploie. Une fois l'URL définitive connue, mets-la à jour dans `siteUrl`
   (`src/app/layout.tsx`) pour que les meta Open Graph pointent au bon endroit.

## Stack

- [Next.js 16](https://nextjs.org) (App Router, TypeScript, Turbopack)
- [Supabase](https://supabase.com) (Postgres + Auth + Storage, `@supabase/ssr` pour les sessions)
- [dnd-kit](https://dndkit.com) (glisser-déposer dans l'admin)
- [Vercel](https://vercel.com) (hébergement)
