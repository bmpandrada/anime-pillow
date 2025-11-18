import { Link } from "react-router";

const RelatedAnime = ({ chars, isActiveIndex, setActiveIndex }) => {
  return (
    <div className='max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mt-5 mb-10'>
      {chars.map((item, index) => (
        <Link
          className='card bg-base-200 w-full shadow-sm group'
          to={`/anime/${item.anime.mal_id}`}
          key={`${item.mal_id}-${item.anime?.mal_id || index}`}
          onTouchStart={() => setActiveIndex(index)}
          onTouchEnd={() => setTimeout(() => setActiveIndex(null), 50)}
        >
          <figure className='h-20'>
            <img
              src={item.anime.images.webp.large_image_url}
              alt={
                item.anime.title + " " + item.anime.mal_id ||
                "Anime series picture"
              }
              className={`w-full object-cover transform transition-transform duration-300 ${
                isActiveIndex === index ? "scale-110" : ""
              } group-hover:scale-105`}
            />
          </figure>
          <div className='card-body'>
            <h2
              className='card-title text-xs flex flex-wrap justify-between items-center'
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
