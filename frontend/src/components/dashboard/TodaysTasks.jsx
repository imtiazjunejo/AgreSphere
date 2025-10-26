import { Clipboard } from 'lucide-react';

const TodaysTasks = () => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Today's Tasks</h2>
        <div className="flex items-center space-x-2">
          <Clipboard className="text-green-600" size={20} />
          <span className="text-sm text-gray-600">3 pending</span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-100">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div>
              <p className="font-semibold text-gray-900">Fertilizer Application</p>
              <p className="text-sm text-gray-600">Rice field - Section A</p>
            </div>
          </div>
          <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg font-medium hover:bg-yellow-600 transition-colors">
            Start
          </button>
        </div>

        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-100">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <div>
              <p className="font-semibold text-gray-900">Irrigation Check</p>
              <p className="text-sm text-gray-600">Automated system maintenance</p>
            </div>
          </div>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors">
            Check
          </button>
        </div>

        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <div>
              <p className="font-semibold text-gray-900">Pest Monitoring</p>
              <p className="text-sm text-gray-600">Weekly field inspection</p>
            </div>
          </div>
          <button className="px-4 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors">
            Inspect
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodaysTasks;