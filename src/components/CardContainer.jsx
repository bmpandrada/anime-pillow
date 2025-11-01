import { Link } from "react-router";

const CardContainer = ({ item }) => {
  return (
    <Link
      to={`/anime/${item.mal_id}`}
      className='bg-base-200 rounded-2xl shadow hover:shadow-lg transition overflow-hidden'
    >
      <img
        src={item.images.webp.large_image_url}
        alt={item.title}
        className='w-full h-60 object-cover transform transition-transform duration-300 hover:scale-105'
      />
      <div className='p-4'>
        <h2 className='text-lg font-semibold text-base-900 truncate'>
          {item.title}
        </h2>
        <p className='text-sm font-semibold text-base-500 mt-1'>
          Episodes: {item.episodes || "?"}
        </p>
        {/* <p className='text-sm text-base-500 mt-1'>
          Genre: {item.genres.types || "?"}
        </p> */}
        <p className='text-yellow-500 font-bold mt-2'>
          ⭐ {item.score.toFixed(1) || "N/A"}
        </p>
      </div>
    </Link>
  );
};

export default CardContainer;
