export const SITE = {
  name: "NAVEEN R",
  legalName: "NAVEEN R",
  tagline: "Ideas Engineered. Intelligence Created.",
  positioning: "Personal AI Engineering, Educational Video Production and Technology Portfolio",
  title: "NAVEEN R | Personal AI Engineering & Technology Portfolio",
  description:
    "NAVEEN R: personal AI engineering, educational video production and technology portfolio, showcasing Generative AI applications, RAG systems and software projects.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
} as const;

export const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/videos", label: "Videos" },
  { href: "/projects", label: "Projects" },
  { href: "/skills", label: "Skills" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;
