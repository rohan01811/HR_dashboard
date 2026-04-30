import { useMemo, useState,useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Plus, Search, Users2, Pencil, Eye, Ban } from "lucide-react";
import toast from "react-hot-toast";
import Card from "../components/Card";
import Badge from "../components/Badge";
import { Table, THead, TBody, TR, TH, TD } from "../components/Table";
import EmptyState from "../components/EmptyState";
import { jobs as initialJobs } from "../data/mockData";

export default function JobsPage() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
const [jobList, setJobList] = useState([]);


useEffect(() => {
  const fetchJobs = async () => {
    try {
      // ✅ FIRST declare token
      const token = localStorage.getItem("token");

      console.log("TOKEN:", token);

      // ✅ THEN use it
      if (!token) {
        console.error("No token found");
        return;
      }

      const res = await axios.get(
        "http://127.0.0.1:7000/hr/jobs-with-stats",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setJobList(res.data);

    } catch (err) {
      console.error("FULL ERROR:", err.response?.data || err.message);
    }
  };

  fetchJobs();
}, []);

  const filtered = useMemo(() => {
    return jobList.filter((j) => {
      const q = query.trim().toLowerCase();
      const matchesQ = !q || j.title.toLowerCase().includes(q);
      const matchesS = statusFilter === "all" || j.status === statusFilter;
      return matchesQ && matchesS;
    });
  }, [jobList, query, statusFilter]);

  const closeJob = (id) => {
    setJobList((prev) => prev.map((j) => (j.id === id ? { ...j, status: "closed" } : j)));
    toast.success("Job marked as closed (demo)");
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Job listings</h1>
          <p className="mt-1 text-sm text-slate-400">
            Manage requisitions, funnel counts, and quick actions.
          </p>
        </div>
        <button
          type="button"
          onClick={() => toast.success("Add job flow (demo) — would open a form.")}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white shadow-soft transition-all duration-300 hover:bg-indigo-400"
        >
          <Plus className="h-4 w-4" />
          Add job
        </button>
      </div>

      <Card className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by job title…"
            className="w-full rounded-2xl border border-slate-700 bg-slate-900 py-2.5 pl-10 pr-4 text-sm text-slate-100 placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/25"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-2xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm text-slate-100 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/25"
        >
          <option value="all">All statuses</option>
          <option value="active">Active</option>
          <option value="closed">Closed</option>
        </select>
      </Card>

      {filtered.length === 0 ? (
        <EmptyState
          title="No jobs match your filters"
          description="Try clearing search or switching status to see requisitions again."
          action={
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setStatusFilter("all");
              }}
              className="rounded-2xl border border-slate-600 px-4 py-2 text-sm text-slate-200 transition-all duration-300 hover:border-indigo-500/50 hover:text-white"
            >
              Reset filters
            </button>
          }
        />
      ) : (
        <Table>
          <THead>
            <TR>
              <TH>Job title</TH>
              <TH>Applicants</TH>
              <TH>Status</TH>
              <TH>Created</TH>
              <TH className="text-right">Actions</TH>
            </TR>
          </THead>
          <TBody>
            {filtered.map((j) => (
              <TR key={j.id}>
                <TD>
                  <span className="font-medium text-slate-100">{j.title}</span>
                </TD>
                <TD>
                  <span className="inline-flex items-center gap-1.5 text-slate-300">
                    <Users2 className="h-4 w-4 text-slate-500" />
                    {j.applicants}
                  </span>
                </TD>
                <TD>
                  <Badge variant={j.status === "active" ? "active" : "closed"} />
                </TD>
                <TD className="text-slate-400">{new Date(j.createdAt).toLocaleDateString()}</TD>
                <TD>
                  <div className="flex flex-wrap justify-end gap-2">
                    <Link
                      to="/candidates"
                      className="inline-flex items-center gap-1 rounded-xl border border-slate-700 bg-slate-900 px-2.5 py-1.5 text-xs font-medium text-slate-200 transition-all duration-300 hover:border-indigo-500/40 hover:text-white"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      Applicants
                    </Link>
                    <button
                      type="button"
                      onClick={() => toast("Edit job (demo)", { icon: "✏️" })}
                      className="inline-flex items-center gap-1 rounded-xl border border-slate-700 bg-slate-900 px-2.5 py-1.5 text-xs font-medium text-slate-200 transition-all duration-300 hover:border-indigo-500/40"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => j.status === "active" && closeJob(j.id)}
                      disabled={j.status === "closed"}
                      className="inline-flex items-center gap-1 rounded-xl border border-slate-700 bg-slate-900 px-2.5 py-1.5 text-xs font-medium text-slate-200 transition-all duration-300 hover:border-red-500/40 hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <Ban className="h-3.5 w-3.5" />
                      Close
                    </button>
                  </div>
                </TD>
              </TR>
            ))}
          </TBody>
        </Table>
      )}
    </div>
  );
}
