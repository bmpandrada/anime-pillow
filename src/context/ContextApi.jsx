import { createContext, useContext, useEffect, useState } from "react";

export const ContextApi = createContext();
export function ContextProvider({ children }) {
  const [anime, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("");
  const [sortBy, setSortby] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://api.jikan.moe/v4/seasons/2025/summer?sfw",
        );
        if (!res.ok) {
          throw new Error("Data Fetch Failed!");
        }
        const data = await res.json();
        setData(data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredAnime = anime
    .filter((data) => {
      return data.title.toLowerCase().includes(filter.toLowerCase());
    })
    .slice()
    .sort((a, b) => {
      if (sortBy === "latest") return b.year - a.year;
      if (sortBy === "oldest") return a.year - b.year;
      return 0;
    });

  return (
    <ContextApi.Provider
      value={{
        anime,
        loading,
        error,
        filteredAnime,
        filter,
        sortBy,
        setFilter,
        setSortby,
      }}
    >
      {children}
    </ContextApi.Provider>
  );
}

export function useAnime() {
  return useContext(ContextApi);
}
