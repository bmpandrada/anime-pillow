import ThemeToggle from "./Toogle";

const Header = () => {
  return (
    <div className='flex justify-between bg-base-200 shadow-md items-center py-5 px-4 sm:px-10 mb-5'>
      <h1 className='text-lg md:text-3xl font-bold text-center text-accent'>
        🎌 Top Anime Pillow
      </h1>
      <ThemeToggle />
    </div>
  );
};

export default Header;
