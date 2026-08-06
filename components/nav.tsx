"use client";

import * as React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const links = [
  { href: "#about", label: "About" },
  { href: "#tracks", label: "Tracks" },
  { href: "#next", label: "Next" },
];

export function Nav() {
  const { scrollY } = useScroll();
  const bg = useTransform(
    scrollY,
    [0, 200],
    ["rgba(6,24,47,0)", "rgba(6,24,47,0.72)"]
  );

  return (
    <motion.header
      style={{ backgroundColor: bg }}
      className="fixed inset-x-0 top-0 z-40 backdrop-blur-md transition-shadow"
    >
      <div className="container flex h-20 items-center justify-between">
        <a
          href="#hero"
          className="font-display text-sm tracking-widest2 text-ink-light/90 transition-colors hover:text-aurora-ice"
        >
          Love Live! Trance
        </a>
        <nav aria-label="メインナビゲーション" className="hidden gap-8 sm:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-jp text-xs tracking-widest text-ink-soft/70 transition-colors hover:text-aurora-ice focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora-mint rounded px-1"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </motion.header>
  );
}
