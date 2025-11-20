import React, { useEffect, useMemo, useState } from "react";
import HeroBtn from "./HeroBtn";
import HeroBroadCast from "./HeroBroadCast";

const HeroAnime = ({ displayedAnime = [] }) => {
  const [offset, setOffset] = useState(0);

  const bannerItems = useMemo(
    () => displayedAnime.slice(0, 4),
    [displayedAnime],
  );

  const anime = useMemo(() => {
    if (!bannerItems.length) return null;
    const randomIndex = Math.floor(Math.random() * bannerItems.length);
    return bannerItems[randomIndex];
  }, [bannerItems]);

  useEffect(() => {
    const handleScroll = () => setOffset(window.scrollY * 0.2);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!anime) return null;

  const banner = anime?.images?.webp?.image_url || "/wallpper.webp";
  const titleHeader = anime?.title_english || anime?.title || "Untitled Anime";
  const synopsis = anime?.synopsis || "No synopsis available.";
  const broadCast = anime?.broadcast;
  const linkPage = anime?.mal_id;

  return (
    <section className='relative w-full h-[80vh] sm:h-[90vh] lg:h-[100vh] overflow-hidden'>
      <img
        src={banner}
        alt={titleHeader}
        fetchPriority='high'
        className='absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out scale-105'
        style={{ transform: `translateY(${offset}px)` }}
        onError={(e) => {
          e.currentTarget.src = "/wallpper.webp";
        }}
      />
      <div className='absolute inset-0 backdrop-blur-sm bg-gradient-to-t from-black/80 via-black/40 to-transparent'></div>
      <div className='absolute inset-0 bg-gradient-to-r from-black/70 to-transparent'></div>

      <div className='relative z-10 max-w-7xl mx-auto px-6 h-full flex flex-col justify-center lg:justify-end lg:pb-30 gap-4'>
        <div className='text-warning text-xl sm:text-3xl font-bold flex items-center gap-2'>
          <p className='pillow font-momo-signature'>
            AnimePillow{" "}
            <span className='text-white text-sm sm:text-lg'>presenting</span>
          </p>
        </div>

        <h1 className='text-white font-extrabold text-3xl sm:text-5xl lg:text-6xl leading-tight max-w-3xl line-clamp-2 truncate'>
          {titleHeader}
        </h1>

        <p className='text-white text-sm sm:text-lg max-w-2xl line-clamp-4'>
          {synopsis}
        </p>

        <div className='grid space-y-5'>
          <HeroBroadCast broadCast={broadCast} />
          <HeroBtn linkPage={linkPage} />
        </div>
      </div>
      <div className='absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent'></div>
    </section>
  );
};

export default React.memo(HeroAnime);
