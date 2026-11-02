import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { VideoPlayer } from "@/components/video/video-player";
import { SectionHeading } from "@/components/ui/section-heading";
import { getAvailablePromos } from "@/lib/catalog";
import { formatDuration } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Promo Reels",
  description:
    "Promotional and motion-graphics reels by NAVEEN R, kept apart from the educational video library.",
};

export default function PromosPage() {
  const promos = getAvailablePromos();

  return (
    <>
      <section aria-labelledby="promos-title" className="container-page pb-12 pt-16 sm:pt-20">
        <SectionHeading
          as="h1"
          id="promos-title"
          eyebrow="Promo reels"
          title="Promotional & Motion Graphics"
          description="Short promotional and motion-graphics reels, kept separate from the educational video library."
        />

        <div className="mt-10">
          <Link
            href="/videos"
            className="inline-flex items-center gap-2 text-sm text-accent-soft transition-colors hover:text-foreground"
          >
            Back to the educational videos
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section aria-label="Promo reel gallery" className="container-page pb-24">
        {promos.length > 0 ? (
          <ul className="grid gap-8">
            {promos.map((promo) => (
              <li
                key={promo.id}
                className="glass grid gap-6 rounded-3xl p-5 sm:p-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:items-center"
              >
                <VideoPlayer
                  src={promo.videoPath}
                  title={promo.title}
                  poster={promo.thumbnailAvailable ? promo.thumbnailPath : undefined}
                />
                <div className="space-y-4">
                  <p className="font-mono text-xs text-accent-soft">{formatDuration(promo.durationSeconds)}</p>
                  <h2 className="font-display text-2xl font-bold text-foreground">{promo.title}</h2>
                  <p className="text-sm leading-relaxed text-muted sm:text-base">{promo.description}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="glass rounded-3xl p-8 text-center text-sm text-muted">No promo reels are published yet.</div>
        )}
      </section>
    </>
  );
}
