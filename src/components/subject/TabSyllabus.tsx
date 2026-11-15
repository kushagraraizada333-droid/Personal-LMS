import React, { useState } from 'react';
import { useLMS } from '../../context/LMSContext';
import { Subject } from '../../types';
import { calculateSubjectProgress } from '../../utils/formatters';
import {
  CheckSquare,
  Plus,
  Layers,
  Sparkles,
} from 'lucide-react';
import { playSoftTick } from '../../utils/sound';

interface TabSyllabusProps {
  subject: Subject;
}

export const TabSyllabus: React.FC<TabSyllabusProps> = ({ subject }) => {
  const { toggleTopicCompletion, addTopic, addModule } = useLMS();

  const [newTopicTitles, setNewTopicTitles] = useState<{ [moduleId: string]: string }>({});
  const [isAddingModule, setIsAddingModule] = useState(false);
  const [newModuleTitle, setNewModuleTitle] = useState('');

  const progress = calculateSubjectProgress(subject.modules);

  const handleToggle = (moduleId: string, topicId: string) => {
    playSoftTick();
    toggleTopicCompletion(subject.code, moduleId, topicId);
  };

  const handleAddTopic = async (moduleId: string) => {
    const title = newTopicTitles[moduleId];
    if (!title || !title.trim()) return;

    await addTopic(subject.code, moduleId, title.trim());
    setNewTopicTitles((prev) => ({ ...prev, [moduleId]: '' }));
  };

  const handleAddModule = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newModuleTitle.trim()) return;

    await addModule(subject.code, newModuleTitle.trim());
    setNewModuleTitle('');
    setIsAddingModule(false);
  };

  return (
    <div className="space-y-6">
      {/* Syllabus Progress Banner */}
      <div className="p-6 bg-white dark:bg-[#111827] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
              Syllabus Checklist
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              {progress.completed} of {progress.total} topics completed
            </p>
          </div>

          <div className="flex items-baseline space-x-1">
            <span className="text-3xl font-black text-[#004B93] dark:text-[#38BDF8] tabular-nums">
              {progress.percentage}%
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-3 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-hsb-royal to-hsb-sky transition-all duration-500"
            style={{ width: `${progress.percentage}%` }}
          />
        </div>

        <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
          <span>Add modules and topics below. Checking them off automatically updates your study progress.</span>
          <span className="font-semibold text-slate-600 dark:text-slate-300">
            {subject.modules.length} Modules Logged
          </span>
        </div>
      </div>

      {/* Module Add Control */}
      <div className="flex justify-between items-center">
        <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-2">
          <Layers className="w-4 h-4 text-hsb-royal dark:text-hsb-cyan" />
          <span>Curricular Modules</span>
        </h4>

        <button
          onClick={() => setIsAddingModule(!isAddingModule)}
          className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 transition"
        >
          <Plus className="w-3.5 h-3.5 text-hsb-royal dark:text-hsb-cyan" />
          <span>{isAddingModule ? 'Cancel' : 'Add New Module'}</span>
        </button>
      </div>

      {/* Add Module Form */}
      {isAddingModule && (
        <form
          onSubmit={handleAddModule}
          className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 flex gap-2 animate-in fade-in"
        >
          <input
            type="text"
            placeholder="e.g. Module 1: Foundations & Core Architecture"
            value={newModuleTitle}
            onChange={(e) => setNewModuleTitle(e.target.value)}
            className="flex-1 px-3 py-2 text-xs bg-white dark:bg-slate-900 border rounded-xl"
            required
          />
          <button
            type="submit"
            className="px-4 py-2 text-xs font-bold rounded-xl bg-hsb-royal hover:bg-blue-700 text-white shadow-sm transition"
          >
            Create Module
          </button>
        </form>
      )}

      {/* Modules List (Starts at 0 / Empty State) */}
      {subject.modules.length === 0 ? (
        <div className="p-12 text-center bg-white dark:bg-[#111827] rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 text-xs text-slate-400">
          No syllabus modules added for {subject.code} yet. Click &quot;Add New Module&quot; above to start building your personal study checklist.
        </div>
      ) : (
        <div className="space-y-4">
          {subject.modules.map((mod, modIdx) => {
            const modCompleted = mod.topics.filter((t) => t.completed).length;
            const modTotal = mod.topics.length;
            const modPercent = modTotal > 0 ? Math.round((modCompleted / modTotal) * 100) : 0;

            return (
              <div
                key={mod.id}
                className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden"
              >
                {/* Module Header */}
                <div className="p-4 bg-slate-50 dark:bg-slate-800/40 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-6 h-6 rounded-lg bg-blue-100 text-hsb-navy dark:bg-blue-950/60 dark:text-hsb-cyan font-black text-xs flex items-center justify-center shrink-0">
                      {modIdx + 1}
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      {mod.title}
                    </h4>
                  </div>

                  <div className="flex items-center space-x-3 shrink-0">
                    <span className="text-xs font-mono font-bold text-slate-600 dark:text-slate-300">
                      {modCompleted}/{modTotal} Topics ({modPercent}%)
                    </span>
                    <div className="w-20 bg-slate-200 dark:bg-slate-700 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="h-full bg-emerald-600 rounded-full transition-all duration-500"
                        style={{ width: `${modPercent}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Topics Checklist */}
                <div className="p-4 space-y-2">
                  {mod.topics.length === 0 ? (
                    <p className="text-xs text-slate-400 py-1">No topics in this module yet.</p>
                  ) : (
                    mod.topics.map((topic) => (
                      <div
                        key={topic.id}
                        onClick={() => handleToggle(mod.id, topic.id)}
                        className={`flex items-start space-x-3 p-3 rounded-xl border transition cursor-pointer select-none group ${
                          topic.completed
                            ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-200/60 dark:border-emerald-900/40'
                            : 'bg-white dark:bg-slate-800/40 border-slate-200 dark:border-slate-700/60 hover:border-hsb-royal/50'
                        }`}
                      >
                        <div className="pt-0.5">
                          <div
                            className={`w-4 h-4 rounded border flex items-center justify-center transition ${
                              topic.completed
                                ? 'bg-emerald-600 border-emerald-600 text-white'
                                : 'border-slate-400 group-hover:border-hsb-royal'
                            }`}
                          >
                            {topic.completed && <CheckSquare className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                        </div>

                        <div className="flex-1">
                          <p
                            className={`text-xs font-medium transition ${
                              topic.completed
                                ? 'line-through text-slate-400 dark:text-slate-500'
                                : 'text-slate-800 dark:text-slate-200 group-hover:text-hsb-royal dark:group-hover:text-hsb-cyan'
                            }`}
                          >
                            {topic.title}
                          </p>
                        </div>
                      </div>
                    ))
                  )}

                  {/* Add Topic Inline Input */}
                  <div className="pt-2 flex items-center space-x-2">
                    <input
                      type="text"
                      placeholder="Add topic to this module..."
                      value={newTopicTitles[mod.id] || ''}
                      onChange={(e) =>
                        setNewTopicTitles((prev) => ({ ...prev, [mod.id]: e.target.value }))
                      }
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddTopic(mod.id);
                        }
                      }}
                      className="flex-1 px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl"
                    />
                    <button
                      onClick={() => handleAddTopic(mod.id)}
                      className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 transition"
                    >
                      + Add Topic
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
