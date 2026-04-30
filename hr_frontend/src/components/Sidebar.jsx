import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Briefcase,
  Users,
  Mic2,
  Trophy,
  Sparkles,
} from "lucide-react";
import clsx from "clsx";

const links = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/jobs", label: "Jobs", icon: Briefcase },
  { to: "/candidates", label: "Candidates", icon: Users },
  { to: "/jobcreate", label: "Create Job", icon: Mic2 },
  // { to: "/rankings", label: "Rankings", icon: Trophy },
];

export default function Sidebar({ mobileOpen, onNavigate }) {
  const base =
    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-300";

  const content = (
    <>
      <div className="mb-8 flex items-center gap-3 px-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-glow">
          <Sparkles className="h-5 w-5 text-white" />
        </div>
        <div>
          <p className="font-display text-sm font-semibold text-white">Smart Agentic Hiring</p>
          <p className="text-xs text-slate-500">Search → Selection</p>
        </div>
      </div>
      <nav className="flex flex-col gap-1">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            onClick={onNavigate}
            className={({ isActive }) =>
              clsx(
                base,
                isActive
                  ? "bg-indigo-500/15 text-indigo-300 shadow-soft ring-1 ring-indigo-500/30"
                  : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
              )
            }
          >
            <Icon className="h-4 w-4 shrink-0" />
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="mt-auto rounded-2xl border border-slate-700 bg-slate-900/80 p-4">
        <p className="text-xs font-medium text-slate-400">AI copilot</p>
        <p className="mt-1 text-sm text-slate-200">Ranking & reviews update in near real time.</p>
      </div>
    </>
  );

  return (
    <>
      <aside className="hidden w-64 shrink-0 flex-col border-r border-slate-800 bg-slate-950 px-4 py-6 lg:flex">
        <div className="flex h-full flex-col">{content}</div>
      </aside>

      <div
        className={clsx(
          "fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity lg:hidden",
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={onNavigate}
        aria-hidden={!mobileOpen}
      />
      <aside
        className={clsx(
          "fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-slate-800 bg-slate-950 px-4 py-6 shadow-glow transition-transform duration-300 lg:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {content}
      </aside>
    </>
  );
}
