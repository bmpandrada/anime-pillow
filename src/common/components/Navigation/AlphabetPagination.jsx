import React, { useCallback } from "react";

const AlphabetPagination = ({
  selectedLetter,
  setSelectedLetter,
  setCurrentPage,
}) => {
  const handleLetterClick = useCallback(
    (letter) => {
      setSelectedLetter(letter);
      setCurrentPage(1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [setSelectedLetter, setCurrentPage],
  );

  return (
    <div className='flex flex-wrap justify-center gap-1 sm:gap-2 mt-5 mb-4'>
      {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => (
        <button
          aria-pressed={selectedLetter === letter}
          key={letter}
          onClick={() => handleLetterClick(letter)}
          className={`join-item btn btn-xs sm:btn-sm transition ${
            selectedLetter === letter
              ? "bg-base-300/30 text-accent"
              : "hover:bg-base-300 hover:text-accent"
          }`}
        >
          {letter}
        </button>
      ))}
      {selectedLetter && (
        <button
          onClick={() => handleLetterClick("")}
          className='join-item btn btn-xs sm:btn-sm hover:bg-blue-500 hover:text-white text-red-500'
        >
          Clear
        </button>
      )}
    </div>
  );
};

export default React.memo(AlphabetPagination);
