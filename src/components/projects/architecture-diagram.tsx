"use client";

import { Fragment } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { ArchitectureNode } from "@/types/project";

/** Left-to-right flow of a project's main components. Stacks vertically on smaller screens. */
export function ArchitectureDiagram({ nodes }: { nodes: ArchitectureNode[] }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="glass relative overflow-hidden rounded-3xl p-6 sm:p-8">
      <div aria-hidden="true" className="bg-grid absolute inset-0 opacity-50" />
      <ol className="relative flex flex-col gap-3 xl:flex-row xl:items-stretch xl:gap-2">
        {nodes.map((node, index) => (
          <Fragment key={node.label}>
            <motion.li
              className="min-w-0 flex-1"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative h-full rounded-2xl border border-border-strong bg-surface-raised/80 p-4 text-left xl:text-center">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent-soft">
                  Step {index + 1}
                </span>
                <p className="font-display mt-1.5 text-sm font-semibold text-foreground">{node.label}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted">{node.detail}</p>
              </div>
            </motion.li>

            {index < nodes.length - 1 && (
              <li aria-hidden="true" className="flex justify-start pl-6 xl:items-center xl:justify-center xl:pl-0">
                <motion.span
                  className="text-accent-soft"
                  animate={reduceMotion ? undefined : { opacity: [0.35, 1, 0.35] }}
                  transition={{ duration: 2.4, repeat: Infinity, delay: index * 0.3, ease: "easeInOut" }}
                >
                  <ArrowRight className="h-4 w-4 rotate-90 xl:rotate-0" />
                </motion.span>
              </li>
            )}
          </Fragment>
        ))}
      </ol>
    </div>
  );
}
