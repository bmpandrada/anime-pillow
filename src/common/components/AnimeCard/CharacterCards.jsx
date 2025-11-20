import { Link } from "react-router";
import TitleDivider from "../TitleDivider";
import SkeletonCard from "../Loaders/SkeletonCard";
import React, { useCallback, useState } from "react";

const CharacterCards = ({ char = [], loading }) => {
  const [isActiveIndex, setActiveIndex] = useState(null);
  if (!char || char.length === 0) return null;

  const handleTouchStart = useCallback((id) => setActiveIndex(id), []);
  const handleTouchEnd = useCallback(
    () => setTimeout(() => setActiveIndex(null), 50),
    [],
  );

  return (
    <>
      <TitleDivider title={`Anime Character${char.length > 1 ? "s" : ""}`} />

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 mt-5 mb-10'>
        {loading
          ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
          : char.map((c) => (
              <Link
                key={c.character?.mal_id}
                to={`/characters/${c.character?.mal_id}`}
                onTouchStart={() => handleTouchStart(c.character?.mal_id)}
                onTouchEnd={handleTouchEnd}
                className='group flex w-full h-28 sm:h-32 rounded-xl overflow-hidden border-0 shadow-sm dark:bg-black transition-transform duration-300 hover:scale-105 hover:shadow-md'
              >
                <figure className='w-24 sm:w-28 h-full overflow-hidden rounded-l-xl'>
                  <img
                    src={
                      c.character?.images?.webp?.image_url || "/wallpper.webp"
                    }
                    alt={c.character?.name || "Character"}
                    loading='lazy'
                    onError={(e) => (e.currentTarget.src = "/wallpper.webp")}
                    className={`w-full h-full object-cover transition-transform duration-300
                      ${
                        isActiveIndex === c.character?.mal_id ? "scale-110" : ""
                      }
                      group-hover:scale-105
                    `}
                  />
                </figure>

                <div className='flex flex-col justify-center p-3 flex-1'>
                  <h2 className='text-sm font-semibold dark:text-white line-clamp-2'>
                    {c.character?.name}
                  </h2>
                  <span className='mt-2 w-fit bg-yellow-500 text-black text-[10px] px-2 py-0.5 rounded-full font-semibold tracking-wide'>
                    {c?.role}
                  </span>
                </div>
              </Link>
            ))}
      </div>
    </>
  );
};

export default React.memo(CharacterCards);
