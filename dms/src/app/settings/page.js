"use client";

import { useState, useEffect } from "react";

export default function SettingsPage() {
  // States for form inputs
  const [profile, setProfile] = useState({
    fullName: "John Doe",
    email: "john.doe@example.com",
  });
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    pushNotifications: false,
  });
  const [twoFA, setTwoFA] = useState(false);
  const [theme, setTheme] = useState("light");

  // Sync theme state with actual html class
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  // Handlers
  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleNotificationToggle = (e) => {
    setNotifications({ ...notifications, [e.target.name]: e.target.checked });
  };

  const handleTwoFAToggle = () => setTwoFA(!twoFA);

  const handleThemeToggle = () => setTheme(theme === "light" ? "dark" : "light");

  const handleSaveProfile = (e) => {
    e.preventDefault();
    alert("Profile saved!");
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      alert("New passwords do not match!");
      return;
    }
    alert("Password changed!");
  };

  const handleDeleteAccount = () => {
    if (
      confirm(
        "Are you sure you want to delete your account? This action is irreversible."
      )
    ) {
      alert("Account deleted (simulate).");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-3xl shadow-lg border border-gray-300 dark:border-gray-700">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-100">
        Settings
      </h1>

      {/* Profile Section */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">
          Profile
        </h2>
        <form onSubmit={handleSaveProfile} className="space-y-4 max-w-md">
          <div>
            <label
              className="block mb-1 font-medium text-gray-600 dark:text-gray-400"
              htmlFor="fullName"
            >
              Full Name
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              value={profile.fullName}
              onChange={handleProfileChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label
              className="block mb-1 font-medium text-gray-600 dark:text-gray-400"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={profile.email}
              onChange={handleProfileChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <button
            type="submit"
            className="mt-3 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
          >
            Save Profile
          </button>
        </form>
      </section>

      {/* Password Section */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">
          Change Password
        </h2>
        <form onSubmit={handleChangePassword} className="space-y-4 max-w-md">
          <div>
            <label
              className="block mb-1 font-medium text-gray-600 dark:text-gray-400"
              htmlFor="currentPassword"
            >
              Current Password
            </label>
            <input
              id="currentPassword"
              name="current"
              type="password"
              value={passwords.current}
              onChange={handlePasswordChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label
              className="block mb-1 font-medium text-gray-600 dark:text-gray-400"
              htmlFor="newPassword"
            >
              New Password
            </label>
            <input
              id="newPassword"
              name="new"
              type="password"
              value={passwords.new}
              onChange={handlePasswordChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label
              className="block mb-1 font-medium text-gray-600 dark:text-gray-400"
              htmlFor="confirmPassword"
            >
              Confirm New Password
            </label>
            <input
              id="confirmPassword"
              name="confirm"
              type="password"
              value={passwords.confirm}
              onChange={handlePasswordChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <button
            type="submit"
            className="mt-3 px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition"
          >
            Change Password
          </button>
        </form>
      </section>

      {/* Notifications Section */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">
          Notifications
        </h2>
        <div className="max-w-md space-y-4">
          <label className="flex items-center gap-3 cursor-pointer text-gray-900 dark:text-gray-100">
            <input
              type="checkbox"
              name="emailAlerts"
              checked={notifications.emailAlerts}
              onChange={handleNotificationToggle}
              className="w-5 h-5"
            />
            <span>Email alerts for important updates</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer text-gray-900 dark:text-gray-100">
            <input
              type="checkbox"
              name="pushNotifications"
              checked={notifications.pushNotifications}
              onChange={handleNotificationToggle}
              className="w-5 h-5"
            />
            <span>Push notifications on new document uploads</span>
          </label>
        </div>
      </section>

      {/* Security Section */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">
          Privacy & Security
        </h2>
        <div className="max-w-md space-y-4 text-gray-900 dark:text-gray-100">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={twoFA}
              onChange={handleTwoFAToggle}
              className="w-5 h-5"
            />
            <span>Enable Two-Factor Authentication (2FA)</span>
          </label>
          <button
            onClick={() => alert("Manage active sessions modal (not implemented)")}
            className="px-5 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            Manage Active Sessions
          </button>
        </div>
      </section>

      {/* Appearance Section */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">
          Appearance
        </h2>
        <div className="max-w-md">
          <button
            onClick={handleThemeToggle}
            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition"
          >
            Switch to {theme === "light" ? "Dark" : "Light"} Mode
          </button>
        </div>
      </section>

      {/* Account Section */}
      <section>
        <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">
          Account
        </h2>
        <button
          onClick={handleDeleteAccount}
          className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition"
        >
          Delete My Account
        </button>
      </section>
    </div>
  );
}
