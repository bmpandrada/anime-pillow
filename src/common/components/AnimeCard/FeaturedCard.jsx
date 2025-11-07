import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";

const FeaturedCard = ({ items, custom_link, pause }) => {
  const carouselRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(pause ? true : false);
  const [step, setStep] = useState(5);
  const [isActiveIndex, setActiveIndex] = useState(false);

  useEffect(() => {
    const updateStep = () => {
      if (window.innerWidth < 640) {
        setStep(3);
      } else {
        setStep(5);
      }
    };
    updateStep();
    window.addEventListener("resize", updateStep);
    return () => window.removeEventListener("resize", updateStep);
  }, []);

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      handleNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [index, paused]);

  const handlePrev = () => {
    const newIndex = (index - step + items.length) % items.length;
    setIndex(newIndex);
    scrollToItem(newIndex);
  };

  const handleNext = () => {
    const newIndex = (index + step) % items.length;
    setIndex(newIndex);
    scrollToItem(newIndex);
  };

  const scrollToItem = (i) => {
    const carousel = carouselRef.current;
    if (carousel) {
      const childWidth = carousel.children[0]?.offsetWidth || 0;
      const scrollAmount = i * (childWidth + 12);
      carousel.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div
      className='relative'
      onMouseEnter={() =>
        paused === pause ? setPaused(true) : setPaused(false)
      }
      onMouseLeave={() =>
        paused === pause ? setPaused(true) : setPaused(false)
      }
    >
      <div className='pointer-events-none absolute top-0 left-0 h-full w-32 bg-gradient-to-r from-base-100/100 via-base-100/50 to-transparent z-10 rounded-l-box' />
      <div className='pointer-events-none absolute top-0 right-0 h-full w-32 bg-gradient-to-l from-base-100/100 via-base-100/50 to-transparent z-10 rounded-r-box' />

      <div className='absolute -top-10 right-0 flex gap-2 z-1 bg-base-100'>
        <button
          onClick={handlePrev}
          className='btn btn-circle bg-base-100 btn-sm border-0'
        >
          ❮
        </button>
        <button
          onClick={handleNext}
          className='btn btn-circle bg-base-100 btn-sm border-0'
        >
          ❯
        </button>
      </div>
      <div
        ref={carouselRef}
        className='carousel carousel-center bg-base-100 rounded-box w-full space-x-4 p-4 overflow-x-auto scroll-smooth snap-x snap-mandatory'
      >
        {Array.isArray(items) && items.length > 0 ? (
          items.map((item, index) => (
            <Link
              key={`${item.mal_id}-${index}`}
              to={`${custom_link}/${item.mal_id}`}
              className='carousel-item sm:w-1/4 md:w-1/5 w-1/3 h-50 sm:h-90 snap-center rounded-box flex-shrink-0 overflow-hidden relative group'
              onTouchStart={() => setActiveIndex(index)}
              onTouchEnd={() =>
                setTimeout(() => {
                  setActiveIndex(false);
                }, 800)
              }
            >
              <img
                src={
                  item?.images?.webp?.large_image_url ||
                  item?.images?.webp?.image_url ||
                  item?.images?.webp?.small_image_url
                }
                alt={item.title}
                className={`w-full h-full object-cover rounded-box transform transition-transform duration-300 ${
                  isActiveIndex ? "scale-110" : "group-hover:scale-110"
                }`}
              />

              {/* Overlay */}
              <div
                className={`absolute inset-0  flex items-center justify-center transition-all duration-300 ${
                  isActiveIndex === index
                    ? "bg-black/70"
                    : "bg-black/0 group-hover:bg-black/70"
                }`}
              >
                <h1
                  className={`text-green-300 text-center text-xs sm:text-sm md:text-md lg:text-lg font-bold transition-opacity duration-300 ${
                    isActiveIndex === index
                      ? "opacity-100"
                      : "group-hover:opacity-100 opacity-0"
                  }`}
                >
                  {item.title || item.name}
                </h1>
              </div>
            </Link>
          ))
        ) : (
          <div className='text-center text-gray-400 p-5 w-full'>
            No featured items available.
          </div>
        )}
      </div>
    </div>
  );
};

export default FeaturedCard;
