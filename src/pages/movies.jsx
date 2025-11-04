import { useState } from "react";
import { useAnime } from "../context/ContextApi";
import CardContainer from "../components/CardContainer";
import Pagination from "../components/Pagination";
import SkeletonCard from "../components/SkeletonCard";
import AlphabetPagination from "../components/AlphabetPagination";

const MoviePage = () => {
  const {
    filteredByLetter,
    selectedLetter,
    setSelectedLetter,
    filteredMovie,
    loading,
  } = useAnime();
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 12;

  const currentMovie = filteredByLetter(filteredMovie);

  const totalPage = Math.ceil(currentMovie.length / perPage);

  const lastIndex = currentPage * perPage;
  const firstIndex = lastIndex - perPage;
  const pagedMovies = currentMovie.slice(firstIndex, lastIndex);

  return (
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
  );
};

export default MoviePage;
