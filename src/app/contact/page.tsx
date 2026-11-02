import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { Github, Linkedin } from "@/components/ui/brand-icons";
import { ContactForm } from "@/components/contact/contact-form";
import { SectionHeading } from "@/components/ui/section-heading";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with NAVEEN R about AI engineering, educational technology or innovative software solutions.",
};

const CARD = "glass glass-hover flex items-start gap-4 rounded-2xl p-5";
const ICON = "btn-gradient flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white";

export default function ContactPage() {
  return (
    <section aria-labelledby="contact-title" className="container-page pb-24 pt-16 sm:pt-20">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-16">
        <div className="space-y-10">
          <SectionHeading
            as="h1"
            id="contact-title"
            eyebrow="Contact"
            title="Let's Build Something Intelligent."
            description="Interested in artificial intelligence, educational technology, or innovative software solutions? Let's connect."
          />

          <ul className="space-y-4" aria-label="Contact channels">
            <li>
              {profile.email ? (
                <a href={`mailto:${profile.email}`} className={CARD}>
                  <span className={ICON}><Mail className="h-5 w-5" aria-hidden="true" /></span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-foreground">Email</span>
                    <span className="block truncate text-sm text-muted">{profile.email}</span>
                  </span>
                </a>
              ) : (
                <div className={CARD}>
                  <span className={ICON}><Mail className="h-5 w-5" aria-hidden="true" /></span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-foreground">Email</span>
                    <span className="block text-sm text-subtle">Address to be added</span>
                  </span>
                </div>
              )}
            </li>
            <li>
              {profile.linkedinUrl ? (
                <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" className={CARD}>
                  <span className={ICON}><Linkedin className="h-5 w-5" aria-hidden="true" /></span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-foreground">LinkedIn</span>
                    <span className="block text-sm text-muted">Professional profile</span>
                  </span>
                </a>
              ) : (
                <div className={CARD}>
                  <span className={ICON}><Linkedin className="h-5 w-5" aria-hidden="true" /></span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-foreground">LinkedIn</span>
                    <span className="block text-sm text-subtle">Link to be added</span>
                  </span>
                </div>
              )}
            </li>
            <li>
              {profile.githubUrl ? (
                <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" className={CARD}>
                  <span className={ICON}><Github className="h-5 w-5" aria-hidden="true" /></span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-foreground">GitHub</span>
                    <span className="block text-sm text-muted">Code and experiments</span>
                  </span>
                </a>
              ) : (
                <div className={CARD}>
                  <span className={ICON}><Github className="h-5 w-5" aria-hidden="true" /></span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-foreground">GitHub</span>
                    <span className="block text-sm text-subtle">Link to be added</span>
                  </span>
                </div>
              )}
            </li>
          </ul>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
