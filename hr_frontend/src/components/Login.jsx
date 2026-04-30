import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  localStorage.setItem("hrUser", JSON.stringify({
  name: formData.email.split("@")[0],
  email: formData.email
}));

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("http://127.0.0.1:7000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
        role: "HR", // since this is HR login
      }),
    });

    const data = await res.json();

if (res.ok) {
  localStorage.setItem("token", data.access_token);

  const userRes = await fetch(
    `http://127.0.0.1:7000/auth/me/${data.user.id}`
  );
  const userData = await userRes.json();

  // ✅ STORE HERE
  localStorage.setItem("hrUser", JSON.stringify({
    name: userData.name,
    email: userData.email
  }));

  localStorage.setItem("userProfile", JSON.stringify(userData));

  navigate("/home");
} else {
      alert(data.detail || "Login failed");
    }
  } catch (error) {
    console.error("Login error:", error);
    alert("Something went wrong");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#050d1a] to-[#0b1a2b]">
      
      <div className="w-full max-w-md p-8 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 shadow-2xl">
        
        <h2 className="text-2xl font-semibold text-white mb-6">
          HR Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          
          <input
            type="email"
            name="email"
            placeholder="Email Address"
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
            Login
          </button>
        </form>

        <p className="text-sm text-gray-400 mt-4 text-center">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-indigo-400 cursor-pointer hover:underline"
          >
            Signup
          </span>
        </p>

      </div>
    </div>
  );
}

export default Login;