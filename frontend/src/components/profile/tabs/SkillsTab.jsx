import { Award, Plus } from "lucide-react";

const SkillsTab = ({ skills, isOwnProfile, onAddSkillsClick }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Skills & Interests</h2>
        {isOwnProfile && (
          <button
            onClick={onAddSkillsClick}
            className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 transition p-2 px-4 rounded-xl shadow text-sm font-medium"
          >
            <Plus size={16} />
            Add Skills
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-3">
        {skills.length === 0 ? (
          <div className="w-full text-center py-12">
            <div className="inline-block p-4 bg-gray-50 rounded-full mb-4">
              <Award size={32} className="text-gray-400" />
            </div>
            <p className="text-gray-500">No skills added yet.</p>
          </div>
        ) : (
          skills.map((skill, index) => (
            <span
              key={index}
              className="px-4 py-2.5 bg-linear-to-r from-indigo-50 to-purple-50 text-indigo-700 rounded-xl text-sm font-medium border border-indigo-100 hover:shadow-md transition-shadow"
            >
              {skill}
            </span>
          ))
        )}
      </div>
    </div>
  )
}

export default SkillsTab
