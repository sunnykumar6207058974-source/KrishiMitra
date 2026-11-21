import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function CropCard({ crop, onSelect }) {
  return (
    <div className="bg-km-surface rounded-3xl p-5 border border-km-border shadow-subtle hover:shadow-card hover:border-km-sage transition-all duration-300 flex flex-col justify-between group">
      <div className="space-y-4">
        {/* Crop Photo with Match Badge */}
        <div className="relative h-44 rounded-2xl overflow-hidden bg-km-bg">
          <img
            src={crop.image}
            alt={crop.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-km-deep/85 backdrop-blur-xs text-white text-[11px] font-bold flex items-center gap-1 shadow-sm">
            <Sparkles className="w-3 h-3 text-leaf-400" />
            <span>{crop.matchScore}% Match</span>
          </div>

          <div className="absolute bottom-3 left-3 px-2.5 py-0.5 rounded-md bg-white/95 text-km-dark text-[10px] font-semibold">
            {crop.season}
          </div>
        </div>

        {/* Details */}
        <div className="space-y-1.5">
          <h3 className="text-base font-bold text-km-dark group-hover:text-km-sage transition-colors">
            {crop.name}
          </h3>
          <p className="text-[11px] text-km-subtext italic">
            {crop.scientificName}
          </p>
          <p className="text-xs text-km-dark/80 line-clamp-2 leading-relaxed pt-1">
            {crop.description}
          </p>
        </div>

        {/* Specifications Pills */}
        <div className="pt-2 border-t border-km-border/60 grid grid-cols-2 gap-2 text-[10px]">
          <div className="bg-km-bg p-2 rounded-xl">
            <span className="text-km-subtext block">Soil Texture</span>
            <span className="font-bold text-km-dark truncate block">{crop.soilType}</span>
          </div>
          <div className="bg-km-bg p-2 rounded-xl">
            <span className="text-km-subtext block">Target Soil pH</span>
            <span className="font-bold text-km-dark block">{crop.idealPh}</span>
          </div>
        </div>
      </div>

      {/* Button */}
      <button
        onClick={() => onSelect && onSelect(crop)}
        className="mt-4 w-full py-2.5 px-4 bg-km-bg hover:bg-km-sage hover:text-white text-km-dark font-bold text-xs rounded-xl border border-km-border hover:border-transparent transition-all flex items-center justify-center gap-2"
      >
        <span>View Agronomic Guide</span>
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
}
