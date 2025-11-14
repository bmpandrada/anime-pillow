export function generatePageNumbers(total, current) {
  const pages = [];

  if (total <= 8) {
    for (let i = 1; i <= total; i++) pages.push(i);
    return pages;
  }

  // Always push first page
  pages.push(1);

  // Left ellipsis
  if (current > 4) {
    pages.push("...");
  }

  // Middle pages (current -1, current, current+1)
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  for (let i = start; i <= end; i++) {
    // prevent duplicates
    if (pages[pages.length - 1] !== i) {
      pages.push(i);
    }
  }

  // Right ellipsis (prevent double ellipsis)
  if (current < total - 3) {
    if (pages[pages.length - 1] !== "...") {
      pages.push("...");
    }
  }

  // Last page (prevent duplicates)
  if (pages[pages.length - 1] !== total) {
    pages.push(total);
  }

  return pages;
}
