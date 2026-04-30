import { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";
import axios from "axios";
import Badge from "../components/Badge";
import ScoreBadge from "../components/ScoreBadge";
import EmptyState from "../components/EmptyState";
import { TableRowSkeleton } from "../components/Skeleton";

export default function CandidatesPage() {
  const [loading, setLoading] = useState(true);
  const [candidates, setCandidates] = useState([]);

  // 🔹 Fetch candidates
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.error("No token found");
          return;
        }

        const res = await axios.get(
          "http://127.0.0.1:7000/hr/candidates",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

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
  const updateStatus = async (candidateId, status) => {
    try {
      const token = localStorage.getItem("token");

      await axios.patch(
        "http://127.0.0.1:7000/hr/update-status",
        {
          candidate_id: candidateId,
          status: status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update UI instantly
      setCandidates((prev) =>
        prev.map((c) =>
          c.id === candidateId ? { ...c, status: status } : c
        )
      );
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  // 🔹 Stats
  const selectedCount = candidates.filter(c => c.status === "selected").length;
  const rejectedCount = candidates.filter(c => c.status === "rejected").length;

  return (
    <div className="mx-auto max-w-7xl space-y-6">

      {/* 🔥 Header */}
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

      {/* 📊 Stats Bar */}
      <div className="flex gap-6 text-sm text-slate-400">
        <span>Total: {candidates.length}</span>
        <span className="text-green-400">Selected: {selectedCount}</span>
        <span className="text-red-400">Rejected: {rejectedCount}</span>
      </div>

      {/* 🔄 Loading */}
      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((r) => (
            <div
              key={r}
              className="rounded-2xl border border-slate-700 bg-slate-900 p-4"
            >
              <TableRowSkeleton cols={1} />
            </div>
          ))}
        </div>
      ) : candidates.length === 0 ? (
        <EmptyState
          title="No candidates found"
          description="Once candidates apply, they will appear here."
        />
      ) : (

        /* 💎 Card Layout */
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {candidates.map((c) => (
            <div
              key={c.id}
              className={`rounded-2xl border p-4 shadow-md transition-all duration-300
                ${c.status === "selected" ? "border-green-500 bg-slate-900" : ""}
                ${c.status === "rejected" ? "border-red-500 bg-slate-900" : "border-slate-700 bg-slate-900"}
              `}
            >
              {/* Top */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-white">
                    {c.name !== "Unknown" ? c.name : "Candidate"}
                  </h2>
                  <p className="text-xs text-slate-400">{c.role}</p>
                </div>

                <ScoreBadge score={c.atsScore} />
              </div>

              {/* Summary */}
              <p className="mt-3 text-sm text-slate-300 line-clamp-3">
                {c.summary}
              </p>

              {/* Status */}
              <div className="mt-3">
                <Badge variant={c.status} />
              </div>

              {/* Actions */}
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => updateStatus(c.id, "selected")}
                  disabled={c.status === "selected"}
                  className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium text-white transition
                    ${
                      c.status === "selected"
                        ? "bg-green-800 cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-500"
                    }`}
                >
                  Select
                </button>

                <button
                  onClick={() => updateStatus(c.id, "rejected")}
                  disabled={c.status === "rejected"}
                  className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium text-white transition
                    ${
                      c.status === "rejected"
                        ? "bg-red-800 cursor-not-allowed"
                        : "bg-red-600 hover:bg-red-500"
                    }`}
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

