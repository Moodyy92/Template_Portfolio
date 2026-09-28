-- Données de départ GÉNÉRIQUES pour le template public (aucune information
-- personnelle). À exécuter après schema.sql sur un projet Supabase neuf.
-- Tout ce texte est à remplacer depuis /admin une fois le site en ligne.

-- ---------- réglages globaux ----------
update public.site_settings
set profile = $j${
  "name": "Prénom Nom",
  "targetRole": "Le poste que tu vises",
  "department": "Ta région",
  "location": "Ta ville (CP)",
  "email": "ton.email@exemple.fr",
  "phone": "06 XX XX XX XX",
  "cvUrl": "/cv.pdf",
  "cvFileName": "CV.pdf",
  "lmUrl": "/lettre-motivation.pdf",
  "lmFileName": "Lettre de motivation.pdf",
  "linkedinUrl": "",
  "githubUrl": "",
  "birthDate": "",
  "hasLicenseB": true
}$j$::jsonb
where id = 1;

-- ---------- sections ----------
insert into public.sections (id, slug, order_index, kicker, heading, intro, extra) values
('00000000-0000-0000-0000-000000000001', 'hero', 0,
  $t$Candidature - [Intitulé du poste] · [Ville / région]$t$,
  null,
  $t$Décris ici en 2-3 phrases qui tu es, ce que tu as accompli, et pourquoi tu candidates précisément à ce poste.$t$,
  $j${"titleLines": ["Je construis des choses,", "et j'aide les gens", "à s'en servir."], "accentIndex": 2}$j$::jsonb
),
('00000000-0000-0000-0000-000000000002', 'match', 1,
  $t$Pourquoi ce poste, pourquoi moi$t$,
  $t$Ce poste, je l'ai déjà vécu - autrement$t$,
  $t$Reprends ici les mots-clés de l'offre à laquelle tu réponds, et annonce que tu vas montrer point par point ton adéquation.$t$,
  $j${"note": "Résume ici en une phrase forte pourquoi tu es exactement fait pour ce poste."}$j$::jsonb
),
('00000000-0000-0000-0000-000000000003', 'parcours', 2,
  $t$Mon parcours$t$,
  $t$Un chemin qui converge vers ce poste$t$,
  $t$Présente ton parcours en quelques grandes étapes, dans l'ordre chronologique.$t$,
  '{}'::jsonb
),
('00000000-0000-0000-0000-000000000004', 'realisations', 3,
  $t$Mes réalisations$t$,
  $t$Ce que j'ai construit$t$,
  $t$Présente 3-4 projets concrets, avec si possible des liens et des captures.$t$,
  '{}'::jsonb
),
('00000000-0000-0000-0000-000000000005', 'maison', 4,
  $t$La preuve par le concret$t$,
  $t$Un avant / après qui parle de lui-même$t$,
  $t$Section optionnelle : idéale pour un projet de rénovation, une transformation, ou tout résultat qui se montre en photos. Masque-la (case "Visible" dans l'admin) si elle ne s'applique pas à toi.$t$,
  '{}'::jsonb
),
('00000000-0000-0000-0000-000000000006', 'competences', 5,
  $t$Compétences$t$,
  $t$Trois familles de savoir-faire$t$,
  null,
  '{}'::jsonb
),
('00000000-0000-0000-0000-000000000007', 'contact', 6,
  null,
  $t$Travaillons ensemble$t$,
  $t$Explique en une phrase ce que tu recherches et pourquoi on devrait te contacter. Écris-moi directement depuis ce formulaire.$t$,
  '{}'::jsonb
)
on conflict (id) do nothing;

-- ---------- hero : photo de profil ----------
insert into public.blocks (section_id, type, order_index, content, images) values
('00000000-0000-0000-0000-000000000001', 'hero_portrait', 0, '{}'::jsonb, '[{"key":"portrait","label":"Photo de profil","url":null}]'::jsonb);

-- ---------- match : offre vs profil ----------
insert into public.blocks (section_id, type, order_index, content) values
('00000000-0000-0000-0000-000000000002', 'match_row', 0, $j${
  "ask": "[Ce que l'offre demande - compétence ou exigence n°1]",
  "have": "[Ce que tu as déjà fait qui y répond concrètement]"
}$j$::jsonb),
('00000000-0000-0000-0000-000000000002', 'match_row', 1, $j${
  "ask": "[Ce que l'offre demande - compétence ou exigence n°2]",
  "have": "[Ce que tu as déjà fait qui y répond concrètement]"
}$j$::jsonb),
('00000000-0000-0000-0000-000000000002', 'match_row', 2, $j${
  "ask": "[Ce que l'offre demande - compétence ou exigence n°3]",
  "have": "[Ce que tu as déjà fait qui y répond concrètement]"
}$j$::jsonb),
('00000000-0000-0000-0000-000000000002', 'match_row', 3, $j${
  "ask": "[Ce que l'offre demande - compétence ou exigence n°4]",
  "have": "[Ce que tu as déjà fait qui y répond concrètement]"
}$j$::jsonb);

-- ---------- parcours : timeline ----------
insert into public.blocks (section_id, type, order_index, content) values
('00000000-0000-0000-0000-000000000003', 'timeline_item', 0, $j${
  "year": "20XX - 20XX", "title": "[Ta première expérience marquante]",
  "text": "[Ce que tu y as appris, en 2-3 phrases.]",
  "hot": false
}$j$::jsonb),
('00000000-0000-0000-0000-000000000003', 'timeline_item', 1, $j${
  "year": "20XX - 20XX", "title": "[Une étape de transition ou de formation]",
  "text": "[Ce qui a changé, et pourquoi.]",
  "hot": false
}$j$::jsonb),
('00000000-0000-0000-0000-000000000003', 'timeline_item', 2, $j${
  "year": "20XX - aujourd'hui", "title": "[Ton projet personnel ou professionnel le plus marquant]",
  "text": "[Pourquoi ce projet démontre exactement les compétences recherchées pour le poste.]",
  "hot": true,
  "badge": "[Ce qui rend ce projet remarquable]",
  "bullets": [
    "[Résultat concret n°1]",
    "[Résultat concret n°2]"
  ]
}$j$::jsonb),
('00000000-0000-0000-0000-000000000003', 'timeline_item', 3, $j${
  "year": "Aujourd'hui", "title": "Prêt à mettre tout ça au service de [l'entreprise / l'organisation]",
  "text": "[Explique ce que tu recherches maintenant et pourquoi ce poste précis a du sens pour toi.]",
  "hot": false
}$j$::jsonb);

-- ---------- réalisations : chiffres, projets, témoignages ----------
insert into public.blocks (section_id, type, order_index, content) values
('00000000-0000-0000-0000-000000000004', 'stat', 0, '{"label": "[Indicateur clé n°1]", "value": "[Chiffre]"}'::jsonb),
('00000000-0000-0000-0000-000000000004', 'stat', 1, '{"label": "[Indicateur clé n°2]", "value": "[Chiffre]"}'::jsonb),
('00000000-0000-0000-0000-000000000004', 'stat', 2, '{"label": "[Indicateur clé n°3]", "value": "[Chiffre]"}'::jsonb);

insert into public.blocks (section_id, type, order_index, content, images) values
('00000000-0000-0000-0000-000000000004', 'project', 3, $j${
  "tag": "[Catégorie]", "title": "[Nom du projet n°1]",
  "text": "[Description courte : ce que c'est, ce que tu y as fait.]",
  "tags": ["Tag 1", "Tag 2"],
  "linkLabel": "Voir le projet", "linkUrl": null
}$j$::jsonb, '[{"key":"main","label":"Capture du projet","url":null}]'::jsonb),
('00000000-0000-0000-0000-000000000004', 'project', 4, $j${
  "tag": "[Catégorie]", "title": "[Nom du projet n°2]",
  "text": "[Description courte : ce que c'est, ce que tu y as fait.]",
  "tags": ["Tag 1", "Tag 2"],
  "linkLabel": "Voir le projet", "linkUrl": null
}$j$::jsonb, '[{"key":"main","label":"Capture du projet","url":null}]'::jsonb),
('00000000-0000-0000-0000-000000000004', 'project', 5, $j${
  "tag": "[Catégorie]", "title": "[Nom du projet n°3]",
  "text": "[Description courte : ce que c'est, ce que tu y as fait.]",
  "tags": ["Tag 1", "Tag 2"],
  "linkLabel": "Voir le projet", "linkUrl": null
}$j$::jsonb, '[{"key":"main","label":"Capture du projet","url":null}]'::jsonb);

insert into public.blocks (section_id, type, order_index, content) values
('00000000-0000-0000-0000-000000000004', 'testimonial', 6, $j${
  "quote": "[Témoignage court d'une personne qui a travaillé avec toi.]",
  "author": "[Nom / rôle de la personne]"
}$j$::jsonb),
('00000000-0000-0000-0000-000000000004', 'testimonial', 7, $j${
  "quote": "[Un deuxième témoignage, idéalement sur un aspect différent.]",
  "author": "[Nom / rôle de la personne]"
}$j$::jsonb);

-- ---------- maison : avant / après ----------
insert into public.blocks (section_id, type, order_index, content, images) values
('00000000-0000-0000-0000-000000000005', 'renovation_room', 0, '{"title": "[Nom de l''élément n°1]"}'::jsonb,
  '[{"key":"avant","label":"Avant","url":null},{"key":"apres","label":"Après","url":null}]'::jsonb),
('00000000-0000-0000-0000-000000000005', 'renovation_room', 1, '{"title": "[Nom de l''élément n°2]"}'::jsonb,
  '[{"key":"avant","label":"Avant","url":null},{"key":"apres","label":"Après","url":null}]'::jsonb);

-- ---------- compétences ----------
insert into public.blocks (section_id, type, order_index, content) values
('00000000-0000-0000-0000-000000000006', 'skill_column', 0, $j${
  "heading": "[Catégorie 1]", "icon": "code",
  "items": ["[Compétence]", "[Compétence]", "[Compétence]", "[Compétence]"]
}$j$::jsonb),
('00000000-0000-0000-0000-000000000006', 'skill_column', 1, $j${
  "heading": "[Catégorie 2]", "icon": "tool",
  "items": ["[Compétence]", "[Compétence]", "[Compétence]", "[Compétence]"]
}$j$::jsonb),
('00000000-0000-0000-0000-000000000006', 'skill_column', 2, $j${
  "heading": "[Catégorie 3]", "icon": "people",
  "items": ["[Compétence]", "[Compétence]", "[Compétence]", "[Compétence]"]
}$j$::jsonb);
