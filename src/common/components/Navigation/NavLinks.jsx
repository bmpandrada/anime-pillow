import { NavLink } from "react-router";

const NavHead = () => {
  const getNavClass = ({ isActive }) =>
    isActive
      ? "text-accent font-semibold"
      : "text-base-800 font-semibold hover:text-accent transition duration-400";

  return (
    <div className='hidden sm:flex flex-row justify-start space-x-5 mr-2 font-montserrat'>
      <NavLink to={"/"} className={getNavClass}>
        Home
      </NavLink>
      <NavLink to={"/anime"} className={getNavClass}>
        Anime
      </NavLink>
      <NavLink to={"/movies"} className={getNavClass}>
        Movie
      </NavLink>
      <NavLink to={"/about"} className={getNavClass}>
        About
      </NavLink>
    </div>
  );
};

export default NavHead;
