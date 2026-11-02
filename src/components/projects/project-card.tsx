import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Github } from "@/components/ui/brand-icons";
import { Chip } from "@/components/ui/chip";
import { StatusBadge } from "@/components/ui/status-badge";
import type { ProjectCardData } from "@/lib/catalog";
import { cn } from "@/lib/utils";

const VISIBLE_TECH = 4;

export function ProjectCard({ project }: { project: ProjectCardData }) {
  const hidden = project.technologies.length - VISIBLE_TECH;

  return (
    <article className="glass glass-hover group flex h-full flex-col overflow-hidden rounded-2xl">
      {project.thumbnailAvailable && project.thumbnailPath && (
        <div className="relative aspect-[16/9] overflow-hidden bg-surface">
          <Image
            src={project.thumbnailPath}
            alt={`${project.name} preview`}
            fill
            sizes="(min-width: 1280px) 400px, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="space-y-3">
          <div>
            <StatusBadge status={project.status} />
          </div>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent-soft">{project.category}</p>
          <h3 className="font-display text-xl font-semibold text-foreground">{project.name}</h3>
          <p className="text-sm leading-relaxed text-muted">{project.summary}</p>
        </div>

        <ul className="flex flex-wrap gap-1.5" aria-label={`Technologies used in ${project.name}`}>
          {project.technologies.slice(0, VISIBLE_TECH).map((tech) => (
            <li key={tech}>
              <Chip className="px-2.5 py-0.5 text-[11px]">{tech}</Chip>
            </li>
          ))}
          {hidden > 0 && (
            <li>
              <Chip className="px-2.5 py-0.5 text-[11px]">+{hidden}</Chip>
            </li>
          )}
        </ul>

        <div className="mt-auto flex flex-wrap items-center gap-2 border-t border-border pt-5">
          <Link
            href={`/projects/${project.slug}`}
            className="btn-gradient inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5"
          >
            View Details
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.name} on GitHub`}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border border-border px-3.5 py-2 text-xs font-medium text-muted transition-colors hover:border-border-strong hover:text-foreground",
              )}
            >
              <Github className="h-3.5 w-3.5" aria-hidden="true" />
              GitHub
            </a>
          )}
          {project.liveDemoUrl && (
            <a
              href={project.liveDemoUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.name} live demo`}
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-3.5 py-2 text-xs font-medium text-muted transition-colors hover:border-border-strong hover:text-foreground"
            >
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
