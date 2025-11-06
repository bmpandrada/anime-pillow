const AnimeInfo = ({ anime }) => {
  return (
    <div className='flex flex-wrap gap-2 items-center mt-2'>
      <p className='text-accent font-semibold'>Info:</p>
      <div className='flex flex-wrap gap-2 space-y-0.5'>
        <p className='badge badge-accent font-semibold'>
          <span className='text-base-200'>Aired:</span>{" "}
          {new Date(anime?.aired?.from).toDateString()}
        </p>
        <p className='badge badge-accent font-semibold'>
          <span className='text-base-200'>Source:</span> {anime?.source}
        </p>
        <p className='badge badge-accent font-semibold'>
          <span className='text-base-200'>Status:</span> {anime?.status}
        </p>
        <p className='badge badge-accent font-semibold'>
          <span className='text-base-200'>Rating:</span> {anime?.rating}
        </p>
        {anime?.season && (
          <p className='badge badge-accent font-semibold'>
            <span className='text-base-200'>Season:</span> {anime?.season}
          </p>
        )}
        {anime?.studios && (
          <p className='badge badge-accent font-semibold'>
            <span className='text-base-200'>Studios:</span>{" "}
            {anime?.studios?.map((a) => a.name)}
          </p>
        )}
      </div>
    </div>
  );
};

export default AnimeInfo;
