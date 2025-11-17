import { useEffect, useState } from "react";
import { useAnime } from "../common/context/ContextApi";
import CardContainer from "../common/components/AnimeCard/CardContainer";
import Pagination from "../common/components/Navigation/Pagination";
import AlphabetPagination from "../common/components/Navigation/AlphabetPagination";
import ErrorMesssage from "../common/components/ErrorMessage";
import { SuspenseSkeleton } from "../common/hooks/SuspenseSkeleton";
import SEO from "../common/components/layouts/SeoConfig";

const MoviePage = () => {
  const {
    filteredByLetter,
    selectedLetter,
    setSelectedLetter,
    filteredMovieByLetter,
    loading,
    error,
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
      <SEO
        title={`Movie | TopAnimePillow`}
        description={"Top Anime Pillow — BMPA"}
        image={"https://anime-pillow.vercel.app/icons/icon-192x192.png"}
        keywords={[
          "Anime, Anime streaming, Anime online, Anime streaming sites, Best anime, Best anime movies, Character, Manga, Anime movies, Anime series, Japanese anime",
        ]}
        url={"https://anime-pillow.vercel.app/movies"}
      />

      <div className='px-5 sm:px-10'>
        <AlphabetPagination
          selectedLetter={selectedLetter}
          setSelectedLetter={setSelectedLetter}
          setCurrentPage={setCurrentPage}
        />
        <ErrorMesssage
          error={error && !loading}
          isEmpty={!loading && currentMovie.length === 0}
        />
        <div className='grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-5'>
          <SuspenseSkeleton loading={loading} qty={8}>
            {pagedMovies.length > 0 &&
              pagedMovies.map((item) => (
                <CardContainer key={item.mal_id} item={item} />
              ))}
          </SuspenseSkeleton>
        </div>

        <div className='flex justify-center gap-2 my-8'>
          {totalPage > 1 && (
            <>
              {Array.from({ length: totalPage }, (_, ibtn) => (
                <Pagination
                  totalPage={totalPage}
                  ibtn={ibtn}
                  key={ibtn + 1}
                  setCurrentPage={setCurrentPage}
                  currentPage={currentPage}
                  scrollTop={true}
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
