import React, { useState } from 'react';
import { Tractor, MapPin, Edit3, CheckCircle2, ShieldCheck, Droplets, Sprout, Save, X } from 'lucide-react';
import PageHeader from '../../components/PageHeader';
import { MY_FARM_MOCK } from '../../data/mockData';
import { useLanguage } from '../../context/LanguageContext';

export default function MyFarm() {
  const { t } = useLanguage();
  const [farm, setFarm] = useState(MY_FARM_MOCK);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(farm);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setFarm(editForm);
    setIsEditing(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-8">
      <PageHeader
        badge={t('farmerPage.badge', 'Farm Profile Management')}
        title={t('farmerPage.title', 'My Farm Profile')}
        subtitle={t('farmerPage.subtitle', 'Manage your registered agricultural plot, soil profile, water infrastructure, and primary crops in Assam.')}
        actionButton={
          <button
            onClick={() => { setEditForm(farm); setIsEditing(true); }}
            className="px-4 py-2.5 bg-km-deep hover:bg-km-sage text-white text-xs font-bold rounded-2xl shadow-subtle flex items-center gap-1.5 transition-colors"
          >
            <Edit3 className="w-4 h-4" />
            <span>{t('farmerPage.editBtn', 'Edit Farm Information')}</span>
          </button>
        }
      />

      {savedSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-800 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{t('farmerPage.updatedSuccess', 'Farm profile details updated successfully!')}</span>
        </div>
      )}

      {/* Main Farm Card */}
      <div className="bg-km-surface rounded-3xl p-6 sm:p-8 border border-km-border shadow-subtle space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-km-border/60 pb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-km-bg text-km-sage flex items-center justify-center shrink-0">
              <Tractor className="w-7 h-7" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-km-sage block">
                {t('farmerPage.primaryHolding', 'Primary Registered Holding')}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-km-dark">{farm.farmName}</h2>
              <span className="text-xs text-km-subtext">{farm.farmerName} • Reg: {farm.registrationDate}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-km-bg px-3.5 py-1.5 rounded-2xl border border-km-border self-start sm:self-auto text-xs font-bold text-km-dark">
            <MapPin className="w-3.5 h-3.5 text-km-sage" />
            <span>{farm.village}, {farm.location}</span>
          </div>
        </div>

        {/* Specifications Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-km-bg rounded-2xl border border-km-border space-y-1">
            <span className="text-[10px] text-km-subtext font-semibold uppercase block">{t('farmerPage.totalArea', 'Total Land Area')}</span>
            <span className="text-lg font-black text-km-dark">{farm.totalArea} {farm.areaUnit}</span>
          </div>
          <div className="p-4 bg-km-bg rounded-2xl border border-km-border space-y-1">
            <span className="text-[10px] text-km-subtext font-semibold uppercase block">{t('farmerPage.soilType', 'Primary Soil Type')}</span>
            <span className="text-sm font-bold text-km-dark">{farm.soilType}</span>
            <span className="text-[10px] text-km-subtext block">Tested pH: {farm.soilPh} (Acidic)</span>
          </div>
          <div className="p-4 bg-km-bg rounded-2xl border border-km-border space-y-1">
            <span className="text-[10px] text-km-subtext font-semibold uppercase block">{t('farmerPage.irrigation', 'Irrigation Source')}</span>
            <span className="text-sm font-bold text-km-dark">{farm.irrigationSource}</span>
          </div>
          <div className="p-4 bg-km-bg rounded-2xl border border-km-border space-y-1">
            <span className="text-[10px] text-km-subtext font-semibold uppercase block">{t('farmerPage.livestock', 'Livestock Integration')}</span>
            <span className="text-sm font-bold text-km-dark">{farm.livestock}</span>
          </div>
        </div>

        {/* Crops */}
        <div className="space-y-2 pt-2 border-t border-km-border/60">
          <span className="text-xs font-bold text-km-dark block">{t('farmerPage.cultivatedCrops', 'Cultivated Crops This Year')}:</span>
          <div className="flex flex-wrap gap-2">
            {farm.primaryCrops.map((c, i) => (
              <span key={i} className="px-3 py-1.5 bg-km-bg text-km-dark text-xs font-semibold rounded-xl border border-km-border">
                🌾 {c}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Edit Farm Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 bg-km-deep/40 backdrop-blur-xs flex items-center justify-center p-4">
          <form onSubmit={handleSave} className="bg-km-surface max-w-lg w-full rounded-3xl p-6 border border-km-border shadow-floating space-y-4">
            <div className="flex items-center justify-between border-b border-km-border pb-3">
              <h3 className="text-base font-bold text-km-dark">{t('farmerPage.modalTitle', 'Edit Farm Information')}</h3>
              <button type="button" onClick={() => setIsEditing(false)} className="p-1 text-km-subtext hover:text-km-dark">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <label className="block text-xs font-semibold text-km-dark mb-1">Farm Name</label>
              <input
                type="text"
                value={editForm.farmName}
                onChange={(e) => setEditForm({ ...editForm, farmName: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-km-border bg-km-bg"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-km-dark mb-1">Land Area (Bigha)</label>
                <input
                  type="number"
                  step="0.1"
                  value={editForm.totalArea}
                  onChange={(e) => setEditForm({ ...editForm, totalArea: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-km-border bg-km-bg"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-km-dark mb-1">Village / Locality</label>
                <input
                  type="text"
                  value={editForm.village}
                  onChange={(e) => setEditForm({ ...editForm, village: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-km-border bg-km-bg"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-km-dark mb-1">Soil Type</label>
              <input
                type="text"
                value={editForm.soilType}
                onChange={(e) => setEditForm({ ...editForm, soilType: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-km-border bg-km-bg"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-km-dark mb-1">Irrigation Source</label>
              <input
                type="text"
                value={editForm.irrigationSource}
                onChange={(e) => setEditForm({ ...editForm, irrigationSource: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-km-border bg-km-bg"
              />
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="flex-1 py-2.5 rounded-xl border border-km-border text-xs font-bold text-km-dark hover:bg-km-bg"
              >
                {t('farmerPage.cancelBtn', 'Cancel')}
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 bg-km-deep text-white rounded-xl text-xs font-bold hover:bg-km-sage transition-colors"
              >
                {t('farmerPage.saveBtn', 'Save Changes')}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
