import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import AsideFigure from "../common/components/AsideFigure";
import { animateTitle } from "../common/hooks/animateTitle";
import SkeletonCard from "../common/components/Loaders/SkeletonCard";
import HeadInfo from "../common/components/Character/HeadInfo";
import { SuspenseSkeleton } from "../common/hooks/SuspenseSkeleton";
import AnimeSection from "../common/components/AnimeSection";
import RelatedAnime from "../common/components/Character/RelatedAnime";

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

        await new Promise((resolve) => setTimeout(resolve, 1000));

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

      <div className='max-w-7xl mx-auto rounded-2xl sm:shadow sm:p-5 sm:pt-10 pt-0 mb-10 transition duration-300'>
        <div className='grid sm:grid-cols-4 gap-4'>
          <div className='col-span-1'>
            <SuspenseSkeleton loading={loading} qty={1}>
              <AsideFigure anime={char} />
            </SuspenseSkeleton>
          </div>
          <div className='rounded px-5 sm:col-span-3'>
            <SuspenseSkeleton loading={loading} qty={2}>
              <HeadInfo char={char} chars={chars} />

              <AnimeSection title={"Anime"} show={chars.length > 0}>
                <RelatedAnime chars={chars} isActiveIndex={isActiveIndex} />
              </AnimeSection>
            </SuspenseSkeleton>
          </div>
        </div>
      </div>
    </>
  );
}
