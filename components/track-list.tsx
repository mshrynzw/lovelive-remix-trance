"use client";

import * as React from "react";
import { SectionHeading } from "@/components/section-heading";
import { TrackCard } from "@/components/track-card";
import { tracks, type Track } from "@/lib/tracks";

function shuffleTracks(list: readonly Track[]): Track[] {
  const next = [...list];
  for (let i = next.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const current = next[i];
    const swap = next[j];
    if (current === undefined || swap === undefined) continue;
    next[i] = swap;
    next[j] = current;
  }
  return next;
}

export function TrackList() {
  const [ordered, setOrdered] = React.useState<Track[] | null>(null);

  React.useEffect(() => {
    setOrdered(shuffleTracks(tracks));
  }, []);

  return (
    <section
      id="tracks"
      aria-labelledby="tracks-heading"
      className="relative py-28 sm:py-36"
    >
      <div className="container flex flex-col items-center">
        <SectionHeading
          eyebrow="FULL ALBUM"
          title="Track List"
          headingId="tracks-heading"
        />

        <div className="mt-16 grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ordered?.map((track, i) => (
            <TrackCard key={track.id} track={track} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
