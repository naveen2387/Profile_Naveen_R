import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, Play } from "lucide-react";
import { Chip } from "@/components/ui/chip";
import type { AvailableVideo } from "@/lib/catalog";
import { formatDate, formatDuration } from "@/lib/utils";

/** Landscape explainer card. Renders a styled placeholder when no thumbnail file exists. */
export function VideoCard({ video }: { video: AvailableVideo }) {
  const href = `/videos/${video.id}`;

  return (
    <article className="glass glass-hover group flex h-full flex-col overflow-hidden rounded-2xl">
      <Link href={href} tabIndex={-1} aria-hidden="true" className="relative block aspect-video overflow-hidden bg-surface">
        {video.thumbnailAvailable ? (
          <Image
            src={video.thumbnailPath}
            alt=""
            fill
            sizes="(min-width: 1280px) 400px, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <VideoThumbnailPlaceholder concept={video.concept} />
        )}
        <span className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
        <span className="absolute bottom-3 right-3 rounded-md bg-black/70 px-2 py-1 font-mono text-xs text-white">
          {formatDuration(video.durationSeconds)}
        </span>
      </Link>

      <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
        <div className="flex flex-wrap gap-2">
          <Chip className="border-accent-soft/30 text-accent-soft">Class {video.classLevel}</Chip>
          <Chip>{video.subject}</Chip>
        </div>

        <div className="space-y-2">
          <h3 className="font-display text-lg font-semibold leading-snug text-foreground">{video.title}</h3>
          <p className="text-sm text-accent-soft/90">Concept: {video.concept}</p>
          <p className="line-clamp-3 text-sm leading-relaxed text-muted">{video.description}</p>
        </div>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
          <div className="flex items-center gap-4 text-xs text-subtle">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
              {formatDuration(video.durationSeconds)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
              {formatDate(video.creationDate)}
            </span>
          </div>
          <Link
            href={href}
            className="btn-gradient inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5"
          >
            <Play className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
            Watch Video
          </Link>
        </div>
      </div>
    </article>
  );
}

export function VideoThumbnailPlaceholder({ concept }: { concept: string }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-surface-raised via-surface to-background">
      <div className="absolute inset-0 bg-grid opacity-60" aria-hidden="true" />
      <div className="btn-gradient relative flex h-12 w-12 items-center justify-center rounded-full text-white">
        <Play className="ml-0.5 h-5 w-5 fill-current" aria-hidden="true" />
      </div>
      <p className="relative px-6 text-center font-display text-sm text-muted">{concept}</p>
    </div>
  );
}
