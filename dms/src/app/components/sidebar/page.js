"use client";

import { Home, UploadCloud, Folder, Settings, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // for active link detection
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    // Clear user data from local storage
    localStorage.removeItem("user");
    // Redirect to login page
    router.push("/Login");
  };

  // Sidebar links config
  const links = [
    { icon: <Home size={20} />, label: "Dashboard", href: "/dashboard" },
    { icon: <UploadCloud size={20} />, label: "Upload Document", href: "/Document" },
    { icon: <Folder size={20} />, label: "My Documents", href: "/docs" },
    { icon: <Settings size={20} />, label: "Settings", href: "/settings" },
  ];

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden transition-opacity ${
          mobileOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setMobileOpen(false)}
      ></div>

      <aside
        className={`
          fixed top-0 left-0 h-full w-64
          bg-white bg-opacity-90 backdrop-blur-md
          border-r border-gray-200
          shadow-md
          flex flex-col justify-between
          transform md:translate-x-0 transition-transform duration-300 ease-in-out
          z-40
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"} md:relative md:translate-x-0
        `}
      >
        {/* Brand / Logo */}
        <div className="p-8 text-3xl font-extrabold tracking-wide text-gray-900 select-none">
          DocuVault
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 flex flex-col gap-2 px-6 text-gray-700">
          {links.map(({ icon, label, href }) => (
            <SidebarLink
              key={href}
              icon={icon}
              label={label}
              href={href}
              active={pathname === href}
              onClick={() => setMobileOpen(false)}
            />
          ))}
        </nav>

        {/* Logout Button */}
        <div className="p-6 border-t border-gray-200">
      <button
        className="flex items-center gap-3 w-full px-4 py-3 rounded-lg bg-red-600 hover:bg-red-700 transition text-white font-semibold shadow-sm"
        onClick={handleLogout}
      >
        <LogOut size={20} />
        <span>Logout</span>
      </button>
    </div>
      </aside>

      {/* Mobile hamburger button */}
      <button
        className="fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-md md:hidden"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
      >
        <svg
          className="w-6 h-6 text-gray-800"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {mobileOpen ? (
            <path d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path d="M3 12h18M3 6h18M3 18h18" />
          )}
        </svg>
      </button>
    </>
  );
}

function SidebarLink({ icon, label, href, active, onClick }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`
        flex items-center gap-3 px-4 py-3 rounded-lg transition
        ${active
          ? "bg-blue-100 text-blue-700 font-semibold shadow-sm"
          : "hover:bg-gray-100 hover:text-blue-600 text-gray-600"
        }
      `}
    >
      <span className={`${active ? "text-blue-600" : "text-gray-400"}`}>
        {icon}
      </span>
      <span className="text-sm truncate">{label}</span>
    </Link>
  );
}
