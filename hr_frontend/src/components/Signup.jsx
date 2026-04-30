import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    password: "",
    role:"HR"
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  localStorage.setItem("hrUser", JSON.stringify(formData));
  
const handleSignup = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("http://127.0.0.1:8000/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        company: formData.company, // new field
      }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Signup Successful 🚀");

      // optional localStorage
      localStorage.setItem("hrUser", JSON.stringify(formData));
      localStorage.setItem("hrUser", JSON.stringify({
  name: formData.name,
  email: formData.email
}));

      navigate("/login");
    } else {
      alert(data.detail || "Signup failed");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Something went wrong");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#050d1a] to-[#0b1a2b]">
      
      <div className="w-full max-w-md p-8 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 shadow-2xl">
        
        <h2 className="text-2xl font-semibold text-white mb-6">
          HR Signup
        </h2>

        <form onSubmit={handleSignup} className="space-y-4">
          
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-[#0f1b2e] border border-[#1e2a40] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-[#0f1b2e] border border-[#1e2a40] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <input
            type="text"
            name="company"
            placeholder="Company Name"
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-[#0f1b2e] border border-[#1e2a40] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-[#0f1b2e] border border-[#1e2a40] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <button
            type="submit"
            className="w-full p-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold hover:scale-[1.02] transition"
          >
            Create Account
          </button>
        </form>

        <p className="text-sm text-gray-400 mt-4 text-center">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-indigo-400 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
}

export default Signup;