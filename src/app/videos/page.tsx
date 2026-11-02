import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { VideoGallery } from "@/components/video/video-gallery";
import { VideoEmptyState } from "@/components/video/video-empty-state";
import { SectionHeading } from "@/components/ui/section-heading";
import { getAvailableVideos } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Educational Videos",
  description:
    "Watch educational explainer videos by NAVEEN R: complex academic concepts for Classes 6–10 in Science, Mathematics, Social Science and English.",
};

export default function VideosPage() {
  const explainers = getAvailableVideos("explainer");

  return (
    <>
      <section aria-labelledby="videos-title" className="container-page pb-12 pt-16 sm:pt-20">
        <SectionHeading
          as="h1"
          id="videos-title"
          eyebrow="Video library"
          title="Educational Video Production"
          description="Transforming complex academic concepts into engaging visual learning experiences."
        />

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <nav aria-label="Video sections" className="glass inline-flex rounded-full p-1">
            <Link
              href="/videos"
              aria-current="page"
              className="btn-gradient rounded-full px-5 py-2 text-sm font-semibold text-white"
            >
              Explainer Videos
            </Link>
            <Link href="/promos" className="rounded-full px-5 py-2 text-sm font-medium text-muted transition-colors hover:text-foreground">
              Promo Reels
            </Link>
          </nav>
          <Link
            href="/workflow"
            className="inline-flex items-center gap-2 text-sm text-accent-soft transition-colors hover:text-foreground"
          >
            See how videos are produced
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section aria-label="Explainer video gallery" className="container-page pb-24">
        {explainers.length > 0 ? <VideoGallery videos={explainers} /> : <VideoEmptyState type="explainer" />}
      </section>
    </>
  );
}
