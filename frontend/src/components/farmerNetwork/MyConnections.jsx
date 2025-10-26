import { UserCheck, MessageCircle, MapPin } from "lucide-react";

const MyConnections = ({ connections, onMessage }) => {
  if (!connections || connections.length === 0) {
    return (
      <div className="text-center py-12">
        <UserCheck size={48} className="text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500 text-lg">No connections yet</p>
        <p className="text-gray-400 text-sm mt-1">Start connecting with farmers to build your network!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">My Connections</h3>
        <p className="text-gray-600">Farmers you've connected with</p>
      </div>

      {connections.map((connection) => {
        // Determine which user is the connection (not the current user)
        const connectedUser = connection.sender._id === connection._id
          ? connection.receiver
          : connection.sender;

        return (
          <div key={connection._id} className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {/* Profile Picture */}
                <div className="relative">
                  {connectedUser?.profilePic ? (
                    <img
                      src={connectedUser.profilePic.startsWith('http') ? connectedUser.profilePic : `http://localhost:3000${connectedUser.profilePic}`}
                      alt={`${connectedUser.firstName} ${connectedUser.lastName}`}
                      className="w-16 h-16 rounded-full object-cover border-2 border-green-100"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full border-2 border-green-100 flex items-center justify-center bg-gradient-to-br from-green-100 to-blue-100 text-green-700 font-bold text-xl">
                      {(connectedUser?.firstName?.charAt(0) || '') + (connectedUser?.lastName?.charAt(0) || '') || 'U'}
                    </div>
                  )}

                  {/* Connected indicator */}
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                    <UserCheck size={12} className="text-white" />
                  </div>
                </div>

                {/* User Info */}
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-gray-900">
                    {connectedUser?.firstName} {connectedUser?.lastName}
                  </h4>
                  <p className="text-green-600 font-medium text-sm capitalize">
                    {connectedUser?.role}
                  </p>
                  <p className="text-gray-600 text-sm flex items-center mt-1">
                    <MapPin size={12} className="mr-1 text-green-500" />
                    {connectedUser?.location || "Location not specified"}
                  </p>
                  {connectedUser?.bio && (
                    <p className="text-gray-700 text-sm mt-2 line-clamp-2 max-w-md">
                      {connectedUser.bio}
                    </p>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <div className="flex flex-col space-y-2">
                <button
                  onClick={() => onMessage(connectedUser._id)}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  <MessageCircle size={16} />
                  Message
                </button>
              </div>
            </div>

            {/* Connection Info */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-500 flex items-center">
                <UserCheck size={12} className="mr-1" />
                Connected since {new Date(connection.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MyConnections;