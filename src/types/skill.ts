export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  items: string[];
}

export interface WorkflowStep {
  id: string;
  number: number;
  title: string;
  summary: string;
  details: string[];
  icon: "search" | "sparkles" | "layout" | "palette" | "film";
}
