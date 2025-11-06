import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import AsideFigure from "../common/components/AsideFigure";
import SpinnerLoading from "../common/components/SpinnerLoader";
import { animateTitle } from "../common/hooks/animateTitle";

export default function Character() {
  const { id } = useParams();
  const [char, setChar] = useState(null);
  const [chars, setChars] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
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
      } catch (error) {
        console.error("Fetch error:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    animateTitle(".pillow");
  }, []);

  if (loading) {
    return <SpinnerLoading />;
  }

  return (
    <div className='max-w-7xl mx-auto rounded-2xl sm:shadow p-5 sm:pt-10 pt-0 mb-10 transition duration-300'>
      <div className='grid sm:grid-cols-4 gap-4'>
        <div className='col-span-1'>
          <AsideFigure anime={char} />
        </div>
        <div className='rounded px-5 sm:col-span-3'>
          <h2 className='text-base-400 text-2xl font-extrabold mb-2'>
            Name: <span className='pillow text-warning'>{char.name}</span>
          </h2>
          <p className='font-bold text-base-300'>
            Role: <span className='text-warning'>{chars[0].role}</span>
          </p>
          <h2 className='font-bold text-base-300'>
            Title: <span className='text-warning'>{chars[0].anime.title}</span>
          </h2>
          {char?.about ? (
            <h1>{char.about}</h1>
          ) : (
            <div className='flex justify-center items-center'>
              <h1 className='mt-5 text-2xl font-semibold text-error bg-black w-full text-center p-5'>
                Unknown
              </h1>
            </div>
          )}

          {chars.length > 0 ? (
            <>
              <div className='divider divider-neutral'>
                <h1 className='text-2xl  text-accent antialiased font-semibold'>
                  Anime
                </h1>
              </div>
              <div className='max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 mt-5 mb-10'>
                {chars.map((item, index) => (
                  <Link
                    className='card bg-base-200 w-full shadow-sm h-50'
                    to={`/anime/${item.anime.mal_id}`}
                    key={`${item.mal_id}-${item.anime?.mal_id || index}`}
                  >
                    <figure>
                      <img
                        src={item.anime.images.webp.large_image_url}
                        alt={item.anime.title}
                        className='w-full object-cover transform transition-transform duration-300 hover:scale-105'
                      />
                    </figure>
                    <div className='card-body'>
                      <h2 className='card-title text-xs flex flex-wrap justify-between items-center'>
                        {item.anime.title}
                        {/* <div className='badge badge-warning text-xs'>{item.role}</div> */}
                      </h2>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          ) : (
            " "
          )}
        </div>
      </div>
    </div>
  );
}
