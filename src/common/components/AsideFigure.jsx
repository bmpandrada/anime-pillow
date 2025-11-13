import React from "react";

const AsideFigure = ({ anime }) => {
  return (
    <figure className='flex flex-col gap-2'>
      <img
        src={
          anime?.images.webp?.large_image_url ||
          anime?.images.webp?.image_url ||
          anime?.images.webp?.small_image_url
        }
        alt={anime?.title}
        fetchPriority='high'
        loading='lazy'
        className='w-full max-w-xs sm:max-w-sm mx-auto rounded-xl object-contain transition duration-300'
      />
      <figcaption className='flex gap-2 items-center text-sm mx-auto md:mx-0'>
        {anime?.score && <span>⭐{anime?.score?.toFixed(1) || "N/A"}</span>}
        {anime?.episodes && <span>🎬{anime?.episodes || "?"} episodes</span>}
        {anime?.year && <span>📅{anime?.year || "Unknown"}</span>}
      </figcaption>
      <figcaption className='flex flex-wrap gap-2 items-center text-sm mb-5 mx-auto md:mx-0'>
        {anime?.rank > 0 && (
          <span className='badge badge-success font-semibold'>
            Rank #{anime?.rank}
          </span>
        )}
        {anime?.popularity > 0 && (
          <span className='badge badge-warning font-semibold text-white'>
            Popularity #{anime?.popularity}
          </span>
        )}

        {anime?.favorites > 0 && (
          <span className='badge badge-info font-semibold'>
            {anime?.favorites >= 1000
              ? (anime?.favorites / 1000).toFixed(1).replace(/\.0$/, "") + "K"
              : anime?.favorites}{" "}
            Favorites
          </span>
        )}
      </figcaption>
    </figure>
  );
};

export default React.memo(AsideFigure);
