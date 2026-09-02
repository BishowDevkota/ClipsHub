"use client";

import Link from "next/link";
import type { StreamSource } from "@/lib/streaming";

export default function WatchStage({
  title,
  backHref,
  source,
  trailerKey,
}: {
  title: string;
  backHref: string;
  source: StreamSource | null;
  trailerKey: string | null;
}) {
  return (
    <div className="flex flex-col bg-black pt-16 pb-8 md:pt-20">
      <div className="flex items-center gap-4 px-4 py-4 md:px-12">
        <Link
          href={backHref}
          className="flex items-center gap-2 text-sm text-neutral-300 transition hover:text-brand"
        >
          <span aria-hidden>←</span> Back to {title}
        </Link>
      </div>

      <div className="flex flex-1 items-center justify-center px-4 md:px-12">
        <div
          className="w-full"
          style={{ maxWidth: "min(1600px, calc(76vh * 16 / 9))" }}
        >
          <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-neutral-950 ring-1 ring-white/10">
            {source ? (
              source.kind === "video" ? (
                <video
                  className="absolute inset-0 h-full w-full"
                  src={source.url}
                  controls
                  autoPlay
                  playsInline
                />
              ) : (
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src={source.url}
                  title={`${title} — full playback`}
                  allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                  allowFullScreen
                />
              )
            ) : trailerKey ? (
              <iframe
                className="absolute inset-0 h-full w-full"
                src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=0&rel=0&modestbranding=1&playsinline=1&controls=1`}
                title={`${title} trailer`}
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center p-6 text-center text-sm text-neutral-500">
                Nothing to play for this title yet.
              </div>
            )}
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <h1 className="text-xl font-bold md:text-2xl">{title}</h1>
            {source ? null : (
              <p className="rounded border border-brand/40 bg-brand/10 px-3 py-1.5 text-xs text-brand-bright">
                Full playback isn&apos;t connected yet —{" "}
                {trailerKey ? "showing the trailer" : "no source available"}.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
