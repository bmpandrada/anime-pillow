import { createContext, useContext, useEffect, useState } from "react";

export const ContextApi = createContext();

export function ContextProvider({ children }) {
  const [anime, setAnime] = useState([]);
  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("");
  const [sortBy, setSortby] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cachedAnime = localStorage.getItem("animeData");
        const cachedMovie = localStorage.getItem("movieData");

        if (cachedAnime && cachedMovie) {
          setAnime(JSON.parse(cachedAnime));
          setMovie(JSON.parse(cachedMovie));
          setLoading(false);
          return;
        }

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

        setAnime(animeData.data);
        setMovie(movieData.data);

        localStorage.setItem("animeData", JSON.stringify(animeData.data));
        localStorage.setItem("movieData", JSON.stringify(movieData.data));
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
    ];
    setCategories([...new Set(allGenres)]);
  }, [anime, movie]);

  const filterAndSort = (list) => {
    return list
      .filter((item) => {
        const matchTitle = item.title
          .toLowerCase()
          .includes(filter.toLowerCase());
        const matchCategory =
          !selectedCategory ||
          item.genres?.some((g) => g.name === selectedCategory);
        return matchTitle && matchCategory;
      })
      .sort((a, b) => {
        if (list === anime) {
          if (sortBy === "latest") return (b.year || 0) - (a.year || 0);
          if (sortBy === "oldest") return (a.year || 0) - (b.year || 0);
        } else {
          const dateA = new Date(a.aired?.from || 0);
          const dateB = new Date(b.aired?.from || 0);

          if (sortBy === "latest") return dateB - dateA;
          if (sortBy === "oldest") return dateA - dateB;
        }
        return 0;
      });
  };

  const filteredAnime = filterAndSort(anime);
  const filteredMovie = filterAndSort(movie);

  return (
    <ContextApi.Provider
      value={{
        anime,
        movie,
        filteredAnime,
        filteredMovie,
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
