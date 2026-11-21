import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { AuthProvider, useAuth } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';

import Navbar from './layouts/Navbar';
import Footer from './layouts/Footer';

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
import AIChat from './pages/AIChat';
import SoilHealth from './pages/SoilHealth';
import Mandi from './pages/Mandi';

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
          <div className="min-h-screen flex flex-col bg-agriBg text-agriDark selection:bg-forest-100 selection:text-forest-900">
            <Navbar />
            <main className="flex-1">
              <Routes>
                {/* Public Website */}
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/features" element={<Features />} />
                <Route path="/how-it-works" element={<HowItWorks />} />
                <Route path="/contact" element={<Contact />} />

                {/* Authentication */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Core AgriTech Modules */}
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/crop-recommendation" element={<CropRecommendation />} />
                <Route path="/weather" element={<Weather />} />
                <Route path="/crop-calendar" element={<ProtectedRoute><CropCalendar /></ProtectedRoute>} />
                <Route path="/ai-chat" element={<AIChat />} />
                <Route path="/soil-health" element={<SoilHealth />} />
                <Route path="/mandi" element={<Mandi />} />

                {/* Aliases */}
                <Route path="/app/*" element={<Navigate to="/dashboard" replace />} />

                {/* Fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </LanguageProvider>
    </AuthProvider>
  );
}
