import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Sprout, Menu, X, Globe, User, LogOut, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { lang, setLang, t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = [
    { name: t('navHome'), path: '/' },
    { name: t('navFeatures'), path: '/features' },
    { name: t('navHowItWorks'), path: '/how-it-works' },
    { name: t('navAbout'), path: '/about' },
    { name: t('navContact'), path: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5">
            <img
              src="/logo-icon.png"
              alt="KrishiMitra Logo"
              className="w-10 h-10 object-contain rounded-xl drop-shadow-sm"
            />
            <div>
              <span className="text-xl font-bold tracking-tight text-forest-900 block leading-none">
                Krishi<span className="text-leaf-600">Mitra</span>
              </span>
              <span className="text-[10px] text-gray-500 tracking-wider uppercase font-semibold">
                Smart Agro Platform
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'text-forest-800 bg-forest-50'
                    : 'text-gray-600 hover:text-forest-800 hover:bg-gray-50'
                }`}
              >
                {link.name}
              </Link>
            ))}

            <Link
              to="/dashboard"
              className="ml-2 px-3.5 py-1.5 rounded-lg text-sm font-semibold bg-forest-100 text-forest-800 flex items-center gap-1.5 hover:bg-forest-200"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>{t('navDashboard')}</span>
            </Link>
          </nav>

          {/* Right Controls: Language & Auth */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language Selector */}
            <div className="flex items-center gap-1 bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-xs font-medium text-gray-700">
              <Globe className="w-3.5 h-3.5 text-forest-700" />
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value)}
                className="bg-transparent focus:outline-none cursor-pointer text-gray-800 font-semibold"
              >
                <option value="en">English</option>
                <option value="hi">हिन्दी</option>
                <option value="as">অসমীয়া</option>
              </select>
            </div>

            {user ? (
              <div className="flex items-center gap-2">
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                  <div className="w-6 h-6 rounded-full bg-forest-800 text-white flex items-center justify-center text-xs">
                    {user.full_name?.[0] || 'K'}
                  </div>
                  <span className="truncate max-w-[120px]">{user.full_name?.split(' ')[0]}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  title="Logout"
                  className="p-2 text-gray-500 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-semibold text-forest-800 hover:text-forest-900"
                >
                  {t('btnLogin')}
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm font-semibold text-white bg-forest-800 hover:bg-forest-900 rounded-lg shadow-sm hover:shadow transition-all"
                >
                  {t('btnRegister')}
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="bg-gray-50 border border-gray-200 text-xs rounded px-1.5 py-1 text-gray-700"
            >
              <option value="en">EN</option>
              <option value="hi">HI</option>
              <option value="as">AS</option>
            </select>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-gray-200 bg-white px-4 pt-2 pb-6 space-y-3">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-50"
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-semibold text-forest-800 bg-forest-50"
            >
              {t('navDashboard')}
            </Link>
          </div>

          <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
            {user ? (
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-700">{user.full_name}</span>
                <button
                  onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                  className="px-3 py-1.5 text-xs text-red-600 font-medium bg-red-50 rounded-lg"
                >
                  {t('btnLogout')}
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 py-2 text-center text-sm font-semibold border border-forest-800 text-forest-800 rounded-lg"
                >
                  {t('btnLogin')}
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 py-2 text-center text-sm font-semibold bg-forest-800 text-white rounded-lg"
                >
                  {t('btnRegister')}
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
