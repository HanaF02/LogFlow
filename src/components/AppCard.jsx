import { useNavigate } from "react-router-dom";
import { useState } from "react";

// app — the application object from the backend
// onDelete — function called when delete is confirmed, passed from Applications.jsx
export default function AppCard({ app, onDelete }) {
  const navigate = useNavigate();
  const [confirming, setConfirming] = useState(false);

  // format the date nicely
  const createdAt = new Date(app.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const handleDelete = (e) => {
    // stop the click from bubbling up to the card click (which navigates)
    e.stopPropagation();
    if (confirming) {
      onDelete(app.name);
    } else {
      setConfirming(true);
      // auto cancel confirm after 3 seconds
      setTimeout(() => setConfirming(false), 3000);
    }
  };

  return (
    <div
      onClick={() => navigate(`/applications/${app.name}/logs`)}
      className="hoverable bg-white border border-slate-200 rounded-2xl p-6 cursor-pointer hover:border-violet-300 hover:shadow-md transition-all group"
    >
      {/* Top row — name + delete */}
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center">
          {/* First letter of app name as icon */}
          <span className="text-violet-600 font-bold text-lg">
            {app.name[0].toUpperCase()}
          </span>
        </div>

        <button
          onClick={handleDelete}
          className={`text-xs px-3 py-1 rounded-lg transition-colors ${
            confirming
              ? "bg-red-500 text-white"
              : "text-slate-400 hover:text-red-500 hover:bg-red-50"
          }`}
        >
          {confirming ? "Confirm?" : "Delete"}
        </button>
      </div>

      {/* App name */}
      <h3 className="font-semibold text-slate-800 group-hover:text-violet-600 transition-colors mb-1">
        {app.name}
      </h3>

      {/* Created date */}
      <p className="text-xs text-slate-400">Created {createdAt}</p>
    </div>
  );
}
