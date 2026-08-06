"use client";

import * as React from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export type GalleryImage = {
  src: string;
  alt: string;
};

export function Lightbox({
  images,
  index,
  onClose,
  onNavigate,
}: {
  images: GalleryImage[];
  index: number | null;
  onClose: () => void;
  onNavigate: (nextIndex: number) => void;
}) {
  const isOpen = index !== null;
  const closeButtonRef = React.useRef<HTMLButtonElement | null>(null);

  React.useEffect(() => {
    if (!isOpen) return;
    closeButtonRef.current?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (index === null) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNavigate((index + 1) % images.length);
      if (e.key === "ArrowLeft")
        onNavigate((index - 1 + images.length) % images.length);
    }

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, index, images.length, onClose, onNavigate]);

  return (
    <AnimatePresence>
      {isOpen && index !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          role="dialog"
          aria-modal="true"
          aria-label="ギャラリー画像ビューア"
          className="fixed inset-0 z-[60] flex items-center justify-center bg-night-deep/92 backdrop-blur-md p-4 sm:p-10"
          onClick={onClose}
        >
          <button
            ref={closeButtonRef}
            onClick={onClose}
            aria-label="閉じる"
            className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-aurora-ice/25 text-ink-light transition-colors hover:border-aurora-ice hover:text-aurora-ice focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora-mint"
          >
            <X className="h-5 w-5" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onNavigate((index - 1 + images.length) % images.length);
            }}
            aria-label="前の画像"
            className="absolute left-3 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full border border-aurora-ice/25 p-3 text-ink-light transition-colors hover:border-aurora-ice hover:text-aurora-ice focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora-mint sm:flex"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNavigate((index + 1) % images.length);
            }}
            aria-label="次の画像"
            className="absolute right-3 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full border border-aurora-ice/25 p-3 text-ink-light transition-colors hover:border-aurora-ice hover:text-aurora-ice focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora-mint sm:flex"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <motion.div
            key={images[index]?.src}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative aspect-square w-full max-w-xl overflow-hidden rounded-2xl shadow-card ring-1 ring-aurora-ice/20"
          >
            {images[index] && (
              <Image
                src={images[index]!.src}
                alt={images[index]!.alt}
                fill
                sizes="(min-width: 640px) 576px, 92vw"
                className="object-cover"
              />
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
