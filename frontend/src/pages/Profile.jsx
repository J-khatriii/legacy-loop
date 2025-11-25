// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import {
//   Camera,
//   Mail,
//   MapPin,
//   Calendar,
//   BookOpen,
//   Briefcase,
//   Users,
//   Edit,
//   X,
//   Github,
//   Linkedin,
//   Twitter,
//   Instagram,
//   GraduationCap,
//   UserCheck,
//   Award,
//   Plus,
//   Loader,
//   BookMarked,
// } from "lucide-react";
// import toast from "react-hot-toast";

// const Profile = () => {
//   const { profileId } = useParams();
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState("about");
//   const [showEdit, setShowEdit] = useState(false);
//   const [showSkillsEdit, setShowSkillsEdit] = useState(false);
//   const [avatar, setAvatar] = useState(null);
//   const [skills, setSkills] = useState([]);
//   const [newSkill, setNewSkill] = useState("");
//   const [savedPosts, setSavedPosts] = useState([]);
//   const [likedPosts, setLikedPosts] = useState([]);
//   const [connections, setConnections] = useState([]);

//   // Format date helper
//   const formatDate = (dateString) => {
//     if (!dateString) return "";
//     const date = new Date(dateString);
//     const now = new Date();
//     const diffTime = Math.abs(now - date);
//     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

//     if (diffDays < 30) {
//       return `${diffDays} days ago`;
//     } else if (diffDays < 365) {
//       const months = Math.floor(diffDays / 30);
//       return `${months} month${months > 1 ? "s" : ""} ago`;
//     } else {
//       const years = Math.floor(diffDays / 365);
//       return `${years} year${years > 1 ? "s" : ""} ago`;
//     }
//   };

//   const formatMonthYear = (dateString) => {
//     if (!dateString) return "";
//     const date = new Date(dateString);
//     const months = [
//       "Jan",
//       "Feb",
//       "Mar",
//       "Apr",
//       "May",
//       "Jun",
//       "Jul",
//       "Aug",
//       "Sep",
//       "Oct",
//       "Nov",
//       "Dec",
//     ];
//     return `${months[date.getMonth()]} ${date.getFullYear()}`;
//   };

//   // Fetch user profile
//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       try {
//         setLoading(true);
//         const storedUser = JSON.parse(localStorage.getItem("user"));
//         const token = storedUser?.token;

//         if (!token) {
//           navigate("/signin");
//           return;
//         }

//         let userData;

//         if (profileId) {
//           // Viewing someone else's profile
//           const response = await axios.get(
//             `http://localhost:4000/api/users/${profileId}`,
//             {
//               headers: { Authorization: `Bearer ${token}` },
//             }
//           );
//           userData = response.data.user;
//         } else {
//           // Viewing own profile
//           const response = await axios.get("http://localhost:4000/api/users/me", {
//             headers: { Authorization: `Bearer ${token}` },
//           });
//           userData = response.data.user;
//         }

//         setUser(userData);
//         setAvatar(userData.profileImage);

//         // Fetch connections
//         // const connectionsResponse = await axios.get(
//         //   "http://localhost:4000/api/users/connections",
//         //   {
//         //     headers: { Authorization: `Bearer ${token}` },
//         //   }
//         // );
//         // setConnections(connectionsResponse.data.connections || []);
//       } catch (error) {
//         console.error("Error fetching profile:", error);
//         toast.error("Failed to load profile");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserProfile();
//   }, [profileId, navigate]);

//   const addSkill = () => {
//     if (newSkill.trim() && !skills.includes(newSkill)) {
//       const updated = [...skills, newSkill.trim()];
//       setSkills(updated);
//       setNewSkill("");
//     }
//   };

//   const removeSkill = (skill) => {
//     const updated = skills.filter((s) => s !== skill);
//     setSkills(updated);
//   };

//   const handleAvatarUpload = async (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     try {
//       const storedUser = JSON.parse(localStorage.getItem("user"));
//       const token = storedUser?.token;

