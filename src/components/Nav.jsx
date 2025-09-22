import { Link, useLocation } from "react-router";
import SortOutout from "./SortOutput";
import FilterInput from "./FilterInput";

const Nav = ({sortBy, setSortby, filter, setFilter}) => {
    const localPath = useLocation();
    const showNav = localPath.pathname === '/'
    
    return ( 
    <div className="flex justify-between">
       <div className="flex flex-row justify-end gap-5 px-5">
        <Link to={'/'}>Home</Link>
        <Link to={'/about'}>About</Link>
      </div>

        {showNav &&
        (
        <div className="flex gap-3">
           <SortOutout sortBy={sortBy} setSortby={setSortby} />
          <FilterInput filter={filter} onFilterChange={setFilter} />
        </div>
        )
        }
     </div>
     );
}
 
export default Nav;