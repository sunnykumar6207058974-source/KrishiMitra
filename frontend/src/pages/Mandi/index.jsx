import React, { useState } from 'react';
import { Store, Search, Filter, MapPin, AlertCircle } from 'lucide-react';
import PageHeader from '../../components/PageHeader';
import MarketPriceCard from '../../components/MarketPriceCard';
import { MANDI_PRICES_MOCK, ASSAM_LOCATIONS } from '../../data/mockData';
import { useLanguage } from '../../context/LanguageContext';

export default function Mandi() {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('All');

  const filteredPrices = MANDI_PRICES_MOCK.filter(item => {
    const matchesSearch = item.commodity.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.variety.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDistrict = selectedDistrict === 'All' || item.district.toLowerCase() === selectedDistrict.toLowerCase();
    return matchesSearch && matchesDistrict;
  });

  return (
    <div className="space-y-8">
      <PageHeader
        badge={t('mandiPage.badge', 'Market Intelligence')}
        title={t('mandiPage.title', 'APMC Mandi Market Prices')}
        subtitle={t('mandiPage.subtitle', 'Benchmark wholesale commodity arrivals and prices across regulated market committees in Assam.')}
      />

      {/* Notice Banner */}
      <div className="p-4 bg-km-bg border border-km-border rounded-2xl flex items-center justify-between text-xs text-km-dark">
        <span className="font-semibold">
          {t('mandiPage.notice', '📌 Data Source Note: Prices shown below are curated regional demonstration benchmarks based on AGMARKNET & Assam State Agricultural Marketing Board standards.')}
        </span>
      </div>

      {/* Filters Bar */}
      <div className="bg-km-surface p-4 rounded-3xl border border-km-border shadow-subtle flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-km-subtext absolute left-3.5 top-2.5" />
          <input
            type="text"
            placeholder={t('mandiPage.searchPlaceholder', 'Search crop or variety (e.g. Sali, Joha, Mustard, Jute)...')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-km-border bg-km-bg focus:outline-none focus:border-km-sage text-km-dark font-medium"
          />
        </div>

        <div className="w-full sm:w-56">
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-xl border border-km-border bg-km-bg focus:outline-none focus:border-km-sage text-km-dark font-semibold"
          >
            <option value="All">{t('mandiPage.allMandis', 'All Assam Mandis')}</option>
            <option value="Cachar">Cachar (Silchar)</option>
            <option value="Kamrup Metro">Kamrup Metro (Guwahati)</option>
            <option value="Nagaon">Nagaon</option>
            <option value="Darrang">Darrang (Kharupetia)</option>
            <option value="Karbi Anglong">Karbi Anglong (Diphu)</option>
          </select>
        </div>
      </div>

      {/* Grid of Price Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredPrices.map((item) => (
          <MarketPriceCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
