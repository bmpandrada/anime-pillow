import { useState } from "react";
import { useAnime } from "../common/context/ContextApi";
import SkeletonCard from "../common/components/SkeletonCard";
import FeaturedCard from "../common/components/FeaturedCard";
import TitleDivider from "../common/components/TitleDivider";

const HomePage = () => {
  const { anime, character, upcomming, loading } = useAnime();
  const [currentPage] = useState(1);
  const perPage = 20;

  const displayedAnime = anime;

  const featuredAnime = currentPage * perPage;
  const currentAnime = displayedAnime.slice(0, featuredAnime);

  return (
    <div className='px-5 sm:px-10'>
      {character.length > 0 && <TitleDivider title={"Upcomming"} />}
      <div className='mt-5'>
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
        ) : (
          <>
            {displayedAnime.length === 0 ? (
              <div className='flex justify-center items-center min-h-[60vh] col-span-full'>
                <p className='text-center font-bold text-4xl text-gray-600'>
                  Not Found
                </p>
              </div>
            ) : (
              <>
                <FeaturedCard
                  items={upcomming}
                  custom_link={"/anime"}
                  pause={true}
                />
                <>
                  {displayedAnime.length > 0 && (
                    <TitleDivider title={"Featured Anime"} />
                  )}

                  <FeaturedCard
                    pause={false}
                    items={currentAnime}
                    custom_link={"/anime"}
                  />
                </>
                <>
                  {character.length > 0 && (
                    <TitleDivider title={"Featured Character"} />
                  )}
                  <div className='mt-5'></div>
                  <FeaturedCard
                    items={character}
                    custom_link={"/characters"}
                    pause={true}
                  />
                </>
              </>
            )}
          </>
        )}
      </div>

      <div className='mb-20'></div>
    </div>
  );
};

export default HomePage;
