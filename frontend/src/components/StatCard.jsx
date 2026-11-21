import React from 'react';

export default function StatCard({ label, value, subtext, icon: Icon, trend }) {
  return (
    <div className="bg-km-surface rounded-2xl p-4 border border-km-border shadow-subtle flex items-center justify-between gap-3">
      <div className="space-y-0.5">
        <span className="text-[11px] font-semibold text-km-subtext block">{label}</span>
        <div className="text-xl font-black text-km-dark tracking-tight">{value}</div>
        {subtext && <span className="text-[10px] text-km-subtext block">{subtext}</span>}
      </div>

      {Icon && (
        <div className="w-10 h-10 rounded-xl bg-km-bg text-km-sage flex items-center justify-center shrink-0">
          <Icon className="w-5 h-5" />
        </div>
      )}
    </div>
  );
}
