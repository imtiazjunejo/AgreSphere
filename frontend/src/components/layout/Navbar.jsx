import { useState, useRef, useEffect } from "react";
import { useAuthStore } from "../../store/useAuthStore.js";
import { Link } from "react-router-dom";
import { LogOut, Settings } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Get first letter if profilePic not available
  const getInitial = () => {
    if (authUser?.firstName) {
      return authUser.firstName.charAt(0).toUpperCase();
    }
    return "?";
  };

  // Normalize profile picture URL
  const getProfilePicUrl = () => {
    if (!authUser?.profilePic) return null;
    if (authUser.profilePic.startsWith("http")) return authUser.profilePic;
    return `http://localhost:3000${authUser.profilePic}`;
  };

  return (
    <header className="bg-white border-b border-gray-200 text-gray-900 h-16 fixed w-full top-0 z-40 shadow-sm">
      <div className="container mx-auto px-10 h-16 flex items-center justify-between">
        
        {/* Left - Logo */}
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition">
          <img src="/src/assets/images/logo.png" alt="AgriSphere" className="h-9 w-9 rounded-lg" />
          <h1 className="text-xl font-bold text-green-600">AgriSphere</h1>
        </Link>

        {/* Center - Navigation Links */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="font-medium text-gray-700 hover:text-green-600 transition">
            Home
          </Link>
          <Link to="/about" className="font-medium text-gray-700 hover:text-green-600 transition">
            About Us
          </Link>
          <Link to="/contact" className="font-medium text-gray-700 hover:text-green-600 transition">
            Contact Us
          </Link>
        </div>

        {/* Right - Search & Profile */}
        <div className="flex items-center gap-4 relative">
         

          {/* Auth Links / Profile */}
          {authUser ? (
            <div className="relative" ref={dropdownRef}>
              {/* Profile Button */}
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition"
              >
                
                {getProfilePicUrl() ? (
                  <img
                    src={getProfilePicUrl()}
                    alt="Profile"
                    className="h-9 w-9 rounded-full object-cover border border-white/30"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}

                
                <div className={`h-9 w-9 rounded-full bg-gray-200 flex items-center justify-center border border-gray-300 text-gray-700 font-semibold ${getProfilePicUrl() ? 'hidden' : ''}`}>
                  {getInitial()}
                </div>
                <span className="hidden sm:inline font-medium text-gray-700">Profile</span>
              </button>

              {/* Dropdown Menu */}
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white text-gray-800 rounded-xl shadow-lg border border-gray-200 p-4 z-50">
                  {/* Profile Picture */}
                  <div className="flex justify-center mb-3">
                    <div className="h-16 w-16 rounded-full bg-gray-300 overflow-hidden flex items-center justify-center">
                      {getProfilePicUrl() ? (
                        <img
                          src={getProfilePicUrl()}
                          alt="Profile"
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <div className={`w-full h-full flex items-center justify-center ${getProfilePicUrl() ? 'hidden' : ''}`}>
                        <span className="text-xl font-bold text-gray-700">{getInitial()}</span>
                      </div>
                    </div>
                  </div>

                  {/* User Info */}
                  <div className="text-center mb-3">
                    <p className="font-semibold text-lg">{authUser.firstName} {authUser.lastName}</p>
                    <p className="text-gray-500 text-sm">{authUser.email}</p>
                  </div>

                  <hr className="mb-3" />

                  {/* Links inside dropdown */}
                  <div className="flex flex-col gap-2">
                    <Link
                      to="/profile"
                      onClick={() => setProfileOpen(false)}
                      className="px-3 py-2 rounded-md hover:bg-gray-100 transition"
                    >
                      View Profile
                    </Link>

                    <Link
                      to="/dashboard"
                      onClick={() => setProfileOpen(false)}
                      className="px-3 py-2 rounded-md hover:bg-gray-100 transition"
                    >
                      Dashboard
                    </Link>

                    <Link
                      to="/crop-logs"
                      onClick={() => setProfileOpen(false)}
                      className="px-3 py-2 rounded-md hover:bg-gray-100 transition"
                    >
                      Crop Logs
                    </Link>

                    <Link
                      to="/profit-loss"
                      onClick={() => setProfileOpen(false)}
                      className="px-3 py-2 rounded-md hover:bg-gray-100 transition"
                    >
                      Profit & Loss
                    </Link>

                    <Link
                      to="/network"
                      onClick={() => setProfileOpen(false)}
                      className="px-3 py-2 rounded-md hover:bg-gray-100 transition"
                    >
                      Farmer Network
                    </Link>

                    <Link
                      to="/settings"
                      onClick={() => setProfileOpen(false)}
                      className="px-3 py-2 rounded-md hover:bg-gray-100 transition flex items-center gap-2"
                    >
                      <Settings className="w-4 h-4" /> Settings
                    </Link>

                    <hr className="my-2" />

                    <button
                      onClick={logout}
                      className="px-3 py-2 rounded-md hover:bg-gray-100 transition flex items-center gap-2 text-red-600"
                    >
                      <LogOut className="w-4 h-4" /> Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="font-medium text-gray-700 hover:text-green-600 transition">
                Login
              </Link>
              <Link to="/signup" className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
