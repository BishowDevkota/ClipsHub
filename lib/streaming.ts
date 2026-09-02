import type { MediaType } from "@/lib/tmdb";

export interface StreamSource {
  /** Playable URL: an .mp4/.webm file, an HLS manifest, or an embed page. */
  url: string;
  /** "video" renders a <video> element; "embed" renders an iframe. */
  kind: "video" | "embed";
  label?: string;
}

export interface StreamOptions {
  /** Season number for TV titles. Defaults to 1 when omitted. */
  season?: number;
  /** Episode number for TV titles. Defaults to 1 when omitted. */
  episode?: number;
}

/**
 * VidSrc hosts full-length streams keyed purely by TMDB id — no API key or
 * account needed. Override the embed origin with VIDSRC_BASE_URL if the
 * default ever changes.
 *
 *   Movie: /embed/movie/{tmdbId}            → e.g. 550 = Fight Club
 *   TV:    /embed/tv/{tmdbId}/{s}/{e}       → e.g. 1399/1/1 = Game of Thrones S1E1
 */
const VIDSRC_ORIGIN =
  process.env.VIDSRC_BASE_URL?.replace(/\/+$/, "") ??
  "https://vidsrc.link/embed";

export function getStreamSource(
  mediaType: MediaType,
  id: number,
  options: StreamOptions = {},
): StreamSource | null {
  if (mediaType === "movie") {
    return {
      url: `${VIDSRC_ORIGIN}/movie/${id}`,
      kind: "embed",
      label: "VidSrc",
    };
  }

  // A bare show has no "current" episode; start from the pilot unless a
  // future episode picker supplies season/episode.
  const season = Math.max(1, options.season ?? 1);
  const episode = Math.max(1, options.episode ?? 1);
  return {
    url: `${VIDSRC_ORIGIN}/tv/${id}/${season}/${episode}`,
    kind: "embed",
    label: "VidSrc",
  };
}

/** Button copy differs between films and series. */
export function watchLabel(mediaType: MediaType): string {
  return mediaType === "movie" ? "Watch Movie" : "Watch Series";
}

/**
 * Play route nested under a title&apos;s detail page. The slug comes from the
 * browsed category (movies, tv-shows, anime, …); the action segment follows
 * the media type so only matching routes exist.
 */
export function watchPath(
  slug: string,
  mediaType: MediaType,
  id: number,
): string {
  const action = mediaType === "movie" ? "watch-movie" : "watch-series";
  return `/${slug}/${id}/${action}`;
}
