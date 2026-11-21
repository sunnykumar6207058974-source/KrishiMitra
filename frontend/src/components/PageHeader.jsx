import React from 'react';

export default function PageHeader({ title, subtitle, badge, actionButton }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
      <div className="space-y-1">
        {badge && (
          <span className="inline-block px-2.5 py-0.5 rounded-full bg-km-bg text-km-sage border border-km-border text-[10px] font-bold uppercase tracking-wider mb-1">
            {badge}
          </span>
        )}
        <h1 className="text-2xl sm:text-3xl font-extrabold text-km-dark tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xs text-km-subtext max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      {actionButton && (
        <div className="self-start sm:self-auto shrink-0">
          {actionButton}
        </div>
      )}
    </div>
  );
}
