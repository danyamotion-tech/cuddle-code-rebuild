import type { Movie } from "@/data/movies";

interface RSSImage {
  label: string;
  attributes: { height: string };
}

interface RSSEntry {
  "im:name": { label: string };
  "im:artist": { label: string };
  "im:image": RSSImage[];
  summary: { label: string };
  category: { attributes: { term: string } };
  id: { attributes: { "im:id": string } };
  rights?: { label: string };
  "im:releaseDate"?: { label: string; attributes?: { label: string } };
  link?: Array<{
    "im:duration"?: { label: string };
    attributes: Record<string, string>;
  }>;
}

interface RSSFeed {
  feed: { entry: RSSEntry[] };
}

const slugify = (text: string): string =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const formatRuntime = (millisStr?: string): string => {
  if (!millisStr) return "N/A";
  const minutes = Math.round(parseFloat(millisStr) / 1000 / 60);
  return minutes > 0 ? `${minutes} minutes` : "N/A";
};

const getHighResArtwork = (url: string): string =>
  url.replace(/\d+x\d+bb\.png/, "1200x1200bb.jpg");

const mapToMovie = (entry: RSSEntry, index: number): Movie => {
  const title = entry["im:name"].label;
  const slug = slugify(title);
  const director = entry["im:artist"].label;
  const genre = entry.category?.attributes?.term || "Movie";
  const summary = entry.summary?.label || "";
  const id = parseInt(entry.id.attributes["im:id"], 10);
  const artworkUrl = getHighResArtwork(
    entry["im:image"]?.[2]?.label || entry["im:image"]?.[0]?.label || ""
  );

  // Extract duration from link array
  const previewLink = entry.link?.find((l) => l["im:duration"]);
  const runtime = formatRuntime(previewLink?.["im:duration"]?.label);

  // Extract year from rights or release date
  const rightsText = entry.rights?.label || "";
  const yearMatch = rightsText.match(/\b(20\d{2})\b/);
  const year = yearMatch ? parseInt(yearMatch[1], 10) : new Date().getFullYear();

  return {
    id,
    slug,
    title,
    year,
    genre,
    director,
    writers: [],
    cast: [],
    cinematography: "",
    runtime,
    rating: 3.5 + (index % 3) * 0.5,
    releaseDate: `${year}`,
    distributor: "",
    posterDescription: "",
    review: summary,
    galleryDescriptions: [],
    relatedSlugs: [],
    artworkUrl,
  };
};

export const fetchITunesMovies = async (): Promise<Movie[]> => {
  // Use direct URL — iTunes RSS supports CORS
  const res = await fetch("https://itunes.apple.com/us/rss/topmovies/limit=25/json");
  if (!res.ok) throw new Error("Failed to fetch movies");
  const data: RSSFeed = await res.json();

  const movies = data.feed.entry
    .map((entry, i) => mapToMovie(entry, i))
    .filter((m) => m.artworkUrl);

  // Assign related slugs
  return movies.slice(0, 21).map((movie, i, arr) => ({
    ...movie,
    relatedSlugs: [
      arr[(i + 1) % arr.length].slug,
      arr[(i + 2) % arr.length].slug,
      arr[(i + 3) % arr.length].slug,
    ],
  }));
};
