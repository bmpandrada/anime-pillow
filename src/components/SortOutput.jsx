const SortOutout = ({ sortBy, setSortby }) => {
  return (
    <select
      name='sort'
      id='sort'
      value={sortBy}
      onChange={(e) => setSortby(e.target.value)}
      className='select'
    >
      <option disabled={true}>Sort By</option>
      <option value={"latest"}> Latest</option>
      <option value={"oldest"}> Previous</option>
    </select>
  );
};

export default SortOutout;
