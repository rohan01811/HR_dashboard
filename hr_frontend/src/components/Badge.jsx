import clsx from "clsx";

const variants = {
  applied: "bg-blue-500/15 text-blue-400 border-blue-500/40",
  interviewed: "bg-yellow-500/15 text-yellow-400 border-yellow-500/40",
  selected: "bg-green-500/15 text-green-400 border-green-500/40",
  rejected: "bg-red-500/15 text-red-400 border-red-500/40",
  hire: "bg-green-500/15 text-green-400 border-green-500/40",
  maybe: "bg-yellow-500/15 text-yellow-400 border-yellow-500/40",
  reject: "bg-red-500/15 text-red-400 border-red-500/40",
  active: "bg-green-500/15 text-green-400 border-green-500/40",
  closed: "bg-slate-600/40 text-slate-300 border-slate-500/40",
  neutral: "bg-slate-700/60 text-slate-200 border-slate-600",
};

const labels = {
  applied: "Applied",
  interviewed: "Interviewed",
  selected: "Selected",
  rejected: "Rejected",
  hire: "Hire",
  maybe: "Maybe",
  reject: "Reject",
  active: "Active",
  closed: "Closed",
};

export default function Badge({ variant = "neutral", children, className }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-all duration-300",
        variants[variant] || variants.neutral,
        className
      )}
    >
      {children ?? labels[variant] ?? variant}
    </span>
  );
}
