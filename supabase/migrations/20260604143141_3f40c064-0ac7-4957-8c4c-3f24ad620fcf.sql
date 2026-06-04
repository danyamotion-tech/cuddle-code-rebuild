
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS birth_date date;

-- Favorite films
CREATE TABLE public.favorite_films (
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  movie_id integer NOT NULL REFERENCES public.movies(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, movie_id)
);

GRANT SELECT, INSERT, DELETE ON public.favorite_films TO authenticated;
GRANT SELECT ON public.favorite_films TO anon;
GRANT ALL ON public.favorite_films TO service_role;

ALTER TABLE public.favorite_films ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Favorites are viewable by everyone"
  ON public.favorite_films FOR SELECT USING (true);

CREATE POLICY "Users manage their own favorites insert"
  ON public.favorite_films FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users manage their own favorites delete"
  ON public.favorite_films FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

CREATE INDEX idx_favorite_films_user ON public.favorite_films(user_id);

-- User reviews
CREATE TABLE public.user_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  movie_id integer NOT NULL REFERENCES public.movies(id) ON DELETE CASCADE,
  rating numeric NOT NULL DEFAULT 3.5 CHECK (rating >= 0 AND rating <= 5),
  body text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, movie_id)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_reviews TO authenticated;
GRANT SELECT ON public.user_reviews TO anon;
GRANT ALL ON public.user_reviews TO service_role;

ALTER TABLE public.user_reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "User reviews are viewable by everyone"
  ON public.user_reviews FOR SELECT USING (true);

CREATE POLICY "Users insert their own reviews"
  ON public.user_reviews FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users update their own reviews"
  ON public.user_reviews FOR UPDATE TO authenticated
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users delete their own reviews"
  ON public.user_reviews FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

CREATE INDEX idx_user_reviews_user ON public.user_reviews(user_id);
CREATE INDEX idx_user_reviews_movie ON public.user_reviews(movie_id);

CREATE TRIGGER update_user_reviews_updated_at
  BEFORE UPDATE ON public.user_reviews
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
