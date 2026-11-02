"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Film, LayoutTemplate, Palette, Search, Sparkles, type LucideIcon } from "lucide-react";
import type { WorkflowStep } from "@/types/skill";

const STEP_ICONS: Record<WorkflowStep["icon"], LucideIcon> = {
  search: Search,
  sparkles: Sparkles,
  layout: LayoutTemplate,
  palette: Palette,
  film: Film,
};

/** Five production stages. A connecting line draws in as the section scrolls into view. */
export function WorkflowSteps({ steps }: { steps: WorkflowStep[] }) {
  const reduceMotion = useReducedMotion();
  const lineTransition = reduceMotion ? { duration: 0 } : { duration: 1.4, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <ol className="relative grid gap-10 xl:grid-cols-5 xl:gap-6">
      <motion.div
        aria-hidden="true"
        className="absolute left-7 top-0 h-full w-px origin-top bg-gradient-to-b from-accent-soft via-violet to-transparent xl:hidden"
        initial={reduceMotion ? false : { scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={lineTransition}
      />
      <motion.div
        aria-hidden="true"
        className="absolute left-7 right-7 top-7 hidden h-px origin-left bg-gradient-to-r from-accent-soft via-violet to-cyan xl:block"
        initial={reduceMotion ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={lineTransition}
      />

      {steps.map((step, index) => {
        const Icon = STEP_ICONS[step.icon];
        return (
          <motion.li
            key={step.id}
            className="relative pl-20 xl:pl-0"
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="btn-gradient absolute left-0 top-0 flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-xl xl:static xl:mb-6">
              <Icon className="h-6 w-6" aria-hidden="true" />
            </span>

            <div className="glass glass-hover h-full rounded-3xl p-6">
              <p className="font-mono text-xs tracking-[0.2em] text-accent-soft">STEP {String(step.number).padStart(2, "0")}</p>
              <h3 className="font-display mt-2 text-lg font-semibold leading-snug text-foreground">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{step.summary}</p>
              <ul className="mt-5 space-y-2.5 border-t border-border pt-5 text-xs leading-relaxed text-subtle">
                {step.details.map((detail) => (
                  <li key={detail} className="flex gap-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent-soft" aria-hidden="true" />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          </motion.li>
        );
      })}
    </ol>
  );
}
