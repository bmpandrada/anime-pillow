const AnimeGenre = ({ anime }) => {
  return (
    <div className='flex flex-wrap gap-2 items-center'>
      <p className='text-accent font-semibold'>Genre:</p>
      {anime?.genres?.map((genre) => (
        <div key={genre.mal_id} className='badge badge-neutral font-semibold'>
          {genre.name}
        </div>
      ))}
    </div>
  );
};

export default AnimeGenre;
