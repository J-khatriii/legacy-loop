import { useEffect, useState } from "react";
import {
  User, Users, BookOpen, Megaphone
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, Legend
} from "recharts";

// Dummy data
const userStats = {
  totalUsers: 1200,
  students: 700,
  alumni: 300,
  teachers: 200,
};

const audienceData = [
  { name: "Students", value: 700 },
  { name: "Alumni", value: 300 },
  { name: "Teachers", value: 200 },
];

const COLORS = ["#60A5FA", "#34D399", "#A78BFA"];

const announcementsOverTime = [
  { month: "Jan", count: 5 },
  { month: "Feb", count: 8 },
  { month: "Mar", count: 12 },
  { month: "Apr", count: 6 },
  { month: "May", count: 10 },
  { month: "Jun", count: 14 },
];

const filterStats = [
  { name: "1st Year", value: 150 },
  { name: "2nd Year", value: 200 },
  { name: "3rd Year", value: 180 },
  { name: "4th Year", value: 170 },
];

const AdminStatistics = () => {
  const [users, setUsers] = useState(userStats);

  useEffect(() => {
    // fetch stats from backend
    // fetch('/api/stats').then(...).then(data => setUsers(data));
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Admin Reporting & Statistics</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-start gap-2">
          <Users size={28} className="text-blue-500" />
          <p className="text-gray-500 text-sm">Total Users</p>
          <h2 className="text-xl font-bold">{users.totalUsers}</h2>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-start gap-2">
          <User size={28} className="text-green-500" />
          <p className="text-gray-500 text-sm">Students</p>
          <h2 className="text-xl font-bold">{users.students}</h2>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-start gap-2">
          <BookOpen size={28} className="text-purple-500" />
          <p className="text-gray-500 text-sm">Teachers</p>
          <h2 className="text-xl font-bold">{users.teachers}</h2>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-start gap-2">
          <Megaphone size={28} className="text-yellow-500" />
          <p className="text-gray-500 text-sm">Announcements</p>
          <h2 className="text-xl font-bold">{announcementsOverTime.reduce((a, b) => a + b.count, 0)}</h2>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Audience Pie Chart */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-4">Audience Distribution</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={audienceData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {audienceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Announcements Over Time */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-4">Announcements Over Time</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={announcementsOverTime}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="count" stroke="#3B82F6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Filters/Departments Bar Chart */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-4">Filters / Departments</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={filterStats}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="mt-8 bg-white rounded-xl shadow-md p-6 overflow-x-auto">
        <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
        <table className="min-w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="px-4 py-2 text-gray-500 font-medium">Date</th>
              <th className="px-4 py-2 text-gray-500 font-medium">Type</th>
              <th className="px-4 py-2 text-gray-500 font-medium">Details</th>
            </tr>
          </thead>
          <tbody>
            {[
              { date: "2025-11-10", type: "Announcement", details: "Sent to all students" },
              { date: "2025-11-12", type: "User Signup", details: "New alumni registered" },
              { date: "2025-11-14", type: "Announcement", details: "Custom filters used" },
            ].map((row, idx) => (
              <tr key={idx} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{row.date}</td>
                <td className="px-4 py-2">{row.type}</td>
                <td className="px-4 py-2">{row.details}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminStatistics;
