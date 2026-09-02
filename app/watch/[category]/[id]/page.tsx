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
  pickTrailer,
  type TmdbDetails,
} from "@/lib/tmdb";

async function loadTitle(
  slug: string,
  id: string,
): Promise<TmdbDetails | null> {
  const category = getCategory(slug);
  if (!category) return null;
  try {
    return await getDetails(category.mediaType, id);
  } catch (error) {
    console.error(`Failed to load watch/${slug}/${id}`, error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: PageProps<"/watch/[category]/[id]">): Promise<Metadata> {
  const { category, id } = await params;
  const details = await loadTitle(category, id);
  return {
    title: details ? `Watch ${getTitle(details)} — Clips Hub` : "Not found",
  };
}

export default async function WatchPage({
  params,
}: PageProps<"/watch/[category]/[id]">) {
  const { category: slug, id } = await params;
  const category = getCategory(slug);
  if (!category) notFound();
  if (!hasTmdbToken()) return <SetupNotice />;

  const details = await loadTitle(slug, id);
  if (!details) notFound();

  return (
    <WatchStage
      title={getTitle(details)}
      backHref={`/${category.slug}/${id}`}
      source={getStreamSource(category.mediaType, details.id)}
      trailerKey={pickTrailer(details.videos?.results)}
    />
  );
}
