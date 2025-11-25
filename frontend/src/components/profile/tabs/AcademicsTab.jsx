import { BookOpen, Briefcase, Calendar } from "lucide-react";

const AcademicsTab = ({ user }) => {
  const academicFields = [
    {
      label: "Department",
      value: user.department,
      icon: BookOpen,
    },
    {
      label: "Roll Number",
      value: user.rollNumber,
      icon: Briefcase,
    },
    {
      label: "Graduation Year",
      value: user.graduationYear,
      icon: Calendar,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {academicFields.map(
        (item, idx) =>
          item.value && (
            <div
              key={idx}
              className="p-5 bg-linear-to-br from-gray-50 to-gray-100/50 rounded-2xl hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <item.icon size={20} className="text-indigo-600" />
                </div>
                <span className="font-medium text-gray-700">{item.label}</span>
              </div>
              <p className="text-gray-900 font-semibold text-lg">
                {item.value}
              </p>
            </div>
          )
      )}
    </div>
  )
}

export default AcademicsTab;
