import { Mail, Briefcase } from "lucide-react";

const AboutTab = ({ user }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-linear-to-br from-indigo-50 to-indigo-100/50 rounded-2xl">
          <div className="flex items-center gap-3 mb-2">
            <Mail size={20} className="text-indigo-600" />
            <span className="font-medium text-gray-700">Email</span>
          </div>
          <p className="text-gray-900">{user.email}</p>
        </div>
        {user.rollNumber && (
          <div className="p-4 bg-linear-to-br from-purple-50 to-purple-100/50 rounded-2xl">
            <div className="flex items-center gap-3 mb-2">
              <Briefcase size={20} className="text-purple-600" />
              <span className="font-medium text-gray-700">Roll Number</span>
            </div>
            <p className="text-gray-900">{user.rollNumber}</p>
          </div>
        )}
      </div>

      {user.fatherName && (
        <div className="p-6 bg-linear-to-br from-pink-50 to-pink-100/50 rounded-2xl">
          <h3 className="font-semibold text-gray-800 mb-2">Father's Name</h3>
          <p className="text-gray-700">{user.fatherName}</p>
        </div>
      )}

      {user.bio && (
        <div className="p-6 bg-linear-to-br from-gray-50 to-gray-100/50 rounded-2xl">
          <h3 className="font-semibold text-gray-800 mb-2">Bio</h3>
          <p className="text-gray-700">{user.bio}</p>
        </div>
      )}
    </div>
  )
}

export default AboutTab;
