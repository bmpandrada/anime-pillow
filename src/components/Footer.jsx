import { NavLink } from "react-router";
import { FaBookReader } from "react-icons/fa";
import { IoHome } from "react-icons/io5";

const Footer = () => {
  return (
    <>
      <div className='text-center p-5 bg-base-200 text-base-400'>
        <p className='text-sm'>Created By: BMPA {new Date().getFullYear()}</p>
      </div>
      <div className='dock dock-xs sm:hidden  bg-neutral text-neutral-content'>
        <NavLink
          to={"/"}
          className={({ isActive }) => (isActive ? "dock-active" : "")}
        >
          <IoHome />
          <span className='dock-label'>Home</span>
        </NavLink>

        <NavLink
          to={"/about"}
          className={({ isActive }) => (isActive ? "dock-active" : "")}
        >
          <FaBookReader />
          <span className='dock-label'>About</span>
        </NavLink>
      </div>
    </>
  );
};

export default Footer;
