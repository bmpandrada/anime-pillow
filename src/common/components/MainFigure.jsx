// import { useEffect } from "react";
import AnimeGenre from "./AnimeDetail/AnimeGenre";
import AnimeInfo from "./AnimeDetail/AnimeInfo";
import TitleDivider from "./TitleDivider";
import TrailerPlayer from "./VideoPlayer";
// import { animateTitle } from "../hooks/animateTitle";

const MainFigure = ({ anime }) => {
  const trailerExist = anime?.trailer?.embed_url !== null ? true : false;

  // useEffect(() => {
  //   animateTitle(".pillow");
  // }, []);
  return (
    <div className='grid sm:grid-cols-1 col-span-2 items-center gap-2'>
      <div className='sm:col-span-3'>
        <div className=''>
          <h1 className='pillow text-xl sm:text-2xl md:text-3xl font-bold mb-2'>
            {anime?.title?.length < 0 ? "" : anime?.title}
            <div className='w-auto h-[2px] bg-gradient-to-r from-base-300 to-transparent mt-2'></div>
          </h1>

          <p className='mb-4 sm:pr-2 antialiased figcaption'>
            {anime?.synopsis}
          </p>
          {anime?.genres?.length > 0 && <AnimeGenre anime={anime} />}
          <AnimeInfo anime={anime} />
        </div>
        {trailerExist ? (
          <>
            <TitleDivider title={"Trailer"} />
            <TrailerPlayer
              trailer={anime?.trailer?.embed_url}
              className={"col-span-1 mt-5"}
            />
          </>
        ) : (
          <div className='mt-15 sm:mt-25 mb-25 sm:mb-50'>
            <TitleDivider title={"No trailer found"} />
          </div>
        )}
      </div>
    </div>
  );
};

export default MainFigure;
