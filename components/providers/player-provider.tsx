"use client";

import * as React from "react";
import { tracks, type Track } from "@/lib/tracks";

const VOLUME_STORAGE_KEY = "ll-trance-volume";
const MUTED_STORAGE_KEY = "ll-trance-muted";
const DEFAULT_VOLUME = 0.7;

type PlayerContextValue = {
  currentTrack: Track | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  /** true once the browser reports it can play the current source */
  isReady: boolean;
  hasError: boolean;
  /** 0–1 linear gain applied to the HTMLAudioElement */
  volume: number;
  isMuted: boolean;
  playTrack: (track: Track) => void;
  togglePlay: () => void;
  seek: (time: number) => void;
  playNext: () => void;
  playPrev: () => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
};

const PlayerContext = React.createContext<PlayerContextValue | null>(null);

export function usePlayer() {
  const ctx = React.useContext(PlayerContext);
  if (!ctx) {
    throw new Error("usePlayer must be used within <PlayerProvider>");
  }
  return ctx;
}

function clampVolume(value: number) {
  if (!Number.isFinite(value)) return DEFAULT_VOLUME;
  return Math.min(1, Math.max(0, value));
}

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const lastVolumeRef = React.useRef(DEFAULT_VOLUME);
  const [currentTrack, setCurrentTrack] = React.useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const [isReady, setIsReady] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);
  const [volume, setVolumeState] = React.useState(DEFAULT_VOLUME);
  const [isMuted, setIsMuted] = React.useState(false);
  const [storageReady, setStorageReady] = React.useState(false);

  React.useEffect(() => {
    const audio = new Audio();
    audio.preload = "metadata";
    audio.volume = DEFAULT_VOLUME;
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

  React.useEffect(() => {
    try {
      const storedVolume = localStorage.getItem(VOLUME_STORAGE_KEY);
      const storedMuted = localStorage.getItem(MUTED_STORAGE_KEY);
      if (storedVolume != null) {
        const next = clampVolume(Number(storedVolume));
        setVolumeState(next);
        if (next > 0) lastVolumeRef.current = next;
      }
      if (storedMuted === "1") setIsMuted(true);
    } catch {
      // ignore quota / private-mode failures
    } finally {
      setStorageReady(true);
    }
  }, []);

  React.useEffect(() => {
    if (!storageReady) return;
    try {
      localStorage.setItem(VOLUME_STORAGE_KEY, String(volume));
      localStorage.setItem(MUTED_STORAGE_KEY, isMuted ? "1" : "0");
    } catch {
      // ignore quota / private-mode failures
    }
  }, [volume, isMuted, storageReady]);

  React.useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  const setVolume = React.useCallback((next: number) => {
    const clamped = clampVolume(next);
    setVolumeState(clamped);
    if (clamped > 0) {
      lastVolumeRef.current = clamped;
      setIsMuted(false);
    } else {
      setIsMuted(true);
    }
  }, []);

  const toggleMute = React.useCallback(() => {
    setIsMuted((muted) => {
      if (muted) {
        setVolumeState((current) => {
          if (current > 0) return current;
          return lastVolumeRef.current || DEFAULT_VOLUME;
        });
        return false;
      }
      setVolumeState((current) => {
        if (current > 0) lastVolumeRef.current = current;
        return current;
      });
      return true;
    });
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
    volume,
    isMuted,
    playTrack,
    togglePlay,
    seek,
    playNext,
    playPrev,
    setVolume,
    toggleMute,
  };

  return (
    <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
  );
}
