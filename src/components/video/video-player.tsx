"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { AlertCircle, Maximize, Minimize, Pause, Play, Volume1, Volume2, VolumeX } from "lucide-react";
import { cn, formatDuration } from "@/lib/utils";

const PLAYBACK_SPEEDS = [0.5, 0.75, 1, 1.25, 1.5, 2];
const SEEK_STEP_SECONDS = 5;

interface VideoPlayerProps {
  src: string;
  title: string;
  poster?: string;
  autoPlay?: boolean;
  className?: string;
}

/**
 * HTML5 video with custom controls: play/pause, timeline, volume, playback speed and fullscreen.
 * Keyboard: Space/K play-pause, ←/→ seek 5s, M mute, F fullscreen.
 */
export function VideoPlayer({
  src,
  title,
  poster,
  autoPlay = false,
  className,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [rate, setRate] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const onChange = () => setIsFullscreen(document.fullscreenElement === containerRef.current);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => setFailed(true));
    } else {
      video.pause();
    }
  }, []);

  const seekTo = useCallback((seconds: number) => {
    const video = videoRef.current;
    if (!video) return;
    const clamped = Math.min(Math.max(seconds, 0), video.duration || 0);
    video.currentTime = clamped;
    setCurrent(clamped);
  }, []);

  const changeVolume = (value: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.volume = value;
    video.muted = value === 0;
    setVolume(value);
    setMuted(value === 0);
  };

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  }, []);

  const changeRate = (value: number) => {
    const video = videoRef.current;
    if (video) video.playbackRate = value;
    setRate(value);
  };

  const toggleFullscreen = useCallback(async () => {
    const container = containerRef.current;
    if (!container) return;
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await container.requestFullscreen();
      }
    } catch {
      // Fullscreen can be refused by the browser or an embedding context; the page keeps working.
    }
  }, []);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    // Let native controls handle their own keys (Space on a button would otherwise toggle twice).
    if (["INPUT", "SELECT", "BUTTON"].includes(target.tagName)) return;

    switch (event.key) {
      case " ":
      case "k":
      case "K":
        event.preventDefault();
        togglePlay();
        break;
      case "ArrowLeft":
        event.preventDefault();
        seekTo(current - SEEK_STEP_SECONDS);
        break;
      case "ArrowRight":
        event.preventDefault();
        seekTo(current + SEEK_STEP_SECONDS);
        break;
      case "m":
      case "M":
        toggleMute();
        break;
      case "f":
      case "F":
        void toggleFullscreen();
        break;
    }
  };

  const progress = duration > 0 ? (current / duration) * 100 : 0;
  const VolumeIcon = muted || volume === 0 ? VolumeX : volume < 0.5 ? Volume1 : Volume2;
  const FullscreenIcon = isFullscreen ? Minimize : Maximize;

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      role="group"
      aria-label={`Video player: ${title}`}
      onKeyDown={onKeyDown}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-black shadow-2xl shadow-black/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-soft",
        isFullscreen && "rounded-none border-0",
        className,
      )}
    >
      <div
        className={cn(
          "relative flex flex-1 items-center justify-center overflow-hidden bg-black aspect-video w-full",
          isFullscreen && "h-full max-h-none w-full",
        )}
      >
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          preload="metadata"
          playsInline
          autoPlay={autoPlay}
          aria-label={title}
          onClick={togglePlay}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
          onTimeUpdate={(event) => setCurrent(event.currentTarget.currentTime)}
          onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
          onError={() => setFailed(true)}
          className="h-full w-full cursor-pointer object-contain"
        />

        {!playing && !failed && (
          <button
            type="button"
            onClick={togglePlay}
            aria-label="Play video"
            className="btn-gradient absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-white shadow-xl transition-transform duration-300 hover:scale-105"
          >
            <Play className="ml-1 h-7 w-7 fill-current" aria-hidden="true" />
          </button>
        )}

        {failed && (
          <div role="alert" className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-background/90 p-6 text-center">
            <AlertCircle className="h-8 w-8 text-warning" aria-hidden="true" />
            <p className="text-sm text-foreground">This video could not be played in your browser.</p>
            <p className="text-xs text-muted">Try another browser, or check that the MP4 file is complete.</p>
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 bg-gradient-to-t from-black via-black/90 to-black/70 px-3 py-3 sm:px-4">
        <button
          type="button"
          onClick={togglePlay}
          aria-label={playing ? "Pause" : "Play"}
          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-foreground transition-colors hover:bg-white/10"
        >
          {playing ? <Pause className="h-5 w-5 fill-current" aria-hidden="true" /> : <Play className="h-5 w-5 fill-current" aria-hidden="true" />}
        </button>

        <span className="shrink-0 font-mono text-xs tabular-nums text-muted" aria-live="off">
          {formatDuration(current)} / {formatDuration(duration)}
        </span>

        <input
          type="range"
          min={0}
          max={duration || 0}
          step={0.1}
          value={current}
          onChange={(event) => seekTo(Number(event.target.value))}
          aria-label="Seek"
          aria-valuetext={`${formatDuration(current)} of ${formatDuration(duration)}`}
          style={{ ["--progress"]: `${progress}%` } as CSSProperties}
          className="order-last h-5 w-full min-w-[8rem] flex-1 sm:order-none"
        />

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={toggleMute}
            aria-label={muted ? "Unmute" : "Mute"}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-foreground transition-colors hover:bg-white/10"
          >
            <VolumeIcon className="h-5 w-5" aria-hidden="true" />
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={muted ? 0 : volume}
            onChange={(event) => changeVolume(Number(event.target.value))}
            aria-label="Volume"
            style={{ ["--progress"]: `${(muted ? 0 : volume) * 100}%` } as CSSProperties}
            className="hidden h-5 w-20 sm:block"
          />
        </div>

        <label className="sr-only" htmlFor={`speed-${title.replace(/\s+/g, "-").toLowerCase()}`}>
          Playback speed
        </label>
        <select
          id={`speed-${title.replace(/\s+/g, "-").toLowerCase()}`}
          value={rate}
          onChange={(event) => changeRate(Number(event.target.value))}
          className="h-9 cursor-pointer rounded-full border border-border bg-surface px-3 text-xs font-medium text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-soft"
        >
          {PLAYBACK_SPEEDS.map((speed) => (
            <option key={speed} value={speed} className="bg-surface">
              {speed}×
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={() => void toggleFullscreen()}
          aria-label={isFullscreen ? "Exit full screen" : "Enter full screen"}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full text-foreground transition-colors hover:bg-white/10"
        >
          <FullscreenIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
