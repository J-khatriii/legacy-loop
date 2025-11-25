import {
  Camera,
  MapPin,
  Calendar,
  Users,
  Edit,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  GraduationCap,
  UserCheck,
  Award,
} from "lucide-react";

const ProfileHeader = ({
  user,
  avatar,
  isOwnProfile,
  connections,
  onAvatarUpload,
  onEditClick,
}) => {
  const formatMonthYear = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ];
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
  }

  const socialLinks = [
    { icon: Linkedin, url: user.social?.linkedin, label: "LinkedIn" },
    { icon: Github, url: user.social?.github, label: "GitHub" },
    { icon: Twitter, url: user.social?.twitter, label: "Twitter" },
    { icon: Instagram, url: user.social?.instagram, label: "Instagram" },
  ]

  return (
    <div className="p-6 md:p-8">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Avatar */}
        <div className="relative w-32 h-32 shrink-0">
          <div className="w-32 h-32 rounded-2xl border-4 border-white shadow-lg overflow-hidden bg-linear-to-br from-indigo-100 to-purple-100">
            <img
              src={
                avatar ||
                user.profileImage ||
                `https://api.dicebear.com/8.x/avataaars/svg?seed=${user.name}`
              }
              alt="profile"
              className="w-full h-full object-cover"
            />
          </div>
          {isOwnProfile && (
            <label className="absolute -bottom-2 -right-2 bg-linear-to-r from-indigo-600 to-purple-600 text-white p-2.5 rounded-xl cursor-pointer shadow-lg hover:shadow-xl transition-all">
              <Camera size={18} />
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={onAvatarUpload}
              />
            </label>
          )}
        </div>

        {/* Info */}
        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  {user.name}
                </h1>
                {user.isVerified && (
                  <div className="bg-blue-100 text-blue-700 p-1.5 rounded-full">
                    <UserCheck size={16} />
                  </div>
                )}
              </div>
              <p className="text-lg text-gray-600 font-medium">
                {user.department || "Department not specified"}
              </p>
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium">
                  <GraduationCap size={14} />
                  {user.role?.charAt(0).toUpperCase() + user.role?.slice(1)}
                </span>
                {user.graduationYear && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm font-medium">
                    <Award size={14} />
                    Class of {user.graduationYear}
                  </span>
                )}
              </div>
            </div>

            {isOwnProfile && (
              <button
                onClick={onEditClick}              
                className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 transition p-2 px-4 rounded-xl shadow text-sm font-medium">
                <Edit size={18} />
                Edit Profile
            </button>
            )}
          </div>

          {user.bio && (
            <p className="mt-4 text-gray-700 leading-relaxed">{user.bio}</p>
          )}

          {/* Stats Row */}
          <div className="mt-6 flex flex-wrap gap-4 sm:gap-6">
            <div className="flex items-center gap-2 text-gray-600">
              <div className="bg-indigo-50 p-2 rounded-lg">
                <Users size={18} className="text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Connections</p>
                <p className="font-semibold text-gray-900">
                  {connections.length}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <div className="bg-purple-50 p-2 rounded-lg">
                <Calendar size={18} className="text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Joined</p>
                <p className="font-semibold text-gray-900">
                  {formatMonthYear(user.createdAt)}
                </p>
              </div>
            </div>
            {user.location && (
              <div className="flex items-center gap-2 text-gray-600">
                <div className="bg-pink-50 p-2 rounded-lg">
                  <MapPin size={18} className="text-pink-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-semibold text-gray-900">
                    {user.location}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Social Links */}
          <div className="mt-6 flex gap-3">
            {socialLinks.map(
              (social, idx) =>
                social.url && (
                  <a
                    key={idx}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 bg-gray-50 hover:bg-linear-to-r hover:from-indigo-50 hover:to-purple-50 rounded-xl transition-all hover:scale-110 text-gray-600 hover:text-indigo-600"
                    title={social.label}
                  >
                    <social.icon size={20} />
                  </a>
                )
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileHeader;
