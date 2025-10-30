const SortOutout = ({ sortBy, setSortby }) => {
  return (
    <div className='controls'>
      <label
        htmlFor='sort'
        className='ml-2 text-base-300 text-sm font-semibold'
      >
        Sort By:
      </label>
      <select
        name='sort'
        id='sort'
        value={sortBy}
        onChange={(e) => setSortby(e.target.value)}
        className='text-base-500 text-sm font-semibold'
      >
        <option value={"latest"}> Latest</option>
        <option value={"oldest"}> Old</option>
      </select>
    </div>
  );
};

export default SortOutout;
