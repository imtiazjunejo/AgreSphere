import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuthStore } from "./store/useAuthStore";

import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import Footer from "./components/layout/Footer";
import AppRoutes from "./routes";

import HomePage from "./pages/HomePage";
import ContactPage from "./pages/ContactPage";
import About from "./pages/About";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  useEffect(() => {
    checkAuth();
    console.log("Check authUser: ", authUser);
  }, []);

  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  // Define routes that should show sidebar (authenticated app routes)
  const sidebarRoutes = ['/dashboard', '/crop-logs', '/profit-loss', '/network', '/weather', '/profile', '/landmanagement', '/connection-requests'];
  const publicRoutes = ['/', '/about', '/contact', '/login', '/signup'];
  
  // Check if current path should show sidebar
  const shouldShowSidebar = authUser && 
    sidebarRoutes.some(route => location.pathname.startsWith(route)) && 
    !publicRoutes.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Navbar (fixed height assumed h-16) */}
      <header className="sticky top-0 z-50">
        <Navbar />
      </header>

      <div className="flex flex-1">
        {/* Sidebar - only show for authenticated users on specific routes */}
        {shouldShowSidebar && (
          <div className="pt-0.5 hidden lg:block fixed left-0 top-16 bottom-0">
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
          </div>
        )}

        {/* Main content with top padding to avoid overlapping navbar */}
        <main
          className={`flex-1 flex flex-col pt-16 bg-gray-100 transition-all duration-300 ${
            shouldShowSidebar ? (isSidebarOpen ? "lg:ml-64" : "lg:ml-16") : ""
          }`}
        >
          {/* Content wrapper grows to fill space and push footer down */}
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route
                path="/login"
                element={!authUser ? <LoginPage /> : <Navigate to="/dashboard" />}
              />
              <Route
                path="/signup"
                element={!authUser ? <SignUpPage /> : <Navigate to="/dashboard" />}
              />
              {authUser ? (
                <Route path="/*" element={<AppRoutes />} />
              ) : (
                <Route path="/*" element={<Navigate to="/login" />} />
              )}
            </Routes>
          </div>

          {/* Footer - show on all pages */}
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default App;