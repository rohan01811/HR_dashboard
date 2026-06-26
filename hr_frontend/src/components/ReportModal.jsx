import { X } from "lucide-react";
import ScoreRow from "./ScoreRow";
import SummaryCard from "./SummaryCard";
import { perfInfo } from "../utils/performance";

export default function ReportModal({
    report,
    loading,
    onClose,
}) {

    if (!report && !loading) return null;

    const perf = perfInfo(report?.overall_score || 0);

    const initials = (
        report?.candidate_name || "?"
    )
        .split(" ")
        .map((w) => w[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
            onClick={onClose}
        >
            <div
                className="w-full max-w-4xl overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >

                {/* Header */}

                <div className="flex items-center justify-between border-b border-slate-700 bg-slate-950 px-4 py-3">

                    {/* Candidate */}

                    <div className="flex items-center gap-4">

                        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-blue-500 text-lg font-bold text-slate-950">
                            {initials}
                        </div>

                        <div>

                            <h2 className="text-xl font-semibold text-white">
                                {report?.candidate_name}
                            </h2>

                            <p className="text-sm text-slate-400">
                                {report?.candidate_email}
                            </p>

                        </div>

                    </div>

                    {/* Job */}

                    <div className="text-center">

                        <div className="text-xs uppercase tracking-widest text-slate-500">
                            Position
                        </div>

                        <div className="mt-1 text-lg font-semibold text-white">
                            {report?.job_title}
                        </div>

                        <div className="text-sm text-indigo-400">
                            {report?.company_name}
                        </div>

                    </div>

                    {/* Performance */}

                    <div className="flex items-center gap-4">

                        <div
                            className="rounded-xl border px-5 py-3"
                            style={{
                                background: perf.bg,
                                borderColor: perf.border,
                            }}
                        >

                            <div className="text-xs uppercase tracking-wider text-slate-400">
                                Performance
                            </div>

                            <div
                                className="text-lg font-bold"
                                style={{
                                    color: perf.color,
                                }}
                            >
                                {perf.label}
                            </div>

                        </div>

                        <button
                            onClick={onClose}
                            className="rounded-lg bg-slate-800 p-2 hover:bg-slate-700"
                        >
                            <X className="h-5 w-5 text-slate-300" />
                        </button>

                    </div>

                </div>

                {/* Loading */}

                {loading && (

                    <div className="flex h-96 items-center justify-center">

                        <div className="text-lg text-slate-300">
                            Loading report...
                        </div>

                    </div>

                )}

                {/* Report */}

                {!loading && report && (

                    <>

                        {/* Summary */}

                        <div className="grid grid-cols-4 gap-5 border-b border-slate-700 bg-slate-950/50 px-4 py-3">

                            <SummaryCard
                                title="Overall Score"
                                value={`${report.overall_score?.toFixed(1)}%`}
                                color="purple"
                            />

                            <SummaryCard
                                title="Questions"
                                value={`${report.answered_questions}/${report.total_questions}`}
                                color="blue"
                            />

                            <SummaryCard
                                title="Violations"
                                value={report.total_violations}
                                color={
                                    report.total_violations === 0
                                        ? "green"
                                        : "red"
                                }
                            />

                            <SummaryCard
                                title="Status"
                                value={report.status}
                                color={
                                    report.status === "selected"
                                        ? "green"
                                        : report.status === "rejected"
                                        ? "red"
                                        : "yellow"
                                }
                            />

                        </div>

                        {/* Body */}

                        <div className="grid grid-cols-3">

                            {/* Scores */}

                            <div className="border-r border-slate-700 bg-slate-950 px-4 py-3">

                                <h3 className="mb-6 text-xs uppercase tracking-[0.2em] text-slate-500">
                                    Skill Evaluation
                                </h3>

                                <ScoreRow
                                    label="Technical"
                                    value={report.technical_score}
                                    color="#22c55e"
                                />

                                <ScoreRow
                                    label="Communication"
                                    value={report.communication_score}
                                    color="#3b82f6"
                                />

                                <ScoreRow
                                    label="Grammar"
                                    value={report.grammar_score}
                                    color="#f59e0b"
                                />

                                <ScoreRow
                                    label="Behavior"
                                    value={report.behavior_score}
                                    color="#ec4899"
                                />

                                {/* <ScoreRow
                                    label="Confidence"
                                    value={report.confidence_avg}
                                    color="#06b6d4"
                                /> */}

                                <ScoreRow
                                    label="Overall"
                                    value={report.overall_score}
                                    color="#8b5cf6"
                                />

                            </div>

                            {/* Feedback */}

                            <div className="col-span-2 space-y-5 p-4">

                                <FeedbackCard
                                    title="Strengths"
                                    color="green"
                                    text={report.strengths}
                                />

                                <FeedbackCard
                                    title="Improvement Suggestions"
                                    color="yellow"
                                    text={report.improvements}
                                />

                                <FeedbackCard
                                    title="Hiring Recommendation"
                                    color="purple"
                                    text={report.recommendation}
                                />

                            </div>

                        </div>

                        {/* Footer */}

                        <div className="border-t border-slate-700 bg-slate-950 px-4 py-1 text-right">

                            <button
                                onClick={onClose}
                                className="rounded-lg bg-red-500 px-4 py-1 text-white hover:bg-red-600"
                            >
                                Close
                            </button>

                        </div>

                    </>

                )}

            </div>
        </div>
    );
}

function FeedbackCard({
    title,
    text,
    color,
}) {

    const colors = {
        green: "border-green-500",
        yellow: "border-yellow-500",
        purple: "border-purple-500",
    };

    return (

        <div
            className={`rounded-xl border ${colors[color]} bg-slate-950 p-5`}
        >

            <h3 className="mb-2 text-sm font-semibold text-white">
                {title}
            </h3>

            <p className="text-sm leading-7 text-slate-400">
                {text || "No information available."}
            </p>

        </div>

    );
}