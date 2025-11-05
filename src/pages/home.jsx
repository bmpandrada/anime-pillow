import { useRef, useState } from "react";
import { useAnime } from "../context/ContextApi";
import SkeletonCard from "../components/SkeletonCard";
import HeroAnime from "../components/HeroAnime";
import FeaturedCard from "../components/FeaturedCard";
import CharacterCards from "../components/CharacterCards";
import CardContainer from "../components/CardContainer";

const HomePage = () => {
  const { anime, character, loading } = useAnime();
  const [currentPage] = useState(1);
  const perPage = 20;

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
      {character.length > 0 && (
        <h1 className='text-2xl mt-5 text-accent antialiased font-semibold'>
          Featured Characters
        </h1>
      )}
      <div className='mt-5'></div>
      <FeaturedCard
        key={character.mal_id}
        items={character}
        custom_link={"/characters"}
      />
      <div className='mb-20'></div>
    </div>
  );
};

export default HomePage;
