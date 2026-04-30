export const statsOverview = {
  activeJobs: 24,
  totalApplicants: 1847,
  interviewsToday: 12,
  selectedCandidates: 38,
};

export const pipelineStages = [
  { id: "applied", label: "Applied", count: 612, pct: 100 },
  { id: "interview", label: "Interview", count: 214, pct: 35 },
  { id: "selected", label: "Selected", count: 38, pct: 6 },
];

export const topCandidates = [
  { id: "c1", name: "Aisha Rahman", score: 94, status: "selected" },
  { id: "c2", name: "Marcus Chen", score: 91, status: "interviewed" },
  { id: "c3", name: "Elena Voss", score: 89, status: "applied" },
  { id: "c4", name: "James Okonkwo", score: 87, status: "interviewed" },
  { id: "c5", name: "Priya Nair", score: 86, status: "applied" },
];

export const recentActivity = [
  {
    id: "a1",
    type: "application",
    title: "New application",
    detail: "Jordan Lee applied for Senior Product Designer",
    time: "12 min ago",
  },
  {
    id: "a2",
    type: "interview",
    title: "Interview scheduled",
    detail: "AI screening — Marcus Chen · 2:30 PM",
    time: "1 hr ago",
  },
  {
    id: "a3",
    type: "application",
    title: "Bulk import",
    detail: "47 resumes parsed from Greenhouse sync",
    time: "3 hr ago",
  },
  {
    id: "a4",
    type: "interview",
    title: "Interview completed",
    detail: "Human HR — Elena Voss · Strong culture fit signal",
    time: "Yesterday",
  },
];

export const jobs = [
  {
    id: "j1",
    title: "Staff Software Engineer — Platform",
    applicants: 128,
    status: "active",
    createdAt: "2026-03-12",
  },
  {
    id: "j2",
    title: "Product Designer (AI Tools)",
    applicants: 94,
    status: "active",
    createdAt: "2026-03-08",
  },
  {
    id: "j3",
    title: "People Operations Lead",
    applicants: 56,
    status: "closed",
    createdAt: "2026-02-20",
  },
  {
    id: "j4",
    title: "ML Research Engineer",
    applicants: 203,
    status: "active",
    createdAt: "2026-03-18",
  },
  {
    id: "j5",
    title: "Customer Success Manager",
    applicants: 41,
    status: "active",
    createdAt: "2026-03-01",
  },
];

const baseSkills = [
  "React",
  "System Design",
  "Python",
  "Leadership",
  "Figma",
  "Stakeholder Mgmt",
  "TensorFlow",
  "SQL",
];

