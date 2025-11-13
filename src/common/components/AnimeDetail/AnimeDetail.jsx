import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router";
import { FaCircleArrowLeft } from "react-icons/fa6";
import AsideFigure from "../AsideFigure";
import MainFigure from "../MainFigure";
import CharacterCards from "../AnimeCard/CharacterCards";
import SkeletonCard from "../Loaders/SkeletonCard";
import MetaTags from "../../hooks/MetaTags";

export default function AnimeDetail() {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);
  const [char, setChar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false); // track fetch failure
  const localPath = useLocation();

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const [resDetail, resChar] = await Promise.all([
          fetch(`https://api.jikan.moe/v4/anime/${id}`),
          fetch(`https://api.jikan.moe/v4/anime/${id}/characters`),
        ]);

        if (!resDetail.ok || !resChar.ok) {
          throw new Error("Failed to fetch anime or character data");
        }

        const [dataDetail, dataChar] = await Promise.all([
          resDetail.json(),
          resChar.json(),
        ]);

        if (isMounted) {
          setAnime(dataDetail?.data || null);
          setChar(dataChar?.data || []);
        }
      } catch (err) {
        console.log(err.message);
        if (isMounted) setError(true);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const backToLabel = localPath.pathname.includes("/anime")
    ? "Anime"
    : "Movies";

  const showMain = anime ? <MainFigure anime={anime} /> : <SkeletonCard />;

  return (
    <>
      <MetaTags
        title={`${backToLabel} | TopAnimePillow`}
        description='Welcome to top anime pillow page'
        image='https://anime-pillow.vercel.app/icons/icon-192x192.png'
        name='TopAnimePillow'
      />
      <div className='max-w-7xl mx-auto rounded-2xl sm:shadow p-5 sm:pt-10 pt-0 mb-10 transition duration-300'>
        <Link
          to={localPath.pathname.includes("/anime") ? "/anime" : "/movies"}
          aria-label={backToLabel}
        >
          <p className='flex items-center gap-2 text-lg font-semibold text-accent hover:text-base-300 transition mb-5 md:mb-2'>
            <FaCircleArrowLeft /> Back to {backToLabel}
          </p>
        </Link>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-4 relative'>
          <div className='col-span-1'>
            {loading && !error && <SkeletonCard />}
            {!loading && !error && <AsideFigure anime={anime} />}
          </div>
          <div className='sm:col-span-2'>
            {loading && !error && <SkeletonCard />}
            {!loading && !error && <MainFigure anime={anime} />}
          </div>
        </div>

        {!loading && !error && char?.length > 0 && (
          <div className='mt-5'>
            <CharacterCards char={char} />
          </div>
        )}
        {loading && !error && !char?.length > 0 && (
          <div className='mt-5'>
            <SkeletonCard />
          </div>
        )}
      </div>
    </>
  );
}
