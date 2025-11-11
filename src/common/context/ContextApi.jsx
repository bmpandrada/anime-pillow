import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { filterAndSort } from "../utils/filterAndSort";
import { filteredByLetter } from "../utils/filterByLetter";
import Cookies from "js-cookie";
import { getInitialTheme } from "../utils/getInitialTheme";
import { useLocation } from "react-router";

export const ContextApi = createContext();

export function ContextProvider({ children }) {
  const localPath = useLocation();
  const [theme, setTheme] = useState(getInitialTheme);
  const [anime, setAnime] = useState([]);
  const [movie, setMovie] = useState([]);
  const [upcomming, setUpcomming] = useState([]);
  const [character, setCharacter] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("");
  const [sortBy, setSortby] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLetter, setSelectedLetter] = useState("");

  useEffect(() => {
    const clearCacheData = () => {
      [
        "animeData",
        "movieData",
        "charData",
        "upcommingData",
        "lastFetch",
      ].forEach((key) => localStorage.removeItem(key));
      console.log("🧹 Cache cleared!");
    };

    if (localPath.pathname === "/clear") {
      clearCacheData();
      window.location.href = "/"; // redirect sa home pagkatapos mag-clear
      return;
    }

    // dito na yung normal fetch / cache logic mo
  }, [localPath.pathname]);

  const CACHE_VERSION = "v2";

  useEffect(() => {
    const lastFetch = localStorage.getItem("lastFetch");
    const isExpired =
      lastFetch &&
      Date.now() - new Date(lastFetch).getTime() > 24 * 60 * 60 * 1000;
    const clearCacheData = () => {
      [
        "animeData",
        "movieData",
        "charData",
        "upcommingData",
        "lastFetch",
      ].forEach((key) => localStorage.removeItem(key));
    };

    if (isExpired) {
      console.log("🕐 Cache expired — refetching...");
      clearCacheData();
    }

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const safeFetch = async (url, retries = 4, delayMs = 1500) => {
      for (let i = 0; i < retries; i++) {
        const res = await fetch(url);
        if (res.status === 429) {
          const waitTime = delayMs * (i + 1);
          // console.warn(`⏳ Too many requests, waiting ${waitTime}ms...`);
          await delay(waitTime);
          continue;
        }
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        return data?.data || [];
      }
      throw new Error("Max retries reached");
    };

    const fetchData = async () => {
      try {
        const cachedVersion = localStorage.getItem("cacheVersion");
        if (cachedVersion !== CACHE_VERSION) clearCacheData();

        const cachedAnime = localStorage.getItem("animeData");
        const cachedMovie = localStorage.getItem("movieData");
        const cachedCharacter = localStorage.getItem("charData");
        const cachedUpcomming = localStorage.getItem("upcommingData");

        if (cachedAnime && cachedMovie && cachedCharacter && cachedUpcomming) {
          console.log("✅ Using cached data");
          setAnime(JSON.parse(cachedAnime));
          setMovie(JSON.parse(cachedMovie));
          setCharacter(JSON.parse(cachedCharacter));
          setUpcomming(JSON.parse(cachedUpcomming));
          setLoading(false);
          return;
        }

        console.log("🌍 Fetching new data...");
        const upcommingData = await safeFetch(
          "https://api.jikan.moe/v4/seasons/upcoming",
        );
        await delay(100);
        const animeData = await safeFetch(
          "https://api.jikan.moe/v4/seasons/2025/summer?sfw",
        );
        await delay(100);
        const movieData = await safeFetch(
          "https://api.jikan.moe/v4/top/anime?type=movie",
        );
        await delay(100);
        const charData = await safeFetch(
          "https://api.jikan.moe/v4/top/characters",
        );
        await delay(100);

        setAnime(animeData);
        setMovie(movieData);
        setCharacter(charData);
        setUpcomming(upcommingData);

        localStorage.setItem("animeData", JSON.stringify(animeData || []));
        localStorage.setItem("movieData", JSON.stringify(movieData || []));
        localStorage.setItem("charData", JSON.stringify(charData || []));
        localStorage.setItem(
          "upcommingData",
          JSON.stringify(upcommingData || []),
        );
        localStorage.setItem("lastFetch", new Date().toISOString());
        localStorage.setItem("cacheVersion", CACHE_VERSION);
      } catch (err) {
        setError(err.message || "Something went wrong");
        setAnime([]);
        setMovie([]);
        setCharacter([]);
        setUpcomming([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const allGenres = [
      ...anime.flatMap((a) => a.genres?.map((g) => g.name) || []),
      ...movie.flatMap((m) => m.genres?.map((g) => g.name) || []),
      ...upcomming.flatMap((m) => m.genres?.map((g) => g.name) || []),
    ];
    setCategories([...new Set(allGenres)]);
  }, [anime, movie, upcomming]);

  const filteredAnime = useMemo(
    () =>
      filterAndSort(anime, {
        filter,
        selectedCategory,
        sortBy,
        upcomming,
        anime,
      }),
    [filter, selectedCategory, sortBy, upcomming, anime],
  );

  const filteredMovie = useMemo(
    () =>
      filterAndSort(movie, {
        filter,
        selectedCategory,
        sortBy,
        upcomming,
        anime,
      }),
    [filter, selectedCategory, sortBy, upcomming, anime, movie],
  );

  const filteredUpcomming = useMemo(
    () =>
      filterAndSort(upcomming, {
        filter,
        selectedCategory,
        sortBy,
        upcomming,
        anime,
      }),
    [filter, selectedCategory, sortBy, upcomming, anime],
  );

  const filteredAnimeByLetter = filteredByLetter(filteredAnime, selectedLetter);
  const filteredMovieByLetter = filteredByLetter(filteredMovie, selectedLetter);
  const filteredUpcomingByLetter = filteredByLetter(
    filteredUpcomming,
    selectedLetter,
  );

  // 🎨 Theme (stored in cookies)
  useEffect(() => {
    const html = document.querySelector("html");
    if (html) html.setAttribute("data-theme", theme);

    const currentCookie = Cookies.get("theme");
    if (currentCookie !== theme) {
      Cookies.set("theme", theme, { expires: 7, path: "/" });
    }
  }, [theme]);

  // 🧹 Manual clear cache button
  const clearCache = () => {
    [
      "animeData",
      "movieData",
      "charData",
      "upcommingData",
      "lastFetch",
      "cacheVersion",
    ].forEach((key) => localStorage.removeItem(key));
    window.location.reload();
  };

  return (
    <ContextApi.Provider
      value={{
        anime,
        movie,
        character,
        upcomming,
        filteredAnimeByLetter,
        filteredMovieByLetter,
        filteredUpcomingByLetter,
        filteredMovie,
        filteredUpcomming,
        filteredByLetter,
        selectedLetter,
        setSelectedLetter,
        loading,
        error,
        filter,
        sortBy,
        setFilter,
        setSortby,
        categories,
        selectedCategory,
        setSelectedCategory,
        theme,
        setTheme,
        clearCache,
      }}
    >
      {children}
    </ContextApi.Provider>
  );
}

export function useAnime() {
  return useContext(ContextApi);
}
