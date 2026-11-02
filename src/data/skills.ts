import type { SkillCategory } from "@/types/skill";

export const skillCategories: SkillCategory[] = [
  {
    id: "ai-ml",
    title: "Artificial Intelligence & Machine Learning",
    description: "Models, methods and prompting for intelligent applications.",
    items: [
      "Artificial Intelligence",
      "Machine Learning",
      "Natural Language Processing",
      "Generative AI",
      "LLMs",
      "SLMs",
      "Prompt Engineering",
    ],
  },
  {
    id: "llm-frameworks",
    title: "LLM Frameworks",
    description: "Orchestrating models, tools and retrieval pipelines.",
    items: ["LangChain", "Ollama", "RAG Architecture"],
  },
  {
    id: "vector-databases",
    title: "Vector Databases",
    description: "Storing and searching embeddings for semantic retrieval.",
    items: ["FAISS", "ChromaDB", "Embeddings"],
  },
  {
    id: "languages",
    title: "Programming Languages",
    description: "The languages behind the applications and experiments.",
    items: ["Python", "SQL"],
  },
  {
    id: "cloud-devops",
    title: "Cloud & DevOps",
    description: "Hosting and managed AI services.",
    items: ["AWS", "Amazon S3", "EC2", "Vercel"],
  },
];
