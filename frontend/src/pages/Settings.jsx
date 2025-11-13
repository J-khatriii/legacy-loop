import { useState } from "react";
import { Save, User, Lock, Bell, Palette } from "lucide-react";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
    password: "",
    newPassword: "",
    notifications: true,
    theme: "light",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSave = () => {
    console.log("Settings saved:", formData);
    // TODO: integrate with backend API
  };

  const tabs = [
    { id: "profile", icon: <User className="w-5 h-5" />, label: "Profile" },
    { id: "security", icon: <Lock className="w-5 h-5" />, label: "Security" },
    { id: "notifications", icon: <Bell className="w-5 h-5" />, label: "Notifications" },
    { id: "appearance", icon: <Palette className="w-5 h-5" />, label: "Appearance" },
  ];

  return (
    <div className="min-h-screen w-full bg-gray-50 flex justify-center py-10 px-4">
      <div className="max-w-5xl w-full bg-white shadow-md rounded-2xl flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-1/4  bg-linear-to-b from-indigo-50 to-purple-50 p-6">
          <h2 className="text-xl font-semibold mb-6 text-gray-800">Settings</h2>
          <ul className="space-y-3">
            {tabs.map((tab) => (
              <li
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition ${
                  activeTab === tab.id
                    ? "bg-linear-to-r from-indigo-500 to-purple-600 text-white shadow-sm"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {tab.icon}
                <span className="text-sm font-medium">{tab.label}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-8">
          {activeTab === "profile" && (
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-800">
                Edit Profile
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="border border-gray-300 rounded-md px-4 py-2 w-full focus:ring-2 focus:ring-indigo-500 outline-none"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className="border border-gray-300 rounded-md px-4 py-2 w-full focus:ring-2 focus:ring-indigo-500 outline-none"
                />
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder="Your Bio"
                  className="border border-gray-300 rounded-md px-4 py-2 w-full col-span-2 h-24 resize-none focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-800">
                Security Settings
              </h3>
              <div className="space-y-4">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Current Password"
                  className="border border-gray-300 rounded-md px-4 py-2 w-full focus:ring-2 focus:ring-indigo-500 outline-none"
                />
                <input
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  placeholder="New Password"
                  className="border border-gray-300 rounded-md px-4 py-2 w-full focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-800">
                Notification Preferences
              </h3>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="notifications"
                  checked={formData.notifications}
                  onChange={handleChange}
                  className="w-5 h-5 accent-indigo-600"
                />
                <span className="text-gray-700">Enable Email Notifications</span>
              </div>
            </div>
          )}

          {activeTab === "appearance" && (
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-800">
                Theme Preferences
              </h3>
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="theme"
                    value="light"
                    checked={formData.theme === "light"}
                    onChange={handleChange}
                    className="accent-indigo-600"
                  />
                  <span>Light</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="theme"
                    value="dark"
                    checked={formData.theme === "dark"}
                    onChange={handleChange}
                    className="accent-indigo-600"
                  />
                  <span>Dark</span>
                </label>
              </div>
            </div>
          )}

          <div className="mt-8 flex justify-end">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 bg-linear-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-6 py-2 rounded-md shadow transition active:scale-95"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
