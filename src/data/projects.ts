import type { ProjectItem } from "@/types/project";

/**
 * Portfolio projects. Edit freely.
 *
 * Status values are assigned from the project brief (completed / experimental / in-progress).
 * Problem, solution, implementation, challenge and learning copy is a draft written from the
 * brief: replace it with your own specifics. Add githubUrl / liveDemoUrl only when real links exist.
 */
export const projects: ProjectItem[] = [
  {
    slug: "nexus-rag",
    name: "Nexus RAG",
    category: "Offline AI / Retrieval-Augmented Generation",
    status: "experimental",
    summary:
      "An offline RAG and SLM benchmarking platform for exploring local language models, semantic search and document-based question answering.",
    highlight: "Offline AI capabilities, local model experimentation, and document retrieval.",
    technologies: ["Python", "Ollama", "FAISS", "Embeddings", "Llama", "Qwen", "RAG"],
    problem:
      "Document question answering usually depends on hosted APIs, which raises cost, latency and data-privacy concerns. It is also hard to compare small local language models fairly on the same retrieval task.",
    solution:
      "A fully local RAG pipeline: documents are chunked and embedded into a FAISS index, retrieved chunks are passed to models served through Ollama, and the same retrieval context can be reused across Llama and Qwen models for comparison.",
    features: [
      "Offline document ingestion and question answering",
      "Semantic search over chunked documents with FAISS",
      "Run and switch between local Llama and Qwen models through Ollama",
      "Benchmark small language models against the same retrieval context",
    ],
    architecture: [
      { label: "Documents", detail: "Local PDFs and text files" },
      { label: "Chunk & Embed", detail: "Split text and create embeddings" },
      { label: "FAISS Index", detail: "Vector store for semantic search" },
      { label: "Retriever", detail: "Top-k relevant chunks per question" },
      { label: "Local LLM", detail: "Llama / Qwen served by Ollama" },
      { label: "Answer", detail: "Grounded response with sources" },
    ],
    implementation: [
      "Documents are loaded, split into overlapping chunks and embedded, then stored in a FAISS index on disk so it can be reloaded without re-embedding.",
      "At query time the question is embedded, the nearest chunks are retrieved and assembled into a prompt that is sent to a locally running model via Ollama.",
      "Model choice is a configuration setting, which keeps experiments comparable: only the generation model changes while the retrieval layer stays fixed.",
    ],
    challenges: [
      "Keeping retrieval relevant when documents are long and mixed in format",
      "Making model comparisons fair by holding retrieval inputs constant",
      "Running several local models efficiently on the same machine",
    ],
    learnings: [
      "Retrieval quality usually limits answer quality more than the choice of model",
      "Offline setups trade convenience for full control over models and data",
    ],
    screenshots: [],
    featured: true,
  },
  {
    slug: "cold-mail-generator",
    name: "Cold Mail Generator",
    category: "Generative AI / NLP",
    status: "completed",
    summary:
      "An AI application that analyses job descriptions and generates personalised cold emails using relevant portfolio information.",
    highlight: "Automating personalised professional outreach using generative AI.",
    technologies: ["Python", "LangChain", "Llama 3.1", "ChromaDB", "NLP", "Streamlit"],
    problem:
      "Writing a tailored cold email for every job description is slow, and generic messages are easy to ignore.",
    solution:
      "The application reads a job description, extracts the role requirements, retrieves the most relevant portfolio entries from ChromaDB and asks Llama 3.1 (through LangChain) to write an email that connects the two.",
    features: [
      "Job description analysis and requirement extraction",
      "Retrieval of relevant portfolio items from a vector store",
      "Personalised cold email generation with Llama 3.1",
      "Simple Streamlit interface for pasting a job description",
    ],
    architecture: [
      { label: "Job Description", detail: "Pasted into the Streamlit UI" },
      { label: "NLP Extraction", detail: "Role, skills and requirements" },
      { label: "ChromaDB", detail: "Portfolio items retrieved by relevance" },
      { label: "Llama 3.1", detail: "Generation through LangChain" },
      { label: "Cold Email", detail: "Personalised draft for review" },
    ],
    implementation: [
      "Portfolio entries are embedded and stored in ChromaDB so the most relevant ones can be matched to each job description.",
      "A LangChain chain combines the extracted requirements, the matched portfolio items and a prompt template before calling Llama 3.1.",
      "The Streamlit front end presents the generated email for review and editing before use.",
    ],
    challenges: [
      "Keeping generated emails specific instead of generic",
      "Matching portfolio items to requirements that use different wording",
    ],
    learnings: [
      "Retrieval before generation keeps the model grounded in real experience",
      "Prompt structure matters as much as the model when output has to sound natural",
    ],
    screenshots: [],
    featured: true,
  },
  {
    slug: "fwc-core-hrms",
    name: "FWC CORE HRMS",
    category: "Full-Stack Development",
    status: "completed",
    summary:
      "A human resource management application with role-based functionality for recruiters, HR managers and administrators.",
    highlight: "Role-based application architecture and database integration.",
    technologies: ["Next.js", "React", "TypeScript", "Supabase", "PostgreSQL", "NextAuth", "Prisma"],
    problem:
      "HR teams need one place to manage people data, but recruiters, HR managers and administrators should not all see or change the same things.",
    solution:
      "A full-stack Next.js application with role-based access control: NextAuth handles sign-in and session roles, Prisma provides typed database access, and Supabase PostgreSQL stores the data.",
    features: [
      "Role-based access for recruiters, HR managers and administrators",
      "Typed database access with Prisma over PostgreSQL",
      "Authentication and session handling with NextAuth",
      "Supabase-hosted PostgreSQL database",
    ],
    architecture: [
      { label: "Web UI", detail: "Next.js and React pages" },
      { label: "Auth & Roles", detail: "NextAuth sessions and role checks" },
      { label: "Application Layer", detail: "Server logic in TypeScript" },
      { label: "Prisma", detail: "Typed data access" },
      { label: "PostgreSQL", detail: "Hosted on Supabase" },
    ],
    implementation: [
      "Routes and actions check the signed-in user's role before showing or changing data.",
      "Prisma models describe the HR data, and the schema is the single source for database types across the app.",
    ],
    challenges: [
      "Keeping permissions consistent between the UI and the server",
      "Designing a schema that serves several roles without duplicating data",
    ],
    learnings: [
      "Enforce access rules on the server, not just in the interface",
      "A typed schema keeps database changes visible across the whole codebase",
    ],
    screenshots: [],
    featured: true,
  },
  {
    slug: "linkedin-post-generator",
    name: "LinkedIn Post Generator",
    category: "Generative AI",
    status: "completed",
    summary:
      "An AI-powered content generator that writes LinkedIn posts with language models, with multilingual support.",
    highlight: "AI-assisted professional content generation.",
    technologies: ["Python", "Streamlit", "LangChain", "Llama 3.1", "Groq API", "RAG"],
    problem:
      "Consistent professional posting takes time, and drafts often need rewriting to fit a topic, a tone or a language.",
    solution:
      "A Streamlit application that gathers the topic and tone, retrieves relevant context with RAG, and generates a post with Llama 3.1 served through the Groq API, including multilingual output.",
    features: [
      "Post generation from a topic and tone",
      "Retrieval of supporting context before generation (RAG)",
      "Llama 3.1 inference through the Groq API",
      "Multilingual output",
    ],
    architecture: [
      { label: "Topic & Tone", detail: "Entered in the Streamlit UI" },
      { label: "RAG Context", detail: "Relevant reference text retrieved" },
      { label: "LangChain Prompt", detail: "Template and chain assembly" },
      { label: "Llama 3.1 on Groq", detail: "Fast hosted inference" },
      { label: "LinkedIn Post", detail: "Draft in the chosen language" },
    ],
    implementation: [
      "LangChain composes the prompt from the topic, tone, retrieved context and target language.",
      "Generation is sent to Llama 3.1 through the Groq API, and the result is shown in Streamlit for editing.",
    ],
    challenges: [
      "Keeping tone consistent across different topics and languages",
      "Avoiding generic phrasing that reads like automated output",
    ],
    learnings: [
      "Small prompt changes can shift tone noticeably",
      "Grounding generation in context gives more specific, credible posts",
    ],
    screenshots: [],
    featured: false,
  },
];
