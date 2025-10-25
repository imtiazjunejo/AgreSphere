import { Shield, Calendar } from "lucide-react";

const ProfileStats = ({ user }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mt-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Stats</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Shield className="w-5 h-5 text-green-500 mr-3" />
            <span className="text-sm text-gray-600">Account Status</span>
          </div>
          <span className="text-sm font-medium text-green-600">Active</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Calendar className="w-5 h-5 text-blue-500 mr-3" />
            <span className="text-sm text-gray-600">Member Since</span>
          </div>
          <span className="text-sm font-medium text-gray-900">
            {user?.createdAt ? new Date(user.createdAt).getFullYear() : '2024'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfileStats;