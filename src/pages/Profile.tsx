import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { X, Upload } from "lucide-react";

type Profile = {
  id: string;
  username: string;
  display_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  birth_date: string | null;
};

type Movie = {
  id: number;
  slug: string;
  title: string;
  year: number;
  artwork_path: string | null;
  original_artwork_url: string | null;
};

type UserReview = {
  id: string;
  movie_id: number;
  rating: number;
  body: string;
  created_at: string;
  movie: Movie | null;
};

const Profile = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const fileRef = useRef<HTMLInputElement>(null);

  const [displayName, setDisplayName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [bio, setBio] = useState("");
  const [uploading, setUploading] = useState(false);

  // Add favorite / review form state
  const [filmSearch, setFilmSearch] = useState("");
  const [reviewMovieId, setReviewMovieId] = useState<number | null>(null);
  const [reviewMovieTitle, setReviewMovieTitle] = useState("");
  const [reviewRating, setReviewRating] = useState("4");
  const [reviewBody, setReviewBody] = useState("");

  useEffect(() => {
    if (!authLoading && !user) navigate("/auth", { replace: true });
  }, [user, authLoading, navigate]);

  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile", user?.id],
    enabled: !!user,
    queryFn: async (): Promise<Profile> => {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, username, display_name, avatar_url, bio, birth_date")
        .eq("id", user!.id)
        .maybeSingle();
      if (error) throw error;
      if (!data) throw new Error("Profile not found");
      return data as Profile;
    },
  });

  useEffect(() => {
    if (profile) {
      setDisplayName(profile.display_name ?? "");
      setBirthDate(profile.birth_date ?? "");
      setBio(profile.bio ?? "");
    }
  }, [profile]);

  const { data: favorites } = useQuery({
    queryKey: ["favorites", user?.id],
    enabled: !!user,
    queryFn: async (): Promise<Movie[]> => {
      const { data: favs, error } = await supabase
        .from("favorite_films")
        .select("movie_id")
        .eq("user_id", user!.id);
      if (error) throw error;
      const ids = (favs ?? []).map((r) => r.movie_id);
      if (ids.length === 0) return [];
      const { data: movies, error: e2 } = await supabase
        .from("movies")
        .select("id, slug, title, year, artwork_path, original_artwork_url")
        .in("id", ids);
      if (e2) throw e2;
      return movies ?? [];
    },
  });

  const { data: reviews } = useQuery({
    queryKey: ["user-reviews", user?.id],
    enabled: !!user,
    queryFn: async (): Promise<UserReview[]> => {
      const { data: rows, error } = await supabase
        .from("user_reviews")
        .select("id, movie_id, rating, body, created_at")
        .eq("user_id", user!.id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      const ids = Array.from(new Set((rows ?? []).map((r) => r.movie_id)));
      let movies: Movie[] = [];
      if (ids.length > 0) {
        const { data: m, error: e2 } = await supabase
          .from("movies")
          .select("id, slug, title, year, artwork_path, original_artwork_url")
          .in("id", ids);
        if (e2) throw e2;
        movies = m ?? [];
      }
      return (rows ?? []).map((r) => ({
        ...r,
        movie: movies.find((m) => m.id === r.movie_id) ?? null,
      })) as UserReview[];
    },
  });

  const { data: filmResults } = useQuery({
    queryKey: ["film-search", filmSearch],
    enabled: filmSearch.trim().length >= 2,
    queryFn: async (): Promise<Movie[]> => {
      const { data, error } = await supabase
        .from("movies")
        .select("id, slug, title, year, artwork_path, original_artwork_url")
        .ilike("title", `%${filmSearch.trim()}%`)
        .limit(10);
      if (error) throw error;
      return data ?? [];
    },
  });

  const saveProfile = useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from("profiles")
        .update({
          display_name: displayName.trim() || null,
          bio: bio.trim() || null,
          birth_date: birthDate || null,
        })
        .eq("id", user!.id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["profile", user?.id] });
      toast.success("Profile saved");
    },
    onError: (e: any) => toast.error(e.message),
  });

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Max file size is 5MB");
      return;
    }
    setUploading(true);
    try {
      const ext = file.name.split(".").pop() ?? "jpg";
      const path = `${user.id}/avatar-${Date.now()}.${ext}`;
      const { error: upErr } = await supabase.storage
        .from("avatars")
        .upload(path, file, { upsert: true, contentType: file.type });
      if (upErr) throw upErr;
      const { data: signed, error: signErr } = await supabase.storage
        .from("avatars")
        .createSignedUrl(path, 60 * 60 * 24 * 365 * 5);
      if (signErr) throw signErr;
      const { error: updErr } = await supabase
        .from("profiles")
        .update({ avatar_url: signed.signedUrl })
        .eq("id", user.id);
      if (updErr) throw updErr;
      qc.invalidateQueries({ queryKey: ["profile", user.id] });
      toast.success("Avatar updated");
    } catch (err: any) {
      toast.error(err.message ?? "Upload failed");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const addFavorite = useMutation({
    mutationFn: async (movieId: number) => {
      const { error } = await supabase
        .from("favorite_films")
        .insert({ user_id: user!.id, movie_id: movieId });
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["favorites", user?.id] });
      toast.success("Added to favorites");
    },
    onError: (e: any) => toast.error(e.message),
  });

  const removeFavorite = useMutation({
    mutationFn: async (movieId: number) => {
      const { error } = await supabase
        .from("favorite_films")
        .delete()
        .eq("user_id", user!.id)
        .eq("movie_id", movieId);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["favorites", user?.id] }),
  });

  const addReview = useMutation({
    mutationFn: async () => {
      if (!reviewMovieId) throw new Error("Pick a film first");
      const rating = parseFloat(reviewRating);
      if (isNaN(rating) || rating < 0 || rating > 5) throw new Error("Rating must be 0-5");
      const { error } = await supabase.from("user_reviews").upsert(
        {
          user_id: user!.id,
          movie_id: reviewMovieId,
          rating,
          body: reviewBody.trim(),
        },
        { onConflict: "user_id,movie_id" },
      );
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["user-reviews", user?.id] });
      setReviewMovieId(null);
      setReviewMovieTitle("");
      setReviewBody("");
      setReviewRating("4");
      toast.success("Review saved");
    },
    onError: (e: any) => toast.error(e.message),
  });

  const deleteReview = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("user_reviews").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["user-reviews", user?.id] }),
  });

  const artworkUrl = (m: Movie) => m.original_artwork_url ?? m.artwork_path ?? "";

  if (authLoading || !user || isLoading || !profile) {
    return (
      <main className="min-h-screen px-6 sm:px-10 py-20 max-w-4xl mx-auto">
        <Skeleton className="h-16 w-64" />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background px-6 sm:px-10 py-16 max-w-4xl mx-auto">
      <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">← Back</Link>

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end gap-8 mt-10 mb-16 pb-12 border-b border-foreground/10">
        <div className="relative group">
          <div className="w-32 h-32 bg-foreground/5 overflow-hidden flex items-center justify-center text-3xl font-light text-foreground/60">
            {profile.avatar_url ? (
              <img src={profile.avatar_url} alt={profile.username} className="w-full h-full object-cover" />
            ) : (
              (profile.display_name ?? profile.username).charAt(0).toUpperCase()
            )}
          </div>
          <button
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="absolute inset-0 bg-foreground/60 text-background opacity-0 group-hover:opacity-100 flex items-center justify-center text-xs uppercase tracking-widest transition-opacity"
          >
            {uploading ? "Uploading…" : (<><Upload className="w-4 h-4 mr-2" /> Change</>)}
          </button>
          <input ref={fileRef} type="file" accept="image/*" hidden onChange={handleAvatarUpload} />
        </div>
        <div className="flex-1">
          <h1 className="text-5xl font-light tracking-tight">{profile.display_name ?? profile.username}</h1>
          <p className="text-sm text-muted-foreground mt-2">@{profile.username}</p>
        </div>
      </div>

      {/* Edit form */}
      <section className="mb-20">
        <h2 className="text-xs uppercase tracking-widest text-muted-foreground mb-6">Details</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <label className="text-xs uppercase tracking-widest text-muted-foreground">Nickname</label>
            <Input
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              maxLength={60}
              className="rounded-none border-0 border-b border-foreground/20 px-0 focus-visible:ring-0 focus-visible:border-foreground"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-widest text-muted-foreground">Birth date</label>
            <Input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="rounded-none border-0 border-b border-foreground/20 px-0 focus-visible:ring-0 focus-visible:border-foreground"
            />
          </div>
        </div>
        <div className="mt-6">
          <label className="text-xs uppercase tracking-widest text-muted-foreground">Bio</label>
          <Textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            maxLength={500}
            placeholder="A few words about your taste in cinema…"
            className="rounded-none border-0 border-b border-foreground/20 px-0 focus-visible:ring-0 focus-visible:border-foreground resize-none"
          />
        </div>
        <Button
          onClick={() => saveProfile.mutate()}
          disabled={saveProfile.isPending}
          className="mt-6 rounded-none bg-foreground text-background hover:bg-foreground/90"
        >
          Save profile
        </Button>
      </section>

      {/* Favorite films */}
      <section className="mb-20">
        <h2 className="text-xs uppercase tracking-widest text-muted-foreground mb-6">
          Favorite films ({favorites?.length ?? 0})
        </h2>

        <div className="mb-8">
          <Input
            value={filmSearch}
            onChange={(e) => setFilmSearch(e.target.value)}
            placeholder="Search films to add…"
            className="rounded-none border-0 border-b border-foreground/20 px-0 focus-visible:ring-0 focus-visible:border-foreground"
          />
          {filmSearch.trim().length >= 2 && filmResults && filmResults.length > 0 && (
            <ul className="mt-3 border border-foreground/10">
              {filmResults.map((m) => {
                const already = favorites?.some((f) => f.id === m.id);
                return (
                  <li key={m.id} className="flex items-center gap-3 px-3 py-2 border-b border-foreground/5 last:border-0">
                    <span className="flex-1 text-sm truncate">{m.title} <span className="text-muted-foreground">({m.year})</span></span>
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-none border-foreground/20"
                      disabled={already || addFavorite.isPending}
                      onClick={() => addFavorite.mutate(m.id)}
                    >
                      {already ? "Added" : "Add"}
                    </Button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {favorites && favorites.length > 0 ? (
          <ul className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {favorites.map((m) => (
              <li key={m.id} className="relative group">
                <Link to={`/reviews/${m.slug}`} className="block">
                  <div className="aspect-[2/3] bg-foreground/5 overflow-hidden">
                    {artworkUrl(m) && (
                      <img src={artworkUrl(m)} alt={m.title} className="w-full h-full object-cover" loading="lazy" />
                    )}
                  </div>
                  <p className="mt-2 text-sm truncate">{m.title}</p>
                  <p className="text-xs text-muted-foreground">{m.year}</p>
                </Link>
                <button
                  onClick={() => removeFavorite.mutate(m.id)}
                  className="absolute top-2 right-2 w-7 h-7 bg-background/90 text-foreground opacity-0 group-hover:opacity-100 flex items-center justify-center"
                  aria-label="Remove"
                >
                  <X className="w-4 h-4" />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">No favorites yet. Search above to add some.</p>
        )}
      </section>

      {/* User reviews */}
      <section>
        <h2 className="text-xs uppercase tracking-widest text-muted-foreground mb-6">
          My reviews ({reviews?.length ?? 0})
        </h2>

        <div className="mb-10 p-6 border border-foreground/10">
          {reviewMovieId ? (
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm">Reviewing: <strong>{reviewMovieTitle}</strong></span>
              <button
                onClick={() => { setReviewMovieId(null); setReviewMovieTitle(""); }}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                Change film
              </button>
            </div>
          ) : (
            <div className="mb-4">
              <label className="text-xs uppercase tracking-widest text-muted-foreground">Pick a film</label>
              <Input
                value={filmSearch}
                onChange={(e) => setFilmSearch(e.target.value)}
                placeholder="Search films…"
                className="rounded-none border-0 border-b border-foreground/20 px-0 focus-visible:ring-0 focus-visible:border-foreground"
              />
              {filmSearch.trim().length >= 2 && filmResults && filmResults.length > 0 && (
                <ul className="mt-3 border border-foreground/10">
                  {filmResults.map((m) => (
                    <li key={`r-${m.id}`} className="flex items-center gap-3 px-3 py-2 border-b border-foreground/5 last:border-0">
                      <span className="flex-1 text-sm truncate">{m.title} ({m.year})</span>
                      <Button
                        size="sm"
                        variant="outline"
                        className="rounded-none border-foreground/20"
                        onClick={() => { setReviewMovieId(m.id); setReviewMovieTitle(`${m.title} (${m.year})`); setFilmSearch(""); }}
                      >
                        Select
                      </Button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          <div className="grid sm:grid-cols-[120px,1fr] gap-4">
            <div>
              <label className="text-xs uppercase tracking-widest text-muted-foreground">Rating</label>
              <Input
                type="number"
                min={0}
                max={5}
                step={0.5}
                value={reviewRating}
                onChange={(e) => setReviewRating(e.target.value)}
                className="rounded-none border-0 border-b border-foreground/20 px-0 focus-visible:ring-0 focus-visible:border-foreground"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-muted-foreground">Review</label>
              <Textarea
                value={reviewBody}
                onChange={(e) => setReviewBody(e.target.value)}
                rows={3}
                maxLength={2000}
                placeholder="What did you think?"
                className="rounded-none border-0 border-b border-foreground/20 px-0 focus-visible:ring-0 focus-visible:border-foreground resize-none"
              />
            </div>
          </div>
          <Button
            onClick={() => addReview.mutate()}
            disabled={!reviewMovieId || addReview.isPending}
            className="mt-4 rounded-none bg-foreground text-background hover:bg-foreground/90"
          >
            Publish review
          </Button>
        </div>

        {reviews && reviews.length > 0 ? (
          <ul className="space-y-8">
            {reviews.map((r) => (
              <li key={r.id} className="border-b border-foreground/10 pb-8">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    {r.movie ? (
                      <Link to={`/reviews/${r.movie.slug}`} className="text-lg font-medium hover:underline">
                        {r.movie.title} <span className="text-muted-foreground font-light">({r.movie.year})</span>
                      </Link>
                    ) : (
                      <span className="text-lg font-medium">Untitled</span>
                    )}
                    <p className="text-xs uppercase tracking-widest text-muted-foreground mt-1">
                      {r.rating}/5 · {new Date(r.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    onClick={() => deleteReview.mutate(r.id)}
                    className="text-xs text-muted-foreground hover:text-foreground"
                  >
                    Delete
                  </button>
                </div>
                {r.body && <p className="text-sm leading-relaxed mt-4 whitespace-pre-wrap">{r.body}</p>}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">You haven't written any reviews yet.</p>
        )}
      </section>
    </main>
  );
};

export default Profile;
