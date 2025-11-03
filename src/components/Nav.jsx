import { NavLink, useLocation } from "react-router";
import SortOutout from "./SortOutput";
import FilterInput from "./FilterInput";
import SelectOption from "./SelectOption";
import NavHead from "./NavLinks";

const Nav = ({
  sortBy,
  setSortby,
  filter,
  setFilter,
  categories,
  selectedCategory,
  setSelectedCategory,
}) => {
  const localPath = useLocation();
  const showNav = ["/", "/movies"].includes(localPath.pathname);

  return (
    <div className='w-full md:flex flex-col md:flex-row space-y-1.5 px-5 sm:px-10 sm:justify-between sm:items-center'>
      <NavHead />
      {showNav && (
        <div className='grid grid-cols-6 gap-2 items-center w-fit'>
          <div className='col-span-6 sm:col-span-3'>
            <FilterInput filter={filter} onFilterChange={setFilter} />
          </div>
          <div className='col-span-2 sm:col-span-1'>
            <SortOutout sortBy={sortBy} setSortby={setSortby} />
          </div>
          <div className='col-span-3 sm:col-span-2'>
            <SelectOption
              selectedCategory={selectedCategory}
              categories={categories}
              setSelectedCategory={setSelectedCategory}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Nav;
