import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import { useLanguage } from '../context/LanguageContext';

export default function AppShell() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();

  // Map route path to human-readable page titles and breadcrumbs
  const routeMeta = {
    '/app/dashboard': { title: t('routes.dashboard', 'Farmer Dashboard'), breadcrumb: t('routes.overview', 'Overview') },
    '/app/crop-recommendation': { title: t('routes.cropRec', 'Crop Recommendation'), breadcrumb: t('routes.agronomy', 'Agronomy') },
    '/app/weather': { title: t('routes.weather', 'Weather & Agromet Advisory'), breadcrumb: t('routes.climate', 'Climate') },
    '/app/calendar': { title: t('routes.calendar', 'Farming Calendar & Tasks'), breadcrumb: t('routes.operations', 'Operations') },
    '/app/soil-health': { title: t('routes.soilHealth', 'Soil Health Card Analyzer'), breadcrumb: t('routes.soilTesting', 'Soil Testing') },
    '/app/disease-detection': { title: t('routes.disease', 'Crop Disease Detection'), breadcrumb: t('routes.plantHealth', 'Plant Health') },
    '/app/market-prices': { title: t('routes.mandi', 'APMC Mandi Market Prices'), breadcrumb: t('routes.marketing', 'Marketing') },
    '/app/ai-assistant': { title: t('routes.aiAssistant', 'Krishi AI Farming Assistant'), breadcrumb: t('routes.aiAdvisory', 'AI Advisory') },
    '/app/my-farm': { title: t('routes.myFarm', 'My Farm Details'), breadcrumb: t('routes.farmProfile', 'Farm Profile') },
    '/app/settings': { title: t('routes.settings', 'Settings & Profile'), breadcrumb: t('routes.preferences', 'Preferences') },
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