//       const formData = new FormData();
//       formData.append("profile", file);

//       const response = await axios.put(
//         "http://localhost:4000/api/users/me",
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       setUser(response.data.user);
//       setAvatar(response.data.user.profileImage);
//       toast.success("Profile picture updated!");
//     } catch (error) {
//       console.error("Error uploading avatar:", error);
//       toast.error("Failed to upload profile picture");
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center">
//         <div className="text-center">
//           <Loader size={48} className="animate-spin text-indigo-600 mx-auto" />
//           <p className="mt-4 text-gray-600">Loading profile...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!user) {
//     return (
//       <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center">
//         <div className="text-center">
//           <p className="text-gray-600 text-lg">Profile not found</p>
//           <button
//             onClick={() => navigate("/layout")}
//             className="mt-4 px-6 py-2.5 bg-indigo-600 text-white rounded-xl"
//           >
//             Go Back
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const isOwnProfile = !profileId;
//   const socialLinks = [
//     { icon: Linkedin, url: user.social?.linkedin, label: "LinkedIn" },
//     { icon: Github, url: user.social?.github, label: "GitHub" },
//     { icon: Twitter, url: user.social?.twitter, label: "Twitter" },
//     { icon: Instagram, url: user.social?.instagram, label: "Instagram" },
//   ];

//   return (
//     <div className="h-screen bg-linear-to-br from-gray-50 via-indigo-50/30 to-purple-50/30 overflow-y-auto">
//       {/* Profile Content */}
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-5 relative z-10">
//         <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
//           {/* Profile Header */}
//           <div className="p-6 md:p-8">
//             <div className="flex flex-col md:flex-row gap-6">
//               {/* Avatar */}
//               <div className="relative w-32 h-32 shrink-0">
//                 <div className="w-32 h-32 rounded-2xl border-4 border-white shadow-lg overflow-hidden bg-linear-to-br from-indigo-100 to-purple-100">
//                   <img
//                     src={
//                       avatar ||
//                       user.profileImage ||
//                       // `https://i.pravatar.cc/300?img=6`
//                       `https://api.dicebear.com/8.x/avataaars/svg?seed=${user.name}`
//                     }
//                     alt="profile"
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//                 {isOwnProfile && (
//                   <label className="absolute -bottom-2 -right-2 bg-linear-to-r from-indigo-600 to-purple-600 text-white p-2.5 rounded-xl cursor-pointer shadow-lg hover:shadow-xl transition-all">
//                     <Camera size={18} />
//                     <input
//                       type="file"
//                       accept="image/*"
//                       hidden
//                       onChange={handleAvatarUpload}
//                     />
//                   </label>
//                 )}
//               </div>

//               {/* Info */}
//               <div className="flex-1">
//                 <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
//                   <div>
//                     <div className="flex items-center gap-3 mb-2">
//                       <h1 className="text-3xl font-bold bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
//                         {user.name}
//                       </h1>
//                       {user.isVerified && (
//                         <div className="bg-blue-100 text-blue-700 p-1.5 rounded-full">
//                           <UserCheck size={16} />
//                         </div>
//                       )}
//                     </div>
//                     <p className="text-lg text-gray-600 font-medium">
//                       {user.department || "Department not specified"}
//                     </p>
//                     <div className="flex items-center gap-2 mt-2 flex-wrap">
//                       <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium">
//                         <GraduationCap size={14} />
//                         {user.role?.charAt(0).toUpperCase() + user.role?.slice(1)}
//                       </span>
//                       {user.graduationYear && (
//                         <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm font-medium">
//                           <Award size={14} />
//                           Class of {user.graduationYear}
//                         </span>
//                       )}
//                     </div>
//                   </div>

//                   {isOwnProfile && (
//                     <button
//                       onClick={() => setShowEdit(true)}
//                       className="px-6 py-2.5 bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium flex items-center gap-2 hover:shadow-lg transition-all hover:scale-105"
//                     >
//                       <Edit size={18} /> Edit Profile
//                     </button>
//                   )}
//                 </div>

