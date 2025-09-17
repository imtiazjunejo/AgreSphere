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

  return (
    <header className="bg-gradient-to-r from-gray-800 to-green-800 text-white h-16 fixed w-full top-0 z-40 shadow-lg mb-10">
      <div className="container mx-auto px-10 h-16 flex items-center justify-between">
        
        {/* Left - Logo */}
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition">
          <img src="/src/assets/images/1.jpg" alt="AgriSphere" className="h-9 w-9 rounded-lg" />
          <h1 className="text-xl font-bold">AgriSphere</h1>
        </Link>

        {/* Center - Navigation Links */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="font-medium hover:text-gray-200 transition">
            Home
          </Link>
          <Link to="/about" className="font-medium hover:text-gray-200 transition">
            About Us
          </Link>
          <Link to="/contact" className="text-white font-medium hover:text-gray-200 transition">
            Contact Us
          </Link>
        </div>

        {/* Right - Search & Profile */}
        <div className="flex items-center gap-4 relative">
          
          {/* Search Bar */}
          <div className="hidden md:block">
            <input
              type="text"
              placeholder="Search..."
              className="px-4 py-1.5 w-64 rounded-md bg-transparent border border-white/50 focus:border-gray-300 focus:outline-none text-white placeholder-gray-200"
            />
          </div>

          {/* Auth Links / Profile */}
          {authUser ? (
            <div className="relative" ref={dropdownRef}>
              {/* Profile Button */}
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 px-2 py-1 rounded-md hover:text-gray-200 transition"
              >
                {authUser?.profilePic ? (
                  <img
                    src={authUser.profilePic}
                    alt="Profile"
                    className="h-9 w-9 rounded-full object-cover border border-white/30"
                  />
                ) : (
                  <div className="h-9 w-9 rounded-full bg-white/20 flex items-center justify-center border border-white/30 text-white font-semibold">
                    {getInitial()}
                  </div>
                )}
                <span className="hidden sm:inline font-medium">Profile</span>
              </button>

              {/* Dropdown Menu */}
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-gray-200 text-gray-800 rounded-xl shadow-lg p-4 z-50">
                  {/* Profile Picture */}
                  <div className="flex justify-center mb-3">
                    <div className="h-16 w-16 rounded-full bg-gray-300 overflow-hidden flex items-center justify-center">
                      {authUser?.profilePic ? (
                        <img src={authUser.profilePic} alt="Profile" className="h-full w-full object-cover" />
                      ) : (
                        <span className="text-xl font-bold text-gray-700">{getInitial()}</span>
                      )}
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
                      Edit Profile
                    </Link>

                    <Link
                      to="/settings"
                      onClick={() => setProfileOpen(false)}
                      className="px-3 py-2 rounded-md hover:bg-gray-100 transition flex items-center gap-2"
                    >
                      <Settings className="w-4 h-4" /> Settings
                    </Link>

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
              <Link to="/login" className="font-medium hover:text-gray-200 transition">
                Login
              </Link>
              <Link to="/signup" className="font-medium hover:text-gray-200 transition">
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
