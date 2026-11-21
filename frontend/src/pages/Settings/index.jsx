import React, { useState } from 'react';
import { Settings as SettingsIcon, Globe, Bell, User, ShieldCheck, CheckCircle2 } from 'lucide-react';
import PageHeader from '../../components/PageHeader';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';

export default function Settings() {
  const { user } = useAuth();
  const { lang, setLang, t } = useLanguage();
  const [notifications, setNotifications] = useState({
    weatherAlerts: true,
    taskReminders: true,
    mandiPriceUpdates: false,
  });
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <PageHeader
        badge={t('settingsPage.badge', 'Account & System')}
        title={t('settingsPage.title', 'Settings & Profile Preferences')}
        subtitle={t('settingsPage.subtitle', 'Manage your regional language, communication preferences, and registered farmer details.')}
      />

      {saved && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-800 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{t('settingsPage.saved', 'Preferences updated successfully!')}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSave} className="space-y-6">
        {/* Language Selection Card */}
        <div className="bg-km-surface p-6 rounded-3xl border border-km-border shadow-subtle space-y-4">
          <div className="flex items-center gap-2 border-b border-km-border/60 pb-3">
            <Globe className="w-4 h-4 text-km-sage" />
            <h3 className="text-sm font-bold text-km-dark">
              {t('settingsPage.languageTitle', 'Interface & Advisory Language')}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { id: 'en', label: 'English', desc: 'Default Interface (Standard)' },
              { id: 'hi', label: 'हिन्दी (Hindi)', desc: 'राष्ट्रीय भाषा (National Language)' },
            ].map((item) => (
              <div
                key={item.id}
                onClick={() => setLang(item.id)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  lang === item.id
                    ? 'bg-km-bg border-km-sage ring-1 ring-km-sage'
                    : 'bg-km-surface border-km-border hover:bg-km-bg/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-km-dark">{item.label}</span>
                  {lang === item.id && <CheckCircle2 className="w-4 h-4 text-km-sage" />}
                </div>
                <span className="text-[10px] text-km-subtext mt-1 block">{item.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Notifications Preference */}
        <div className="bg-km-surface p-6 rounded-3xl border border-km-border shadow-subtle space-y-4">
          <div className="flex items-center gap-2 border-b border-km-border/60 pb-3">
            <Bell className="w-4 h-4 text-km-sage" />
            <h3 className="text-sm font-bold text-km-dark">
              {t('settingsPage.notificationsTitle', 'Notification Alerts')}
            </h3>
          </div>

          <div className="space-y-3">
            {[
              {
                key: 'weatherAlerts',
                title: t('settingsPage.weatherAlerts', 'Severe Weather & Rain Alerts'),
                desc: t('settingsPage.weatherAlertsDesc', 'Receive warnings about sudden rain, overcast, or heat waves in your district.')
              },
              {
                key: 'taskReminders',
                title: t('settingsPage.taskReminders', 'Crop Activity Due Reminders'),
                desc: t('settingsPage.taskRemindersDesc', 'Alerts for upcoming sowing, irrigation, and fertilizer split doses.')
              },
              {
                key: 'mandiPriceUpdates',
                title: t('settingsPage.mandiUpdates', 'Weekly Mandi Price Digest'),
                desc: t('settingsPage.mandiUpdatesDesc', 'Summary of wholesale arrival prices for your primary crops in local APMCs.')
              },
            ].map((n) => (
              <div key={n.key} className="flex items-center justify-between p-3 rounded-2xl bg-km-bg/60 border border-km-border">
                <div>
                  <span className="text-xs font-bold text-km-dark block">{n.title}</span>
                  <span className="text-[10px] text-km-subtext">{n.desc}</span>
                </div>
                <input
                  type="checkbox"
                  checked={notifications[n.key]}
                  onChange={(e) => setNotifications({ ...notifications, [n.key]: e.target.checked })}
                  className="w-4 h-4 accent-km-sage rounded cursor-pointer"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Registered Profile Info */}
        <div className="bg-km-surface p-6 rounded-3xl border border-km-border shadow-subtle space-y-4">
          <div className="flex items-center gap-2 border-b border-km-border/60 pb-3">
            <User className="w-4 h-4 text-km-sage" />
            <h3 className="text-sm font-bold text-km-dark">
              {t('settingsPage.farmerProfileTitle', 'Registered Farmer Details')}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="text-[10px] text-km-subtext font-semibold uppercase block mb-1">
                {t('settingsPage.fullName', 'Full Name')}
              </label>
              <input
                type="text"
                disabled
                value={user?.full_name || 'Ramesh Chandra Patel'}
                className="w-full px-3 py-2 rounded-xl border border-km-border bg-km-bg text-km-dark font-semibold"
              />
            </div>
            <div>
              <label className="text-[10px] text-km-subtext font-semibold uppercase block mb-1">
                {t('settingsPage.phone', 'Mobile Number')}
              </label>
              <input
                type="text"
                disabled
                value={user?.mobile_number || '9876543210'}
                className="w-full px-3 py-2 rounded-xl border border-km-border bg-km-bg text-km-dark font-semibold"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="px-6 py-3 bg-km-deep hover:bg-km-sage text-white text-xs font-bold rounded-2xl shadow-subtle transition-colors"
        >
          {t('settingsPage.btnSave', 'Save Preferences')}
        </button>
      </form>
    </div>
  );
}
