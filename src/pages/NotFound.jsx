import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center px-4 transition-colors">
      <div className="text-center">
        <img
          src="/404.png"
          alt="Page not found"
          className="w-72 mx-auto mb-8"
        />

        <h1 className="text-7xl font-black text-violet-600 mb-2">404</h1>
        <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-2">
          Page not found
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-8">
          The page you're looking for doesn't exist.
        </p>

        <button
          onClick={() => navigate("/applications")}
          className="hoverable bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium px-6 py-2.5 rounded-xl transition-colors"
        >
          Back to Applications
        </button>
      </div>
    </div>
  );
}
