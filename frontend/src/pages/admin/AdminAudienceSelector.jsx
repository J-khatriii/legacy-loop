import { Users, GraduationCap, School, Layers } from "lucide-react";

/**
 * Audience pills (top). This component toggles audience types (multi-select).
 * audience state is array, setAudience updates it.
 */
const AudienceSelector = ({ audience, setAudience }) => {
  const buttons = [
    { id: "all", label: "Everyone", icon: Layers },
    { id: "students", label: "Students", icon: School },
    { id: "alumni", label: "Alumni", icon: GraduationCap },
    { id: "teachers", label: "Teachers", icon: Users },
    { id: "department", label: "Departments", icon: Layers },
  ];

  const toggle = (id) => {
    // "all" acts as a shortcut; selecting "all" clears others
    if (id === "all") {
      if (audience.includes("all")) {
        // unselect all
        setAudience([]);
      } else {
        setAudience(["all"]);
      }
      return;
    }

    // if all is currently selected, remove it
    const base = audience.includes("all") ? [] : [...audience];

    if (base.includes(id)) {
      setAudience(base.filter((x) => x !== id));
    } else {
      setAudience([...base, id]);
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-md space-y-4">
      <h2 className="font-semibold text-lg">Audience</h2>

      <div className="flex flex-wrap gap-3">
        {buttons.map(({ id, label, icon: Icon }) => {
          const active = audience.includes(id) || (id === "all" && audience.includes("all"));
          return (
            <button
              key={id}
              onClick={() => toggle(id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all
                ${active ? "bg-blue-500 text-white shadow-sm" : "bg-gray-100 hover:bg-gray-200"}`}
            >
              <Icon size={16} />
              {label}
            </button>
          );
        })}
      </div>

      <p className="text-xs text-gray-500">
        Tip: choose multiple audience types for combined targeting.
      </p>
    </div>
  );
};

export default AudienceSelector;
