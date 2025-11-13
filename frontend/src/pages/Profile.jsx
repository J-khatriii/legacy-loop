import { useEffect, useState } from "react";
import moment from "moment";
import {
  Camera,
  Mail,
  MapPin,
  Calendar,
  BookOpen,
  Briefcase,
  Users,
  Edit,
  X,
} from "lucide-react";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("academics");
  const [showEdit, setShowEdit] = useState(false);
  const [banner, setBanner] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");
  const [showSkillsEdit, setShowSkillsEdit] = useState(false);

  // New: Local storage-based post and connection lists
  const [savedPosts, setSavedPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [connections, setConnections] = useState([]);

  // Fetch logged-in user (and posts) from localStorage
  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("user"));
    const localSaved = JSON.parse(localStorage.getItem("savedPosts")) || [];
    const localLiked = JSON.parse(localStorage.getItem("likedPosts")) || [];
    const localConnections = JSON.parse(localStorage.getItem("connections")) || [];

    if (localUser) {
      const formattedUser = {
        ...localUser,
        avatar:
          localUser.avatar ||
          `https://i.pravatar.cc/150?img=6=${localUser.name}`,
        cover_photo: localUser.cover_photo || null,
      };

      setUser(formattedUser);
      setSkills(localUser.skills || ["React", "JavaScript"]);
      setSavedPosts(localSaved);
      setLikedPosts(localLiked);
      setConnections(localConnections);
    }
  }, []);

  // Add or remove skills
  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill)) {
      const updated = [...skills, newSkill.trim()];
      setSkills(updated);
      localStorage.setItem("skills", JSON.stringify(updated));
      setNewSkill("");
    }
  };

  const removeSkill = (skill) => {
    const updated = skills.filter((s) => s !== skill);
    setSkills(updated);
    localStorage.setItem("skills", JSON.stringify(updated));
  };

  if (!user) return <div className="p-8 text-center">Loading profile...</div>;

  return (
    <div className="relative min-h-screen overflow-y-auto bg-gray-50 p-6">
      {/* Cover Section */}
      <div className="relative h-52 md:h-64 bg-linear-to-r from-indigo-200 via-purple-200 to-pink-200 rounded-lg">
        {banner && (
          <img
            src={banner}
            alt="banner"
            className="w-full h-full object-cover"
          />
        )}
        <label className="absolute right-4 bottom-4 bg-black/40 backdrop-blur text-white px-3 py-2 rounded-lg flex items-center gap-2 cursor-pointer text-sm hover:bg-black/50">
          <Camera size={16} />
          Change Cover
          <input
            type="file"
            hidden
            onChange={(e) => setBanner(URL.createObjectURL(e.target.files[0]))}
          />
        </label>
      </div>

      {/* Profile Header */}
      <div className="max-w-4xl mx-auto px-6 -mt-30 relative z-10">
        <div className="bg-white rounded-2xl shadow p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-end gap-6">
            {/* Avatar */}
            <div className="relative w-32 h-32 shrink-0">
              <img
                src={avatar || user.avatar}
                alt="profile"
                className="w-32 h-32 rounded-full border-4 border-white object-cover"
              />
              <label className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full cursor-pointer shadow">
                <Camera size={16} />
                <input
                  type="file"
                  hidden
                  onChange={(e) =>
                    setAvatar(URL.createObjectURL(e.target.files[0]))
                  }
                />
              </label>
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {user.name}
                  </h1>
                  <p className="text-gray-600">{user.department}</p>
                  <p className="text-sm text-gray-500">{user.year}</p>
                </div>

                <button
                  onClick={() => setShowEdit(true)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm flex items-center gap-2"
                >
                  <Edit size={16} /> Edit Profile
                </button>
              </div>

              <p className="mt-4 text-gray-700">{user.bio}</p>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-600 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin size={16} /> {user.location}
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={16} /> {user.email}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} /> Joined{" "}
                  {moment(user.createdAt).format("MMM YYYY")}
                </div>
                <div className="flex items-center gap-2">
                  <Users size={16} /> {connections.length} connections
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-4xl mx-auto mt-6 px-4">
        <div className="bg-white rounded-xl shadow p-1 flex justify-around md:max-w-md mx-auto">
          {["academics", "saved", "liked", "skills", "connections"].map(
            (tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 px-4 py-2 text-sm font-medium rounded-lg capitalize transition-colors ${
                  activeTab === tab
                    ? "bg-indigo-600 text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {tab}
              </button>
            )
          )}
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-4xl mx-auto mt-6 px-4 pb-24">
        {/* Saved */}
        {activeTab === "saved" && (
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Saved Posts
            </h2>
            {savedPosts.length === 0 ? (
              <p className="text-gray-500 text-sm">No saved posts yet.</p>
            ) : (
              savedPosts.map((post) => (
                <div key={post._id} className="py-2">
                  <p className="font-medium text-gray-800">{post.title}</p>
                  <p className="text-sm text-gray-500">
                    {moment(post.createdAt).fromNow()}
                  </p>
                </div>
              ))
            )}
          </div>
        )}

        {/* Liked */}
        {activeTab === "liked" && (
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Liked Posts
            </h2>
            {likedPosts.length === 0 ? (
              <p className="text-gray-500 text-sm">No liked posts yet.</p>
            ) : (
              likedPosts.map((post) => (
                <div key={post._id} className="py-2">
                  <p className="font-medium text-gray-800">{post.title}</p>
                  <p className="text-sm text-gray-500">
                    {moment(post.createdAt).fromNow()}
                  </p>
                </div>
              ))
            )}
          </div>
        )}

        {/* Academics */}
        {activeTab === "academics" && (
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Academic Details
            </h2>
            <p>
              <BookOpen className="inline mr-2" size={16} /> Branch:{" "}
              {user.department}
            </p>
            <p>
              <Briefcase className="inline mr-2" size={16} /> Roll No:{" "}
              {user.rollNumber}
            </p>
            <p>
              <Calendar className="inline mr-2" size={16} /> Batch: {user.year}
            </p>
          </div>
        )}

        {/* Skills */}
        {activeTab === "skills" && (
          <div className="bg-white p-6 rounded-xl shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Skills & Interests
              </h2>
              <button
                onClick={() => setShowSkillsEdit(true)}
                className="bg-indigo-600 text-white px-3 py-1 rounded-lg text-sm"
              >
                Edit
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {skills.length === 0 ? (
                <p className="text-gray-500 text-sm">No skills added yet.</p>
              ) : (
                skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))
              )}
            </div>
          </div>
        )}

        {/* Skills Edit Modal */}
        {showSkillsEdit && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Edit Skills</h3>
                <button
                  onClick={() => setShowSkillsEdit(false)}
                  className="text-gray-500 hover:text-gray-800"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-3">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Enter a skill"
                    className="border flex-1 px-3 py-2 rounded-lg text-sm"
                  />
                  <button
                    onClick={addSkill}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm"
                  >
                    Add
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <span
                      key={index}
                      className="flex items-center gap-2 bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                      <X
                        size={14}
                        className="cursor-pointer hover:text-red-500"
                        onClick={() => removeSkill(skill)}
                      />
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setShowSkillsEdit(false)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Connections */}
        {activeTab === "connections" && (
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Connections
            </h2>
            {connections.length === 0 ? (
              <p className="text-gray-500 text-sm">
                You have no connections yet.
              </p>
            ) : (
              <div className="space-y-4">
                {connections.map((conn) => (
                  <div
                    key={conn.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={conn.avatar}
                        className="w-10 h-10 rounded-full"
                        alt={conn.name}
                      />
                      <div>
                        <p className="font-medium">{conn.name}</p>
                        <p className="text-sm text-gray-500">
                          {conn.department}
                        </p>
                      </div>
                    </div>
                    <button className="text-indigo-600 text-sm border border-indigo-600 rounded-lg px-3 py-1 hover:bg-indigo-600 hover:text-white transition">
                      Message
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Edit Profile Modal */}
      {showEdit && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg">
            <h3 className="text-lg font-semibold mb-4">Edit Profile</h3>
            <p className="text-gray-600 text-sm">
              You can add editing inputs here later for live updates.
            </p>
            <button
              onClick={() => setShowEdit(false)}
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
