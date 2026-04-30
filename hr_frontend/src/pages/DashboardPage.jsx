import { useEffect, useState } from "react";
import {
  Briefcase,
  Users,
  Calendar,
  UserCheck,
  Activity,
  TrendingUp,
} from "lucide-react";
import Card from "../components/Card";
import Badge from "../components/Badge";
import { Skeleton, StatCardSkeleton } from "../components/Skeleton";
import {
  statsOverview,
  topCandidates,
  pipelineStages,
  recentActivity,
} from "../data/mockData";

function StatCard({ icon: Icon, label, value, hint }) {
  return (
    <Card hover className="relative overflow-hidden">
      <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-indigo-500/10 blur-2xl" />
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-400">{label}</p>
          <p className="mt-2 font-display text-3xl font-bold tracking-tight text-white">{value}</p>
          {hint && <p className="mt-1 text-xs text-slate-500">{hint}</p>}
        </div>
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-700 bg-slate-900 text-indigo-400">
          <Icon className="h-5 w-5" />
        </span>
      </div>
    </Card>
  );
}

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 650);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400">
            Smart Agentic Hiring
          </p>
          <h1 className="font-display text-2xl font-bold text-white sm:text-3xl">
            Mission control
          </h1>
          <p className="mt-1 max-w-2xl text-sm text-slate-400">
            Real-time pipeline health, top talent signals, and activity — tuned for an AI-assisted hiring workflow.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-2xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-slate-400">
          <TrendingUp className="h-4 w-4 text-green-500" />
          Models refreshed · <span className="text-slate-200">12 min ago</span>
        </div>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {loading ? (
          <>
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
          </>
        ) : (
          <>
            <StatCard
              icon={Briefcase}
              label="Total active jobs"
              value={statsOverview.activeJobs}
              hint="Across all teams"
            />
            <StatCard
              icon={Users}
              label="Total applicants"
              value={statsOverview.totalApplicants.toLocaleString()}
              hint="Last 90 days"
            />
            <StatCard
              icon={Calendar}
              label="Interviews today"
              value={statsOverview.interviewsToday}
              hint="AI + human"
            />
            <StatCard
              icon={UserCheck}
              label="Selected candidates"
              value={statsOverview.selectedCandidates}
              hint="Offer-ready"
            />
          </>
        )}
      </section>

      <div className="grid gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-3" hover>
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="font-display text-lg font-semibold text-white">Top candidates</h2>
            <span className="rounded-full border border-slate-700 bg-slate-900 px-2.5 py-1 text-xs text-slate-400">
              ATS-ranked
            </span>
          </div>
          <div className="space-y-3">
            {loading ? (
              <>
                <Skeleton className="h-14 w-full" />
                <Skeleton className="h-14 w-full" />
                <Skeleton className="h-14 w-full" />
              </>
            ) : (
              topCandidates.map((c, idx) => (
                <div
                  key={c.id}
                  className="flex items-center justify-between gap-3 rounded-2xl border border-slate-700/80 bg-slate-900/50 px-4 py-3 transition-all duration-300 hover:border-indigo-500/30"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-800 text-xs font-bold text-slate-300">
                      {idx + 1}
                    </span>
                    <div>
                      <p className="font-medium text-slate-100">{c.name}</p>
                      <p className="text-xs text-slate-500">Score {c.score}</p>
                    </div>
                  </div>
                  <Badge variant={c.status} />
                </div>
              ))
            )}
          </div>
        </Card>

        <Card className="lg:col-span-2" hover>
          <h2 className="mb-4 font-display text-lg font-semibold text-white">Hiring pipeline</h2>
          <div className="space-y-5">
            {pipelineStages.map((stage, i) => (
              <div key={stage.id}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-200">{stage.label}</span>
                  <span className="text-slate-500">{stage.count}</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-slate-900">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-violet-500 transition-all duration-500"
                    style={{ width: `${stage.pct}%` }}
                  />
                </div>
                {i < pipelineStages.length - 1 && (
                  <div className="mt-4 flex justify-center">
                    <div className="h-6 w-px bg-gradient-to-b from-indigo-500/50 to-transparent" />
                  </div>
                )}
              </div>
            ))}
            <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/40 p-3 text-xs text-slate-500">
              Flow: <span className="text-slate-300">Applied</span> →{" "}
              <span className="text-slate-300">Interview</span> →{" "}
              <span className="text-slate-300">Selected</span>
            </div>
          </div>
        </Card>
      </div>

      <Card hover>
        <div className="mb-6 flex items-center gap-2">
          <Activity className="h-5 w-5 text-indigo-400" />
          <h2 className="font-display text-lg font-semibold text-white">Recent activity</h2>
        </div>
        <div className="relative">
          <div className="absolute bottom-0 left-[11px] top-2 w-px bg-slate-800" aria-hidden />
          <ul className="space-y-6">
            {loading
              ? [1, 2, 3].map((k) => (
                  <li key={k} className="relative flex gap-4 pl-8">
                    <Skeleton className="absolute left-0 top-1 h-6 w-6 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-48" />
                      <Skeleton className="h-3 w-full max-w-md" />
                    </div>
                  </li>
                ))
              : recentActivity.map((item) => (
                  <li key={item.id} className="relative flex gap-4 pl-8">
                    <span
                      className={`absolute left-0 top-1 flex h-6 w-6 items-center justify-center rounded-full border text-[10px] font-bold ${
                        item.type === "interview"
                          ? "border-yellow-500/40 bg-yellow-500/15 text-yellow-300"
                          : "border-indigo-500/40 bg-indigo-500/15 text-indigo-200"
                      }`}
                    >
                      {item.type === "interview" ? "IN" : "AP"}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-slate-100">{item.title}</p>
                      <p className="text-sm text-slate-400">{item.detail}</p>
                      <p className="mt-1 text-xs text-slate-600">{item.time}</p>
                    </div>
                  </li>
                ))}
          </ul>
        </div>
      </Card>
    </div>
  );
}
