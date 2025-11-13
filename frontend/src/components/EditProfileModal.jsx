import { X } from "lucide-react";
import { useState } from "react";

const EditProfileModal = ({ open, onClose, user, onSave }) => {
  if (!open) return null;

  const [form, setForm] = useState({
    name: user.name,
    username: user.username,
    bio: user.bio,
    location: user.location,
    website: user.website,
    twitter: user.socials.twitter,
    instagram: user.socials.instagram,
    github: user.socials.github,
    linkedin: user.socials.linkedin,
  });

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur flex items-center justify-center z-999">
      <div className="bg-white w-full max-w-xl rounded-xl shadow-xl p-6 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-500 hover:text-black"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-semibold mb-5">Edit Profile</h2>

        {/* Inputs */}
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Full Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="w-full mt-1 bg-gray-100 p-2 rounded"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Username</label>
            <input
              type="text"
              value={form.username}
              onChange={(e) => handleChange("username", e.target.value)}
              className="w-full mt-1 bg-gray-100 p-2 rounded"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Bio</label>
            <textarea
              value={form.bio}
              onChange={(e) => handleChange("bio", e.target.value)}
              className="w-full mt-1 bg-gray-100 p-2 rounded h-20 resize-none"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Location</label>
            <input
              type="text"
              value={form.location}
              onChange={(e) => handleChange("location", e.target.value)}
              className="w-full mt-1 bg-gray-100 p-2 rounded"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Website</label>
            <input
              type="text"
              value={form.website}
              onChange={(e) => handleChange("website", e.target.value)}
              className="w-full mt-1 bg-gray-100 p-2 rounded"
            />
          </div>

          {/* Social Links */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Twitter</label>
              <input
                type="text"
                value={form.twitter}
                onChange={(e) => handleChange("twitter", e.target.value)}
                className="w-full mt-1 bg-gray-100 p-2 rounded"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Instagram</label>
              <input
                type="text"
                value={form.instagram}
                onChange={(e) => handleChange("instagram", e.target.value)}
                className="w-full mt-1 bg-gray-100 p-2 rounded"
              />
            </div>

            <div>
              <label className="text-sm font-medium">GitHub</label>
              <input
                type="text"
                value={form.github}
                onChange={(e) => handleChange("github", e.target.value)}
                className="bg-gray-100 mt-1 p-2 rounded w-full"
              />
            </div>

            <div>
              <label className="text-sm font-medium">LinkedIn</label>
              <input
                type="text"
                value={form.linkedin}
                onChange={(e) => handleChange("linkedin", e.target.value)}
                className="bg-gray-100 mt-1 p-2 rounded w-full"
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end mt-6">
          <button
            onClick={() => onSave(form)}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
