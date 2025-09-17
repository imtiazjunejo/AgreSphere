import { Sun, CloudRain, AlertTriangle, Droplet } from 'lucide-react';
import PropTypes from 'prop-types';

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

WeatherWidget.propTypes = {
  weatherData: PropTypes.shape({
    temp: PropTypes.number.isRequired,
    humidity: PropTypes.number.isRequired,
    rainfall: PropTypes.number.isRequired,
    alerts: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired
};

export default WeatherWidget;