import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

export default function HowItWorks() {
  const { t } = useLanguage();

  const steps = [
    {
      num: "1",
      title: t('howItWorksPage.steps.0.title'),
      desc: t('howItWorksPage.steps.0.desc')
    },
    {
      num: "2",
      title: t('howItWorksPage.steps.1.title'),
      desc: t('howItWorksPage.steps.1.desc')
    },
    {
      num: "3",
      title: t('howItWorksPage.steps.2.title'),
      desc: t('howItWorksPage.steps.2.desc')
    },
    {
      num: "4",
      title: t('howItWorksPage.steps.3.title'),
      desc: t('howItWorksPage.steps.3.desc')
    },
    {
      num: "5",
      title: t('howItWorksPage.steps.4.title'),
      desc: t('howItWorksPage.steps.4.desc')
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center space-y-3">
        <span className="text-xs font-bold uppercase text-forest-800 tracking-wider">
          {t('howItWorksPage.badge')}
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
          {t('howItWorksPage.title')}
        </h1>
        <p className="text-gray-600 text-sm max-w-xl mx-auto">
          {t('howItWorksPage.subtitle')}
        </p>
      </div>

      <div className="space-y-6">
        {steps.map((s) => (
          <div key={s.num} className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-sm flex items-start gap-5">
            <div className="w-10 h-10 rounded-xl bg-forest-800 text-white font-black text-lg flex items-center justify-center shrink-0">
              {s.num}
            </div>
            <div className="space-y-1.5">
              <h3 className="text-base font-bold text-gray-900">{s.title}</h3>
              <p className="text-xs text-gray-600 leading-relaxed">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
