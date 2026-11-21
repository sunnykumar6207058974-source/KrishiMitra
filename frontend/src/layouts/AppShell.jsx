import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

export default function AppShell() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Map route path to human-readable page titles and breadcrumbs
  const routeMeta = {
    '/app/dashboard': { title: 'Farmer Dashboard', breadcrumb: 'Overview' },
    '/app/crop-recommendation': { title: 'Crop Recommendation', breadcrumb: 'Agronomy' },
    '/app/weather': { title: 'Weather & Agromet Advisory', breadcrumb: 'Climate' },
    '/app/calendar': { title: 'Farming Calendar & Tasks', breadcrumb: 'Operations' },
    '/app/soil-health': { title: 'Soil Health Card Analyzer', breadcrumb: 'Soil Testing' },
    '/app/disease-detection': { title: 'Crop Disease Detection', breadcrumb: 'Plant Health' },
    '/app/market-prices': { title: 'APMC Mandi Market Prices', breadcrumb: 'Marketing' },
    '/app/ai-assistant': { title: 'Krishi AI Farming Assistant', breadcrumb: 'AI Advisory' },
    '/app/my-farm': { title: 'My Farm Details', breadcrumb: 'Farm Profile' },
    '/app/settings': { title: 'Settings & Profile', breadcrumb: 'Preferences' },
  };

  const currentMeta = routeMeta[location.pathname] || { title: 'KrishiMitra', breadcrumb: 'App' };

  return (
    <div className="min-h-screen bg-km-bg flex">
      {/* Persistent Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-72">
        {/* Dynamic Topbar */}
        <Topbar
          onMenuClick={() => setSidebarOpen(true)}
          title={currentMeta.title}
          breadcrumb={currentMeta.breadcrumb}
        />

        {/* Page Body */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto space-y-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
