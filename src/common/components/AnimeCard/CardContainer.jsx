import React, { useCallback, useState } from "react";
import { Link, useLocation } from "react-router";

const CardContainer = ({ item }) => {
  const [isActiveIndex, setActiveIndex] = useState(null);
  const localPath = useLocation();
  const showEp = localPath.pathname === "/anime" || "/";

  const handleTouchStart = useCallback(() => {
    setActiveIndex(item.mal_id);
  }, [item.mal_id]);

  const handleTouchEnd = useCallback(() => {
    setTimeout(() => setActiveIndex(null), 50);
  }, []);

  return (
    <Link
      to={`${
        localPath.pathname === "/anime" || localPath.pathname === "/"
          ? "/anime"
          : "/movies"
      }/${item.mal_id}`}
      className='bg-base-200 rounded-2xl shadow hover:shadow-lg transition overflow-hidden group'
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <img
        src={item.images.webp.large_image_url || "/wallpper.webp"}
        alt={item.title || "Anime Title"}
        className={`w-full h-60 object-cover transform transition-transform duration-300 ${
          isActiveIndex === item.mal_id ? "scale-105" : ""
        } group-hover:scale-105`}
        loading='lazy'
      />
      <div className='p-4'>
        <h2 className='sm:text-lg font-semibold text-base-900 truncate'>
          {item.title}
        </h2>
        <div className='flex items-center gap-2 justify-between'>
          {showEp && (
            <p className='text-sm font-semibold text-base-300 mt-1 w-50'>
              Episodes: <span className=''>{item.episodes || "?"}</span>
            </p>
          )}
          <p className='text-sm font-semibold text-base-300 mt-1 truncate w-50'>
            Genre: <span className=''>{item.genres[0].name || "?"}</span>
          </p>
        </div>
        <p className='text-yellow-500 font-bold mt-2 sm:text-sm text-xs'>
          ⭐ {item.score?.toFixed(1) || "N/A"}
        </p>
      </div>
    </Link>
  );
};

export default React.memo(CardContainer);
