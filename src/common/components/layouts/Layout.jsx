import { useAnime } from "../../context/ContextApi";
import Nav from "../Nav";
import Header from "../Header";
import Footer from "../Footer";

const Layout = ({ children }) => {
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
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
