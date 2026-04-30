import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, FileText, Cpu, Sparkles } from "lucide-react";
import Card from "../components/Card";
import Badge from "../components/Badge";
import EmptyState from "../components/EmptyState";
import { getCandidateById } from "../data/mockData";

function formatBold(text) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, j) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={j} className="text-slate-100">
        {part.slice(2, -2)}
      </strong>
    ) : (
      <span key={j}>{part}</span>
    )
  );
}

function AiReviewContent({ text }) {
  const lines = text.split("\n");
  const out = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (line.startsWith("## ")) {
      out.push(
        <h3 key={`h-${i}`} className="font-display text-base font-semibold text-white">
          {line.replace("## ", "")}
        </h3>
      );
      i += 1;
      continue;
    }
    if (line.startsWith("> ")) {
      out.push(
        <blockquote
          key={`q-${i}`}
          className="border-l-2 border-indigo-500/60 pl-3 text-slate-400 italic"
        >
          {formatBold(line.replace("> ", ""))}
        </blockquote>
      );
      i += 1;
      continue;
    }
    if (line.startsWith("- ")) {
      const items = [];
      while (i < lines.length && lines[i].startsWith("- ")) {
        items.push(lines[i].replace("- ", ""));
        i += 1;
      }
      out.push(
        <ul key={`ul-${i}`} className="list-disc space-y-1 pl-5 text-slate-400">
          {items.map((item, k) => (
            <li key={k}>{formatBold(item)}</li>
          ))}
        </ul>
      );
      continue;
    }
    if (line.trim() === "") {
      i += 1;
      continue;
    }
    out.push(
      <p key={`p-${i}`} className="text-slate-400">
        {formatBold(line)}
      </p>
    );
    i += 1;
  }
  return <div className="space-y-3 text-sm leading-relaxed">{out}</div>;
}

export default function CandidateDetailPage() {
  const { id } = useParams();
  const candidate = useMemo(() => getCandidateById(id), [id]);

  if (!candidate) {
    return (
      <div className="mx-auto max-w-3xl">
        <EmptyState
          title="Candidate not found"
          description="This profile may have been archived or the link is invalid."
          action={
            <Link
              to="/candidates"
              className="rounded-2xl bg-indigo-500 px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-indigo-400"
            >
              Back to candidates
            </Link>
          }
        />
      </div>
    );
  }

  const scoreTier =
    candidate.atsScore >= 85 ? "high" : candidate.atsScore >= 75 ? "mid" : "low";
  const ringColor =
    scoreTier === "high"
      ? "from-green-400 to-emerald-600"
      : scoreTier === "mid"
        ? "from-yellow-400 to-amber-600"
        : "from-red-400 to-rose-600";

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link
            to="/candidates"
            className="mb-3 inline-flex items-center gap-2 text-sm text-slate-400 transition-all duration-300 hover:text-indigo-300"
          >
            <ArrowLeft className="h-4 w-4" />
            Candidates
          </Link>
          <h1 className="font-display text-2xl font-bold text-white">{candidate.name}</h1>
          <p className="mt-1 text-sm text-slate-400">{candidate.role}</p>
        </div>
        <Badge variant={candidate.status} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
        <Card className="min-h-[420px]" hover>
          <div className="mb-4 flex items-center gap-2">
            <FileText className="h-5 w-5 text-indigo-400" />
            <h2 className="font-display text-lg font-semibold text-white">Resume preview</h2>
          </div>
          <div className="flex h-[340px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-600 bg-slate-900/60">
            <div className="mb-4 rounded-2xl border border-slate-700 bg-slate-800 p-6 text-center shadow-soft">
              <p className="text-sm font-medium text-slate-200">PDF viewer placeholder</p>
              <p className="mt-2 max-w-xs text-xs text-slate-500">
                Connect a document provider to render inline previews. Static demo shows layout only.
              </p>
            </div>
            <button
              type="button"
              className="rounded-xl border border-slate-600 px-4 py-2 text-xs font-medium text-slate-300 transition-all duration-300 hover:border-indigo-500/50 hover:text-white"
            >
              Open original file
            </button>
          </div>
        </Card>

        <div className="space-y-6">
          <Card className="relative overflow-hidden" hover>
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-indigo-500/20 blur-3xl" />
            <div className="relative flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-indigo-300">
                  ATS score
                </p>
                <p className="mt-2 font-display text-5xl font-bold tabular-nums text-white">
                  {candidate.atsScore}
                </p>
                <p className="mt-2 text-sm text-slate-400">Model blend: embeddings + structured signals</p>
              </div>
              <div
                className={`flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br p-[3px] shadow-glow ${ringColor}`}
              >
                <div className="flex h-full w-full flex-col items-center justify-center rounded-full bg-slate-900">
                  <Cpu className="mb-1 h-5 w-5 text-indigo-300" />
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                    AI
                  </span>
                </div>
              </div>
            </div>
          </Card>

          <Card hover>
            <div className="mb-4 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-indigo-400" />
              <h2 className="font-display text-lg font-semibold text-white">AI HR review</h2>
            </div>
            <AiReviewContent text={candidate.aiReview} />
          </Card>

          <Card hover>
            <h2 className="mb-3 font-display text-lg font-semibold text-white">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {candidate.skills.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-slate-600 bg-slate-900 px-3 py-1 text-xs font-medium text-slate-200 transition-all duration-300 hover:border-indigo-500/40"
                >
                  {s}
                </span>
              ))}
            </div>
          </Card>

          <Card hover>
            <h2 className="mb-3 font-display text-lg font-semibold text-white">Experience summary</h2>
            <p className="text-sm leading-relaxed text-slate-300">{candidate.experienceSummary}</p>
            <p className="mt-3 text-xs text-slate-500">
              ~{candidate.experienceYears} years relevant experience (estimated from resume)
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
