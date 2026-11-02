"use client";

import { useState } from "react";
import { ProjectCard } from "@/components/projects/project-card";
import { STATUS_DESCRIPTIONS, StatusBadge } from "@/components/ui/status-badge";
import type { ProjectCardData } from "@/lib/catalog";
import { cn } from "@/lib/utils";
import type { ProjectStatus } from "@/types/project";

type Filter = "all" | ProjectStatus;

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "All projects" },
  { id: "completed", label: "Completed" },
  { id: "experimental", label: "Experimental" },
  { id: "in-progress", label: "In progress" },
];

const STATUSES: ProjectStatus[] = ["completed", "experimental", "in-progress"];

export function ProjectsGrid({ projects }: { projects: ProjectCardData[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const visible = filter === "all" ? projects : projects.filter((project) => project.status === filter);

  return (
    <div className="space-y-10">
      <div className="glass grid gap-6 rounded-3xl p-6 sm:grid-cols-3 sm:p-8">
        {STATUSES.map((status) => (
          <div key={status} className="space-y-2">
            <StatusBadge status={status} />
            <p className="text-sm leading-relaxed text-muted">{STATUS_DESCRIPTIONS[status]}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter projects by status">
        {FILTERS.map((option) => {
          const count = option.id === "all" ? projects.length : projects.filter((p) => p.status === option.id).length;
          const active = filter === option.id;
          return (
            <button
              key={option.id}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(option.id)}
              className={cn(
                "rounded-full border px-4 py-2 text-xs font-medium transition-all duration-200",
                active
                  ? "border-transparent btn-gradient text-white"
                  : "border-border bg-surface/60 text-muted hover:border-border-strong hover:text-foreground",
              )}
            >
              {option.label} <span className="opacity-70">({count})</span>
            </button>
          );
        })}
      </div>

      {visible.length > 0 ? (
        <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {visible.map((project) => (
            <li key={project.slug} className="h-full">
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="glass rounded-3xl p-8 text-center text-sm text-muted">No projects with this status yet.</p>
      )}
    </div>
  );
}
