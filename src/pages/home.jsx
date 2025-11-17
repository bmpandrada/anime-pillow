import React, { useEffect } from "react";
import { useAnime } from "../common/context/ContextApi";
import { SuspenseSkeleton } from "../common/hooks/SuspenseSkeleton";
import AnimeSection from "../common/components/AnimeSection";

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

  const sections = [
    {
      show: character.length,
      title: "Anime Seasons",
      items: displayedAnime,
      link: "/anime",
      pause: true,
    },
    {
      show: displayedUpcomming.length,
      title: "Coming Soon",
      items: displayedUpcomming,
      link: "/anime",
      pause: false,
    },
    {
      show: displayedCharacters.length,
      title: "Top Characters",
      items: displayedCharacters,
      link: "/characters",
      pause: true,
    },
  ];

  return (
    <>
      <title>Welcome | TopAnimePillow</title>
      <meta name='description' content='Top Anime Pillow — BMPA' />
      <meta
        property='og:description'
        content='Welcome to top anime pillow page'
      />
      <meta property='og:type' content='website' />
      <meta property='og:url' content='https://anime-pillow.vercel.app' />
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
        <div className='my-5'>
          <SuspenseSkeleton loading={loading} qty={3}>
            {sections.map(
              ({ show, title, items, link, pause }) =>
                show && (
                  <AnimeSection key={title} show title={title}>
                    <FeaturedCard
                      items={items}
                      custom_link={link}
                      pause={pause}
                    />
                  </AnimeSection>
                ),
            )}
          </SuspenseSkeleton>
        </div>
      </div>
    </>
  );
};

export default HomePage;
