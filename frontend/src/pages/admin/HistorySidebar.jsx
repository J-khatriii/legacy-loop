import { Clock } from "lucide-react";

/**
 * Right-hand history panel showing saved announcements
 */
const HistorySidebar = ({ announcementHistory = [] }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4">
      <h3 className="font-semibold text-lg flex items-center gap-2">
        <Clock size={18} /> Previous Announcements
      </h3>

      <div className="mt-3 space-y-3 max-h-[70vh] overflow-y-auto no-scrollbar">
        {announcementHistory.length === 0 ? (
          <div className="text-sm text-gray-500">No announcements yet.</div>
        ) : (
          announcementHistory.map((a) => (
            <div key={a.id} className="bg-gray-50 p-3 rounded-lg">
              <div className="text-xs text-gray-400">{new Date(a.createdAt).toLocaleString()}</div>
              <div className="font-medium mt-1">{a.title}</div>
              <div className="text-sm text-gray-700 mt-1 line-clamp-3">{a.message}</div>
              <div className="text-xs text-gray-500 mt-2">
                Audience: {a.audience && a.audience.length ? a.audience.join(", ") : "None"}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HistorySidebar;
