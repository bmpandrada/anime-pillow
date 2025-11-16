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
    <div className='flex flex-col min-h-screen'>
      <Header marginHeight={"mb-0"} />
      <Suspense fallback={<SkeletonCard />}>
        <HeroAnime displayedAnime={displayedAnime} />
      </Suspense>
      <div className='flex-1 max-w-7xl w-full mx-auto'>
        <div className='mt-5 text-center w-full mx-auto'>
          <Nav />
        </div>
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
