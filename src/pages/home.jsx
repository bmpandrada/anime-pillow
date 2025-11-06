import { useState } from "react";
import { useAnime } from "../context/ContextApi";
import SkeletonCard from "../components/SkeletonCard";
import FeaturedCard from "../components/FeaturedCard";
import TitleDivider from "../components/TitleDivider";

const HomePage = () => {
  const { anime, character, loading } = useAnime();
  const [currentPage] = useState(1);
  const perPage = 20;

  const displayedAnime = anime;

  const featuredAnime = currentPage * perPage;
  const currentAnime = displayedAnime.slice(0, featuredAnime);

  return (
    <div className='px-5 sm:px-10'>
      {displayedAnime.length > 0 && <TitleDivider title={"Featured Anime"} />}
      <div className='mt-5'>
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
              <FeaturedCard
                key={anime.mal_id}
                items={currentAnime}
                custom_link={"/anime"}
              />
            )}
          </>
        )}
      </div>
      {character.length > 0 && <TitleDivider title={"Featured Character"} />}
      <div className='mt-5'></div>
      <FeaturedCard
        key={character.mal_id}
        items={character}
        custom_link={"/characters"}
        pause={true}
      />
      <div className='mb-20'></div>
    </div>
  );
};

export default HomePage;
