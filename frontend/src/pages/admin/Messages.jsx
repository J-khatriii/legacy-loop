import { useEffect, useState } from "react";
import { Megaphone, Filter } from "lucide-react";
import AudienceSelector from "./AdminAudienceSelector";
import FilterDrawer from "./FilterDrawer";
import AdminMessageForm from "./AdminMessageForm";
import HistorySidebar from "./HistorySidebar";

const AdminSendMessage = () => {
  // audience is array of ids e.g. ['students','teachers']
  const [audience, setAudience] = useState(["all"]);
  // filters object: { students: [1,2], semesters: [1,2], sections: ['A'], teachers: ['CSE'], alumni: ['2019'] ...}
  const [filters, setFilters] = useState({});
  const [announcementHistory, setAnnouncementHistory] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("announcementHistory")) || [];
    setAnnouncementHistory(stored);
  }, []);

  const saveAnnouncement = (announcement) => {
    const updated = [announcement, ...(announcementHistory || [])];
    localStorage.setItem("announcementHistory", JSON.stringify(updated));
    setAnnouncementHistory(updated);
  };

  return (
    <div className="h-screen flex gap-6 p-6 bg-gray-50">
      {/* Main Column */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold flex items-center gap-3">
            <Megaphone size={26} className="text-blue-500" />
            Send Announcement
          </h1>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setDrawerOpen(true)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white shadow-sm hover:shadow-md"
            >
              <Filter size={16} />
              Filters
            </button>
          </div>
        </div>

        {/* Search + Audience */}
        <div className="space-y-4 overflow-hidden no-scrollbar">
          <AudienceSelector
            audience={audience}
            setAudience={setAudience}
            filters={filters}
            setFilters={setFilters}
          />

          {/* The center area could show a preview/selected count, etc. */}
          <div className="bg-white rounded-xl shadow-md p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  Selected Audiences:
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {audience.length === 0 ? (
                    <span className="text-xs text-gray-400">None</span>
                  ) : (
                    audience.map((a) => (
                      <span
                        key={a}
                        className="px-3 py-1 rounded-full bg-gray-100 text-sm"
                      >
                        {a}
                      </span>
                    ))
                  )}
                </div>
              </div>

              <div className="text-sm text-gray-500">
                <strong>Applied Filters:</strong>{" "}
                {Object.keys(filters).length === 0 ? "None" : ""}
                <div className="mt-2">
                  {Object.entries(filters).map(([k, v]) =>
                    v && v.length > 0 ? (
                      <div key={k} className="text-xs text-gray-600">
                        {k}: {Array.isArray(v) ? v.join(", ") : v}
                      </div>
                    ) : null
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Composer is intentionally lower - keep page scrollable */}
          <div className="min-h-[300px]" />
        </div>

        {/* Bottom composer - sticky in view */}
        <div className="mt-4">
          <AdminMessageForm
            audience={audience}
            filters={filters}
            onSend={(payload) => {
              saveAnnouncement(payload);
            }}
          />
        </div>
      </div>

      {/* Right — History Sidebar */}
      <div className="w-80">
        <HistorySidebar announcementHistory={announcementHistory} />
      </div>

      {/* Filter Drawer (overlays from right) */}
      <FilterDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        filters={filters}
        setFilters={setFilters}
        audience={audience}
        setAudience={setAudience}
      />
    </div>
  );
};

export default AdminSendMessage;
