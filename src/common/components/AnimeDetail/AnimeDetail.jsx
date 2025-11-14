import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router";
import { FaArrowAltCircleLeft } from "@react-icons/all-files/fa/FaArrowAltCircleLeft";

import AsideFigure from "../AsideFigure";
import MainFigure from "../MainFigure";
import CharacterCards from "../AnimeCard/CharacterCards";
import SkeletonCard from "../Loaders/SkeletonCard";
import Pagination from "../Navigation/Pagination";
import { generatePageNumbers } from "../../utils/generatePageNumber";

export default function AnimeDetail() {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);
  const [char, setChar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false); // track fetch failure
  const localPath = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 12;

  const totalPage = Math.ceil(char.length / perPage);
  const lastIndex = currentPage * perPage;
  const firstIndex = lastIndex - perPage;
  const animeCharacters = char.slice(firstIndex, lastIndex);

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

  const isLoading = loading && !error;
  const isLoaded = !loading && !error;

  const pageList = generatePageNumbers(totalPage, currentPage);

  return (
    <>
      <title>{`${backToLabel} | TopAnimePillow`}</title>
      <meta name='description' content='Welcome to top anime pillow page' />
      <meta property='og:description' content='Top Anime Pillow — BMPA' />
      <meta property='og:type' content='website' />
      <meta property='og:url' content='https://anime-pillow.vercel.app/anime' />
      <meta
        property='og:image'
        content='https://anime-pillow.vercel.app/icons/icon-192x192.png'
      />

      <meta property='og:title' content={`${backToLabel} | TopAnimePillow`} />
      <meta name='TopAnimePillow' content='Anime card page detail' />
      <meta
        name='keywords'
        content='Anime, Anime streaming, Anime online, Anime streaming sites, Best anime, Best anime movies, Character, Manga, Anime movies, Anime series, Japanese anime'
      />
      <meta name='author' content='BMPA' />
      <link rel='canonical' href='https://anime-pillow.vercel.app/' />

      <div className='max-w-7xl mx-auto rounded-2xl sm:shadow p-5 sm:pt-10 pt-0 mb-10 transition duration-300'>
        <div className='w-fit mb-5 md:mb-2'>
          <Link
            to={localPath.pathname.includes("/anime") ? "/anime" : "/movies"}
            aria-label={backToLabel}
          >
            <p className='flex items-center  gap-2 text-lg font-semibold text-accent hover:text-accent/50 transition'>
              <FaArrowAltCircleLeft /> Back to {backToLabel}
            </p>
          </Link>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-4 relative'>
          <div className='col-span-1'>
            {isLoading && <SkeletonCard />}
            {isLoaded && <AsideFigure anime={anime} />}
          </div>
          <div className='sm:col-span-2'>
            {isLoading && <SkeletonCard />}
            {isLoaded && <MainFigure anime={anime} />}
          </div>
        </div>

        {isLoaded && animeCharacters?.length > 0 && (
          <div className='mt-5'>
            <CharacterCards char={animeCharacters} />
          </div>
        )}
        {isLoading && !animeCharacters?.length > 0 && (
          <div className='mt-5'>
            <SkeletonCard />
          </div>
        )}

        {/* Pagination */}
        <div className='max-w-md sm:max-w-lg lg:max-w-3xl mx-auto px-2'>
          <div className='flex flex-wrap justify-center gap-2'>
            {console.log(pageList.length)}
            {pageList.length === 1
              ? null
              : pageList.map((p, idx) =>
                  p === "..." ? (
                    <span key={idx} className='px-3 py-1'>
                      ...
                    </span>
                  ) : (
                    <Pagination
                      key={idx}
                      scrollTop={false}
                      ibtn={p - 1}
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
                    />
                  ),
                )}
          </div>
        </div>
      </div>
    </>
  );
}
