import React from 'react';
import { Link } from 'react-router-dom';
import { PhoneCall, Mail, MapPin, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-forest-900 text-gray-300 pt-14 pb-8 border-t border-forest-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Brand Info */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <img
                src="/logo-icon.png"
                alt="KrishiMitra"
                className="w-9 h-9 object-contain drop-shadow-sm"
              />
              <span className="text-xl font-bold tracking-tight text-white">
                Krishi<span className="text-leaf-500">Mitra</span>
              </span>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed mb-4">
              {t('home.heroSubtitle')}
            </p>
            <div className="flex items-center gap-2 text-xs text-leaf-400 font-medium">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>{t('disclaimer.advisory')}</span>
            </div>
          </div>

          {/* Col 2: Quick Features */}
          <div>
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase mb-4">
              {t('home.featuresBadge')}
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/crop-recommendation" className="hover:text-leaf-400 transition-colors">{t('featuresPage.items.cropRec.title')}</Link></li>
              <li><Link to="/weather" className="hover:text-leaf-400 transition-colors">{t('featuresPage.items.weather.title')}</Link></li>
              <li><Link to="/mandi" className="hover:text-leaf-400 transition-colors">{t('featuresPage.items.mandi.title')}</Link></li>
              <li><Link to="/soil-health" className="hover:text-leaf-400 transition-colors">{t('featuresPage.items.soil.title')}</Link></li>
              <li><Link to="/crop-calendar" className="hover:text-leaf-400 transition-colors">{t('featuresPage.items.calendar.title')}</Link></li>
              <li><Link to="/ai-assistant" className="hover:text-leaf-400 transition-colors">{t('featuresPage.items.aiChat.title')}</Link></li>
            </ul>
          </div>

          {/* Col 3: Government Data Links */}
          <div>
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase mb-4">Government Open Data</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="https://icar.org.in" target="_blank" rel="noreferrer" className="hover:text-leaf-400 transition-colors">ICAR Research Bulletins</a></li>
              <li><a href="https://agmarknet.gov.in" target="_blank" rel="noreferrer" className="hover:text-leaf-400 transition-colors">Agmarknet Price Portal</a></li>
              <li><a href="https://mausam.imd.gov.in" target="_blank" rel="noreferrer" className="hover:text-leaf-400 transition-colors">IMD Agromet Division</a></li>
              <li><a href="https://soilhealth.dac.gov.in" target="_blank" rel="noreferrer" className="hover:text-leaf-400 transition-colors">Soil Health Card Scheme</a></li>
              <li><a href="https://pmkisan.gov.in" target="_blank" rel="noreferrer" className="hover:text-leaf-400 transition-colors">PM-KISAN Portal</a></li>
            </ul>
          </div>

          {/* Col 4: Farmer Support */}
          <div>
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase mb-4">
              {t('contactPage.helplineTitle')}
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2.5">
                <PhoneCall className="w-4 h-4 text-leaf-400 mt-1 shrink-0" />
                <div>
                  <span className="block font-bold text-white text-sm">{t('contactPage.tollFreeNumber')}</span>
                  <span className="text-xs text-gray-300">{t('contactPage.tollFreeLabel')}</span>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-leaf-400 shrink-0" />
                <span className="text-xs text-gray-300">{t('contactPage.supportEmail')}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-leaf-400 mt-0.5 shrink-0" />
                <span className="text-xs text-gray-300">
                  {t('contactPage.address')}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-forest-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <div>
            © 2026 KrishiMitra. {t('disclaimer.advisory')}.
          </div>
          <div className="flex items-center gap-6">
            <Link to="/about" className="hover:text-leaf-400 transition-colors">{t('nav.about')}</Link>
            <Link to="/features" className="hover:text-leaf-400 transition-colors">{t('nav.features')}</Link>
            <Link to="/contact" className="hover:text-leaf-400 transition-colors">{t('nav.contact')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
