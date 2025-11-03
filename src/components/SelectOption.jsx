const SelectOption = ({
  selectedCategory,
  setSelectedCategory,
  categories,
}) => {
  return (
    <select
      name='categories'
      id='categories'
      value={selectedCategory}
      onChange={(e) => setSelectedCategory(e.target.value)}
      className='select'
    >
      <option disabled={true}>Categories</option>
      <option value=''>All Categories</option>
      {categories?.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
};

export default SelectOption;
