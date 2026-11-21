import React, { useState } from 'react';
import { Sprout, Sparkles, CheckCircle2, AlertTriangle, Info, Sliders, MapPin } from 'lucide-react';
import PageHeader from '../../components/PageHeader';
import CropCard from '../../components/CropCard';
import { RECOMMENDED_CROPS_MOCK, ASSAM_LOCATIONS } from '../../data/mockData';

export default function CropRecommendation() {
  const [formData, setFormData] = useState({
    location: 'silchar',
    soilType: 'Heavy Alluvial Clay Loam',
    nitrogen: 245,
    phosphorus: 15,
    potassium: 195,
    ph: 5.4,
    season: 'Sali Season (Kharif)',
    waterAvailability: 'High (Monsoon & Canal)',
  });

  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(RECOMMENDED_CROPS_MOCK);
  const [hasEvaluated, setHasEvaluated] = useState(true);

  const handleRecommend = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      // Simulate intelligent ranking based on input
      if (formData.ph < 5.6) {
        setResults([RECOMMENDED_CROPS_MOCK[3], RECOMMENDED_CROPS_MOCK[0], RECOMMENDED_CROPS_MOCK[1]]);
      } else {
        setResults(RECOMMENDED_CROPS_MOCK);
      }
      setLoading(false);
      setHasEvaluated(true);
    }, 600);
  };

  return (
    <div className="space-y-8">
      <PageHeader
        badge="Assam Agronomy Module"
        title="AI Crop Recommendation"
        subtitle="Input soil laboratory values and environmental conditions to identify suitable crops with high yield viability in Assam river basins."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Inputs (5 cols) */}
        <form onSubmit={handleRecommend} className="lg:col-span-5 bg-km-surface p-6 sm:p-7 rounded-3xl border border-km-border shadow-subtle space-y-5">
          <div className="flex items-center gap-2 pb-2 border-b border-km-border/60">
            <Sliders className="w-4 h-4 text-km-sage" />
            <h3 className="text-sm font-bold text-km-dark">Soil Chemistry & Field Conditions</h3>
          </div>

          <div>
            <label className="block text-xs font-semibold text-km-dark mb-1">Target Location in Assam</label>
            <div className="relative">
              <MapPin className="w-3.5 h-3.5 text-km-subtext absolute left-3 top-3" />
              <select
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full pl-8 pr-3 py-2 text-xs rounded-xl border border-km-border bg-km-bg font-semibold text-km-dark focus:outline-none focus:border-km-sage"
              >
                {ASSAM_LOCATIONS.map(l => (
                  <option key={l.id} value={l.id}>{l.name}, {l.district} ({l.region})</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-km-dark mb-1">Soil Type</label>
              <select
                value={formData.soilType}
                onChange={(e) => setFormData({ ...formData, soilType: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-km-border bg-km-bg text-km-dark focus:outline-none focus:border-km-sage"
              >
                <option value="Heavy Alluvial Clay Loam">Heavy Clay Loam (Barak)</option>
                <option value="Silty Alluvial Loam">Silty Alluvium (Brahmaputra)</option>
                <option value="Acidic Red Soil">Acidic Red Soil (Hills & Slopes)</option>
                <option value="Sandy Loam">Sandy Loam (Char Area)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-km-dark mb-1">Soil pH ({formData.ph})</label>
              <input
                type="range"
                min="4.0"
                max="8.0"
                step="0.1"
                value={formData.ph}
                onChange={(e) => setFormData({ ...formData, ph: parseFloat(e.target.value) })}
                className="w-full accent-km-sage mt-2"
              />
              <span className="text-[10px] text-km-subtext block text-right">
                {formData.ph < 5.8 ? 'Acidic (Common in Assam)' : 'Neutral'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-[10px] font-semibold text-km-dark mb-1">Nitrogen (N)</label>
              <input
                type="number"
                value={formData.nitrogen}
                onChange={(e) => setFormData({ ...formData, nitrogen: parseInt(e.target.value) || 0 })}
                className="w-full px-2.5 py-1.5 text-xs rounded-xl border border-km-border bg-km-bg"
              />
              <span className="text-[9px] text-km-subtext">kg/ha</span>
            </div>
            <div>
              <label className="block text-[10px] font-semibold text-km-dark mb-1">Phosphorus (P)</label>
              <input
                type="number"
                value={formData.phosphorus}
                onChange={(e) => setFormData({ ...formData, phosphorus: parseInt(e.target.value) || 0 })}
                className="w-full px-2.5 py-1.5 text-xs rounded-xl border border-km-border bg-km-bg"
              />
              <span className="text-[9px] text-km-subtext">kg/ha</span>
            </div>
            <div>
              <label className="block text-[10px] font-semibold text-km-dark mb-1">Potassium (K)</label>
              <input
                type="number"
                value={formData.potassium}
                onChange={(e) => setFormData({ ...formData, potassium: parseInt(e.target.value) || 0 })}
                className="w-full px-2.5 py-1.5 text-xs rounded-xl border border-km-border bg-km-bg"
              />
              <span className="text-[9px] text-km-subtext">kg/ha</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-km-dark mb-1">Cultivation Season</label>
              <select
                value={formData.season}
                onChange={(e) => setFormData({ ...formData, season: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-km-border bg-km-bg text-km-dark focus:outline-none focus:border-km-sage"
              >
                <option value="Sali Season (Kharif)">Sali Season (Monsoon, Jun-Nov)</option>
                <option value="Ahu Season (Pre-Kharif)">Ahu Season (Spring, Mar-Jun)</option>
                <option value="Boro Season (Winter Wetland)">Boro Season (Dec-May)</option>
                <option value="Rabi Season (Winter)">Rabi Season (Oct-Mar)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-km-dark mb-1">Water Supply</label>
              <select
                value={formData.waterAvailability}
                onChange={(e) => setFormData({ ...formData, waterAvailability: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-km-border bg-km-bg text-km-dark focus:outline-none focus:border-km-sage"
              >
                <option value="High (Monsoon & Canal)">High (Canal / River basin)</option>
                <option value="Moderate (Tube well)">Moderate (Tube well)</option>
                <option value="Low (Rainfed)">Low (Rainfed upland)</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-km-deep hover:bg-km-sage text-white text-xs font-bold rounded-2xl shadow-subtle transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Sprout className="w-4 h-4 text-leaf-400" />
            <span>{loading ? 'Evaluating Suitability Matrix...' : 'Recommend Suitable Crops'}</span>
          </button>
        </form>

        {/* Results Stream (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-km-dark uppercase tracking-wider">
              Assam Agronomic Matches ({results.length})
            </span>
            <span className="text-[10px] text-km-subtext font-medium bg-km-surface px-2.5 py-1 rounded-full border border-km-border">
              Assam Agricultural University Package of Practices
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {results.map((crop) => (
              <CropCard key={crop.id} crop={crop} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
