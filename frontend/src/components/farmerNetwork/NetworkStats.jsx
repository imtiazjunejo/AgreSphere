import { Users, UserCheck, Clock } from "lucide-react";

const NetworkStats = ({ totalFarmers }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-green-100 mb-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">Total Farmers Available</p>
          <p className="text-3xl font-bold text-gray-900">{totalFarmers}</p>
        </div>
        <div className="p-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg">
          <Users className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};

export default NetworkStats;