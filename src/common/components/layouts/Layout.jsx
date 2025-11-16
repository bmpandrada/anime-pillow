import { useAnime } from "../../context/ContextApi";
import AnimatePage from "../Animation/PageTransition";
import Header from "../Header";
import Footer from "../Navigation/Footer";
import Nav from "../Navigation/Nav";
import { Outlet } from "react-router";

const Layout = () => {
  const {
    sortBy,
    setSortby,
    filter,
    setFilter,
    categories,
    selectedCategory,
    setSelectedCategory,
  } = useAnime();

  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <div className='flex-1 max-w-7xl w-full mx-auto'>
        <Nav
          sortBy={sortBy}
          setSortby={setSortby}
          filter={filter}
          setFilter={setFilter}
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <AnimatePage>
          <Outlet />
        </AnimatePage>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
