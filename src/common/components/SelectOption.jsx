import React, { useCallback, useMemo } from "react";

const SelectOption = ({
  selectedCategory,
  setSelectedCategory,
  categories,
}) => {
  const categoryOptions = useMemo(
    () =>
      categories?.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      )),
    [categories],
  );

  const handleChange = useCallback(
    (e) => setSelectedCategory(e.target.value),
    [setSelectedCategory],
  );

  return (
    <select
      name='categories'
      id='categories'
      value={selectedCategory}
      onChange={handleChange}
      className='select'
    >
      <option value='' disabled={true}>
        Categories
      </option>
      <option value=''>All Categories</option>
      {categoryOptions}
    </select>
  );
};

export default React.memo(SelectOption);
