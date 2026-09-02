import type { Metadata } from "next";
import { notFound } from "next/navigation";
import WatchStage from "@/components/WatchStage";
import SetupNotice from "@/components/SetupNotice";
import { getStreamSource } from "@/lib/streaming";
import {
  getCategory,
  getDetails,
  getTitle,
  hasTmdbToken,
  type TmdbDetails,
} from "@/lib/tmdb";

async function getMovieDetails(id: string): Promise<TmdbDetails | null> {
  try {
    return await getDetails("movie", id);
  } catch (error) {
    console.error(`Failed to load watch-movie/${id}`, error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: PageProps<"/[category]/[id]/watch-movie">): Promise<Metadata> {
  const { id } = await params;
  const details = await getMovieDetails(id);
  return {
    title: details ? `Watch ${getTitle(details)} — Clips Hub` : "Not found",
  };
}

export default async function WatchMoviePage({
  params,
}: PageProps<"/[category]/[id]/watch-movie">) {
  const { category: slug, id } = await params;

  // This page only makes sense under a movie category (movies, anime-movies,
  // hindi-movies). Series titles belong on /…/watch-series instead.
  const category = getCategory(slug);
  if (!category || category.mediaType !== "movie") notFound();
  if (!hasTmdbToken()) return <SetupNotice />;

  const details = await getMovieDetails(id);
  if (!details) notFound();

  return (
    <WatchStage
      title={getTitle(details)}
      backHref={`/${category.slug}/${id}`}
      source={getStreamSource("movie", details.id)}
      trailerKey={null}
    />
  );
}
