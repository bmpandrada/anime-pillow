import { Link } from "react-router";
import TitleDivider from "../TitleDivider";
import SkeletonCard from "../Loaders/SkeletonCard";
import React, { useCallback, useState } from "react";

const CharacterCards = ({ char = [], loading }) => {
  const [isActiveIndex, setActiveIndex] = useState(null);
  if (!char || char.length === 0) return null;

  const handleTouchStart = useCallback((id) => setActiveIndex(id), []);
  const handleTouchEnd = useCallback(() =>
    setTimeout(() => setActiveIndex(null), 50),
  );

  return (
    <>
      <TitleDivider title={`Anime Character${char.length > 1 ? "s" : ""}`} />
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 mt-5 mb-10'>
        {loading ? (
          Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
        ) : (
          <>
            {char.map((c) => (
              <Link
                key={c.character?.mal_id}
                className='card card-side  bg-base-200 w-full shadow-sm group h-30'
                to={`/characters/${c.character?.mal_id}`}
                onTouchStart={() => handleTouchStart(c.character?.mal_id)}
                onTouchEnd={handleTouchEnd}
              >
                <figure>
                  <img
                    src={
                      c.character?.images?.webp?.image_url || "/wallpper.webp"
                    }
                    alt={c.character?.name || "Character Name"}
                    className={`w-50 object-cover transform transition-transform duration-300 ${
                      isActiveIndex === c.character?.mal_id ? "scale-110" : ""
                    } group-hover:scale-110`}
                    loading='lazy'
                  />
                </figure>
                <div className='card-body'>
                  <h2
                    className='card-title text-xs justify-between items-center'
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {c.character?.name}
                  </h2>
                  <span className='badge badge-warning text-xs text-white'>
                    {c?.role}
                  </span>
                </div>
              </Link>
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default React.memo(CharacterCards);
