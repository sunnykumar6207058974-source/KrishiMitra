import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sprout, CloudSun, Activity, Calendar, MessageSquareText, Store,
  CheckCircle2, ArrowRight, ShieldCheck, Sparkles, TrendingUp, Users, MapPin
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import ConnectionStatusBanner from '../../components/ConnectionStatusBanner';

export default function Home() {
  const { t } = useLanguage();
  const { user } = useAuth();

  const features = [
    {
      icon: Sprout,
      title: "AI Crop Recommendation",
      desc: "Validated machine learning model recommending the best crops using soil N-P-K, pH, temperature, and local rainfall.",
      link: "/crop-recommendation",
      badge: "ML Powered"
    },
    {
      icon: CloudSun,
      title: "Agromet Weather Advisory",
      desc: "Hyperlocal weather forecasts and crop-growth stage advisories for irrigation, spraying, and harvesting precautions.",
      link: "/weather",
      badge: "IMD Grounded"
    },
    {
      icon: Store,
      title: "APMC Mandi Price Tracker",
      desc: "Live market commodity rates across Indian mandis with minimum, maximum, and modal price trends.",
      link: "/mandi",
      badge: "AGMARKNET"
    },
    {
      icon: Activity,
      title: "Soil Health Analyzer",
      desc: "Evaluate your Soil Health Card test values, calculate nutrient deficiency, and get custom organic & fertilizer plans.",
      link: "/soil-health",
      badge: "Soil Card"
    },
    {
      icon: Calendar,
      title: "Dynamic Crop Calendar",
      desc: "Automated seasonal schedule for sowing, weeding, crown root irrigation, and harvesting with task tracking.",
      link: "/crop-calendar",
      badge: "Scheduler"
    },
    {
      icon: MessageSquareText,
      title: "Krishi AI Assistant",
      desc: "Agricultural chatbot grounded in verified ICAR research publications with multilingual voice & text support.",
      link: "/ai-chat",
      badge: "RAG AI"
    }
  ];

  const steps = [
    { step: "01", title: "Enter Soil & Farm Profile", desc: "Input your soil test values (N, P, K, pH) or select your regional district." },
    { step: "02", title: "Get ML Recommendations", desc: "Our validated Random Forest pipeline determines the most profitable and suitable crop." },
    { step: "03", title: "Follow Seasonal Calendar", desc: "Receive automated alerts for irrigation, fertilizer split-doses, and weather precautions." },
    { step: "04", title: "Track Market & Sell Smart", desc: "Check live APMC mandi prices in your district to choose the best time and market to sell." }
  ];

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-forest-50/80 via-white to-agriBg pt-16 pb-20 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-forest-100/80 border border-forest-200 text-forest-800 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-forest-700" />
                <span>AI-Powered Digital Agriculture Mission</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-forest-900 tracking-tight leading-[1.15]">
                Smart Farming. <br />
                <span className="text-forest-700">Better Decisions.</span> <br />
                <span className="text-leaf-600">Stronger Harvests.</span>
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl leading-relaxed mx-auto lg:mx-0">
                KrishiMitra provides Indian farmers with machine-learning crop selection, soil health diagnostics, weather risk alerts, and transparent APMC mandi price tracking.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to={user ? "/dashboard" : "/register"}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-forest-800 hover:bg-forest-900 text-white font-semibold text-base shadow-lg shadow-forest-800/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
                >
                  <span>{user ? "Open Farmer Dashboard" : t('btnGetStarted')}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/crop-recommendation"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white hover:bg-gray-50 border border-gray-300 text-gray-800 font-semibold text-base shadow-sm flex items-center justify-center gap-2 transition-colors"
                >
                  <Sprout className="w-4 h-4 text-forest-700" />
                  <span>Try Crop Recommendation</span>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 border-t border-gray-200/60 grid grid-cols-3 gap-4 text-center lg:text-left">
                <div>
                  <div className="text-2xl font-bold text-forest-800">100%</div>
                  <div className="text-xs text-gray-500 font-medium">Verified ICAR Data</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-forest-800">6 Core</div>
                  <div className="text-xs text-gray-500 font-medium">Smart Modules</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-forest-800">3 Langs</div>
                  <div className="text-xs text-gray-500 font-medium">EN, HI, AS Support</div>
                </div>
              </div>
            </div>

            {/* Hero Right Visual Card */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 space-y-6">
                <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-forest-50 border border-forest-200 flex items-center justify-center text-forest-800 font-bold">
                      <Sprout className="w-5 h-5 text-forest-700" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-gray-900">Live Crop Predictor</h3>
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
                    <span className="text-xs font-semibold uppercase text-forest-800">Recommended Crop</span>
                    <span className="text-xs font-bold text-forest-900">Top Match</span>
                  </div>
                  <div className="text-2xl font-black text-forest-900 capitalize flex items-center gap-2">
                    🌾 Rice (Paddy)
                  </div>
                  <p className="text-xs text-gray-600">
                    Optimal compatibility with clayey-loam soil, 202mm rainfall, and warm Kharif season temperatures.
                  </p>
                </div>

                {/* Live Weather Preview Widget */}
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200/80 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CloudSun className="w-8 h-8 text-amber-500" />
                    <div>
                      <span className="text-xs text-gray-500 font-medium block">Local Weather (Pune, MH)</span>
                      <span className="text-base font-bold text-gray-800">28.5°C • Partly Cloudy</span>
                    </div>
                  </div>
                  <Link to="/weather" className="text-xs font-semibold text-forest-800 hover:underline">
                    View &rarr;
                  </Link>
                </div>

                {/* Mandi Preview Widget */}
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200/80 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-gray-500 font-medium block">Wheat (Lokwan) @ Pune APMC</span>
                    <span className="text-base font-bold text-forest-900">₹2,650 <span className="text-xs font-normal text-gray-500">/ Quintal</span></span>
                  </div>
                  <Link to="/mandi" className="text-xs font-semibold text-forest-800 hover:underline">
                    Mandi Rates &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Environment & System Connection Status Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <ConnectionStatusBanner />
      </section>

      {/* Problem & Solution Statement */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-gray-200/80 p-8 sm:p-12 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="space-y-4">
              <span className="text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full uppercase tracking-wider">
                The Farming Challenge
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-snug">
                Why small farmers struggle with unpredictable yields
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                Small and marginal farmers often select crops based on tradition or hearsay rather than scientific soil testing and climate compatibility. Untimely rain, improper fertilizer doses, and lack of live mandi market prices lead to harvest losses and debt.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  <span>Excessive spending on unnecessary chemical fertilizers</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  <span>Selling produce to middlemen below APMC modal rates</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  <span>Delayed irrigation causing vegetative growth failure</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4 bg-forest-50/60 p-6 sm:p-8 rounded-xl border border-forest-100">
              <span className="text-xs font-bold text-forest-800 bg-forest-100 px-3 py-1 rounded-full uppercase tracking-wider">
                The KrishiMitra Solution
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-forest-900">
                Data-driven, actionable intelligence right in the farmer's hands
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                KrishiMitra combines supervised machine learning with verified agricultural scientific repositories (ICAR, KVK, IMD) to provide clear recommendations with zero guesswork.
              </p>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="bg-white p-3 rounded-lg border border-forest-200">
                  <span className="text-xs text-gray-500 block">Yield Optimization</span>
                  <span className="text-sm font-bold text-forest-800">+25% Better Sowing</span>
                </div>
                <div className="bg-white p-3 rounded-lg border border-forest-200">
                  <span className="text-xs text-gray-500 block">Fertilizer Efficiency</span>
                  <span className="text-sm font-bold text-forest-800">Balanced N-P-K</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Modules Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase text-forest-800 tracking-wider">Platform Capabilities</span>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Everything a farmer needs in one place</h2>
          <p className="text-gray-600 text-sm">
            Designed to be simple, touch-friendly, and accessible across mobile phones and desktop computers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <Link
                key={feat.title}
                to={feat.link}
                className="bg-white rounded-2xl p-6 border border-gray-200/80 hover:border-forest-600 hover:shadow-lg transition-all group flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-forest-50 text-forest-800 flex items-center justify-center group-hover:bg-forest-800 group-hover:text-white transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-semibold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-md">
                      {feat.badge}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-forest-800 transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-gray-100 flex items-center gap-1.5 text-xs font-semibold text-forest-800">
                  <span>Open Feature</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-forest-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase text-leaf-400 tracking-wider">Workflow</span>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">How KrishiMitra Works</h2>
            <p className="text-gray-300 text-sm">
              Simple 4-step process built for quick adoption in the field.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((s) => (
              <div key={s.step} className="bg-forest-800/60 border border-forest-700/80 rounded-2xl p-6 space-y-3 relative">
                <span className="text-3xl font-black text-leaf-500/80 block leading-none font-mono">
                  {s.step}
                </span>
                <h3 className="text-lg font-bold text-white">{s.title}</h3>
                <p className="text-xs text-gray-300 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-forest-800 to-forest-900 rounded-3xl p-8 sm:p-14 text-white text-center space-y-6 shadow-xl">
          <h2 className="text-3xl sm:text-4xl font-extrabold">Ready to make smarter farming decisions?</h2>
          <p className="text-base text-gray-300 max-w-2xl mx-auto">
            Join KrishiMitra today. Test the ML crop recommendation model or explore live mandi rates with zero cost.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              to="/register"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-leaf-500 hover:bg-leaf-600 text-forest-950 font-bold text-base shadow-md transition-colors"
            >
              Register as Farmer
            </Link>
            <Link
              to="/login"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-forest-700/80 hover:bg-forest-700 text-white font-semibold text-base border border-forest-600 transition-colors"
            >
              Sign In (Demo Account Available)
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
