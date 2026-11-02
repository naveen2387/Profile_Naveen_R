import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { WorkflowSteps } from "@/components/workflow/workflow-steps";
import { SectionHeading } from "@/components/ui/section-heading";
import { workflowSteps } from "@/data/workflow";

export const metadata: Metadata = {
  title: "Video Production Workflow",
  description:
    "How NAVEEN R produces educational videos: concept research, AI-assisted scripts, storyboards, visual production and final edit.",
};

export default function WorkflowPage() {
  return (
    <>
      <section aria-labelledby="workflow-title" className="container-page pb-16 pt-16 sm:pt-20">
        <SectionHeading
          as="h1"
          id="workflow-title"
          eyebrow="Production workflow"
          title="From Concepts to Visual Learning."
          description="Every educational video moves through five stages, from choosing a concept to the final edit. AI helps with drafting and visuals; every fact and explanation is reviewed before publication."
        />
      </section>

      <section aria-label="Production stages" className="container-page pb-24">
        <WorkflowSteps steps={workflowSteps} />
      </section>

      <section aria-label="Next steps" className="container-page pb-24">
        <div className="glass relative overflow-hidden rounded-3xl p-8 sm:p-12">
          <div aria-hidden="true" className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-violet/20 blur-3xl" />
          <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div className="space-y-2">
              <h2 className="font-display text-2xl font-semibold text-foreground">See the finished work</h2>
              <p className="max-w-xl text-sm leading-relaxed text-muted">
                Explainer videos from this workflow, filterable by class, subject and length.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/videos" className="btn-gradient inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white">
                Explainer videos
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
