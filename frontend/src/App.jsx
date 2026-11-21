import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';

import { AuthProvider, useAuth } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';

import Navbar from './layouts/Navbar';
import Footer from './layouts/Footer';
import AppShell from './layouts/AppShell';

import Home from './pages/Home';
import About from './pages/About';
import Features from './pages/Features';
import HowItWorks from './pages/HowItWorks';
import Contact from './pages/Contact';

import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';

import Dashboard from './pages/Dashboard';
import CropRecommendation from './pages/CropRecommendation';
import Weather from './pages/Weather';
import CropCalendar from './pages/CropCalendar';
import AIAssistant from './pages/AIAssistant';
import SoilHealth from './pages/SoilHealth';
import Mandi from './pages/Mandi';
import DiseaseDetection from './pages/DiseaseDetection';
import MyFarm from './pages/MyFarm';
import Settings from './pages/Settings';

function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-agriBg text-agriDark selection:bg-forest-100 selection:text-forest-900">
      <Navbar />
      <main className="flex-1 relative z-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="p-12 text-center text-sm text-gray-500">Loading KrishiMitra...</div>;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <Router>
          <Routes>
            {/* Public Website with Top Navbar & Footer */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/features" element={<Features />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/contact" element={<Contact />} />

              {/* Authentication */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Public Standalone Views */}
              <Route path="/crop-recommendation" element={<CropRecommendation />} />
              <Route path="/weather" element={<Weather />} />
              <Route path="/crop-calendar" element={<CropCalendar />} />
              <Route path="/ai-assistant" element={<AIAssistant />} />
              <Route path="/ai-chat" element={<AIAssistant />} />
              <Route path="/soil-health" element={<SoilHealth />} />
              <Route path="/mandi" element={<Mandi />} />
              <Route path="/disease-detection" element={<DiseaseDetection />} />
            </Route>

            {/* Farmer Dashboard Portal with AppShell (Sidebar, Topbar & Breadcrumbs) */}
            <Route
              path="/app"
              element={
                <ProtectedRoute>
                  <AppShell />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="/app/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="crop-recommendation" element={<CropRecommendation />} />
              <Route path="weather" element={<Weather />} />
              <Route path="calendar" element={<CropCalendar />} />
              <Route path="soil-health" element={<SoilHealth />} />
              <Route path="disease-detection" element={<DiseaseDetection />} />
              <Route path="market-prices" element={<Mandi />} />
              <Route path="ai-assistant" element={<AIAssistant />} />
              <Route path="my-farm" element={<MyFarm />} />
              <Route path="settings" element={<Settings />} />
            </Route>

            {/* Aliases & Fallbacks */}
            <Route path="/dashboard" element={<Navigate to="/app/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </LanguageProvider>
    </AuthProvider>
  );
}
