import { useEffect, useState } from "react";
import moment from "moment";
import { Bell, CheckCircle, Trash2, AlertCircle, UserPlus } from "lucide-react";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("notifications"));
    if (saved && saved.length > 0) {
      setNotifications(saved);
    } else {
      const dummy = [
        {
          id: 1,
          type: "like",
          message: "Your post 'College Fest 2025' got 12 new likes!",
          time: moment().subtract(1, "hours").toISOString(),
          read: false,
        },
        {
          id: 2,
          type: "connection",
          message: "Amit Sharma has sent you a connection request.",
          time: moment().subtract(3, "hours").toISOString(),
          read: false,
        },
        {
          id: 3,
          type: "admin",
          message: "Admin announced: Placement drive starts next week!",
          time: moment().subtract(1, "days").toISOString(),
          read: true,
        },
      ];
      setNotifications(dummy);
      localStorage.setItem("notifications", JSON.stringify(dummy));
    }
  }, []);

  // Mark as read
  const markAsRead = (id) => {
    const updated = notifications.map((n) =>
      n.id === id ? { ...n, read: true } : n
    );
    setNotifications(updated);
    localStorage.setItem("notifications", JSON.stringify(updated));
  }

  // Mark all as read
  const markAllAsRead = () => {
    const updated = notifications.map((n) => ({ ...n, read: true }));
    setNotifications(updated);
    localStorage.setItem("notifications", JSON.stringify(updated));
  }

  // Delete one notification
  const deleteNotification = (id) => {
    const updated = notifications.filter((n) => n.id !== id);
    setNotifications(updated);
    localStorage.setItem("notifications", JSON.stringify(updated));
  }

  // Clear all notifications
  const clearAll = () => {
    setNotifications([]);
    localStorage.removeItem("notifications");
  }

  const getIcon = (type) => {
    switch (type) {
      case "like":
        return <CheckCircle className="text-pink-500" size={18} />;
      case "connection":
        return <UserPlus className="text-indigo-500" size={18} />;
      case "admin":
        return <AlertCircle className="text-amber-500" size={18} />;
      default:
        return <Bell className="text-gray-400" size={18} />;
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Bell className="text-indigo-600" size={24} />
            Notifications
          </h1>
          {notifications.length > 0 && (
            <div className="flex gap-2">
              <button
                onClick={markAllAsRead}
                className="text-sm bg-black text-white px-4 py-2 rounded-lg hover:bg-black/50 transition cursor-pointer"
              >
                Mark All Read
              </button>
              <button
                onClick={clearAll}
                className="text-sm bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition cursor-pointer"
              >
                Clear All
              </button>
            </div>
          )}
        </div>

        {/* Notifications List */}
        <div className="bg-white rounded-xl shadow p-6 space-y-4">
          {notifications.length === 0 ? (
            <p className="text-gray-500 text-center py-10">
              No notifications yet
            </p>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                className={`flex items-start gap-4 p-4 rounded-lg transition-all duration-200 ${
                  n.read ? "bg-gray-50" : "bg-indigo-50"
                }`}
              >
                <div className="mt-1">{getIcon(n.type)}</div>

                <div className="flex-1">
                  <p
                    className={`text-gray-800 text-sm ${
                      n.read ? "font-normal" : "font-medium"
                    }`}
                  >
                    {n.message}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {moment(n.time).fromNow()}
                  </p>
                </div>

                <div className="flex gap-2">
                  {!n.read && (
                    <button
                      onClick={() => markAsRead(n.id)}
                      className="text-indigo-600 text-xs hover:underline"
                    >
                      Mark read
                    </button>
                  )}
                  <button
                    onClick={() => deleteNotification(n.id)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default Notifications;
