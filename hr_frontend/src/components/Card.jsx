import clsx from "clsx";

export default function Card({ children, className, padding = true, hover = false }) {
  return (
    <div
      className={clsx(
        "rounded-2xl border border-slate-700 bg-slate-800 shadow-soft",
        padding && "p-5 sm:p-6",
        hover && "transition-all duration-300 hover:border-indigo-500/40 hover:shadow-glow",
        className
      )}
    >
      {children}
    </div>
  );
}
