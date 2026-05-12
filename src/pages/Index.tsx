import { useMemo } from "react";
import { useMovies } from "@/hooks/useMovies";
import { movies as fallbackMovies } from "@/data/movies";
import GalleryCard from "@/components/GalleryCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Skeleton } from "@/components/ui/skeleton";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const COL_OFFSETS = ["mt-0", "-mt-12", "-mt-6"];
const MOBILE_COL_OFFSETS = ["mt-0", "-mt-8"];
const COL_COMPENSATIONS = [0, 48, 24];
const MOBILE_COL_COMPENSATIONS = [0, 32];

const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };

const ScrollColumn = ({
  children,
  className,
  compensation,
}: {
  children: React.ReactNode;
  className: string;
  compensation: number;
}) => {
  const { scrollYProgress } = useScroll();
  const rawY = useTransform(scrollYProgress, [0, 1], [0, compensation]);
  const y = useSpring(rawY, springConfig);

  return (
    <motion.div className={className} style={{ y }}>
      {children}
    </motion.div>
  );
};

const Index = () => {
  const { data: dbMovies, isLoading } = useMovies();
  const movies = dbMovies && dbMovies.length > 0 ? dbMovies : fallbackMovies;

  const columns = useMemo(() => {
    const colCount = 3;
    const cols: typeof movies[] = Array.from({ length: colCount }, () => []);
    movies.forEach((movie, i) => {
      cols[i % colCount].push(movie);
    });
    return cols;
  }, [movies]);

  const mobileColumns = useMemo(() => {
    const cols: typeof movies[] = [[], []];
    movies.forEach((movie, i) => {
      cols[i % 2].push(movie);
    });
    return cols;
  }, [movies]);

  if (isLoading) {
    return (
      <main>
        <Header />
        <div className="flex gap-0.5 p-0.5">
          {[0, 1, 2].map((col) => (
            <div key={col} className={`flex-1 flex flex-col gap-0.5 ${COL_OFFSETS[col]}`}>
              {[0, 1, 2, 3].map((row) => (
                <Skeleton
                  key={row}
                  className="w-full aspect-[2/3] rounded-none"
                />
              ))}
            </div>
          ))}
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main>
      <Header />

      {/* Mobile: 2 columns */}
      <div className="flex gap-0.5 md:hidden overflow-hidden">
        {mobileColumns.map((col, colIndex) => (
          <ScrollColumn
            key={colIndex}
            className={`flex-1 flex flex-col gap-0.5 ${MOBILE_COL_OFFSETS[colIndex]}`}
            compensation={MOBILE_COL_COMPENSATIONS[colIndex]}
          >
            {col.map((movie) => (
              <GalleryCard key={movie.id} movie={movie} />
            ))}
          </ScrollColumn>
        ))}
      </div>

      {/* Desktop: 3 columns */}
      <div className="hidden md:flex gap-0.5 overflow-hidden">
        {columns.map((col, colIndex) => (
          <ScrollColumn
            key={colIndex}
            className={`flex-1 flex flex-col gap-0.5 ${COL_OFFSETS[colIndex]}`}
            compensation={COL_COMPENSATIONS[colIndex]}
          >
            {col.map((movie) => (
              <GalleryCard key={movie.id} movie={movie} />
            ))}
          </ScrollColumn>
        ))}
      </div>

      <Footer />
    </main>
  );
};

export default Index;