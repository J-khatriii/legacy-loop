import { X } from "lucide-react";

const EditProfileModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg">
        <div className="border-b border-gray-100 px-6 py-4 flex justify-between items-center rounded-t-3xl">
          <h3 className="text-xl font-bold text-gray-800">Edit Profile</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-6">
          <p className="text-gray-600 mb-6">
            Profile editing functionality coming soon. You'll be able to
            update your bio, social links, and more.
          </p>
          <button
            onClick={onClose}
            className="w-full px-6 py-3 bg-gray-100 text-black rounded-xl font-medium hover:shadow-lg transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditProfileModal;
