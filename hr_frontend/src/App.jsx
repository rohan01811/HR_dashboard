import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import DashboardPage from "./pages/DashboardPage";
import JobsPage from "./pages/JobsPage";
import CandidatesPage from "./pages/CandidatesPage";
import CandidateDetailPage from "./pages/CandidateDetailPage";
import JobCreate from "./pages/JobCreate";
// import InterviewForm from "./pages/interviewForm";

import RankingsPage from "./pages/RankingsPage";
import Signup from "./components/Signup";
import Login from "./components/Login";

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/candidates" element={<CandidatesPage />} />
        <Route path="/candidates/:id" element={<CandidateDetailPage />} />
        <Route path="/jobcreate" element={<JobCreate />} />
        <Route path="/rankings" element={<RankingsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
          <Route path="/signup" element={<Signup />} />
          {/* <Route path="/interviewForm" element={<InterviewForm />} /> */}
  <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
}
