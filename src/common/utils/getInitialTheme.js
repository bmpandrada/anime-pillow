import Cookies from "js-cookie";

export function getInitialTheme() {
  const savedTheme = Cookies.get("theme");
  if (savedTheme) return savedTheme;

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "mytheme" : "mytheme-light";
}
