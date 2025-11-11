import { useEffect } from "react";

const ClearCachePage = () => {
  useEffect(() => {
    [
      "animeData",
      "movieData",
      "charData",
      "upcommingData",
      "lastFetch",
    ].forEach((key) => localStorage.removeItem(key));
    console.log("🧹 Cache cleared!");
    window.location.href = "/"; // redirect sa home pagkatapos mag-clear
  }, []);

  return <div>Clearing cache...</div>;
};

export default ClearCachePage;
