"use client";
import { useEffect, useState } from "react";
import { Eye, Download, Trash2 } from "lucide-react";

export default function DashboardContent() {
  const [user, setUser] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

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
          const completeUser = { ...parsedUser, _id: userId };
          setUser(completeUser);
          fetchDocuments(userId);
        } else {
          console.warn("⚠️ User ID missing:", parsedUser);
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    } catch (err) {
      console.error("⚠️ Error parsing user:", err);
      setLoading(false);
    }
  }, []);

  async function fetchDocuments(userId) {
    try {
      const res = await fetch(`/api/documents?userId=${userId}`);
      const data = await res.json();
      if (res.ok) {
        setDocuments(data.documents);
      } else {
        console.error("Failed to fetch documents:", data.error);
      }
    } catch (error) {
      console.error("Error fetching documents:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(documentId) {
    const confirmed = confirm("Are you sure you want to delete this document?");
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/documents/${documentId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        setDocuments((prev) => prev.filter((doc) => doc._id !== documentId));
      } else {
        alert("Failed to delete document: " + data.error);
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  }

  function handleNewUpload(newDoc) {
    setDocuments((prev) =>
      [newDoc, ...prev].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    );
  }

  function formatDate(date) {
    return new Date(date).toLocaleString();
  }

  function formatSize(size) {
    return size >= 1024
      ? `${(size / 1024).toFixed(2)} KB`
      : `${size} B`;
  }

  return (
    <div className="space-y-10 max-w-7xl mx-auto">
      {/* Welcome Card */}
      <section className="bg-white rounded-xl shadow-md p-8 border border-gray-200 backdrop-blur-sm bg-opacity-80">
        <h1 className="text-4xl font-semibold text-gray-900">
          Welcome back, <span className="text-blue-700">{user?.fullName || "User"}</span> 👋
        </h1>
        <p className="mt-2 text-gray-600">Here’s what’s happening with your documents today.</p>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Total Documents" value={documents.length} />
      </section>

      {/* Documents Table */}
      <section className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
        <h2 className="text-xl font-semibold text-gray-900 px-6 py-4 border-b">Recent Documents</h2>

        {loading ? (
          <p className="px-6 py-6 text-gray-500">Loading documents...</p>
        ) : documents.length === 0 ? (
          <p className="px-6 py-6 text-gray-500">No documents uploaded yet.</p>
        ) : (
          <table className="w-full text-sm text-gray-700">
            <thead className="bg-gray-100 text-xs uppercase text-gray-600">
              <tr>
                <th className="px-6 py-3 text-left">File Name</th>
                <th className="px-6 py-3 text-left">Type</th>
                <th className="px-6 py-3 text-left">Uploaded On</th>
                <th className="px-6 py-3 text-left">Size</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc) => (
                <tr
                  key={doc._id}
                  className="hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4 max-w-xs truncate">{doc.fileName}</td>
                  <td className="px-6 py-4">{doc.fileType || "-"}</td>
                  <td className="px-6 py-4">{formatDate(doc.createdAt)}</td>
                  <td className="px-6 py-4">{formatSize(doc.size)}</td>
                  <td className="px-6 py-4 space-x-4 whitespace-nowrap">
                    {doc.fileUrl ? (
                      <>
                        <a
                          href={doc.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-700 hover:underline inline-flex items-center"
                        >
                          <Eye className="w-4 h-4 mr-1" /> View
                        </a>
                        <a
                          href={doc.fileUrl}
                          download
                          className="text-green-700 hover:underline inline-flex items-center"
                        >
                          <Download className="w-4 h-4 mr-1" /> Download
                        </a>
                      </>
                    ) : (
                      <span className="text-gray-400">No file</span>
                    )}
                    <button
                      onClick={() => handleDelete(doc._id)}
                      className="text-red-600 hover:underline inline-flex items-center"
                      aria-label={`Delete ${doc.fileName}`}
                    >
                      <Trash2 className="w-4 h-4 mr-1" /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition duration-300">
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
    </div>
  );
}
