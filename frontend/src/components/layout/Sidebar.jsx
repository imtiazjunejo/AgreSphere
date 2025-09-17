import { NavLink } from "react-router-dom";
import { Menu } from "lucide-react"; // for toggle button
import { useState } from "react";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const navItems = [
    { icon: "📊", name: "Dashboard", path: "/dashboard" },
    { icon: "🌱", name: "Crop Suggestions", path: "/crop-suggestions" },
    { icon: "📘", name: "Crop Logs", path: "/crop-logs" },
    { icon: "💰", name: "Profit/Loss", path: "/profit-loss" },
    { icon: "🌦️", name: "Weather", path: "/weather" },
    { icon: "📰", name: "Agri News", path: "/news" },
    { icon: "👨‍🌾", name: "Farmer Network", path: "/network" },
    { icon: "🏞️", name: "Land Listings", path: "/land-listings" },
    { icon: "⚙️", name: "Profile", path: "/profile" },
  ];

  return (
    <aside
      className={`flex flex-col h-full bg-gradient-to-b from-gray-700 to-green-800 p-1 
      transition-all duration-300 ease-in-out 
      ${isOpen ? "w-64" : "w-18"}`}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-14 h-10 mb-3 rounded-md text-gray-200 hover:bg-green-700 transition-colors"
      >
        <Menu size={20} />
      </button>

      {/* Nav Links */}
      <nav className="flex flex-col space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center rounded-md px-2 py-2 transition-all duration-200 group ${
                isActive
                  ? "bg-green-600 text-white"
                  : "text-gray-200 hover:bg-green-700 hover:text-white"
              }`
            }
          >
            {/* ICON WRAPPER */}
            <div className="flex items-center justify-center min-w-[40px] text-lg">
              {item.icon}
            </div>

            {/* TEXT WRAPPER (smooth show/hide) */}
            <span
              className={`ml-2 overflow-hidden whitespace-nowrap transition-all duration-300 
              ${isOpen ? "opacity-100 max-w-[200px]" : "opacity-0 max-w-0"}`}
            >
              {item.name}
            </span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
