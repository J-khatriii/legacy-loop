import { useEffect, useState } from "react";
import moment from "moment";
import {
  Mail,
  MapPin,
  Calendar,
  Edit,
  Briefcase,
  BookOpen,
  Globe,
  Users,
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import ProfileTabs from "../components/ProfileTabs";

const AlumniProfile = () => {
  const [alumni, setAlumni] = useState(null);
  const [banner, setBanner] = useState(null);

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("user"));
    if (localUser && localUser.role === "alumni") {
      setAlumni(localUser);
      setBanner(localUser.banner || null);
    } else {
      setAlumni(null);
    }
  }, []);

  if (!alumni) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50">
        <p className="text-gray-600 text-lg">
          Only alumni can view this profile.
        </p>
      </div>
    );
  }

  return (
    <div className="h-full relative overflow-y-scroll bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow overflow-hidden">
          {/* Banner */}
          <div className="h-40 md:h-40 bg-amber-500 relative">
            {banner && (
              <img src={banner} className="w-full h-full object-cover" />
            )}
          </div>

          {/* Profile image + button */}
          <div className="relative z-10 flex justify-between items-end px-6 -mt-12">
            {/* Image */}
            <img
              src={
                alumni.profilePic ||
                `https://api.dicebear.com/8.x/avataaars/svg?seed=${alumni.name}`
              }
              alt={alumni.name}
              className="rounded-full w-28 h-28 border-4 border-white shadow-lg z-20 bg-black"
            />

            {/* Edit Button */}
            <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 transition p-2 px-4 rounded-xl shadow text-sm font-medium">
              <Edit size={18} />
              Edit Profile
            </button>
          </div>

          {/* USER INFO SECTION */}
          <div className="px-6 mt-4 pb-6">
            {/* Name */}
            <h2 className="text-2xl font-semibold">{alumni.name}</h2>

            {/* Email + Location */}
            <div className="flex flex-wrap gap-4 mt-2 text-gray-600">
              <span className="flex items-center gap-1">
                <Mail size={16} /> {alumni.email}
              </span>

              <span className="flex items-center gap-1">
                <MapPin size={16} /> {alumni.location || "N/A"}
              </span>

              <span className="flex items-center gap-1">
                <Calendar size={16} /> Joined {moment(alumni.joinedAt).year()}
              </span>
            </div>

            {/* Followers & Social Links */}
            <div className="flex flex-wrap items-center gap-4 mt-4">
              {/* Followers */}
              <div className="flex items-center gap-2 text-gray-700 font-medium">
                <Users size={18} /> {alumni.followers || 0} Followers
              </div>
              <div className="flex items-center gap-2 text-gray-700 font-medium">
                {alumni.posts || 0} Posts
              </div>

              {/* Social Links */}
              <a
                href="https://github.com/dummyuser"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-9 h-9 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-800 transition"
              >
                <FaGithub size={18} />
              </a>

              <a
                href="https://linkedin.com/in/dummyuser"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-9 h-9 bg-blue-50 hover:bg-blue-100 rounded-full text-blue-700 transition"
              >
                <FaLinkedin size={18} />
              </a>

              <a
                href="https://dummyportfolio.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-9 h-9 bg-green-50 hover:bg-green-100 rounded-full text-green-700 transition"
              >
                <Globe size={18} />
              </a>
            </div>

            {/* About Section */}
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-1">About</h3>
              <p className="text-gray-700 leading-relaxed">
                {alumni.about || "Software Engineer with 3+ years of experience in full-stack development. Alumni of XYZ University. Passionate about building scalable products and mentoring juniors."}
              </p>
            </div>

            {/* Extra Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="p-4 bg-gray-50 rounded-xl border">
                <div className="flex items-center gap-2 text-gray-800 font-medium mb-1">
                  <Briefcase size={18} /> Current Position
                </div>
                <p className="text-gray-700">
                  {alumni.currentPosition || "N/A"} at {alumni.company || "N/A"}
                </p>
              </div>

              <div className="p-4 bg-gray-50 rounded-xl border">
                <div className="flex items-center gap-2 text-gray-800 font-medium mb-1">
                  <BookOpen size={18} /> Alumni
                </div>
                <p className="text-gray-700">
                  {alumni.department || "N/A"} (Batch: {alumni.graduationYear})
                </p>
              </div>
            </div>
          </div>
        </div>
        <ProfileTabs />
      </div>
    </div>
  )
}

export default AlumniProfile;
