"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/section-heading";
import { Lightbox, type GalleryImage } from "@/components/lightbox";

/**
 * Upcoming release jackets (title & date are baked into each image).
 * Swap each `src` with `/images/next-01.webp` … `next-04.webp` when ready.
 */
const jackets: GalleryImage[] = [
  {
    src: "/images/jacket.webp",
    alt: "発表予定曲 1 のジャケット",
  },
  {
    src: "/images/jacket.webp",
    alt: "発表予定曲 2 のジャケット",
  },
  {
    src: "/images/jacket.webp",
    alt: "発表予定曲 3 のジャケット",
  },
  {
    src: "/images/jacket.webp",
    alt: "発表予定曲 4 のジャケット",
  },
];

export function NextUp() {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  return (
    <section
      id="next"
      aria-labelledby="next-heading"
      className="relative py-28 sm:py-36"
    >
      <div className="container flex flex-col items-center">
        <SectionHeading
          eyebrow="COMING SOON"
          title="NEXT..."
          headingId="next-heading"
        />

        <div className="mt-16 grid w-full grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {jackets.map((img, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              onClick={() => setActiveIndex(i)}
              aria-label={`${img.alt} を拡大表示`}
              className="group relative aspect-square overflow-hidden rounded-2xl ring-1 ring-aurora-ice/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora-mint"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                loading="lazy"
                sizes="(min-width: 1024px) 22vw, 45vw"
                className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-night-deep/0 transition-colors duration-500 group-hover:bg-night-deep/10" />
            </motion.button>
          ))}
        </div>
      </div>

      <Lightbox
        images={jackets}
        index={activeIndex}
        onClose={() => setActiveIndex(null)}
        onNavigate={(next) => setActiveIndex(next)}
      />
    </section>
  );
}
