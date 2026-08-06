"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const paragraphs = [
  "ラブライブ！の名曲を、Uplifting Tranceへとリミックス。",
  "オーロラのように広がるシンセ、透き通るピアノ、力強いキックで、新しい世界を描きました。",
  "夜空の彼方へ——6曲を通して、あなたを旅へ誘います。",
];

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative py-28 sm:py-36"
    >
      <div className="container grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-24">
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="order-2 flex flex-col gap-8 lg:order-1"
        >
          <div className="flex flex-col gap-4">
            <span className="font-jp text-xs tracking-widest3 text-aurora-mint/80">
              ABOUT THE ALBUM
            </span>
            <h2
              id="about-heading"
              className="font-display text-3xl tracking-wide text-ink-light sm:text-4xl md:text-5xl"
            >
              新しい世界へ、
              <br />
              静かなる旅を。
            </h2>
          </div>

          <div className="flex flex-col gap-5 font-jp text-base leading-loose text-ink-soft/85 sm:text-lg">
            {paragraphs.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.15 }}
              >
                {p}
              </motion.p>
            ))}
          </div>

          <div className="mt-2 flex flex-wrap gap-3">
            {["Uplifting Trance", "138 BPM前後", "Remix"].map(
              (tag) => (
                <span
                  key={tag}
                  className="glass rounded-full px-4 py-1.5 font-jp text-xs tracking-wide text-ink-soft/80"
                >
                  {tag}
                </span>
              )
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="order-1 lg:order-2"
        >
          <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-3xl shadow-card ring-1 ring-aurora-ice/15">
            <Image
              src="/images/jacket.webp"
              alt="WATER BLUE NEW WORLD アルバムジャケット"
              fill
              sizes="(min-width: 1024px) 480px, 90vw"
              loading="lazy"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-night-deep/30 via-transparent to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
