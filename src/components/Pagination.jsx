const Pagination = ({ ibtn, currentPage, setCurrentPage }) => {
  return (
    <button
      onClick={() => {
        setCurrentPage(ibtn + 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      className={`px-3 py-1  cursor-pointer rounded mb-10 
                  ${
                    currentPage === ibtn + 1
                      ? "bg-slate-600 text-white"
                      : "bg-slate-700 text-gray-200"
                  }`}
    >
      {ibtn + 1}
    </button>
  );
};

export default Pagination;
