import clsx from "clsx";

export function Table({ children, className }) {
  return (
    <div
      className={clsx(
        "overflow-x-auto rounded-2xl border border-slate-700 bg-slate-900/50 shadow-soft",
        className
      )}
    >
      <table className="w-full min-w-[640px] border-collapse text-left text-sm">
        {children}
      </table>
    </div>
  );
}

export function THead({ children }) {
  return (
    <thead className="border-b border-slate-700 bg-slate-900/80 text-xs font-semibold uppercase tracking-wide text-slate-400">
      {children}
    </thead>
  );
}

export function TBody({ children }) {
  return <tbody className="divide-y divide-slate-700/80">{children}</tbody>;
}

export function TR({ children, className, onClick }) {
  return (
    <tr
      role={onClick ? "button" : undefined}
      onClick={onClick}
      className={clsx(
        "transition-all duration-300",
        onClick && "cursor-pointer hover:bg-slate-800/80",
        className
      )}
    >
      {children}
    </tr>
  );
}

export function TH({ children, className }) {
  return <th className={clsx("px-4 py-3 font-semibold", className)}>{children}</th>;
}

export function TD({ children, className }) {
  return <td className={clsx("px-4 py-3 align-middle text-slate-200", className)}>{children}</td>;
}
