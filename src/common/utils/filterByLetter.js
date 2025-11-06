export function filteredByLetter(data, selectedLetter) {
  return selectedLetter
    ? data.filter((item) => {
        const title = item.title_english || item.title || "";
        return title.charAt(0).toUpperCase() === selectedLetter;
      })
    : data;
}
