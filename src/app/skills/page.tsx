import type { Metadata } from "next";
import { SkillsGrid } from "@/components/skills/skills-grid";
import { SectionHeading } from "@/components/ui/section-heading";
import { skillCategories } from "@/data/skills";

export const metadata: Metadata = {
  title: "Technical Skills",
  description:
    "Technical skills of NAVEEN R: AI and machine learning, LLM frameworks, vector databases, programming languages and cloud services.",
};

export default function SkillsPage() {
  return (
    <>
      <section aria-labelledby="skills-title" className="container-page pb-14 pt-16 sm:pt-20">
        <SectionHeading
          as="h1"
          id="skills-title"
          eyebrow="Capabilities"
          title="Technology Stack & Expertise"
          description="The tools I use to design, build and explain intelligent systems, grouped by how they are used."
        />
      </section>

      <section aria-label="Skill categories" className="container-page pb-24">
        <SkillsGrid categories={skillCategories} />
      </section>
    </>
  );
}
