import { useState, useEffect } from "react";
import { Sparkles, ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react";
import axios from "axios";
import Badge from "../components/Badge";
import ScoreBadge from "../components/ScoreBadge";
import EmptyState from "../components/EmptyState";
import { TableRowSkeleton } from "../components/Skeleton";
import ReportModal from "../components/ReportModal";
export default function CandidatesPage() {
  const [loading, setLoading] = useState(true);
  const [candidates, setCandidates] = useState([]);
  const [sortField, setSortField] = useState("interviewScore");
  const [sortDir, setSortDir] = useState("desc");
  const [selectedReport, setSelectedReport] = useState(null);
const [showReportModal, setShowReportModal] = useState(false);
const [reportLoading, setReportLoading] = useState(false);

  // 🔹 Fetch candidates
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) { console.error("No token found"); return; }

        const res = await axios.get("http://127.0.0.1:7000/hr/candidates",
           {

          headers: { Authorization: `Bearer ${token}` },
        });

        setCandidates(res.data);
        setLoading(false);
      } catch (err) {
        console.error("ERROR:", err.response?.data || err.message);
        setLoading(false);
      }
    };
    fetchCandidates();
  }, []);

  // 🔹 Update status
  const updateStatus = async (reportId, candidateId, status) => {
  try {
    const token = localStorage.getItem("token");

    await axios.patch(
      "http://127.0.0.1:7000/hr/update-status",
      {
        report_id: reportId,
        candidate_id: candidateId,
        status,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setCandidates((prev) =>
      prev.map((c) =>
        c.id === reportId
          ? { ...c, status }
          : c
      )
    );
  } catch (err) {
    console.error("Update failed:", err);
  }
};

const openReport = async (reportId) => {

    try {

        const token = localStorage.getItem("token");

        setReportLoading(true);

        setShowReportModal(true);

        const res = await axios.get(

            `http://127.0.0.1:7000/hr/report/${reportId}`,

            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }

        );

        setSelectedReport(res.data);

    }

    catch (err) {

        console.log("Report ID:", reportId);

console.log("Backend Error:", err.response);

console.log("Backend Data:", err.response?.data);

console.log("Backend Message:", err.response?.data?.detail);

console.error(err);

        setShowReportModal(false);

    }

    finally {

        setReportLoading(false);

    }

};

const closeReport = () => {

    setShowReportModal(false);

    setSelectedReport(null);

};
  // 🔹 Sorting
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir("asc");
    }
  };

  const sorted = [...candidates].sort((a, b) => {
    const av = a[sortField] ?? "";
    const bv = b[sortField] ?? "";
    const cmp = typeof av === "number" ? av - bv : String(av).localeCompare(String(bv));
    return sortDir === "asc" ? cmp : -cmp;
  });

  // 🔹 Stats
  const selectedCount = candidates.filter((c) => c.status === "selected").length;
  const rejectedCount = candidates.filter((c) => c.status === "rejected").length;
  const pendingCount  = candidates.filter((c) => c.status === "pending").length;

  const SortIcon = ({ field }) => {
    if (sortField !== field) return <ChevronsUpDown className="h-3.5 w-3.5 text-slate-500" />;
    return sortDir === "asc"
      ? <ChevronUp className="h-3.5 w-3.5 text-indigo-400" />
      : <ChevronDown className="h-3.5 w-3.5 text-indigo-400" />;
  };

  

  const thClass =
    "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400 cursor-pointer select-none hover:text-slate-200 transition-colors";

  return (
    <div className="mx-auto max-w-7xl space-y-6">

      {/* Header */}
      <div>
        <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-300">
          <Sparkles className="h-3.5 w-3.5" />
          HR Dashboard
        </div>
        <h1 className="text-2xl font-bold text-white">Candidates</h1>
        <p className="mt-1 text-sm text-slate-400">
          Review candidates and take action instantly.
        </p>
      </div>

      {/* Stats Bar */}
      <div className="flex flex-wrap gap-4">
        {[
          { label: "Total",    value: candidates.length, color: "text-slate-300" },
          { label: "Selected", value: selectedCount,      color: "text-green-400" },
          { label: "Rejected", value: rejectedCount,      color: "text-red-400"   },
          { label: "Pending",  value: pendingCount,       color: "text-amber-400" },
        ].map(({ label, value, color }) => (
          <div
            key={label}
            className="rounded-xl border border-slate-700 bg-slate-800/60 px-4 py-2 text-sm"
          >
            <span className="text-slate-400">{label}: </span>
            <span className={`font-semibold ${color}`}>{value}</span>
          </div>
        ))}
      </div>

      {/* Table */}
      {loading ? (
        <div className="rounded-2xl border border-slate-700 bg-slate-900 p-4 space-y-3">
          {[1, 2, 3, 4, 5].map((r) => <TableRowSkeleton key={r} cols={6} />)}
        </div>
      ) : candidates.length === 0 ? (
        <EmptyState
          title="No candidates found"
          description="Once candidates apply, they will appear here."
        />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-sm">

              {/* Head */}
              <thead>
                <tr className="border-b border-slate-700 bg-slate-800/70">
                  <th className={thClass} onClick={() => handleSort("name")}>
                    <span className="flex items-center gap-1">
                      Candidate <SortIcon field="name" />
                    </span>
                  </th>
                  <th className={thClass} onClick={() => handleSort("jobTitle")}>
                    <span className="flex items-center gap-1">
                      Job Title <SortIcon field="jobTitle" />
                    </span>
                  </th>
                  <th className={thClass} onClick={() => handleSort("interviewScore")}>
                    <span className="flex items-center gap-1">
                      Interview Score <SortIcon field="interviewScore" />
                    </span>
                  </th>
                  <th className={thClass} onClick={() => handleSort("violations")}>
                    <span className="flex items-center gap-1">
                      Violations<SortIcon field="violations" />
                    </span>
                  </th>
                 
                  <th className={thClass} onClick={() => handleSort("status")}>
                    <span className="flex items-center gap-1">
                      Status <SortIcon field="status" />
                    </span>
                  </th>
                  <th className={thClass}>
                    <span className="flex items-center gap-1">
                      Report
                    </span>
                  </th>
                
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Actions
                  </th>
                </tr>
              </thead>

              {/* Body */}
              <tbody className="divide-y divide-slate-800">
                {sorted.map((c, i) => (
                  <tr
                    key={c.id}
                    className={`group transition-colors duration-150 hover:bg-slate-800/50
                      ${c.status === "selected" ? "border-l-2 border-l-green-500" : ""}
                      ${c.status === "rejected" ? "border-l-2 border-l-red-500"   : ""}
                    `}
                  >
                    {/* Candidate */}
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        {/* Avatar initial */}
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-600/30 text-xs font-bold text-indigo-300 ring-1 ring-indigo-500/40">
                          {(c.name !== "Unknown" ? c.name : "C").charAt(0).toUpperCase()}
                        </div>
                        <span className="font-medium text-white">
                          {c.name !== "Unknown" ? c.name : "Candidate"}
                        </span>
                      </div>
                    </td>

                    {/* Role */}
                    <td className="px-4 py-3.5 text-slate-400">{c.jobTitle}</td>

                    {/* Interview Score */}
                    <td className="px-4 py-3.5">
                      <ScoreBadge score={c.interviewScore} />
                    </td>

                    <td>
  {c.violations === 0 && (
    <span className="px-6 text-green-400 font-semibold">0</span>
  )}

  {c.violations > 0 && c.violations <= 2 && (
    <span className="px-6 text-yellow-400 font-semibold">
      {c.violations}
    </span>
  )}

  {c.violations > 2 && (
    <span className="px-6 text-red-400 font-semibold">
      {c.violations}
    </span>
  )}
</td>

                    

                    {/* Status */}
                    <td className="px-4 py-3.5">
                      <Badge variant={c.status} />
                    </td>

                    <td className="px-4 py-3">
                      <button
                        onClick={() => openReport(c.id)}
                        className="rounded-lg bg-violet-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-violet-500 active:scale-95"
                      >
                        View Report
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3.5">
                      <div className="flex gap-2">
                        <button
                          onClick={() => updateStatus(
        c.id,
        c.candidateId,
        "selected"
    )
}
                          disabled={c.status === "selected"}
                          className={`rounded-lg px-3 py-1.5 text-xs font-semibold text-white transition
                            ${c.status === "selected"
                              ? "cursor-not-allowed bg-green-900/50 text-green-600"
                              : "bg-green-600 hover:bg-green-500 active:scale-95"
                            }`}
                        >
                          Select
                        </button>
                        <button
                          onClick={() => updateStatus(
        c.id,
        c.candidateId,
        "rejected"
    )
}
                          disabled={c.status === "rejected"}
                          className={`rounded-lg px-3 py-1.5 text-xs font-semibold text-white transition
                            ${c.status === "rejected"
                              ? "cursor-not-allowed bg-red-900/50 text-red-600"
                              : "bg-red-600 hover:bg-red-500 active:scale-95"
                            }`}
                        >
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer row count */}
          <div className="border-t border-slate-700 bg-slate-800/40 px-4 py-2.5 text-xs text-slate-500">
            Showing {sorted.length} of {candidates.length} candidates
          </div>
        </div>
      )}

      {
    showReportModal && (

        <ReportModal

            report={selectedReport}

            loading={reportLoading}

            onClose={closeReport}

        />

    )
}
    </div>
  );
}