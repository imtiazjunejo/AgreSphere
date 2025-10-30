import { Shield, Calendar, User, MapPin, Phone } from "lucide-react";

const ProfileStats = ({ user }) => {
  const formatDate = (dateString) => {
    if (!dateString) return '2024';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between py-2 border-b border-gray-100">
          <div className="flex items-center">
            <Shield className="w-5 h-5 text-green-500 mr-3" />
            <span className="text-sm text-gray-600">Account Status</span>
          </div>
          <span className="text-sm font-medium text-green-600">Active</span>
        </div>

        <div className="flex items-center justify-between py-2 border-b border-gray-100">
          <div className="flex items-center">
            <Calendar className="w-5 h-5 text-blue-500 mr-3" />
            <span className="text-sm text-gray-600">Member Since</span>
          </div>
          <span className="text-sm font-medium text-gray-900">
            {formatDate(user?.createdAt)}
          </span>
        </div>

        <div className="flex items-center justify-between py-2">
          <div className="flex items-center">
            <User className="w-5 h-5 text-purple-500 mr-3" />
            <span className="text-sm text-gray-600">Role</span>
          </div>
          <span className="text-sm font-medium text-gray-900 capitalize">
            {user?.role || 'Farmer'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfileStats;