import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sprout, CloudSun, Activity, Calendar, MessageSquareText, Store,
  CheckCircle2, ArrowRight, ShieldCheck, Sparkles, TrendingUp
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import ConnectionStatusBanner from '../../components/ConnectionStatusBanner';
import SylvaWoodlandBackground from '../../components/SylvaWoodlandBackground';

export default function Home() {
  const { t } = useLanguage();
  const { user } = useAuth();

  const features = [
    {
      icon: Sprout,
      title: t('home.features.cropRec.title'),
      desc: t('home.features.cropRec.desc'),
      link: "/crop-recommendation",
      badge: t('home.features.cropRec.badge')
    },
    {
      icon: CloudSun,
      title: t('home.features.weather.title'),
      desc: t('home.features.weather.desc'),
      link: "/weather",
      badge: t('home.features.weather.badge')
    },
    {
      icon: Store,
      title: t('home.features.mandi.title'),
      desc: t('home.features.mandi.desc'),
      link: "/mandi",
      badge: t('home.features.mandi.badge')
    },
    {
      icon: Activity,
      title: t('home.features.soil.title'),
      desc: t('home.features.soil.desc'),
      link: "/soil-health",
      badge: t('home.features.soil.badge')
    },
    {
      icon: Calendar,
      title: t('home.features.calendar.title'),
      desc: t('home.features.calendar.desc'),
      link: "/crop-calendar",
      badge: t('home.features.calendar.badge')
    },
    {
      icon: MessageSquareText,
      title: t('home.features.aiChat.title'),
      desc: t('home.features.aiChat.desc'),
      link: "/ai-assistant",
      badge: t('home.features.aiChat.badge')
    }
  ];

  const steps = [
    { step: "01", title: t('home.steps.0.title'), desc: t('home.steps.0.desc') },
    { step: "02", title: t('home.steps.1.title'), desc: t('home.steps.1.desc') },
    { step: "03", title: t('home.steps.2.title'), desc: t('home.steps.2.desc') },
    { step: "04", title: t('home.steps.3.title'), desc: t('home.steps.3.desc') }
  ];

  return (
    <div className="relative min-h-screen">
      {/* 3D Sylva Woodland Interactive Living Nature Background */}
      <SylvaWoodlandBackground />

      <div className="relative z-10 space-y-16 pb-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-forest-50/75 via-white/85 to-agriBg/90 backdrop-blur-xs pt-16 pb-20 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-forest-100/80 border border-forest-200 text-forest-800 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-forest-700" />
                <span>{t('home.heroBadge')}</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-forest-900 tracking-tight leading-[1.15]">
                {t('home.heroTitle1')} <br />
                <span className="text-forest-700">{t('home.heroTitle2')}</span> <br />
                <span className="text-leaf-600">{t('home.heroTitle3')}</span>
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl leading-relaxed mx-auto lg:mx-0">
                {t('home.heroSubtitle')}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to={user ? "/dashboard" : "/register"}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-forest-800 hover:bg-forest-900 text-white font-semibold text-base shadow-lg shadow-forest-800/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
                >
                  <span>{user ? t('nav.dashboard') : t('home.btnGetStarted')}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/crop-recommendation"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white hover:bg-gray-50 border border-gray-300 text-gray-800 font-semibold text-base shadow-sm flex items-center justify-center gap-2 transition-colors"
                >
                  <Sprout className="w-4 h-4 text-forest-700" />
                  <span>{t('featuresPage.items.cropRec.title')}</span>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 border-t border-gray-200/60 grid grid-cols-3 gap-4 text-center lg:text-left">
                <div>
                  <div className="text-2xl font-bold text-forest-800">100%</div>
                  <div className="text-xs text-gray-500 font-medium">ICAR Verified</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-forest-800">6 Core</div>
                  <div className="text-xs text-gray-500 font-medium">Smart Modules</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-forest-800">2 Langs</div>
                  <div className="text-xs text-gray-500 font-medium">EN & हिन्दी</div>
                </div>
              </div>
            </div>

            {/* Hero Right Visual Card */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 space-y-6">
                <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                  <div className="flex items-center gap-3">
                    <img src="/logo-icon.png" alt="Logo" className="w-10 h-10 object-contain rounded-xl" />
                    <div>
                      <h3 className="text-sm font-bold text-gray-900">{t('featuresPage.items.cropRec.title')}</h3>
                      <p className="text-xs text-gray-500">Soil: N-90, P-42, K-43 | pH: 6.5</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Validated Model
                  </span>
                </div>

                {/* Recommendation Result Sample */}
                <div className="bg-gradient-to-r from-forest-50 to-leaf-50 p-4 rounded-xl border border-forest-100 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-forest-900 uppercase tracking-wider">Top Recommended Crop</span>
                    <span className="text-xs font-bold text-forest-800 bg-white px-2.5 py-0.5 rounded-full border border-forest-200">
                      98.4% Match
                    </span>
                  </div>
                  <div className="text-2xl font-black text-forest-900">Rice (Paddy / धान)</div>
                  <p className="text-xs text-gray-600">Optimal season: Kharif | Clayey & alluvial loam with good moisture retention.</p>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <span className="text-gray-500 block">Sowing Window</span>
                    <span className="font-bold text-gray-900">June 15 - July 15</span>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <span className="text-gray-500 block">Current Mandi Rate</span>
                    <span className="font-bold text-forest-800">₹2,250 / Qtl</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Backend & Database Connection Health Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ConnectionStatusBanner />
      </div>

      {/* Core Platform Modules */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase text-forest-800 tracking-wider">
            {t('home.featuresBadge')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            {t('home.featuresHeading')}
          </h2>
          <p className="text-gray-600 text-sm">
            {t('home.featuresSubheading')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="bg-white p-7 rounded-2xl border border-gray-200/80 shadow-sm hover:shadow-md hover:border-forest-300 transition-all flex flex-col justify-between group space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-forest-50 text-forest-800 flex items-center justify-center group-hover:bg-forest-800 group-hover:text-white transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold text-forest-800 bg-forest-50 px-2.5 py-1 rounded-full border border-forest-100">
                      {feat.badge}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-forest-800 transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <Link
                    to={feat.link}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-forest-800 hover:text-forest-900 transition-colors"
                  >
                    <span>{t('featuresPage.openModule')}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* How it Works / 4 Steps Workflow */}
      <section className="bg-forest-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase text-leaf-400 tracking-wider">
              {t('home.workflowBadge')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              {t('home.workflowHeading')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((st) => (
              <div key={st.step} className="bg-forest-800/80 p-6 rounded-2xl border border-forest-700/80 space-y-4">
                <div className="text-3xl font-black text-leaf-400">
                  {st.step}
                </div>
                <h4 className="text-base font-bold text-white">{st.title}</h4>
                <p className="text-xs text-gray-300 leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-forest-800 to-forest-900 text-white rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-xl">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            {t('home.ctaHeading')}
          </h2>
          <p className="text-sm text-gray-300 max-w-xl mx-auto leading-relaxed">
            {t('home.ctaSubheading')}
          </p>
          <div className="pt-2">
            <Link
              to="/register"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-leaf-500 hover:bg-leaf-400 text-forest-950 font-bold text-sm shadow-lg transition-transform hover:scale-105"
            >
              <span>{t('home.btnRegisterNow')}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
      </div>
    </div>
  );
}
