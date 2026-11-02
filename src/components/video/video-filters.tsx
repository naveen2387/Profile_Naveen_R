"use client";

import { useId } from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  CLASS_LEVELS,
  DURATION_OPTIONS,
  EMPTY_FILTERS,
  SUBJECTS,
  hasActiveFilters,
  type VideoFilterState,
} from "@/lib/video-filters";

interface VideoFiltersProps {
  filters: VideoFilterState;
  onChange: (next: VideoFilterState) => void;
  resultCount: number;
  totalCount: number;
  noun: string;
}

function FilterGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  const labelId = useId();
  return (
    <div role="group" aria-labelledby={labelId} className="space-y-2">
      <p id={labelId} className="text-xs font-semibold uppercase tracking-[0.18em] text-subtle">
        {label}
      </p>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function Pill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all duration-200",
        active
          ? "border-transparent btn-gradient text-white"
          : "border-border bg-surface/60 text-muted hover:border-border-strong hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}

export function VideoFilters({ filters, onChange, resultCount, totalCount, noun }: VideoFiltersProps) {
  const searchId = useId();
  const active = hasActiveFilters(filters);

  return (
    <div className="glass rounded-3xl p-5 sm:p-6">
      <div className="flex flex-col gap-5">
        <div className="relative">
          <label htmlFor={searchId} className="sr-only">
            Search {noun}
          </label>
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-subtle" aria-hidden="true" />
          <input
            id={searchId}
            type="search"
            value={filters.query}
            onChange={(event) => onChange({ ...filters, query: event.target.value })}
            placeholder={`Search ${noun} by title, concept or subject`}
            className="h-12 w-full rounded-2xl border border-border bg-background/60 pl-11 pr-4 text-sm text-foreground placeholder:text-subtle focus:border-accent-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-soft/60"
          />
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <FilterGroup label="Class">
            <Pill active={filters.classLevel === "all"} onClick={() => onChange({ ...filters, classLevel: "all" })}>
              All classes
            </Pill>
            {CLASS_LEVELS.map((level) => (
              <Pill
                key={level}
                active={filters.classLevel === level}
                onClick={() => onChange({ ...filters, classLevel: level })}
              >
                Class {level}
              </Pill>
            ))}
          </FilterGroup>

          <FilterGroup label="Subject">
            <Pill active={filters.subject === "all"} onClick={() => onChange({ ...filters, subject: "all" })}>
              All subjects
            </Pill>
            {SUBJECTS.map((subject) => (
              <Pill key={subject} active={filters.subject === subject} onClick={() => onChange({ ...filters, subject })}>
                {subject}
              </Pill>
            ))}
          </FilterGroup>

          <FilterGroup label="Duration">
            {DURATION_OPTIONS.map((option) => (
              <Pill
                key={option.value}
                active={filters.duration === option.value}
                onClick={() => onChange({ ...filters, duration: option.value })}
              >
                {option.label}
              </Pill>
            ))}
          </FilterGroup>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4 text-sm">
          <p className="text-muted" aria-live="polite">
            Showing <span className="font-semibold text-foreground">{resultCount}</span> of {totalCount} {noun}
          </p>
          {active && (
            <button
              type="button"
              onClick={() => onChange(EMPTY_FILTERS)}
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-accent-soft transition-colors hover:bg-surface hover:text-foreground"
            >
              <X className="h-3.5 w-3.5" aria-hidden="true" />
              Clear filters
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
