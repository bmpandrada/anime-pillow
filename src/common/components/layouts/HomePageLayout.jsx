import { useAnime } from "../../context/ContextApi";
import Header from "../Header";
import Footer from "../Footer";
import HeroAnime from "../HeroAnime";
import Nav from "../Nav";
import CookieConsent from "../CookieConsent";

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
