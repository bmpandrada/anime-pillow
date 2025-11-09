import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router";
import SpinnerLoading from "../Loaders/SpinnerLoader";
import { IoMdArrowRoundBack } from "react-icons/io";
import AsideFigure from "../AsideFigure";
import MainFigure from "../MainFigure";
import CharacterCards from "../AnimeCard/CharacterCards";
import SkeletonCard from "../Loaders/SkeletonCard";

export default function AnimeDetail() {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [char, setChar] = useState(null);
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
          setAnime(dataDetail?.data);
          setChar(dataChar?.data);
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className='max-w-7xl mx-auto rounded-2xl sm:shadow p-5 sm:pt-10 pt-0 mb-10 transition duration-300'>
      <Link to={localPath.pathname.includes("/anime") ? "/anime" : "/movies"}>
        <p className='flex items-center gap-2 text-lg font-semibold text-accent hover:text-base-300 transition mb-5 md:mb-2'>
          <IoMdArrowRoundBack /> Back to{" "}
          {localPath.pathname.includes("/anime") ? "Anime" : "Movies"}{" "}
        </p>
      </Link>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-4 relative'>
        {loading ? <SkeletonCard /> : <AsideFigure anime={anime} />}

        {loading ? <SkeletonCard /> : <MainFigure anime={anime} />}
      </div>
      <CharacterCards char={char} loading={loading} />
    </div>
  );
}
