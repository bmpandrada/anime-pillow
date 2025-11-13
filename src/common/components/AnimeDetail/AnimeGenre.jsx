import React from "react";

const AnimeGenre = ({ anime }) => {
  if (!anime?.genres?.length) return null;
  return (
    <div className='flex flex-wrap gap-2 items-center'>
      <p className='text-accent font-semibold'>Genre:</p>
      {anime?.genres?.map((genre) => (
        <div key={genre.mal_id} className='badge badge-info font-semibold'>
          {genre.name}
        </div>
      ))}
    </div>
  );
};

export default React.memo(AnimeGenre);
