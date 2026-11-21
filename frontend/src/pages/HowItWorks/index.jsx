import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      num: "1",
      title: "Profile & Farm Registration",
      desc: "Farmers register using their mobile number, select their state and district, and enter approximate farm size and soil type without tedious GPS or complex requirements."
    },
    {
      num: "2",
      title: "Soil & Parameter Entry",
      desc: "Enter your Soil Health Card laboratory values (N, P, K, pH) or choose your regional averages. Our soil analyzer immediately grades your soil fertility status."
    },
    {
      num: "3",
      title: "ML Crop Recommendation",
      desc: "Our machine learning pipeline compares your soil chemistry, current season, and rainfall with agronomic thresholds to recommend the most optimal and profitable crop."
    },
    {
      num: "4",
      title: "Dynamic Seasonal Schedule",
      desc: "KrishiMitra creates an automated crop calendar showing exact critical dates for irrigation, fertilizer split-applications, and pest monitoring."
    },
    {
      num: "5",
      title: "Weather Advisories & Mandi Tracking",
      desc: "Receive hyperlocal weather advisories before undertaking field spraying or watering, and monitor live APMC mandi rates to time your harvest sales."
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center space-y-3">
        <span className="text-xs font-bold uppercase text-forest-800 tracking-wider">Clear Workflow</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">How KrishiMitra Works</h1>
        <p className="text-gray-600 text-sm max-w-xl mx-auto">
          An intuitive, 5-step journey transforming traditional farming intuition into scientifically validated decisions.
        </p>
      </div>

      <div className="space-y-6">
        {steps.map((s) => (
          <div key={s.num} className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-sm flex items-start gap-5">
            <div className="w-10 h-10 rounded-xl bg-forest-800 text-white font-black text-lg flex items-center justify-center shrink-0">
              {s.num}
            </div>
            <div className="space-y-1.5">
              <h3 className="text-base font-bold text-gray-900">{s.title}</h3>
              <p className="text-xs text-gray-600 leading-relaxed">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center pt-4">
        <Link to="/register" className="inline-flex items-center gap-2 px-6 py-3 bg-forest-800 text-white font-bold rounded-xl shadow-md hover:bg-forest-900 transition-colors">
          <span>Get Started Now</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
