import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, CloudSun, Activity, Calendar, MessageSquareText, Store, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function Features() {
  const { t } = useLanguage();

  const list = [
    {
      title: t('featuresPage.items.cropRec.title'),
      icon: Sprout,
      desc: t('featuresPage.items.cropRec.desc'),
      link: "/crop-recommendation"
    },
    {
      title: t('featuresPage.items.weather.title'),
      icon: CloudSun,
      desc: t('featuresPage.items.weather.desc'),
      link: "/weather"
    },
    {
      title: t('featuresPage.items.soil.title'),
      icon: Activity,
      desc: t('featuresPage.items.soil.desc'),
      link: "/soil-health"
    },
    {
      title: t('featuresPage.items.mandi.title'),
      icon: Store,
      desc: t('featuresPage.items.mandi.desc'),
      link: "/mandi"
    },
    {
      title: t('featuresPage.items.calendar.title'),
      icon: Calendar,
      desc: t('featuresPage.items.calendar.desc'),
      link: "/crop-calendar"
    },
    {
      title: t('featuresPage.items.aiChat.title'),
      icon: MessageSquareText,
      desc: t('featuresPage.items.aiChat.desc'),
      link: "/ai-assistant"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase text-forest-800 tracking-wider">
          {t('featuresPage.badge')}
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
          {t('featuresPage.title')}
        </h1>
        <p className="text-gray-600 text-sm">
          {t('featuresPage.subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {list.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="bg-white p-7 rounded-2xl border border-gray-200/80 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-5">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-forest-50 text-forest-800 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-forest-800" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <Link to={item.link} className="inline-flex items-center gap-1.5 text-xs font-bold text-forest-800 hover:text-forest-900">
                  <span>{t('featuresPage.openModule')}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
