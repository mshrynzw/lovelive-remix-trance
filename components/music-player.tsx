"use client";

import * as React from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  Pause,
  Play,
  SkipBack,
  SkipForward,
  AlertCircle,
  Volume2,
  Volume1,
  VolumeX,
} from "lucide-react";
import { usePlayer } from "@/components/providers/player-provider";
import { formatTime } from "@/lib/utils";

function canHoverFinePointer() {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

function VolumeControl() {
  const { volume, isMuted, setVolume, toggleMute } = usePlayer();
  const [pinned, setPinned] = React.useState(false);
  const wrapRef = React.useRef<HTMLDivElement>(null);

  const displayVolume = isMuted ? 0 : volume;
  const percent = Math.round(displayVolume * 100);

  React.useEffect(() => {
    if (!pinned) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!wrapRef.current?.contains(event.target as Node)) {
        setPinned(false);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [pinned]);

  const onIconClick = () => {
    if (!canHoverFinePointer() && !pinned) {
      setPinned(true);
      return;
    }
    toggleMute();
  };

  const VolumeIcon =
    percent === 0 ? VolumeX : percent < 50 ? Volume1 : Volume2;

  return (
    <div
      ref={wrapRef}
      className={`player-volume group flex shrink-0 flex-row-reverse items-center gap-1.5 ${
        pinned ? "is-pinned" : ""
      }`}
    >
      <button
        type="button"
        onClick={onIconClick}
        aria-label={percent === 0 ? "ミュート解除" : "ミュート"}
        aria-pressed={percent === 0}
        className="rounded-full p-1 text-ink-soft transition-colors hover:text-aurora-ice focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora-mint"
      >
        <VolumeIcon className="h-4 w-4" />
      </button>
      <div className="player-volume-slider-wrap">
        <input
          type="range"
          min={0}
          max={100}
          step={1}
          value={percent}
          onChange={(e) => setVolume(Number(e.target.value) / 100)}
          aria-label="音量"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={percent}
          className="player-seek player-volume-slider h-1.5 cursor-pointer appearance-none rounded-full bg-white/10 accent-aurora-mint"
          style={{
            background: `linear-gradient(90deg, #4FFFB0 ${percent}%, rgba(255,255,255,0.12) ${percent}%)`,
          }}
        />
      </div>
    </div>
  );
}

/**
 * Persistent, Spotify-like mini player docked to the bottom of the
 * viewport. Only appears once a track has been selected, so the hero
 * loads clean and uncluttered.
 */
export function MusicPlayer() {
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    hasError,
    togglePlay,
    seek,
    playNext,
    playPrev,
  } = usePlayer();

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <AnimatePresence>
      {currentTrack && (
        <motion.div
          initial={{ y: 96, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 96, opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-0 bottom-0 z-50 px-3 pb-3 sm:px-6 sm:pb-6"
          role="region"
          aria-label="ミュージックプレイヤー"
        >
          <div className="glass mx-auto flex max-w-3xl flex-col gap-3 rounded-2xl px-4 py-3 shadow-card sm:flex-row sm:items-center sm:gap-4 sm:px-6 sm:py-4">
            <div className="flex min-w-0 items-center gap-3">
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg ring-1 ring-aurora-ice/20">
                <Image
                  src={currentTrack.cover}
                  alt=""
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
              <div className="min-w-0">
                <p className="truncate font-serif text-base font-medium text-ink-light">
                  {currentTrack.title}
                </p>
                <p className="truncate font-jp text-xs text-ink-soft/70">
                  {currentTrack.subtitle}
                </p>
              </div>
            </div>

            <div className="flex flex-1 flex-col gap-2">
              <div className="relative flex items-center justify-center gap-4 pr-9 sm:justify-start sm:pr-0">
                <button
                  onClick={playPrev}
                  aria-label="前の曲"
                  className="text-ink-soft transition-colors hover:text-aurora-ice focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora-mint rounded-full p-1"
                >
                  <SkipBack className="h-4 w-4" fill="currentColor" />
                </button>
                <button
                  onClick={togglePlay}
                  aria-label={isPlaying ? "一時停止" : "再生"}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-aurora-cyan to-aurora-mint text-night-deep shadow-glow transition-transform hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora-ice focus-visible:ring-offset-2 focus-visible:ring-offset-night-deep"
                >
                  {isPlaying ? (
                    <Pause className="h-4 w-4" fill="currentColor" />
                  ) : (
                    <Play className="ml-0.5 h-4 w-4" fill="currentColor" />
                  )}
                </button>
                <button
                  onClick={playNext}
                  aria-label="次の曲"
                  className="text-ink-soft transition-colors hover:text-aurora-ice focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora-mint rounded-full p-1"
                >
                  <SkipForward className="h-4 w-4" fill="currentColor" />
                </button>

                <div className="absolute right-0 sm:static sm:ml-auto">
                  <VolumeControl />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-9 shrink-0 text-right font-jp text-[11px] tabular-nums text-ink-soft/60">
                  {formatTime(currentTime)}
                </span>
                <input
                  type="range"
                  min={0}
                  max={duration || 0}
                  value={currentTime}
                  step={0.1}
                  onChange={(e) => seek(Number(e.target.value))}
                  aria-label="再生位置"
                  className="player-seek h-1.5 flex-1 cursor-pointer appearance-none rounded-full bg-white/10 accent-aurora-mint"
                  style={{
                    background: `linear-gradient(90deg, #4FFFB0 ${progress}%, rgba(255,255,255,0.12) ${progress}%)`,
                  }}
                />
                <span className="w-9 shrink-0 font-jp text-[11px] tabular-nums text-ink-soft/60">
                  {formatTime(duration)}
                </span>
              </div>
            </div>

            {hasError && (
              <div
                className="flex items-center gap-1.5 text-[11px] text-aurora-ice/70"
                role="status"
              >
                <AlertCircle className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">
                  音源ファイル未検出（/public/audio/）
                </span>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
