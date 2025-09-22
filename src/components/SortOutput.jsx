const SortOutout = ({sortBy, setSortby}) => {
    return ( 
        <div className="controls">
            <label htmlFor="sort">Sort By:</label>
            <select name="sort" id="sort" value={sortBy} onChange={(e)=>setSortby(e.target.value)}>
                <option value={'latest'}> Latest</option>
                <option value={'oldest'}> Old</option>
            </select>
          </div>
     );
}
 
export default SortOutout;