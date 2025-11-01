import { useAnime } from "../context/ContextApi";
import Nav from "./Nav";
import ThemeToggle from "./Toogle";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  const { sortBy, setSortby, filter, setFilter } = useAnime();

  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <div className='flex-1'>
        <Nav
          sortBy={sortBy}
          setSortby={setSortby}
          filter={filter}
          setFilter={setFilter}
        />
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
