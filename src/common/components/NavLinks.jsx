import { NavLink } from "react-router";

const NavHead = () => {
  const base =
    "text-base-800 font-semibold hover:text-accent transition duration-400";
  const active = "text-accent font-semibold";
  return (
    <div className='hidden sm:flex flex-row justify-start space-x-5 mr-2'>
      <NavLink
        to={"/"}
        className={({ isActive }) => (isActive ? active : base)}
      >
        Home
      </NavLink>
      <NavLink
        to={"/anime"}
        className={({ isActive }) => (isActive ? active : base)}
      >
        Anime
      </NavLink>
      <NavLink
        to={"/movies"}
        className={({ isActive }) => (isActive ? active : base)}
      >
        Movie
      </NavLink>
      <NavLink
        to={"/about"}
        className={({ isActive }) => (isActive ? active : base)}
      >
        About
      </NavLink>
    </div>
  );
};

export default NavHead;
