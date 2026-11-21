import React, { useState } from 'react';
import { CloudSun, Droplets, Wind, AlertCircle, Sun, CloudRain, MapPin, ShieldCheck, Thermometer } from 'lucide-react';
import PageHeader from '../../components/PageHeader';
import WeatherCard from '../../components/WeatherCard';
import { CURRENT_WEATHER_MOCK, ASSAM_LOCATIONS } from '../../data/mockData';
import { useLanguage } from '../../context/LanguageContext';

export default function Weather() {
  const { t } = useLanguage();
  const [selectedLoc, setSelectedLoc] = useState('silchar');

  const locObj = ASSAM_LOCATIONS.find(l => l.id === selectedLoc) || ASSAM_LOCATIONS[0];

  const advisories = [
    {
      category: t('weatherPage.irrigationCategory', 'Irrigation & Drainage'),
      title: t('weatherPage.irrigationTitle', 'Water Management for Barak River Basin'),
      guidance: t('weatherPage.irrigationDesc', 'With relative humidity at 82% and mild overcast skies, water evaporation from paddy fields is low. Maintain 2-3 cm standing water in Sali rice fields; hold back additional pump irrigation.'),
      type: 'Barak Agromet Division (Benchmark Advisory)'
    },
    {
      category: t('weatherPage.sprayingCategory', 'Crop Protection & Spraying'),
      title: t('weatherPage.sprayingTitle', 'Knapsack Spraying Precautions'),
      guidance: t('weatherPage.sprayingDesc', 'Wind speed is calm at 8 km/h. Suitable for foliar spray of organic neem oil (NSKE 5%) or zinc sulphate. Cease spraying if evening mist clouds thicken.'),
      type: 'Agronomy Practice'
    },
    {
      category: t('weatherPage.harvestCategory', 'Post-Harvest Alert'),
      title: t('weatherPage.harvestTitle', 'Ahu Rice & Grain Drying Notice'),
      guidance: t('weatherPage.harvestDesc', 'Ensure harvested grains are covered with tarpaulin sheets overnight to avoid moisture absorption from early winter morning dews.'),
      type: 'Seasonal Reminder'
    }
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        badge={t('weatherPage.badge', 'Agromet Weather Division')}
        title={t('weatherPage.title', 'Weather & Agricultural Advisory')}
        subtitle={t('weatherPage.subtitle', 'Hyperlocal weather forecasts and crop-growth stage advisories for Assam farmers.')}
        actionButton={
          <div className="flex items-center gap-2 bg-km-surface px-3 py-1.5 rounded-2xl border border-km-border shadow-subtle text-xs">
            <MapPin className="w-3.5 h-3.5 text-km-sage" />
            <select
              value={selectedLoc}
              onChange={(e) => setSelectedLoc(e.target.value)}
              className="bg-transparent font-bold text-km-dark focus:outline-none cursor-pointer text-xs"
            >
              {ASSAM_LOCATIONS.map(l => (
                <option key={l.id} value={l.id}>{l.name}, {l.district}</option>
              ))}
            </select>
          </div>
        }
      />

      {/* Main Weather Card */}
      <WeatherCard weather={{ ...CURRENT_WEATHER_MOCK, location: `${locObj.name}, ${locObj.district}, Assam` }} />

      {/* Detailed Advisories */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-km-dark">{t('weatherPage.guidanceTitle', 'Stage-Specific Agricultural Guidance')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {advisories.map((adv, idx) => (
            <div key={idx} className="bg-km-surface p-6 rounded-3xl border border-km-border shadow-subtle space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="px-2.5 py-0.5 rounded-full bg-km-bg text-km-sage text-[10px] font-bold border border-km-border inline-block">
                  {adv.category}
                </span>
                <h4 className="text-sm font-bold text-km-dark">{adv.title}</h4>
                <p className="text-xs text-km-subtext leading-relaxed">{adv.guidance}</p>
              </div>
              <div className="pt-3 border-t border-km-border/60 text-[10px] text-km-subtext/80 font-medium">
                {adv.type}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
