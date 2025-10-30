import { useEffect, useState } from "react";
import { useAnime } from "../context/ContextApi";
import Nav from "./Nav";
import ThemeToggle from "./Toogle";

const Layout = ({ children }) => {
  const { sortBy, setSortby, filter, setFilter } = useAnime();
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) return savedTheme;

    // Detect time: 6PM - 6AM = dark mode
    const hour = new Date().getHours();
    return hour >= 18 || hour < 6 ? "mytheme" : "mytheme-light";
  };

  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    const html = document.querySelector("html");
    if (html) {
      html.setAttribute("data-theme", theme);
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "mytheme" ? "mytheme-light" : "mytheme"));
  };
  return (
    <div className='flex flex-col min-h-screen'>
      <div className='flex justify-between bg-base-200 shadow-md items-center py-5 px-2 mb-5'>
        <h1 className='text-3xl font-bold text-center text-accent'>
          🎌 Top Anime Pillow
        </h1>
        <ThemeToggle />
      </div>

      <div className='flex-1'>
        <Nav
          sortBy={sortBy}
          setSortby={setSortby}
          filter={filter}
          setFilter={setFilter}
        />
        {children}
      </div>
      <div className='bg-black text-center p-5 text-white'>
        <p className='text-sm'>Created By: BMPA {new Date().getFullYear()}</p>
      </div>
    </div>
  );
};

export default Layout;
