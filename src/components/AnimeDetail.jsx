import { useEffect, useState } from "react";
import { useParams } from "react-router";
import TrailerPlayer from "./VideoPlayer";
import SpinnerLoading from "./SpinnerLoader";

export default function AnimeDetail() {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);

  useEffect(() => {
    if (!id) return;

    const timer = setTimeout(async () => {
      const res = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
      const data = await res.json();
      setAnime(data.data);
    }, 500);

    return () => clearTimeout(timer);
  }, [id]);

  if (!anime) return <SpinnerLoading />;

  return (
    <div className='max-w-3xl mx-auto rounded-2xl sm:shadow p-10 mb-10'>
      <TrailerPlayer trailer={anime.trailer.embed_url} />
      <div className='flex gap-4 text-sm  mb-5'>
        <span>⭐ {anime.score.toFixed(2) || "N/A"}</span>
        <span>🎬 {anime.episodes || "?"} episodes</span>
        <span>📅 {anime.year || "Unknown"}</span>
      </div>
      <div className='grid sm:grid-cols-4 items-center gap-2'>
        <div className='sm:col-span-3'>
          <h1 className='text-3xl font-bold mb-2'>{anime.title}</h1>
          <p className='mb-4 sm:pr-2'>{anime.synopsis}</p>
          {anime.genres?.length > 0 && (
            <div className='flex flex-wrap gap-2'>
              {anime?.genres?.map((genre) => (
                <div key={genre.mal_id} className='badge badge-accent'>
                  {genre.name}
                </div>
              ))}
            </div>
          )}
        </div>
        <img
          src={anime.images.webp.large_image_url}
          alt={anime.title}
          className='w-full max-w-sm mx-auto h-50 sm:h-auto rounded-xl mb-4 mt-5 sm:mt-0 object-contain'
        />
      </div>

      {/* {console.log(anime)} */}
    </div>
  );
}
