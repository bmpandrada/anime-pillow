import { createContext, useContext, useEffect, useState } from "react";

export const ContextApi = createContext();

export function ContextProvider({ children }) {
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

  const CACHE_VERSION = "v2";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cachedVersion = localStorage.getItem("cacheVersion");

        if (cachedVersion !== CACHE_VERSION) {
          localStorage.clear();
          localStorage.setItem("cacheVersion", CACHE_VERSION);
        }

        const cachedAnime = localStorage.getItem("animeData");
        const cachedMovie = localStorage.getItem("movieData");
        const cachedCharacter = localStorage.getItem("charData");
        const cachedUpcomming = localStorage.getItem("upcommingData");

        if (cachedAnime && cachedMovie && cachedCharacter && cachedUpcomming) {
          setAnime(JSON.parse(cachedAnime));
          setMovie(JSON.parse(cachedMovie));
          setCharacter(JSON.parse(cachedCharacter));
          setUpcomming(JSON.parse(cachedUpcomming));
          setLoading(false);
          return;
        }

        const resUpAnime = await fetch(
          "https://api.jikan.moe/v4/seasons/upcoming",
        );
        if (!resUpAnime.ok) throw new Error("Anime fetch failed");
        const animeUpData = await resUpAnime.json();

        const resAnime = await fetch(
          "https://api.jikan.moe/v4/seasons/2025/summer?sfw",
        );
        if (!resAnime.ok) throw new Error("Anime fetch failed");
        const animeData = await resAnime.json();

        await new Promise((r) => setTimeout(r, 1500));

        const resMovie = await fetch(
          "https://api.jikan.moe/v4/top/anime?type=movie",
        );
        if (!resMovie.ok) throw new Error("Movie fetch failed");
        const movieData = await resMovie.json();

        // await new Promise((r) => setTimeout(r, 1500));

        const resChar = await fetch("https://api.jikan.moe/v4/characters");
        if (!resChar.ok) throw new Error("Movie fetch failed");
        const charData = await resChar.json();

        setAnime(animeData.data);
        setMovie(movieData.data);
        setCharacter(charData.data);
        setUpcomming(animeUpData.data);

        localStorage.setItem("animeData", JSON.stringify(animeData.data));
        localStorage.setItem("movieData", JSON.stringify(movieData.data));
        localStorage.setItem("charData", JSON.stringify(charData.data));
        localStorage.setItem("upcommingData", JSON.stringify(animeUpData.data));
        localStorage.setItem("cacheVersion", CACHE_VERSION);
      } catch (err) {
        setError(err.message);
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

  const filterAndSort = (list) => {
    return list
      .filter((item) => {
        const matchTitle = item.title
          .toLowerCase()
          .includes(filter.toLowerCase());
        const matchCategory =
          !selectedCategory ||
          item.genres?.some((g) => g.name === selectedCategory);

        if (sortBy === "upcoming") {
          const dateA = new Date(item.aired?.from || 0);
          return (
            matchTitle && matchCategory && (isNaN(dateA) || dateA > new Date())
          );
        }

        return matchTitle && matchCategory;
      })
      .slice()
      .sort((a, b) => {
        if (list === anime && upcomming) {
          if (sortBy === "latest") return (b.year || 0) - (a.year || 0);
          if (sortBy === "oldest") return (a.year || 0) - (b.year || 0);
        } else {
          const dateA = new Date(a.aired?.from || 0);
          const dateB = new Date(b.aired?.from || 0);

          if (sortBy === "latest") return dateB - dateA;
          if (sortBy === "oldest") return dateA - dateB;
          if (sortBy === "upcoming") return dateA - dateB;
        }
        return 0;
      });
  };

  const filteredAnime = filterAndSort(anime);
  const filteredMovie = filterAndSort(movie);
  const filteredUpcomming = filterAndSort(upcomming);
  // const filteredChar = filterAndSort(character);

  const filteredByLetter = (data) => {
    return selectedLetter
      ? data.filter((item) => {
          const title = item.title_english || item.title || "";
          return title.charAt(0).toUpperCase() === selectedLetter;
        })
      : data;
  };

  return (
    <ContextApi.Provider
      value={{
        anime,
        movie,
        character,
        upcomming,
        filteredAnime,
        filteredMovie,
        filteredUpcomming,
        // filteredChar,
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
      }}
    >
      {children}
    </ContextApi.Provider>
  );
}

export function useAnime() {
  return useContext(ContextApi);
}
