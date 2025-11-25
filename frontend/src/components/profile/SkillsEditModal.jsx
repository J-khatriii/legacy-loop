import { X, Plus } from "lucide-react";

const SkillsEditModal = ({
  skills,
  newSkill,
  setNewSkill,
  addSkill,
  removeSkill,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center rounded-t-3xl">
          <h3 className="text-xl font-bold text-gray-800">Manage Skills</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex gap-2">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addSkill()}
              placeholder="Enter a skill (e.g., React, Python)"
              className="border-2 border-gray-200 flex-1 px-4 py-3 rounded-xl text-sm focus:border-indigo-500 focus:outline-none"
            />
            <button
              onClick={addSkill}
              className="px-6 py-3 bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all"
            >
              <Plus size={20} />
            </button>
          </div>

          <div className="flex flex-wrap gap-3">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="flex items-center gap-2 px-4 py-2.5 bg-linear-to-r from-indigo-50 to-purple-50 text-indigo-700 rounded-xl text-sm font-medium border border-indigo-100"
              >
                {skill}
                <button
                  onClick={() => removeSkill(skill)}
                  className="p-1 hover:bg-red-100 rounded-full transition-colors"
                >
                  <X size={14} className="text-red-500" />
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-100 px-6 py-4">
          <button
            onClick={onClose}
            className="w-full px-6 py-3 bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  )
}

export default SkillsEditModal;
