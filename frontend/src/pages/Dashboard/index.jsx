import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Sprout, CloudSun, Calendar, MessageSquareText, Activity, Store,
  CheckCircle2, Clock, Plus, ArrowRight, ShieldCheck, TrendingUp, AlertTriangle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import api from '../../services/api';

export default function Dashboard() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [profile, setProfile] = useState(null);
  const [weather, setWeather] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [mandiPrices, setMandiPrices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const [profRes, weatherRes, tasksRes, mandiRes] = await Promise.all([
          api.get('/farmer/profile').catch(() => ({ data: null })),
          api.get(`/weather/current?district=${user?.district || 'Pune'}&state=${user?.state || 'Maharashtra'}`),
          api.get('/calendar').catch(() => ({ data: [] })),
          api.get(`/market/prices?state=${user?.state || 'Maharashtra'}`).catch(() => ({ data: { records: [] } }))
        ]);

        if (profRes.data) setProfile(profRes.data);
        if (weatherRes.data) setWeather(weatherRes.data);
        if (tasksRes.data) setTasks(tasksRes.data);
        if (mandiRes.data?.records) setMandiPrices(mandiRes.data.records.slice(0, 4));
      } catch (err) {
        console.error('Error fetching dashboard data', err);
      } finally {
        setLoading(false);
      }
    }
    loadDashboardData();
  }, [user]);

  const toggleTask = async (taskId, currentStatus) => {
    try {
      const updated = await api.put(`/calendar/tasks/${taskId}`, { is_completed: !currentStatus });
      setTasks(tasks.map(t => t.id === taskId ? updated.data : t));
    } catch (e) {
      console.error(e);
    }
  };

  const quickActions = [
    { title: t('dash.quickActions.cropRec'), icon: Sprout, link: "/crop-recommendation", color: "bg-emerald-50 text-emerald-800 border-emerald-200" },
    { title: t('dash.quickActions.weather'), icon: CloudSun, link: "/weather", color: "bg-blue-50 text-blue-800 border-blue-200" },
    { title: t('dash.quickActions.aiChat'), icon: MessageSquareText, link: "/ai-assistant", color: "bg-purple-50 text-purple-800 border-purple-200" },
    { title: t('dash.quickActions.calendar'), icon: Calendar, link: "/crop-calendar", color: "bg-amber-50 text-amber-800 border-amber-200" },
    { title: t('dash.quickActions.soil'), icon: Activity, link: "/soil-health", color: "bg-lime-50 text-lime-800 border-lime-200" },
    { title: t('dash.quickActions.mandi'), icon: Store, link: "/mandi", color: "bg-orange-50 text-orange-800 border-orange-200" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Greeting Banner */}
      <div className="bg-gradient-to-r from-forest-800 via-forest-900 to-forest-800 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-700/60 border border-forest-600 text-xs font-semibold text-leaf-400">
            <span>🇮🇳 Registered Progressive Farmer</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            {t('dash.welcome')} {user?.full_name || 'Farmer'}! 🌾
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-200">
            <span>📍 Location: <strong>{user?.district || 'Pune'}, {user?.state || 'Maharashtra'}</strong></span>
            <span>🏡 Farm: <strong>{profile?.farm_name || 'Patel Agro Farm'}</strong></span>
            <span>🌱 Total Land: <strong>{profile?.total_land_area || 4.5} {profile?.land_unit || 'Acres'}</strong></span>
            <span>🧪 Soil: <strong>{profile?.primary_soil_type || 'Loamy Black Soil'}</strong></span>
          </div>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider">{t('dash.quickActionsHeading')}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {quickActions.map((qa) => {
            const Icon = qa.icon;
            return (
              <Link
                key={qa.title}
                to={qa.link}
                className={`p-3.5 rounded-2xl border ${qa.color} shadow-sm hover:shadow transition-all flex flex-col items-center text-center space-y-2 font-bold text-xs`}
              >
                <Icon className="w-5 h-5 shrink-0" />
                <span className="leading-tight">{qa.title}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Weather & Today's Advisory + Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Weather & Advisories (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Weather Card */}
          {weather && (
            <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div className="flex items-center gap-2">
                  <CloudSun className="w-5 h-5 text-amber-500" />
                  <h3 className="font-bold text-sm text-gray-900">Agromet Micro-Climate & Alerts</h3>
                </div>
                <span className="text-xs text-gray-500">{weather.location}</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div className="p-3 bg-gray-50 rounded-xl">
                  <span className="text-xs text-gray-500 block">Temperature</span>
                  <span className="text-xl font-black text-gray-900">{weather.temperature}°C</span>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl">
                  <span className="text-xs text-gray-500 block">Humidity</span>
                  <span className="text-xl font-black text-gray-900">{weather.humidity}%</span>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl">
                  <span className="text-xs text-gray-500 block">Rainfall</span>
                  <span className="text-xl font-black text-gray-900">{weather.rainfall} mm</span>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl">
                  <span className="text-xs text-gray-500 block">Wind Speed</span>
                  <span className="text-xl font-black text-gray-900">{weather.wind_speed} km/h</span>
                </div>
              </div>

              <div className="p-4 bg-emerald-50/70 border border-emerald-100 rounded-xl space-y-1">
                <span className="text-xs font-bold text-forest-800 uppercase tracking-wider block">Today's Field Advisory</span>
                <p className="text-xs text-gray-700 leading-relaxed">{weather.advisory_summary}</p>
              </div>
            </div>
          )}

          {/* AI Crop Recommendation Highlight */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                <Sprout className="w-5 h-5 text-forest-700" />
                <h3 className="font-bold text-sm text-gray-900">Crop Recommendation Engine</h3>
              </div>
              <Link to="/crop-recommendation" className="text-xs font-semibold text-forest-800 hover:underline">
                Run Soil Test &rarr;
              </Link>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              Our Random Forest model analyzes your nitrogen, phosphorus, potassium, and soil pH to forecast the highest-yielding crop with 0% unverified guesswork.
            </p>
            <div className="flex items-center justify-between p-3.5 bg-forest-50 border border-forest-100 rounded-xl">
              <div>
                <span className="text-xs text-gray-500 block">Current Season Suggestion</span>
                <span className="text-base font-bold text-forest-900">🌾 Wheat / Lokwan (Rabi Sowing)</span>
              </div>
              <Link
                to="/crop-recommendation"
                className="px-3.5 py-1.5 bg-forest-800 text-white rounded-lg text-xs font-bold hover:bg-forest-900"
              >
                Analyze Soil
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column: Upcoming Tasks & Mandi Prices (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Upcoming Agricultural Tasks */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-forest-700" />
                <h3 className="font-bold text-sm text-gray-900">Upcoming Farming Tasks</h3>
              </div>
              <Link to="/crop-calendar" className="text-xs font-semibold text-forest-800 hover:underline">
                View All &rarr;
              </Link>
            </div>

            <div className="space-y-2.5">
              {tasks.length === 0 ? (
                <p className="text-xs text-gray-500 py-3 text-center">No tasks scheduled yet.</p>
              ) : (
                tasks.slice(0, 4).map((t) => (
                  <div
                    key={t.id}
                    onClick={() => toggleTask(t.id, t.is_completed)}
                    className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${
                      t.is_completed ? 'bg-gray-50 border-gray-200 text-gray-400' : 'bg-white border-gray-200 text-gray-800 hover:bg-forest-50/50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        t.is_completed ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-gray-400'
                      }`}>
                        {t.is_completed && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </div>
                      <div>
                        <span className={`text-xs font-bold block ${t.is_completed ? 'line-through' : ''}`}>
                          {t.task_title}
                        </span>
                        <span className="text-[10px] text-gray-500">{t.crop_name} • {t.stage}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Local Mandi Benchmark Rates */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                <Store className="w-5 h-5 text-forest-700" />
                <h3 className="font-bold text-sm text-gray-900">APMC Mandi Rates</h3>
              </div>
              <Link to="/mandi" className="text-xs font-semibold text-forest-800 hover:underline">
                Compare Mandis &rarr;
              </Link>
            </div>

            <div className="space-y-2">
              {mandiPrices.map((m) => (
                <div key={m.id} className="p-2.5 bg-gray-50 rounded-xl flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-gray-800 block">{m.commodity} ({m.variety})</span>
                    <span className="text-[10px] text-gray-500">{m.market}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-black text-forest-900 block">₹{m.modal_price}</span>
                    <span className="text-[9px] text-gray-400">/ Quintal</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
