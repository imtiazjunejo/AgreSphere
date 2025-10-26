import { Clipboard, CloudRain, Users, Activity } from 'lucide-react';

const QuickActions = () => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
      <div className="grid grid-cols-2 gap-4">
        <button className="flex flex-col items-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
          <Clipboard className="text-green-600 mb-3 group-hover:scale-110 transition-transform" size={28} />
          <span className="text-sm font-semibold text-gray-700">Add New Task</span>
        </button>

        <button className="flex flex-col items-center p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
          <CloudRain className="text-blue-600 mb-3 group-hover:scale-110 transition-transform" size={28} />
          <span className="text-sm font-semibold text-gray-700">Weather Forecast</span>
        </button>

        <button className="flex flex-col items-center p-6 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl border border-purple-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
          <Users className="text-purple-600 mb-3 group-hover:scale-110 transition-transform" size={28} />
          <span className="text-sm font-semibold text-gray-700">Connect Farmers</span>
        </button>

        <button className="flex flex-col items-center p-6 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl border border-orange-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
          <Activity className="text-orange-600 mb-3 group-hover:scale-110 transition-transform" size={28} />
          <span className="text-sm font-semibold text-gray-700">View Reports</span>
        </button>
      </div>
    </div>
  );
};

export default QuickActions;