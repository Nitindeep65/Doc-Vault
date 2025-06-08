"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
    setSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Hardcoded backend URL for production
    const apiUrl = "https://doc-vault-nine.vercel.app"; 

    try {
      const response = await fetch(`${apiUrl}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      let data;
      try {
        data = await response.json();
      } catch (jsonErr) {
        const text = await response.text();
        throw new Error(`Invalid server response: ${text}`);
      }

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      // Save user to localStorage
      localStorage.setItem("user", JSON.stringify(data.user));

      setSuccess(true);
      setError("");

      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
    } catch (err) {
      console.error("Login error:", err.message);
      setError(err.message || "An unexpected error occurred");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] px-4">
      <div className="w-full max-w-md bg-white/10 border border-white/20 backdrop-blur-md shadow-2xl rounded-3xl p-8">
        <h2 className="text-4xl font-extrabold text-center text-white mb-6 drop-shadow">
          🔐 Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <p className="text-red-400 text-sm text-center font-medium">
              {error}
            </p>
          )}
          {success && (
            <p className="text-green-400 text-sm text-center font-medium">
              Login successful! Redirecting...
            </p>
          )}

          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-white/20 text-white placeholder-gray-300 border border-white/30 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none transition-all duration-300"
              placeholder="you@example.com"
              autoComplete="email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full bg-white/20 text-white placeholder-gray-300 border border-white/30 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none transition-all duration-300"
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-all duration-300 shadow-lg"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-white/80">
          Don’t have an account?{" "}
          <a
            href="/SignUp"
            className="text-blue-400 hover:underline font-semibold"
          >
            Sign up here
          </a>
        </p>
      </div>
    </div>
  );
}
