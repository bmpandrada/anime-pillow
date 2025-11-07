import { useState } from "react";
import { Link, useLocation } from "react-router";

const CardContainer = ({ item }) => {
  const [isActiveIndex, setActiveIndex] = useState(null);
  const localPath = useLocation();
  const showEp = localPath.pathname === "/anime" || "/";
  return (
    <Link
      to={`${
        localPath.pathname === "/anime" || localPath.pathname === "/"
          ? "/anime"
          : "/movies"
      }/${item.mal_id}`}
      className='bg-base-200 rounded-2xl shadow hover:shadow-lg transition overflow-hidden'
      onTouchStart={() => setActiveIndex(item.mal_id)}
      onTouchEnd={() => setTimeout(() => setActiveIndex(null), 50)}
    >
      <img
        src={item.images.webp.large_image_url}
        alt={item.title}
        className={`w-full h-60 object-cover transform transition-transform duration-300 ${
          isActiveIndex === item.mal_id ? "scale-105" : ""
        } hover:scale-105`}
      />
      <div className='p-4'>
        <h2 className='sm:text-lg font-semibold text-base-900 truncate'>
          {item.title}
        </h2>
        <div className='flex items-center gap-2 justify-between'>
          {showEp && (
            <p className='text-sm font-semibold text-base-300 mt-1'>
              Episodes:{" "}
              <span className='text-accent-content opacity-80'>
                {item.episodes || "?"}
              </span>
            </p>
          )}
          <p className='text-sm font-semibold text-base-300 mt-1'>
            Genre:{" "}
            <span className='text-accent-content opacity-80'>
              {item.genres[0].name || "?"}
            </span>
          </p>
        </div>
        <p className='text-yellow-500 font-bold mt-2 sm:text-sm text-xs'>
          ⭐ {item.score?.toFixed(1) || "N/A"}
        </p>
      </div>
    </Link>
  );
};

export default CardContainer;
