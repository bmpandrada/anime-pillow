import { useEffect, useState } from "react";
import { useParams } from "react-router";
import AsideFigure from "../common/components/AsideFigure";
import { animateTitle } from "../common/hooks/animateTitle";
import SkeletonCard from "../common/components/Loaders/SkeletonCard";
import HeadInfo from "../common/components/Character/HeadInfo";
import { SuspenseSkeleton } from "../common/hooks/SuspenseSkeleton";
import AnimeSection from "../common/components/AnimeSection";
import RelatedAnime from "../common/components/Character/RelatedAnime";
import { fetchWithRetry } from "../common/utils/fetchWithRetry";
import ErrorMesssage from "../common/components/ErrorMessage";

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
    if (!id) return;

    const fetchData = async () => {
      setLoading(true);
      setError(false);

      try {
        const cachedChar = localStorage.getItem(`charData_${id}`);
        const cachedChars = localStorage.getItem(`charsData_${id}`);

        if (cachedChar && cachedChars) {
          try {
            setChar(JSON.parse(cachedChar));
            setChars(JSON.parse(cachedChars));
            setLoading(false);
            return;
          } catch {
            localStorage.removeItem(`charData_${id}`);
            localStorage.removeItem(`charsData_${id}`);
          }
        }

        const [dataChar, dataChars] = await Promise.all([
          fetchWithRetry(`https://api.jikan.moe/v4/characters/${id}`),
          fetchWithRetry(`https://api.jikan.moe/v4/characters/${id}/anime`),
        ]);

        setChar(dataChar.data || { name: "Unknown", images: {} });
        setChars(dataChars.data || []);

        localStorage.setItem(`charData_${id}`, JSON.stringify(dataChar.data));
        localStorage.setItem(`charsData_${id}`, JSON.stringify(dataChars.data));
      } catch (err) {
        console.error("Fetch error:", err);
        setError(true);
        setChar({ name: "Unknown", images: {} });
        setChars([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const safeChar = char || { name: "Loading...", images: {} };
  const safeChars = chars.length ? chars : [{ title: "Loading..." }];

  return (
    <>
      <title>Character | TopAnimePillow</title>
      <meta name='description' content='Top Anime Pillow — BMPA' />
      <meta property='og:description' content='Character card page' />
      <meta property='og:type' content='website' />
      <meta
        property='og:url'
        content={`https://anime-pillow.vercel.app/characters/${id}`}
      />
      <meta
        property='og:image'
        content='https://anime-pillow.vercel.app/icons/icon-192x192.png'
      />

      <meta property='og:title' content='Character | TopAnimePillow' />
      <meta name='TopAnimePillow' content='Character card page' />
      <meta
        name='keywords'
        content='Anime, Anime streaming, Anime online, Anime streaming sites, Best anime, Best anime movies, Character, Manga, Anime movies, Anime series, Japanese anime'
      />
      <meta name='author' content='BMPA' />
      <link
        rel='canonical'
        href={`https://anime-pillow.vercel.app/characters/${id}`}
      />

      <div className='max-w-7xl mx-auto rounded-2xl shadow p-5 pt-10 mb-10'>
        <div className='grid sm:grid-cols-4 gap-4'>
          <SuspenseSkeleton loading={loading} qty={1}>
            <div className='col-span-1'>
              <AsideFigure anime={char || { name: "Loading...", images: {} }} />
            </div>
          </SuspenseSkeleton>
          <div className='rounded px-5 sm:col-span-3'>
            <SuspenseSkeleton loading={loading} qty={2}>
              <HeadInfo char={safeChar} chars={chars} />

              <AnimeSection title='Anime' show={loading || chars.length > 0}>
                {loading && <SkeletonCard qty={2} />}
                {!loading && !error && (
                  <RelatedAnime
                    chars={safeChars}
                    isActiveIndex={isActiveIndex}
                  />
                )}
              </AnimeSection>
            </SuspenseSkeleton>

            <ErrorMesssage error={error && !loading} />
          </div>
        </div>
      </div>
    </>
  );
}
