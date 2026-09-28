import type { BlockType, ImageEntry } from "@/lib/types";

export type FieldDef =
  | { key: string; label: string; kind: "text" }
  | { key: string; label: string; kind: "textarea" }
  | { key: string; label: string; kind: "checkbox" }
  | { key: string; label: string; kind: "list" } // textarea, une valeur par ligne -> string[]
  | { key: string; label: string; kind: "tags" } // texte, séparé par des virgules -> string[]
  | { key: string; label: string; kind: "select"; options: { value: string; label: string }[] };

export const BLOCK_FIELDS: Record<BlockType, FieldDef[]> = {
  hero_portrait: [],
  match_row: [
    { key: "ask", label: "Ce que l'offre demande", kind: "textarea" },
    { key: "have", label: "Ce que j'ai déjà fait", kind: "textarea" },
  ],
  timeline_item: [
    { key: "year", label: "Année(s)", kind: "text" },
    { key: "title", label: "Titre", kind: "text" },
    { key: "text", label: "Texte", kind: "textarea" },
    { key: "hot", label: "Mettre en avant (encadré doré)", kind: "checkbox" },
    { key: "badge", label: "Badge (si mis en avant)", kind: "text" },
    { key: "bullets", label: "Points clés (un par ligne)", kind: "list" },
  ],
  stat: [
    { key: "value", label: "Valeur", kind: "text" },
    { key: "label", label: "Libellé", kind: "text" },
  ],
  project: [
    { key: "tag", label: "Catégorie", kind: "text" },
    { key: "title", label: "Titre", kind: "text" },
    { key: "text", label: "Description", kind: "textarea" },
    { key: "tags", label: "Tags (séparés par une virgule)", kind: "tags" },
    { key: "linkLabel", label: "Texte du lien", kind: "text" },
    { key: "linkUrl", label: "URL du lien", kind: "text" },
  ],
  testimonial: [
    { key: "quote", label: "Citation", kind: "textarea" },
    { key: "author", label: "Auteur", kind: "text" },
  ],
  renovation_room: [{ key: "title", label: "Nom de la pièce", kind: "text" }],
  skill_column: [
    { key: "heading", label: "Titre de la colonne", kind: "text" },
    {
      key: "icon",
      label: "Icône",
      kind: "select",
      options: [
        { value: "code", label: "Numérique" },
        { value: "tool", label: "Terrain" },
        { value: "people", label: "Humain" },
      ],
    },
    { key: "items", label: "Compétences (une par ligne)", kind: "list" },
  ],
};

export type AddableBlock = {
  type: BlockType;
  label: string;
  defaultContent: Record<string, unknown>;
  defaultImages: ImageEntry[];
};

// Types de blocs qu'on peut créer dans chaque section (l'admin n'est pas un
// page-builder générique : chaque section garde une forme fixe).
export const SECTION_ADDABLE_BLOCKS: Record<string, AddableBlock[]> = {
  match: [
    {
      type: "match_row",
      label: "Comparaison offre / profil",
      defaultContent: { ask: "", have: "" },
      defaultImages: [],
    },
  ],
  parcours: [
    {
      type: "timeline_item",
      label: "Étape du parcours",
      defaultContent: { year: "", title: "", text: "", hot: false, badge: "", bullets: [] },
      defaultImages: [],
    },
  ],
  realisations: [
    {
      type: "stat",
      label: "Chiffre clé",
      defaultContent: { label: "", value: "" },
      defaultImages: [],
    },
    {
      type: "project",
      label: "Projet",
      defaultContent: { tag: "", title: "", text: "", tags: [], linkLabel: "Voir le code", linkUrl: "" },
      defaultImages: [{ key: "main", label: "Capture", url: null }],
    },
    {
      type: "testimonial",
      label: "Témoignage",
      defaultContent: { quote: "", author: "" },
      defaultImages: [],
    },
  ],
  maison: [
    {
      type: "renovation_room",
      label: "Pièce rénovée",
      defaultContent: { title: "" },
      defaultImages: [
        { key: "avant", label: "Avant", url: null },
        { key: "apres", label: "Après", url: null },
      ],
    },
  ],
  competences: [
    {
      type: "skill_column",
      label: "Colonne de compétences",
      defaultContent: { heading: "", icon: "code", items: [] },
      defaultImages: [],
    },
  ],
};

export const SECTION_LABELS: Record<string, string> = {
  hero: "En-tête (Hero)",
  match: "Pourquoi ce poste",
  parcours: "Parcours",
  realisations: "Réalisations",
  maison: "La maison",
  competences: "Compétences",
  contact: "Contact",
};
