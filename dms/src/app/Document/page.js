"use client";
import React, { useState, useEffect } from "react";

export default function DocumentUploadPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const userFromStorage = localStorage.getItem("user");
      if (userFromStorage) {
        const parsedUser = JSON.parse(userFromStorage);
        const userId =
          typeof parsedUser._id === "object"
            ? parsedUser._id.toString()
            : parsedUser._id || parsedUser.id;
        if (userId) {
          setUser({ ...parsedUser, _id: userId });
        } else {
          setMessage("⚠️ Invalid user data. Please login again.");
        }
      } else {
        setMessage("⚠️ User not authenticated. Please login.");
      }
    } catch (err) {
      setMessage("⚠️ Corrupted user data. Please login again.");
    }
  }, []);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      setMessage("⚠️ Please select a file to upload.");
      return;
    }

    if (!user || !user._id) {
      setMessage("⚠️ User not found. Please login again.");
      return;
    }

    setUploading(true);
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);  // <-- use "file" here to match backend
      formData.append("userId", user._id);

      const response = await fetch("/api/documents/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Upload failed");

      setMessage("✅ File uploaded successfully!");
      setSelectedFile(null);
    } catch (error) {
      setMessage(`❌ Error: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#141e30] to-[#243b55] flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-10 shadow-2xl">
        <h1 className="text-4xl font-bold text-white text-center mb-8 drop-shadow">
          📁 Upload Your Document
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <label
            htmlFor="file-upload"
            className="flex flex-col items-center justify-center border-2 border-dashed border-white/40 text-white bg-white/10 hover:bg-white/20 rounded-xl p-8 cursor-pointer transition-all duration-300"
          >
            <svg
              className="w-12 h-12 text-white mb-3 animate-bounce"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M16 12l-4-4m0 0l-4 4m4-4v12"
              />
            </svg>
            <span className="text-white font-medium">
              {selectedFile
                ? selectedFile.name
                : "Click or drag & drop a file to upload"}
            </span>
            <input
              id="file-upload"
              type="file"
              onChange={handleFileChange}
              className="hidden"
              accept=".pdf,.doc,.docx,.txt,.xlsx,.csv"
            />
          </label>

          {selectedFile && (
            <div className="text-sm text-white/80">
              <strong>📦 Size:</strong>{" "}
              {(selectedFile.size / 1024).toFixed(2)} KB
            </div>
          )}

          {message && (
            <p
              className={`text-sm font-medium ${
                message.includes("Error") ||
                message.includes("⚠️") ||
                message.includes("❌")
                  ? "text-red-400"
                  : "text-green-300"
              }`}
            >
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={uploading}
            className="w-full py-3 rounded-xl font-semibold text-lg bg-blue-600 text-white hover:bg-blue-700 transition duration-300 disabled:opacity-50 shadow-lg"
          >
            {uploading ? "Uploading..." : "Upload Document"}
          </button>
        </form>
      </div>
    </div>
  );
}
