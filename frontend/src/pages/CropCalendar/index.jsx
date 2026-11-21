import React, { useState } from 'react';
import { Calendar as CalendarIcon, Plus, CheckCircle2, Clock, Filter, Trash2 } from 'lucide-react';
import PageHeader from '../../components/PageHeader';
import FarmingTaskCard from '../../components/FarmingTaskCard';
import { FARMING_TASKS_MOCK } from '../../data/mockData';

export default function CropCalendar() {
  const [tasks, setTasks] = useState(FARMING_TASKS_MOCK);
  const [filterStage, setFilterStage] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
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
  };

  const filteredTasks = filterStage === 'All'
    ? tasks
    : tasks.filter(t => t.stage.toLowerCase().includes(filterStage.toLowerCase()));

  return (
    <div className="space-y-8">
      <PageHeader
        badge="Field Operations"
        title="Farming Calendar & Activity Tracker"
        subtitle="Track critical milestones for Sali paddy, Toria mustard, and seasonal crop cycles."
        actionButton={
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 bg-km-deep hover:bg-km-sage text-white text-xs font-bold rounded-2xl shadow-subtle flex items-center gap-1.5 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Activity</span>
          </button>
        }
      />

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {['All', 'Sowing', 'Irrigation', 'Fertilizer', 'Protection'].map(stage => (
          <button
            key={stage}
            onClick={() => setFilterStage(stage)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
              filterStage === stage
                ? 'bg-km-sage text-white border-km-sage'
                : 'bg-km-surface text-km-subtext border-km-border hover:bg-km-bg'
            }`}
          >
            {stage}
          </button>
        ))}
      </div>

      {/* Task List */}
      <div className="bg-km-surface rounded-3xl p-6 border border-km-border shadow-subtle space-y-4">
        <h3 className="text-base font-bold text-km-dark">
          Scheduled Milestones ({filteredTasks.length})
        </h3>

        <div className="space-y-3">
          {filteredTasks.map(task => (
            <FarmingTaskCard
              key={task.id}
              task={task}
              onToggleStatus={toggleTask}
            />
          ))}
        </div>
      </div>

      {/* Add Task Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-km-deep/40 backdrop-blur-xs flex items-center justify-center p-4">
          <form onSubmit={handleAddTask} className="bg-km-surface max-w-md w-full rounded-3xl p-6 border border-km-border shadow-floating space-y-4">
            <h3 className="text-base font-bold text-km-dark">Schedule New Farming Activity</h3>

            <div>
              <label className="block text-xs font-semibold text-km-dark mb-1">Activity Title</label>
              <input
                type="text"
                required
                placeholder="e.g. 2nd Weeding and Water Regulation"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-km-border bg-km-bg text-km-dark focus:outline-none focus:border-km-sage"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-km-dark mb-1">Target Crop</label>
                <input
                  type="text"
                  value={newTask.crop}
                  onChange={(e) => setNewTask({ ...newTask, crop: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-km-border bg-km-bg text-km-dark"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-km-dark mb-1">Stage</label>
                <select
                  value={newTask.stage}
                  onChange={(e) => setNewTask({ ...newTask, stage: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-km-border bg-km-bg text-km-dark"
                >
                  <option value="Sowing">Sowing</option>
                  <option value="Irrigation">Irrigation</option>
                  <option value="Fertilizer">Fertilizer Application</option>
                  <option value="Harvesting">Harvesting</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-km-dark mb-1">Due Date</label>
                <input
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-km-border bg-km-bg text-km-dark"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-km-dark mb-1">Priority</label>
                <select
                  value={newTask.priority}
                  onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-km-border bg-km-bg text-km-dark"
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="flex-1 py-2.5 rounded-xl border border-km-border text-xs font-bold text-km-dark hover:bg-km-bg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 bg-km-deep text-white rounded-xl text-xs font-bold hover:bg-km-sage transition-colors"
              >
                Save Task
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
