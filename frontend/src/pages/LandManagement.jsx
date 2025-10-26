import { MapPin, Calendar, Droplet, TrendingUp, Heart } from 'lucide-react';

const LandManagement = () => {
  const availablePlots = [
    {
      id: 1,
      location: 'Badin',
      size: '5 acres',
      soilType: 'Loamy',
      waterSource: 'Canal',
      price: '₹25,000/season',
      image: '/src/assets/images/farms/badin.jpg'
    },
    {
      id: 2,
      location: 'Golarchi',
      size: '8 acres',
      soilType: 'Black Cotton',
      waterSource: 'Well',
      price: '₹35,000/season',
      image: '/src/assets/images/farms/golarchi.jpg'
    }
  ];

  const myPlots = [
    {
      id: 1,
      location: 'Tando Bago',
      size: '3 acres',
      crop: 'Wheat',
      status: 'Leased until Dec 2025',
      image: '/src/assets/images/farms/myland.jpg'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Available Plots */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-6">Available Farmland</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {availablePlots.map(plot => (
            <div key={plot.id} className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="h-40 bg-gray-100 relative">
                <img 
                  src={plot.image} 
                  alt={plot.location} 
                  className="w-full h-full object-cover"
                />
                <button className="absolute top-3 right-3 bg-white bg-opacity-80 p-2 rounded-full">
                  <Heart size={18} className="text-gray-700" />
                </button>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2 flex items-center">
                  <MapPin className="text-green-600 mr-2" size={18} />
                  {plot.location}
                </h3>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="flex items-center text-sm">
                    <span className="font-medium mr-1">Size:</span>
                    {plot.size}
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="font-medium mr-1">Soil:</span>
                    {plot.soilType}
                  </div>
                  <div className="flex items-center text-sm">
                    <Droplet className="mr-1 text-blue-500" size={16} />
                    {plot.waterSource}
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="font-medium mr-1">Price:</span>
                    {plot.price}
                  </div>
                </div>
                <div className="flex space-x-3">
                  <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg">
                    View Details
                  </button>
                  <button className="flex-1 border border-green-600 text-green-600 hover:bg-green-50 py-2 rounded-lg">
                    Contact Owner
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* My Plots */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-6">My Farmland</h2>
        {myPlots.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {myPlots.map(plot => (
              <div key={plot.id} className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="h-40 bg-gray-100">
                  <img 
                    src={plot.image} 
                    alt={plot.location} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 flex items-center">
                    <MapPin className="text-green-600 mr-2" size={18} />
                    {plot.location}
                  </h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm">
                      <span className="font-medium mr-2">Size:</span>
                      {plot.size}
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="font-medium mr-2">Current Crop:</span>
                      {plot.crop}
                    </div>
                    <div className="flex items-center text-sm">
                      <Calendar className="mr-2 text-green-500" size={16} />
                      {plot.status}
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg">
                      Manage Plot
                    </button>
                    <button className="flex-1 border border-green-600 text-green-600 hover:bg-green-50 py-2 rounded-lg">
                      View Analytics
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">You don't have any farmland listed yet</p>
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg">
              List Your Land
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LandManagement;