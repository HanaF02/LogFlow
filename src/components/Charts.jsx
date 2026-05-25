import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

// logs — ALL logs for the app (not paginated, we need all for charts)
// we derive chart data from them here
export default function Charts({ logs }) {
  // --- Pie chart data ---
  // count how many of each level exist
  const levelCounts = logs.reduce((acc, log) => {
    acc[log.level] = (acc[log.level] || 0) + 1;
    return acc;
  }, {});

  const pieData = [
    { name: "INFO", value: levelCounts.INFO || 0 },
    { name: "WARN", value: levelCounts.WARN || 0 },
    { name: "ERROR", value: levelCounts.ERROR || 0 },
  ].filter((d) => d.value > 0); // don't show levels with 0 logs

  const PIE_COLORS = {
    INFO: "#16a34a",
    WARN: "#d97706",
    ERROR: "#dc2626",
  };

  // --- Line chart data ---
  // group logs by day, count each level per day
  const byDay = logs.reduce((acc, log) => {
    const day = new Date(log.createdAt).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    if (!acc[day]) acc[day] = { day, INFO: 0, WARN: 0, ERROR: 0 };
    acc[day][log.level] = (acc[day][log.level] || 0) + 1;
    return acc;
  }, {});

  // sort by date and convert to array
  const lineData = Object.values(byDay).sort(
    (a, b) => new Date(a.day) - new Date(b.day),
  );

  if (logs.length === 0) {
    return (
      <div className="text-center py-20 text-slate-400 text-sm">
        No logs to display charts
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Pie Chart */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6">
        <h3 className="text-base font-semibold text-slate-700 mb-6">
          Log Level Distribution
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={110}
              paddingAngle={3}
              dataKey="value"
            >
              {pieData.map((entry) => (
                <Cell key={entry.name} fill={PIE_COLORS[entry.name]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Line Chart */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6">
        <h3 className="text-base font-semibold text-slate-700 mb-6">
          Logs Over Time
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={lineData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis
              dataKey="day"
              tick={{ fontSize: 12, fill: "#94a3b8" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "#94a3b8" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="INFO"
              stroke="#16a34a"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="WARN"
              stroke="#d97706"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="ERROR"
              stroke="#dc2626"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
