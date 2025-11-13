import { useEffect } from "react";

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <title>About | TopAnimePillow</title>
      <meta name='description' content='About Top Anime Pillow — BMPA' />
      <meta property='og:description' content='About Top Anime Pillow — BMPA' />
      <meta property='og:type' content='website' />
      <meta property='og:url' content='https://anime-pillow.vercel.app/about' />
      <meta
        property='og:image'
        content='https://anime-pillow.vercel.app/og-image.jpg'
      />

      <meta property='og:title' content='About | TopAnimePillow' />
      <meta name='TopAnimePillow' content='about top anime pillow' />
      <meta name='author' content='BMPA' />
      <link rel='canonical' href='https://anime-pillow.vercel.app/' />

      <div className='min-h-screen p-5'>
        <div className='max-w-lg m-auto'>
          <h1 className='font-bold  text-2xl text-center'>
            About{" "}
            <span className='font-momo-signature text-xl text-accent'>
              TopAnimePillow
            </span>
          </h1>

          <p className='mt-5 text-center'>
            This project is an Anime Browser App built with React and
            TailwindCSS, powered by the Jikan API
          </p>
        </div>
      </div>
    </>
  );
}
