import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { useMovie } from "@/hooks/useMovies";
import { getMovieBySlug, getRelatedMovies, renderStars } from "@/data/movies";
import { posterMap } from "@/data/posterImports";
import { Skeleton } from "@/components/ui/skeleton";

const ReviewDetail = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data, isLoading } = useMovie(slug || "");
  const staticMovie = getMovieBySlug(slug || "");

  const movie = data?.movie || staticMovie;
  const relatedMovies = data?.movie
    ? data.relatedMovies
    : staticMovie
      ? getRelatedMovies(staticMovie.relatedSlugs)
      : [];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (isLoading) {
    return (
      <main>
        <Skeleton className="w-full h-[60vh] md:h-[70vh] rounded-none" />
        <div className="max-w-5xl mx-auto px-6 sm:px-10 py-16">
          <Skeleton className="h-8 w-48 mb-6" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </main>
    );
  }

  if (!movie) {
    return (
      <main className="pt-20 min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground text-lg">Review not found.</p>
      </main>
    );
  }

  const poster = movie.artworkUrl || posterMap[movie.slug];
  const paragraphs = movie.review.split("\n\n").filter(Boolean);

  return (
    <main>
      {/* Hero */}
      <div className="relative w-full h-[60vh] md:h-[70vh]">
        <img
          src={poster}
          alt={movie.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="relative z-10 h-full flex items-end pb-16 max-w-5xl mx-auto px-6 sm:px-10">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-3">{movie.title}</h1>
            <p className="text-white/70 text-lg md:text-xl tracking-wide">
              {movie.year} · {movie.genre}{movie.director ? ` · Directed by ${movie.director}` : ""}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 sm:px-10 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-semibold text-foreground mb-6">Review</h2>
            <div className="text-muted-foreground text-lg leading-relaxed space-y-4">
              {paragraphs.length > 0 ? (
                paragraphs.map((p, i) => <p key={i}>{p}</p>)
              ) : (
                <p className="italic">No review available.</p>
              )}
            </div>
          </div>

          {/* Details Sidebar */}
          <div className="bg-secondary p-6 border border-border md:sticky md:top-24 h-fit">
            <h3 className="text-xl font-semibold text-foreground mb-6">Details</h3>
            <div className="space-y-4">
              {movie.director && (
                <div>
                  <p className="text-muted-foreground text-xs uppercase tracking-wider">Director</p>
                  <p className="text-foreground text-base mt-1">{movie.director}</p>
                </div>
              )}
              {movie.writers.length > 0 && (
                <div>
                  <p className="text-muted-foreground text-xs uppercase tracking-wider">Writers</p>
                  <p className="text-foreground text-base mt-1">{movie.writers.join(", ")}</p>
                </div>
              )}
              {movie.cast.length > 0 && (
                <div>
                  <p className="text-muted-foreground text-xs uppercase tracking-wider">Cast</p>
                  <p className="text-foreground text-base mt-1">{movie.cast.join(", ")}</p>
                </div>
              )}
              {movie.cinematography && (
                <div>
                  <p className="text-muted-foreground text-xs uppercase tracking-wider">Cinematography</p>
                  <p className="text-foreground text-base mt-1">{movie.cinematography}</p>
                </div>
              )}
              <div>
                <p className="text-muted-foreground text-xs uppercase tracking-wider">Runtime</p>
                <p className="text-foreground text-base mt-1">{movie.runtime}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs uppercase tracking-wider">Rating</p>
                <p className="text-foreground text-base mt-1">{renderStars(movie.rating)}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs uppercase tracking-wider">Release Date</p>
                <p className="text-foreground text-base mt-1">{movie.releaseDate}</p>
              </div>
              {movie.distributor && (
                <div>
                  <p className="text-muted-foreground text-xs uppercase tracking-wider">Distributor</p>
                  <p className="text-foreground text-base mt-1">{movie.distributor}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related */}
      {relatedMovies.length > 0 && (
        <div className="max-w-5xl mx-auto px-6 sm:px-10 py-16">
          <h2 className="text-2xl font-semibold text-foreground mb-8">Related</h2>
          <div className="grid md:grid-cols-3 gap-1">
            {relatedMovies.map((related) => (
              <Link
                key={related.id}
                to={`/reviews/${related.slug}`}
                className="relative overflow-hidden group cursor-pointer aspect-[3/4]"
              >
                <img
                  src={related.artworkUrl || posterMap[related.slug]}
                  alt={related.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-80"
                />
              </Link>
            ))}
          </div>
        </div>
      )}
    </main>
  );
};

export default ReviewDetail;
