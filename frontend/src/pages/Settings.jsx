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
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = () => {
    console.log("Settings Saved:", formData);
    // TODO: integrate with backend
  };

  const tabs = [
    { id: "profile", icon: <User className="w-5 h-5" />, label: "Profile" },
    { id: "security", icon: <Lock className="w-5 h-5" />, label: "Security" },
    { id: "notifications", icon: <Bell className="w-5 h-5" />, label: "Notifications" },
    { id: "appearance", icon: <Palette className="w-5 h-5" />, label: "Appearance" },
  ];

  return (
    <div className="h-screen flex bg-gray-50">

      {/* SIDEBAR */}
      <div className="w-64 bg-white shadow-md border-r p-6 flex flex-col">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Settings</h2>

        <ul className="space-y-2 flex-1 overflow-y-auto no-scrollbar">
          {tabs.map((tab) => (
            <li
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-all
                ${
                  activeTab === tab.id
                    ? "bg-indigo-600 text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
            >
              {tab.icon}
              <span className="text-sm font-medium">{tab.label}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 overflow-y-auto p-10">

        {activeTab === "profile" && (
          <div>
            <h3 className="text-lg font-semibold mb-6 text-gray-800">Edit Profile</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
              />

              <textarea
                name="bio"
                placeholder="Your Bio"
                value={formData.bio}
                onChange={handleChange}
                className="col-span-2 border border-gray-300 rounded-md px-4 py-2 h-28 resize-none focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
          </div>
        )}

        {activeTab === "security" && (
          <div>
            <h3 className="text-lg font-semibold mb-6 text-gray-800">Security Settings</h3>

            <div className="space-y-5">
              <input
                type="password"
                name="password"
                placeholder="Current Password"
                value={formData.password}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-4 py-2 w-full focus:ring-2 focus:ring-indigo-500 outline-none"
              />

              <input
                type="password"
                name="newPassword"
                placeholder="New Password"
                value={formData.newPassword}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-4 py-2 w-full focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
          </div>
        )}

        {activeTab === "notifications" && (
          <div>
            <h3 className="text-lg font-semibold mb-6 text-gray-800">Notification Preferences</h3>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="notifications"
                checked={formData.notifications}
                onChange={handleChange}
                className="w-5 h-5 accent-indigo-600"
              />
              <span className="text-gray-700">Enable Email Notifications</span>
            </label>
          </div>
        )}

        {activeTab === "appearance" && (
          <div>
            <h3 className="text-lg font-semibold mb-6 text-gray-800">Theme Preferences</h3>

            <div className="flex gap-8">
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

        {/* SAVE BUTTON */}
        <div className="mt-10 flex justify-end">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 bg-black hover:bg-black/75 text-white px-6 py-2 rounded-md shadow transition active:scale-95"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
