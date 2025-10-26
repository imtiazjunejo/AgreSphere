import { UserPlus, MapPin, UserCheck, Clock } from "lucide-react";


const FarmerCard = ({ farmer, onConnect }) => {
  const getConnectionButton = () => {
    switch (farmer.connectionStatus) {
      case 'pending':
        return (
          <button
            disabled
            className="mt-4 flex items-center gap-2 bg-gray-400 text-white px-4 py-2 rounded-lg cursor-not-allowed w-full justify-center"
          >
            <Clock size={18} />
            Pending
          </button>
        );
      case 'accepted':
        return (
          <button
            disabled
            className="mt-4 flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg cursor-not-allowed w-full justify-center"
          >
            <UserCheck size={18} />
            Connected
          </button>
        );
      default:
        return (
          <button
            onClick={() => onConnect(farmer._id)}
            className="mt-4 flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition w-full justify-center"
          >
            <UserPlus size={18} />
            Connect
          </button>
        );
    }
  };

  // Generate initials for default avatar
  const getInitials = () => {
    const first = farmer.firstName?.charAt(0)?.toUpperCase() || '';
    const last = farmer.lastName?.charAt(0)?.toUpperCase() || '';
    return first + last || 'U';
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 flex flex-col items-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="relative mb-4">
        {farmer.profilePic ? (
          <img
            src={farmer.profilePic.startsWith('http') ? farmer.profilePic : `http://localhost:3000${farmer.profilePic}`}
            alt={`${farmer.firstName} ${farmer.lastName}`}
            className="w-20 h-20 rounded-full object-cover border-4 border-green-100"
            onError={(e) => {
              // Hide the image and show initials instead
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
        ) : null}

        {/* Default avatar with initials */}
        <div
          className={`w-20 h-20 rounded-full border-4 border-green-100 flex items-center justify-center bg-gradient-to-br from-green-100 to-blue-100 text-green-700 font-bold text-xl ${
            farmer.profilePic ? 'hidden' : 'flex'
          }`}
        >
          {getInitials()}
        </div>

        {farmer.connectionStatus === 'accepted' && (
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
            <UserCheck size={12} className="text-white" />
          </div>
        )}
      </div>

      <h3 className="text-lg font-bold text-gray-900 text-center mb-1">
        {farmer.firstName || 'Unknown'} {farmer.lastName || 'User'}
      </h3>

      <p className="text-green-600 font-medium text-sm mb-2 capitalize">
        {farmer.role || 'User'}
      </p>

      <div className="flex items-center text-gray-600 text-sm mb-3">
        <MapPin size={14} className="mr-1 text-green-500" />
        {farmer.location || "Location not specified"}
      </div>

      {farmer.bio && (
        <p className="text-gray-700 text-sm text-center mb-4 line-clamp-2">
          {farmer.bio}
        </p>
      )}

      {getConnectionButton()}
    </div>
  );
};

export default FarmerCard;