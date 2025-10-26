import { Sun, Cloud, CloudRain, CloudSnow, CloudDrizzle, Thermometer, Droplet, Wind } from 'lucide-react';

const WeatherForcast = () => {
  const forecast = [
    {
      day: 'Today',
      date: 'May 15',
      temp: { high: 32, low: 24 },
      condition: 'sunny',
      precipitation: 10,
      humidity: 65,
      wind: 12
    },
    {
      day: 'Tomorrow',
      date: 'May 16',
      temp: { high: 29, low: 23 },
      condition: 'rain',
      precipitation: 80,
      humidity: 85,
      wind: 18
    },
    {
      day: 'Wed',
      date: 'May 17',
      temp: { high: 30, low: 25 },
      condition: 'cloudy',
      precipitation: 20,
      humidity: 70,
      wind: 10
    }
  ];

  const getWeatherIcon = (condition) => {
    switch(condition) {
      case 'sunny': return <Sun className="text-yellow-500" size={32} />;
      case 'rain': return <CloudRain className="text-blue-500" size={32} />;
      case 'cloudy': return <Cloud className="text-gray-500" size={32} />;
      default: return <Sun className="text-yellow-500" size={32} />;
    }
  };

  const alerts = [
    'Heavy rainfall expected tomorrow - consider delaying irrigation',
    'High humidity may increase pest risk - monitor crops closely'
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 min-h-screen">
      <h2 className="text-xl font-semibold mb-6">Weather Forecast</h2>
      
      {/* Current Weather */}
      <div className="flex items-center justify-between mb-8 p-4 bg-blue-50 rounded-lg">
        <div className="flex items-center">
          <Sun className="text-yellow-500 mr-4" size={48} />
          <div>
            <p className="text-3xl font-bold">28°C</p>
            <p className="text-gray-600">Sunny, Feels like 30°C</p>
          </div>
        </div>
        <div className="text-right">
          <p className="flex items-center justify-end">
            <Droplet className="mr-2" size={18} />
            Humidity: 65%
          </p>
          <p className="flex items-center justify-end">
            <Wind className="mr-2" size={18} />
            Wind: 10 km/h NE
          </p>
        </div>
      </div>

      {/* Forecast Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {forecast.map((day, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4 text-center">
            <p className="font-medium">{day.day}</p>
            <p className="text-sm text-gray-500 mb-2">{day.date}</p>
            <div className="flex justify-center my-3">
              {getWeatherIcon(day.condition)}
            </div>
            <p className="text-xl font-bold">{day.temp.high}° / {day.temp.low}°</p>
            <p className="text-sm text-gray-600 mt-1 flex items-center justify-center">
              <CloudRain className="mr-1" size={14} />
              {day.precipitation}%
            </p>
          </div>
        ))}
      </div>

      {/* Weather Alerts */}
      {alerts.length > 0 && (
        <div className="border-l-4 border-yellow-400 bg-yellow-50 p-4 rounded-r-lg">
          <h3 className="font-semibold text-yellow-800 mb-2 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            Crop-Specific Alerts
          </h3>
          <ul className="list-disc pl-5 space-y-1 text-yellow-700">
            {alerts.map((alert, i) => (
              <li key={i}>{alert}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default WeatherForcast;