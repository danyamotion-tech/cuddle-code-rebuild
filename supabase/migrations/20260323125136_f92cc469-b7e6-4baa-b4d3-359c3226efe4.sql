-- Movies table to cache iTunes data with editorial reviews
CREATE TABLE public.movies (
  id SERIAL PRIMARY KEY,
  itunes_id TEXT UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  year INTEGER NOT NULL,
  genre TEXT NOT NULL DEFAULT 'Movie',
  director TEXT NOT NULL DEFAULT '',
  writers TEXT[] NOT NULL DEFAULT '{}',
  "cast" TEXT[] NOT NULL DEFAULT '{}',
  cinematography TEXT NOT NULL DEFAULT '',
  runtime TEXT NOT NULL DEFAULT 'N/A',
  rating NUMERIC(3,1) NOT NULL DEFAULT 3.5,
  release_date TEXT NOT NULL DEFAULT '',
  distributor TEXT NOT NULL DEFAULT '',
  poster_description TEXT NOT NULL DEFAULT '',
  review TEXT NOT NULL DEFAULT '',
  gallery_descriptions TEXT[] NOT NULL DEFAULT '{}',
  related_slugs TEXT[] NOT NULL DEFAULT '{}',
  artwork_path TEXT,
  original_artwork_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.movies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Movies are publicly readable"
  ON public.movies FOR SELECT
  USING (true);

INSERT INTO storage.buckets (id, name, public)
VALUES ('movie-artwork', 'movie-artwork', true);

CREATE POLICY "Movie artwork is publicly accessible"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'movie-artwork');

CREATE POLICY "Service role can upload movie artwork"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'movie-artwork');

CREATE POLICY "Service role can update movie artwork"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'movie-artwork');

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_movies_updated_at
  BEFORE UPDATE ON public.movies
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();