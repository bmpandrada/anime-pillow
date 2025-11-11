import ThemeToggle from "./Toogle";

const Header = ({ marginHeight }) => {
  let marginClass = marginHeight || "mb-5";

  return (
    <div className={`bg-base-200 shadow-md py-5 px-4 sm:px-10 ${marginClass}`}>
      <div className='max-w-7xl w-full flex justify-between items-center mx-auto'>
        <h1 className='text-lg md:text-xl font-bold text-center text-accent font-momo-signature'>
          🎌 TopAnimePillow
        </h1>
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Header;
