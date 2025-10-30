import { Search, Info, Droplet, Sun, Thermometer } from 'lucide-react';

const CropGuidance = () => {
  const crops = [
    {
      name: 'Rice',
      suitableRegions: ['Punjab', 'West Bengal', 'Andhra Pradesh'],
      sowingSeason: 'June-July',
      harvestTime: 'October-November',
      waterRequirements: 'High (1500-2000mm)',
      temperatureRange: '20-35°C'
    },
    {
      name: 'Wheat',
      suitableRegions: ['Punjab', 'Haryana', 'Uttar Pradesh'],
      sowingSeason: 'November-December',
      harvestTime: 'March-April',
      waterRequirements: 'Moderate (500-800mm)',
      temperatureRange: '12-25°C'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-6">Crop Guidance System</h2>
      
      {/* Search and Filters */}
      <div className="mb-8">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search crops by name, region or season..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
        </div>
        <div className="flex flex-wrap gap-3">
          <select className="border rounded-lg px-3 py-2 text-sm">
            <option>All Regions</option>
            <option>Punjab</option>
            <option>Maharashtra</option>
            <option>West Bengal</option>
          </select>
          <select className="border rounded-lg px-3 py-2 text-sm">
            <option>All Seasons</option>
            <option>Kharif</option>
            <option>Rabi</option>
            <option>Zaid</option>
          </select>
          <select className="border rounded-lg px-3 py-2 text-sm">
            <option>All Soil Types</option>
            <option>Loamy</option>
            <option>Clay</option>
            <option>Sandy</option>
          </select>
        </div>
      </div>

      {/* Crops List */}
      <div className="space-y-6">
        {crops.map((crop, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-lg font-semibold">{crop.name}</h3>
              <button className="text-green-600 hover:text-green-800 flex items-center">
                <Info className="mr-1" size={16} />
                <span>Details</span>
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Suitable Regions</h4>
                <p>{crop.suitableRegions.join(', ')}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Growing Season</h4>
                <p>Sow: {crop.sowingSeason} | Harvest: {crop.harvestTime}</p>
              </div>
              <div className="flex items-center">
                <Droplet className="text-blue-500 mr-2" />
                <span>Water: {crop.waterRequirements}</span>
              </div>
              <div className="flex items-center">
                <Thermometer className="text-orange-500 mr-2" />
                <span>Temp: {crop.temperatureRange}</span>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-200">
              <h4 className="font-medium text-gray-700 mb-2">Recommended Practices</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Use {crop.name === 'Rice' ? 'flood irrigation' : 'drip irrigation'} method</li>
                <li>Apply {crop.name === 'Rice' ? 'nitrogen-rich' : 'balanced NPK'} fertilizer</li>
                <li>Watch for {crop.name === 'Rice' ? 'leaf blast' : 'rust'} disease</li>
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CropGuidance;