import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function JobCreate() {
  const navigate = useNavigate();

const [formData, setFormData] = useState({
  company: "",
  title: "",
  role: "",
  description: "",
  jobType: "",
  experience: "",
  interviewType: "",
  skills: ""
});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch("http://localhost:7000/hr/create-job", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${localStorage.getItem("token")}`
  },
  
body: JSON.stringify({
  company: formData.company,
  title: formData.title,
  role: formData.role,
  description: formData.description,
  experience: Number(formData.experience), // ✅ FIX
  job_type: formData.jobType,
  interview_type: formData.interviewType,
  skills: formData.skills
  ? formData.skills
      .split(",")
      .map(s => s.trim())
      .filter(s => s !== "")   // 🔥 IMPORTANT
  : []
})
});

      const data = await res.json();


if (!res.ok) {
  const data = await res.json();

  if (data.detail.includes("expired")) {
    alert("Session expired. Please login again 🔐");

    localStorage.removeItem("token");
    navigate("/login");
    return;
  }

  alert(data.detail || "Error creating job");
  return;
}

navigate("/hr/dashboard");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 to-slate-900 text-white px-4 py-10">
      
      {/* HEADER */}
      <div className="max-w-5xl mx-auto mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-wide">
          AI Powered Job Creation System 🚀
        </h1>
        <p className="text-slate-400 mt-2">
          Configure your job and start practicing with AI
        </p>
      </div>

      {/* FORM CARD */}
      <div className="max-w-5xl mx-auto bg-slate-900/60 border border-slate-700 rounded-2xl p-6 sm:p-8 backdrop-blur-lg shadow-xl">
        
        <div className="grid md:grid-cols-2 gap-6">

          {/* LEFT SIDE */}
          <div className="space-y-5">

            <div>
              <label className="text-sm text-slate-400">Company</label>
              <input
                type="text"
                name="company"
                onChange={handleChange}
                className="w-full mt-1 p-3 rounded-lg bg-slate-950 border border-slate-700 focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="text-sm text-slate-400">Job Title</label>
              <input
                type="text"
                name="title"
                onChange={handleChange}
                className="w-full mt-1 p-3 rounded-lg bg-slate-950 border border-slate-700 focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="text-sm text-slate-400">Select Role</label>
              <select
                name="role"
                onChange={handleChange}
                className="w-full mt-1 p-3 rounded-lg bg-slate-950 border border-slate-700 focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select Role</option>
                <option value="AIML">AIML</option>
                <option value="WebDevelopment">Web Development</option>
                <option value="DataScience">Data Science</option>
                <option value="CloudComputing">Cloud Computing</option>
                <option value="CyberSecurity">Cyber Security</option>
                <option value="Blockchain">Blockchain</option>
                <option value="DevOps">DevOps</option>
                <option value="UIUXDesign">UI/UX Design</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-slate-400">
                Job Description
              </label>
              <textarea
                name="description"
                onChange={handleChange}
                rows={5}
                placeholder="Enter job description..."
                className="w-full mt-1 p-3 rounded-lg bg-slate-950 border border-slate-700 focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-5">

            <div>
              <label className="text-sm text-slate-400">
                Job Type
              </label>
              <select
                name="jobType"
                onChange={handleChange}
                className="w-full mt-1 p-3 rounded-lg bg-slate-950 border border-slate-700 focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select Job Type</option>
                <option value="intern">Intern</option>
                <option value="full_time">Full Time</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-slate-400">Skills</label>
              <input
                type="text"
                name="skills"
                onChange={handleChange}
                className="w-full mt-1 p-3 rounded-lg bg-slate-950 border border-slate-700 focus:ring-2 focus:ring-indigo-500"
                placeholder="Frontend,Backend,AI,etc."
              />
            </div>

            <div>
              <label className="text-sm text-slate-400">
                Experience (Years)
              </label>
              <input
                type="number"
                name="experience"
                onChange={handleChange}
                className="w-full mt-1 p-3 rounded-lg bg-slate-950 border border-slate-700 focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="text-sm text-slate-400">
                Interview Type
              </label>
              <select
                name="interviewType"
                onChange={handleChange}
                className="w-full mt-1 p-3 rounded-lg bg-slate-950 border border-slate-700 focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select Type</option>
                <option value="technical">Technical</option>
                <option value="hr_level">HR Level</option>
              </select>
            </div>

          </div>
        </div>

        {/* BUTTON */}
        <div className="flex justify-center mt-10">
          <button
            onClick={handleSubmit}
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:scale-105 transition text-white font-semibold shadow-lg"
          >
            Create Job
          </button>
        </div>
      </div>
    </div>
  );
}