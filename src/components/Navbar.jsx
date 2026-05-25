import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { developer, logout } = useAuth();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [showKey, setShowKey] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  // copies the API key to clipboard and shows a "Copied!" confirmation for 2 seconds
  const handleCopy = () => {
    navigator.clipboard.writeText(developer.apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <nav className="bg-white border-b border-slate-200 px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-0.5">
          <img src="/log.png" alt="LogFlow" className="w-8 h-8" />
          <h1 className="text-xl font-bold text-violet-600">LogFlow</h1>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* API Key section */}
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2">
            <span className="text-xs text-slate-500 font-medium">API Key</span>

            {/* Toggle show/hide */}
            <span className="text-xs font-mono text-slate-700">
              {showKey ? developer?.apiKey : "••••••••••••••••"}
            </span>

            <button
              onClick={() => setShowKey((prev) => !prev)}
              className="text-slate-400 hover:text-slate-600 text-xs"
            >
              {showKey ? "Hide" : "Show"}
            </button>

            <button
              onClick={handleCopy}
              className="text-xs bg-violet-100 text-violet-700 hover:bg-violet-200 px-2 py-0.5 rounded transition-colors"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>

          {/* Username */}
          <span className="text-sm text-slate-600 font-medium">
            {developer?.username}
          </span>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="text-sm text-slate-500 hover:text-red-500 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
