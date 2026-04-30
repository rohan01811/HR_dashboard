import { useMemo, useState } from "react";
import { Trophy, ArrowUpDown } from "lucide-react";
import Card from "../components/Card";
import Badge from "../components/Badge";
import ScoreBadge from "../components/ScoreBadge";
import { Table, THead, TBody, TR, TH, TD } from "../components/Table";
import { rankings as baseRankings } from "../data/mockData";

export default function RankingsPage() {
  const [sortDesc, setSortDesc] = useState(true);

  const rows = useMemo(() => {
    const r = [...baseRankings];
    r.sort((a, b) => (sortDesc ? b.atsScore - a.atsScore : a.atsScore - b.atsScore));
    return r.map((c, i) => ({ ...c, rank: i + 1 }));
  }, [sortDesc]);

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="mb-1 inline-flex items-center gap-2 text-indigo-300">
            <Trophy className="h-5 w-5" />
            <span className="text-xs font-semibold uppercase tracking-widest">Leaderboard</span>
          </div>
          <h1 className="font-display text-2xl font-bold text-white">Candidate ranking</h1>
          <p className="mt-1 text-sm text-slate-400">
            Model-ranked shortlist with hire / maybe / reject recommendations.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setSortDesc((s) => !s)}
          className="inline-flex items-center gap-2 rounded-2xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm font-medium text-slate-200 transition-all duration-300 hover:border-indigo-500/40"
        >
          <ArrowUpDown className="h-4 w-4 text-indigo-400" />
          Sort by score: {sortDesc ? "High → low" : "Low → high"}
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {rows.slice(0, 3).map((c) => (
          <Card
            key={c.id}
            hover
            className="border-indigo-500/30 bg-gradient-to-b from-slate-800 to-slate-900/90"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Rank {c.rank}
              </span>
              <span className="rounded-full bg-indigo-500/20 px-2 py-0.5 text-[10px] font-bold text-indigo-200">
                TOP {c.rank}
              </span>
            </div>
            <p className="mt-3 font-display text-lg font-semibold text-white">{c.name}</p>
            <div className="mt-2 flex items-center gap-3">
              <ScoreBadge score={c.atsScore} />
              <Badge variant={c.recommendation}>{c.recommendation === "hire" ? "Hire" : c.recommendation === "maybe" ? "Maybe" : "Reject"}</Badge>
            </div>
          </Card>
        ))}
      </div>

      <Card hover={false} className="p-0 overflow-hidden">
        <Table>
          <THead>
            <TR>
              <TH>Rank</TH>
              <TH>Candidate</TH>
              <TH>Score</TH>
              <TH>Recommendation</TH>
            </TR>
          </THead>
          <TBody>
            {rows.map((c) => {
              const top = c.rank <= 3;
              return (
                <TR
                  key={c.id}
                  className={
                    top
                      ? "bg-indigo-500/[0.06] hover:bg-indigo-500/10"
                      : ""
                  }
                >
                  <TD>
                    <span
                      className={
                        top
                          ? "font-display text-lg font-bold text-indigo-200"
                          : "font-medium text-slate-300"
                      }
                    >
                      #{c.rank}
                    </span>
                  </TD>
                  <TD className="font-medium text-slate-100">{c.name}</TD>
                  <TD>
                    <ScoreBadge score={c.atsScore} />
                  </TD>
                  <TD>
                    <Badge variant={c.recommendation}>
                      {c.recommendation === "hire"
                        ? "Hire"
                        : c.recommendation === "maybe"
                          ? "Maybe"
                          : "Reject"}
                    </Badge>
                  </TD>
                </TR>
              );
            })}
          </TBody>
        </Table>
      </Card>
    </div>
  );
}
