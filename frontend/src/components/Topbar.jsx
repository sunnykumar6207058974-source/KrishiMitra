import React, { useState } from 'react';
import {
  Menu,
  Search,
  MapPin,
  Bell,
  User,
  CheckCircle2,
  ChevronDown,
  X,
  ExternalLink,
  Globe
} from 'lucide-react';
import { ASSAM_LOCATIONS } from '../data/mockData';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';

export default function Topbar({ onMenuClick, title, breadcrumb }) {
  const { user } = useAuth();
  const { lang, setLang, t } = useLanguage();
  const [selectedLocation, setSelectedLocation] = useState(ASSAM_LOCATIONS[0].id);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const notifications = [
    { id: 1, title: 'Advisory: Sali Paddy Tillering', time: '10m ago', unread: true },
    { id: 2, title: 'Weather: Passing rain alert for Cachar', time: '1h ago', unread: true },
    { id: 3, title: 'Mandi: Silchar APMC prices updated', time: '4h ago', unread: false },
  ];

  const currentLocationObj = ASSAM_LOCATIONS.find(l => l.id === selectedLocation) || ASSAM_LOCATIONS[0];

  return (
    <header className="sticky top-0 z-30 bg-km-surface/90 backdrop-blur-md border-b border-km-border px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
      {/* Left: Mobile Toggle & Page Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="p-2 text-km-dark hover:bg-km-bg rounded-xl lg:hidden focus:outline-none"
        >
          <Menu className="w-5 h-5 text-km-dark" />
        </button>

        <div>
          {breadcrumb && (
            <span className="text-[10px] font-semibold tracking-wider text-km-subtext uppercase block">
              {breadcrumb}
            </span>
          )}
          <h1 className="text-base sm:text-lg font-bold text-km-dark tracking-tight leading-tight">
            {title || 'Farmer Dashboard'}
          </h1>
        </div>
      </div>

      {/* Middle: Search Field */}
      <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-km-subtext absolute left-3.5 top-2.5" />
          <input
            type="text"
            placeholder={t('topbar.search', 'Search crops, weather, advisories, mandi rates...')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-km-bg/80 hover:bg-km-bg focus:bg-white text-xs font-medium text-km-dark placeholder-km-subtext rounded-xl border border-transparent focus:border-km-sage focus:outline-none transition-all"
          />
        </div>
      </div>

      {/* Right Controls: Language, Location, Notifications, Profile */}
      <div className="flex items-center gap-2.5">
        {/* Language Selector */}
        <div className="relative flex items-center gap-1.5 bg-km-bg px-2.5 py-1.5 rounded-xl border border-km-border text-xs">
          <Globe className="w-3.5 h-3.5 text-km-sage shrink-0" />
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            className="bg-transparent focus:outline-none font-bold text-km-dark cursor-pointer text-xs pr-1"
          >
            <option value="en">English</option>
            <option value="hi">हिन्दी</option>
          </select>
        </div>
        {/* Location Selector (Assam Benchmark Focus) */}
        <div className="relative flex items-center gap-1.5 bg-km-bg px-3 py-1.5 rounded-xl border border-km-border text-xs">
          <MapPin className="w-3.5 h-3.5 text-km-sage shrink-0" />
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="bg-transparent focus:outline-none font-bold text-km-dark cursor-pointer text-xs pr-1"
          >
            {ASSAM_LOCATIONS.map((loc) => (
              <option key={loc.id} value={loc.id}>
                {loc.name}, {loc.district} (Assam)
              </option>
            ))}
          </select>
        </div>

        {/* Notifications Button */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 text-km-subtext hover:text-km-dark hover:bg-km-bg rounded-xl border border-km-border relative transition-colors"
          >
            <Bell className="w-4 h-4" />
            <span className="w-2 h-2 rounded-full bg-emerald-500 absolute top-1.5 right-1.5" />
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-floating border border-km-border p-3 z-50 space-y-2">
              <div className="flex items-center justify-between pb-2 border-b border-km-border/60">
                <span className="text-xs font-bold text-km-dark">Notifications</span>
                <span className="text-[10px] text-km-sage font-semibold">2 new</span>
              </div>
              <div className="space-y-1.5">
                {notifications.map((n) => (
                  <div key={n.id} className="p-2 rounded-xl bg-km-bg/50 hover:bg-km-bg text-xs space-y-0.5 cursor-pointer">
                    <span className="font-semibold text-km-dark block text-[11px]">{n.title}</span>
                    <span className="text-[9px] text-km-subtext">{n.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Avatar Link */}
        <Link
          to="/app/settings"
          className="flex items-center gap-2 p-1 pl-2 bg-km-bg border border-km-border rounded-xl hover:border-km-sage transition-colors"
        >
          <span className="text-xs font-bold text-km-dark hidden sm:inline">
            {user?.full_name?.split(' ')[0] || 'Ramesh'}
          </span>
          <div className="w-7 h-7 rounded-lg bg-km-deep text-white flex items-center justify-center text-xs font-bold">
            {user?.full_name?.[0] || 'R'}
          </div>
        </Link>
      </div>
    </header>
  );
}
