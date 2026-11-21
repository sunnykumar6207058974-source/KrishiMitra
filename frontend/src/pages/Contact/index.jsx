import React, { useState } from 'react';
import { PhoneCall, Mail, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function Contact() {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center space-y-3">
        <span className="text-xs font-bold uppercase text-forest-800 tracking-wider">
          {t('contactPage.badge')}
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
          {t('contactPage.title')}
        </h1>
        <p className="text-gray-600 text-sm max-w-xl mx-auto">
          {t('contactPage.subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Info Card */}
        <div className="bg-forest-900 text-white p-8 rounded-2xl space-y-6 flex flex-col justify-between">
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white">{t('contactPage.helplineTitle')}</h3>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <PhoneCall className="w-5 h-5 text-leaf-400 mt-1 shrink-0" />
                <div>
                  <span className="block font-bold text-base text-leaf-400">{t('contactPage.tollFreeNumber')}</span>
                  <span className="text-xs text-gray-300">{t('contactPage.tollFreeLabel')}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-leaf-400 shrink-0" />
                <span className="text-xs text-gray-300">{t('contactPage.supportEmail')}</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-leaf-400 mt-1 shrink-0" />
                <span className="text-xs text-gray-300">
                  {t('contactPage.address')}
                </span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-forest-800/80 rounded-xl border border-forest-700 text-xs text-gray-300 leading-relaxed">
            {t('contactPage.hours')}
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white p-8 rounded-2xl border border-gray-200/80 shadow-sm">
          {submitted ? (
            <div className="text-center py-10 space-y-4">
              <CheckCircle2 className="w-12 h-12 text-forest-600 mx-auto" />
              <h3 className="text-lg font-bold text-gray-900">{t('common.status.success')}</h3>
              <p className="text-xs text-gray-600">
                {t('contactPage.successMsg')}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900">{t('contactPage.formTitle')}</h3>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">{t('contactPage.labels.name')}</label>
                <input
                  type="text"
                  required
                  placeholder={t('contactPage.placeholders.name')}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-800 focus:outline-none focus:border-forest-700"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">{t('contactPage.labels.mobile')}</label>
                <input
                  type="tel"
                  required
                  placeholder={t('contactPage.placeholders.mobile')}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-800 focus:outline-none focus:border-forest-700"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">{t('contactPage.labels.subject')}</label>
                <select className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-800 focus:outline-none focus:border-forest-700">
                  <option>{t('contactPage.subjects.cropRec')}</option>
                  <option>{t('contactPage.subjects.soilTest')}</option>
                  <option>{t('contactPage.subjects.weather')}</option>
                  <option>{t('contactPage.subjects.mandi')}</option>
                  <option>{t('contactPage.subjects.general')}</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">{t('contactPage.labels.message')}</label>
                <textarea
                  rows={3}
                  required
                  placeholder={t('contactPage.placeholders.message')}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-800 focus:outline-none focus:border-forest-700"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-forest-800 hover:bg-forest-900 text-white rounded-xl text-xs font-bold shadow-sm transition-colors flex items-center justify-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{t('contactPage.btnSend')}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
