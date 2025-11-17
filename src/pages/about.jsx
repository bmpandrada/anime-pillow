import { Helmet } from "@dr.pogodin/react-helmet";
import { useEffect } from "react";
import SEO from "../common/components/layouts/SeoConfig";

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <SEO
        title='About | TopAnimePillow'
        description='About Top Anime Pillow — BMPA'
        url='https://anime-pillow.vercel.app/about'
      />
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
