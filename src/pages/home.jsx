import { useState } from "react";
import SpinnerLoading from "../components/SpinnerLoader";
import { useAnime } from "../context/ContextApi";
import { Link } from "react-router";

const HomePage = () => {
    const {filteredAnime, loading} = useAnime();
    const [currentPage, setCurrentPage] = useState(1);
    const perPage = 12;

    const totalPage = Math.ceil(filteredAnime.length / perPage);

    const lastIndex = currentPage * perPage;
    const firstIndex = lastIndex - perPage;
    const currentAnime = filteredAnime.slice(firstIndex, lastIndex);  


    if (loading)
    return (
      <SpinnerLoading />
    );


    return ( 
        <div className="px-5 sm:px-10">  

         <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-5">
        {filteredAnime.length === 0 ?
        <div className="flex justify-center items-center min-h-[60vh] col-span-full">
          <p className="text-center font-bold text-4xl text-gray-600">
            Not Found
          </p>
        </div>
        : currentAnime.map((item) => (
          <Link  to={`/anime/${item.mal_id}`}
            key={item.mal_id}
            className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden"
          >
            <img
              src={item.images.jpg.image_url}
              alt={item.title}
              className="w-full h-60 object-cover transform transition-transform duration-300 hover:scale-105"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-900 truncate">
                {item.title}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Episodes: {item.episodes || "?"}
              </p>
              <p className="text-yellow-500 font-bold mt-2">
                ⭐ {item.score || "N/A"}
              </p>
            </div>
          </Link>
        ))}
      </div>
               <div className="flex justify-center gap-2 mt-8">
            {Array.from({length: totalPage}, (_, ibtn)=>(
                <button 
                    key={ibtn + 1} 
                    onClick={()=> setCurrentPage(ibtn + 1)}
                    className={`px-3 py-1  cursor-pointer rounded
                     ${currentPage === ibtn + 1 ? 'bg-blue-600 text-white' : 'bg-blue-700 text-gray-200'}`}>
                        {ibtn + 1}
                     </button>
            ))}
        </div>
        </div>
     );
}
 
export default HomePage;


