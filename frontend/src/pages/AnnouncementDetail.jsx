import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import { ArrowLeft, Megaphone } from "lucide-react";
import { useEffect, useState } from "react";

const AnnouncementDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("announcements")) || [];
    const found = saved.find((item) => item.id === Number(id));
    setData(found);

    // mark as read automatically
    if (found && !found.read) {
      const updated = saved.map((i) =>
        i.id === Number(id) ? { ...i, read: true } : i
      );
      localStorage.setItem("announcements", JSON.stringify(updated));
    }
  }, [id]);

  if (!data)
    return <p className="text-center py-10 text-gray-500">Announcement not found</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow rounded-xl p-6">
        
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 gap-2 mb-4 hover:text-gray-800"
        >
          <ArrowLeft size={18} /> Back
        </button>

        {/* Header */}
        <div className="flex items-center gap-2 mb-1">
          <Megaphone className="text-amber-600" size={22} />
          <h1 className="text-xl font-bold text-gray-800">{data.title}</h1>
        </div>

        <p className="text-xs text-gray-500 mb-4">
          {moment(data.time).format("MMMM Do, YYYY • h:mm A")}
        </p>

        {/* Media */}
        {data.media && (
          <img
            src={data.media}
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
        )}

        {/* Full Text */}
        <p className="text-gray-700 leading-7 whitespace-pre-line">
          {data.fullText || data.message}
        </p>
      </div>
    </div>
  );
};

export default AnnouncementDetail;
