import { useState } from 'react';
import {
  Calendar, Droplet, Sun, CloudRain,
  AlertTriangle, TrendingUp, Clipboard,
  MapPin, Heart, MessageCircle, UserPlus,
  Share2, Info, Thermometer, Wind
} from 'lucide-react';
import {
  LineChartComponent,
  BarChartComponent,
  PieChartComponent
} from '../components/Charts.jsx';
import CropGuidance from './CropGuidance.jsx';
import WeatherForcast from './WeatherForcast.jsx';
import FarmerNetwork from './FarmerNetwork.jsx';
import LandManagement from './LandManagement.jsx';

const Dashboard = () => {
  // Sample data
  const weatherData = {
    temp: 28,
    humidity: 65,
    rainfall: 12,
    alerts: ['Heavy rain expected tomorrow']
  };

  const cropPerformance = [
    { name: 'Rice', yield: 85, cost: 42000, profit: 58000 },
    { name: 'Wheat', yield: 72, cost: 38000, profit: 45000 }
  ];

  const activities = [
    { date: '2025-05-15', task: 'Fertilizer application', completed: true },
    { date: '2025-05-18', task: 'Pest control spraying', completed: false }
  ];

  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="p-6 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Agrisphere Dashboard</h1>
        <div className="flex items-center space-x-4">
          <div className="bg-white p-3 rounded-lg shadow-sm flex items-center">
            <Calendar className="text-green-600 mr-2" />
            <span>May 14, 2025</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-gray-200 mb-6 overflow-x-auto">
        {['dashboard', 'crops', 'weather', 'network', 'land'].map(tab => (
          <button
            key={tab}
            className={`px-4 py-2 font-medium whitespace-nowrap ${
              activeTab === tab 
                ? 'border-b-2 border-green-600 text-green-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        {activeTab === 'dashboard' && (
          <>
            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <DashboardCard 
                icon={<TrendingUp size={24} />}
                title="Current Crop" 
                value="Rice (45 days)"
                color="bg-green-100 text-green-800"
              />
              <DashboardCard 
                icon={<Droplet size={24} />}
                title="Irrigation Needed" 
                value="Tomorrow"
                color="bg-blue-100 text-blue-800"
              />
              <DashboardCard 
                icon={<Clipboard size={24} />}
                title="Pending Tasks" 
                value="3"
                color="bg-yellow-100 text-yellow-800"
              />
              <DashboardCard 
                icon={<AlertTriangle size={24} />}
                title="Alerts" 
                value={weatherData.alerts.length}
                color="bg-red-100 text-red-800"
              />
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Crop Performance */}
              <div className="lg:col-span-2">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Crop Performance</h2>
                  <select className="border rounded-md px-3 py-1 text-sm">
                    <option>Last 3 Months</option>
                    <option>Current Season</option>
                    <option>Annual</option>
                  </select>
                </div>
                <div className="h-80 w-full">
                  <LineChartComponent data={cropPerformance} />
                </div>
              </div>

              {/* Weather Widget */}
              <WeatherWidget weatherData={weatherData} />
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">Financial Summary</h2>
                <div className="h-64 w-full">
                  <BarChartComponent data={cropPerformance} />
                </div>
              </div>
              
              <RecentActivities activities={activities} />
              
              <div>
                <h2 className="text-xl font-semibold mb-4">Crop Distribution</h2>
                <div className="h-64 w-full">
                  <PieChartComponent data={cropPerformance} />
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'crops' && <CropGuidance />}
        {activeTab === 'weather' && <WeatherForcast />}
        {activeTab === 'network' && <FarmerNetwork />}
        {activeTab === 'land' && <LandManagement />}
      </div>
    </div>
  );
};

// Reusable Components
const DashboardCard = ({ icon, title, value, color }) => (
  <div className={`p-6 rounded-xl shadow-sm flex items-center ${color}`}>
    <div className="mr-4 p-3 bg-white bg-opacity-50 rounded-full">
      {icon}
    </div>
    <div>
      <p className="text-sm font-medium">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  </div>
);

const WeatherWidget = ({ weatherData }) => (
  <div>
    <h2 className="text-xl font-semibold mb-4">Weather</h2>
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center">
        <Sun className="text-yellow-500 mr-2" size={32} />
        <div>
          <p className="text-3xl font-bold">{weatherData.temp}°C</p>
          <p className="text-gray-500">Sunny</p>
        </div>
      </div>
      <div className="text-right">
        <p className="flex items-center">
          <Droplet className="mr-1" size={16} />
          Humidity: {weatherData.humidity}%
        </p>
        <p className="flex items-center">
          <CloudRain className="mr-1" size={16} />
          Rainfall: {weatherData.rainfall}mm
        </p>
      </div>
    </div>
    
    {weatherData.alerts.length > 0 && (
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
        <div className="flex">
          <AlertTriangle className="text-yellow-500 mr-2" />
          <div>
            <p className="font-medium">Weather Alert</p>
            <p className="text-sm">{weatherData.alerts[0]}</p>
          </div>
        </div>
      </div>
    )}
  </div>
);

const RecentActivities = ({ activities }) => (
  <div>
    <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
    <ul className="space-y-3">
      {activities.map((activity, index) => (
        <li key={index} className="flex items-start">
          <div className={`h-2 w-2 mt-2 rounded-full mr-3 ${activity.completed ? 'bg-green-500' : 'bg-gray-300'}`}></div>
          <div>
            <p className="font-medium">{activity.task}</p>
            <p className="text-sm text-gray-500">{activity.date}</p>
          </div>
        </li>
      ))}
    </ul>
  </div>
);


export default Dashboard;