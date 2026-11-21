import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export default function QuickActionCard({ title, desc, icon: Icon, to, accentColor = 'bg-km-bg' }) {
  return (
    <Link
      to={to}
      className="bg-km-surface rounded-3xl p-5 border border-km-border shadow-subtle hover:shadow-card hover:border-km-sage transition-all duration-300 flex flex-col justify-between group"
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="w-11 h-11 rounded-2xl bg-km-bg text-km-sage flex items-center justify-center group-hover:bg-km-sage group-hover:text-white transition-colors duration-300">
            <Icon className="w-5 h-5" />
          </div>
          <div className="w-8 h-8 rounded-full bg-km-bg text-km-dark flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold text-km-dark group-hover:text-km-sage transition-colors">
            {title}
          </h3>
          <p className="text-xs text-km-subtext leading-relaxed mt-1">
            {desc}
          </p>
        </div>
      </div>
    </Link>
  );
}
