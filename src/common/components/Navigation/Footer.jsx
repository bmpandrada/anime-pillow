import React, { useCallback } from "react";
import { FaBook, FaHouse, FaVideo, FaTableList } from "react-icons/fa6";
import { NavLink } from "react-router";

const Footer = () => {
  const activeLink = useCallback(
    ({ isActive }) => (isActive ? "dock-active" : ""),
    [],
  );

  return (
    <>
      <div className='text-center p-5 bg-base-200 text-base-400'>
        <p className='text-sm'>Created By: BMPA {new Date().getFullYear()}</p>
      </div>
      <div className='dock dock-xs sm:hidden z-50 bg-base-200 text-base-400'>
        <NavLink to={"/"} className={activeLink}>
          <FaHouse />
          <span className='dock-label'>Home</span>
        </NavLink>

        <NavLink to={"/anime"} className={activeLink}>
          <FaTableList />
          <span className='dock-label'>Anime</span>
        </NavLink>

        <NavLink to={"/movies"} className={activeLink}>
          <FaVideo />
          <span className='dock-label'>Movie</span>
        </NavLink>

        <NavLink to={"/about"} className={activeLink}>
          <FaBook />
          <span className='dock-label'>About</span>
        </NavLink>
      </div>
    </>
  );
};

export default React.memo(Footer);
