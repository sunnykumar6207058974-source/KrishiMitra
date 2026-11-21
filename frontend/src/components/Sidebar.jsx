import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import {
  Sprout,
  LayoutDashboard,
  CloudSun,
  Calendar,
  Activity,
  ScanEye,
  Store,
  MessageSquareText,
  Tractor,
  Settings,
  LogOut,
  X,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Sidebar({ isOpen, onClose }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { name: 'Dashboard', path: '/app/dashboard', icon: LayoutDashboard },
    { name: 'Crop Recommendation', path: '/app/crop-recommendation', icon: Sprout },
    { name: 'Weather & Advisory', path: '/app/weather', icon: CloudSun },
    { name: 'Crop Calendar', path: '/app/calendar', icon: Calendar },
    { name: 'Soil Health', path: '/app/soil-health', icon: Activity },
    { name: 'Disease Detection', path: '/app/disease-detection', icon: ScanEye },
    { name: 'Market Prices', path: '/app/market-prices', icon: Store },
    { name: 'AI Farming Assistant', path: '/app/ai-assistant', icon: MessageSquareText },
    { name: 'My Farm', path: '/app/my-farm', icon: Tractor },
    { name: 'Settings & Profile', path: '/app/settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-km-deep/40 backdrop-blur-xs lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-km-deep text-white flex flex-col justify-between border-r border-km-deep/80 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-2xl bg-km-sage text-white flex items-center justify-center shadow-md shadow-km-sage/30 group-hover:scale-105 transition-transform">
              <Sprout className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-white block leading-none">
                Krishi<span className="text-km-muted">Mitra</span>
              </span>
              <span className="text-[10px] text-km-muted font-medium tracking-wider uppercase mt-1 block">
                Assam & National Agri-Platform
              </span>
            </div>
          </Link>

          <button
            onClick={onClose}
            className="p-1.5 text-km-muted hover:text-white rounded-lg lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto px-4 py-5 space-y-1">
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-km-muted">
            Main Modules
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                    isActive
                      ? 'bg-km-sage text-white shadow-sm'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                <Icon className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110" />
                <span className="flex-1 truncate">{item.name}</span>
                <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </NavLink>
            );
          })}
        </div>

        {/* Footer Profile & Logout */}
        <div className="p-4 border-t border-white/10 bg-black/20">
          <div className="flex items-center justify-between p-2 rounded-xl bg-white/5 border border-white/5">
            <Link to="/app/settings" className="flex items-center gap-2.5 min-w-0 flex-1">
              <div className="w-9 h-9 rounded-xl bg-km-sage/40 border border-km-sage text-white flex items-center justify-center text-xs font-bold shrink-0">
                {user?.full_name?.[0] || 'R'}
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-xs font-bold text-white block truncate">
                  {user?.full_name || 'Ramesh Patel'}
                </span>
                <span className="text-[10px] text-km-muted block truncate">
                  Silchar, Assam
                </span>
              </div>
            </Link>

            <button
              onClick={handleLogout}
              title="Logout"
              className="p-2 text-km-muted hover:text-red-400 rounded-lg hover:bg-white/5 transition-colors shrink-0"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