export const candidates = [
  {
    id: "c1",
    name: "Aisha Rahman",
    atsScore: 94,
    summary:
      "Strong full-stack background with measurable impact on latency and reliability. Leadership examples align with staff-level bar.",
    status: "selected",
    skills: ["React", "System Design", "Leadership", "SQL"],
    experienceYears: 8,
    experienceSummary:
      "Led platform migrations serving 12M+ MAU; reduced P99 latency by 38% through caching and edge rollout.",
    aiReview: `## Fit summary\n**Recommendation:** advance to offer stage.\n\n- **Strengths:** architecture ownership, cross-org influence, crisp written communication.\n- **Gaps:** limited public speaking examples for exec-facing forums.\n\n> Model confidence: **high** based on resume + structured responses.`,
    role: "Staff Software Engineer — Platform",
  },
  {
    id: "c2",
    name: "Marcus Chen",
    atsScore: 91,
    summary:
      "Excellent systems thinking; shipped observability stack adopted org-wide. Minor gap on frontend depth.",
    status: "interviewed",
    skills: ["Python", "System Design", "SQL", "Leadership"],
    experienceYears: 7,
    experienceSummary:
      "Built distributed tracing and SLO dashboards; mentored 4 engineers; on-call lead for payments domain.",
    aiReview: `## Interview synthesis\n**Signals:** problem decomposition, trade-off clarity, calm under ambiguity.\n\nNext: **human HR** culture screen scheduled.`,
    role: "Staff Software Engineer — Platform",
  },
  {
    id: "c3",
    name: "Elena Voss",
    atsScore: 89,
    summary:
      "Design systems expert with research rigor. Portfolio demonstrates AI-adjacent product work.",
    status: "applied",
    skills: ["Figma", "Stakeholder Mgmt", "React"],
    experienceYears: 6,
    experienceSummary:
      "Scaled design system across 3 product lines; introduced accessibility audits into CI.",
    aiReview: `## ATS highlights\nToken overlap with role: **strong**. Portfolio artifacts: **high quality**.\n\nAwaiting async take-home review.`,
    role: "Product Designer (AI Tools)",
  },
  {
    id: "c4",
    name: "James Okonkwo",
    atsScore: 87,
    summary:
      "Solid backend fundamentals; needs deeper evidence of large-scale data pipelines.",
    status: "interviewed",
    skills: ["Python", "TensorFlow", "SQL"],
    experienceYears: 5,
    experienceSummary:
      "Shipped ranking models and feature stores; collaborated with research on offline evals.",
    aiReview: `## Mixed signals\nTechnical depth: **good**. Communication: **good**.\n\nConcern: limited ownership of model lifecycle in production.`,
    role: "ML Research Engineer",
  },
  {
    id: "c5",
    name: "Priya Nair",
    atsScore: 86,
    summary:
      "People programs and analytics blend; strong stakeholder narrative.",
    status: "applied",
    skills: ["Stakeholder Mgmt", "SQL", "Leadership"],
    experienceYears: 9,
    experienceSummary:
      "Built headcount planning models; partnered with finance on scenario tooling.",
    aiReview: `## Role match\nKeywords and outcomes align with **People Operations** leadership track.`,
    role: "People Operations Lead",
  },
  {
    id: "c6",
    name: "Noah Fischer",
    atsScore: 72,
    summary:
      "Adequate technical fit; limited evidence of scope matching senior bar.",
    status: "rejected",
    skills: ["React", "SQL"],
    experienceYears: 4,
    experienceSummary:
      "Feature development on internal tools; smaller team context.",
    aiReview: `## Decision support\nScore below threshold for this requisition. **Archive** with nurture tag for mid-level roles.`,
    role: "Staff Software Engineer — Platform",
  },
  {
    id: "c7",
    name: "Sofia Martins",
    atsScore: 81,
    summary:
      "Customer-facing excellence; metrics-driven; strong discovery habits.",
    status: "interviewed",
    skills: ["Stakeholder Mgmt", "SQL", "Leadership"],
    experienceYears: 7,
    experienceSummary:
      "Owned expansion revenue for enterprise segment; introduced health scoring for accounts.",
    aiReview: `## Next step\nSchedule **scenario interview** with sales partner.`,
    role: "Customer Success Manager",
  },
];

export const allSkills = [...new Set(baseSkills)];

export const interviews = [
  {
    id: "i1",
    candidateId: "c2",
    candidateName: "Marcus Chen",
    type: "ai",
    status: "in_progress",
    scheduledAt: "2026-03-29T14:30:00",
    live: true,
  },
  {
    id: "i2",
    candidateId: "c4",
    candidateName: "James Okonkwo",
    type: "human",
    status: "not_started",
    scheduledAt: "2026-03-29T16:00:00",
    live: false,
  },
  {
    id: "i3",
    candidateId: "c7",
    candidateName: "Sofia Martins",
    type: "human",
    status: "completed",
    scheduledAt: "2026-03-28T11:00:00",
    live: false,
  },
  {
    id: "i4",
    candidateId: "c1",
    candidateName: "Aisha Rahman",
    type: "ai",
    status: "completed",
    scheduledAt: "2026-03-27T10:00:00",
    live: false,
  },
];

export const rankings = candidates
  .map((c) => ({
    ...c,
    recommendation:
      c.atsScore >= 88 ? "hire" : c.atsScore >= 78 ? "maybe" : "reject",
  }))
  .sort((a, b) => b.atsScore - a.atsScore);

export function getCandidateById(id) {
  return candidates.find((c) => c.id === id);
}
