import clsx from "clsx";

export default function ScoreBadge({ score }) {
  const tier =
    score >= 85 ? "high" : score >= 75 ? "mid" : "low";
  const styles = {
    high: "border-green-500/40 bg-green-500/15 text-green-400",
    mid: "border-yellow-500/40 bg-yellow-500/15 text-yellow-400",
    low: "border-red-500/40 bg-red-500/15 text-red-400",
  };
  return (
    <span
      className={clsx(
        "inline-flex min-w-[3rem] justify-center rounded-full border px-2.5 py-0.5 text-xs font-semibold tabular-nums transition-all duration-300",
        styles[tier]
      )}
    >
       {Number(score).toFixed(2)}
    </span>
  );
}
