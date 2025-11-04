import AnimeGenre from "./AnimeGenre";
import AnimeInfo from "./AnimeInfo";
import TrailerPlayer from "./VideoPlayer";

const MainFigure = ({ anime }) => {
  return (
    <div className='grid sm:grid-cols-1 col-span-2 items-center gap-2'>
      <div className='sm:col-span-3'>
        <div className=''>
          <h1 className='text-xl sm:text-2xl md:text-3xl font-bold mb-2'>
            {anime.title}
          </h1>
          <p className='mb-4 sm:pr-2 antialiased figcaption'>
            {anime.synopsis}
          </p>
          {anime.genres?.length > 0 && <AnimeGenre anime={anime} />}
          <AnimeInfo anime={anime} />
        </div>
      </div>
      <TrailerPlayer
        trailer={anime.trailer.embed_url}
        className={"col-span-2"}
      />
    </div>
  );
};

export default MainFigure;
