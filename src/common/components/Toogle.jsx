// export default ThemeToggle;
import { useEffect, useState } from "react";
import { WiDaySunny } from "react-icons/wi";
import { AiOutlineMoon } from "react-icons/ai";

const ThemeToggle = () => {
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
