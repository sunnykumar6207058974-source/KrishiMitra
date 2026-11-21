import React from 'react';
import { CheckCircle2, Clock, Calendar, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function FarmingTaskCard({ task, onToggleStatus }) {
  const { lang, t } = useLanguage();
  const isCompleted = task.status === 'Completed';

  const priorityColors = {
    High: 'bg-red-50 text-red-700 border-red-200',
    Medium: 'bg-amber-50 text-amber-700 border-amber-200',
    Low: 'bg-km-bg text-km-subtext border-km-border',
  };

  // Locale-aware task content resolution
  const title = t(`calendarPage.tasks.${task.id}.title`, task.title);
  const notes = t(`calendarPage.tasks.${task.id}.notes`, task.notes);
  const crop = t(`calendarPage.crops.${task.crop}`, task.crop);
  const stage = t(`calendarPage.stages.${task.stage}`, task.stage);
  const priority = t(`calendarPage.priorities.${task.priority}`, task.priority);

  // Format date according to locale
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      return new Intl.DateTimeFormat(lang === 'hi' ? 'hi-IN' : 'en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }).format(d);
    } catch {
      return dateStr;
    }
  };

  return (
    <div
      className={`p-4 sm:p-5 rounded-2xl border transition-all ${
        isCompleted
          ? 'bg-km-surface/60 border-km-border text-km-subtext/70'
          : 'bg-km-surface border-km-border text-km-dark hover:border-km-sage shadow-subtle'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <button
            onClick={() => onToggleStatus && onToggleStatus(task.id)}
            title={isCompleted ? t('calendarPage.statuses.Completed', 'Completed') : t('calendarPage.statuses.Pending', 'Pending')}
            className={`w-6 h-6 rounded-lg border flex items-center justify-center mt-0.5 shrink-0 transition-colors ${
              isCompleted
                ? 'bg-km-sage border-km-sage text-white'
                : 'border-km-border hover:border-km-sage bg-km-bg'
            }`}
          >
            {isCompleted && <CheckCircle2 className="w-4 h-4" />}
          </button>

          <div className="space-y-1.5">
            {/* Card title: 16–17px bold */}
            <h4 className={`text-sm sm:text-base font-bold leading-snug ${isCompleted ? 'line-through text-km-subtext' : 'text-km-dark'}`}>
              {title}
            </h4>
            {/* Crop / Stage / Due — 13–14px */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-km-subtext font-medium">
              <span className="text-km-sage font-bold">{crop}</span>
              <span>•</span>
              <span>{t('calendarPage.stage', 'Stage')}: {stage}</span>
              <span>•</span>
              <span>{t('calendarPage.due', 'Due')}: {formatDate(task.dueDate)}</span>
            </div>
            {/* Notes / description: 14–15px */}
            {notes && (
              <p className="text-xs sm:text-sm text-km-subtext pt-1 leading-relaxed">
                {notes}
              </p>
            )}
          </div>
        </div>

        {/* Priority badge: 11–12px */}
        <span className={`text-xs font-bold px-2.5 py-1 rounded-md border shrink-0 ${priorityColors[task.priority] || priorityColors.Medium}`}>
          {priority}
        </span>
      </div>
    </div>
  );
}
