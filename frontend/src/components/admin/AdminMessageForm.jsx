import { useState } from "react";
import { Image, X } from "lucide-react";

const AdminMessageForm = ({ onSend = () => {} }) => {
  const [announcement, setannouncement] = useState("");
  const [title, setTitle] = useState("");
  const [mediaFiles, setMediaFiles] = useState([]);

  const handleAnnounce = () => {
    if (!message.trim() && mediaFiles.length === 0) {
      alert("Please write a message or add media.");
      return;
    }

    const payload = {
      id: Date.now(),
      title: title || "Announcement",
      announcement,
      audience,
      filters,
      mediaFiles,
      createdAt: new Date().toISOString(),
    }

    onSend(payload);

    setannouncement("");
    setTitle("");
    setMediaFiles([]);
    alert("Announcement saved (frontend). Hook this to your backend to send out.");
  }

  const handleMediaChange = (e) => {
    const files = Array.from(e.target.files);
    setMediaFiles((prev) => [...prev, ...files]);
  }

  const removeMedia = (index) => {
    setMediaFiles((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <div className="flex flex-col bg-white rounded-xl shadow-md p-6 w-full max-w-3xl mx-auto h-[calc(100vh-48px)] overflow-y-auto">
      
      {/* Title */}
      <input
      placeholder="Title (optional)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 mb-4 rounded-lg bg-gray-100 focus:ring-2 focus:ring-black/20 outline-none text-sm shadow-sm  resize-none transition"
      />

      {/* Message */}
      <textarea
        placeholder="Write your announcement..."
        value={announcement}
        onChange={(e) => setannouncement(e.target.value)}
        className="w-full min-h-[420px] p-4 rounded-lg bg-gray-100 focus:ring-2 focus:ring-black/20 outline-none resize-none mb-4 shadow-sm text-md transition"
      />

      {/* Media Upload */}
      <div className="mb-4">
        <label className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-gray-400 transition text-gray-500 font-medium">
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
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="flex gap-4 justify-end mt-4">
        <button
          onClick={() => {
            setTitle("");
            setannouncement("");
            setMediaFiles([]);
          }}
          className="px-5 py-2 rounded-lg bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 transition shadow-sm cursor-pointer"
        >
          Cancel
        </button>

        <button
          onSubmit={handleAnnounce}
          className="px-5 py-2 rounded-lg bg-black text-white font-semibold hover:bg-black/90 transition shadow-sm cursor-pointer"
        >
          Announce
        </button>
      </div>
    </div>
  )
}

export default AdminMessageForm;
