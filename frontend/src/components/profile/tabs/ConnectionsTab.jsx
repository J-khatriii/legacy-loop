import { Users } from "lucide-react";

const ConnectionsTab = ({ connections }) => {
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-6">Connections</h2>
      {connections.length === 0 ? (
        <div className="text-center py-12">
          <div className="inline-block p-4 bg-gray-50 rounded-full mb-4">
            <Users size={32} className="text-gray-400" />
          </div>
          <p className="text-gray-500">No connections yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {connections.map((conn) => (
            <div
              key={conn._id}
              className="p-5 bg-linear-to-br from-gray-50 to-gray-100/50 rounded-2xl hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-4">
                <img
                  src={
                    conn.profileImage || `https://i.pravatar.cc/150?img=1`
                  }
                  className="w-14 h-14 rounded-xl object-cover"
                  alt={conn.name}
                />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 truncate">
                    {conn.name}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {conn.department || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ConnectionsTab;
