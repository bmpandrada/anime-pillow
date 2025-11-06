export function filterAndSort(
  list,
  { filter, selectedCategory, sortBy, anime },
) {
  return list
    .filter((item) => {
      const matchTitle = item.title
        .toLowerCase()
        .includes(filter.toLowerCase());
      const matchCategory =
        !selectedCategory ||
        item.genres?.some((g) => g.name === selectedCategory);

      if (sortBy === "upcoming") {
        const dateA = new Date(item.aired?.from || 0);
        return (
          matchTitle && matchCategory && (isNaN(dateA) || dateA > new Date())
        );
      }

      return matchTitle && matchCategory;
    })
    .slice()
    .sort((a, b) => {
      if (list === anime) {
        if (sortBy === "latest") return (b.year || 0) - (a.year || 0);
        if (sortBy === "oldest") return (a.year || 0) - (b.year || 0);
      } else {
        const dateA = new Date(a.aired?.from || 0);
        const dateB = new Date(b.aired?.from || 0);

        if (sortBy === "latest") return dateB - dateA;
        if (sortBy === "oldest") return dateA - dateB;
        if (sortBy === "upcoming") return dateA - dateB;
      }
      return 0;
    });
}
