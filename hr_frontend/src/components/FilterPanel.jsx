import { Filter } from "lucide-react";
import Card from "./Card";

const STATUS_OPTIONS = [
  { value: "all", label: "All statuses" },
  { value: "applied", label: "Applied" },
  { value: "interviewed", label: "Interviewed" },
  { value: "selected", label: "Selected" },
  { value: "rejected", label: "Rejected" },
];

export default function FilterPanel({
  minScore,
  maxScore,
  onMinScoreChange,
  onMaxScoreChange,
  skillsInput,
  onSkillsInputChange,
  onAddSkill,
  skillTags,
  onRemoveSkill,
  status,
  onStatusChange,
}) {
  return (
    <Card className="h-fit lg:sticky lg:top-24" hover>
      <div className="mb-4 flex items-center gap-2 text-slate-200">
        <Filter className="h-4 w-4 text-indigo-400" />
        <span className="text-sm font-semibold">Filters</span>
      </div>

      <div className="space-y-5">
        <div>
          <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-slate-400">
            ATS score range
          </label>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min="0"
              max="100"
              value={minScore}
              onChange={(e) => onMinScoreChange(Number(e.target.value))}
              className="h-2 w-full cursor-pointer accent-indigo-500"
            />
          </div>
          <div className="mt-2 flex justify-between text-xs text-slate-400">
            <span>Min: {minScore}</span>
            <span>Max: {maxScore}</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={maxScore}
            onChange={(e) => onMaxScoreChange(Number(e.target.value))}
            className="mt-2 h-2 w-full cursor-pointer accent-indigo-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-slate-400">
            Skills
          </label>
          <div className="flex gap-2">
            <input
              value={skillsInput}
              onChange={(e) => onSkillsInputChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  onAddSkill();
                }
              }}
              placeholder="Type skill + Enter"
              className="flex-1 rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
            />
            <button
              type="button"
              onClick={onAddSkill}
              className="rounded-xl bg-indigo-500 px-3 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-indigo-400"
            >
              Add
            </button>
          </div>
          {skillTags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {skillTags.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => onRemoveSkill(s)}
                  className="rounded-full border border-indigo-500/40 bg-indigo-500/10 px-2.5 py-1 text-xs text-indigo-200 transition-all duration-300 hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-200"
                >
                  {s} ×
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-slate-400">
            Status
          </label>
          <select
            value={status}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-slate-100 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
          >
            {STATUS_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </Card>
  );
}
