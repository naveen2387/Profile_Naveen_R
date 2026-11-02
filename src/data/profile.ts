import type { ExperienceItem, Profile } from "@/types/profile";

/**
 * Personal profile. Links and assets stay empty until they are provided;
 * the UI shows placeholders for anything missing and never invents URLs.
 */
export const profile: Profile = {
  name: "Naveen R",
  role: "AI-focused Developer & Educational Video Producer",
  tagline: "Ideas Engineered. Intelligence Created.",
  intro: [
    "I'm Naveen R, an AI-focused developer passionate about building intelligent applications and solving real-world problems using artificial intelligence.",
    "My technical interests include Generative AI, Large Language Models, Retrieval-Augmented Generation, local language models, Python development, and full-stack applications.",
    "I also enjoy transforming academic concepts into engaging educational experiences through animation, storytelling, and AI-powered creative workflows.",
    "My goal is to combine engineering and creativity to build meaningful technology.",
  ],
  interests: [
    "Generative AI",
    "Large Language Models",
    "Retrieval-Augmented Generation",
    "Local language models",
    "Python development",
    "Full-stack applications",
    "Educational animation & storytelling",
  ],
  // Add real files under public/ to show them. Leave undefined until they exist.
  photoPath: "/images/profile/naveen-profile.jpg",
  resumePath: undefined,
  linkedinUrl: "https://www.linkedin.com/in/naveen-r-796460308/",
  githubUrl: "https://github.com/naveen2387",
  email: "naveenr23082004@gmail.com",
};

export const experience: ExperienceItem[] = [
  {
    id: "ai-ml-development",
    title: "AI & ML Application Development",
    category: "Technical",
    summary:
      "Building AI and machine learning applications, including retrieval-augmented systems, local language model experiments and LLM-powered tools.",
  },
  {
    id: "academic-personal-projects",
    title: "Academic & Personal Project Development",
    category: "Technical",
    summary:
      "Designing and building academic and personal software projects across AI, full-stack development and automation.",
  },
  {
    id: "nss-leadership",
    title: "NSS Leadership",
    category: "Leadership",
    summary:
      "Led National Service Scheme activities, including organising camps.",
  },
  {
    id: "district-basketball",
    title: "District-Level School Basketball",
    category: "Sports",
    summary: "Represented the school at district level in basketball.",
  },
];
