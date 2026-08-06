"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Pause, Play, Youtube } from "lucide-react";
import { usePlayer } from "@/components/providers/player-provider";
import { formatTime } from "@/lib/utils";
import type { Track } from "@/lib/tracks";

export function TrackCard({ track, index }: { track: Track; index: number }) {
  const { currentTrack, isPlaying, playTrack } = usePlayer();
  const isActive = currentTrack?.id === track.id;
  const isActivePlaying = isActive && isPlaying;

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{
        duration: 0.8,
        delay: (index % 3) * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -8 }}
      className="glass group relative flex flex-col overflow-hidden rounded-2xl transition-shadow duration-500 hover:shadow-glow"
    >
      <div className="relative aspect-square w-full overflow-hidden">
        <Image
          src={track.cover}
          alt=""
          fill
          sizes="(min-width: 1024px) 340px, (min-width: 640px) 45vw, 90vw"
          loading="lazy"
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-night-deep/80 via-night-deep/10 to-transparent" />

        {/* <span className="absolute left-4 top-4 font-display text-sm tracking-widest text-ink-light/80">
          {String(track.index).padStart(2, "0")}
        </span> */}

        <button
          onClick={() => playTrack(track)}
          aria-label={
            isActivePlaying ? `${track.title} を一時停止` : `${track.title} を再生`
          }
          aria-pressed={isActivePlaying}
          className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-aurora-cyan to-aurora-mint text-night-deep shadow-glow transition-transform duration-300 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora-ice focus-visible:ring-offset-2 focus-visible:ring-offset-night-deep"
        >
          {isActivePlaying ? (
            <Pause className="h-4 w-4" fill="currentColor" />
          ) : (
            <Play className="ml-0.5 h-4 w-4" fill="currentColor" />
          )}
        </button>

        {isActivePlaying && (
          <div
            className="absolute bottom-4 left-4 flex items-end gap-0.5"
            aria-hidden="true"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="w-0.5 animate-pulse rounded-full bg-aurora-mint"
                style={{
                  height: `${6 + i * 4}px`,
                  animationDelay: `${i * 0.15}s`,
                }}
              />
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <h3 className="font-serif text-xl font-medium leading-snug text-ink-light">
            {track.title}
          </h3>
          <p className="font-jp text-xs text-ink-soft/60">{track.subtitle}</p>
        </div>

        <dl className="flex flex-wrap gap-x-4 gap-y-1 font-jp text-xs text-ink-soft/70">
          <div className="flex items-center gap-1">
            <dt className="text-aurora-ice/70">BPM</dt>
            <dd>{track.bpm}</dd>
          </div>
          <div className="flex items-center gap-1">
            <dt className="text-aurora-ice/70">Key</dt>
            <dd>{track.key}</dd>
          </div>
          <div className="flex items-center gap-1">
            <dt className="text-aurora-ice/70">Time</dt>
            <dd>{formatTime(track.duration)}</dd>
          </div>
        </dl>

        <a
          href={track.youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex items-center justify-center gap-2 rounded-full border border-aurora-ice/25 px-4 py-2.5 font-jp text-xs tracking-wide text-ink-soft transition-all duration-300 hover:border-aurora-ice/60 hover:bg-aurora-ice/5 hover:text-aurora-ice focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora-mint"
        >
          <Youtube className="h-4 w-4" />
          Watch on YouTube
        </a>
      </div>
    </motion.article>
  );
}
