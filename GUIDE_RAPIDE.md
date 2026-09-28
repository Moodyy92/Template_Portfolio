# Guide rapide - mets ton site en ligne en 15 minutes

Suis ces étapes dans l'ordre. Ne saute rien, chaque étape dépend de la précédente.

## 1. Installer le projet sur ton ordinateur

Il te faut [Node.js](https://nodejs.org) installé. Puis, dans le dossier du projet :

```bash
npm install
```

## 2. Créer ton compte Supabase (la base de données)

1. Va sur [supabase.com](https://supabase.com) → connexion/inscription (gratuit)
2. **"New Project"** → donne-lui un nom, choisis un mot de passe pour la base (note-le
   quelque part), région **Europe**, plan **Free**
3. Attends 1-2 minutes que le projet soit prêt

## 3. Créer les tables et le contenu de départ

1. Dans ton projet Supabase, clique sur **"SQL Editor"** dans la barre de gauche
2. Clique **"New query"**
3. Ouvre le fichier `supabase/schema.sql` de ce projet, copie tout son contenu, colle-le dans
   l'éditeur, clique **"Run"**
4. Refais pareil avec une nouvelle requête pour `supabase/seed.sql` (ça crée un contenu de départ
   avec des textes entre crochets `[...]` que tu remplaceras plus tard)

## 4. Créer ton compte pour te connecter à l'administration du site

1. Barre de gauche → **"Authentication"** → onglet **"Users"**
2. **"Add user"** → **"Create new user"**
3. Renseigne ton email et un mot de passe → **coche "Auto Confirm User"** (important, sinon la
   connexion ne marchera pas) → **"Create user"**

## 5. Récupérer tes clés Supabase

1. Icône engrenage **"Project Settings"** → **"API"**
2. Copie la **"Project URL"** (ressemble à `https://xxxxx.supabase.co`)
3. Copie la clé **"anon public"** (longue chaîne qui commence par `eyJ...`)
4. À la racine du projet, copie le fichier `.env.local.example` en `.env.local`, et colle tes
   deux valeurs dedans

## 6. Tester en local

```bash
npm run dev
```

Ouvre `http://localhost:3000` : ton site doit s'afficher avec le contenu de départ. Va ensuite
sur `http://localhost:3000/admin/login` et connecte-toi avec le compte créé à l'étape 4 - c'est
ici que tu remplaces tout le texte, ajoutes tes photos, réorganises les blocs, etc.

## 7. Mettre le code sur GitHub

1. Crée un nouveau dépôt (repo) sur [github.com](https://github.com/new)
2. Dans le dossier du projet :

```bash
git init
git add .
git commit -m "Premier commit"
git branch -M main
git remote add origin https://github.com/TON-PSEUDO/TON-DEPOT.git
git push -u origin main
```

## 8. Déployer sur Vercel (mettre le site en ligne, gratuit)

1. Va sur [vercel.com](https://vercel.com) → connecte-toi avec ton compte GitHub
2. **"Add New" → "Project"** → choisis ton dépôt
3. Avant de cliquer sur "Deploy", déplie **"Environment Variables"** et ajoute les deux mêmes
   variables que dans ton `.env.local` :
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Clique **"Deploy"** - en 1-2 minutes ton site est en ligne sur une adresse `xxxxx.vercel.app`

## 9. (Optionnel) Utiliser ton propre nom de domaine

Si tu as acheté un nom de domaine (OVH, Namecheap, etc.) :

1. Dans ton projet Vercel → **"Settings" → "Domains"** → tape ton domaine → **"Add"**
2. Vercel t'affiche les enregistrements DNS à créer (en général un **A** vers `76.76.21.21` pour
   le domaine nu, et un **CNAME** vers `cname.vercel-dns.com.` pour `www`)
3. Va dans la gestion DNS de ton fournisseur de domaine, supprime les enregistrements existants
   qui utilisent les mêmes noms (`@` et `www`), puis ajoute ceux donnés par Vercel
4. Patiente quelques minutes à quelques heures le temps que ça se propage

## Et après ?

Tout le texte, les images, l'ordre des sections se modifient depuis `/admin` - plus besoin de
toucher au code. Le fichier `README.md` donne plus de détails techniques si besoin.
