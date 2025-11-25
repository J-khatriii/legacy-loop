import AboutTab from "./tabs/AboutTab";
import AcademicsTab from "./tabs/AcademicsTab";
import SavedPostsTab from "./tabs/SavedPostsTab";
import SkillsTab from "./tabs/SkillsTab";
import ConnectionsTab from "./tabs/ConnectionsTab";

const ProfileTabContent = ({
  activeTab,
  user,
  isOwnProfile,
  skills,
  connections,
  savedPosts,
  onAddSkillsClick,
}) => {
  return (
    <div className="p-6 md:p-8">
      {activeTab === "about" && <AboutTab user={user} />}
      {activeTab === "academics" && <AcademicsTab user={user} />}
      {activeTab === "saved" && <SavedPostsTab savedPosts={savedPosts} />}
      {activeTab === "skills" && (
        <SkillsTab
          skills={skills}
          isOwnProfile={isOwnProfile}
          onAddSkillsClick={onAddSkillsClick}
        />
      )}
      {activeTab === "connections" && <ConnectionsTab connections={connections} />}
    </div>
  )
}

export default ProfileTabContent;
