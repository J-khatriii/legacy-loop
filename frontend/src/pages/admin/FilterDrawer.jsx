import { X } from "lucide-react";
import { useMemo, useState } from "react";


const DEPARTMENTS = ["CSE", "ECE", "ee", "MECH", "CIVIL", "ai-ml", "cyber", "data scrince"];

// build passout years from 2008 -> present
const START_YEAR = 2008;
const CURRENT_YEAR = new Date().getFullYear();
const PASSOUT_YEARS = Array.from({ length: CURRENT_YEAR - START_YEAR + 1 }, (_, i) => `${START_YEAR + i}`);

const YEARS = [1, 2, 3, 4];
const SEMESTERS = [1,2,3,4,5,6,7,8];
const SECTIONS = ["A","B","C"];

const Section = ({ title, search, setSearch, children }) => (
  <div className="mb-4">
    <div className="flex items-center justify-between mb-2">
      <h3 className="text-sm font-medium">{title}</h3>
      <input
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="text-sm p-2 rounded-md bg-gray-100 outline-none"
      />
    </div>
    <div className="flex flex-wrap gap-2">{children}</div>
  </div>
);

const FilterDrawer = ({ open, onClose, filters, setFilters, audience, setAudience }) => {
  // internal search states for each section
  const [searchStudents, setSearchStudents] = useState("");
  const [searchAlumni, setSearchAlumni] = useState("");
  const [searchTeachers, setSearchTeachers] = useState("");
  const [searchDepartments, setSearchDepartments] = useState("");
  const [searchPassouts, setSearchPassouts] = useState("");

  // helper toggles
  const toggleFilter = (key, value) => {
    const arr = Array.isArray(filters[key]) ? [...filters[key]] : [];
    const stringVal = typeof value === "number" ? value : `${value}`;
    const exists = arr.includes(stringVal) || arr.includes(value);

    const newArr = exists ? arr.filter((v) => `${v}` !== `${value}`) : [...arr, value];
    setFilters({ ...filters, [key]: newArr });
  };

  const clearAll = () => {
    setFilters({});
    setAudience(["all"]);
  };

  // Derived lists (apply search)
  const filteredDepartments = useMemo(
    () =>
      DEPARTMENTS.filter((d) =>
        d.toLowerCase().includes(searchDepartments.toLowerCase())
      ),
    [searchDepartments]
  );

  const filteredPassouts = useMemo(
    () =>
      PASSOUT_YEARS.filter((y) =>
        y.toLowerCase().includes(searchPassouts.toLowerCase())
      ),
    [searchPassouts]
  );

  return (
    <>
      {/* overlay */}
      <div
        className={`fixed inset-0 bg-black/30 transition-opacity ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />

      <aside
        className={`fixed right-0 top-0 h-full w-[380px] bg-white shadow-xl transform transition-transform ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-4 flex items-center justify-between border-b">
          <h2 className="text-lg font-medium">Filters</h2>
          <div className="flex items-center gap-2">
            <button onClick={clearAll} className="text-sm text-blue-600">Clear</button>
            <button onClick={onClose} className="p-2 rounded-md hover:bg-gray-100">
              <X />
            </button>
          </div>
        </div>

        <div className="p-4 overflow-y-auto h-[calc(100%-64px)] no-scrollbar">
          {/* STUDENTS Section */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Students</h3>

            <Section title="Years" search={searchStudents} setSearch={setSearchStudents}>
              {YEARS.filter(y => `${y}`.includes(searchStudents)).map((y) => {
                const active = filters.students?.some((v) => `${v}` === `${y}`);
                return (
                  <button
                    key={y}
                    onClick={() => toggleFilter("students", y)}
                    className={`px-3 py-1 rounded-full text-sm ${active ? "bg-blue-500 text-white" : "bg-gray-100 hover:bg-gray-200"}`}
                  >
                    Year {y}
                  </button>
                );
              })}
            </Section>

            <Section title="Semesters" search={searchStudents} setSearch={setSearchStudents}>
              {SEMESTERS.filter(s => `${s}`.includes(searchStudents)).map((s) => {
                const active = filters.semesters?.some((v) => `${v}` === `${s}`);
                return (
                  <button
                    key={s}
                    onClick={() => toggleFilter("semesters", s)}
                    className={`px-3 py-1 rounded-full text-sm ${active ? "bg-blue-500 text-white" : "bg-gray-100 hover:bg-gray-200"}`}
                  >
                    Sem {s}
                  </button>
                );
              })}
            </Section>

            <Section title="Sections" search={searchStudents} setSearch={setSearchStudents}>
              {SECTIONS.filter(sec => sec.toLowerCase().includes(searchStudents.toLowerCase())).map((sec) => {
                const active = filters.sections?.includes(sec);
                return (
                  <button
                    key={sec}
                    onClick={() => toggleFilter("sections", sec)}
                    className={`px-3 py-1 rounded-full text-sm ${active ? "bg-blue-500 text-white" : "bg-gray-100 hover:bg-gray-200"}`}
                  >
                    {sec}
                  </button>
                );
              })}
            </Section>

            <Section title="Departments" search={searchDepartments} setSearch={setSearchDepartments}>
              {filteredDepartments.map((d) => {
                const active = filters.studentsDepartments?.includes(d);
                return (
                  <button
                    key={d}
                    onClick={() => toggleFilter("studentsDepartments", d)}
                    className={`px-3 py-1 rounded-full text-sm ${active ? "bg-blue-500 text-white" : "bg-gray-100 hover:bg-gray-200"}`}
                  >
                    {d}
                  </button>
                );
              })}
            </Section>
          </div>

          {/* ALUMNI */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Alumni</h3>

            <Section title="Passout Years" search={searchPassouts} setSearch={setSearchPassouts}>
              {filteredPassouts.map((y) => {
                const active = filters.alumni?.includes(y);
                return (
                  <button
                    key={y}
                    onClick={() => toggleFilter("alumni", y)}
                    className={`px-3 py-1 rounded-full text-sm ${active ? "bg-blue-500 text-white" : "bg-gray-100 hover:bg-gray-200"}`}
                  >
                    {y}
                  </button>
                );
              })}
            </Section>

            <Section title="Departments" search={searchDepartments} setSearch={setSearchDepartments}>
              {filteredDepartments.map((d) => {
                const active = filters.alumniDepartments?.includes(d);
                return (
                  <button
                    key={d}
                    onClick={() => toggleFilter("alumniDepartments", d)}
                    className={`px-3 py-1 rounded-full text-sm ${active ? "bg-blue-500 text-white" : "bg-gray-100 hover:bg-gray-200"}`}
                  >
                    {d}
                  </button>
                );
              })}
            </Section>
          </div>

          {/* TEACHERS */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Teachers</h3>
            <Section title="Departments" search={searchTeachers} setSearch={setSearchTeachers}>
              {DEPARTMENTS.filter(d => d.toLowerCase().includes(searchTeachers.toLowerCase())).map((d) => {
                const active = filters.teachers?.includes(d);
                return (
                  <button
                    key={d}
                    onClick={() => toggleFilter("teachers", d)}
                    className={`px-3 py-1 rounded-full text-sm ${active ? "bg-blue-500 text-white" : "bg-gray-100 hover:bg-gray-200"}`}
                  >
                    {d}
                  </button>
                );
              })}
            </Section>
          </div>

          {/* DEPARTMENTS (general) */}
          <div>
            <h3 className="font-semibold mb-2">Departments (General)</h3>
            <Section title="Search Departments" search={searchDepartments} setSearch={setSearchDepartments}>
              {filteredDepartments.map((d) => {
                const active = filters.departments?.includes(d);
                return (
                  <button
                    key={d}
                    onClick={() => toggleFilter("departments", d)}
                    className={`px-3 py-1 rounded-full text-sm ${active ? "bg-blue-500 text-white" : "bg-gray-100 hover:bg-gray-200"}`}
                  >
                    {d}
                  </button>
                );
              })}
            </Section>
          </div>
        </div>
      </aside>
    </>
  );
};

export default FilterDrawer;
