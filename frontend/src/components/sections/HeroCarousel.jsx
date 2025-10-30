import Button from '../ui/Button';
import { Link } from 'react-router-dom';

const HeroCarousel = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center px-5 md:px-24 relative bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Rice Plant Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        {/* Rice stalks - left side */}
        <div className="absolute bottom-20 left-16">
          <div className="w-1 h-24 bg-gradient-to-t from-green-600 to-green-400 rounded-full"></div>
          <div className="absolute -top-2 -left-1 w-3 h-3 bg-yellow-400 rounded-full"></div>
          <div className="absolute -top-1 left-0 w-2 h-2 bg-yellow-300 rounded-full"></div>
        </div>
        <div className="absolute bottom-16 left-24">
          <div className="w-1 h-28 bg-gradient-to-t from-green-600 to-green-400 rounded-full"></div>
          <div className="absolute -top-3 -right-1 w-3 h-3 bg-yellow-400 rounded-full"></div>
          <div className="absolute -top-1 -right-0 w-2 h-2 bg-yellow-300 rounded-full"></div>
        </div>
        <div className="absolute bottom-24 left-32">
          <div className="w-1 h-20 bg-gradient-to-t from-green-600 to-green-400 rounded-full"></div>
          <div className="absolute -top-2 left-0 w-3 h-3 bg-yellow-400 rounded-full"></div>
        </div>

        {/* Rice stalks - right side */}
        <div className="absolute bottom-18 right-20">
          <div className="w-1 h-26 bg-gradient-to-t from-green-600 to-green-400 rounded-full"></div>
          <div className="absolute -top-2 -left-1 w-3 h-3 bg-yellow-400 rounded-full"></div>
          <div className="absolute -top-1 left-0 w-2 h-2 bg-yellow-300 rounded-full"></div>
        </div>
        <div className="absolute bottom-22 right-28">
          <div className="w-1 h-22 bg-gradient-to-t from-green-600 to-green-400 rounded-full"></div>
          <div className="absolute -top-3 right-0 w-3 h-3 bg-yellow-400 rounded-full"></div>
        </div>
        <div className="absolute bottom-14 right-36">
          <div className="w-1 h-30 bg-gradient-to-t from-green-600 to-green-400 rounded-full"></div>
          <div className="absolute -top-2 -right-1 w-3 h-3 bg-yellow-400 rounded-full"></div>
          <div className="absolute -top-1 -right-0 w-2 h-2 bg-yellow-300 rounded-full"></div>
        </div>

        {/* Rice stalks - center */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
          <div className="w-1 h-32 bg-gradient-to-t from-green-600 to-green-400 rounded-full"></div>
          <div className="absolute -top-3 -left-1 w-4 h-4 bg-yellow-400 rounded-full"></div>
          <div className="absolute -top-1 left-0 w-3 h-3 bg-yellow-300 rounded-full"></div>
          <div className="absolute -top-2 right-0 w-3 h-3 bg-yellow-400 rounded-full"></div>
        </div>
        <div className="absolute bottom-16 left-1/2 transform -translate-x-8">
          <div className="w-1 h-28 bg-gradient-to-t from-green-600 to-green-400 rounded-full"></div>
          <div className="absolute -top-2 left-0 w-3 h-3 bg-yellow-400 rounded-full"></div>
        </div>
        <div className="absolute bottom-20 left-1/2 transform translate-x-8">
          <div className="w-1 h-24 bg-gradient-to-t from-green-600 to-green-400 rounded-full"></div>
          <div className="absolute -top-3 -right-1 w-3 h-3 bg-yellow-400 rounded-full"></div>
          <div className="absolute -top-1 -right-0 w-2 h-2 bg-yellow-300 rounded-full"></div>
        </div>
      </div>

      {/* Shadow at bottom for separation */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>

      {/* Left Section (Text Content) */}
      <div className="max-w-2xl md:w-1/2 relative z-10">
        {/* Desktop Typography */}
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
          Grow Your Farm with <br />
          <span className="bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
            AgriSphere
          </span>
        </h1>
        <p className="text-gray-700 text-lg md:text-xl mb-8 leading-relaxed">
          Empowering farmers with cutting-edge technology and data-driven insights.
          Track crops, manage profits, connect with fellow farmers, and optimize your
          agricultural journey with our comprehensive farming platform.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/signup">
            <Button className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white px-8 py-4 text-lg rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Start Farming Smart
            </Button>
          </Link>
          <Link to="/about">
            <Button className="border-2 border-green-600 text-green-600 px-8 py-4 text-lg rounded-xl hover:bg-green-50 transition-all duration-300">
              Learn More
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-4 gap-2">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-1">10K+</div>
            <div className="text-sm text-gray-600">Active Farmers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-emerald-600 mb-1">50K+</div>
            <div className="text-sm text-gray-600">Crop Logs</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-teal-600 mb-1">95%</div>
            <div className="text-sm text-gray-600">Success Rate</div>
          </div>
        </div>
      </div>

      {/* Right Section (Image) */}
      <div className="mt-10 md:mt-0 md:w-1/2 flex justify-end relative z-10">
        <div className="relative">
          <img
            src="/src/assets/images/project/project-5.jpg"
            alt="Modern Agriculture"
            className="max-w-lg w-full object-cover rounded-3xl shadow-2xl border-4 border-white"
          />
          {/* Floating Cards */}
          {/* <div className="absolute -top-4 -left-4 bg-white rounded-xl shadow-lg p-4 hidden md:block">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm font-semibold text-gray-800">Crop Health: Excellent</span>
            </div>
          </div> */}
          {/* <div className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-lg p-4 hidden md:block">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm font-semibold text-gray-800">Weather: Optimal</span>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default HeroCarousel;
