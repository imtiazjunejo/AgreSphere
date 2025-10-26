import { Calendar } from 'lucide-react';
import QuickStats from '../components/dashboard/QuickStats';
import WeatherWidget from '../components/dashboard/WeatherWidget';
import RecentActivities from '../components/dashboard/RecentActivities';
import TodaysTasks from '../components/dashboard/TodaysTasks';
import QuickActions from '../components/dashboard/QuickActions';

const Dashboard = () => {

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome back! 👋</h1>
          <p className="text-gray-600 text-lg">Here's what's happening on your farm today</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="bg-white p-4 rounded-2xl shadow-lg border border-green-100 flex items-center">
            <Calendar className="text-green-600 mr-3" size={20} />
            <div>
              <div className="text-sm text-gray-500">Today</div>
              <div className="font-semibold text-gray-900">May 14, 2025</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <QuickStats />

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Weather & Activities */}
        <div className="space-y-8">
          {/* Weather Widget */}
          <WeatherWidget />

          {/* Recent Activities */}
          <RecentActivities />
        </div>

        {/* Right Column - Quick Actions & Tasks */}
        <div className="lg:col-span-2 space-y-8">
          <TodaysTasks />
          <QuickActions />
        </div>
      </div>
    </div>
  );
};



export default Dashboard;