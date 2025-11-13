import { useEffect, useState } from "react";
import { useAnime } from "../common/context/ContextApi";
import SkeletonCard from "../common/components/Loaders/SkeletonCard";
import FeaturedCard from "../common/components/AnimeCard/FeaturedCard";
import TitleDivider from "../common/components/TitleDivider";

const HomePage = () => {
  const { anime, character, upcomming, loading } = useAnime();
  const [currentPage] = useState(1);
  const perPage = 20;

  const displayedAnime = anime;

  const featuredAnime = currentPage * perPage;
  const currentAnime = displayedAnime.slice(0, featuredAnime);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <title>Welcome | TopAnimePillow</title>
      <meta name='description' content='Top Anime Pillow — BMPA' />
      <meta
        property='og:description'
        content='Welcome to top anime pillow page'
      />
      <meta property='og:type' content='website' />
      <meta property='og:url' content='https://anime-pillow.vercel.app/anime' />
      <meta
        property='og:image'
        content='https://anime-pillow.vercel.app/icons/icon-192x192.png'
      />

      <meta property='og:title' content='Welcome | TopAnimePillow' />
      <meta name='TopAnimePillow' content='Welcome to top anime pillow page' />
      <meta
        name='keywords'
        content='Anime, Anime streaming, Anime online, Anime streaming sites, Best anime, Best anime movies, Character, Manga, Anime movies, Anime series, Japanese anime'
      />
      <meta name='author' content='BMPA' />
      <link rel='canonical' href='https://anime-pillow.vercel.app/' />

      <div className=''>
        {character.length > 0 && <TitleDivider title={"Anime Seasons"} />}
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
                    items={currentAnime}
                    custom_link={"/anime"}
                    pause={true}
                  />
                  <>
                    {displayedAnime.length > 0 && (
                      <TitleDivider title={"Coming Soon"} />
                    )}

                    <FeaturedCard
                      pause={false}
                      items={upcomming}
                      custom_link={"/anime"}
                    />
                  </>
                  <>
                    {character.length > 0 && (
                      <TitleDivider title={"Top Characters"} />
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
    </>
  );
};

export default HomePage;
