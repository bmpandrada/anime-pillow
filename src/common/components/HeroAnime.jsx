import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router";
import { useEffect, useState } from "react";

const HeroAnime = ({ displayedAnime }) => {
  const [titleHeader, setTitleHeader] = useState("");
  const [broadCast, setBroadCast] = useState(null);
  const [banner, setBanner] = useState("");
  const [linkPage, setLinkPage] = useState(null);
  const [synopsis, setSynopsis] = useState("");

  useEffect(() => {
    if (displayedAnime.length === 0) return;

    const randomIndex = Math.floor(Math.random() * displayedAnime.length);
    const anime = displayedAnime[randomIndex];

    setTitleHeader(anime?.title_english || anime?.title);
    setBroadCast(anime?.broadcast);
    setBanner(anime?.images?.webp?.image_url);
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
      {console.log(synopsis)}
      <div className='absolute inset-0 bg-gradient-to-r from-black/90 to-accent/70'>
        {" "}
      </div>
      <div className='hero-content flex-col lg:flex-row'>
        <img
          src={banner}
          className='max-w-full rounded-lg shadow-2xl  object-contain'
          alt={titleHeader || "Anime Banner"}
        />

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
          <span className='w-100 truncate overflow-hidden whitespace-nowrap text-white line-clamp-2'>
            {synopsis}
          </span>
          <div className='text-sm sm:text-md text-warning'>
            {!broadCast?.day ||
            !broadCast?.string ||
            broadCast?.day.includes("unknown") ||
            broadCast?.string.includes("unknown") ? (
              <p className='text-lg sm:text-3xl font-bold'>Upcoming</p>
            ) : (
              <>
                <p>
                  {broadCast?.day} {broadCast?.string}
                  <br />
                  {broadCast?.timezone && (
                    <span>Timezone: {broadCast?.timezone}</span>
                  )}
                </p>
              </>
            )}
            <br /> <br />
            <div className='flex items-center gap-2 text-warning'>
              <a
                href={`https://www.linkedin.com/in/bruce-michael-andrada-565b561a4/`}
                target='_blank'
              >
                <FaLinkedin className='text-2xl hover:text-blue-400 transition' />
              </a>
              <a href={`https://github.com/bmpandrada`} target='_blank'>
                <FaGithub className='text-2xl hover:text-blue-400 transition' />
              </a>
            </div>
          </div>
          <Link
            className='btn btn-accent text-white hover:scale-105 transition-transform duration-300'
            to={`/anime/${linkPage}`}
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroAnime;
