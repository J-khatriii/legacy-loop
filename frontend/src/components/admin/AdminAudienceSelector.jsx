import { Users, GraduationCap, School, Layers, Sliders } from "lucide-react";

const AudienceSelector = ({ audience = ["all"], setAudience = () => {} }) => {
  const buttons = [
    { id: "all", label: "Everyone", icon: Layers },
    { id: "students", label: "Students", icon: School },
    { id: "alumni", label: "Alumni", icon: GraduationCap },
    { id: "teachers", label: "Teachers", icon: Users },
    { id: "custom", label: "Custom", icon: Sliders },
  ]

  const toggle = (id) => {
    // make sure audience is array
    const arr = Array.isArray(audience) ? [...audience] : [audience];

    if (id === "all") {
      if (arr.includes("all")) {
        setAudience([]); // unselect all
      } else {
        setAudience(["all"]);
      }
      return;
    }

    // if adding a specific audience, remove 'all'
    let base = arr.filter((x) => x !== "all");

    if (base.includes(id)) {
      base = base.filter((x) => x !== id);
    } else {
      base.push(id);
    }

    // if any explicit picks then ensure 'custom' not present (unless user chooses custom)
    setAudience(base.filter((x) => x !== "custom"));
  }

  return (
    <div className="bg-white p-4 rounded-xl shadow-md space-y-3">
      <h2 className="font-semibold text-lg">Audience</h2>

      <div className="flex flex-wrap gap-3">
        {buttons.map(({ id, label, icon: Icon }) => {
          const active = Array.isArray(audience) ? audience.includes(id) : audience === id;
          return (
            <button
              key={id}
              onClick={() => toggle(id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all ${active ? "bg-blue-500 text-white shadow-sm" : "bg-gray-100 hover:bg-gray-200"}`}
            >
              <Icon size={16} />
              {label}
            </button>
          )
        })}
      </div>

      <p className="text-xs text-gray-500">Tip: use "Custom" or open Filters to build a combined target.</p>
    </div>
  )
}

export default AudienceSelector;
