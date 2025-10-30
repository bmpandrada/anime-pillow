import { useEffect, useState } from "react";
import { useParams } from "react-router";
import SpinnerLoading from "./SpinnerLoader";
import TrailerPlayer from "./VideoPlayer";
import PromoVideos from "./PromoVideos";
import PromoCarousel from "./PromoVideos";

export default function AnimeDetail() {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);
  // const [promoVideos, setPromoVideos] = useState([]);

  useEffect(() => {
    if (!id) return;

    const fetchAnime = async () => {
      const res = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
      const data = await res.json();
      setAnime(data.data);
    };

    fetchAnime();
  }, [id]);

  // useEffect(() => {
  //   if (!id) return;

  //   const fetchAnime = async () => {
  //     const res = await fetch(`https://api.jikan.moe/v4/anime/${id}/videos`);
  //     const data = await res.json();
  //     setPromoVideos(data.data.promo);
  //   };

  //   fetchAnime();
  // }, [id]);

  if (!anime) return <SpinnerLoading />;

  return (
    <div className='max-w-3xl mx-auto rounded-2xl sm:shadow p-10 mb-10'>
      <TrailerPlayer trailer={anime.trailer.embed_url} />

      {/* <PromoCarousel>
        {promoVideos.map((item) => (
          <TrailerPlayer
            key={item.id}
            trailer={item.trailer.embed_url}
            className={"p-5"}
          />
        ))}
      </PromoCarousel> */}

      <div className='flex gap-4 text-sm  mb-5'>
        <span>⭐ {anime.score.toFixed(2) || "N/A"}</span>
        <span>🎬 {anime.episodes || "?"} episodes</span>
        <span>📅 {anime.year || "Unknown"}</span>
      </div>
      <div className='grid sm:grid-cols-4 items-center gap-2'>
        <div className='sm:col-span-3'>
          <h1 className='text-3xl font-bold mb-2'>{anime.title}</h1>
          <p className=' mb-4'>{anime.synopsis}</p>
        </div>
        <img
          src={anime.images.webp.large_image_url}
          alt={anime.title}
          className='w-full max-w-sm mx-auto h-50 sm:h-auto rounded-xl mb-4 object-contain'
        />
      </div>
    </div>
  );
}
