import { Link } from "react-router";

const CharacterCards = ({ char = [] }) => {
  if (!char.length < 0) return;
  return (
    <>
      <h1 className='mt-10 text-lg sm:text-2xl font-semibold text-success'>
        Characters
      </h1>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 mt-5 mb-10'>
        {char.map((char) => (
          <Link
            className='card bg-base-200 w-full shadow-sm'
            to={`/characters/${char.character.mal_id}`}
          >
            <figure>
              <img
                src={char.character.images.webp.image_url}
                alt={char.character.name}
                className='w-full h-60 object-cover transform transition-transform duration-300 hover:scale-105'
              />
            </figure>
            <div className='card-body '>
              <h2 className='card-title text-xs flex flex-wrap justify-between items-center'>
                {char.character.name}
                <div className='badge badge-warning text-xs'>{char.role}</div>
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default CharacterCards;
