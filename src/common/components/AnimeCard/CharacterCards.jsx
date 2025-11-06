import { Link } from "react-router";
import TitleDivider from "../TitleDivider";
import SkeletonCard from "../Loaders/SkeletonCard";

const CharacterCards = ({ char = [], loading }) => {
  if (!char || char.length === 0) return null;

  return (
    <>
      <TitleDivider title={"Featured Character"} />
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 mt-5 mb-10'>
        {loading ? (
          Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
        ) : (
          <>
            {char.map((c) => (
              <Link
                key={c.character?.mal_id}
                className='card bg-base-200 w-full shadow-sm'
                to={`/characters/${c.character?.mal_id}`}
              >
                <figure>
                  <img
                    src={c.character?.images?.webp?.image_url}
                    alt={c.character?.name}
                    className='w-full h-60 object-cover transform transition-transform duration-300 hover:scale-105'
                  />
                </figure>
                <div className='card-body '>
                  <h2 className='card-title text-xs flex flex-wrap justify-between items-center'>
                    {c.character?.name}
                    <div className='badge badge-warning text-xs'>{c?.role}</div>
                  </h2>
                </div>
              </Link>
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default CharacterCards;
