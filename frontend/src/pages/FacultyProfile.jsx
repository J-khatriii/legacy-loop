import { useEffect, useState } from "react";
import moment from "moment";
import { motion } from "framer-motion";
import {
  Camera,
  Mail,
  MapPin,
  Calendar,
  Edit,
  Users,
  X,
  Plus,
  Check,
} from "lucide-react";

const FacultyProfile = () => {
  const [admin, setAdmin] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [banner, setBanner] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");
  const [showSkillsEdit, setShowSkillsEdit] = useState(false);
  const [managedDepartments, setManagedDepartments] = useState([]);
  const [newDept, setNewDept] = useState("");
  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
  const localAdmin = JSON.parse(localStorage.getItem("user"));
    const savedProfile = JSON.parse(localStorage.getItem("adminProfile")) || {};
    const savedSkills = JSON.parse(localStorage.getItem("adminSkills")) || [];
    const savedDepts = JSON.parse(localStorage.getItem("adminDepartments")) || [];

    if (localAdmin) {
      setAdmin({
        ...localAdmin,
        avatar:
          savedProfile.avatar || localAdmin.avatar || `https://i.pravatar.cc/150?img=14`,
        cover_photo: savedProfile.cover_photo || savedProfile.cover || null,
        about: savedProfile.about || "",
        designation: savedProfile.designation || "System Administrator",
        officeLocation: savedProfile.officeLocation || "Admin Block, Main Campus",
        phone: savedProfile.phone || "",
      });
    }

    setSkills(savedSkills);
    setManagedDepartments(savedDepts);
  }, []);

  const updateAdmin = (field, value) => {
    const updated = { ...admin, [field]: value };
    setAdmin(updated);
    const saved = JSON.parse(localStorage.getItem("adminProfile")) || {};
    localStorage.setItem("adminProfile", JSON.stringify({ ...saved, ...updated }));
  }

  const addSkill = () => {
    const s = newSkill.trim();
    if (!s) return;
    if (!skills.includes(s)) {
      const updated = [...skills, s];
      setSkills(updated);
      localStorage.setItem("adminSkills", JSON.stringify(updated));
      setNewSkill("");
    }
  }

  const removeSkill = (s) => {
    const updated = skills.filter((x) => x !== s);
    setSkills(updated);
    localStorage.setItem("adminSkills", JSON.stringify(updated));
  }

  const addDept = () => {
    const d = newDept.trim();
    if (!d) return;
    if (!managedDepartments.includes(d)) {
      const updated = [...managedDepartments, d];
      setManagedDepartments(updated);
      localStorage.setItem("adminDepartments", JSON.stringify(updated));
      setNewDept("");
    }
  }

  const removeDept = (d) => {
    const updated = managedDepartments.filter((x) => x !== d);
    setManagedDepartments(updated);
    localStorage.setItem("adminDepartments", JSON.stringify(updated));
  }

  if (!admin)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="text-center text-gray-600">Loading admin profile...</div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 pb-12 overflow-visible">
      {/* Banner + floating header card */}
      <div className="relative">
        <div className="h-64 md:h-72 lg:h-80 bg-linear-to-r from-indigo-600 via-sky-500 to-rose-400 rounded-b-3xl shadow-xl overflow-hidden">
          {banner ? (
            <img src={banner} alt="banner" className="w-full h-full object-cover" />
          ) : null}
          <div className="absolute inset-0 bg-black/10 backdrop-blur-sm" />
        </div>

        <div className="max-w-5xl mx-auto px-6 -mt-12 relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-6 flex flex-col md:flex-row md:items-center gap-6 border border-white/40"
          >
            <div className="relative w-36 h-36 -mt-14 md:mt-0 shrink-0">
              <img
                src={avatar || admin.avatar}
                alt="avatar"
                className="w-36 h-36 rounded-full border-4 border-white object-cover shadow-md"
              />
              <label className="absolute bottom-1 right-1 bg-white p-2 rounded-full shadow cursor-pointer">
                <Camera size={16} />
                <input
                  type="file"
                  hidden
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    const url = URL.createObjectURL(file);
                    setAvatar(url);
                    updateAdmin("avatar", url);
                  }}
                />
              </label>
            </div>

            <div className="flex-1">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
                    {admin.name}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">{admin.designation}</p>

                  <p className="mt-3 text-gray-700 max-w-2xl">
                    {admin.about || "Leading campus operations, IT and academic coordination."}
                  </p>

                  <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Mail size={16} /> {admin.email}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={16} /> {admin.officeLocation}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={16} /> Joined {moment(admin.createdAt).format("MMM YYYY")}
                    </div>
                    <div className="flex items-center gap-2">
                      <Users size={16} /> {managedDepartments.length} departments
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShowEdit(true)}
                    className="px-4 py-2 rounded-lg bg-indigo-600 text-white shadow hover:brightness-105 flex items-center gap-2"
                  >
                    <Edit size={16} /> Edit
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Tabs */}
      <div className="sticky top-6 z-30">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-white rounded-full shadow p-1 flex items-center gap-1 justify-center">
            {[
              { id: "overview", label: "Overview" },
              { id: "skills", label: "Skills" },
              { id: "departments", label: "Departments" },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === t.id
                    ? "bg-indigo-600 text-white shadow-lg"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="max-w-5xl mx-auto px-6 mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Overview */}
          {activeTab === "overview" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="bg-white rounded-2xl p-6 shadow-sm border"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Administration Overview</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-gray-50 border">
                  <p className="text-xs text-gray-500">Designation</p>
                  <p className="font-medium mt-1">{admin.designation}</p>
                </div>
                <div className="p-4 rounded-lg bg-gray-50 border">
                  <p className="text-xs text-gray-500">Office</p>
                  <p className="font-medium mt-1">{admin.officeLocation}</p>
                </div>
                <div className="p-4 rounded-lg bg-gray-50 border">
                  <p className="text-xs text-gray-500">Phone</p>
                  <p className="font-medium mt-1">{admin.phone || "—"}</p>
                </div>
                <div className="p-4 rounded-lg bg-gray-50 border">
                  <p className="text-xs text-gray-500">Departments Managed</p>
                  <p className="font-medium mt-1">{managedDepartments.length}</p>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Recent Actions</h4>
                <div className="space-y-2">
                  <div className="flex items-start gap-3">
                    <div className="w-3 h-3 rounded-full bg-indigo-500 mt-2" />
                    <div>
                      <p className="text-sm font-medium">Published: Campus IT maintenance</p>
                      <p className="text-xs text-gray-500">2 days ago</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-3 h-3 rounded-full bg-emerald-500 mt-2" />
                    <div>
                      <p className="text-sm font-medium">Approved: New faculty hires</p>
                      <p className="text-xs text-gray-500">1 week ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Skills */}
          {activeTab === "skills" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="bg-white rounded-2xl p-6 shadow-sm border">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">Skills & Capabilities</h3>
                <button onClick={() => setShowSkillsEdit(true)} className="text-sm text-indigo-600 flex items-center gap-2">
                  <Plus size={14} /> Edit
                </button>
              </div>

              <div className="mt-4 flex flex-wrap gap-3">
                {skills.length === 0 ? (
                  <p className="text-gray-500 text-sm">No skills added yet.</p>
                ) : (
                  skills.map((s, i) => (
                    <span key={i} className="px-3 py-1 rounded-full bg-indigo-50 border text-indigo-700 text-sm flex items-center gap-2">
                      <Check size={14} /> {s}
                    </span>
                  ))
                )}
              </div>

              <div className="mt-6">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Skill Insights</h4>
                <p className="text-sm text-gray-600">Top skills help match admin tasks and delegate responsibilities effectively.</p>
              </div>
            </motion.div>
          )}

          {/* Departments */}
          {activeTab === "departments" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="bg-white rounded-2xl p-6 shadow-sm border">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">Managed Departments</h3>
                <div className="flex items-center gap-2">
                  <input value={newDept} onChange={(e) => setNewDept(e.target.value)} placeholder="Add department" className="px-3 py-2 border rounded-lg text-sm" />
                  <button onClick={addDept} className="px-3 py-2 bg-indigo-600 text-white rounded-lg text-sm flex items-center gap-2"><Plus size={14} /> Add</button>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-3">
                {managedDepartments.length === 0 ? (
                  <p className="text-gray-500 text-sm">No departments added.</p>
                ) : (
                  managedDepartments.map((d, i) => (
                    <div key={i} className="flex items-center gap-2 bg-gray-50 border rounded-full px-3 py-1">
                      <span className="text-sm text-gray-700">{d}</span>
                      <button onClick={() => removeDept(d)} className="p-1 rounded-full hover:bg-red-50"><X size={14} className="text-red-500" /></button>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          )}
        </div>

        {/* Right column */}
        <aside className="space-y-6">
          <div className="bg-white rounded-2xl p-4 shadow-sm border">
            <h4 className="text-sm font-medium text-gray-700">Contact</h4>
            <div className="mt-3 text-sm text-gray-600 space-y-2">
              <div className="flex items-center gap-2"><Mail size={16} /> {admin.email}</div>
              <div className="flex items-center gap-2"><MapPin size={16} /> {admin.officeLocation}</div>
              <div className="flex items-center gap-2"><Calendar size={16} /> Joined {moment(admin.createdAt).format("MMM YYYY")}</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm border">
            <h4 className="text-sm font-medium text-gray-700">Quick Actions</h4>
            <div className="mt-3 grid gap-2">
              <button className="w-full text-left px-3 py-2 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700">Post Announcement</button>
              <button className="w-full text-left px-3 py-2 rounded-lg border">Manage Users</button>
              <button className="w-full text-left px-3 py-2 rounded-lg border">Settings</button>
            </div>
          </div>
        </aside>
      </div>

      {/* Skills modal */}
      {showSkillsEdit && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <motion.div initial={{ scale: 0.97, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.18 }} className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Edit Skills</h3>
              <button onClick={() => setShowSkillsEdit(false)} className="text-gray-500"><X size={20} /></button>
            </div>

            <div className="space-y-3">
              <div className="flex gap-2">
                <input value={newSkill} onChange={(e) => setNewSkill(e.target.value)} className="flex-1 px-3 py-2 border rounded-lg" placeholder="New skill" />
                <button onClick={addSkill} className="px-3 py-2 bg-indigo-600 text-white rounded-lg flex items-center gap-2"><Plus size={14} /> Add</button>
              </div>

              <div className="flex flex-wrap gap-2">
                {skills.map((s, i) => (
                  <div key={i} className="flex items-center gap-2 bg-indigo-50 border rounded-full px-3 py-1">
                    <span className="text-indigo-700 text-sm">{s}</span>
                    <button onClick={() => removeSkill(s)} className="p-1 rounded-full hover:bg-red-50"><X size={14} className="text-red-500" /></button>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button onClick={() => setShowSkillsEdit(false)} className="px-4 py-2 bg-indigo-600 text-white rounded-lg">Done</button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Edit modal */}
      {showEdit && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <motion.div initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.18 }} className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Edit Admin Details</h3>
              <button onClick={() => setShowEdit(false)} className="text-gray-500"><X size={20} /></button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-700">Designation</label>
                <input type="text" value={admin.designation} onChange={(e) => updateAdmin("designation", e.target.value)} className="w-full border px-3 py-2 rounded-lg mt-1" />
              </div>

              <div>
                <label className="text-sm text-gray-700">Phone</label>
                <input type="text" value={admin.phone} onChange={(e) => updateAdmin("phone", e.target.value)} className="w-full border px-3 py-2 rounded-lg mt-1" />
              </div>

              <div>
                <label className="text-sm text-gray-700">Office Location</label>
                <input type="text" value={admin.officeLocation} onChange={(e) => updateAdmin("officeLocation", e.target.value)} className="w-full border px-3 py-2 rounded-lg mt-1" />
              </div>

              <div>
                <label className="text-sm text-gray-700">About</label>
                <textarea rows={3} value={admin.about} onChange={(e) => updateAdmin("about", e.target.value)} className="w-full border px-3 py-2 rounded-lg mt-1" />
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button onClick={() => setShowEdit(false)} className="px-4 py-2 bg-indigo-600 text-white rounded-lg">Save</button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default FacultyProfile;
