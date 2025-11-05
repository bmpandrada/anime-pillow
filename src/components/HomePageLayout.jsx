import { useAnime } from "../context/ContextApi";
import Header from "./Header";
import Footer from "./Footer";
import HeroAnime from "./HeroAnime";
import Nav from "./Nav";

const Layout = ({ children }) => {
  const {
    anime,
    sortBy,
    setSortby,
    filter,
    setFilter,
    categories,
    selectedCategory,
    setSelectedCategory,
  } = useAnime();

  const displayedAnime = anime;

  return (
    <div className='flex flex-col min-h-screen'>
      <Header marginHeight={"mb-0"} />
      <HeroAnime displayedAnime={displayedAnime} />
      <div className='flex-1 max-w-7xl w-full mx-auto'>
        <div className='mt-5 text-center w-full mx-auto'>
          <Nav
            sortBy={sortBy}
            setSortby={setSortby}
            filter={filter}
            setFilter={setFilter}
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
