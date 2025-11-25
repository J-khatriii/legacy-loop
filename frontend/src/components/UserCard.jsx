import { MapPin, MessageCircle, Plus, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const UserCard = ({ user, currentUser }) => {

  const navigate = useNavigate();

  const openProfile = () => {
    navigate(`/app/profile/${user._id}`);
  }

  const handleFollow = async () => {
    console.log("Follow clicked for:", user.name);
    // TODO: axios.post(`/api/follow/${user._id}`, {}, { headers: { Authorization: token } })
  }

  const handleConnectionRequest = async () => {
    console.log("Send connection request to:", user.name);
    // TODO: axios.post(`/api/connect/${user._id}`, {}, { headers: { Authorization: token } })
  }

  return (
    <div className="p-4 pt-6 flex flex-col justify-between w-72 shadow-lg border border-gray-200 rounded-xl bg-white hover:shadow-lg transition-all duration-300">
      <div className="text-center cursor-pointer" onClick={openProfile}>
        <img
          src={
            user.profilePic ||
            `https://api.dicebear.com/8.x/avataaars/svg?seed=${user.name}`
          }
          alt={user.name}
          className="rounded-full w-20 h-20 shadow-md mx-auto cursor-pointer border"
        />
        <p className="mt-3 font-semibold text-gray-800">{user.name}</p>
        <div className="flex justify-center items-center gap-2 mt-1">
          <span
          className={`inline-block px-2 py-0.5 mt-1 text-xs rounded-full  ${
            user.userType === "student"
              ? "bg-blue-100 text-blue-700"
              : user.userType === "alumni"
              ? "bg-green-100 text-green-700"
              : "bg-purple-100 text-purple-700"
          }`}
        >
          {user.role}
        </span>

        {
          user.role === "alumni" || user.role === "student" && (
            <span
          className={`inline-block px-2 py-0.5 mt-1 text-xs rounded-full ${
            user.userType === "student"
              ? "bg-blue-100 text-blue-700"
              : user.userType === "alumni"
              ? "bg-green-100 text-green-700"
              : "bg-purple-100 text-purple-700"
          }`}
        >
          {user.graduationYear}
        </span>
          )
        }
        </div>

        {user.role === "student" && (
          <p className="text-gray-600 mt-1 text-sm">{user.department}</p>
        )}

        {user.role === "teacher" && (
          <p className="text-gray-600 mt-1 text-sm">{user.department}</p>
        )}

        {user.role === "alumni" && (
          // <p className="text-gray-600 mt-1 text-sm">{user.currentPosition} at {user.company}</p>
          <p className="text-gray-600 mt-2 text-sm">currentPosition at company</p>
        )}

        {user.bio && (
          <p className="text-gray-600 mt-2 text-center text-sm px-4 line-clamp-2">
            {user.bio}
          </p>
        )}
      </div>

      <div className="flex items-center justify-center gap-2 mt-4 text-xs text-gray-600">
        {user.location && (
          <div className="flex items-center gap-1 border border-gray-300 rounded-full px-3 py-1">
            <MapPin className="w-4 h-4" /> {user.location}
          </div>
        )}
        <div className="flex items-center gap-1 border border-gray-300 rounded-full px-3 py-1">
          <span>{user.followers?.length || 0}</span> Followers
        </div>
      </div>

      <div className="flex mt-4 gap-2">
        {/* Follow */}
        <button
          disabled={currentUser?.following?.includes(user._id)}
          onClick={handleFollow}
          className={`w-full py-2 rounded-md flex justify-center items-center gap-2 bg-indigo-500 hover:bg-indigo-900 text-white transition active:scale-95 ${
            currentUser?.following?.includes(user._id)
              ? "opacity-70 cursor-not-allowed"
              : ""
          }`}
        >
          <UserPlus className="w-4 h-4" />
          {currentUser?.following?.includes(user._id) ? "Following" : "Follow"}
        </button>

        {/* Connect */}
        <button
          onClick={handleConnectionRequest}
          className="flex items-center justify-center w-16 border text-slate-500 group rounded-md cursor-pointer active:scale-95 transition"
        >
          {currentUser?.connections?.includes(user._id) ? (
            <MessageCircle className="w-5 h-5 group-hover:scale-105 transition" />
          ) : (
            <Plus className="w-5 h-5 group-hover:scale-105 transition" />
          )}
        </button>
      </div>
    </div>
  )
}

export default UserCard;
