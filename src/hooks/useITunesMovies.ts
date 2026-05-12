import { useQuery } from "@tanstack/react-query";
import { fetchITunesMovies } from "@/services/itunes";
import type { Movie } from "@/data/movies";

export const useITunesMovies = () => {
  return useQuery<Movie[]>({
    queryKey: ["itunes-movies"],
    queryFn: fetchITunesMovies,
    staleTime: 1000 * 60 * 30, // 30 minutes
    retry: 2,
  });
};

export const useITunesMovie = (slug: string) => {
  const { data: movies, ...rest } = useITunesMovies();
  const movie = movies?.find((m) => m.slug === slug);
  const relatedMovies = movie
    ? movies?.filter((m) => movie.relatedSlugs.includes(m.slug)) ?? []
    : [];

  return { movie, relatedMovies, ...rest };
};
