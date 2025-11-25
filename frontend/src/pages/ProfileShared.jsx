import { Camera } from "lucide-react";

export const Cover = ({ coverUrl, onChangeCover }) => (
  <div className="h-56 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-b-3xl relative">
    {coverUrl ? (
      <img
        src={coverUrl}
        alt="cover"
        className="w-full h-full object-cover rounded-b-3xl"
      />
    ) : null}
    <label className="absolute right-6 bottom-6 bg-black/40 text-white px-3 py-1 rounded-lg cursor-pointer text-sm backdrop-blur">
      <Camera size={16} />
      <input type="file" hidden onChange={onChangeCover} />
    </label>
  </div>
);

export const AvatarWithBadge = ({ avatarUrl, roleLabel, onChangeAvatar }) => (
  <div className="relative w-32 h-32">
    <img
      src={avatarUrl || `https://i.pravatar.cc/150`}
      alt="avatar"
      className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-md"
    />
    <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-xs px-3 py-1 rounded-full">
      {roleLabel}
    </span>
    <label className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow cursor-pointer">
      <Camera size={14} />
      <input type="file" hidden onChange={onChangeAvatar} />
    </label>
  </div>
);

export const StatCard = ({ icon, value, label }) => (
  <div className="p-3 bg-gray-50 rounded-xl shadow-sm text-center">
    <div className="text-indigo-600 mb-1">{icon}</div>
    <div className="text-xl font-semibold">{value}</div>
    <div className="text-sm text-gray-600">{label}</div>
  </div>
);

export const SectionCard = ({ title, children }) => (
  <div className="bg-white rounded-xl shadow p-4">
    <h3 className="font-semibold mb-3">{title}</h3>
    <div>{children}</div>
  </div>
);
