import { useState } from "react";
import { useAnime } from "../context/ContextApi";
import SkeletonCard from "../components/SkeletonCard";
import HeroAnime from "../components/HeroAnime";
import FeaturedCard from "../components/FeaturedCard";

const HomePage = () => {
  const { anime, loading } = useAnime();
  const [currentPage] = useState(1);
  const perPage = 4;

  const displayedAnime = anime;

  const featuredAnime = currentPage * perPage;
  const currentAnime = displayedAnime.slice(0, featuredAnime);

  return (
    <div className='px-5 sm:px-10'>
      <HeroAnime />
      {displayedAnime.length > 0 && (
        <h1 className='text-2xl mt-5 text-accent antialiased font-semibold'>
          Featured Anime
        </h1>
      )}
      <div className='grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-5'>
        {loading ? (
          Array.from({ length: perPage }).map((_, i) => (
            <SkeletonCard key={i} />
          ))
        ) : (
          <>
            {displayedAnime.length === 0 ? (
              <div className='flex justify-center items-center min-h-[60vh] col-span-full'>
                <p className='text-center font-bold text-4xl text-gray-600'>
                  Not Found
                </p>
              </div>
            ) : (
              currentAnime.map((item) => (
                <FeaturedCard key={item.mal_id} item={item} />
              ))
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
