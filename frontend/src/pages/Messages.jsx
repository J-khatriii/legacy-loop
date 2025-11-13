import { useEffect, useState } from "react";
import {
  Search,
  Phone,
  Archive,
  SquarePen,
  Send,
  EllipsisVertical,
} from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";

const sampleChats = [
  {
    id: 1,
    name: "Katherine Moss",
    username: "@kathy",
    avatar: "https://i.pravatar.cc/60?img=12",
    online: true,
    hasNew: true,
    lastMessage: "Thanks Olivia! Almost there...",
    time: "20 mins ago",
    messages: [
      {
        from: "them",
        text: "Thanks Olivia! Almost there. I'll work on the changes.",
        date: "2024-02-01",
        time: "10:20 AM",
      },
      {
        from: "them",
        text: "I've finished with the requirements doc!",
        date: "2024-02-01",
        time: "11:10 AM",
      },
    ],
  },
  {
    id: 2,
    name: "Phoenix Baker",
    username: "@phoenix",
    avatar: "https://i.pravatar.cc/60?img=32",
    online: true,
    hasNew: true,
    lastMessage: "Quick question about the doc...",
    time: "5 mins ago",
    messages: [],
  },
];

const formatDate = (dateStr) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const isSameDay = (a, b) =>
  new Date(a).toDateString() === new Date(b).toDateString();

const Messages = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [query, setQuery] = useState("");

  // Filter chats by search query
  const filteredChats = sampleChats.filter((chat) => {
    const name = chat.name?.toLowerCase() || "";
    const username = chat.username?.toLowerCase() || "";
    const lastMessage = chat.lastMessage?.toLowerCase() || "";
    const search = query.toLowerCase();

    return (
      name.includes(search) ||
      username.includes(search) ||
      lastMessage.includes(search)
    );
  });

  const selectedChat = sampleChats.find((c) => String(c.id) === id) || null;

  // ESC key closes chat and returns to /messages
  useEffect(() => {
    const onEsc = (e) => {
      if (e.key === "Escape" && id) {
        navigate("/app/messages");
      }
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [id]);

  // Ctrl + K focuses search
  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        document.getElementById("searchBox")?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="flex h-screen bg-white">
      {/* LEFT SIDE LIST */}
      <aside className="w-100 border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 font-semibold text-xl flex items-center justify-between">
          <div className="flex gap-2 items-center">
            Messages
            <span className="text-xs bg-gray-100 px-2 py-1 rounded-md">40</span>
          </div>

          <button className="p-2 bg-gray-100 rounded-lg cursor-pointer">
            <SquarePen size={18} className="text-gray-600" />
          </button>
        </div>

        {/* Search */}
        <div className="px-4">
          <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg relative">
            <Search size={16} className="text-gray-500" />
            <input
              id="searchBox"
              placeholder="Search chats"
              className="w-full bg-transparent text-sm outline-none"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] bg-white border px-1.5 py-0.5 rounded-md text-gray-500">
              Ctrl K
            </span>
          </div>
        </div>

        {/* Filtered Chat List */}
        <div className="mt-4 overflow-y-auto">
          {filteredChats.length === 0 && (
            <p className="text-center text-gray-400 text-sm mt-5">
              No chats found
            </p>
          )}

          {filteredChats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => navigate(`/app/messages/${chat.id}`)}
              className={`flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-100 ${
                String(chat.id) === id ? "bg-gray-100" : ""
              }`}
            >
              <div className="relative">
                <img src={chat.avatar} className="w-10 h-10 rounded-full" />
                {chat.online && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-white border-2 rounded-full"></span>
                )}
              </div>

              <div className="flex-1">
                <p className="text-sm font-medium">{chat.name}</p>
                <p className="text-xs text-gray-500 truncate">
                  {chat.lastMessage}
                </p>
              </div>

              {chat.hasNew && (
                <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
              )}
            </div>
          ))}
        </div>
      </aside>

      {/* RIGHT SIDE UI DEPENDS ON URL */}
      <main className="flex-1 flex flex-col">
        {/* NO CHAT SELECTED */}
        {!selectedChat && (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-10">
            <img
              src="https://cdn-icons-png.flaticon.com/512/5572/5572422.png"
              className="w-32 opacity-40 mb-4"
            />
            <h2 className="text-xl font-semibold text-gray-700">
              No chat selected
            </h2>
            <p className="text-gray-500 mt-2">
              Select a conversation from the left to start messaging.
            </p>
            <p className="text-xs text-gray-400 mt-4">
              Press ESC to close chats
            </p>
          </div>
        )}

        {/* CHAT WINDOW */}
        {selectedChat && (
          <>
            {/* Header */}
            <div className="border-b border-gray-200 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={selectedChat.avatar}
                    className="w-12 h-12 rounded-full"
                  />
                  {selectedChat.online && (
                    <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-white border-2 rounded-full"></span>
                  )}
                </div>

                <div>
                  <p className="text-base font-semibold">{selectedChat.name}</p>
                  <p className="text-sm text-gray-500">
                    {selectedChat.username}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button className="px-3 py-2 text-sm border rounded-lg flex items-center gap-1 cursor-pointer">
                  <Phone size={14} /> Call
                </button>
                <button className="px-3 py-2 text-sm border rounded-lg flex items-center gap-1 cursor-pointer">
                  <Archive size={14} /> Archive
                </button>
                <button className="px-3 py-2 text-sm bg-indigo-600 text-white rounded-lg cursor-pointer">
                  View profile
                </button>
                <button className="p-2 text-gray-500">
                  <EllipsisVertical size={20} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {selectedChat.messages.map((m, i) => {
                const showDate =
                  i === 0 ||
                  !isSameDay(m.date, selectedChat.messages[i - 1]?.date);

                return (
                  <div key={i}>
                    {showDate && (
                      <div className="flex justify-center my-2">
                        <span className="text-xs bg-gray-200 px-3 py-1 rounded-lg">
                          {formatDate(m.date)}
                        </span>
                      </div>
                    )}

                    <div
                      className={`flex ${
                        m.from === "you" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-lg p-3 rounded-lg text-sm ${
                          m.from === "you"
                            ? "bg-indigo-600 text-white"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {m.text}
                      </div>
                    </div>

                    <p
                      className={`text-xs mt-1 ${
                        m.from === "you"
                          ? "text-right text-gray-400"
                          : "text-left text-gray-400"
                      }`}
                    >
                      {m.time}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Input */}
            <div className="border-t border-gray-200 p-4 flex justify-center">
              <div className="flex items-center gap-3 w-full max-w-2xl">
                <input
                  type="text"
                  placeholder="Send a message"
                  className="flex-1 bg-gray-100 p-3 rounded-lg outline-none h-11"
                />
                <button className="bg-indigo-600 text-white rounded-lg h-9 px-3">
                  <Send />
                </button>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Messages;
