import { Activity } from 'lucide-react';

const RecentActivities = () => {
  const activities = [
    { date: '2025-05-15', task: 'Fertilizer application completed', completed: true, type: 'crop' },
    { date: '2025-05-18', task: 'Pest control spraying scheduled', completed: false, type: 'maintenance' },
    { date: '2025-05-20', task: 'Irrigation system check', completed: false, type: 'maintenance' },
    { date: '2025-05-22', task: 'Soil testing results received', completed: true, type: 'analysis' }
  ];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Recent Activities</h2>
        <Activity className="text-green-600" size={24} />
      </div>

      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className={`w-3 h-3 rounded-full mt-2 ${
              activity.completed ? 'bg-green-500' : 'bg-gray-300'
            }`}></div>
            <div className="flex-1">
              <p className={`font-medium ${activity.completed ? 'text-gray-900' : 'text-gray-700'}`}>
                {activity.task}
              </p>
              <div className="flex items-center justify-between mt-1">
                <p className="text-sm text-gray-500">{activity.date}</p>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  activity.type === 'crop' ? 'bg-green-100 text-green-700' :
                  activity.type === 'maintenance' ? 'bg-blue-100 text-blue-700' :
                  'bg-purple-100 text-purple-700'
                }`}>
                  {activity.type}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-6 bg-gradient-to-r from-green-600 to-teal-600 text-white py-3 rounded-xl font-semibold hover:from-green-700 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl">
        View All Activities
      </button>
    </div>
  );
};

export default RecentActivities;