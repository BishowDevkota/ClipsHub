"use client";

import { useEffect } from "react";

/** Full-screen trailer player, opened from the title hero. Plays with sound. */
export default function TrailerTheater({
  trailerKey,
  title,
  onClose,
}: {
  trailerKey: string;
  title: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${title} trailer`}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className="animate-fade-in fixed inset-0 z-50 flex flex-col items-center justify-center gap-3 bg-black/95 p-4 sm:p-8"
    >
      <div
        className="flex w-full items-center justify-between gap-4"
        style={{ maxWidth: "min(1600px, calc(78vh * 16 / 9))" }}
      >
        <h2 className="truncate text-base font-semibold text-white sm:text-xl">
          {title}
        </h2>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close trailer"
          className="flex h-9 w-9 flex-none items-center justify-center rounded-full border border-white/30 text-lg leading-none text-white transition hover:bg-white/15"
        >
          ✕
        </button>
      </div>

      {/* Sized off the viewport height so the 16:9 frame never overflows. */}
      <div
        className="relative aspect-video w-full overflow-hidden rounded-lg bg-black shadow-2xl ring-1 ring-white/10"
        style={{ maxWidth: "min(1600px, calc(78vh * 16 / 9))" }}
      >
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=0&rel=0&modestbranding=1&playsinline=1&controls=1`}
          title={`${title} trailer`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowFullScreen
        />
      </div>
    </div>
  );
}
