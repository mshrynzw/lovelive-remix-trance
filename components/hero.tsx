"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, Play } from "lucide-react";
import { usePlayer } from "@/components/providers/player-provider";
import type { Track } from "@/lib/tracks";

type HeroProps = {
  featuredTrack: Track | null;
};

export function Hero({ featuredTrack }: HeroProps) {
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const { playTrack } = usePlayer();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  const ariaLabel = featuredTrack
    ? `LoveLive! Remix Trance — ${featuredTrack.title}`
    : "LoveLive! Remix Trance";

  return (
    <section
      ref={sectionRef}
      id="hero"
      aria-label={ariaLabel}
      className="relative flex h-[100svh] min-h-[640px] w-full items-center justify-center overflow-hidden"
    >
      <motion.div style={{ opacity, scale }} className="absolute inset-0">
        <Image
          src="/images/hero.webp"
          alt="Love Live! Remix Trance"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-night-deep/70 via-night-deep/50 to-night-deep" />
        <div className="absolute inset-0 bg-night-deep/20" />
      </motion.div>

      <motion.div
        style={{ opacity, y: contentY }}
        className="relative z-10 flex flex-col items-center px-6 text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="mb-6 font-jp text-xs tracking-widest3 text-aurora-ice/80 sm:text-sm"
        >
          Uplifting Trance Remix by Kaoru Yuki (Snowdome World)
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          className="font-display text-4xl leading-tight tracking-widest text-ink-light drop-shadow-[0_0_30px_rgba(0,229,255,0.25)] sm:text-6xl md:text-7xl"
        >
          Love Live!
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
          className="text-gradient-aurora mt-2 font-display text-3xl tracking-[0.3em] sm:text-5xl md:text-6xl"
        >
          Trance
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: featuredTrack ? 1 : 0 }}
          transition={{ duration: 1.4, delay: featuredTrack ? 1 : 0 }}
          className="mt-8 max-w-md font-serif text-lg italic text-ink-soft/80 sm:text-xl"
          aria-live="polite"
        >
          {featuredTrack?.title ?? "\u00A0"}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 1.2 }}
          className="mt-12"
        >
          <button
            type="button"
            disabled={!featuredTrack}
            onClick={() => {
              if (featuredTrack) playTrack(featuredTrack);
            }}
            className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-aurora-cyan to-aurora-mint px-9 py-4 font-jp text-sm font-semibold tracking-widest text-night-deep shadow-glow transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:shadow-glow-mint hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora-ice focus-visible:ring-offset-4 focus-visible:ring-offset-night-deep active:scale-95 disabled:pointer-events-none disabled:opacity-60"
          >
            <Play className="h-4 w-4" fill="currentColor" />
            Play Music
          </button>
        </motion.div>
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2"
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-6 w-6 text-aurora-ice/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}
