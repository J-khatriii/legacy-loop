import { useEffect, useState } from "react";
import { Filter, X } from "lucide-react";
import AudienceSelector from "./AdminAudienceSelector";
import FilterDrawer from "./FilterDrawer";
import AdminMessageForm from "./AdminMessageForm";
import HistorySidebar from "./HistorySidebar";

const normalizeAudience = (a) => (Array.isArray(a) ? a : a ? [a] : []);

const audienceColors = {
  all: "bg-gray-200 text-gray-800",
  students: "bg-blue-100 text-blue-800",
  alumni: "bg-green-100 text-green-800",
  teachers: "bg-purple-100 text-purple-800",
  custom: "bg-yellow-100 text-yellow-800",
};

const AdminSendMessage = () => {
  const [audience, setAudience] = useState(["all"]);
  const [filters, setFilters] = useState({});
  const [announcementHistory, setAnnouncementHistory] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("announcementHistory")) || [];
    setAnnouncementHistory(stored);
  }, []);

  const saveAnnouncement = (announcement) => {
    const payload = { ...announcement, audience: normalizeAudience(announcement.audience) };
    const updated = [payload, ...(announcementHistory || [])];
    localStorage.setItem("announcementHistory", JSON.stringify(updated));
    setAnnouncementHistory(updated);
  };

  const applyFilters = (newFilters) => {
    setFilters(newFilters);
    const hasAny = Object.values(newFilters || {}).some((v) =>
      Array.isArray(v) ? v.length > 0 : !!v
    );
    if (hasAny) {
      setAudience((prev) => {
        const base = Array.isArray(prev) ? prev.filter((p) => p !== "all") : [];
        if (!base.includes("custom")) base.push("custom");
        return base;
      });
    } else {
      setAudience((prev) => (Array.isArray(prev) ? prev.filter((p) => p !== "custom") : []));
    }
  };

  const removeChip = (type, value) => {
    if (type === "audience") {
      setAudience(audience.filter((a) => a !== value));
    } else {
      setFilters((prev) => {
        const updated = { ...prev };
        updated[type] = updated[type].filter((v) => v !== value);
        if (updated[type].length === 0) delete updated[type];
        return updated;
      });
    }
  };

  const renderFilterChips = () =>
    Object.entries(filters)
      .filter(([_, v]) => Array.isArray(v) && v.length > 0)
      .flatMap(([key, values]) =>
        values.map((val) => (
          <span
            key={`${key}-${val}`}
            className="flex items-center gap-1 px-3 py-1 rounded-full text-xs bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer transition"
            onClick={() => removeChip(key, val)}
          >
            {val} <X size={12} />
          </span>
        ))
      );

  return (
    <div className="h-screen flex gap-6 p-6 bg-gray-50">
      {/* Left Column */}
      <div className="w-80 flex flex-col gap-4">
        <div className="sticky top-6 flex flex-col flex-1">
          <AudienceSelector
            audience={audience}
            setAudience={(a) => {
              const arr = Array.isArray(a) ? a : [a];
              // If selecting "Custom", open drawer
              if (arr.includes("custom")) {
                setDrawerOpen(true);
              }
              if (arr.includes("all")) setFilters({});
              setAudience(arr.filter((x) => x !== "custom"));
            }}
          />

          <div className="mt-4 flex-1 overflow-y-auto bg-white rounded-xl shadow-md p-4 space-y-3">
            <p className="text-sm font-semibold text-gray-600">Selected Audiences & Filters</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {audience.length > 0 ? (
                audience.map((a) => (
                  <span
                    key={a}
                    className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium cursor-pointer transition ${audienceColors[a]}`}
                    onClick={() => removeChip("audience", a)}
                  >
                    {a} <X size={12} />
                  </span>
                ))
              ) : (
                <span className="text-xs text-gray-400">None</span>
              )}
              {renderFilterChips()}
            </div>

            <button
              onClick={() => setDrawerOpen(true)}
              className="mt-3 w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-white shadow-sm hover:shadow-md text-sm font-medium transition"
            >
              <Filter size={16} /> Edit Filters
            </button>
          </div>
        </div>
      </div>

      {/* Center Column */}
      <div className="flex-1 flex flex-col gap-4 w-70">
        <div className="flex-1">
          <AdminMessageForm
            audience={audience}
            filters={filters}
            onSend={(payload) => saveAnnouncement(payload)}
          />
        </div>
      </div>

      {/* Right Column */}
      <div className="w-80">
        <HistorySidebar announcementHistory={announcementHistory} />
      </div>

      {/* Filter Drawer */}
      <FilterDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        filters={filters}
        setFilters={(f) => applyFilters(f)}
        audience={audience}
        setAudience={setAudience}
      />
    </div>
  );
};

export default AdminSendMessage;
