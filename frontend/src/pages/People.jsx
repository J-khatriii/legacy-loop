import { useEffect, useState } from "react";
import axios from "axios";
import { Search } from "lucide-react";
import UserCard from "../components/UserCard";
import UserFilters from "../components/UserFilters";

const People = () => {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [role, setRole] = useState("");
  const [batch, setBatch] = useState("");
  const [graduationYear, setGraduationYear] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        setCurrentUser(storedUser);

        const res = await axios.get("http://localhost:4000/api/users/all");
        let allUsers = Array.isArray(res.data.users) ? res.data.users : [];

        if (storedUser) {
          allUsers = allUsers.filter((u) => u._id !== storedUser._id);
        }

        setUsers(allUsers);
      } catch (error) {
        console.error("Error fetching all users:", error);
      }
    }

    fetchUsers();
  }, []);

  // Search Filter
  const filtered = users.filter((user) => {
    const search = query.toLowerCase();

    // Basic search (name / department / role)
    const matchesSearch =
      user.name?.toLowerCase().includes(search) ||
      user.department?.toLowerCase().includes(search) ||
      user.role?.toLowerCase().includes(search);

    // Filters
    const matchesRole = role ? user.role === role : true;
    const matchesGraduation = graduationYear
      ? user.graduationYear?.toString() === graduationYear
      : true;

    return matchesSearch && matchesRole && matchesGraduation;
  });

  // Ctrl+K shortcut focus
  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === "k" || e.key === "K")) {
        e.preventDefault();
        const input = document.getElementById("searchBox");
        if (input) {
          input.focus();
          input.select();
        }
      }
    }

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 p-6 overflow-y-auto no-scrollbar">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-black">Discover People</h1>
        </div>

        <div className="flex flex-wrap items-center gap-3 mb-8">
          {/* Search Box */}
          <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg flex-1 min-w-[260px] max-w-md relative shadow-sm">
            <Search size={18} className="text-gray-500" />
            <input
              type="text"
              id="searchBox"
              placeholder="Search by name, department, or role"
              className="bg-transparent w-full text-sm font-medium outline-none"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] bg-white border px-1.5 py-0.5 rounded-md text-gray-500">
              Ctrl K
            </span>
          </div>

          {/* Filters */}
          <UserFilters
            role={role}
            setRole={setRole}
            batch={batch}
            setBatch={setBatch}
            graduationYear={graduationYear}
            setGraduationYear={setGraduationYear}
            resetFilters={() => {
              setQuery("");
              setRole("");
              setGraduationYear("");
            }}
          />
        </div>

        {/* User Cards */}
        {filtered.length > 0 ? (
          <div className="flex flex-wrap gap-6">
            {filtered.map((user) => (
              <UserCard key={user._id} user={user} currentUser={currentUser} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 mt-10">No people found</div>
        )}
      </div>
    </div>
  )
}

export default People;
