"use client";

import Link from "next/link";
import { useState } from "react";
import HeroPlayer from "@/components/HeroPlayer";
import TrailerTheater from "@/components/TrailerTheater";

/**
 * Detail-page hero: ambient muted preview behind the title, with a button
 * that opens the trailer full screen with sound.
 */
export default function TitleHero({
  backdrop,
  title,
  trailerKey,
  watchHref,
  watchLabel,
  children,
}: {
  backdrop: string | null;
  title: string;
  trailerKey: string | null;
  watchHref: string;
  watchLabel: string;
  children: React.ReactNode;
}) {
  const [theaterOpen, setTheaterOpen] = useState(false);

  return (
    <>
      <section className="relative h-[56vw] max-h-[80vh] min-h-[380px] w-full overflow-hidden">
        <HeroPlayer
          backdrop={backdrop}
          title={title}
          trailerKey={trailerKey}
          startDelayMs={700}
          paused={theaterOpen}
          muteClassName="right-4 bottom-6 md:right-12"
        />

        <div className="relative z-10 flex h-full max-w-3xl flex-col justify-end gap-4 px-4 pb-10 md:px-12 md:pb-16">
          {children}

          <div className="flex flex-wrap gap-3">
            <Link
              href={watchHref}
              className="flex items-center gap-2 rounded bg-brand px-7 py-2.5 font-semibold text-black transition hover:bg-brand-bright"
            >
              <span aria-hidden>▶</span>
              {watchLabel}
            </Link>

            {trailerKey ? (
              <button
                type="button"
                onClick={() => setTheaterOpen(true)}
                className="flex items-center gap-2 rounded bg-neutral-500/70 px-7 py-2.5 font-semibold text-white transition hover:bg-neutral-500/50"
              >
                <span aria-hidden>▶</span>
                Watch Trailer
              </button>
            ) : null}
          </div>
        </div>
      </section>

      {theaterOpen && trailerKey ? (
        <TrailerTheater
          trailerKey={trailerKey}
          title={title}
          onClose={() => setTheaterOpen(false)}
        />
      ) : null}
    </>
  );
}
