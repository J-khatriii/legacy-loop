import { useEffect, useState } from "react";
import axios from "axios";
import { Search } from "lucide-react";
import UserCard from "../components/UserCard";
import { dummyConnectionsData } from "../assets/assets";

const People = () => {
  const [query, setQuery] = useState("");
  const [users] = useState(dummyConnectionsData);
  // const [users, setUsers] = useState([]);
  // const [currentUser, setCurrentUser] = useState(null);

  // fetch user from db

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const userData = JSON.parse(localStorage.getItem("user"));
  //       setCurrentUser(userData);

  //       const res = await axios.get("http://localhost:4000/api/users");
  //       let allUsers = res.data;

  //       if(userData) {
  //         allUsers = allUsers.filter((u) => u._id !== userData._id);

  //         setUsers(allUsers);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching users:", error);
  //     }
  //   }

  //   fetchUsers();
  // }, []);

  // Safe filtering (prevents undefined errors)
  const filtered = users.filter((user) => {
    const name = user.full_name?.toLowerCase() || "";
    const username = user.username?.toLowerCase() || "";
    const role = user.bio?.toLowerCase() || "";
    const search = query.toLowerCase();

    return (
      name.includes(search) ||
      username.includes(search) ||
      role.includes(search)
    );
  });

  //   const filtered = users.filter((user) => {
  //   const search = query.toLowerCase();
  //   const name = user.full_name?.toLowerCase() || "";
  //   const username = user.username?.toLowerCase() || "";
  //   const role = user.role?.toLowerCase() || "";
  //   return name.includes(search) || username.includes(search) || role.includes(search);
  // });


  useEffect(() => {
    const handler = (e) => {
      // Works for both Windows (Ctrl+K) and Mac (Cmd+K)
      const isCmdOrCtrl = e.ctrlKey || e.metaKey;

      // normalize key value
      if (isCmdOrCtrl && (e.key === "k" || e.key === "K")) {
        e.preventDefault();
        const input = document.getElementById("searchBox");
        if (input) {
          input.focus();
          input.select(); // highlights existing text
        }
      }
    };

    window.addEventListener("keydown", handler, true);

    return () => {
      window.removeEventListener("keydown", handler, true);
    };
  }, []);

  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 p-6 overflow-y-auto no-scrollbar">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-black">Discover People</h1>
        </div>

        {/* Search Bar */}
        <div className="mb-6 max-w-md relative">
          <div className="flex items-center gap-2 bg-gray-200 px-4 py-2 rounded-lg">
            <Search size={18} className="text-gray-500" />
            <input
              type="text"
              id="searchBox"
              placeholder="Search by name, username or bio"
              className="bg-transparent w-full text-sm font-medium outline-none"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] bg-white border px-1.5 py-0.5 rounded-md text-gray-500">
              Ctrl K
            </span>
          </div>
        </div>

        {/* Results */}
        {filtered.length > 0 ? (
          <div className="flex flex-wrap gap-6">
            {filtered.map((user) => (
              <UserCard key={user._id} user={user} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 mt-10">No people found</div>
        )}
      </div>
    </div>
  );
};

export default People;
