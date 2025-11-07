const TitleDivider = ({ title }) => {
  return (
    <div className='divider divider-neutral max-w-7xl mx-auto'>
      <h1 className='text-2xl  text-accent antialiased font-semibold'>
        {title}
      </h1>
    </div>
  );
};

export default TitleDivider;
