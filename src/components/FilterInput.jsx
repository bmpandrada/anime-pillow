const FilterInput = ({ filter, onFilterChange }) => {
    return ( 
        <div className="filter">
            <input 
                type="text" 
                value={filter} 
                placeholder="Search Anime..."
                className="text-gray-600 text-sm font-semibold"
                onChange={(e)=>onFilterChange(e.target.value)} />
        </div>
     );
}
 
export default FilterInput;