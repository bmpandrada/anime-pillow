import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import AsideFigure from "../common/components/AsideFigure";
import { animateTitle } from "../common/hooks/animateTitle";
import SkeletonCard from "../common/components/Loaders/SkeletonCard";

export default function Character() {
  const { id } = useParams();
  const [char, setChar] = useState(null);
  const [chars, setChars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isActiveIndex, setActiveIndex] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    animateTitle(".pillow");
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(false);

      try {
        const cachedChar = localStorage.getItem(`charData_${id}`);
        const cachedChars = localStorage.getItem(`charsData_${id}`);

        if (cachedChar && cachedChars) {
          setChar(JSON.parse(cachedChar));
          setChars(JSON.parse(cachedChars));
          setLoading(false);
          return;
        }
        const resChar = await fetch(
          `https://api.jikan.moe/v4/characters/${id}`,
        );
        if (!resChar.ok) throw new Error("Character fetch failed");
        const dataChar = await resChar.json();

        const resChars = await fetch(
          `https://api.jikan.moe/v4/characters/${id}/anime`,
        );
        if (!resChars.ok) throw new Error("Character anime fetch failed");
        const dataChars = await resChars.json();

        await new Promise((r) => setTimeout(r, 1000));

        setChar(dataChar.data);
        setChars(dataChars.data);

        localStorage.setItem(`charData_${id}`, JSON.stringify(dataChar.data));
        localStorage.setItem(`charsData_${id}`, JSON.stringify(dataChars.data));
      } catch (err) {
        console.error("Fetch error:", err.message);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const showAsideFigure =
    !loading && char ? <AsideFigure anime={char} /> : <SkeletonCard />;

  return (
    <div className='max-w-7xl mx-auto rounded-2xl sm:shadow sm:p-5 sm:pt-10 pt-0 mb-10 transition duration-300'>
      <div className='grid sm:grid-cols-4 gap-4'>
        <div className='col-span-1'>{showAsideFigure}</div>
        <div className='rounded px-5 sm:col-span-3'>
          {char?.name && (
            <h2 className='text-base-400 text-2xl font-extrabold mb-2'>
              Name:{" "}
              <span className='pillow text-warning'>
                {char?.name || "Unknown"}
              </span>
            </h2>
          )}
          {chars?.[0]?.role && (
            <p className='font-bold text-base-300'>
              Role:{" "}
              <span className='text-warning'>
                {chars?.[0]?.role || "Unknown"}
              </span>
            </p>
          )}
          {chars?.[0]?.anime?.title && (
            <h2 className='font-bold text-base-300'>
              Title:{" "}
              <span className='text-warning'>
                {chars?.[0]?.anime?.title || "Unknown"}
              </span>
            </h2>
          )}
          {char?.about ? (
            <h1 className='font-montserrat font-semibold opacity-70'>
              {char.about}
            </h1>
          ) : loading ? (
            <SkeletonCard />
          ) : (
            " "
          )}

          {loading ? (
            // 👉 show skeletons while loading
            <div className='max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mt-5 mb-10'>
              {Array.from({
                length: Array.isArray(chars) ? chars.length : 12,
              }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : Array.isArray(chars) && chars.length > 0 ? (
            <>
              <div className='divider divider-neutral'>
                <h1 className='text-2xl text-accent antialiased font-semibold font-momo-signature'>
                  Anime
                </h1>
              </div>

              <div className='max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mt-5 mb-10'>
                {chars.map((item, index) => (
                  <Link
                    className='card bg-base-200 w-full shadow-sm group'
                    to={`/anime/${item.anime.mal_id}`}
                    key={`${item.mal_id}-${item.anime?.mal_id || index}`}
                    onTouchStart={() => setActiveIndex(index)}
                    onTouchEnd={() =>
                      setTimeout(() => setActiveIndex(null), 50)
                    }
                  >
                    <figure className='h-20'>
                      <img
                        src={item.anime.images.webp.large_image_url}
                        alt={item.anime.title}
                        className={`w-full object-cover transform transition-transform duration-300 ${
                          isActiveIndex === index ? "scale-110" : ""
                        } group-hover:scale-105`}
                      />
                    </figure>
                    <div className='card-body'>
                      <h2
                        className='card-title text-xs flex flex-wrap justify-between items-center'
                        style={{
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {item.anime.title}
                      </h2>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          ) : (
            // 👉 when no anime data available or offline
            <p className='text-center text-error mt-5'>
              No anime data available
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
