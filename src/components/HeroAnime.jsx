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
    <div className='hero bg-base-200 shadow-sm'>
      <div className='hero-content flex-col lg:flex-row'>
        <img
          src={banner}
          className='max-w-sm rounded-lg shadow-2xl  object-contain'
        />
        <div className='space-y-2'>
          <h1 className='text-5xl font-bold text-accent'>Anime Pillow!</h1>

          <p className='text-xl sm:text-xl font-semibold  md:text-2xl text-warning'>
            {titleHeader}
          </p>
          <p className='text-md'>
            {broadCast?.day}, {broadCast?.string}
            <br />
            <span>Timezone: {broadCast?.timezone}</span>
          </p>
          <Link className='btn btn-primary' to={`/anime/${link_page}`}>
            Discover
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroAnime;
