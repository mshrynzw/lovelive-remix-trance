"use client";

import * as React from "react";

type Star = {
  x: number;
  y: number;
  r: number;
  baseAlpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
  driftSpeed: number;
};

/**
 * Lightweight canvas star field with gentle twinkle + a very slow
 * upward drift, standing in for "particles" in the brief. No external
 * animation library is required — a single requestAnimationFrame loop
 * keeps the bundle small and the motion subtle.
 *
 * Respects prefers-reduced-motion by rendering a static field.
 */
export function Starfield() {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let stars: Star[] = [];
    let rafId = 0;

    const density = 0.00012; // stars per px^2, tuned for a subtle field

    function resize() {
      if (!canvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.round(width * height * density);
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.3 + 0.2,
        baseAlpha: Math.random() * 0.6 + 0.25,
        twinkleSpeed: Math.random() * 0.6 + 0.15,
        twinklePhase: Math.random() * Math.PI * 2,
        driftSpeed: Math.random() * 0.02 + 0.004,
      }));
    }

    function draw(time: number) {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      const t = time / 1000;

      for (const star of stars) {
        const alpha = reducedMotion
          ? star.baseAlpha
          : star.baseAlpha *
            (0.6 + 0.4 * Math.sin(t * star.twinkleSpeed + star.twinklePhase));

        if (!reducedMotion) {
          star.y -= star.driftSpeed;
          if (star.y < -2) star.y = height + 2;
        }

        ctx.beginPath();
        ctx.fillStyle = `rgba(216, 230, 248, ${alpha.toFixed(3)})`;
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fill();
      }

      rafId = requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener("resize", resize);
    rafId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
