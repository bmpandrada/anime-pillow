import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { FaHeart } from "@react-icons/all-files/fa/FaHeart";
import { FaStar } from "@react-icons/all-files/fa/FaStar";

const FeaturedCard = ({ items, custom_link, pause }) => {
  const carouselRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(pause);
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
      onTouchStart={() =>
        paused === pause ? setPaused(true) : setPaused(false)
      }
      onTouchEnd={() => (paused === pause ? setPaused(true) : setPaused(false))}
    >
      <div className='pointer-events-none absolute top-0 left-0 h-full w-10 sm:w-12 bg-gradient-to-r from-base-100/75 via-base-100/20 to-transparent z-20 rounded-l-box' />
      <div className='pointer-events-none absolute top-0 right-0 h-full w-10 sm:w-12 bg-gradient-to-l from-base-100/75 via-base-100/20 to-transparent z-20 rounded-r-box' />
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
              onTouchEnd={() => setTimeout(() => setActiveIndex(null), 50)}
              aria-label={`go to page ${item?.title_english || item?.name}`}
            >
              <div className='absolute right-0 top-0 bg-gradient-to-l from-black/100 pb-1 pr-2 via-black/40 to-transparent z-10'>
                {item?.favorites && (
                  <span
                    className={`flex flex-wrap items-center gap-2 pl-2 text-white transition duration-500  text-xs sm:text-sm lg:text-md font-bold
                  ${
                    isActiveIndex === index ? "hidden" : "block"
                  } group-hover:hidden   `}
                  >
                    <FaHeart />
                    {item?.favorites >= 1000
                      ? (item?.favorites / 1000)
                          .toFixed(1)
                          .replace(/\.0$/, "") + "K"
                      : item?.favorites}
                  </span>
                )}

                {item?.score && (
                  <span
                    className={`flex flex-wrap items-center gap-2 pl-2 text-white transition duration-500  text-xs sm:text-sm lg:text-md font-bold 
                  ${
                    isActiveIndex === index ? "hidden" : "block"
                  } group-hover:hidden   `}
                  >
                    <FaStar />
                    {item?.score}
                  </span>
                )}
              </div>
              <img
                src={item?.images?.webp?.image_url || "/wallpper.webp"}
                loading='lazy'
                decoding='async'
                alt={item.title || "anime card"}
                className={`w-full h-auto object-cover rounded-box transform transition-transform duration-300
        ${isActiveIndex === index ? "scale-110" : ""} group-hover:scale-110`}
              />
              <p
                className={`transition duration-500 absolute text-white text-center bottom-0 font-bold text-sm p-2 truncate mx-auto w-full bg-gradient-to-t from-black/100 via-black/50 to-transparent 
              ${
                isActiveIndex === index ? "hidden" : "block"
              } group-hover:hidden   `}
              >
                {item?.title_english || item?.name}
              </p>

              <div
                className={`absolute inset-0 flex items-center justify-center transition-all duration-300
        ${
          isActiveIndex === index ? "bg-black/70" : "bg-black/0"
        } group-hover:bg-black/70`}
              >
                <h1
                  className={`text-green-400 text-center text-xs sm:text-sm md:text-md lg:text-lg font-bold transition-opacity duration-300
          ${
            isActiveIndex === index ? "opacity-100" : "opacity-0"
          } group-hover:opacity-100`}
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

export default React.memo(FeaturedCard);
