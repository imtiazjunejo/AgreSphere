import { Clock, UserCheck, X } from "lucide-react";

const ConnectionRequests = ({ pendingRequests, onAccept, onReject }) => {
  if (!pendingRequests || pendingRequests.length === 0) {
    return (
      <div className="text-center py-12">
        <Clock size={48} className="text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500 text-lg">No pending connection requests</p>
        <p className="text-gray-400 text-sm mt-1">When someone sends you a connection request, it will appear here</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Connection Requests</h3>
        <p className="text-gray-600">People who want to connect with you</p>
      </div>

      {pendingRequests.map((request) => (
        <div key={request._id} className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Profile Picture */}
              <div className="relative">
                {request.sender?.profilePic ? (
                  <img
                    src={request.sender.profilePic.startsWith('http') ? request.sender.profilePic : `http://localhost:3000${request.sender.profilePic}`}
                    alt={`${request.sender.firstName} ${request.sender.lastName}`}
                    className="w-16 h-16 rounded-full object-cover border-2 border-green-100"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full border-2 border-green-100 flex items-center justify-center bg-gradient-to-br from-green-100 to-blue-100 text-green-700 font-bold text-xl">
                    {(request.sender?.firstName?.charAt(0) || '') + (request.sender?.lastName?.charAt(0) || '') || 'U'}
                  </div>
                )}
              </div>

              {/* User Info */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900">
                  {request.sender?.firstName} {request.sender?.lastName}
                </h4>
                <p className="text-green-600 font-medium text-sm capitalize">
                  {request.sender?.role}
                </p>
                <p className="text-gray-600 text-sm flex items-center mt-1">
                  <span className="mr-1">📍</span>
                  {request.sender?.location || "Location not specified"}
                </p>
                {request.sender?.bio && (
                  <p className="text-gray-700 text-sm mt-2 line-clamp-2 max-w-md">
                    {request.sender.bio}
                  </p>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <button
                onClick={() => onAccept(request._id)}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                <UserCheck size={16} />
                Accept
              </button>
              <button
                onClick={() => onReject(request._id)}
                className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors"
              >
                <X size={16} />
                Decline
              </button>
            </div>
          </div>

          {/* Request Time */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-500 flex items-center">
              <Clock size={12} className="mr-1" />
              Sent {new Date(request.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ConnectionRequests;