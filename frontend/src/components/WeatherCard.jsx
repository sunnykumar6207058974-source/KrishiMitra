import React from 'react';
import { CloudFog, CloudSun, Sun, CloudRain, Droplets, Wind, ShieldCheck } from 'lucide-react';

export default function WeatherCard({ weather }) {
  if (!weather) return null;

  return (
    <div className="bg-km-surface rounded-3xl p-6 border border-km-border shadow-subtle space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-km-border/80 pb-3">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-km-sage block">
            Agromet Local Weather
          </span>
          <h3 className="text-lg font-bold text-km-dark">{weather.location}</h3>
        </div>
        <div className="text-right">
          <span className="text-[10px] font-bold text-km-deep bg-km-bg px-2.5 py-1 rounded-full border border-km-border inline-block">
            Barak Valley Zone
          </span>
        </div>
      </div>

      {/* Main Temperature & Primary Metric */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
        <div className="sm:col-span-5 flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-km-bg border border-km-border flex items-center justify-center text-km-sage shrink-0">
            <CloudSun className="w-10 h-10 text-amber-500" />
          </div>
          <div>
            <div className="text-4xl font-black text-km-dark tracking-tight">
              {weather.temp}°C
            </div>
            <span className="text-xs font-semibold text-km-subtext">{weather.condition}</span>
          </div>
        </div>

        {/* 3 Metric Pills */}
        <div className="sm:col-span-7 grid grid-cols-3 gap-2.5 text-center">
          <div className="p-3 rounded-2xl bg-km-bg border border-km-border">
            <Droplets className="w-4 h-4 text-sky-600 mx-auto mb-1" />
            <span className="text-[10px] text-km-subtext block">Humidity</span>
            <span className="text-sm font-bold text-km-dark">{weather.humidity}%</span>
          </div>
          <div className="p-3 rounded-2xl bg-km-bg border border-km-border">
            <CloudRain className="w-4 h-4 text-indigo-600 mx-auto mb-1" />
            <span className="text-[10px] text-km-subtext block">Rainfall</span>
            <span className="text-sm font-bold text-km-dark">{weather.rainfall} mm</span>
          </div>
          <div className="p-3 rounded-2xl bg-km-bg border border-km-border">
            <Wind className="w-4 h-4 text-teal-600 mx-auto mb-1" />
            <span className="text-[10px] text-km-subtext block">Wind</span>
            <span className="text-sm font-bold text-km-dark">{weather.windSpeed} km/h</span>
          </div>
        </div>
      </div>

      {/* 7-Day Forecast Strip */}
      <div className="space-y-2 pt-2 border-t border-km-border/60">
        <span className="text-[11px] font-bold text-km-dark block">7-Day Farming Outlook</span>
        <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 overflow-x-auto pb-1">
          {weather.forecast7Days?.map((d, i) => (
            <div key={i} className="p-2.5 rounded-2xl bg-km-bg/60 border border-km-border/60 text-center space-y-1">
              <span className="text-[10px] font-bold text-km-dark block">{d.day}</span>
              <span className="text-[9px] text-km-subtext block">{d.date}</span>
              <div className="text-xs font-black text-km-dark">{d.max}° / <span className="text-km-subtext font-normal">{d.min}°</span></div>
              <span className="text-[8px] font-semibold text-sky-700 bg-sky-50 px-1 py-0.5 rounded block">
                {d.rainChance}% rain
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
