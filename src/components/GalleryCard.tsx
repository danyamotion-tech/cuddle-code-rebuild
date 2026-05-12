import { Link } from "react-router-dom";
import type { Movie } from "@/data/movies";
import { posterMap } from "@/data/posterImports";

interface GalleryCardProps {
  movie: Movie;
  aspectClass?: string;
}

const GalleryCard = ({ movie }: GalleryCardProps) => {
  const poster = movie.artworkUrl || posterMap[movie.slug];

  return (
    <Link
      to={`/reviews/${movie.slug}`}
      className="relative overflow-hidden cursor-pointer group block"
    >
      <img
        src={poster}
        alt={movie.title}
        loading="lazy"
        className="w-full h-auto block transition-opacity duration-500 group-hover:opacity-80"
      />
    </Link>
  );
};

export default GalleryCard;