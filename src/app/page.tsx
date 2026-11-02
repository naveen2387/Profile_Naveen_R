import Link from "next/link";
import { ArrowRight, Film, Megaphone } from "lucide-react";
import { Hero } from "@/components/hero/hero";
import { ProjectCard } from "@/components/projects/project-card";
import { Chip } from "@/components/ui/chip";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { VideoCard } from "@/components/video/video-card";
import { getAvailablePromos, getAvailableVideos, getProjects } from "@/lib/catalog";
import { profile } from "@/data/profile";
import { skillCategories } from "@/data/skills";
import { workflowSteps } from "@/data/workflow";
import { SITE } from "@/lib/site";

const CORE_TECH = ["Python", "LangChain", "Ollama", "FAISS", "ChromaDB", "AWS"];

export default function HomePage() {
  const explainers = getAvailableVideos("explainer").slice(0, 3);
  const promoCount = getAvailablePromos().length;
  const projects = getProjects();
  const featured = projects.filter((project) => project.featured).slice(0, 3);
  const technologyCount = skillCategories.reduce((sum, category) => sum + category.items.length, 0);
  const atAGlance = [
    { value: projects.length, label: "AI & software projects" },
    { value: technologyCount, label: "technologies in use" },
    { value: workflowSteps.length, label: "production stages" },
  ];

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.role,
    description: SITE.description,
    url: SITE.url,
    knowsAbout: skillCategories.flatMap((category) => category.items).slice(0, 20),
    sameAs: [profile.linkedinUrl, profile.githubUrl].filter(Boolean),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
      />

      <Hero />

      {/* At a glance: counts come from the content data, so they stay accurate */}
      <section aria-label="Portfolio at a glance" className="container-page">
        <Reveal>
          <ul className="grid gap-4 sm:grid-cols-3">
            {atAGlance.map((stat) => (
              <li key={stat.label} className="glass rounded-3xl p-6 sm:p-8">
                <p className="font-display text-4xl font-extrabold text-gradient">{stat.value}</p>
                <p className="mt-2 text-sm text-muted">{stat.label}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* Educational video production: the first showcase after the hero */}
      <section aria-labelledby="video-showcase-title" className="container-page py-24">
        <Reveal>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              id="video-showcase-title"
              eyebrow="Video showcase"
              title="Educational Video Production"
              description="Transforming complex academic concepts into engaging visual learning experiences."
            />
            <div className="flex flex-wrap gap-3">
              <Link href="/videos" className="btn-gradient inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white">
                <Film className="h-4 w-4" aria-hidden="true" />
                Explainer videos
              </Link>
              <Link href="/promos" className="glass inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-foreground">
                <Megaphone className="h-4 w-4" aria-hidden="true" />
                Promo reels{promoCount > 0 ? ` (${promoCount})` : ""}
              </Link>
            </div>
          </div>
        </Reveal>

        <div className="mt-12">
          {explainers.length > 0 ? (
            <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {explainers.map((video) => (
                <li key={video.id} className="h-full">
                  <VideoCard video={video} />
                </li>
              ))}
            </ul>
          ) : (
            <Reveal>
              <div className="glass flex flex-col items-start gap-5 rounded-3xl p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
                <div className="flex items-start gap-5">
                  <span className="btn-gradient flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-white">
                    <Film className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div className="space-y-2">
                    <h3 className="font-display text-lg font-semibold text-foreground">Explainer videos are on their way</h3>
                    <p className="max-w-xl text-sm leading-relaxed text-muted">
                      Each video appears here as soon as its MP4 file is added to the library, filterable by class,
                      subject, concept and length. Nothing is shown before the file exists.
                    </p>
                  </div>
                </div>
                <Link href="/videos" className="inline-flex shrink-0 items-center gap-2 text-sm font-medium text-accent-soft transition-colors hover:text-foreground">
                  Open the video library
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* Projects */}
      <section aria-labelledby="projects-showcase-title" className="container-page pb-24">
        <Reveal>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              id="projects-showcase-title"
              eyebrow="AI & software"
              title="Projects & Innovations"
              description="Exploring artificial intelligence, intelligent automation, and real-world software solutions."
            />
            <Link href="/projects" className="inline-flex items-center gap-2 text-sm font-medium text-accent-soft transition-colors hover:text-foreground">
              All {projects.length} projects
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
        <ul className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featured.map((project) => (
            <li key={project.slug} className="h-full">
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      </section>

      {/* Workflow teaser */}
      <section aria-labelledby="workflow-teaser-title" className="container-page pb-24">
        <Reveal>
          <div className="glass relative overflow-hidden rounded-3xl p-8 sm:p-12">
            <div aria-hidden="true" className="absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-accent/15 blur-3xl" />
            <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:items-center">
              <div className="space-y-5">
                <SectionHeading
                  id="workflow-teaser-title"
                  eyebrow="How it's made"
                  title="From Concepts to Visual Learning."
                  description="Five stages from concept research to the final edit: AI-assisted scripting, storyboarding, visual production and final video."
                />
                <Link href="/workflow" className="inline-flex items-center gap-2 text-sm font-medium text-accent-soft transition-colors hover:text-foreground">
                  Explore the production workflow
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
              <ol className="grid gap-3 sm:grid-cols-2">
                {workflowSteps.map((step) => (
                  <li key={step.id} className="flex items-start gap-3 rounded-2xl border border-border bg-background/50 p-4">
                    <span className="font-display flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface-raised text-xs font-bold text-accent-soft">
                      {step.number}
                    </span>
                    <span className="text-sm font-medium text-foreground">{step.title}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Skills teaser */}
      <section aria-labelledby="skills-teaser-title" className="container-page pb-24">
        <Reveal>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl space-y-4">
              <h2 id="skills-teaser-title" className="font-display text-2xl font-bold text-foreground sm:text-3xl">
                Technology Stack & Expertise
              </h2>
              <p className="text-sm leading-relaxed text-muted sm:text-base">
                LLMs, retrieval pipelines, vector databases and cloud AI services, organised
                into {skillCategories.length} categories.
              </p>
              <Link href="/skills" className="inline-flex items-center gap-2 text-sm font-medium text-accent-soft transition-colors hover:text-foreground">
                View all skills
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <ul className="flex max-w-xl flex-wrap gap-2 lg:justify-end" aria-label="Core technologies">
              {CORE_TECH.map((tech) => (
                <li key={tech}>
                  <Chip className="px-3.5 py-1.5 text-sm">{tech}</Chip>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>

      {/* Contact call to action */}
      <section aria-labelledby="cta-title" className="container-page pb-28">
        <Reveal>
          <div className="btn-gradient relative overflow-hidden rounded-3xl p-10 text-center sm:p-16">
            <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-20" />
            <div className="relative mx-auto max-w-2xl space-y-6">
              <h2 id="cta-title" className="font-display text-3xl font-bold text-white sm:text-4xl">
                Let&apos;s Build Something Intelligent.
              </h2>
              <p className="text-base leading-relaxed text-white/85">
                Interested in artificial intelligence, educational technology, or innovative software solutions? Let&apos;s
                connect.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-semibold text-background transition-transform duration-300 hover:-translate-y-0.5"
              >
                Get in touch
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
