import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

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
  "im:releaseDate"?: { label: string };
  link?: Array<{
    "im:duration"?: { label: string };
    attributes: Record<string, string>;
  }>;
}

const slugify = (text: string): string =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const formatRuntime = (millisStr?: string): string => {
  if (!millisStr) return "N/A";
  const minutes = Math.round(parseFloat(millisStr) / 1000 / 60);
  return minutes > 0 ? `${minutes} minutes` : "N/A";
};

const getHighResArtwork = (url: string): string =>
  url.replace(/\d+x\d+bb\.png/, "1200x1200bb.jpg");

// Editorial review templates that feel authentic
const reviewTemplates = [
  (title: string, director: string, genre: string) =>
    `${title} arrives with the kind of quiet confidence that distinguishes truly accomplished filmmaking from mere competence. ${director}'s direction demonstrates a masterful understanding of pacing and visual storytelling, crafting sequences that linger in the mind long after the credits roll.\n\nThe ${genre.toLowerCase()} elements serve not as genre constraints but as a framework for exploring deeper themes of identity, connection, and the passage of time. Every frame feels intentional, every cut purposeful.\n\nWhat elevates this film beyond its contemporaries is its refusal to offer easy answers. The narrative unfolds with a patience that rewards attentive viewers, building toward a conclusion that feels both inevitable and surprising.\n\nThis is cinema that trusts its audience, and that trust is rewarded with an experience that deepens on reflection. A remarkable achievement that solidifies its place among the year's most compelling releases.`,

  (title: string, director: string, genre: string) =>
    `There's a raw, uncompromising energy to ${title} that announces itself from the opening frame. ${director} has crafted something that feels both timeless and urgently contemporary — a ${genre.toLowerCase()} film that transcends its genre classification entirely.\n\nThe performances anchor the film with a naturalism that makes every moment feel lived-in rather than performed. The chemistry between the leads creates an emotional gravity that pulls the viewer deeper into the story's orbit.\n\nCinematographically, the film is a revelation. The camera work oscillates between intimate close-ups and sweeping compositions that contextualize the personal within the universal, creating a visual language uniquely suited to its themes.\n\nFew films this year have managed to balance ambition with execution so effortlessly. ${title} is the kind of film that reminds you why cinema matters.`,

  (title: string, director: string, genre: string) =>
    `${director} returns with ${title}, a film that represents both an evolution of their artistic vision and a bold statement about the possibilities of ${genre.toLowerCase()} storytelling. From its meticulously crafted opening to its emotionally devastating finale, this is filmmaking at its most assured.\n\nThe screenplay weaves multiple narrative threads with remarkable precision, each contributing to a larger tapestry that only reveals its full pattern in retrospect. Characters are drawn with nuance and complexity, avoiding the archetypes that lesser films rely upon.\n\nThe sound design deserves special mention — it creates an immersive sonic landscape that enhances the emotional resonance of every scene. Combined with a haunting score, the auditory experience alone justifies the price of admission.\n\nThis is a film that demands to be experienced rather than merely watched. It challenges, provokes, and ultimately rewards in equal measure.`,

  (title: string, director: string, genre: string) =>
    `With ${title}, ${director} delivers a meditation on human connection wrapped in the trappings of ${genre.toLowerCase()} filmmaking. It's a work of considerable depth, one that reveals new layers with each subsequent viewing.\n\nThe visual palette shifts throughout the film, mirroring the emotional journey of its characters with a subtlety that speaks to the director's growing command of the medium. Shadows and light become characters in their own right.\n\nWhat's most impressive is the film's ability to maintain tension without relying on conventional narrative devices. The story moves at its own pace, confident in its ability to hold attention through sheer artistic merit rather than manufactured urgency.\n\nIn an era of disposable entertainment, ${title} stands as a reminder that cinema can still surprise, still move, still matter. Essential viewing for anyone who takes the art form seriously.`,

  (title: string, director: string, genre: string) =>
    `${title} is the kind of film that critics struggle to categorize — and that's entirely the point. ${director} has created something that exists at the intersection of ${genre.toLowerCase()} convention and avant-garde experimentation, resulting in a work that feels genuinely new.\n\nThe ensemble cast delivers uniformly excellent performances, each actor bringing a specificity to their role that transforms what could have been stock characters into fully realized human beings. The dialogue crackles with authenticity.\n\nProduction design creates worlds within worlds, each environment telling its own story and contributing to the film's rich thematic texture. Nothing is incidental; every detail serves the greater whole.\n\nThis is ambitious filmmaking that actually delivers on its ambitions — a rare accomplishment that establishes ${director} as one of the most exciting voices in contemporary cinema.`,
];

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Fetch iTunes RSS
    const res = await fetch(
      "https://itunes.apple.com/us/rss/topmovies/limit=25/json"
    );
    if (!res.ok) throw new Error("Failed to fetch iTunes RSS");
    const data = await res.json();
    const entries: RSSEntry[] = data.feed.entry;

    const movies = entries.slice(0, 21).map((entry, index) => {
      const title = entry["im:name"].label;
      const slug = slugify(title);
      const director = entry["im:artist"].label;
      const genre = entry.category?.attributes?.term || "Movie";
      const summary = entry.summary?.label || "";
      const itunesId = entry.id.attributes["im:id"];
      const artworkUrl = getHighResArtwork(
        entry["im:image"]?.[2]?.label || entry["im:image"]?.[0]?.label || ""
      );

      const previewLink = entry.link?.find((l) => l["im:duration"]);
      const runtime = formatRuntime(previewLink?.["im:duration"]?.label);

      const rightsText = entry.rights?.label || "";
      const yearMatch = rightsText.match(/\b(20\d{2})\b/);
      const year = yearMatch
        ? parseInt(yearMatch[1], 10)
        : new Date().getFullYear();

      // Generate editorial review using template
      const template = reviewTemplates[index % reviewTemplates.length];
      const review = template(title, director, genre);

      return {
        itunes_id: itunesId,
        slug,
        title,
        year,
        genre,
        director,
        runtime,
        rating: 3.5 + (index % 3) * 0.5,
        release_date: `${year}`,
        review,
        original_artwork_url: artworkUrl,
        poster_description: summary,
      };
    });

    // Assign related slugs
    const moviesWithRelated = movies.map((movie, i) => ({
      ...movie,
      related_slugs: [
        movies[(i + 1) % movies.length].slug,
        movies[(i + 2) % movies.length].slug,
        movies[(i + 3) % movies.length].slug,
      ],
    }));

    // Download and upload artwork to storage
    let uploadedCount = 0;
    for (const movie of moviesWithRelated) {
      if (!movie.original_artwork_url) continue;

      try {
        const imgRes = await fetch(movie.original_artwork_url);
        if (!imgRes.ok) continue;

        const imageData = await imgRes.arrayBuffer();
        const filePath = `${movie.slug}.jpg`;

        const { error: uploadError } = await supabase.storage
          .from("movie-artwork")
          .upload(filePath, imageData, {
            contentType: "image/jpeg",
            upsert: true,
          });

        if (!uploadError) {
          (movie as any).artwork_path = filePath;
          uploadedCount++;
        } else {
          console.error(`Upload error for ${movie.slug}:`, uploadError.message);
        }
      } catch (e) {
        console.error(`Failed to download artwork for ${movie.slug}:`, e);
      }
    }

    // Upsert movies into DB
    const { error: dbError, data: dbData } = await supabase
      .from("movies")
      .upsert(moviesWithRelated, { onConflict: "itunes_id" })
      .select("id");

    if (dbError) throw dbError;

    return new Response(
      JSON.stringify({
        success: true,
        synced: moviesWithRelated.length,
        artworkUploaded: uploadedCount,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Sync error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
