export type ProjectStatus = "completed" | "experimental" | "in-progress";

export interface ArchitectureNode {
  label: string;
  detail: string;
}

export interface ProjectScreenshot {
  /** Relative to /public, e.g. "/images/projects/nexus-rag-1.png" */
  path: string;
  caption: string;
}

/**
 * One portfolio project. Optional URLs stay undefined until real links exist,
 * so no GitHub or demo button is ever rendered for a missing link.
 */
export interface ProjectItem {
  slug: string;
  name: string;
  category: string;
  status: ProjectStatus;
  /** Short card description. */
  summary: string;
  highlight: string;
  technologies: string[];
  problem: string;
  solution: string;
  features: string[];
  /** Left-to-right flow shown as the architecture diagram. */
  architecture: ArchitectureNode[];
  implementation: string[];
  challenges: string[];
  learnings: string[];
  githubUrl?: string;
  liveDemoUrl?: string;
  /** Optional thumbnail under /public. A visual placeholder is shown when absent. */
  thumbnailPath?: string;
  screenshots: ProjectScreenshot[];
  featured: boolean;
}
