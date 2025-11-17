import { useAnime } from "../../context/ContextApi";
import AnimatePage from "../AnimatePage";

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
    <>
      <main className='flex flex-col min-h-screen'>
        <Header />
        <Nav
          sortBy={sortBy}
          setSortby={setSortby}
          filter={filter}
          setFilter={setFilter}
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <section className='flex-1 max-w-7xl w-full mx-auto'>
          <AnimatePage>
            <Outlet />
          </AnimatePage>
        </section>
        <Footer />
      </main>
    </>
  );
};

export default Layout;
