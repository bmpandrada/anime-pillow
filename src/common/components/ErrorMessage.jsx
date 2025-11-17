const ErrorMesssage = ({ error, isEmpty }) => {
  if (!error && !isEmpty) return null;

  return (
    <p
      className={`${
        error ? "text-red-500" : "text-slate-400 font-semibold text-2xl"
      } text-center`}
    >
      {error ? "Failed to load data. Please try again." : "Not Found"}
    </p>
  );
};

export default ErrorMesssage;
