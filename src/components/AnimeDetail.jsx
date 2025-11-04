import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router";
import SpinnerLoading from "./SpinnerLoader";
import { IoMdArrowRoundBack } from "react-icons/io";
import AsideFigure from "./AsideFigure";
import MainFigure from "./MainFigure";

export default function AnimeDetail() {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);
  const localPath = useLocation();
  useEffect(() => {
    if (!id) return;

    const timer = setTimeout(async () => {
      const res = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
      const data = await res.json();
      setAnime(data.data);
    }, 500);

    return () => clearTimeout(timer);
  }, [id]);

  if (!anime) return <SpinnerLoading />;

  return (
    <div className='max-w-7xl mx-auto rounded-2xl sm:shadow p-5 sm:pt-10 pt-0 mb-10 transition duration-300'>
      <Link to={localPath.pathname.includes("/anime") ? "/" : "/movies"}>
        <p className='flex items-center gap-2 text-lg font-semibold text-accent hover:text-base-300 transition mb-5 md:mb-2'>
          <IoMdArrowRoundBack /> Back to{" "}
          {localPath.pathname.includes("/anime") ? "Anime" : "Movies"}{" "}
        </p>
      </Link>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-4'>
        <AsideFigure anime={anime} />
        <MainFigure anime={anime} />
      </div>

      {/* {console.log(anime)} */}
    </div>
  );
}
