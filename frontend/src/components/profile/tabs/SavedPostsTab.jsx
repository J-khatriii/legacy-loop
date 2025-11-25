import { BookMarked } from "lucide-react";

const SavedPostsTab = ({ savedPosts }) => {
  return (
    <div className="text-center py-12">
      <div className="inline-block p-4 bg-gray-50 rounded-full mb-4">
        <BookMarked size={32} className="text-gray-400" />
      </div>
      <p className="text-gray-500">No saved posts.</p>
    </div>
  )
}

export default SavedPostsTab
