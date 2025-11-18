import React, { useCallback } from "react";
import { FaBookReader } from "@react-icons/all-files/fa/FaBookReader";
import { FaHome } from "@react-icons/all-files/fa/FaHome";
import { FaVideo } from "@react-icons/all-files/fa/FaVideo";
import { FaListAlt } from "@react-icons/all-files/fa/FaListAlt";

import { NavLink } from "react-router";

const Footer = () => {
  const activeLink = useCallback(
    ({ isActive }) => (isActive ? "dock-active dock-xs" : ""),
    [],
  );

  return (
    <footer>
      <div className='text-center p-5 bg-base-200 text-base-400'>
        <div className='text-center p-3 opacity-80 text-xs'>
          Created by BMPA {new Date().getFullYear()} | Anime data via
          <a
            href='https://jikan.moe/'
            target='_blank'
            rel='noopener noreferrer'
          >
            Jikan API
          </a>
        </div>
      </div>
      <div className='dock dock-xs sm:hidden z-50 bg-base-200 text-base-400'>
        <NavLink to={"/"} className={activeLink}>
          <FaHome />
          <span className='dock-label'>Home</span>
        </NavLink>

        <NavLink to={"/anime"} className={activeLink}>
          <FaListAlt />
          <span className='dock-label'>Anime</span>
        </NavLink>

        <NavLink to={"/movies"} className={activeLink}>
          <FaVideo />
          <span className='dock-label'>Movie</span>
        </NavLink>

        <NavLink to={"/about"} className={activeLink}>
          <FaBookReader />
          <span className='dock-label'>About</span>
        </NavLink>
      </div>
    </footer>
  );
};

export default React.memo(Footer);
