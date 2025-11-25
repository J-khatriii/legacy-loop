import { Edit } from "lucide-react";
import { useState } from "react";

const ProfileTabs = () => {
  const [activeTab, setActiveTab] = useState("posts");

  const tabs = [
    { id: "posts", label: "Posts" },
    { id: "work", label: "Work Experience" },
    { id: "details", label: "Alumni Details" },
  ]

  return (
    <div className="max-w-4xl mx-auto mt-8 px-4">
      <div className="bg-white rounded-xl shadow p-1 flex justify-around md:max-w-md mx-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 px-4 py-2 text-sm font-medium rounded-lg capitalize transition-colors ${
              activeTab === tab.id
                ? "bg-indigo-600 text-white"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB CONTENT */}
      <div className="mt-6">
        {/* POSTS */}
        {activeTab === "posts" && (
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold mb-3 text-gray-800">Posts</h2>
            <p className="text-gray-600 text-sm">
              This alumni hasn't posted anything yet.
            </p>
          </div>
        )}

        {/* WORK EXPERIENCE */}
        {activeTab === "work" && (
          <div className="bg-white rounded-xl shadow p-6 space-y-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold mb-2 text-gray-800">
              Work Experience
            </h2>

            <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 transition p-2 px-4 rounded-xl shadow text-sm font-medium">
              <Edit size={18} />
              Edit Experience
            </button>
            </div>
            

            <div className="p-4 border rounded-xl bg-gray-50">
              <h3 className="font-medium text-gray-900">Google — SDE</h3>
              <p className="text-sm text-gray-500">2022 – Present</p>
              <p className="text-gray-700 mt-2 text-sm">
                Working on large-scale distributed backend systems.
              </p>
            </div>

            <div className="p-4 border rounded-xl bg-gray-50">
              <h3 className="font-medium text-gray-900">Amazon — Intern</h3>
              <p className="text-sm text-gray-500">2021 – 2022</p>
              <p className="text-gray-700 mt-2 text-sm">
                Assisted in building API layers and automation tooling.
              </p>
            </div>
          </div>
        )}

        {/* ALUMNI DETAILS */}
        {activeTab === "details" && (
          <div className="bg-white rounded-xl shadow p-6 space-y-4">
            <h2 className="text-lg font-semibold mb-2 text-gray-800">
              Alumni Details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-xl border">
                <p className="text-gray-500 text-sm">Department</p>
                <p className="font-medium text-gray-900">Computer Science</p>
              </div>

              <div className="p-4 bg-gray-50 rounded-xl border">
                <p className="text-gray-500 text-sm">Roll No</p>
                <p className="font-medium text-gray-900">CS19045</p>
              </div>

              <div className="p-4 bg-gray-50 rounded-xl border">
                <p className="text-gray-500 text-sm">Email</p>
                <p className="font-medium text-gray-900">
                  john@jietjodhpur.ac.in
                </p>
              </div>

              <div className="p-4 bg-gray-50 rounded-xl border">
                <p className="text-gray-500 text-sm">Batch</p>
                <p className="font-medium text-gray-900">2019–2023</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProfileTabs;
