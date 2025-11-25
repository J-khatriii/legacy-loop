import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

const UserFilters = ({
  role,
  setRole,
  batch,
  setBatch,
  graduationYear,
  setGraduationYear,
  resetFilters,
}) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const roles = [
    { label: "All Roles", value: "" },
    { label: "Student", value: "student" },
    { label: "Alumni", value: "alumni" },
    { label: "Admin", value: "admin" },
  ]

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Custom Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center justify-between w-[150px] border border-gray-300 bg-gray-100 text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        >
          <span className="text-gray-700 truncate">
            {roles.find((r) => r.value === role)?.label || "All Roles"}
          </span>
          <ChevronDown
            size={16}
            className={`text-gray-500 transition-transform ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>

        {open && (
          <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
            {roles.map((r) => (
              <div
                key={r.value}
                onClick={() => {
                  setRole(r.value);
                  setOpen(false);
                }}
                className={`px-3 py-2 text-sm cursor-pointer hover:bg-indigo-50 transition ${
                  role === r.value
                    ? "bg-indigo-100 text-indigo-700 font-medium"
                    : "text-gray-700"
                }`}
              >
                {r.label}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Batch Input */}
      <input
        type="text"
        placeholder="Batch (e.g. 2022–26)"
        value={batch}
        onChange={(e) => setBatch(e.target.value)}
        className="border border-gray-300 bg-gray-100 text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition min-w-40"
      />

      {/* Graduation Year Input */}
      <input
        type="text"
        placeholder="Graduation Year"
        value={graduationYear}
        onChange={(e) => setGraduationYear(e.target.value)}
        className="border border-gray-300 bg-gray-100 text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition min-w-[140px]"
      />

      {/* Reset Button */}
      <button
        onClick={resetFilters}
        className="text-sm bg-gray-200 border border-gray-300 px-3 py-2 rounded-lg hover:bg-gray-300 transition font-medium"
      >
        Reset
      </button>
    </div>
  )
}

export default UserFilters;
