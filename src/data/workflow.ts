import type { WorkflowStep } from "@/types/skill";

export const workflowSteps: WorkflowStep[] = [
  {
    id: "concept-research",
    number: 1,
    title: "Concept Research",
    summary: "Select important educational concepts for Classes 6–10.",
    details: [
      "Choose concepts from the Science, Mathematics, Social Science and English syllabi.",
      "Break each topic into the core ideas a student must understand.",
    ],
    icon: "search",
  },
  {
    id: "script-generation",
    number: 2,
    title: "AI Script Generation",
    summary: "Create accurate, engaging scripts with age-appropriate explanations.",
    details: [
      "Draft scripts with language models, then review every fact before use.",
      "Adjust vocabulary and pacing to the age group of the target class.",
    ],
    icon: "sparkles",
  },
  {
    id: "storyboard",
    number: 3,
    title: "Storyboard Creation",
    summary: "Break concepts into visual scenes with narration, illustrations and transitions.",
    details: [
      "Map each script line to a scene with a clear visual idea.",
      "Plan transitions so the concept builds step by step.",
    ],
    icon: "layout",
  },
  {
    id: "visual-production",
    number: 4,
    title: "Visual Production",
    summary: "Generate illustrations, animated characters, motion graphics and educational diagrams.",
    details: [
      "Create illustrations, characters and diagrams that match the storyboard.",
      "Animate key ideas so learners can follow cause and effect.",
    ],
    icon: "palette",
  },
  {
    id: "final-production",
    number: 5,
    title: "Final Video Production",
    summary: "Combine animations, narration, subtitles, music and editing into final videos.",
    details: [
      "Assemble animation, narration, subtitles and background music into one edit.",
      "Export the final MP4 with a thumbnail ready for publishing.",
    ],
    icon: "film",
  },
];
