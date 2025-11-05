import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router";

const HeroAnime = ({ displayedAnime }) => {
  const randomIndex = Math.floor(Math.random() * displayedAnime.length);
  const titleHeader =
    displayedAnime[randomIndex]?.background ||
    displayedAnime[randomIndex]?.title;
  const broadCast = displayedAnime[randomIndex]?.broadcast;
  const banner = displayedAnime[randomIndex]?.images.webp.image_url;
  const link_page = displayedAnime[randomIndex]?.mal_id;

  return (
    <div className='hero bg-base-200  bg-gradient-to-r from-black to-cyan-900 shadow-sm pb-5'>
      <div className='hero-content flex-col lg:flex-row'>
        <img
          src={banner}
          className='max-w-sm rounded-lg shadow-2xl  object-contain'
        />

        <div className='space-y-2'>
          <div className='text-5xl font-bold text-accent flex items-center gap-2'>
            <span>Anime Pillow!</span>
          </div>

          <p className='text-xl sm:text-xl font-semibold  md:text-2xl text-warning'>
            {titleHeader}
          </p>
          <div className='text-md'>
            {broadCast?.day} {broadCast?.string}
            <br />
            {broadCast?.timezone && (
              <span>Timezone: {broadCast?.timezone}</span>
            )}
            <div className='flex items-center gap-2 text-warning'>
              <a href={`${import.meta.env.VITE_LINK_LINKEDIN}`} target='_blank'>
                <FaLinkedin className='text-2xl hover:text-blue-400 transition' />
              </a>
              <a href={`${import.meta.env.VITE_LINK_GITHUB}`} target='_blank'>
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
