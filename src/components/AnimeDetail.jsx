import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router";
import SpinnerLoading from "./SpinnerLoader";
import { IoMdArrowRoundBack } from "react-icons/io";
import AsideFigure from "./AsideFigure";
import MainFigure from "./MainFigure";
import CharacterCards from "./CharacterCards";

export default function AnimeDetail() {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);
  const [char, setChar] = useState(null);
  const localPath = useLocation();
  useEffect(() => {
    if (!id) return;
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      const [resDetail, resChar] = await Promise.all([
        fetch(`https://api.jikan.moe/v4/anime/${id}`, {
          signal: controller.signal,
        }),
        fetch(`https://api.jikan.moe/v4/anime/${id}/characters`, {
          signal: controller.signal,
        }),
      ]);

      if (!resDetail.ok || !resChar.ok) {
        throw new Error("Failed to fetch anime or character data");
      }

      const [dataDetail, dataChar] = await Promise.all([
        resDetail.json(),
        resChar.json(),
      ]);

      setAnime(dataDetail.data);
      setChar(dataChar.data);
    }, 500);

    return () => clearTimeout(timer);
  }, [id]);

  if (!anime) return <SpinnerLoading />;

  return (
    <div className='max-w-7xl mx-auto rounded-2xl sm:shadow p-5 sm:pt-10 pt-0 mb-10 transition duration-300'>
      <Link to={localPath.pathname.includes("/anime") ? "/anime" : "/movies"}>
        <p className='flex items-center gap-2 text-lg font-semibold text-accent hover:text-base-300 transition mb-5 md:mb-2'>
          <IoMdArrowRoundBack /> Back to{" "}
          {localPath.pathname.includes("/anime") ? "Anime" : "Movies"}{" "}
        </p>
      </Link>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-4 relative'>
        <AsideFigure anime={anime} />
        <MainFigure anime={anime} />
      </div>
      <CharacterCards char={char} />
    </div>
  );
}
