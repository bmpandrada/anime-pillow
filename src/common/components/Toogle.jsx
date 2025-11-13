import { FaSun, FaMoon } from "react-icons/fa6";
import { useAnime } from "../context/ContextApi";

const ThemeToggle = () => {
  const { theme, setTheme } = useAnime();
  const toggleTheme = () => {
    setTheme((prev) => (prev === "mytheme" ? "mytheme-light" : "mytheme"));
  };

  return (
    <label className='flex items-center gap-2 cursor-pointer'>
      <input
        type='checkbox'
        onChange={toggleTheme}
        checked={theme === "mytheme"}
        className='toggle'
        placeholder='Theme'
      />
      {theme === "mytheme" ? <FaMoon size={20} /> : <FaSun size={20} />}
    </label>
  );
};

export default ThemeToggle;
