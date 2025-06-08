"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
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

    // ✅ Use hardcoded URL for production deployment
    const apiUrl = "https://doc-vault-nine.vercel.app";

    try {
      const response = await fetch(`${apiUrl}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Signup failed");
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/Login");
      }, 1500);
    } catch (error) {
      console.error("Error signing up:", error.message);
      setError(error.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/10 border border-white/20 backdrop-blur-md shadow-2xl rounded-3xl p-8">
        <h2 className="text-4xl font-extrabold text-center text-white mb-6 drop-shadow">
          📝 Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <p className="text-red-400 text-sm text-center font-medium">
              {error}
            </p>
          )}
          {success && (
            <p className="text-green-400 text-sm text-center font-medium">
              Signup successful! Redirecting to login...
            </p>
          )}

          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full bg-white/20 text-white placeholder-gray-300 border border-white/30 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none transition-all duration-300"
              placeholder="John Doe"
            />
          </div>

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
              placeholder="john@example.com"
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
              autoComplete="new-password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-all duration-300 shadow-lg"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-white/80">
          Already have an account?{" "}
          <a
            href="/Login"
            className="text-blue-400 hover:underline font-semibold"
          >
            Login here
          </a>
        </p>
      </div>
    </div>
  );
}
