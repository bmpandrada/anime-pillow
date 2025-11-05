import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";

const FeaturedCard = ({ items, custom_link, pause }) => {
  const carouselRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(pause ? pause : false);
  const [step, setStep] = useState(5);

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
    if (carousel && carousel.children[i]) {
      carousel.children[i].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  };

  return (
    <div
      className='relative'
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className='absolute -top-6 right-0 flex gap-2 z-10'>
        <button
          onClick={handlePrev}
          className='btn btn-circle bg-base-100 btn-sm'
        >
          ❮
        </button>
        <button
          onClick={handleNext}
          className='btn btn-circle bg-base-100 btn-sm'
        >
          ❯
        </button>
      </div>
      <div
        ref={carouselRef}
        className='carousel carousel-center bg-black rounded-box w-full space-x-4 p-4 overflow-x-auto scroll-smooth snap-x snap-mandatory'
      >
        {Array.isArray(items) && items.length > 0 ? (
          items.map((item) => (
            <Link
              key={item.mal_id}
              to={`${custom_link}/${item.mal_id}`}
              className='carousel-item sm:w-1/4 md:w-1/5 w-1/3 h-50 sm:h-90 snap-center flex-shrink-0'
            >
              <img
                src={
                  item?.images?.webp?.large_image_url ||
                  item?.images?.webp?.image_url ||
                  item?.images?.webp?.small_image_url
                }
                alt={item.title}
                className='w-full h-full object-cover rounded-box'
              />
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
