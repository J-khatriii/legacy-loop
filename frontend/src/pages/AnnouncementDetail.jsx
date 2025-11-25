import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import { ArrowLeft } from "lucide-react";

const AnnouncementDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [announcement, setAnnouncement] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchAnnouncement = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/api/announcements/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setAnnouncement(res.data);
    } catch (error) {
      console.error("Error loading announcement:", error);
    }
  }

  useEffect(() => {
    fetchAnnouncement();
  }, []);

  if (!announcement) {
    return (
      <div className="p-6 text-center text-gray-500">Loading...</div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow rounded-xl p-6 max-h-screen overflow-y-auto">
        
        {/* Back Button */}
        <button
          onClick={() => navigate("/app/announcements")}
          className="mb-4 flex items-center gap-2 text-sm text-gray-600 hover:text-black"
        >
          <ArrowLeft size={18} /> Back
        </button>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-900">
          {announcement.title}
        </h1>

        {/* Time */}
        <p className="text-sm text-gray-500 mt-1">
          {moment(announcement.createdAt).format("MMMM Do, YYYY • h:mm A")}
        </p>

        {/* Media */}
        {announcement.media && (
          <img
            src={announcement.media}
            className="w-full rounded-lg my-4"
          />
        )}

        {/* Full text */}
        <p className="text-gray-800 whitespace-pre-wrap leading-relaxed mt-4">
          {announcement.fullText}
        </p>
      </div>
    </div>
  )
}

export default AnnouncementDetail;
