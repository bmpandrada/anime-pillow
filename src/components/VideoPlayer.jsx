export default function TrailerPlayer({ trailer, className }) {
  const embedUrl = `${trailer}=1&mute=1`;

  return (
    <div
      style={{
        position: "relative",
        paddingTop: "56.25%",
      }}
      className={className}
    >
      <iframe
        src={embedUrl}
        title='Trailer'
        allow='autoplay; encrypted-media; picture-in-picture'
        allowFullScreen
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          border: "none",
        }}
      />
    </div>
  );
}
