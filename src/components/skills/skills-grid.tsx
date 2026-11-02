"use client";

import { useId, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Brain, Cloud, Code2, Database, Layers, Network, Search, X, type LucideIcon } from "lucide-react";
import type { SkillCategory } from "@/types/skill";

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  "ai-ml": Brain,
  "llm-frameworks": Network,
  "vector-databases": Database,
  languages: Code2,
  "cloud-devops": Cloud,
};

export function SkillsGrid({ categories }: { categories: SkillCategory[] }) {
  const [query, setQuery] = useState("");
  const inputId = useId();
  const reduceMotion = useReducedMotion();

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return categories;
    return categories
      .map((category) => ({
        ...category,
        items: category.items.filter((item) => item.toLowerCase().includes(term)),
      }))
      .filter((category) => category.items.length > 0);
  }, [categories, query]);

  const totalSkills = categories.reduce((sum, category) => sum + category.items.length, 0);
  const shownSkills = filtered.reduce((sum, category) => sum + category.items.length, 0);

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-md">
          <label htmlFor={inputId} className="sr-only">
            Search technologies
          </label>
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-subtle" aria-hidden="true" />
          <input
            id={inputId}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search technologies, e.g. LangChain"
            className="h-12 w-full rounded-2xl border border-border bg-surface/60 pl-11 pr-11 text-sm text-foreground placeholder:text-subtle focus:border-accent-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-soft/60"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-muted hover:text-foreground"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
        </div>
        <p className="text-sm text-muted" aria-live="polite">
          Showing <span className="font-semibold text-foreground">{shownSkills}</span> of {totalSkills} technologies
        </p>
      </div>

      {filtered.length > 0 ? (
        <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((category, index) => {
            const Icon = CATEGORY_ICONS[category.id] ?? Layers;
            return (
              <motion.li
                key={category.id}
                layout={!reduceMotion}
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: reduceMotion ? 0 : index * 0.05 }}
                className="glass glass-hover group flex flex-col gap-5 rounded-3xl p-6 sm:p-7"
              >
                <div className="flex items-start gap-4">
                  <span className="btn-gradient flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-white transition-transform duration-500 group-hover:rotate-6">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div className="space-y-1">
                    <h3 className="font-display text-base font-semibold leading-snug text-foreground">{category.title}</h3>
                    <p className="text-xs leading-relaxed text-muted">{category.description}</p>
                  </div>
                </div>

                <ul className="flex flex-wrap gap-2">
                  {category.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-border bg-background/50 px-3 py-1.5 text-xs font-medium text-muted transition-all duration-200 hover:-translate-y-0.5 hover:border-accent-soft/60 hover:text-foreground hover:shadow-[0_0_18px_-4px_rgba(216,155,187,0.5)]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.li>
            );
          })}
        </ul>
      ) : (
        <p className="glass rounded-3xl p-8 text-center text-sm text-muted">No technologies match “{query}”.</p>
      )}
    </div>
  );
}
