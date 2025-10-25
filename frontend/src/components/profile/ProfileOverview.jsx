import { User, Edit3 } from "lucide-react";

const ProfileOverview = ({ onEditToggle }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <div className="text-center py-12">
        <div className="w-24 h-24 bg-gradient-to-br from-green-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <User className="w-12 h-12 text-green-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Profile Complete</h3>
        <p className="text-gray-600 mb-6">Your profile information is up to date. Click edit to make changes.</p>
        <button
          onClick={onEditToggle}
          className="bg-green-600 text-white py-3 px-8 rounded-lg font-medium hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 flex items-center mx-auto"
        >
          <Edit3 className="w-5 h-5 mr-2" />
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default ProfileOverview;