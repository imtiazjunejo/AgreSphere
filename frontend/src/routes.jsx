import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import LandManagement from './pages/LandManagement';
import FarmerNetwork from './pages/FarmerNetwork';
import CropGuidance from './pages/CropGuidance';
import WeatherForcast from './pages/WeatherForcast';
import NotFound from './pages/NotFound';
import About from './pages/About';
import { Contact } from 'lucide-react';
import ContactPage from './pages/ContactPage';
import CropLogs from './pages/CropLogs';
import ProfitLoss from './pages/ProfitLoss';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/crop-logs" element={<CropLogs />} />
      <Route path="/profit-loss" element={<ProfitLoss />} />
      <Route path="/landmanagement" element={<LandManagement />} />
      <Route path="/farmerNetwork" element={<FarmerNetwork />} />
      <Route path="/cropGuidance" element={<CropGuidance />} />
      <Route path="/weather" element={<WeatherForcast />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;