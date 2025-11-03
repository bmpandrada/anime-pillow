import ThemeToggle from "./Toogle";

const Header = () => {
  return (
    <div className='bg-base-200 shadow-md py-5 px-4 sm:px-10 mb-5'>
      <div className='max-w-6xl w-full flex justify-between items-center mx-auto'>
        <h1 className='text-lg md:text-3xl font-bold text-center text-accent'>
          🎌 Top Anime Pillow
        </h1>
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Header;
