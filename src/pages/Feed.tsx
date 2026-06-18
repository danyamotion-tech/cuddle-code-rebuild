import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Skeleton } from "@/components/ui/skeleton";

type Profile = {
  id: string;
  username: string;
  display_name: string | null;
  avatar_url: string | null;
};

type Movie = {
  id: number;
  title: string;
  slug: string;
  year: number;
  artwork_path: string | null;
  original_artwork_url: string | null;
};

type ReviewRow = {
  id: string;
  user_id: string;
  movie_id: number;
  rating: number;
  body: string;
  created_at: string;
};

type FeedItem = ReviewRow & { author: Profile | null; movie: Movie | null };

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });

const Stars = ({ rating }: { rating: number }) => {
  const full = Math.round(rating);
  return (
    <span className="text-foreground/70 tracking-widest text-sm" aria-label={`${rating} out of 5`}>
      {"★".repeat(full)}
      <span className="text-foreground/20">{"★".repeat(Math.max(0, 5 - full))}</span>
    </span>
  );
};

const Avatar = ({ p }: { p: Profile | null }) => (
  <div className="w-10 h-10 bg-foreground/5 flex items-center justify-center text-sm font-medium text-foreground/70 overflow-hidden shrink-0">
    {p?.avatar_url ? (
      <img src={p.avatar_url} alt={p.username} className="w-full h-full object-cover" />
    ) : (
      (p?.display_name ?? p?.username ?? "?").charAt(0).toUpperCase()
    )}
  </div>
);

const Feed = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !user) navigate("/auth", { replace: true });
  }, [user, authLoading, navigate]);

  const { data, isLoading } = useQuery({
    queryKey: ["feed", user?.id],
    enabled: !!user,
    queryFn: async (): Promise<FeedItem[]> => {
      const { data: follows, error: fErr } = await supabase
        .from("follows")
        .select("following_id")
        .eq("follower_id", user!.id);
      if (fErr) throw fErr;
      const ids = (follows ?? []).map((f) => f.following_id);
      if (ids.length === 0) return [];

      const { data: reviews, error: rErr } = await supabase
        .from("user_reviews")
        .select("id, user_id, movie_id, rating, body, created_at")
        .in("user_id", ids)
        .order("created_at", { ascending: false })
        .limit(50);
      if (rErr) throw rErr;
      if (!reviews || reviews.length === 0) return [];

      const authorIds = Array.from(new Set(reviews.map((r) => r.user_id)));
      const movieIds = Array.from(new Set(reviews.map((r) => r.movie_id)));

      const [{ data: profiles }, { data: movies }] = await Promise.all([
        supabase.from("profiles").select("id, username, display_name, avatar_url").in("id", authorIds),
        supabase.from("movies").select("id, title, slug, year, artwork_path, original_artwork_url").in("id", movieIds),
      ]);

      const pMap = new Map((profiles ?? []).map((p) => [p.id, p as Profile]));
      const mMap = new Map((movies ?? []).map((m) => [m.id, m as Movie]));

      return reviews.map((r) => ({
        ...r,
        author: pMap.get(r.user_id) ?? null,
        movie: mMap.get(r.movie_id) ?? null,
      }));
    },
  });

  if (authLoading || !user) {
    return (
      <main className="min-h-screen px-6 sm:px-10 py-20">
        <Skeleton className="h-12 w-64" />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background px-6 sm:px-10 py-16 max-w-3xl mx-auto">
      <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">← Back</Link>
      <h1 className="text-5xl font-light tracking-tight mt-8 mb-4">Feed</h1>
      <p className="text-sm text-muted-foreground mb-12">Latest reviews from people you follow.</p>

      {isLoading ? (
        <div className="space-y-6">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      ) : !data || data.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-sm text-muted-foreground mb-6">
            Nothing here yet. Follow people to see their reviews.
          </p>
          <Link
            to="/friends"
            className="text-sm border-b border-foreground/40 hover:border-foreground pb-0.5"
          >
            Find people to follow
          </Link>
        </div>
      ) : (
        <ul className="divide-y divide-foreground/10">
          {data.map((item) => {
            const poster = item.movie?.artwork_path ?? item.movie?.original_artwork_url ?? null;
            return (
              <li key={item.id} className="py-8 flex gap-5">
                {poster ? (
                  <Link to={item.movie ? `/reviews/${item.movie.slug}` : "#"} className="shrink-0">
                    <img
                      src={poster}
                      alt={item.movie?.title ?? ""}
                      className="w-20 h-28 object-cover bg-foreground/5"
                      loading="lazy"
                    />
                  </Link>
                ) : (
                  <div className="w-20 h-28 bg-foreground/5 shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <Avatar p={item.author} />
                    <div className="min-w-0">
                      <div className="text-sm font-medium truncate">
                        {item.author?.display_name ?? item.author?.username ?? "Unknown"}
                      </div>
                      <div className="text-xs text-muted-foreground truncate">
                        @{item.author?.username} · {formatDate(item.created_at)}
                      </div>
                    </div>
                  </div>
                  {item.movie && (
                    <Link
                      to={`/reviews/${item.movie.slug}`}
                      className="text-lg font-medium tracking-tight hover:opacity-70"
                    >
                      {item.movie.title}{" "}
                      <span className="text-muted-foreground font-light">({item.movie.year})</span>
                    </Link>
                  )}
                  <div className="mt-1 mb-3">
                    <Stars rating={item.rating} />
                  </div>
                  {item.body && (
                    <p className="text-sm text-foreground/80 leading-relaxed whitespace-pre-wrap">
                      {item.body}
                    </p>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
};

export default Feed;