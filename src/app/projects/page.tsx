import type { Metadata } from "next";
import { ProjectsGrid } from "@/components/projects/projects-grid";
import { SectionHeading } from "@/components/ui/section-heading";
import { getProjects } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Projects & Innovations",
  description:
    "AI and software projects by NAVEEN R: offline RAG, generative AI tools, cloud AI chatbots and full-stack applications.",
};

export default function ProjectsPage() {
  const projects = getProjects();

  return (
    <>
      <section aria-labelledby="projects-title" className="container-page pb-14 pt-16 sm:pt-20">
        <SectionHeading
          as="h1"
          id="projects-title"
          eyebrow="Portfolio"
          title="Projects & Innovations"
          description="Exploring artificial intelligence, intelligent automation, and real-world software solutions."
        />
      </section>

      <section aria-label="Project list" className="container-page pb-24">
        <ProjectsGrid projects={projects} />
      </section>
    </>
  );
}
