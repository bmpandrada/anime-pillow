import { useEffect, useState } from "react";
import { useAnime } from "../common/context/ContextApi";
import CardContainer from "../common/components/AnimeCard/CardContainer";
import Pagination from "../common/components/Navigation/Pagination";
import SkeletonCard from "../common/components/Loaders/SkeletonCard";
import AlphabetPagination from "../common/components/Navigation/AlphabetPagination";

const MoviePage = () => {
  const {
    filteredByLetter,
    selectedLetter,
    setSelectedLetter,
    filteredMovieByLetter,
    loading,
  } = useAnime();
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 12;

  const currentMovie = filteredByLetter(filteredMovieByLetter);

  const totalPage = Math.ceil(currentMovie.length / perPage);

  const lastIndex = currentPage * perPage;
  const firstIndex = lastIndex - perPage;
  const pagedMovies = currentMovie.slice(firstIndex, lastIndex);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <title>Movie | TopAnimePillow</title>
      <meta name='description' content='Top Anime Pillow — BMPA' />
      <meta property='og:description' content='Movie card page' />
      <meta property='og:type' content='website' />
      <meta property='og:url' content='https://anime-pillow.vercel.app/anime' />
      <meta
        property='og:image'
        content='https://anime-pillow.vercel.app/icons/icon-192x192.png'
      />

      <meta property='og:title' content='Movie | TopAnimePillow' />
      <meta name='TopAnimePillow' content='Movie card page' />
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
              {currentMovie.length === 0 ? (
                <div className='flex justify-center items-center min-h-[60vh] col-span-full'>
                  <p className='text-center font-bold text-4xl text-gray-600'>
                    Not Found
                  </p>
                </div>
              ) : (
                pagedMovies.map((item) => (
                  <CardContainer key={item.mal_id} item={item} />
                ))
              )}
            </>
          )}
        </div>

        <div className='flex justify-center gap-2 mt-8'>
          {totalPage > 1 && (
            <>
              {Array.from({ length: totalPage }, (_, ibtn) => (
                <Pagination
                  totalPage={totalPage}
                  ibtn={ibtn}
                  key={ibtn + 1}
                  setCurrentPage={setCurrentPage}
                />
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default MoviePage;
