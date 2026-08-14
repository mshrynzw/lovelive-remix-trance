"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Pause, Play, Youtube } from "lucide-react";
import { usePlayer } from "@/components/providers/player-provider";
import { formatTime } from "@/lib/utils";
import { trackPath, trackSeriesPhrase, type Track } from "@/lib/tracks";

type TrackDetailProps = {
  track: Track;
  prev: Track | null;
  next: Track | null;
};

export function TrackDetail({ track, prev, next }: TrackDetailProps) {
  const { currentTrack, isPlaying, playTrack } = usePlayer();
  const isActive = currentTrack?.id === track.id;
  const isActivePlaying = isActive && isPlaying;

  return (
    <article className="relative pb-32 pt-28 sm:pt-32">
      <div className="container">
        <Link
          href="/#tracks"
          className="mb-10 inline-flex items-center gap-2 font-jp text-xs tracking-widest text-ink-soft/70 transition-colors hover:text-aurora-ice"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Track List
        </Link>

        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-3xl shadow-card ring-1 ring-aurora-ice/15"
          >
            <Image
              src={track.cover}
              alt={`${track.title} ジャケット`}
              fill
              priority
              sizes="(min-width: 1024px) 480px, 90vw"
              className="object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-8"
          >
            <div className="flex flex-col gap-3">
              <span className="font-jp text-xs tracking-widest3 text-aurora-mint/80">
                TRACK {String(track.index).padStart(2, "0")}
              </span>
              <h1 className="font-display text-3xl tracking-wide text-ink-light sm:text-4xl md:text-5xl">
                {track.title}
              </h1>
              {track.titleEn ? (
                <p className="font-serif text-lg italic text-ink-soft/70">
                  {track.titleEn}
                </p>
              ) : null}
              <p className="font-jp text-sm text-ink-soft/60">{track.subtitle}</p>
            </div>

            <p className="max-w-xl font-jp text-base leading-loose text-ink-soft/85">
              {trackSeriesPhrase(track)}の Uplifting Trance
              リミックス。Kaoru Yuki (Snowdome World)
              によるアレンジを、このページから試聴できます。
            </p>

            <dl className="flex flex-wrap gap-x-8 gap-y-3 font-jp text-sm text-ink-soft/80">
              <div>
                <dt className="text-xs tracking-widest text-aurora-ice/70">BPM</dt>
                <dd className="mt-1">{track.bpm}</dd>
              </div>
              <div>
                <dt className="text-xs tracking-widest text-aurora-ice/70">Key</dt>
                <dd className="mt-1">{track.key}</dd>
              </div>
              <div>
                <dt className="text-xs tracking-widest text-aurora-ice/70">Time</dt>
                <dd className="mt-1">{formatTime(track.duration)}</dd>
              </div>
              <div>
                <dt className="text-xs tracking-widest text-aurora-ice/70">
                  Released
                </dt>
                <dd className="mt-1">{track.releasedAt}</dd>
              </div>
            </dl>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => playTrack(track)}
                aria-pressed={isActivePlaying}
                className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-aurora-cyan to-aurora-mint px-8 py-3.5 font-jp text-sm font-semibold tracking-widest text-night-deep shadow-glow transition-all duration-500 hover:shadow-glow-mint hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora-ice"
              >
                {isActivePlaying ? (
                  <Pause className="h-4 w-4" fill="currentColor" />
                ) : (
                  <Play className="h-4 w-4" fill="currentColor" />
                )}
                {isActivePlaying ? "Pause" : "Play"}
              </button>
              <a
                href={track.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-aurora-ice/30 px-6 py-3.5 font-jp text-sm tracking-wide text-ink-soft transition-all hover:border-aurora-ice/60 hover:text-aurora-ice"
              >
                <Youtube className="h-4 w-4" />
                YouTube
              </a>
            </div>

            <nav
              aria-label="前後の曲"
              className="mt-4 flex flex-wrap items-center justify-between gap-4 border-t border-white/5 pt-8"
            >
              {prev ? (
                <Link
                  href={trackPath(prev)}
                  className="group max-w-[45%] font-jp text-xs text-ink-soft/60 transition-colors hover:text-aurora-ice"
                >
                  <span className="block tracking-widest text-aurora-mint/70">
                    PREV
                  </span>
                  <span className="mt-1 block text-sm text-ink-soft group-hover:text-aurora-ice">
                    {prev.title}
                  </span>
                </Link>
              ) : (
                <span />
              )}
              {next ? (
                <Link
                  href={trackPath(next)}
                  className="group max-w-[45%] text-right font-jp text-xs text-ink-soft/60 transition-colors hover:text-aurora-ice"
                >
                  <span className="block tracking-widest text-aurora-mint/70">
                    NEXT
                  </span>
                  <span className="mt-1 block text-sm text-ink-soft group-hover:text-aurora-ice">
                    {next.title}
                  </span>
                </Link>
              ) : null}
            </nav>
          </motion.div>
        </div>
      </div>
    </article>
  );
}
