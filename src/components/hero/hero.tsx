"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { NeuralCanvas } from "@/components/hero/neural-canvas";
import { Chip } from "@/components/ui/chip";
import { ButtonLink } from "@/components/ui/button-link";

const HIGHLIGHTS = [
  "Artificial Intelligence",
  "Machine Learning",
  "Generative AI",
  "Large Language Models",
  "RAG Systems",
  "Educational Video Production",
  "Full-Stack Development",
];

const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const reduceMotion = useReducedMotion();

  const enter = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay, ease: EASE },
        };

  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <NeuralCanvas className="absolute inset-0 h-full w-full opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/40 to-background" />
        <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-background via-background/70 to-transparent lg:w-3/5" />
      </div>

      <div className="container-page flex min-h-[calc(100svh-4rem)] flex-col justify-center gap-10 py-20 lg:min-h-[calc(100svh-5rem)] lg:py-28">
        <motion.p
          {...enter(0)}
          className="glass inline-flex w-fit items-center gap-2.5 rounded-full px-4 py-2 text-xs font-medium text-muted"
        >
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
          </span>
          Personal AI Engineering, Educational Video Production &amp; Technology Portfolio
        </motion.p>

        <div className="max-w-4xl space-y-7">
          <motion.h1
            id="hero-title"
            {...enter(0.1)}
            className="font-display text-5xl font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-7xl"
          >
            Building the Future <span className="text-gradient">with AI.</span>
          </motion.h1>

          <motion.p {...enter(0.2)} className="max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            I&apos;m Naveen, an AI-focused developer passionate about building intelligent applications, creating
            engaging educational experiences, and transforming complex ideas into visual stories.
          </motion.p>

          <motion.ul {...enter(0.3)} className="flex flex-wrap gap-2" aria-label="Areas of focus">
            {HIGHLIGHTS.map((item) => (
              <li key={item}>
                <Chip className="transition-colors hover:border-accent-soft/50 hover:text-foreground">{item}</Chip>
              </li>
            ))}
          </motion.ul>

          <motion.div {...enter(0.4)} className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink href="/projects" icon={<ArrowRight className="h-4 w-4" aria-hidden="true" />}>
              Explore My Work
            </ButtonLink>
            <ButtonLink
              href="/videos"
              variant="secondary"
              icon={<Play className="h-4 w-4 fill-current" aria-hidden="true" />}
            >
              Watch Educational Videos
            </ButtonLink>
          </motion.div>
        </div>

        <motion.div {...enter(0.55)} className="hidden items-center gap-6 text-xs text-subtle sm:flex">
          <span className="font-display tracking-[0.2em] text-muted">IDEAS ENGINEERED.</span>
          <span className="h-px w-12 bg-border-strong" aria-hidden="true" />
          <span className="font-display tracking-[0.2em] text-muted">INTELLIGENCE CREATED.</span>
          <Link href="/about" className="ml-auto text-accent-soft transition-colors hover:text-foreground">
            About Naveen →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
