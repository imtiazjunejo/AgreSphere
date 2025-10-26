import { Droplet, Sun, CloudRain, AlertTriangle, MapPin } from 'lucide-react';

const WeatherWidget = () => {
  const weatherData = {
    temp: 28,
    humidity: 65,
    rainfall: 12,
    alerts: ['Heavy rain expected tomorrow']
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Weather Today</h2>
        <div className="flex items-center text-sm text-gray-500">
          <MapPin size={16} className="mr-1" />
          Your Location
        </div>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="p-3 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl mr-4">
            <Sun className="text-white" size={32} />
          </div>
          <div>
            <p className="text-4xl font-bold text-gray-900">{weatherData.temp}°C</p>
            <p className="text-gray-600">Sunny & Clear</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex items-center">
          <Droplet className="text-blue-500 mr-2" size={20} />
          <div>
            <p className="text-sm text-gray-600">Humidity</p>
            <p className="font-semibold">{weatherData.humidity}%</p>
          </div>
        </div>
        <div className="flex items-center">
          <CloudRain className="text-blue-600 mr-2" size={20} />
          <div>
            <p className="text-sm text-gray-600">Rainfall</p>
            <p className="font-semibold">{weatherData.rainfall}mm</p>
          </div>
        </div>
      </div>

      {weatherData.alerts.length > 0 && (
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-4">
          <div className="flex items-start">
            <AlertTriangle className="text-yellow-600 mr-3 mt-0.5" size={20} />
            <div>
              <p className="font-semibold text-yellow-800">Weather Alert</p>
              <p className="text-sm text-yellow-700 mt-1">{weatherData.alerts[0]}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherWidget;