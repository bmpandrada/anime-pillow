import React from "react";

const AnimeInfo = ({ anime }) => {
  const airedDate = anime?.aired?.from
    ? new Date(anime.aired.from).toDateString()
    : "Unknown";

  const studios = anime?.studios?.length
    ? anime.studios.map((s) => s.name).join(", ")
    : "Unknown";

  return (
    <div className='flex flex-wrap gap-2 items-center mt-2'>
      <p className='text-accent font-semibold'>Info:</p>
      <div className='flex flex-wrap gap-2 space-y-0.5'>
        <p className='badge badge-info font-semibold'>
          <span className='text-base-200'>Aired:</span> {airedDate}
        </p>
        <p className='badge badge-info font-semibold'>
          <span className='text-base-200'>Source:</span> {anime?.source}
        </p>
        <p className='badge badge-info font-semibold'>
          <span className='text-base-200'>Status:</span> {anime?.status}
        </p>
        <p className='badge badge-info font-semibold'>
          <span className='text-base-200'>Rating:</span> {anime?.rating}
        </p>
        {anime?.season && (
          <p className='badge badge-info font-semibold'>
            <span className='text-base-200'>Season:</span> {anime?.season}
          </p>
        )}
        {anime?.studios?.length > 0 && (
          <p className='badge badge-info font-semibold'>
            <span className='text-base-200'>Studios:</span> {studios}
          </p>
        )}
      </div>
    </div>
  );
};

export default React.memo(AnimeInfo);
