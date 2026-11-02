export interface Profile {
  name: string;
  role: string;
  tagline: string;
  /** Introduction paragraphs, shown on the About page. */
  intro: string[];
  interests: string[];
  /** Optional profile photo under /public. Initials are shown when absent. */
  photoPath?: string;
  /** Optional resume PDF under /public. The download button only renders when the file exists. */
  resumePath?: string;
  /** Leave empty until real links are provided. Empty values are never rendered as links. */
  linkedinUrl: string;
  githubUrl: string;
  email: string;
}

export type ExperienceCategory = "Technical" | "Leadership" | "Sports";

export interface ExperienceItem {
  id: string;
  title: string;
  category: ExperienceCategory;
  /** Free text, e.g. "2023 – Present". Omit to hide the period. */
  period?: string;
  summary: string;
}
