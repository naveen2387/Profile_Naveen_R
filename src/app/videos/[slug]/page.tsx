import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { VideoPlayer } from "@/components/video/video-player";
import { VideoCard } from "@/components/video/video-card";
import { Chip } from "@/components/ui/chip";
import { SectionHeading } from "@/components/ui/section-heading";
import { getAvailableVideo, getAvailableVideos } from "@/lib/catalog";
import { formatDate, formatDuration } from "@/lib/utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAvailableVideos("explainer").map((video) => ({ slug: video.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const video = getAvailableVideo(slug, "explainer");
  if (!video) return { title: "Video not found" };
  return {
    title: video.title,
    description: video.description,
  };
}

export default async function VideoDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const video = getAvailableVideo(slug, "explainer");
  if (!video) notFound();

  const related = getAvailableVideos("explainer")
    .filter((other) => other.id !== video.id && (other.subject === video.subject || other.classLevel === video.classLevel))
    .slice(0, 3);

  const details = [
    { label: "Class", value: `Class ${video.classLevel}` },
    { label: "Subject", value: video.subject },
    { label: "Concept", value: video.concept },
    { label: "Duration", value: formatDuration(video.durationSeconds) },
    { label: "Language", value: video.language },
    { label: "Created", value: formatDate(video.creationDate) },
  ];

  return (
    <article className="container-page pb-24 pt-10 sm:pt-14">
      <Link
        href="/videos"
        className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back to educational videos
      </Link>

      <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-12">
        <div className="space-y-8">
          <VideoPlayer
            src={video.videoPath}
            title={video.title}
            poster={video.thumbnailAvailable ? video.thumbnailPath : undefined}
          />

          <div className="space-y-5">
            <div className="flex flex-wrap gap-2">
              <Chip className="border-accent-soft/30 text-accent-soft">Class {video.classLevel}</Chip>
              <Chip>{video.subject}</Chip>
              <Chip>{video.concept}</Chip>
            </div>
            <h1 className="font-display text-3xl font-bold leading-tight text-foreground sm:text-4xl">{video.title}</h1>
            <p className="max-w-3xl text-base leading-relaxed text-muted">{video.description}</p>
          </div>
        </div>

        <aside aria-label="Video details" className="space-y-6">
          <section className="glass rounded-3xl p-6">
            <h2 className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-subtle">Details</h2>
            <dl className="mt-5 divide-y divide-border">
              {details.map((item) => (
                <div key={item.label} className="flex items-center justify-between gap-4 py-3">
                  <dt className="text-sm text-muted">{item.label}</dt>
                  <dd className="text-right text-sm font-medium text-foreground">{item.value}</dd>
                </div>
              ))}
            </dl>
          </section>
        </aside>
      </div>

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="mt-24 space-y-8">
          <SectionHeading id="related-title" eyebrow="Keep learning" title="More explainer videos" />
          <ul className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {related.map((item) => (
              <li key={item.id} className="h-full">
                <VideoCard video={item} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
