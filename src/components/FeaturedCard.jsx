import { Link, useLocation } from "react-router";

const FeaturedCard = ({ item }) => {
  const localPath = useLocation();
  const showEp = localPath.pathname === "/anime" || "/";
  return (
    <Link
      to={`${
        localPath.pathname === "/anime" || localPath.pathname === "/"
          ? "/anime"
          : "/movies"
      }/${item.mal_id}`}
      className='flex '
    >
      <div className='card w-auto h-80 sm:h-auto grid-cols-2 mx-auto bg-base-100 md:w-96 shadow-md mb-10 relative group overflow-hidden'>
        <figure className='col-span-2'>
          <img
            src={item.images.webp.large_image_url}
            alt={item.title}
            className='transition-transform duration-300 group-hover:scale-105'
          />
        </figure>

        {/* hidden by default, show on hover */}
        <div className='card-body absolute inset-0 bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end z-10 p-4'>
          <h2 className='card-title'>{item.title}</h2>
          <div className=''>
            {showEp && (
              <p className='text-sm font-semibold text-base-100  mt-1'>
                Episodes:{" "}
                <span className='text-base-100  opacity-80'>
                  {item.episodes || "?"}
                </span>
              </p>
            )}
            <p className='text-sm font-semibold text-base-100 mt-1'>
              Genre:{" "}
              <span className='text-text-base-100  opacity-80'>
                {item.genres[0].name || "?"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FeaturedCard;
