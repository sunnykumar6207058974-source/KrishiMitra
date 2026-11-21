import React, { useState } from 'react';
import { Calendar as CalendarIcon, Plus, CheckCircle2, Clock, Filter, Trash2 } from 'lucide-react';
import PageHeader from '../../components/PageHeader';
import FarmingTaskCard from '../../components/FarmingTaskCard';
import { FARMING_TASKS_MOCK } from '../../data/mockData';
import { useLanguage } from '../../context/LanguageContext';

export default function CropCalendar() {
  const { t } = useLanguage();
  const [tasks, setTasks] = useState(FARMING_TASKS_MOCK);
  const [filterStage, setFilterStage] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    crop: 'Sali Paddy',
    stage: 'Irrigation',
    dueDate: '2026-11-28',
    priority: 'Medium',
    notes: '',
  });

  const toggleTask = (id) => {
    setTasks(prev => prev.map(t => {
      if (t.id === id) {
        return {
          ...t,
          status: t.status === 'Completed' ? 'Pending' : 'Completed'
        };
      }
      return t;
    }));
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTask.title) return;
    setTasks([
      ...tasks,
      {
        id: Date.now(),
        ...newTask,
        status: 'Pending',
      }
    ]);
    setShowAddModal(false);
    setNewTask({ title: '', crop: 'Sali Paddy', stage: 'Irrigation', dueDate: '2026-11-28', priority: 'Medium', notes: '' });
    setSuccessMsg(true);
    setTimeout(() => setSuccessMsg(false), 3000);
  };

  const filterOptions = [
    { key: 'All', label: t('calendarPage.filters.all', 'All') },
    { key: 'Sowing', label: t('calendarPage.filters.sowing', 'Sowing') },
    { key: 'Irrigation', label: t('calendarPage.filters.irrigation', 'Irrigation') },
    { key: 'Fertilizer', label: t('calendarPage.filters.fertilizer', 'Fertilizer Application') },
    { key: 'Protection', label: t('calendarPage.filters.protection', 'Crop Protection') },
  ];

  const filteredTasks = filterStage === 'All'
    ? tasks
    : tasks.filter(t => {
        const stage = (t.stage || '').toLowerCase();
        if (filterStage === 'Sowing') return stage.includes('sow');
        if (filterStage === 'Irrigation') return stage.includes('irrig') || stage.includes('drain');
        if (filterStage === 'Fertilizer') return stage.includes('fertil');
        if (filterStage === 'Protection') return stage.includes('protect');
        return stage.includes(filterStage.toLowerCase());
      });

  return (
    <div className="space-y-8">
      <PageHeader
        badge={t('calendarPage.badge', 'Field Operations')}
        title={t('calendarPage.title', 'Farming Calendar & Activity Tracker')}
        subtitle={t('calendarPage.subtitle', 'Track critical milestones for Sali paddy, Toria mustard, and seasonal crop cycles.')}
        actionButton={
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 bg-km-deep hover:bg-km-sage text-white text-sm font-bold rounded-2xl shadow-subtle flex items-center gap-1.5 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>{t('calendarPage.addActivity', 'Add New Activity')}</span>
          </button>
        }
      />

      {successMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-sm text-emerald-800 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{t('calendarPage.successAdd', 'New farming activity scheduled successfully!')}</span>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {filterOptions.map(option => (
          <button
            key={option.key}
            onClick={() => setFilterStage(option.key)}
            className={`px-4 py-2 rounded-xl text-sm font-bold border transition-colors ${
              filterStage === option.key
                ? 'bg-km-sage text-white border-km-sage'
                : 'bg-km-surface text-km-subtext border-km-border hover:bg-km-bg'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Task List */}
      <div className="bg-km-surface rounded-3xl p-6 border border-km-border shadow-subtle space-y-4">
        <h3 className="text-lg sm:text-xl font-bold text-km-dark">
          {t('calendarPage.scheduledMilestones', 'Scheduled Milestones')} ({filteredTasks.length})
        </h3>

        {filteredTasks.length === 0 ? (
          <div className="py-12 text-center text-sm text-km-subtext">
            {t('calendarPage.emptyState', 'No scheduled milestones found for the selected filter.')}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredTasks.map(task => (
              <FarmingTaskCard
                key={task.id}
                task={task}
                onToggleStatus={toggleTask}
              />
            ))}
          </div>
        )}
      </div>

      {/* Add Task Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-km-deep/40 backdrop-blur-xs flex items-center justify-center p-4">
          <form onSubmit={handleAddTask} className="bg-km-surface max-w-md w-full rounded-3xl p-6 border border-km-border shadow-floating space-y-4">
            <h3 className="text-base font-bold text-km-dark">
              {t('calendarPage.modalTitle', 'Schedule New Farming Activity')}
            </h3>

            <div>
              <label className="block text-xs font-semibold text-km-dark mb-1">
                {t('calendarPage.labelTitle', 'Activity Title')}
              </label>
              <input
                type="text"
                required
                placeholder={t('calendarPage.placeholderTitle', 'e.g. 2nd Weeding and Water Regulation')}
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-km-border bg-km-bg text-km-dark focus:outline-none focus:border-km-sage"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-km-dark mb-1">
                  {t('calendarPage.labelCrop', 'Target Crop')}
                </label>
                <input
                  type="text"
                  placeholder={t('calendarPage.placeholderCrop', 'e.g. Sali Paddy')}
                  value={newTask.crop}
                  onChange={(e) => setNewTask({ ...newTask, crop: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-km-border bg-km-bg text-km-dark"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-km-dark mb-1">
                  {t('calendarPage.labelStage', 'Stage')}
                </label>
                <select
                  value={newTask.stage}
                  onChange={(e) => setNewTask({ ...newTask, stage: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-km-border bg-km-bg text-km-dark font-medium"
                >
                  <option value="Sowing">{t('calendarPage.stages.Sowing', 'Sowing')}</option>
                  <option value="Irrigation">{t('calendarPage.stages.Irrigation', 'Irrigation')}</option>
                  <option value="Fertilizer Application">{t('calendarPage.stages.Fertilizer Application', 'Fertilizer Application')}</option>
                  <option value="Crop Protection">{t('calendarPage.stages.Crop Protection', 'Crop Protection')}</option>
                  <option value="Harvesting">{t('calendarPage.stages.Harvesting', 'Harvesting')}</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-km-dark mb-1">
                  {t('calendarPage.labelDate', 'Due Date')}
                </label>
                <input
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-km-border bg-km-bg text-km-dark"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-km-dark mb-1">
                  {t('calendarPage.labelPriority', 'Priority')}
                </label>
                <select
                  value={newTask.priority}
                  onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-km-border bg-km-bg text-km-dark font-medium"
                >
                  <option value="High">{t('calendarPage.priorities.High', 'High')}</option>
                  <option value="Medium">{t('calendarPage.priorities.Medium', 'Medium')}</option>
                  <option value="Low">{t('calendarPage.priorities.Low', 'Low')}</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-km-dark mb-1">
                {t('calendarPage.labelNotes', 'Agronomic Notes & Reminders')}
              </label>
              <textarea
                rows={2}
                placeholder={t('calendarPage.placeholderNotes', 'Add specific field guidelines, dosages, or warnings...')}
                value={newTask.notes}
                onChange={(e) => setNewTask({ ...newTask, notes: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-km-border bg-km-bg text-km-dark focus:outline-none focus:border-km-sage"
              />
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="flex-1 py-2.5 rounded-xl border border-km-border text-xs font-bold text-km-dark hover:bg-km-bg transition-colors"
              >
                {t('calendarPage.btnCancel', 'Cancel')}
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 bg-km-deep text-white rounded-xl text-xs font-bold hover:bg-km-sage transition-colors shadow-subtle"
              >
                {t('calendarPage.btnSave', 'Save Activity')}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
