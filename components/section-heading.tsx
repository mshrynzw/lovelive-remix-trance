"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  align = "center",
  className,
  headingId,
}: {
  eyebrow: string;
  title: string;
  align?: "center" | "left";
  className?: string;
  headingId?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15% 0px" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      <span className="font-jp text-xs tracking-widest3 text-aurora-mint/80">
        {eyebrow}
      </span>
      <h2
        id={headingId}
        className="font-display text-3xl tracking-wide text-ink-light sm:text-4xl md:text-5xl"
      >
        {title}
      </h2>
      <div
        className={cn(
          "h-px w-16 bg-gradient-to-r from-aurora-cyan to-aurora-mint",
          align === "center" && "mx-auto"
        )}
        aria-hidden="true"
      />
    </motion.div>
  );
}
