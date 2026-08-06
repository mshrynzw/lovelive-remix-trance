"use client";

import * as React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Starfield } from "@/components/starfield";

/**
 * Fixed, full-viewport backdrop shared by every section: the deep-navy
 * gradient, a slow star field, and three softly blurred aurora ribbons
 * that breathe via CSS animation and drift subtly with scroll — the
 * "journey through the night sky" the whole page is built around.
 */
export function AuroraBackground() {
  const { scrollYProgress } = useScroll();
  const auroraY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const auroraY2 = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden bg-night-gradient"
      aria-hidden="true"
    >
      <Starfield />

      <motion.div
        style={{ y: auroraY }}
        className="absolute -top-1/4 left-[-10%] h-[70vh] w-[70vw] rounded-full bg-aurora-mint/20 blur-[120px] animate-aurora"
      />
      <motion.div
        style={{ y: auroraY2 }}
        className="absolute top-[10%] right-[-15%] h-[60vh] w-[60vw] rounded-full bg-aurora-cyan/20 blur-[130px] animate-aurora [animation-delay:-4s]"
      />
      <motion.div
        style={{ y: auroraY }}
        className="absolute bottom-[-15%] left-[15%] h-[55vh] w-[55vw] rounded-full bg-aurora-ice/10 blur-[110px] animate-aurora [animation-delay:-8s]"
      />

      {/* Vignette to keep focus centered and improve text contrast */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_100%_at_50%_0%,transparent_0%,rgba(6,24,47,0.35)_70%,rgba(6,24,47,0.75)_100%)]" />
    </div>
  );
}
