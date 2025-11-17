const HeadInfo = ({ char, chars, error }) => {
  if (error) return null;
  return (
    <>
      {char?.name && (
        <h2 className='text-base-400 text-2xl font-extrabold mb-2'>
          Name:{" "}
          <span className='pillow text-warning'>{char?.name || "Unknown"}</span>
        </h2>
      )}
      {chars?.[0]?.role && (
        <p className='font-bold text-base-content'>
          Role:{" "}
          <span className='text-warning'>{chars?.[0]?.role || "Unknown"}</span>
        </p>
      )}
      {chars?.[0]?.anime?.title && (
        <h2 className='font-bold text-base-content'>
          Title:{" "}
          <span className='text-warning'>
            {chars?.[0]?.anime?.title || "Unknown"}
          </span>
        </h2>
      )}
      {char?.about && (
        <h1 className='font-montserrat dark:text-white font-semibold'>
          {char.about}
        </h1>
      )}
    </>
  );
};

export default HeadInfo;
