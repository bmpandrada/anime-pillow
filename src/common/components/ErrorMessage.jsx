const ErrorMesssage = ({ error, isEmpty }) => {
  if (!error && !isEmpty) return null;

  return (
    <p
      className={`${
        error
          ? "text-gray-500 font-semibold text-xl"
          : "text-slate-400 font-semibold text-2xl"
      } text-center`}
    >
      {error ? "Offline or data not available" : "Not Found"}
    </p>
  );
};

export default ErrorMesssage;
