import Link from "next/link";
import { Mail } from "lucide-react";
import { Github, Linkedin } from "@/components/ui/brand-icons";
import { Logo } from "@/components/layout/logo";
import { NAV_ITEMS, SITE } from "@/lib/site";
import { profile } from "@/data/profile";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const socials = [
    profile.linkedinUrl && { href: profile.linkedinUrl, label: "LinkedIn", icon: Linkedin },
    profile.githubUrl && { href: profile.githubUrl, label: "GitHub", icon: Github },
    profile.email && { href: `mailto:${profile.email}`, label: "Email", icon: Mail },
  ].filter(Boolean) as { href: string; label: string; icon: React.ComponentType<{ className?: string }> }[];

  return (
    <footer className="relative mt-24 border-t border-border">
      <div className="container-page grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="space-y-4">
          <Logo />
          <p className="max-w-sm text-sm leading-relaxed text-muted">{SITE.tagline}</p>
          <p className="max-w-sm text-sm leading-relaxed text-subtle">{SITE.positioning}.</p>
        </div>

        <nav aria-label="Footer" className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-subtle">Explore</p>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-muted transition-colors hover:text-foreground">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-subtle">Connect</p>
          {socials.length > 0 ? (
            <ul className="flex flex-col gap-2 text-sm">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target={social.label === "Email" ? undefined : "_blank"}
                    rel={social.label === "Email" ? undefined : "noopener noreferrer"}
                    className="inline-flex items-center gap-2 text-muted transition-colors hover:text-foreground"
                  >
                    <social.icon className="h-4 w-4" aria-hidden="true" />
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted">
              <Link href="/contact" className="text-accent-soft hover:text-foreground">
                Get in touch
              </Link>{" "}
              through the contact page.
            </p>
          )}
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {SITE.legalName}. All rights reserved.</p>
          <p>Built with Next.js, React, TypeScript and Tailwind CSS.</p>
        </div>
      </div>
    </footer>
  );
}
