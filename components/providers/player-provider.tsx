"use client";

import * as React from "react";
import { tracks, type Track } from "@/lib/tracks";

type PlayerContextValue = {
  currentTrack: Track | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  /** true once the browser reports it can play the current source */
  isReady: boolean;
  hasError: boolean;
  playTrack: (track: Track) => void;
  togglePlay: () => void;
  seek: (time: number) => void;
  playNext: () => void;
  playPrev: () => void;
};

const PlayerContext = React.createContext<PlayerContextValue | null>(null);

export function usePlayer() {
  const ctx = React.useContext(PlayerContext);
  if (!ctx) {
    throw new Error("usePlayer must be used within <PlayerProvider>");
  }
  return ctx;
}

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const [currentTrack, setCurrentTrack] = React.useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const [isReady, setIsReady] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);

  React.useEffect(() => {
    const audio = new Audio();
    audio.preload = "metadata";
    audioRef.current = audio;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoadedMetadata = () => {
      setDuration(audio.duration || 0);
      setIsReady(true);
      setHasError(false);
    };
    const onEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };
    const onError = () => {
      setHasError(true);
      setIsReady(false);
      setIsPlaying(false);
    };
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("error", onError);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("error", onError);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.pause();
    };
  }, []);

  const loadAndPlay = React.useCallback((track: Track) => {
    const audio = audioRef.current;
    if (!audio) return;
    setIsReady(false);
    setHasError(false);
    setCurrentTime(0);
    audio.src = track.audioSrc;
    audio.load();
    audio.play().catch(() => {
      // Autoplay blocked or file missing — surfaced via the `error`
      // event / play button state, no need to throw.
    });
  }, []);

  const playTrack = React.useCallback(
    (track: Track) => {
      if (currentTrack?.id === track.id) {
        const audio = audioRef.current;
        if (!audio) return;
        if (audio.paused) {
          audio.play().catch(() => setHasError(true));
        } else {
          audio.pause();
        }
        return;
      }
      setCurrentTrack(track);
      loadAndPlay(track);
    },
    [currentTrack, loadAndPlay]
  );

  const togglePlay = React.useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!currentTrack) {
      const first = tracks[0];
      if (first) playTrack(first);
      return;
    }
    if (audio.paused) {
      audio.play().catch(() => setHasError(true));
    } else {
      audio.pause();
    }
  }, [currentTrack, playTrack]);

  const seek = React.useCallback((time: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = time;
    setCurrentTime(time);
  }, []);

  const playNext = React.useCallback(() => {
    if (!currentTrack) {
      const first = tracks[0];
      if (first) playTrack(first);
      return;
    }
    const idx = tracks.findIndex((t) => t.id === currentTrack.id);
    const next = tracks[(idx + 1) % tracks.length];
    if (next) {
      setCurrentTrack(next);
      loadAndPlay(next);
    }
  }, [currentTrack, loadAndPlay, playTrack]);

  const playPrev = React.useCallback(() => {
    if (!currentTrack) return;
    const idx = tracks.findIndex((t) => t.id === currentTrack.id);
    const prev = tracks[(idx - 1 + tracks.length) % tracks.length];
    if (prev) {
      setCurrentTrack(prev);
      loadAndPlay(prev);
    }
  }, [currentTrack, loadAndPlay]);

  const value: PlayerContextValue = {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    isReady,
    hasError,
    playTrack,
    togglePlay,
    seek,
    playNext,
    playPrev,
  };

  return (
    <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
  );
}
