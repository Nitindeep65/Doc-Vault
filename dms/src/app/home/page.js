"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] px-6 py-16 flex flex-col items-center justify-center">
      <div className="max-w-5xl w-full bg-white/10 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-white/20">
        <div className="text-center">
          <h1 className="text-6xl font-extrabold text-white tracking-tight mb-6 drop-shadow-lg">
            Welcome to <span className="text-blue-400">DocuVault</span>
          </h1>
          <p className="text-xl text-gray-200 mb-10 max-w-3xl mx-auto leading-relaxed">
            Your futuristic solution to store, manage, and access important documents securely from anywhere in the world. Fast. Smart. Encrypted.
          </p>

          <div className="flex justify-center gap-6 flex-wrap">
            <button
              onClick={() => router.push("/SignUp")}
              className="px-8 py-3 bg-blue-600 text-white rounded-full font-semibold text-lg shadow-lg hover:bg-blue-700 transition-all duration-300"
            >
              🚀 Get Started
            </button>
            <button
              onClick={() => router.push("/Login")}
              className="px-8 py-3 bg-white/10 border border-gray-200 text-white rounded-full font-semibold text-lg shadow-lg hover:bg-white/20 transition-all duration-300"
            >
              🔑 Login
            </button>
          </div>
        </div>

        <div className="mt-16 text-white">
          <h2 className="text-3xl font-bold mb-6">✨ Key Features</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg">
            <li className="flex items-start gap-3">
              <span className="text-2xl">📁</span>
              Upload and organize your documents effortlessly
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">🔍</span>
              Smart search &amp; instant access from any device
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">🛡️</span>
              End-to-end encryption with secure cloud backup
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">🌐</span>
              Accessible 24/7 with a sleek and modern UI
            </li>
          </ul>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 text-center text-gray-300 text-sm select-none">
        <p>
          Made with <span className="text-red-500">❤️</span> by{" "}
          <a
            href="https://www.linkedin.com/in/singhdeep1/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            Nitindeep singh
          </a>
        </p>
      </footer>
    </main>
  );
}
