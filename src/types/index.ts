/**
 * Shared content types. Every optional field is rendered only when present,
 * so unfilled data never produces an empty heading on the live site.
 */

export type Profile = {
  name: string;
  fullName: string;
  title: string;
  location: string;
  /** 2-4 short lines shown under the hero title. */
  intro: string[];
  /** One-sentence statement shown under the intro; **word** marks emphasis. */
  tagline: string;
  email: string;
  github: string;
  linkedin: string;
  /** Absolute site URL, used for canonical + Open Graph metadata. */
  siteUrl: string;
  resumeUrl: string;
  portrait: {
    src: string;
    alt: string;
    /** CSS object-position, tuned so the face survives the crop. */
    objectPosition: string;
  };
};

/**
 * An organisation's logo, shown beside an experience or education entry.
 * Use the organisation's own artwork unaltered.
 */
export type OrgLogo = {
  src: string;
  width: number;
  height: number;
  /**
   * "mark": a square symbol, set in a 56px tile (default).
   * "lockup": a wide official logo, set at the same height, width follows.
   */
  fit?: "mark" | "lockup";
  /**
   * Colour filling the tile: a mark's brand colour, or the ground a lockup is
   * designed to sit on (e.g. white). When omitted the tile gets a thin outline.
   */
  background?: string;
};

export type ExperienceEntry = {
  id: string;
  start: string;
  end: string;
  role: string;
  company: string;
  location: string;
  /** Optional short line under the company, e.g. "(Member)". */
  note?: string;
  /** Company mark shown beside the role. */
  logo?: OrgLogo;
  description: string;
  accomplishments: string[];
  /** App download link; an "[ADD …]" placeholder shows a "Coming soon" button. */
  download?: string;
};

export type ProjectDetail = {
  /** Section body paragraphs. Omit or leave empty to hide the section. */
  problem?: string;
  approach?: string;
  architecture?: string;
  features?: string[];
  challenges?: string[];
};

export type Project = {
  slug: string;
  title: string;
  /** One-to-two sentences for the index list. */
  summary: string;
  /** Longer framing shown at the top of the detail page. */
  overview: string;
  stack: string[];
  status?: string;
  github?: string;
  demo?: string;
  /**
   * App download link (App Store / Google Play / landing page). While it is
   * still an "[ADD …]" placeholder the button shows as "Coming soon".
   */
  download?: string;
  image?: {
    src: string;
    alt: string;
  };
  detail: ProjectDetail;
};

export type SkillGroup = {
  category: string;
  items: string[];
};

export type EducationEntry = {
  id: string;
  degree: string;
  school: string;
  location: string;
  dates: string;
  coursework?: string[];
  logo?: OrgLogo;
};

export type NavLink = {
  label: string;
  href: string;
  /** Section id used for scroll-spy. */
  id: string;
};
