import React, { Suspense, useEffect, useState } from "react";
import { useAnime } from "../common/context/ContextApi";
import SkeletonCard from "../common/components/Loaders/SkeletonCard";
import TitleDivider from "../common/components/TitleDivider";
import SpinnerLoading from "../common/components/Loaders/SpinnerLoader";

const FeaturedCard = React.lazy(() =>
  import("../common/components/AnimeCard/FeaturedCard"),
);

const HomePage = () => {
  const { anime, character, upcomming, loading } = useAnime();
  const perPage = 12;

  const displayedAnime = anime.slice(0, perPage);
  const displayedCharacters = character.slice(0, perPage);
  const displayedUpcomming = upcomming.slice(0, perPage);

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
                  <Suspense fallback={<SpinnerLoading />}>
                    <FeaturedCard
                      items={displayedAnime}
                      custom_link='/anime'
                      pause={true}
                    />
                  </Suspense>
                  <>
                    {displayedUpcomming.length > 0 && (
                      <TitleDivider title={"Coming Soon"} />
                    )}

                    <Suspense fallback={<SpinnerLoading />}>
                      <FeaturedCard
                        items={displayedUpcomming}
                        custom_link='/anime'
                        pause={false}
                      />
                    </Suspense>
                  </>
                  <>
                    {displayedCharacters.length > 0 && (
                      <TitleDivider title={"Top Characters"} />
                    )}
                    <div className='mt-5'></div>
                    <Suspense fallback={<SpinnerLoading />}>
                      <FeaturedCard
                        items={displayedCharacters}
                        custom_link='/characters'
                        pause={true}
                      />
                    </Suspense>
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
