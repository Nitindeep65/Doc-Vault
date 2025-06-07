"use client";
import { useEffect, useState } from "react";
import { Eye, Download, Trash2 } from "lucide-react";

export default function UserDocumentsPage() {
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
    const confirmDelete = confirm("Are you sure you want to delete this document?");
    if (!confirmDelete) return;

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

  function formatDate(dateString) {
    return new Date(dateString).toLocaleString();
  }

  function formatSize(bytes) {
    return bytes >= 1024 ? `${(bytes / 1024).toFixed(2)} KB` : `${bytes} B`;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">
        📄 Your Documents
      </h1>

      {loading ? (
        <p className="text-gray-500">Loading documents...</p>
      ) : !user ? (
        <p className="text-red-500">⚠️ You must be logged in to view your documents.</p>
      ) : (
        <div className="bg-white/70 backdrop-blur rounded-xl border shadow-md overflow-hidden">
          <h2 className="text-xl font-semibold text-gray-800 px-6 py-4 border-b">Recent Documents</h2>
          <table className="w-full text-sm text-gray-700">
            <thead className="bg-gray-100 text-xs uppercase text-gray-600">
              <tr>
                <th className="px-6 py-3">File Name</th>
                <th className="px-6 py-3">Type</th>
                <th className="px-6 py-3">Uploaded On</th>
                <th className="px-6 py-3">Size</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {documents.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-6 text-gray-500">
                    No documents uploaded yet.
                  </td>
                </tr>
              ) : (
                documents.map((doc) => (
                  <tr key={doc._id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">{doc.fileName}</td>
                    <td className="px-6 py-4">{doc.fileType || "-"}</td>
                    <td className="px-6 py-4">{formatDate(doc.createdAt)}</td>
                    <td className="px-6 py-4">{formatSize(doc.size)}</td>
                    <td className="px-6 py-4 space-x-3">
                      {doc.fileUrl ? (
                        <>
                          <a
                            href={doc.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-blue-600 hover:underline"
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </a>
                          <a
                            href={doc.fileUrl}
                            download
                            className="inline-flex items-center text-green-600 hover:underline"
                          >
                            <Download className="w-4 h-4 mr-1" />
                            Download
                          </a>
                        </>
                      ) : (
                        <span className="text-gray-400">No file</span>
                      )}
                      <button
                        onClick={() => handleDelete(doc._id)}
                        className="inline-flex items-center text-red-600 hover:underline"
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
