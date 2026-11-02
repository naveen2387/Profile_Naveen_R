import type { Metadata } from "next";
import Image from "next/image";
import { Download, FileText } from "lucide-react";
import { Github, Linkedin } from "@/components/ui/brand-icons";
import { ExperienceTimeline } from "@/components/about/experience-timeline";
import { Chip } from "@/components/ui/chip";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { experience, profile } from "@/data/profile";
import { publicFileExists } from "@/lib/assets";

export const metadata: Metadata = {
  title: "About Naveen",
  description:
    "About Naveen R: AI-focused developer and educational video producer building intelligent applications and engaging learning content.",
};

const LINK_STYLE =
  "glass inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-border-strong";
const MUTED_STYLE = "inline-flex items-center gap-2 rounded-full border border-dashed border-border px-5 py-2.5 text-sm text-subtle";

export default function AboutPage() {
  const photoAvailable = publicFileExists(profile.photoPath);
  const resumeAvailable = publicFileExists(profile.resumePath);
  const initials = profile.name
    .split(/\s+/)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <>
      <section aria-labelledby="about-title" className="container-page grid gap-12 pb-20 pt-16 sm:pt-20 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] lg:gap-16">
        <Reveal>
          <div className="space-y-6">
            <div className="glass relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-3xl lg:mx-0">
              {photoAvailable && profile.photoPath ? (
                <Image
                  src={profile.photoPath}
                  alt={`Portrait of ${profile.name}`}
                  fill
                  priority
                  sizes="(min-width: 1024px) 380px, 80vw"
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-surface-raised via-surface to-background">
                  <div className="bg-grid absolute inset-0 opacity-60" aria-hidden="true" />
                  <span className="btn-gradient font-display relative flex h-24 w-24 items-center justify-center rounded-full text-3xl font-bold text-white">
                    {initials}
                  </span>
                  <span className="relative text-xs text-subtle">Profile photo placeholder</span>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-3">
              {resumeAvailable && profile.resumePath ? (
                <a href={profile.resumePath} download className="btn-gradient inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white">
                  <Download className="h-4 w-4" aria-hidden="true" />
                  Download Resume
                </a>
              ) : (
                <span className={MUTED_STYLE}>
                  <FileText className="h-4 w-4" aria-hidden="true" />
                  Resume to be added
                </span>
              )}

              {profile.linkedinUrl ? (
                <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" className={LINK_STYLE}>
                  <Linkedin className="h-4 w-4" aria-hidden="true" />
                  LinkedIn
                </a>
              ) : (
                <span className={MUTED_STYLE}>
                  <Linkedin className="h-4 w-4" aria-hidden="true" />
                  LinkedIn link to be added
                </span>
              )}

              {profile.githubUrl ? (
                <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" className={LINK_STYLE}>
                  <Github className="h-4 w-4" aria-hidden="true" />
                  GitHub
                </a>
              ) : (
                <span className={MUTED_STYLE}>
                  <Github className="h-4 w-4" aria-hidden="true" />
                  GitHub link to be added
                </span>
              )}
            </div>
          </div>
        </Reveal>

        <div className="space-y-10">
          <SectionHeading id="about-title" eyebrow="About me" title="Behind the Innovation." as="h1" />

          <div className="space-y-5">
            {profile.intro.map((paragraph) => (
              <p key={paragraph} className="text-base leading-relaxed text-muted sm:text-lg">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="space-y-4">
            <h2 className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-subtle">Technical interests</h2>
            <ul className="flex flex-wrap gap-2">
              {profile.interests.map((interest) => (
                <li key={interest}>
                  <Chip className="px-3.5 py-1.5 text-sm">{interest}</Chip>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="experience-title" className="container-page pb-24">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:gap-16">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading
              id="experience-title"
              eyebrow="Journey"
              title="Experience & Achievements"
              description="Engineering projects, leadership and sport: the activities that shaped how I work."
            />
          </div>
          <ExperienceTimeline items={experience} />
        </div>
      </section>
    </>
  );
}
