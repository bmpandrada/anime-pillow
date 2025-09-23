import { useAnime } from "../context/ContextApi";
import { Link } from "react-router";

const HomePage = () => {
    const {filteredAnime} = useAnime();

    return ( 
        <div className="px-5 sm:px-10">  

         <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-5">
        {filteredAnime.length === 0 ?

          <p className="text-center font-bold text-4xl">
            Not Found
          </p>

        : filteredAnime.map((item) => (
          <Link  to={`/anime/${item.mal_id}`}
            key={item.mal_id}
            className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden"
          >
            <img
              src={item.images.jpg.image_url}
              alt={item.title}
              className="w-full h-60 object-cover"
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
        </div>
     );
}
 
export default HomePage;


