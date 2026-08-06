import { SectionHeading } from "@/components/section-heading";
import { TrackCard } from "@/components/track-card";
import { tracks } from "@/lib/tracks";

export function TrackList() {
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
          {tracks.map((track, i) => (
            <TrackCard key={track.id} track={track} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
