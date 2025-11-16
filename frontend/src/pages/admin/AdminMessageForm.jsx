import { useState } from "react";
import { Send, Image } from "lucide-react";

const AdminMessageForm = ({ onSend = () => {} }) => {
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const [mediaFiles, setMediaFiles] = useState([]);

  const handleSend = () => {
    if (!message.trim() && mediaFiles.length === 0) {
      alert("Please write a message or add media.");
      return;
    }

    const payload = {
      id: Date.now(),
      title: title || "Announcement",
      message,
      audience,
      filters,
      mediaFiles,
      createdAt: new Date().toISOString(),
    };

    onSend(payload);

    setMessage("");
    setTitle("");
    setMediaFiles([]);
    alert("Announcement saved (frontend). Hook this to your backend to send out.");
  };

  const handleMediaChange = (e) => {
    const files = Array.from(e.target.files);
    setMediaFiles((prev) => [...prev, ...files]);
  };

  const removeMedia = (index) => {
    setMediaFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col bg-white rounded-2xl shadow-2xl p-6 w-full max-w-3xl mx-auto h-[calc(100vh-48px)] overflow-y-auto">
      
      {/* Title */}
      <input
        placeholder="Title (optional)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 mb-4 rounded-xl bg-gray-100 border border-gray-200 focus:ring-2 focus:ring-blue-400 outline-none text-md  placeholder-gray-400 transition"
      />

      {/* Message */}
      <textarea
        placeholder="Write your announcement..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full min-h-[420px] p-4 rounded-xl bg-gray-100 border border-gray-200 focus:ring-2 focus:ring-blue-400 outline-none resize-none mb-4 text-gray-800 text-md transition"
      />

      {/* Media Upload */}
      <div className="mb-4">
        <label className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-400 transition text-gray-500 font-medium">
          <Image size={20} /> Click or Drag & Drop Media Here
          <input
            type="file"
            multiple
            className="hidden"
            onChange={handleMediaChange}
            accept="image/*,video/*"
          />
        </label>

        {mediaFiles.length > 0 && (
          <div className="mt-4 grid grid-cols-3 gap-4">
            {mediaFiles.map((file, idx) => (
              <div key={idx} className="relative w-full aspect-square rounded-xl overflow-hidden shadow-md">
                {file.type.startsWith("image/") ? (
                  <img
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-700 text-sm font-medium">
                    {file.name}
                  </div>
                )}
                <button
                  onClick={() => removeMedia(idx)}
                  className="absolute top-2 right-2 bg-white rounded-full p-1 shadow hover:bg-gray-200 transition"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Send Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSend}
          className="px-8 py-3 bg-blue-500 text-white rounded-full flex items-center gap-2 hover:bg-blue-600 transition shadow-lg font-semibold text-md"
        >
          <Send size={18} /> Announce
        </button>
      </div>
    </div>
  );
};

export default AdminMessageForm;
