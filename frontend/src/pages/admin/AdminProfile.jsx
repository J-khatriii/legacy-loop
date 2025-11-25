import { useEffect, useState } from "react";
import { Mail, MapPin, Calendar, Users, FileText, Edit, Globe } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const AdminProfile = () => {
  const [admin, setAdmin] = useState(null);
  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("user"));
    if (localUser && localUser.role === "admin") {
      setAdmin(localUser);
    } else {
      setAdmin(null);
    }
  }, []);

  if (!admin) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50">
        <p className="text-gray-600 text-lg">Only admins can view this profile.</p>
      </div>
    );
  }

  // Dummy data for stats and activity
  const stats = {
    posts: 25,
    usersManaged: 120,
    messagesSent: 45,
    followers: 300,
  }

  const activityLogs = [
    { id: 1, action: "Sent system announcement", date: "2025-11-15" },
    { id: 2, action: "Added new alumni user", date: "2025-11-14" },
    { id: 3, action: "Edited user profile: John Doe", date: "2025-11-13" },
  ]

  const managedUsers = [
    { id: 1, name: "John Doe", role: "alumni", email: "john@example.com" },
    { id: 2, name: "Jane Smith", role: "faculty", email: "jane@example.com" },
  ]

  return (
    <div className="h-full relative overflow-y-scroll bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">

        {/* Banner */}
        <div className="h-40 md:h-48 bg-indigo-600 relative rounded-2xl shadow">
          <div className="absolute -bottom-12 left-6">
            <img
              src={admin.profilePic || `https://api.dicebear.com/8.x/avataaars/svg?seed=${admin.name}`}
              alt={admin.name}
              className="w-28 h-28 rounded-full border-4 border-white shadow-lg bg-black"
            />
          </div>
          <button className="absolute top-4 right-4 flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-xl shadow text-sm font-medium">
            <Edit size={16} /> Edit Profile
          </button>
        </div>

        {/* User Info */}
        <div className="mt-16 px-6">
          <h2 className="text-2xl font-semibold">{admin.name}</h2>
          <div className="flex flex-wrap gap-4 mt-2 text-gray-600">
            <span className="flex items-center gap-1">
              <Mail size={16} /> {admin.email}
            </span>
            <span className="flex items-center gap-1">
              <MapPin size={16} /> {admin.location || "N/A"}
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={16} /> Joined {new Date(admin.joinedAt).getFullYear()}
            </span>
          </div>

          {/* Followers, Posts, Social Links */}
          <div className="flex flex-wrap items-center gap-4 mt-4">
            <div className="flex items-center gap-2 text-gray-700 font-medium">
              <Users size={18} /> {stats.followers} Followers
            </div>
            <div className="flex items-center gap-2 text-gray-700 font-medium">
              <FileText size={18} /> {stats.posts} Posts
            </div>

            {/* Dummy social links */}
            <a
              href="https://github.com/dummyadmin"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-9 h-9 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-800 transition"
            >
              <FaGithub size={18} />
            </a>
            <a
              href="https://linkedin.com/in/dummyadmin"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-9 h-9 bg-blue-50 hover:bg-blue-100 rounded-full text-blue-700 transition"
            >
              <FaLinkedin size={18} />
            </a>
            <a
              href="https://dummyportfolio.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-9 h-9 bg-green-50 hover:bg-green-100 rounded-full text-green-700 transition"
            >
              <Globe size={18} />
            </a>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-6 px-6">
          <div className="bg-white rounded-xl shadow p-1 flex flex-wrap justify-center md:justify-around gap-2 md:gap-0">
            {["profile", "activity", "manage", "reports"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm font-medium rounded-lg capitalize whitespace-nowrap transition-colors ${
                  activeTab === tab
                    ? "bg-indigo-600 text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {tab === "profile"
                  ? "Profile Info"
                  : tab === "activity"
                  ? "Activity / Logs"
                  : tab === "manage"
                  ? "Manage Users"
                  : "Reports / Analytics"}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="mt-6 space-y-4">
            {activeTab === "profile" && (
              <div className="bg-white rounded-xl shadow p-6 space-y-4">
                <h2 className="text-lg font-semibold">Personal Information</h2>
                <p><strong>Name:</strong> {admin.name}</p>
                <p><strong>Email:</strong> {admin.email}</p>
                <p><strong>Role:</strong> {admin.role}</p>
                <p><strong>About:</strong> {admin.about || "No bio available."}</p>
              </div>
            )}

            {activeTab === "activity" && (
              <div className="bg-white rounded-xl shadow p-6 space-y-2">
                <h2 className="text-lg font-semibold">Recent Activity</h2>
                {activityLogs.map((log) => (
                  <div key={log.id} className="p-2 border-b last:border-b-0">
                    <p className="text-gray-800">{log.action}</p>
                    <p className="text-gray-500 text-sm">{log.date}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "manage" && (
              <div className="bg-white rounded-xl shadow p-6 space-y-2">
                <h2 className="text-lg font-semibold">Managed Users</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="px-4 py-2 border">Name</th>
                        <th className="px-4 py-2 border">Role</th>
                        <th className="px-4 py-2 border">Email</th>
                      </tr>
                    </thead>
                    <tbody>
                      {managedUsers.map((u) => (
                        <tr key={u.id} className="hover:bg-gray-50">
                          <td className="px-4 py-2 border">{u.name}</td>
                          <td className="px-4 py-2 border">{u.role}</td>
                          <td className="px-4 py-2 border">{u.email}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === "reports" && (
              <div className="bg-white rounded-xl shadow p-6 space-y-4">
                <h2 className="text-lg font-semibold">Reports / Analytics</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-xl border">
                    <p className="font-medium text-gray-700">Total Users Managed</p>
                    <p className="text-gray-900">{stats.usersManaged}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl border">
                    <p className="font-medium text-gray-700">Messages Sent</p>
                    <p className="text-gray-900">{stats.messagesSent}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl border">
                    <p className="font-medium text-gray-700">Posts</p>
                    <p className="text-gray-900">{stats.posts}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl border">
                    <p className="font-medium text-gray-700">Followers</p>
                    <p className="text-gray-900">{stats.followers}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}

export default AdminProfile;
