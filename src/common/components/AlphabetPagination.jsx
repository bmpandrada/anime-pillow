const AlphabetPagination = ({
  selectedLetter,
  setSelectedLetter,
  setCurrentPage,
}) => {
  const handleLetterClick = (letter) => {
    setSelectedLetter(letter);
    setCurrentPage(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div className='flex flex-wrap justify-center gap-1 sm:gap-2 mt-5 mb-4'>
      {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => (
        <button
          key={letter}
          onClick={() => handleLetterClick(letter)}
          className={`join-item btn btn-xs sm:btn-sm transition ${
            selectedLetter === letter
              ? "bg-base-300/30 text-white"
              : "hover:bg-base-300 hover:text-base-100"
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

export default AlphabetPagination;
