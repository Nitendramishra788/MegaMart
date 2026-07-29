import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-100">
      <h1 className="text-7xl font-bold text-red-600">
        404
      </h1>

      <p className="mt-3 text-xl text-slate-700">
        Page not found
      </p>

      <Link
        to="/"
        className="mt-6 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white"
      >
        Go to Home
      </Link>
    </main>
  );
}

export default NotFoundPage;