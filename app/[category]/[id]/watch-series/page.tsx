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

async function getSeriesDetails(id: string): Promise<TmdbDetails | null> {
  try {
    return await getDetails("tv", id);
  } catch (error) {
    console.error(`Failed to load watch-series/${id}`, error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: PageProps<"/[category]/[id]/watch-series">): Promise<Metadata> {
  const { id } = await params;
  const details = await getSeriesDetails(id);
  return {
    title: details ? `Watch ${getTitle(details)} — Clips Hub` : "Not found",
  };
}

export default async function WatchSeriesPage({
  params,
}: PageProps<"/[category]/[id]/watch-series">) {
  const { category: slug, id } = await params;

  // Only TV categories (tv-shows, anime, hindi-tv-shows) lead here; movies
  // belong on /…/watch-movie.
  const category = getCategory(slug);
  if (!category || category.mediaType !== "tv") notFound();
  if (!hasTmdbToken()) return <SetupNotice />;

  const details = await getSeriesDetails(id);
  if (!details) notFound();

  return (
    <WatchStage
      title={getTitle(details)}
      backHref={`/${category.slug}/${id}`}
      source={getStreamSource("tv", details.id)}
      trailerKey={null}
    />
  );
}
