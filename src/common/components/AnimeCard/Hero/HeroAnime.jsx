import React, { useEffect, useState } from "react";
import HeroBtn from "./HeroBtn";
import HeroBroadCast from "./HeroBroadCast";

const HeroAnime = ({ displayedAnime }) => {
  const [titleHeader, setTitleHeader] = useState("");
  const [broadCast, setBroadCast] = useState(null);
  const [banner, setBanner] = useState(null);
  const [linkPage, setLinkPage] = useState(null);
  const [synopsis, setSynopsis] = useState("");
  const [offset, setOffset] = useState(0); // parallax offset

  useEffect(() => {
    if (!displayedAnime?.length) return;

    const randomIndex = Math.floor(Math.random() * displayedAnime.length);
    const anime = displayedAnime[randomIndex];

    setTitleHeader(anime?.title_english || anime?.title || "Untitled Anime");
    setBroadCast(anime?.broadcast);
    setBanner(anime?.images?.webp?.image_url || "/wallpper.webp");
    setLinkPage(anime?.mal_id);
    setSynopsis(anime?.synopsis || "No synopsis available.");
  }, [displayedAnime]);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY * 0.3);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className='relative w-full h-[80vh] sm:h-[90vh] lg:h-[100vh] overflow-hidden'>
      <img
        src={banner}
        alt={titleHeader}
        fetchPriority='high'
        className='absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out scale-105'
        style={{ transform: `translateY(${offset}px)` }}
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
