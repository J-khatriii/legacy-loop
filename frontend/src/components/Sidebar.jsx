import {
  Home,
  PieChart,
  Settings,
  MessageCircle,
  Globe,
  LogOut,
  MailOpen,
  Search,
  PenSquare,
  Bell,
  ArrowRightToLine,
  ArrowLeftToLine,
  Megaphone,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const getNavItems = (role) => {
  const baseItems = [
    { label: "Home", href: "/app/layout", icon: Home },
    { label: "Discover", href: "/app/people", icon: Search },
    { label: "Messages", href: "/app/messages", icon: MessageCircle },
    { label: "Notifications", href: "/app/notifications", icon: Bell },
    { divider: true },
  ];

  if (role === "alumni" || role === "admin") {
    baseItems.push({
      label: "Create Post",
      href: "/app/create-post",
      icon: PenSquare,
    });
    baseItems.push({ divider: true });
  }

  if (role === "admin") {
    baseItems.push({
      label: "Announcement",
      href: "/app/announcement",
      icon: Megaphone,
    });
    baseItems.push({ divider: true });
  }

  baseItems.push(
    { label: "Reporting", href: "/app/reporting", icon: PieChart },
    { label: "Settings", href: "/app/settings", icon: Settings },
    {
      label: "Support",
      href: "/app/support",
      icon: MailOpen,
      badge: "Online",
      badgeColor: "bg-green-500 text-white",
    },
    { label: "Open in browser", href: "https://legacyloop.com/", icon: Globe }
  );

  return baseItems;
};

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
    else navigate("/");
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const navItems = getNavItems(user?.role);

  return (
    <aside
      className={`bg-gray-100/90 border-r border-gray-200 flex flex-col justify-between transition-[width] duration-300 ease-in-out relative ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* --- Header Section --- */}
      <div
        className={`flex items-center ${
          collapsed ? "justify-center py-4" : "justify-between px-4 py-4"
        } border-b border-gray-200`}
      >
        {/* Logo */}
        <div className="flex items-center gap-2">
     <img
  src={assets.logo}
  alt="Logo"
  className={`transition-all duration-300 ${
    collapsed ? "w-8 h-8" : "w-10 h-10"
  }`}
/>

          {!collapsed && (
            <h1 className="font-bold text-lg text-black tracking-tight">
              Legacy Loop
            </h1>
          )}
        </div>

        {/* Collapse Button (inside the sidebar when expanded) */}
        {!collapsed && (
          <button
            onClick={() => setCollapsed(true)}
            className="bg-white border border-gray-300 rounded-lg p-1.5 shadow hover:bg-gray-100 transition"
            title="Collapse sidebar"
          >
            <ArrowLeftToLine size={18} className="text-gray-600" />
          </button>
        )}
      </div>

      {/* --- Expand Button (on right border when collapsed) --- */}
      {collapsed && (
        <button
          onClick={() => setCollapsed(false)}
          className="absolute top-5 -right-3 bg-white border border-gray-300 rounded-lg p-1.5 shadow hover:bg-gray-100 transition"
          title="Expand sidebar"
        >
          <ArrowRightToLine size={14} className="text-gray-600" />
        </button>
      )}

      {/* --- Navigation --- */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-1">
        {navItems.map((item, i) =>
          item.divider ? (
            <hr key={i} className="my-2 border-gray-200" />
          ) : (
            <Link
              key={item.label}
              to={item.href}
              title={collapsed ? item.label : ""}
              className={`group flex items-center ${
                collapsed ? "justify-center" : "justify-between"
              } py-2.5 px-3 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === item.href
                  ? "bg-indigo-100 text-indigo-700"
                  : "text-gray-700 hover:bg-indigo-50"
              }`}
            >
              <div
                className={`flex items-center ${
                  collapsed ? "justify-center" : "gap-3"
                }`}
              >
                {item.icon && <item.icon size={20} />}
                {!collapsed && <span>{item.label}</span>}
              </div>

              {!collapsed && item.badge && (
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    item.badgeColor || "bg-gray-100 text-gray-700"
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          )
        )}
      </div>

      {/* --- User Info --- */}
      {user && (
        <div
          className={`border-t border-gray-100 p-4 flex items-center gap-3 hover:bg-indigo-50 cursor-pointer transition ${
            collapsed ? "justify-center" : ""
          }`}
          onClick={() => navigate("/app/profile")}
        >
          <img
            src={
              user.profilePic ||
              `https://api.dicebear.com/8.x/avataaars/svg?seed=${user.name}`
            }
            alt="User"
            className="w-10 h-10 rounded-full object-cover border border-gray-200"
          />
          {!collapsed && (
            <>
              <div className="flex flex-col flex-1">
                <p className="text-sm font-medium text-gray-800 truncate">
                  {user.name}
                </p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleLogout();
                }}
                title="Logout"
                className="text-gray-400 hover:text-red-500"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </>
          )}
        </div>
      )}
    </aside>
  );
};

export default Sidebar;

