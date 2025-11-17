import TitleDivider from "./TitleDivider";

const AnimeSection = ({ show, title, children }) => {
  if (!show) return null;
  return (
    <>
      <TitleDivider title={title} />
      {children}
    </>
  );
};

export default AnimeSection;
