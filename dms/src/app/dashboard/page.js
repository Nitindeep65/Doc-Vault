import React from "react";
import Sidebar from "../components/sidebar/page";
import DashboardContent from "../components/content/page";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-800">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8 max-w-full bg-white shadow-sm rounded-l-xl">
        <DashboardContent />
      </main>
    </div>
  );
}
