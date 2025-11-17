import { useEffect } from "react";
import { Link } from "react-router";
import SEO from "../common/components/SeoConfig";

const NotFoundPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEO title='404 | TopAnimePillow' description='Not Found' />

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
