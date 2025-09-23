import { useAnime } from "../context/ContextApi";
import Nav from "./Nav";


const Layout = ({ children,  }) => {
  const {error, loading, sortBy, setSortby, filter, setFilter} = useAnime();
    return (
      <div className="flex flex-col min-h-screen">
          <h1 className="text-3xl font-bold text-center mb-8 text-slate-400 bg-black p-5">
          🎌 Top Anime Pillow
        </h1>
         <div className="flex-1">
           <Nav sortBy={sortBy} setSortby={setSortby} filter={filter} setFilter={setFilter} />

        {loading && <p>Loading...</p>}
        {error && <p>Error Message: {error}</p>}
      {children}
         </div>
      <div className="bg-black text-center p-5 text-white">
          <p className="text-sm">Created By: BMPA {new Date().getFullYear()}</p>
      </div>
      </div>
    );
};

export default Layout;
