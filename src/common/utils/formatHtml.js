export default function formatHTML(html) {
  return html.replace(/></g, ">\n<");
}
