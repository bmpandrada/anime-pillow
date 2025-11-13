import React, { useCallback } from "react";

const Pagination = React.memo(
  ({ scrollTop, ibtn, currentPage, setCurrentPage }) => {
    const handleClick = useCallback(() => {
      setCurrentPage(ibtn + 1);
      if (scrollTop) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, [ibtn, setCurrentPage, scrollTop]);

    const isActive = currentPage === ibtn + 1;

    return (
      <button
        aria-pressed={isActive}
        onClick={handleClick}
        className={`px-3 py-1  cursor-pointer rounded mb-10 hover:bg-base-content transition duration-300 
                  ${
                    isActive
                      ? "bg-base-content text-base-100"
                      : "bg-base-content/60 text-white "
                  }`}
      >
        {ibtn + 1}
      </button>
    );
  },
);

export default Pagination;
