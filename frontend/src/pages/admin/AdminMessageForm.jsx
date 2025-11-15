import { useState } from "react";
import { Send } from "lucide-react";

const AdminMessageForm = ({ audience, filters, onSend }) => {
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");

  const handleSend = () => {
    if (!message.trim()) {
      alert("Please write a message.");
      return;
    }

    const payload = {
      id: Date.now(),
      title: title || "Announcement",
      message,
      audience,
      filters,
      createdAt: new Date().toISOString(),
    };

    // send to parent
    onSend(payload);

    // clear
    setMessage("");
    setTitle("");
    alert("Announcement saved (frontend). Hook this to your backend to send out.");
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4 bottom-6">
      <div className="mb-3">
        <input
          placeholder="Title (optional)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 rounded-lg bg-gray-50 outline-none"
        />
      </div>

      <textarea
        placeholder="Write announcement..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full h-36 p-3 rounded-lg bg-gray-50 outline-none resize-none"
      />

      <div className="mt-3 flex items-center gap-3">
        <div className="text-sm text-gray-500 flex-1">
          Target:{" "}
          <span className="font-medium">
            {Array.isArray(audience) ? (audience.length ? audience.join(", ") : "None") : (audience || "None")}
          </span>
        </div>

        <button
          onClick={handleSend}
          className="px-4 py-2 bg-blue-500 text-white rounded-full flex items-center gap-2 hover:bg-blue-600"
        >
          <Send size={16} /> Send
        </button>
      </div>
    </div>
  );
};

export default AdminMessageForm;
