import Button from '../ui/Button';
import { Link } from 'react-router-dom';

const HeroCarousel = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center px-5 md:px-24 relative">
      {/* Shadow at bottom for separation */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent"></div>

      {/* Left Section (Text Content) */}
      <div className="max-w-2xl md:w-1/2">
        {/* Desktop Typography */}
        <h1 className="text-[40px] font-bold text-gray-900 leading-tight mb-6">
          Transform Your Ideas <br />
          <span>into Stunning Visuals</span>
        </h1>
        <p className="text-gray-600 text-[18px] mb-8 leading-relaxed">
          At Nippy, we connect you with talented freelance designers <br />
          <span>who can bring your vision to life. Whether you need a</span> <br />
          <span>striking banner or a captivating social media post, our platform</span> <br />
          <span>is here to help you find the perfect creative partner.</span>
        </p>
        <div className="flex gap-6">
          <Link to="/signup">
            <Button className="bg-[#5F42A1] hover:bg-[#4D3680] text-white px-4 py-3 text-[16px] rounded-md transition">
              Get Started
            </Button>
          </Link>
          <Link to="/login">
            <Button className="border-black text-gray-800 px-4 py-3 text-[16px] rounded-md hover:bg-gray-200 transition">
              Log in
            </Button>
          </Link>
        </div>
      </div>

      {/* Right Section (Image) */}
      <div className="mt-10 md:mt-0 md:w-1/2 flex justify-center">
        <img
          src="/src/assets/images/courses/master.jpg"
          alt="Hero"
          className="max-w-md w-full object-cover rounded-2xl shadow-lg"
        />
      </div>
    </div>
  );
};

export default HeroCarousel;