//                 {user.bio && (
//                   <p className="mt-4 text-gray-700 leading-relaxed">{user.bio}</p>
//                 )}

//                 {/* Stats Row */}
//                 <div className="mt-6 flex flex-wrap gap-4 sm:gap-6">
//                   <div className="flex items-center gap-2 text-gray-600">
//                     <div className="bg-indigo-50 p-2 rounded-lg">
//                       <Users size={18} className="text-indigo-600" />
//                     </div>
//                     <div>
//                       <p className="text-sm text-gray-500">Connections</p>
//                       <p className="font-semibold text-gray-900">
//                         {connections.length}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-2 text-gray-600">
//                     <div className="bg-purple-50 p-2 rounded-lg">
//                       <Calendar size={18} className="text-purple-600" />
//                     </div>
//                     <div>
//                       <p className="text-sm text-gray-500">Joined</p>
//                       <p className="font-semibold text-gray-900">
//                         {formatMonthYear(user.createdAt)}
//                       </p>
//                     </div>
//                   </div>
//                   {user.location && (
//                     <div className="flex items-center gap-2 text-gray-600">
//                       <div className="bg-pink-50 p-2 rounded-lg">
//                         <MapPin size={18} className="text-pink-600" />
//                       </div>
//                       <div>
//                         <p className="text-sm text-gray-500">Location</p>
//                         <p className="font-semibold text-gray-900">
//                           {user.location}
//                         </p>
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 {/* Social Links */}
//                 <div className="mt-6 flex gap-3">
//                   {socialLinks.map(
//                     (social, idx) =>
//                       social.url && (
//                         <a
//                           key={idx}
//                           href={social.url}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="p-2.5 bg-gray-50 hover:bg-linear-to-r hover:from-indigo-50 hover:to-purple-50 rounded-xl transition-all hover:scale-110 text-gray-600 hover:text-indigo-600"
//                           title={social.label}
//                         >
//                           <social.icon size={20} />
//                         </a>
//                       )
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Tabs */}
//           <div className="border-t border-gray-100 px-6 md:px-8 overflow-x-auto">
//             <div className="flex gap-1">
//               {[
//                 { id: "about", label: "About", icon: BookOpen },
//                 { id: "academics", label: "Academics", icon: GraduationCap },
//                 { id: "saved", label: "Saved Posts", icon: BookMarked },
//                 { id: "skills", label: "Skills", icon: Award },
//                 { id: "connections", label: "Connections", icon: Users },
//               ].map((tab) => (
//                 <button
//                   key={tab.id}
//                   onClick={() => setActiveTab(tab.id)}
//                   className={`flex items-center gap-2 px-4 sm:px-6 py-4 font-medium text-sm transition-all whitespace-nowrap ${
//                     activeTab === tab.id
//                       ? "text-indigo-600 border-b-2 border-indigo-600"
//                       : "text-gray-600 hover:text-gray-900"
//                   }`}
//                 >
//                   <tab.icon size={18} />
//                   {tab.label}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Tab Content */}
//           <div className="p-6 md:p-8">
//             {/* About Tab */}
//             {activeTab === "about" && (
//               <div className="space-y-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div className="p-4 bg-linear-to-br from-indigo-50 to-indigo-100/50 rounded-2xl">
//                     <div className="flex items-center gap-3 mb-2">
//                       <Mail size={20} className="text-indigo-600" />
//                       <span className="font-medium text-gray-700">Email</span>
//                     </div>
//                     <p className="text-gray-900">{user.email}</p>
//                   </div>
//                   {user.rollNumber && (
//                     <div className="p-4 bg-linear-to-br from-purple-50 to-purple-100/50 rounded-2xl">
//                       <div className="flex items-center gap-3 mb-2">
//                         <Briefcase size={20} className="text-purple-600" />
//                         <span className="font-medium text-gray-700">
//                           Roll Number
//                         </span>
//                       </div>
//                       <p className="text-gray-900">{user.rollNumber}</p>
//                     </div>
//                   )}
//                 </div>

