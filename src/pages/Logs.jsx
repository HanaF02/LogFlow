import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import LogsTable from "../components/LogsTable.jsx";
import Charts from "../components/Charts.jsx";
import { getLogsApi } from "../api/logsApi.js";

export default function Logs() {
  const { name } = useParams();
  const navigate = useNavigate();

  const [logs, setLogs] = useState([]);
  const [allLogs, setAllLogs] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [level, setLevel] = useState("");
  const [sort, setSort] = useState("createdAt");
  const [search, setSearch] = useState("");

  const [activeTab, setActiveTab] = useState("table");

  const fetchLogs = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getLogsApi(name, {
        page,
        limit: 10,
        sort,
        order: "desc",
        ...(level && { level }), 
        ...(search && { search }), 
      });
      setLogs(res.data.logs);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error("Failed to fetch logs", err);
    } finally {
      setLoading(false);
    }
  }, [name, page, sort, level, search]);

  const fetchAllLogs = useCallback(async () => {
    try {
      const res = await getLogsApi(name, { limit: 1000, page: 1 });
      setAllLogs(res.data.logs);
    } catch (err) {
      console.error("Failed to fetch all logs", err);
    }
  }, [name]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  useEffect(() => {
    fetchAllLogs();
  }, [fetchAllLogs]);

  const handleLevelChange = (val) => {
    setLevel(val);
    setPage(1);
  };
  const handleSortChange = (val) => {
    setSort(val);
    setPage(1);
  };
  const handleSearchChange = (val) => {
    setSearch(val);
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate("/applications")}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            ← Back
          </button>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">{name}</h2>
            <p className="text-slate-500 text-sm mt-1">Application logs</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-slate-100 p-1 rounded-xl w-fit mb-8">
          <button
            onClick={() => setActiveTab("table")}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === "table"
                ? "bg-white text-violet-600 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Logs Table
          </button>
          <button
            onClick={() => setActiveTab("charts")}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === "charts"
                ? "bg-white text-violet-600 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Charts
          </button>
        </div>

        {/* Tab content */}
        {activeTab === "table" ? (
          <LogsTable
            logs={logs}
            loading={loading}
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
            level={level}
            onLevelChange={handleLevelChange}
            sort={sort}
            onSortChange={handleSortChange}
            search={search}
            onSearchChange={handleSearchChange}
          />
        ) : (
          <Charts logs={allLogs} />
        )}
      </main>
    </div>
  );
}
