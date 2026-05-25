import LevelBadge from "./LevelBadge.jsx";
import Pagination from "./Pagination.jsx";

export default function LogsTable({
  logs,
  loading,
  page,
  totalPages,
  onPageChange,
  level,
  onLevelChange,
  sort,
  onSortChange,
  search,
  onSearchChange,
}) {
  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div>
      {/* Controls row — search, filter, sort */}
      <div className="flex flex-wrap gap-3 mb-6">
        {/* Search */}
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search logs..."
          className="flex-1 min-w-[200px] px-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
        />

        {/* Level filter */}
        <select
          value={level}
          onChange={(e) => onLevelChange(e.target.value)}
          className="px-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 bg-white text-slate-600"
        >
          <option value="">All Levels</option>
          <option value="INFO">INFO</option>
          <option value="WARN">WARN</option>
          <option value="ERROR">ERROR</option>
        </select>

        {/* Sort toggle */}
        <div className="flex rounded-lg border border-slate-200 overflow-hidden">
          <button
            onClick={() => onSortChange("createdAt")}
            className={`px-4 py-2 text-sm transition-colors ${
              sort === "createdAt"
                ? "bg-violet-600 text-white"
                : "bg-white text-slate-600 hover:bg-slate-50"
            }`}
          >
            Most Recent
          </button>
          <button
            onClick={() => onSortChange("count")}
            className={`px-4 py-2 text-sm transition-colors ${
              sort === "count"
                ? "bg-violet-600 text-white"
                : "bg-white text-slate-600 hover:bg-slate-50"
            }`}
          >
            Most Occurred
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="text-left text-xs font-medium text-slate-500 px-6 py-4">
                Message
              </th>
              <th className="text-left text-xs font-medium text-slate-500 px-6 py-4">
                Level
              </th>
              <th className="text-left text-xs font-medium text-slate-500 px-6 py-4">
                Count
              </th>
              <th className="text-left text-xs font-medium text-slate-500 px-6 py-4">
                First Seen
              </th>
              <th className="text-left text-xs font-medium text-slate-500 px-6 py-4">
                Last Seen
              </th>
            </tr>
          </thead>

          <tbody>
            {loading && (
              <tr>
                <td colSpan={5} className="text-center py-16">
                  <div className="w-8 h-8 border-4 border-violet-600 border-t-transparent rounded-full animate-spin mx-auto" />
                </td>
              </tr>
            )}

            {!loading && logs.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-16">
                  <p className="text-slate-400 text-sm">No logs found</p>
                  <p className="text-slate-400 text-xs mt-1">
                    Install the SDK and start sending logs from your app
                  </p>
                  <code className="text-xs bg-slate-100 dark:bg-slate-700 text-violet-600 px-3 py-1 rounded mt-3 inline-block">
                    npm install hana-logflow-sdk
                  </code>
                </td>
              </tr>
            )}

            {!loading &&
              logs.map((log) => (
                <tr
                  key={log._id}
                  className="border-b border-slate-100 hover:bg-slate-50 transition-colors last:border-0"
                >
                  <td className="px-6 py-4 text-sm text-slate-700 max-w-xs truncate">
                    {log.message}
                  </td>
                  <td className="px-6 py-4">
                    <LevelBadge level={log.level} />
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 font-medium">
                    {log.count}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">
                    {formatDate(log.createdAt)}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">
                    {formatDate(log.updatedAt)}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
}
