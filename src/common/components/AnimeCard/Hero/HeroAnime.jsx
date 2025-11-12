import { useEffect, useState } from "react";
import HeroBtn from "./HeroBtn";
import HeroBroadCast from "./HeroBroadCast";

const HeroAnime = ({ displayedAnime }) => {
  const [titleHeader, setTitleHeader] = useState("");
  const [broadCast, setBroadCast] = useState(null);
  const [banner, setBanner] = useState(null);
  const [linkPage, setLinkPage] = useState(null);
  const [synopsis, setSynopsis] = useState("");

  useEffect(() => {
    if (displayedAnime.length === 0) return;

    const randomIndex = Math.floor(Math.random() * displayedAnime.length);
    const anime = displayedAnime[randomIndex];

    setTitleHeader(anime?.title_english || anime?.title);
    setBroadCast(anime?.broadcast);
    setBanner(anime?.images?.webp?.image_url || null);
    setLinkPage(anime?.mal_id);
    setSynopsis(anime?.synopsis);
  }, []);

  return (
    <div
      className='hero bg-base-200 relative shadow-sm sm:pb-5'
      style={{
        backgroundImage: `url(${banner})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className='absolute inset-0 bg-gradient-to-r from-black/90 to-accent/70'>
        {" "}
      </div>
      <div className='hero-content flex-col lg:flex-row'>
        {banner && banner.trim().length > 0 && (
          <img
            src={banner}
            className='max-w-full rounded-lg shadow-2xl object-cover'
            alt={titleHeader || "Anime Banner"}
          />
        )}

        <div className='space-y-2'>
          <div className='text-lg sm:text-xl font-bold text-warning flex items-center gap-2'>
            <p className='pillow font-momo-signature'>
              AnimePillow{" "}
              <span className='text-white text-sm sm:text-lg'>presenting</span>
            </p>
          </div>
          <div className='w-[180px] h-[2px] bg-gradient-to-r from-base-300 to-transparent mt-2'></div>
          <p className='text-md sm:text-xl font-semibold  md:text-2xl text-white'>
            {titleHeader}
          </p>
          <span className='w-50 sm:w-100 truncate overflow-hidden whitespace-nowrap text-white line-clamp-2'>
            {synopsis}
          </span>
          <HeroBroadCast broadCast={broadCast} />
          <HeroBtn linkPage={linkPage} />
        </div>
      </div>
    </div>
  );
};

export default HeroAnime;