//                 {user.fatherName && (
//                   <div className="p-6 bg-linear-to-br from-pink-50 to-pink-100/50 rounded-2xl">
//                     <h3 className="font-semibold text-gray-800 mb-2">
//                       Father's Name
//                     </h3>
//                     <p className="text-gray-700">{user.fatherName}</p>
//                   </div>
//                 )}

//                 {user.bio && (
//                   <div className="p-6 bg-linear-to-br from-gray-50 to-gray-100/50 rounded-2xl">
//                     <h3 className="font-semibold text-gray-800 mb-2">Bio</h3>
//                     <p className="text-gray-700">{user.bio}</p>
//                   </div>
//                 )}
//               </div>
//             )}

//             {/* Academics Tab */}
//             {activeTab === "academics" && (
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {[
//                   {
//                     label: "Department",
//                     value: user.department,
//                     icon: BookOpen,
//                   },
//                   {
//                     label: "Roll Number",
//                     value: user.rollNumber,
//                     icon: Briefcase,
//                   },
//                   {
//                     label: "Graduation Year",
//                     value: user.graduationYear,
//                     icon: Calendar,
//                   },
//                 ].map(
//                   (item, idx) =>
//                     item.value && (
//                       <div
//                         key={idx}
//                         className="p-5 bg-linear-to-br from-gray-50 to-gray-100/50 rounded-2xl hover:shadow-md transition-shadow"
//                       >
//                         <div className="flex items-center gap-3 mb-2">
//                           <div className="p-2 bg-white rounded-lg shadow-sm">
//                             <item.icon size={20} className="text-indigo-600" />
//                           </div>
//                           <span className="font-medium text-gray-700">
//                             {item.label}
//                           </span>
//                         </div>
//                         <p className="text-gray-900 font-semibold text-lg">
//                           {item.value}
//                         </p>
//                       </div>
//                     )
//                 )}
//               </div>
//             )}

//             {/* saved post tab */}

//             {activeTab === "saved" && (
//                <div className="text-center py-12">
//                     <div className="inline-block p-4 bg-gray-50 rounded-full mb-4">
//                       <BookMarked size={32} className="text-gray-400" />
//                     </div>
//                     <p className="text-gray-500">No saved posts.</p>
//                   </div>
//             )}

//             {/* Skills Tab */}
//             {activeTab === "skills" && (
//               <div>
//                 <div className="flex justify-between items-center mb-6">
//                   <h2 className="text-xl font-bold text-gray-800">
//                     Skills & Interests
//                   </h2>
//                   {isOwnProfile && (
//                     <button
//                       onClick={() => setShowSkillsEdit(true)}
//                       className="px-4 py-2 bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-xl text-sm font-medium flex items-center gap-2 hover:shadow-lg transition-all"
//                     >
//                       <Plus size={16} />
//                       Add Skills
//                     </button>
//                   )}
//                 </div>

//                 <div className="flex flex-wrap gap-3">
//                   {skills.length === 0 ? (
//                     <div className="w-full text-center py-12">
//                       <div className="inline-block p-4 bg-gray-50 rounded-full mb-4">
//                         <Award size={32} className="text-gray-400" />
//                       </div>
//                       <p className="text-gray-500">No skills added yet.</p>
//                       {/* {isOwnProfile && (
//                         <button
//                           onClick={() => setShowSkillsEdit(true)}
//                           className="mt-4 px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors"
//                         >
//                           Add Your First Skill
//                         </button>
//                       )} */}
//                     </div>
//                   ) : (
//                     skills.map((skill, index) => (
//                       <span
//                         key={index}
//                         className="px-4 py-2.5 bg-linear-to-r from-indigo-50 to-purple-50 text-indigo-700 rounded-xl text-sm font-medium border border-indigo-100 hover:shadow-md transition-shadow"
//                       >
//                         {skill}
//                       </span>
//                     ))
//                   )}
//                 </div>
//               </div>
//             )}

//             {/* Connections */}
//             {activeTab === "connections" && (
//               <div>
//                 <h2 className="text-xl font-bold text-gray-800 mb-6">
//                   Connections
//                 </h2>
//                 {connections.length === 0 ? (
//                   <div className="text-center py-12">
//                     <div className="inline-block p-4 bg-gray-50 rounded-full mb-4">
//                       <Users size={32} className="text-gray-400" />
//                     </div>
//                     <p className="text-gray-500">No connections yet.</p>
//                   </div>
//                 ) : (
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     {connections.map((conn) => (
//                       <div
//                         key={conn._id}
//                         className="p-5 bg-linear-to-br from-gray-50 to-gray-100/50 rounded-2xl hover:shadow-md transition-all"
//                       >
//                         <div className="flex items-center gap-4">
//                           <img
//                             src={
//                               conn.profileImage || `https://i.pravatar.cc/150?img=1`
//                             }
//                             className="w-14 h-14 rounded-xl object-cover"
//                             alt={conn.name}
//                           />
//                           <div className="flex-1 min-w-0">
//                             <p className="font-semibold text-gray-900 truncate">
//                               {conn.name}
//                             </p>
//                             <p className="text-sm text-gray-500 truncate">
//                               {conn.department || "N/A"}
//                             </p>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Skills Edit Modal */}
//       {showSkillsEdit && isOwnProfile && (
//         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
//           <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
//             <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center rounded-t-3xl">
//               <h3 className="text-xl font-bold text-gray-800">Manage Skills</h3>
//               <button
//                 onClick={() => setShowSkillsEdit(false)}
//                 className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
//               >
//                 <X size={20} />
//               </button>
//             </div>

//             <div className="p-6 space-y-6">
//               <div className="flex gap-2">
//                 <input
//                   type="text"
//                   value={newSkill}
//                   onChange={(e) => setNewSkill(e.target.value)}
//                   onKeyPress={(e) => e.key === "Enter" && addSkill()}
//                   placeholder="Enter a skill (e.g., React, Python)"
//                   className="border-2 border-gray-200 flex-1 px-4 py-3 rounded-xl text-sm focus:border-indigo-500 focus:outline-none"
//                 />
//                 <button
//                   onClick={addSkill}
//                   className="px-6 py-3 bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all"
//                 >
//                   <Plus size={20} />
//                 </button>
//               </div>

//               <div className="flex flex-wrap gap-3">
//                 {skills.map((skill, index) => (
//                   <span
//                     key={index}
//                     className="flex items-center gap-2 px-4 py-2.5 bg-linear-to-r from-indigo-50 to-purple-50 text-indigo-700 rounded-xl text-sm font-medium border border-indigo-100"
//                   >
//                     {skill}
//                     <button
//                       onClick={() => removeSkill(skill)}
//                       className="p-1 hover:bg-red-100 rounded-full transition-colors"
//                     >
//                       <X size={14} className="text-red-500" />
//                     </button>
//                   </span>
//                 ))}
//               </div>
//             </div>

//             <div className="border-t border-gray-100 px-6 py-4">
//               <button
//                 onClick={() => setShowSkillsEdit(false)}
//                 className="w-full px-6 py-3 bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all"
//               >
//                 Done
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Edit Profile Modal */}
//       {showEdit && isOwnProfile && (
//         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
//           <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg">
//             <div className="border-b border-gray-100 px-6 py-4 flex justify-between items-center rounded-t-3xl">
//               <h3 className="text-xl font-bold text-gray-800">Edit Profile</h3>
//               <button
//                 onClick={() => setShowEdit(false)}
//                 className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
//               >
//                 <X size={20} />
//               </button>
//             </div>
//             <div className="p-6">
//               <p className="text-gray-600 mb-6">
//                 Profile editing functionality coming soon. You'll be able to
//                 update your bio, social links, and more.
//               </p>
//               <button
//                 onClick={() => setShowEdit(false)}
//                 className="w-full px-6 py-3 bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default Profile;


import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";
import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileTabs from "../components/profile/ProfileTabs";
import ProfileTabContent from "../components/profile/ProfileTabContent";
import EditProfileModal from "../components/profile/EditProfileModal";
import SkillsEditModal from "../components/profile/SkillsEditModal";

const Profile = () => {
  const { profileId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("about");
  const [showEdit, setShowEdit] = useState(false);
  const [showSkillsEdit, setShowSkillsEdit] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");
  const [savedPosts, setSavedPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [connections, setConnections] = useState([]);

  // Fetch user profile
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const token = storedUser?.token;

        if (!token) {
          navigate("/signin");
          return;
        }

        let userData;

        if (profileId) {
          // Viewing someone else's profile
          const response = await axios.get(
            `http://localhost:4000/api/users/${profileId}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          userData = response.data.user;
        } else {
          // Viewing own profile
          const response = await axios.get("http://localhost:4000/api/users/me", {
            headers: { Authorization: `Bearer ${token}` },
          });
          userData = response.data.user;
        }

        setUser(userData);
        setAvatar(userData.profileImage);

        // Fetch connections if needed
        // const connectionsResponse = await axios.get(
        //   "http://localhost:4000/api/users/connections",
        //   {
        //     headers: { Authorization: `Bearer ${token}` },
        //   }
        // );
        // setConnections(connectionsResponse.data.connections || []);
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [profileId, navigate]);

  const handleAvatarUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const token = storedUser?.token;

      const formData = new FormData();
      formData.append("profile", file);

      const response = await axios.put(
        "http://localhost:4000/api/users/me",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setUser(response.data.user);
      setAvatar(response.data.user.profileImage);
      toast.success("Profile picture updated!");
    } catch (error) {
      console.error("Error uploading avatar:", error);
      toast.error("Failed to upload profile picture");
    }
  }

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill)) {
      const updated = [...skills, newSkill.trim()];
      setSkills(updated);
      setNewSkill("");
    }
  }

  const removeSkill = (skill) => {
    const updated = skills.filter((s) => s !== skill);
    setSkills(updated);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <Loader size={48} className="animate-spin text-indigo-600 mx-auto" />
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 text-lg">Profile not found</p>
          <button
            onClick={() => navigate("/layout")}
            className="mt-4 px-6 py-2.5 bg-indigo-600 text-white rounded-xl"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const isOwnProfile = !profileId;

  return (
    <div className="h-screen bg-linear-to-br from-gray-50 via-indigo-50/30 to-purple-50/30 overflow-y-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-5 relative z-10">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <ProfileHeader
            user={user}
            avatar={avatar}
            isOwnProfile={isOwnProfile}
            connections={connections}
            onAvatarUpload={handleAvatarUpload}
            onEditClick={() => setShowEdit(true)}
          />

          <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />

          <ProfileTabContent
            activeTab={activeTab}
            user={user}
            isOwnProfile={isOwnProfile}
            skills={skills}
            connections={connections}
            savedPosts={savedPosts}
            onAddSkillsClick={() => setShowSkillsEdit(true)}
          />
        </div>
      </div>

      {showSkillsEdit && isOwnProfile && (
        <SkillsEditModal
          skills={skills}
          newSkill={newSkill}
          setNewSkill={setNewSkill}
          addSkill={addSkill}
          removeSkill={removeSkill}
          onClose={() => setShowSkillsEdit(false)}
        />
      )}

      {showEdit && isOwnProfile && (
        <EditProfileModal onClose={() => setShowEdit(false)} />
      )}
    </div>
  )
}

export default Profile;