import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { Filter, X, Loader, Clock } from "lucide-react";
import AudienceSelector from "../../components/admin/AdminAudienceSelector";
import AdminMessageForm from "../../components/admin/AdminMessageForm";
import FilterDrawer from "../../components/admin/FilterDrawer";
import HistorySidebar from "../../components/admin/HistorySidebar";

const audienceColors = {
  all: "bg-gray-200 text-gray-800",
  students: "bg-blue-100 text-blue-800",
  alumni: "bg-green-100 text-green-800",
  teachers: "bg-purple-100 text-purple-800",
  custom: "bg-yellow-100 text-yellow-800",
}

const API_URL = "http://localhost:4000/api/announcements";

const AdminSendAnnouncement = () => {
  const navigate = useNavigate();

  const [audience, setAudience] = useState(["all"]);
  const [filters, setFilters] = useState({});
  const [announcementHistory, setAnnouncementHistory] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loadingAnnouncements, setLoadingAnnouncements] = useState(false);

  // get token from localStorage
  const getToken = () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const tokenFromUser = storedUser?.token || storedUser?.authToken || storedUser?.accessToken;
      const directToken = localStorage.getItem("token") || localStorage.getItem("authToken") || localStorage.getItem("accessToken");
      const fallback = tokenFromUser || directToken || null;

      return fallback;
    } catch (err) {
      return localStorage.getItem("token") || localStorage.getItem("authToken") || null;
    }
  }

  // Fetch announcements from backend
  useEffect(() => {
    const fetchAnnouncements = async () => {
      const token = getToken();
      if (!token) {
        // Not authenticated -> navigate to sign-in
        toast.error("Not signed in. Redirecting to sign in.");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate("/signin");
        return;
      }

      setLoadingAnnouncements(true);
      try {
        const res = await axios.get(API_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const announcements = res?.data?.announcements || res?.data?.data || res?.data || [];
        setAnnouncementHistory(announcements || []);
      } catch (error) {
        console.error("Failed to load announcements", error);
        if (err.response?.status === 401 || error.response?.status === 403) {
          toast.error("Unauthorized — please sign in again.");
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          navigate("/signin");
        } else {
          toast.error("Failed to load announcements");
        }
        setAnnouncementHistory([]);
      } finally {
        setLoadingAnnouncements(false);
      }
    }

    fetchAnnouncements();
  }, [navigate]);

  // Save announcement to backend API
  const saveAnnouncement = async (announcement) => {
    const token = getToken();
    if (!token) {
      toast.error("Please sign in to send an announcement.");
      navigate("/signin");
      return;
    }

    try {
      const res = await axios.post(API_URL, announcement, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Try to get announcement from response
      const savedAnnouncement = res?.data?.announcement || res?.data || null;
      if (savedAnnouncement) {
        setAnnouncementHistory((prev) => [savedAnnouncement, ...(prev || [])]);
      } else {
        // If backend didn't return created one, refetch
        // (optional) fetchAnnouncements();
      }
      toast.success("Announcement saved");
    } catch (err) {
      console.error("Failed to save announcement", err);
      if (err.response?.status === 401 || err.response?.status === 403) {
        toast.error("Unauthorized — please sign in again.");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate("/signin");
      } else {
        toast.error("Failed to save announcement");
      }
    }
  }

  const applyFilters = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  }

  const removeChip = (type, value) => {
    if (type === "audience") {
      setAudience((prev) => prev.filter((a) => a !== value));
    } else {
      setFilters((prev) => {
        const copy = { ...prev };
        if (Array.isArray(copy[type])) {
          copy[type] = copy[type].filter((v) => v !== value);
        } else {
          delete copy[type];
        }
        return copy;
      });
    }
  }

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

              if (arr.includes("custom")) {
                setDrawerOpen(true);
              }
              if (arr.includes("all")) setFilters({});
              setAudience(arr.filter((x) => x !== "custom"));
            }}
          />

          <div className="mt-4 flex-1 overflow-y-auto bg-white rounded-xl shadow-md p-4 space-y-3">
            <p className="text-sm font-semibold text-gray-600">
              Selected Audiences & Filters
            </p>

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
        <AdminMessageForm
          audience={audience}
          filters={filters}
          onSend={(payload) => saveAnnouncement(payload)}
        />
      </div>

      {/* Right Column */}
      <div className="w-80">
        <div className="bg-white rounded-xl shadow p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg flex items-center gap-2">
        <Clock size={18} /> Previous Announcements
      </h3>
            {loadingAnnouncements && <Loader size={16} className="animate-spin text-indigo-600" />}
          </div>

          {loadingAnnouncements ? (
            <div className="text-center text-sm text-gray-500 py-6">Loading announcements…</div>
          ) : announcementHistory && announcementHistory.length > 0 ? (
            <HistorySidebar announcementHistory={announcementHistory} />
          ) : (
            <div className="text-center text-sm text-gray-500 py-6">
              No announcements yet
            </div>
          )}
        </div>
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
  )
}

export default AdminSendAnnouncement;
