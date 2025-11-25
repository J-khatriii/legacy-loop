import {
  BookOpen,
  GraduationCap,
  BookMarked,
  Award,
  Users,
} from "lucide-react";

const ProfileTabs = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: "about", label: "About", icon: BookOpen },
    { id: "academics", label: "Academics", icon: GraduationCap },
    { id: "saved", label: "Saved Posts", icon: BookMarked },
    { id: "skills", label: "Skills", icon: Award },
    { id: "connections", label: "Connections", icon: Users },
  ]

  return (
    <div className="border-t border-gray-100 px-6 md:px-8 overflow-x-auto">
      <div className="flex gap-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 sm:px-6 py-4 font-medium text-sm transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? "text-indigo-600 border-b-2 border-indigo-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <tab.icon size={18} />
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default ProfileTabs;
