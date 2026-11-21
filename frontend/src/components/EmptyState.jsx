import React from 'react';
import { PackageOpen } from 'lucide-react';

export default function EmptyState({ title = "No records found", message, action }) {
  return (
    <div className="bg-km-surface rounded-3xl p-8 border border-km-border text-center space-y-3">
      <div className="w-12 h-12 rounded-2xl bg-km-bg text-km-subtext flex items-center justify-center mx-auto">
        <PackageOpen className="w-6 h-6" />
      </div>
      <h4 className="text-sm font-bold text-km-dark">{title}</h4>
      {message && <p className="text-xs text-km-subtext max-w-sm mx-auto">{message}</p>}
      {action && <div className="pt-2">{action}</div>}
    </div>
  );
}
