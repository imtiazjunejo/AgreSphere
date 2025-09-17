import { useState } from 'react';
import { Bell, Search, ChevronDown, Menu, X } from 'lucide-react';
import Logo from '../../assets/images/logo.png';
import useMobileDetect from '../../hooks/useMobileDetect';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isMobile } = useMobileDetect();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Weather', href: '/weather' },
    { name: 'News', href: '/news' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' }
  ];

  return (
    // Add this to your Navbar component's header element:
    <header className="sticky top-0 z-50 bg-gradient-to-r from-gray-800 to-green-800 text-white shadow-md h-16">
      {/* ... rest of your navbar code ... */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img src={Logo} alt="Agrisphere" className="w-8 h-8" />
            <span className="text-xl font-bold">Agrisphere</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-sm font-medium hover:text-green-300 transition"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Search and User (Desktop) */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300" size={18} />
              <input
                type="text"
                placeholder="Search crops, weather..."
                className="pl-10 pr-4 py-2 rounded-md bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300"
              />
            </div>

            <button className="p-2 rounded-full hover:bg-white/10">
              <Bell size={20} />
            </button>

            <div className="relative group">
              <button className="flex items-center space-x-1">
                <img
                  src={Logo}
                  alt="User"
                  className="w-8 h-8 rounded-full border border-white"
                />
                <ChevronDown size={16} />
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg hidden group-hover:block">
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">Profile</a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">Settings</a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">Logout</a>
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-2 rounded-md hover:bg-white/10"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 space-y-3">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300" size={18} />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 rounded-md bg-white/10 text-white placeholder-gray-300 focus:outline-none"
              />
            </div>

            <nav className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  className="block px-3 py-2 rounded-md hover:bg-white/10"
                  onClick={() => isMobile && setIsMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;