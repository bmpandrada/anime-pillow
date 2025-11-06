import { useEffect } from "react";
import { useLocation } from "react-router";

const SortOutout = ({ sortBy, setSortby }) => {
  const localPath = useLocation();
  const upcoming = localPath.pathname === "/movies";

  useEffect(() => {
    if (localPath.pathname === "/movies" && sortBy === "upcoming") {
      setSortby("latest");
    }
  }, [localPath.pathname, setSortby, sortBy]);

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
      {!upcoming && <option value={"upcoming"}> Upcomming</option>}
    </select>
  );
};

export default SortOutout;
