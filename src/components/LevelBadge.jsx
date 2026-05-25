// A simple colored pill that shows INFO / WARN / ERROR
// level prop comes from the parent
export default function LevelBadge({ level }) {
  const styles = {
    INFO: "bg-green-100 text-green-700 border border-green-200",
    WARN: "bg-amber-100 text-amber-700 border border-amber-200",
    ERROR: "bg-red-100 text-red-700 border border-red-200",
  };

  return (
    <span
      className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[level] || ""}`}
    >
      {level}
    </span>
  );
}
