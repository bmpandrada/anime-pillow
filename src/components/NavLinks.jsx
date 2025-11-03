import { Link } from "react-router";

const NavHead = () => {
  return (
    <div className='hidden sm:flex flex-row justify-start space-x-5'>
      <Link to={"/"} className='text-base-700 font-semibold'>
        Home
      </Link>
      <Link to={"/movies"} className='text-base-700 font-semibold'>
        Movie
      </Link>
      <Link to={"/about"} className='text-base-700 font-semibold'>
        About
      </Link>
    </div>
  );
};

export default NavHead;
