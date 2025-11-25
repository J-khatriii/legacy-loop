import { useEffect, useState } from "react";
import moment from "moment";
import { Megaphone, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  // Fetch announcements from backend
  const fetchAnnouncements = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/announcements", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      setAnnouncements(res.data);
    } catch (err) {
      console.error("Failed to load announcements:", err);
    }
  }

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  // Mark read (local only, optional backend update)
  const markAsRead = (id) => {
    setAnnouncements((prev) =>
      prev.map((a) => (a._id === id ? { ...a, read: true } : a))
    );
  }

  // Delete announcement (Admin Only)
  const deleteAnnouncement = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/announcements/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      setAnnouncements((prev) => prev.filter((a) => a._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2 mb-6">
          <Megaphone className="text-amber-600" size={24} />
          Announcements
        </h1>

        <div className="bg-white rounded-xl shadow p-6 space-y-4">
          {announcements.length === 0 ? (
            <p className="text-gray-500 text-center py-10">
              No announcements yet 📢
            </p>
          ) : (
            announcements.map((a) => (
              <div
                key={a._id}
                className={`p-4 rounded-lg border cursor-pointer transition-all duration-200
                ${"bg-amber-50 border-amber-200"}
                hover:shadow-md`}
                onClick={() => navigate(`/app/announcements/${a._id}`)}
              >
                {/* Title */}
                <div className="flex items-center justify-between">
                  <h2
                    className={`text-md text-amber-700 font-bold`}
                  >
                    {a.title}
                  </h2>
                </div>

                {/* Media Preview */}
                {a.media && (
                  <img
                    src={a.media}
                    alt=""
                    className="w-full h-40 object-cover rounded mt-3"
                  />
                )}

                {/* Short Message */}
                <p className="text-gray-700 text-sm mt-2">
                  {a.message.slice(0, 120)}...
                </p>

                {/* Time */}
                <div className="flex justify-between items-center mt-2">
                  <p className="text-xs text-gray-500">
                    {moment(a.createdAt).fromNow()}
                  </p>

                  {/* Admin delete only */}
                  {user.role === "admin" && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteAnnouncement(a._id);
                      }}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default Announcements;
