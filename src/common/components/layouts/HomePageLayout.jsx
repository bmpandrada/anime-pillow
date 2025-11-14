import { useAnime } from "../../context/ContextApi";
import HeroAnime from "../Hero/HeroAnime";
import Header from "../Header";
import Footer from "../Navigation/Footer";
import Nav from "../Navigation/Nav";

const Layout = ({ children }) => {
  const { upcomming } = useAnime();

  const displayedAnime = upcomming;

  return (
    <div className='flex flex-col min-h-screen'>
      <Header marginHeight={"mb-0"} />
      <HeroAnime displayedAnime={displayedAnime} />
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
