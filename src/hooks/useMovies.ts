import { useQuery } from "@tanstack/react-query";
import { fetchMovies, fetchMovieBySlug } from "@/services/movieService";
import type { Movie } from "@/data/movies";

export const useMovies = () => {
  return useQuery<Movie[]>({
    queryKey: ["movies"],
    queryFn: fetchMovies,
    staleTime: 1000 * 60 * 30,
    retry: 2,
  });
};

export const useMovie = (slug: string) => {
  return useQuery({
    queryKey: ["movie", slug],
    queryFn: () => fetchMovieBySlug(slug),
    staleTime: 1000 * 60 * 30,
    retry: 2,
    enabled: !!slug,
  });
};
