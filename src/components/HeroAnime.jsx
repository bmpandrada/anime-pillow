import { Link } from "react-router";

const HeroAnime = () => {
  return (
    <div className='hero bg-base-200 rounded-2xl mt-5 shadow-sm'>
      <div className='hero-content flex-col lg:flex-row'>
        <img
          src='https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp'
          className='max-w-sm rounded-lg shadow-2xl'
        />
        <div>
          <h1 className='text-5xl font-bold text-success'>Anime Pillow!</h1>
          <p className='py-6 text-lg'>
            Because the best stories are worth dreaming about.
          </p>

          <Link className='btn btn-primary' to={"/anime"}>
            Discover
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroAnime;
