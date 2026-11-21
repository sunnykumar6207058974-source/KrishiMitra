import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, CloudSun, Activity, Calendar, MessageSquareText, Store, ArrowRight, ShieldCheck } from 'lucide-react';

export default function Features() {
  const list = [
    {
      title: "AI Crop Recommendation",
      icon: Sprout,
      desc: "Analyzes 7 critical agronomic variables (Nitrogen, Phosphorus, Potassium, Soil pH, Temperature, Humidity, and Rainfall) through a trained Random Forest model. Evaluates regional suitability and outputs recommended sowing windows and limitation precautions.",
      link: "/crop-recommendation"
    },
    {
      title: "Agromet Weather Advisory",
      icon: CloudSun,
      desc: "Delivers 5-day localized forecasts, precipitation probability, and actionable farming alerts customized for your crop stage (irrigation timings, pest scout warnings, spraying speed safety).",
      link: "/weather"
    },
    {
      title: "Soil Health Analyzer",
      icon: Activity,
      desc: "Translates complex Soil Health Card laboratory parameters into simple ratings (Low, Medium, High) with balanced chemical and organic amendment suggestions (compost, gypsum, lime).",
      link: "/soil-health"
    },
    {
      title: "APMC Mandi Price Tracker",
      icon: Store,
      desc: "Tracks commodity market arrivals, minimum, maximum, and modal benchmark rates across Indian districts with APMC comparison tools.",
      link: "/mandi"
    },
    {
      title: "Dynamic Crop Calendar",
      icon: Calendar,
      desc: "Provides a stage-by-stage farming timeline (Land Prep, Sowing, Crown Root Irrigation, Top Dressing, Weeding, Harvesting) with interactive task completion tracking.",
      link: "/crop-calendar"
    },
    {
      title: "Krishi AI Assistant",
      icon: MessageSquareText,
      desc: "A multilingual question-and-answer assistant built on Retrieval-Augmented Generation (RAG) using verified ICAR publications with strict safety disclaimers against unverified chemicals.",
      link: "/ai-chat"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase text-forest-800 tracking-wider">Comprehensive Toolkit</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">Platform Features</h1>
        <p className="text-gray-600 text-sm">
          Built to guide Indian farmers through every phase of the cultivation cycle: from soil test to harvest and mandi sale.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {list.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-sm flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-forest-50 text-forest-800 flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
              <Link
                to={item.link}
                className="pt-3 border-t border-gray-100 inline-flex items-center gap-1.5 text-xs font-semibold text-forest-800 hover:text-forest-900"
              >
                <span>Launch Tool</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
