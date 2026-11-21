import React, { useState } from 'react';
import { Activity, UploadCloud, CheckCircle2, FileText, AlertTriangle, ShieldCheck, ArrowRight } from 'lucide-react';
import PageHeader from '../../components/PageHeader';
import { SAMPLE_SOIL_CARD_MOCK } from '../../data/mockData';

export default function SoilHealth() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [report, setReport] = useState(SAMPLE_SOIL_CARD_MOCK);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file.name);
      setIsUploading(true);
      setTimeout(() => {
        setIsUploading(false);
      }, 700);
    }
  };

  return (
    <div className="space-y-8">
      <PageHeader
        badge="Soil Health Division"
        title="Soil Health Card Analyzer"
        subtitle="Benchmark your laboratory soil test parameters against Ministry of Agriculture standards for Assam acidic alluvial soils."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Upload Card Area (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-km-surface p-6 rounded-3xl border border-km-border shadow-subtle space-y-4">
            <h3 className="text-sm font-bold text-km-dark">Upload Soil Health Card (SHC)</h3>
            <p className="text-xs text-km-subtext leading-relaxed">
              Upload your official test report (PDF or Image) issued by your District Soil Testing Laboratory.
            </p>

            <label className="border-2 border-dashed border-km-border hover:border-km-sage rounded-3xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors bg-km-bg/50 hover:bg-km-bg">
              <UploadCloud className="w-8 h-8 text-km-sage mb-2" />
              <span className="text-xs font-bold text-km-dark block">
                {selectedFile ? selectedFile : 'Click to select or drag & drop'}
              </span>
              <span className="text-[10px] text-km-subtext block mt-1">
                Supports PDF, JPG, PNG up to 10MB
              </span>
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>

            {isUploading && (
              <div className="p-3 bg-km-bg rounded-2xl text-xs text-km-dark flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-km-sage border-t-transparent rounded-full animate-spin" />
                <span>Reading Soil Health Card parameters...</span>
              </div>
            )}

            <div className="p-4 bg-km-bg rounded-2xl space-y-1.5 border border-km-border/60">
              <span className="text-[10px] font-bold uppercase text-km-sage block tracking-wider">
                Assam Soil Characteristic Note
              </span>
              <p className="text-[11px] text-km-subtext leading-relaxed">
                Most soils in Cachar & Brahmaputra valley have pH between 4.8 and 5.6. Acidity restricts phosphorus uptake unless balanced with agricultural lime or organic matter.
              </p>
            </div>
          </div>
        </div>

        {/* Report Diagnostic View (7 cols) */}
        <div className="lg:col-span-7 bg-km-surface p-6 sm:p-8 rounded-3xl border border-km-border shadow-subtle space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-km-border/60 pb-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-km-sage block">
                Official Benchmark Sample
              </span>
              <h3 className="text-base font-bold text-km-dark">
                Report #{report.sampleNo}
              </h3>
              <span className="text-[10px] text-km-subtext">Issued by: {report.laboratory}</span>
            </div>
            <div className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
              Card Verified
            </div>
          </div>

          {/* Key Nutrient Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="p-3 bg-km-bg rounded-2xl border border-km-border">
              <span className="text-[10px] text-km-subtext block">Soil pH</span>
              <span className="text-lg font-black text-km-dark">{report.ph}</span>
              <span className="text-[9px] font-semibold text-amber-700 block mt-0.5">{report.phRating}</span>
            </div>
            <div className="p-3 bg-km-bg rounded-2xl border border-km-border">
              <span className="text-[10px] text-km-subtext block">Nitrogen (N)</span>
              <span className="text-lg font-black text-km-dark">{report.nitrogen}</span>
              <span className="text-[9px] font-semibold text-amber-700 block mt-0.5">{report.nitrogenRating}</span>
            </div>
            <div className="p-3 bg-km-bg rounded-2xl border border-km-border">
              <span className="text-[10px] text-km-subtext block">Phosphorus (P)</span>
              <span className="text-lg font-black text-km-dark">{report.phosphorus}</span>
              <span className="text-[9px] font-semibold text-red-700 block mt-0.5">{report.phosphorusRating}</span>
            </div>
            <div className="p-3 bg-km-bg rounded-2xl border border-km-border">
              <span className="text-[10px] text-km-subtext block">Potassium (K)</span>
              <span className="text-lg font-black text-km-dark">{report.potassium}</span>
              <span className="text-[9px] font-semibold text-emerald-700 block mt-0.5">{report.potassiumRating}</span>
            </div>
          </div>

          {/* Actionable Recommendations */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-bold text-km-dark uppercase tracking-wider">
              Agronomic Fertilizer & Amendment Roadmap
            </h4>
            <div className="space-y-2">
              {report.recommendations.map((rec, i) => (
                <div key={i} className="p-3 bg-km-bg rounded-2xl flex items-start gap-2.5 text-xs text-km-dark">
                  <CheckCircle2 className="w-4 h-4 text-km-sage shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{rec}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
