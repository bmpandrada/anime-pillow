import { Helmet } from "@dr.pogodin/react-helmet";

export default function SEO({
  title = "TopAnimePillow",
  description = "Browse the best Anime Pillows — BMPA",
  image = "https://anime-pillow.vercel.app/og-image.jpg",
  url = "https://anime-pillow.vercel.app",
  keywords = [],
}) {
  return (
    <Helmet>
      {/* TITLE */}
      <title>{title}</title>

      {/* BASIC META */}
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords.join(", ")} />

      {/* OPEN GRAPH */}
      <meta property='og:type' content='website' />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:image' content={image} />
      <meta property='og:url' content={url} />

      {/* OTHER */}
      <link rel='canonical' href={url} />
      <meta name='author' content='BMPA' />
    </Helmet>
  );
}
