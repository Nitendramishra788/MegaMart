function ErrorState({
  title = "Something went wrong",
  message = "Please try again later.",
  onRetry,
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <h2 className="text-xl font-semibold text-red-600">
        {title}
      </h2>

      <p className="mt-2 text-slate-500">
        {message}
      </p>

      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-5 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white"
        >
          Try Again
        </button>
      )}
    </div>
  );
}

export default ErrorState;