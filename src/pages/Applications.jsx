import { useState, useEffect } from "react";
import Navbar from "../components/Navbar.jsx";
import AppCard from "../components/AppCard.jsx";
import CreateAppModal from "../components/CreateAppModal.jsx";
import { useAuth } from "../context/AuthContext.jsx";

import {
  getApplicationsApi,
  deleteApplicationApi,
} from "../api/applicationsApi.js";

export default function Applications() {
  const [apps, setApps] = useState([]); // list of apps from backend
  const [loading, setLoading] = useState(true); // true while fetching
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { developer } = useAuth();

  // useEffect runs after the component first renders
  // the empty [] means it only runs once — on mount
  // this is where you fetch data from the backend
  useEffect(() => {
    fetchApps();
  }, []);

  const fetchApps = async () => {
    try {
      const res = await getApplicationsApi();
      setApps(res.data);
    } catch (err) {
      setError("Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  // called by AppCard when delete is confirmed
  // filters the deleted app out of state without refetching
  const handleDelete = async (name) => {
    try {
      await deleteApplicationApi(name);
      setApps((prev) => prev.filter((app) => app.name !== name));
    } catch (err) {
      alert("Failed to delete application");
    }
  };

  // called by CreateAppModal when a new app is created
  // adds it to the top of the list without refetching
  const handleCreated = (newApp) => {
    setApps((prev) => [newApp, ...prev]);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-10">
        {/* Header row */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-2xl text-violet-500 dark:text-violet-500 font-bold mb-1">
              Welcome back, {developer?.username} !
            </p>
            <h2 className="text-2xl font-bold text-slate-800">Applications</h2>
            <p className="text-slate-500 text-sm mt-1">
              {apps.length} {apps.length === 1 ? "application" : "applications"}
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="hoverable bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-colors"
          >
            + New Application
          </button>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-4 border-violet-600 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Error state */}
        {error && <div className="text-center py-20 text-red-500">{error}</div>}

        {/* Empty state */}
        {!loading && !error && apps.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-400 text-lg mb-2">No applications yet</p>
            <p className="text-slate-400 text-sm">
              Click "New Application" to get started
            </p>
          </div>
        )}

        {/* Apps grid */}
        {!loading && !error && apps.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {apps.map((app) => (
              <AppCard key={app._id} app={app} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </main>

      {/* Modal — only renders when showModal is true */}
      {showModal && (
        <CreateAppModal
          onClose={() => setShowModal(false)}
          onCreated={handleCreated}
        />
      )}
    </div>
  );
}
