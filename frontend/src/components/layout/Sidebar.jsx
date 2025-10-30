import { NavLink } from "react-router-dom";
import { Menu } from "lucide-react"; // for toggle button

const Sidebar = ({ isOpen, setIsOpen }) => {
  const navItems = [
    { icon: "📊", name: "Dashboard", path: "/dashboard" },
    { icon: "📘", name: "Crop Logs", path: "/crop-logs" },
    { icon: "💰", name: "Profit & Loss", path: "/profit-loss" },
    { icon: "👨‍🌾", name: "Farmer Network", path: "/network" },
    { icon: "🌦️", name: "Weather", path: "/weather" },
    { icon: "🏞️", name: "Land Management", path: "/landmanagement" },
    { icon: "👤", name: "Profile", path: "/profile" },
  ];

  return (
    <aside
      className={`flex flex-col h-full bg-gradient-to-b from-green-600 via-emerald-600 to-teal-600 p-2
      transition-all duration-300 ease-in-out shadow-2xl border-r border-green-500/20
      ${isOpen ? "w-64" : "w-20"}`}
    >
      

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-12 h-12 mb-6 mx-auto rounded-xl bg-white/10 text-white hover:bg-white/20 transition-all duration-300 backdrop-blur-sm"
      >
        <Menu size={20} />
      </button>

      {/* Nav Links */}
      <nav className="flex flex-col space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center rounded-xl px-3 py-3 transition-all duration-300 group relative overflow-hidden ${
                isActive
                  ? "bg-white text-green-600 shadow-lg"
                  : "text-white/90 hover:bg-white/10 hover:text-white"
              }`
            }
          >
            {/* Active indicator */}
            {({ isActive }) => (
              <>
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-green-400 to-teal-400 rounded-r-full"></div>
                )}

                {/* ICON WRAPPER */}
                <div className={`flex items-center justify-center text-xl transition-all duration-300 ${
                  isActive ? "text-green-600" : "text-white/90 group-hover:text-white"
                }`}>
                  {item.icon}
                </div>

                {/* TEXT WRAPPER (smooth show/hide) */}
                <span
                  className={`ml-3 overflow-hidden whitespace-nowrap transition-all duration-300 font-medium ${
                    isOpen ? "opacity-100 max-w-[200px]" : "opacity-0 max-w-0"
                  }`}
                >
                  {item.name}
                </span>

                {/* Hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-teal-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="mt-auto pt-6">
        {isOpen && (
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="text-white/80 text-sm mb-2">🚀</div>
            <div className="text-white text-xs font-medium">Grow Smarter</div>
            <div className="text-white/60 text-xs">Farm Better</div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
