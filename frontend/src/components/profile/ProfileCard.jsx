import { Camera, Mail, Phone, MapPin, Edit3, X } from "lucide-react";

const API_BASE_URL = "http://localhost:3000";

const ProfileCard = ({ user, editing, onEditToggle, onFileChange, previewImages }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Cover Image */}
      <div className="h-32 bg-gradient-to-r from-green-400 to-blue-500 relative">
        <img
          src={previewImages.coverImage || `${API_BASE_URL}/public/uploads/default-cover.jpg`}
          alt="Cover"
          className="w-full h-full object-cover"
          onError={(e) => (e.target.src = `${API_BASE_URL}/public/uploads/default-cover.jpg`)}
        />
        {editing && (
          <label className="absolute top-4 right-4 bg-white/90 p-2 rounded-full cursor-pointer hover:bg-white transition-colors shadow-lg">
            <Camera className="w-5 h-5 text-gray-700" />
            <input
              type="file"
              name="coverImage"
              onChange={onFileChange}
              className="hidden"
              accept="image/*"
            />
          </label>
        )}
      </div>

      {/* Profile Image */}
      <div className="relative px-6 pb-6">
        <div className="absolute -top-16 left-6 w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center shadow-lg">
          {previewImages.profilePic ? (
            <img
              src={previewImages.profilePic}
              alt="Profile"
              className="w-full h-full object-cover"
              onError={(e) => (e.target.src = "")}
            />
          ) : (
            <span className="text-4xl font-bold text-gray-600">
              {(user?.firstName || "U").charAt(0).toUpperCase()}
            </span>
          )}

          {editing && (
            <label className="absolute bottom-2 right-2 bg-green-500 p-2 rounded-full cursor-pointer hover:bg-green-600 transition-colors">
              <Camera className="w-4 h-4 text-white" />
              <input
                type="file"
                name="profilePic"
                onChange={onFileChange}
                className="hidden"
                accept="image/*"
              />
            </label>
          )}
        </div>

        {/* Profile Info */}
        <div className="pt-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            {user?.firstName} {user?.lastName}
          </h2>
          <p className="text-green-600 font-medium mb-4 capitalize">{user?.role}</p>

          {/* Contact Info */}
          <div className="space-y-3">
            {user?.email && (
              <div className="flex items-center text-gray-600">
                <Mail className="w-4 h-4 mr-3 text-gray-400" />
                <span className="text-sm">{user.email}</span>
              </div>
            )}
            {user?.phone && (
              <div className="flex items-center text-gray-600">
                <Phone className="w-4 h-4 mr-3 text-gray-400" />
                <span className="text-sm">{user.phone}</span>
              </div>
            )}
            {user?.location && (
              <div className="flex items-center text-gray-600">
                <MapPin className="w-4 h-4 mr-3 text-gray-400" />
                <span className="text-sm">{user.location}</span>
              </div>
            )}
          </div>

          {/* Bio */}
          {user?.bio && (
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-700 leading-relaxed">{user.bio}</p>
            </div>
          )}

          {/* Action Button */}
          <button
            onClick={onEditToggle}
            className={`w-full mt-6 py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center ${
              editing
                ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                : 'bg-green-600 text-white hover:bg-green-700 shadow-lg hover:shadow-xl'
            }`}
          >
            {editing ? (
              <>
                <X className="w-4 h-4 mr-2" />
                Cancel Editing
              </>
            ) : (
              <>
                <Edit3 className="w-4 h-4 mr-2" />
                Edit Profile
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;