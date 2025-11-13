const TitleDivider = ({ title }) => {
  return (
    <div className='divider divider-neutral max-w-7xl mx-auto'>
      <h1 className='text-lg sm:text-2xl antialiased font-semibold font-momo-signature'>
        {title}
      </h1>
    </div>
  );
};

export default TitleDivider;
