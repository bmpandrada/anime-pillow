import { useEffect, useState } from "react";
import { useAnime } from "../common/context/ContextApi";
import CardContainer from "../common/components/AnimeCard/CardContainer";
import Pagination from "../common/components/Navigation/Pagination";
import SkeletonCard from "../common/components/Loaders/SkeletonCard";
import AlphabetPagination from "../common/components/Navigation/AlphabetPagination";

const AnimePage = () => {
  const {
    filteredAnimeByLetter,
    filteredUpcomingByLetter,
    filteredByLetter,
    setSelectedLetter,
    selectedLetter,
    loading,
  } = useAnime();
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 12;

  const combinedAnime = [
    ...filteredAnimeByLetter,
    ...filteredUpcomingByLetter,
  ].filter(
    (item, index, self) =>
      index === self.findIndex((a) => a.mal_id === item.mal_id),
  );
  const displayedAnime = filteredByLetter(combinedAnime);

  const totalPage = Math.ceil(displayedAnime.length / perPage);
  const lastIndex = currentPage * perPage;
  const firstIndex = lastIndex - perPage;
  const currentAnime = displayedAnime.slice(firstIndex, lastIndex);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <title>Anime | TopAnimePillow</title>
      <meta name='description' content='Top Anime Pillow — BMPA' />
      <meta property='og:description' content='Top Anime Pillow — BMPA' />
      <meta property='og:type' content='website' />
      <meta property='og:url' content='https://anime-pillow.vercel.app/anime' />
      <meta
        property='og:image'
        content='https://anime-pillow.vercel.app/icons/icon-192x192.png'
      />

      <meta property='og:title' content='Anime | TopAnimePillow' />
      <meta name='TopAnimePillow' content='Anime card page' />
      <meta
        name='keywords'
        content='Anime, Anime streaming, Anime online, Anime streaming sites, Best anime, Best anime movies, Character, Manga, Anime movies, Anime series, Japanese anime'
      />
      <meta name='author' content='BMPA' />
      <link rel='canonical' href='https://anime-pillow.vercel.app/' />

      <div className='px-5 sm:px-10'>
        <AlphabetPagination
          selectedLetter={selectedLetter}
          setSelectedLetter={setSelectedLetter}
          setCurrentPage={setCurrentPage}
        />

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
                  <CardContainer key={item.mal_id} item={item} />
                ))
              )}
            </>
          )}
        </div>

        {/* Pagination */}
        <div className='flex justify-center gap-2 mt-8'>
          {totalPage > 1 &&
            Array.from({ length: totalPage }, (_, ibtn) => (
              <Pagination
                totalPage={totalPage}
                ibtn={ibtn}
                key={ibtn + 1}
                setCurrentPage={setCurrentPage}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default AnimePage;
