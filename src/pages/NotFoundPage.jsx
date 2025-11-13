import { useEffect } from "react";
import { Link } from "react-router";

const NotFoundPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <title>Not Found | TopAnimePillow</title>
      <meta name='description' content='Top Anime Pillow — BMPA' />
      <meta property='og:type' content='website' />
      <meta property='og:url' content='https://anime-pillow.vercel.app/anime' />
      <meta
        property='og:image'
        content='https://anime-pillow.vercel.app/icons/icon-192x192.png'
      />

      <meta property='og:title' content='Not Found | TopAnimePillow' />
      <meta name='TopAnimePillow' content='Not Found' />
      <meta name='author' content='BMPA' />
      <link rel='canonical' href='https://anime-pillow.vercel.app/' />

      <div className='w-full h-screen flex items-center justify-center'>
        <div className='max-w-4xl text-center p-2 mb-52'>
          <h1 className='capitalize text-4xl font-bold text-cyan-600 mb-4'>
            Sorry
          </h1>
          <p className='text-lg mb-4'>We couldn't find that page</p>
          <p>
            Try searching or go to{" "}
            <Link to={"/"}>
              <span className='font-bold text-accent'>🎌 Top Anime Pillow</span>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
