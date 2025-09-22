import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function AnimeDetail() {
  const { id } =  useParams();
  const [anime, setAnime] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchAnime = async () => {
      const res = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
      const data = await res.json();
      setAnime(data.data);
    };

    fetchAnime();
  }, [id]);

  if (!anime) return <p className="text-center p-6">Loading...</p>;

  return (
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow p-6 mb-10">
        <img
          src={anime.images.jpg.large_image_url}
          alt={anime.title}
          className="max-w-md mx-auto rounded-xl mb-4"
        />
        <h1 className="text-3xl font-bold mb-2">{anime.title}</h1>
        <p className="text-gray-600 mb-4">{anime.synopsis}</p>
        <div className="flex gap-4 text-sm text-gray-700">
          <span>⭐ {anime.score || "N/A"}</span>
          <span>🎬 {anime.episodes || "?"} episodes</span>
          <span>📅 {anime.year || "Unknown"}</span>
        </div>
      </div>
  );
}
