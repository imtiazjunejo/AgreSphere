import { Leaf, MapPin } from 'lucide-react';

const QuickStats = () => {
  const quickStats = [
    { title: 'Active Crops', value: '3', icon: <Leaf className="w-6 h-6" />, color: 'from-green-500 to-emerald-500' },
    { title: 'Total Area', value: '25 acres', icon: <MapPin className="w-6 h-6" />, color: 'from-blue-500 to-cyan-500' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {quickStats.map((stat, index) => (
        <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-green-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            </div>
            <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color} text-white shadow-lg`}>
              {stat.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuickStats;