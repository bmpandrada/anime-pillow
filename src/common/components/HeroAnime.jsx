import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router";
import { useEffect } from "react";
import { animateTitle } from "../hooks/animateTitle";

const HeroAnime = ({ displayedAnime }) => {
  const randomIndex = Math.floor(Math.random() * displayedAnime.length);
  const titleHeader =
    displayedAnime[randomIndex]?.background ||
    displayedAnime[randomIndex]?.title;
  const broadCast = displayedAnime[randomIndex]?.broadcast;
  const banner = displayedAnime[randomIndex]?.images.webp.image_url;
  const link_page = displayedAnime[randomIndex]?.mal_id;

  useEffect(() => {
    animateTitle(".pillow");
  }, []);

  return (
    <div
      className='hero bg-base-200 relative shadow-sm sm:pb-5'
      style={{
        backgroundImage: `url(${banner})`,
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
      }}
    >
      <div className='absolute inset-0 bg-gradient-to-r from-black/100 to-accent/90'>
        {" "}
      </div>
      <div className='hero-content flex-col lg:flex-row'>
        <img
          src={banner}
          className='max-w-full rounded-lg shadow-2xl  object-contain'
        />

        <div className='space-y-2'>
          <div className='text-3xl sm:text-5xl font-bold text-warning flex items-center gap-2'>
            <span className='pillow'>Anime Pillow!</span>
          </div>
          <div className='w-[180px] h-[2px] bg-gradient-to-r from-base-300 to-transparent mt-2'></div>
          <p className='text-md sm:text-xl font-semibold  md:text-2xl text-white'>
            {titleHeader}
          </p>
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
          <Link className='btn btn-accent' to={`/anime/${link_page}`}>
            Discover
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroAnime;
