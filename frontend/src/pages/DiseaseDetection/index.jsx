import React, { useState } from 'react';
import { ScanEye, UploadCloud, CheckCircle2, AlertTriangle, ShieldAlert, PhoneCall, RefreshCw, X } from 'lucide-react';
import PageHeader from '../../components/PageHeader';

export default function DiseaseDetection() {
  const [previewImage, setPreviewImage] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      setResult(null);
    }
  };

  const handleSampleImage = () => {
    setPreviewImage('https://images.unsplash.com/photo-1594498653385-d5172c532c00?auto=format&fit=crop&w=600&q=80');
    setResult(null);
  };

  const handleAnalyze = () => {
    if (!previewImage) return;
    setAnalyzing(true);
    setTimeout(() => {
      setResult({
        condition: 'Suspected Rice Blast / Brown Leaf Spot',
        confidence: 'Indicative AI Observation (Demonstration)',
        pathogen: 'Magnaporthe oryzae (Fungal spore susceptibility)',
        visibleSymptoms: [
          'Spindle-shaped elliptical lesions with greyish center on leaf blades.',
          'Brownish margins spreading on upper canopy under humid cloud cover.'
        ],
        preventivePractices: [
          'Avoid excessive split-doses of nitrogenous urea fertilizers.',
          'Maintain field alley aeration (T-shape path) in dense Sali rice.',
          'Spray bio-fungicide Pseudomonas fluorescens @ 2.5g/Litre water.'
        ],
        disclaimer: '⚠️ Diagnostic Notice: An image analysis alone cannot provide a definitive plant pathology test. Do not apply unregistered chemical pesticides without consultation.',
        expertCall: 'Kisan Call Centre Toll-Free: 1800-180-1551 (Available in Assamese & Bengali)'
      });
      setAnalyzing(false);
    }, 800);
  };

  return (
    <div className="space-y-8">
      <PageHeader
        badge="Plant Pathology Module"
        title="Crop Disease & Pest Detection"
        subtitle="Upload photos of crop leaves or stems to identify visible symptoms and preventive practices."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Upload & Preview Card (5 cols) */}
        <div className="lg:col-span-5 bg-km-surface p-6 rounded-3xl border border-km-border shadow-subtle space-y-5">
          <h3 className="text-sm font-bold text-km-dark">Upload Crop Image</h3>

          {!previewImage ? (
            <label className="border-2 border-dashed border-km-border hover:border-km-sage rounded-3xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-colors bg-km-bg/50 hover:bg-km-bg">
              <ScanEye className="w-10 h-10 text-km-sage mb-2" />
              <span className="text-xs font-bold text-km-dark block">Click to select leaf image</span>
              <span className="text-[10px] text-km-subtext block mt-1">Take photo in clear daylight</span>
              <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            </label>
          ) : (
            <div className="relative rounded-2xl overflow-hidden bg-km-bg border border-km-border">
              <img src={previewImage} alt="Crop sample" className="w-full h-56 object-cover" />
              <button
                onClick={() => { setPreviewImage(null); setResult(null); }}
                className="absolute top-2 right-2 p-1.5 rounded-full bg-km-deep/80 text-white hover:bg-km-deep"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleSampleImage}
              className="flex-1 py-2 text-xs font-bold text-km-sage bg-km-bg hover:bg-km-borderLight rounded-xl border border-km-border transition-colors"
            >
              Load Sample Leaf
            </button>
            <button
              type="button"
              onClick={handleAnalyze}
              disabled={!previewImage || analyzing}
              className="flex-1 py-2 text-xs font-bold text-white bg-km-deep hover:bg-km-sage rounded-xl transition-colors disabled:opacity-50 flex items-center justify-center gap-1.5"
            >
              <ScanEye className="w-4 h-4" />
              <span>{analyzing ? 'Analyzing...' : 'Analyze Image'}</span>
            </button>
          </div>
        </div>

        {/* Diagnostic Output (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {result ? (
            <div className="bg-km-surface p-6 sm:p-8 rounded-3xl border border-km-border shadow-subtle space-y-5">
              <div className="flex items-center justify-between border-b border-km-border/60 pb-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-km-sage block">
                    Diagnostic AI Observation
                  </span>
                  <h3 className="text-lg font-bold text-km-dark">{result.condition}</h3>
                  <span className="text-xs text-km-subtext italic">{result.pathogen}</span>
                </div>
                <span className="text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200 px-2.5 py-1 rounded-full">
                  Demonstration Result
                </span>
              </div>

              {/* Symptoms */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-bold text-km-dark uppercase tracking-wider">Visible Symptoms</h4>
                <ul className="space-y-1 text-xs text-km-subtext">
                  {result.visibleSymptoms.map((s, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-km-sage font-bold">•</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Prevention */}
              <div className="space-y-1.5 pt-2 border-t border-km-border/60">
                <h4 className="text-xs font-bold text-km-dark uppercase tracking-wider">Preventive Practices</h4>
                <ul className="space-y-1 text-xs text-km-subtext">
                  {result.preventivePractices.map((p, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-km-sage shrink-0 mt-0.5" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Disclaimers & Contact */}
              <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-2xl space-y-2 text-xs text-amber-900">
                <p className="leading-relaxed text-[11px]">{result.disclaimer}</p>
                <div className="flex items-center gap-2 font-bold text-[11px] pt-1">
                  <PhoneCall className="w-3.5 h-3.5 text-amber-800" />
                  <span>{result.expertCall}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-km-surface rounded-3xl p-8 border border-km-border text-center space-y-3">
              <ScanEye className="w-12 h-12 text-km-subtext mx-auto" />
              <h4 className="text-sm font-bold text-km-dark">No Image Analyzed</h4>
              <p className="text-xs text-km-subtext max-w-sm mx-auto leading-relaxed">
                Select or upload a crop leaf image on the left and click <strong>"Analyze Image"</strong> to view symptom breakdowns and IPM recommendations.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
