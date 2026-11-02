import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle2, Lightbulb, Target } from "lucide-react";
import { Github } from "@/components/ui/brand-icons";
import { ArchitectureDiagram } from "@/components/projects/architecture-diagram";
import { Chip } from "@/components/ui/chip";
import { SectionHeading } from "@/components/ui/section-heading";
import { StatusBadge } from "@/components/ui/status-badge";
import { getProject, getProjectMedia, getProjects } from "@/lib/catalog";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found" };
  return { title: project.name, description: project.summary };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const media = getProjectMedia(project);
  const all = getProjects();
  const index = all.findIndex((item) => item.slug === project.slug);
  const previous = all[(index - 1 + all.length) % all.length];
  const next = all[(index + 1) % all.length];
  const hasLinks = Boolean(project.githubUrl || project.liveDemoUrl);
  const hasImage = Boolean(media.thumbnailAvailable && project.thumbnailPath);

  return (
    <article>
      <header className="container-page pb-16 pt-10 sm:pt-14">
        <Link href="/projects" className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          All projects
        </Link>

        <div className={hasImage ? "mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,460px)] lg:items-center" : "mt-8 max-w-3xl"}>
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <StatusBadge status={project.status} />
              <span className="text-xs font-medium uppercase tracking-[0.16em] text-accent-soft">{project.category}</span>
            </div>
            <h1 className="font-display text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
              {project.name}
            </h1>
            <p className="text-lg leading-relaxed text-muted">{project.summary}</p>
            <p className="border-l-2 border-accent pl-4 text-sm italic leading-relaxed text-foreground/80">
              {project.highlight}
            </p>

            <ul className="flex flex-wrap gap-2" aria-label="Technology stack">
              {project.technologies.map((tech) => (
                <li key={tech}>
                  <Chip>{tech}</Chip>
                </li>
              ))}
            </ul>

            {hasLinks && (
              <div className="flex flex-wrap gap-3 pt-2">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-border-strong"
                  >
                    <Github className="h-4 w-4" aria-hidden="true" />
                    View on GitHub
                  </a>
                )}
                {project.liveDemoUrl && (
                  <a
                    href={project.liveDemoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gradient inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white"
                  >
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    Open live demo
                  </a>
                )}
              </div>
            )}
          </div>

          {hasImage && project.thumbnailPath && (
            <div className="glass relative aspect-[16/10] overflow-hidden rounded-3xl">
              <Image
                src={project.thumbnailPath}
                alt={`${project.name} overview`}
                fill
                priority
                sizes="(min-width: 1024px) 460px, 100vw"
                className="object-cover"
              />
            </div>
          )}
        </div>
      </header>

      <div className="container-page space-y-24 pb-24">
        <section aria-labelledby="overview-title" className="space-y-10">
          <SectionHeading id="overview-title" eyebrow="Overview" title="Problem, solution and features" />
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="glass rounded-3xl p-7">
              <Target className="mb-5 h-5 w-5 text-accent-soft" aria-hidden="true" />
              <h3 className="font-display text-lg font-semibold">Problem statement</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{project.problem}</p>
            </div>
            <div className="glass rounded-3xl p-7">
              <Lightbulb className="mb-5 h-5 w-5 text-accent-soft" aria-hidden="true" />
              <h3 className="font-display text-lg font-semibold">Solution</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{project.solution}</p>
            </div>
            <div className="glass rounded-3xl p-7">
              <CheckCircle2 className="mb-5 h-5 w-5 text-accent-soft" aria-hidden="true" />
              <h3 className="font-display text-lg font-semibold">Main features</h3>
              <ul className="mt-3 space-y-3 text-sm leading-relaxed text-muted">
                {project.features.map((feature) => (
                  <li key={feature} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-soft" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section aria-labelledby="architecture-title" className="space-y-10">
          <SectionHeading
            id="architecture-title"
            eyebrow="Architecture"
            title="How the system fits together"
            description="A simplified view of the main components and the order in which data moves through them."
          />
          <ArchitectureDiagram nodes={project.architecture} />
        </section>

        {media.screenshots.length > 0 && (
          <section aria-labelledby="screenshots-title" className="space-y-10">
            <SectionHeading id="screenshots-title" eyebrow="Screenshots" title="Interface and results" />
            <ul className="grid gap-6 md:grid-cols-2">
              {media.screenshots.map((shot) => (
                <li key={shot.path} className="glass overflow-hidden rounded-3xl">
                  <figure>
                    <div className="relative aspect-video bg-surface">
                      <Image src={shot.path} alt={shot.caption} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
                    </div>
                    <figcaption className="p-4 text-sm text-muted">{shot.caption}</figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section aria-labelledby="implementation-title" className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
          <div className="space-y-4">
            <SectionHeading id="implementation-title" eyebrow="Implementation" title="Implementation details" />
          </div>
          <div className="glass space-y-5 rounded-3xl p-7 sm:p-9">
            {project.implementation.map((paragraph) => (
              <p key={paragraph} className="text-sm leading-relaxed text-muted sm:text-base">
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        <section aria-labelledby="challenges-title" className="space-y-10">
          <SectionHeading id="challenges-title" eyebrow="Reflection" title="Challenges and learnings" />
          <div className="grid gap-6 md:grid-cols-2">
            <div className="glass rounded-3xl p-7">
              <h3 className="font-display text-lg font-semibold">Challenges</h3>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted">
                {project.challenges.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-warning" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass rounded-3xl p-7">
              <h3 className="font-display text-lg font-semibold">Learnings</h3>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted">
                {project.learnings.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-success" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <nav aria-label="More projects" className="grid gap-4 border-t border-border pt-10 sm:grid-cols-2">
          <Link href={`/projects/${previous.slug}`} className="glass glass-hover group flex items-center gap-4 rounded-2xl p-5">
            <ArrowLeft className="h-5 w-5 shrink-0 text-muted transition-transform group-hover:-translate-x-1" aria-hidden="true" />
            <span className="min-w-0">
              <span className="block text-xs uppercase tracking-[0.16em] text-subtle">Previous project</span>
              <span className="font-display block truncate text-base font-semibold text-foreground">{previous.name}</span>
            </span>
          </Link>
          <Link href={`/projects/${next.slug}`} className="glass glass-hover group flex items-center justify-end gap-4 rounded-2xl p-5 text-right">
            <span className="min-w-0">
              <span className="block text-xs uppercase tracking-[0.16em] text-subtle">Next project</span>
              <span className="font-display block truncate text-base font-semibold text-foreground">{next.name}</span>
            </span>
            <ArrowRight className="h-5 w-5 shrink-0 text-muted transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </nav>
      </div>
    </article>
  );
}
