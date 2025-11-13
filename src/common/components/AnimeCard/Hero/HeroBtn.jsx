import React from "react";
import { Link } from "react-router";

const HeroBtn = ({ linkPage, label = "Anime info" }) => {
  return (
    <Link
      className='btn btn-accent w-fit text-white hover:scale-105 transition-transform duration-300'
      to={`/anime/${linkPage}`}
      aria-label={label}
    >
      Anime info
    </Link>
  );
};

export default React.memo(HeroBtn);
