import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, HeartHandshake, Award } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function About() {
  const { t } = useLanguage();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center space-y-3">
        <span className="text-xs font-bold uppercase text-forest-800 tracking-wider">
          {t('about.purposeBadge')}
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
          {t('about.title')}
        </h1>
        <p className="text-gray-600 text-base max-w-2xl mx-auto leading-relaxed">
          {t('about.subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-forest-50 text-forest-800 flex items-center justify-center">
            <Award className="w-5 h-5 text-forest-800" />
          </div>
          <h3 className="font-bold text-gray-900">{t('about.cards.scientificRigor.title')}</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            {t('about.cards.scientificRigor.desc')}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-forest-50 text-forest-800 flex items-center justify-center">
            <HeartHandshake className="w-5 h-5 text-forest-800" />
          </div>
          <h3 className="font-bold text-gray-900">{t('about.cards.accessibility.title')}</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            {t('about.cards.accessibility.desc')}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-forest-50 text-forest-800 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-forest-800" />
          </div>
          <h3 className="font-bold text-gray-900">{t('about.cards.zeroHallucinations.title')}</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            {t('about.cards.zeroHallucinations.desc')}
          </p>
        </div>
      </div>

      <div className="bg-forest-50 p-8 rounded-2xl border border-forest-100 space-y-4">
        <h3 className="text-xl font-bold text-forest-900">{t('about.mission.title')}</h3>
        <p className="text-sm text-gray-700 leading-relaxed">
          {t('about.mission.desc')}
        </p>
        <div className="pt-2">
          <Link to="/register" className="inline-flex items-center gap-2 px-5 py-2.5 bg-forest-800 text-white rounded-xl text-sm font-semibold hover:bg-forest-900 shadow-sm transition-colors">
            {t('about.mission.cta')}
          </Link>
        </div>
      </div>
    </div>
  );
}
