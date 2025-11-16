import { X } from "lucide-react";
import { useState, useMemo, useEffect } from "react";

const DEPARTMENTS = ["All", "CSE", "ECE", "EE", "MECH", "CIVIL", "AI-ML", "CYBER", "DATA SCIENCE"];
const START_YEAR = 2008;
const CURRENT_YEAR = new Date().getFullYear();
const PASSOUT_YEARS = Array.from({ length: CURRENT_YEAR - START_YEAR + 1 }, (_, i) => `${START_YEAR + i}`);
const YEARS = ["All", 1, 2, 3, 4];
const SEMESTERS = ["All", 1, 2, 3, 4, 5, 6, 7, 8];
const SECTIONS = ["All", "A", "B", "C"];

const Section = ({ title, children }) => (
  <div className="mb-6">
    <h3 className="text-base font-semibold mb-2">{title}</h3>
    <div className="flex flex-wrap gap-2">{children}</div>
  </div>
);

const Subheading = ({ children }) => (
  <div className="w-full text-sm font-medium mt-4 mb-2">{children}</div>
);

const FilterDrawer = ({ open, onClose, filters = {}, setFilters, audience = ["all"], setAudience }) => {
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!open) setSearch("");
  }, [open]);

  const toggleFilter = (key, value) => {
    const prev = Array.isArray(filters[key]) ? [...filters[key]] : [];
    const exists = prev.some((v) => `${v}` === `${value}`);
    const next = exists ? prev.filter((v) => `${v}` !== `${value}`) : [...prev, value];
    const newFilters = { ...filters, [key]: next };
    setFilters(newFilters);

    setAudience((prevA) => {
      const base = Array.isArray(prevA) ? prevA.filter((p) => p !== "all") : [];
      if (!base.includes("custom")) base.push("custom");
      return base;
    });
  };

  const clearAll = () => {
    setFilters({});
    setAudience(["all"]);
    setSearch("");
  };

  const searchLower = search.toLowerCase();

  const filterList = (list) =>
    list.filter((item) => item.toString().toLowerCase().includes(searchLower));

  const filteredDepartments = useMemo(() => filterList(DEPARTMENTS), [search]);
  const filteredPassouts = useMemo(() => filterList(PASSOUT_YEARS), [search]);
  const filteredYears = useMemo(() => filterList(YEARS), [search]);
  const filteredSemesters = useMemo(() => filterList(SEMESTERS), [search]);
  const filteredSections = useMemo(() => filterList(SECTIONS), [search]);

  if (!open) return null;

  const renderSection = (title, items, filterKey, activeColor = "bg-blue-500") => {
    if (!items.length) return <p className="text-sm text-gray-500 mt-2">No results found</p>;
    return (
      <Section title={title}>
        {items.map((item) => (
          <button
            key={`${filterKey}-${item}`}
            onClick={() => toggleFilter(filterKey, item)}
            className={`px-3 py-1 rounded-full text-sm ${
              (filters[filterKey] || []).includes(item) ? `${activeColor} text-white` : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {item}
          </button>
        ))}
      </Section>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 overflow-auto">
      <div className="bg-white w-full max-w-3xl my-8 rounded-lg shadow-lg flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sticky top-0 bg-white z-10">
          <h2 className="text-lg font-semibold">Filters</h2>
          <div className="flex items-center gap-2">
            <button onClick={clearAll} className="text-sm text-blue-600">
              Clear
            </button>
            <button onClick={onClose} className="p-2 rounded-md hover:bg-gray-100">
              <X />
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="p-4 sticky top-14 bg-white z-10">
          <input
            type="text"
            placeholder="Search filters..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-2 rounded-md bg-gray-100 text-sm outline-none"
          />
        </div>

        <div className="p-4 overflow-y-auto flex-1 space-y-6">
          {/* Students */}
          <Section title="Students">
            <Subheading>Years</Subheading>
            {filteredYears.length ? renderSection("", filteredYears, "studentsYears") : <p className="text-sm text-gray-500 mt-2">No results found</p>}

            <Subheading>Semesters</Subheading>
            {filteredSemesters.length ? renderSection("", filteredSemesters, "studentsSemesters") : <p className="text-sm text-gray-500 mt-2">No results found</p>}

            <Subheading>Sections</Subheading>
            {filteredSections.length ? renderSection("", filteredSections, "studentsSections") : <p className="text-sm text-gray-500 mt-2">No results found</p>}

            <Subheading>Departments</Subheading>
            {filteredDepartments.length ? renderSection("", filteredDepartments, "studentsDepartments") : <p className="text-sm text-gray-500 mt-2">No results found</p>}
          </Section>

          {/* Alumni */}
          <Section title="Alumni">
            <Subheading>Passout Years</Subheading>
            {filteredPassouts.length ? renderSection("", filteredPassouts, "alumniYears", "bg-green-500") : <p className="text-sm text-gray-500 mt-2">No results found</p>}

            <Subheading>Departments</Subheading>
            {filteredDepartments.length ? renderSection("", filteredDepartments, "alumniDepartments", "bg-green-500") : <p className="text-sm text-gray-500 mt-2">No results found</p>}
          </Section>

          {/* Teachers */}
          <Section title="Teachers">
            <Subheading>Departments</Subheading>
            {filteredDepartments.length ? renderSection("", filteredDepartments, "teachersDepartments", "bg-purple-500") : <p className="text-sm text-gray-500 mt-2">No results found</p>}
          </Section>

          {/* Departments (General) */}
          <Section title="Departments (General)">
            {filteredDepartments.length ? renderSection("", filteredDepartments, "departments", "bg-yellow-500") : <p className="text-sm text-gray-500 mt-2">No results found</p>}
          </Section>
        </div>
      </div>
    </div>
  );
};

export default FilterDrawer;
