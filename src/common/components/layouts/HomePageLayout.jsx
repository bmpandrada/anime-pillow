import { useAnime } from "../../context/ContextApi";
import Header from "../Header";
import SkeletonCard from "../Loaders/SkeletonCard";
import Footer from "../Navigation/Footer";
import Nav from "../Navigation/Nav";
import { lazy, Suspense } from "react";

const HeroAnime = lazy(() => import("../Hero/HeroAnime"));

const Layout = ({ children }) => {
  const { upcomming } = useAnime();

  const displayedAnime = upcomming;

  return (
    <>
      <Header marginHeight={"mb-0"} />
      <main className='flex flex-col min-h-screen'>
        <Suspense
          fallback={
            <div className='max-w-xl mx-auto'>
              <SkeletonCard />
            </div>
          }
        >
          <HeroAnime displayedAnime={displayedAnime} />
        </Suspense>
        <section className='flex-1 max-w-7xl mt-5 text-center w-full  mx-auto'>
          <Nav />
          {children}
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Layout;
