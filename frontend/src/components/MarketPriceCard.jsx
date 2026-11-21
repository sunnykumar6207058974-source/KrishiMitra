import React from 'react';
import { Store, TrendingUp, Calendar, AlertCircle } from 'lucide-react';

export default function MarketPriceCard({ item }) {
  return (
    <div className="bg-km-surface rounded-3xl p-5 border border-km-border shadow-subtle hover:border-km-sage transition-colors space-y-3">
      <div className="flex items-start justify-between gap-2 border-b border-km-border/60 pb-3">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-km-sage block">
            {item.district}, {item.state}
          </span>
          <h4 className="text-base font-bold text-km-dark">{item.commodity}</h4>
          <span className="text-xs text-km-subtext font-medium">{item.variety}</span>
        </div>
        <span className="text-[9px] font-bold text-km-subtext bg-km-bg px-2 py-0.5 rounded-full border border-km-border">
          Benchmark Demo
        </span>
      </div>

      <div className="flex items-baseline justify-between pt-1">
        <div>
          <span className="text-[10px] text-km-subtext block font-medium">Modal Selling Price</span>
          <div className="text-2xl font-black text-km-dark">
            ₹{item.modalPrice}
            <span className="text-xs font-normal text-km-subtext ml-1">/ Quintal</span>
          </div>
        </div>

        <div className="text-right text-[11px] text-km-subtext">
          <div>Min: ₹{item.minPrice}</div>
          <div>Max: ₹{item.maxPrice}</div>
        </div>
      </div>

      <div className="pt-2 border-t border-km-border/60 flex items-center justify-between text-[10px] text-km-subtext">
        <span className="truncate max-w-[180px] font-medium">{item.market}</span>
        <span>{item.date}</span>
      </div>
    </div>
  );
}
