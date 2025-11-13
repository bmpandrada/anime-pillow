import { Link } from "react-router";

const HeroBtn = ({ linkPage }) => {
  return (
    <Link
      className='btn btn-accent text-white hover:scale-105 transition-transform duration-300'
      to={`/anime/${linkPage}`}
      aria-label='Anime info'
    >
      Anime info
    </Link>
  );
};

export default HeroBtn;
