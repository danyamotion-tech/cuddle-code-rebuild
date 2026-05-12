import { supabase } from "@/integrations/supabase/client";
import type { Movie } from "@/data/movies";

const getArtworkUrl = (artworkPath: string | null): string => {
  if (!artworkPath) return "";
  const { data } = supabase.storage
    .from("movie-artwork")
    .getPublicUrl(artworkPath);
  return data.publicUrl;
};

const mapDbToMovie = (row: any): Movie => ({
  id: row.id,
  slug: row.slug,
  title: row.title,
  year: row.year,
  genre: row.genre,
  director: row.director,
  writers: row.writers || [],
  cast: row.cast || [],
  cinematography: row.cinematography || "",
  runtime: row.runtime,
  rating: parseFloat(row.rating),
  releaseDate: row.release_date,
  distributor: row.distributor || "",
  posterDescription: row.poster_description || "",
  review: row.review,
  galleryDescriptions: row.gallery_descriptions || [],
  relatedSlugs: row.related_slugs || [],
  artworkUrl: getArtworkUrl(row.artwork_path),
});

export const fetchMovies = async (): Promise<Movie[]> => {
  const { data, error } = await supabase
    .from("movies")
    .select("*")
    .order("id");

  if (error) throw error;
  if (!data || data.length === 0) {
    // Fallback to iTunes if DB is empty
    const { fetchITunesMovies } = await import("@/services/itunes");
    return fetchITunesMovies();
  }

  return data.map(mapDbToMovie);
};

export const fetchMovieBySlug = async (
  slug: string
): Promise<{ movie: Movie | null; relatedMovies: Movie[] }> => {
  const { data, error } = await supabase
    .from("movies")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw error;
  if (!data) return { movie: null, relatedMovies: [] };

  const movie = mapDbToMovie(data);

  // Fetch related movies
  const relatedSlugs = data.related_slugs || [];
  let relatedMovies: Movie[] = [];
  if (relatedSlugs.length > 0) {
    const { data: relatedData } = await supabase
      .from("movies")
      .select("*")
      .in("slug", relatedSlugs);
    relatedMovies = (relatedData || []).map(mapDbToMovie);
  }

  return { movie, relatedMovies };
};
