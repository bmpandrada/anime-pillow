import { WiDaySunny } from "react-icons/wi";
import { AiOutlineMoon } from "react-icons/ai";
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
      />
      {theme === "mytheme" ? (
        <AiOutlineMoon size={20} />
      ) : (
        <WiDaySunny size={20} />
      )}
    </label>
  );
};

export default ThemeToggle;
