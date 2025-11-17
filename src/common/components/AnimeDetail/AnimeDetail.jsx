import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router";
import { FaArrowAltCircleLeft } from "@react-icons/all-files/fa/FaArrowAltCircleLeft";

import AsideFigure from "../AsideFigure";
import MainFigure from "../MainFigure";
import CharacterCards from "../AnimeCard/CharacterCards";
import SkeletonCard from "../Loaders/SkeletonCard";
import Pagination from "../Navigation/Pagination";
import { generatePageNumbers } from "../../utils/generatePageNumber";
import { fetchWithRetry } from "../../utils/fetchWithRetry";
import { SuspenseSkeleton } from "../../hooks/SuspenseSkeleton";
import ErrorMesssage from "../ErrorMessage";
import SEO from "../layouts/SeoConfig";

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
  const backToLabel = localPath.pathname.includes("/anime")
    ? "Anime"
    : "Movies";

  const pageList = generatePageNumbers(totalPage, currentPage);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setLoading(true);
      setError(false);

      const cachedAnime = localStorage.getItem(`animeData_${id}`);
      const cachedChar = localStorage.getItem(`animeChars_${id}`);

      if (cachedAnime && cachedChar) {
        try {
          setAnime(JSON.parse(cachedAnime));
          setChar(JSON.parse(cachedChar));
          setLoading(false);
          return;
        } catch {
          localStorage.removeItem(`animeData_${id}`);
          localStorage.removeItem(`animeChars_${id}`);
        }
      }

      try {
        const [dataDetail, dataChar] = await Promise.all([
          fetchWithRetry(`https://api.jikan.moe/v4/anime/${id}`),
          fetchWithRetry(`https://api.jikan.moe/v4/anime/${id}/characters`),
        ]);

        if (isMounted) {
          setAnime(dataDetail?.data || null);
          setChar(dataChar?.data || []);

          localStorage.setItem(
            `animeData_${id}`,
            JSON.stringify(dataDetail?.data),
          );
          localStorage.setItem(
            `animeChars_${id}`,
            JSON.stringify(dataChar?.data),
          );
        }
      } catch (err) {
        console.error("Fetch error:", err);
        if (isMounted) setError(true);
        if (isMounted) {
          setAnime({ title: "Unknown", images: {} });
          setChar([]);
        }
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

  return (
    <>
      <SEO
        title={`${backToLabel} | TopAnimePillow`}
        description={anime?.synopsis}
        image={anime?.images?.jpg?.large_image_url}
        url={`https://anime-pillow.vercel.app/anime/${id}`}
      />

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
            <SuspenseSkeleton loading={loading} qty={1}>
              <AsideFigure anime={anime} />
            </SuspenseSkeleton>
          </div>
          <div className='sm:col-span-2'>
            <SuspenseSkeleton loading={loading} qty={1}>
              {anime?.mal_id ? (
                <MainFigure anime={anime} />
              ) : (
                <ErrorMesssage
                  error={error && !loading}
                  isEmpty={!loading && !anime?.mal_id}
                />
              )}
            </SuspenseSkeleton>
          </div>
        </div>

        <SuspenseSkeleton loading={loading} qty={1}>
          <div className='mt-5'>
            <CharacterCards char={animeCharacters} />
          </div>
        </SuspenseSkeleton>

        {/* Pagination */}
        <div className='max-w-md sm:max-w-lg lg:max-w-3xl mx-auto px-2'>
          <div className='flex flex-wrap justify-center gap-2'>
            {pageList.length > 1 &&
              pageList.map((p, idx) =>
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
