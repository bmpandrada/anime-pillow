import { Link } from "react-router";

const RelatedAnime = ({ chars, isActiveIndex, setActiveIndex }) => {
  return (
    <div className='max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mt-5 mb-10'>
      {chars.map((item, index) => (
        <Link
          key={`${item.mal_id}-${item.anime?.mal_id || index}`}
          to={`/anime/${item.anime.mal_id}`}
          onTouchStart={() => setActiveIndex(index)}
          onTouchEnd={() => setTimeout(() => setActiveIndex(null), 50)}
          className='
            group flex flex-col bg-white dark:bg-black w-full rounded-xl overflow-hidden border-0 shadow-sm hover:shadow-md transition-all duration-300'
        >
          <figure className='w-full h-40 sm:h-48 overflow-hidden rounded-t-xl'>
            <img
              src={item.anime.images.webp.large_image_url}
              alt={item.anime.title || "Anime cover"}
              className={`
                w-full h-full object-cover transition-transform duration-300
                ${isActiveIndex === index ? "scale-105" : ""}
                group-hover:scale-105
              `}
              loading='lazy'
              onError={(e) => (e.currentTarget.src = "/wallpper.webp")}
            />
          </figure>

          <div className='p-3 flex-1 flex items-center'>
            <h2
              className='text-sm font-medium text-gray-800 dark:text-white line-clamp-2'
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {item.anime.title}
            </h2>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default RelatedAnime;
