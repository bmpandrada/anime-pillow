import { FaSun } from "@react-icons/all-files/fa/FaSun";
import { FaMoon } from "@react-icons/all-files/fa/FaMoon";
import { useAnime } from "../context/ContextApi";
import { useCallback } from "react";

const ThemeToggle = () => {
  const { theme, setTheme } = useAnime();
  const toggleTheme = useCallback(
    () =>
      setTheme((prev) => (prev === "mytheme" ? "mytheme-light" : "mytheme")),
    [setTheme],
  );

  return (
    <label className='flex items-center gap-2 cursor-pointer'>
      <input
        type='checkbox'
        onChange={toggleTheme}
        checked={theme === "mytheme"}
        className='toggle'
        placeholder='Theme'
      />
      {theme === "mytheme" ? <FaMoon size={16} /> : <FaSun size={16} />}
    </label>
  );
};

export default ThemeToggle;
