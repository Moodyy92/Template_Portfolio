export type ImageEntry = { key: string; label: string; url: string | null };

export type Section = {
  id: string;
  slug: string;
  order_index: number;
  visible: boolean;
  kicker: string | null;
  heading: string | null;
  intro: string | null;
  extra: Record<string, unknown>;
};

export type Block = {
  id: string;
  section_id: string;
  type: string;
  order_index: number;
  content: Record<string, unknown>;
  images: ImageEntry[];
};

export type SectionWithBlocks = Section & { blocks: Block[] };

export type Profile = {
  name: string;
  targetRole: string;
  department: string;
  location: string;
  email: string;
  phone: string;
  cvUrl: string;
  cvFileName: string;
  lmUrl: string;
  lmFileName: string;
  linkedinUrl: string;
  githubUrl: string;
  birthDate: string;
  hasLicenseB: boolean;
};

export const emptyProfile: Profile = {
  name: "",
  targetRole: "",
  department: "",
  location: "",
  email: "",
  phone: "",
  cvUrl: "/cv.pdf",
  cvFileName: "CV.pdf",
  lmUrl: "/lettre-motivation.pdf",
  lmFileName: "Lettre de motivation.pdf",
  linkedinUrl: "",
  githubUrl: "",
  birthDate: "",
  hasLicenseB: false,
};

// Types de blocs connus par l'admin (formulaire + validation légère).
export const BLOCK_TYPES = [
  "hero_portrait",
  "match_row",
  "timeline_item",
  "stat",
  "project",
  "testimonial",
  "renovation_room",
  "skill_column",
] as const;
export type BlockType = (typeof BLOCK_TYPES)[number];
