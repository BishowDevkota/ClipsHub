import type { MediaType } from "@/lib/tmdb";

export interface StreamSource {
  /** Playable URL: an .mp4/.webm file, an HLS manifest, or an embed page. */
  url: string;
  /** "video" renders a <video> element; "embed" renders an iframe. */
  kind: "video" | "embed";
  label?: string;
}

/**
 * THE INTEGRATION POINT for real playback.
 *
 * Return a StreamSource once you have rights to a stream and the watch page
 * plays it; return null and the page falls back to the trailer with a notice.
 * TMDB provides metadata only — it carries no streamable video — so this is
 * deliberately empty until you connect your own provider.
 *
 * Example:
 *   if (mediaType === "movie" && id === 550) {
 *     return { url: "https://cdn.example.com/fight-club.m3u8", kind: "video" };
 *   }
 */
export function getStreamSource(
  mediaType: MediaType,
  id: number,
): StreamSource | null {
  void mediaType;
  void id;
  return null;
}

/** Button copy differs between films and series. */
export function watchLabel(mediaType: MediaType): string {
  return mediaType === "movie" ? "Watch Movie" : "Watch Now";
}
