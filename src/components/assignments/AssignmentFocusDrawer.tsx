import React, { useState, useEffect } from 'react';
import { useLMS } from '../../context/LMSContext';
import { AssignmentSubtask, KanbanStage } from '../../types';
import { formatDate, getTimeRemaining } from '../../utils/formatters';
import { UrgencyRing } from './UrgencyRing';
import {
  X,
  CheckCircle2,
  Circle,
  Plus,
  Trash2,
  Timer,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Calendar,
  Layers,
  Clock,
  Flame,
  FileCheck2,
  UploadCloud,
  FileText,
  ExternalLink,
} from 'lucide-react';
import { playStudyChime, triggerStudyConfetti, playSoftTick } from '../../utils/sound';

export const AssignmentFocusDrawer: React.FC = () => {
  const {
    selectedAssignmentForFocus,
    setSelectedAssignmentForFocus,
    updateAssignment,
    subjects,
    submitAssignmentWithFile,
    loadFileBlob,
    openFilePreview,
  } = useLMS();

  const [newSubtaskTitle, setNewSubtaskTitle] = useState('');
  const [timerMode, setTimerMode] = useState<'focus' | 'break'>('focus');
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedAssignmentForFocus(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setSelectedAssignmentForFocus]);

  // Focus Timer interval
  useEffect(() => {
    let interval: number | undefined;
    if (isTimerRunning && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (isTimerRunning && timeLeft === 0) {
      playStudyChime();
      triggerStudyConfetti();

      if (timerMode === 'focus' && selectedAssignmentForFocus) {
        // Log 25 minutes to this assignment
        const currentLogged = selectedAssignmentForFocus.focusMinutesLogged ?? 0;
        const newLogged = currentLogged + 25;
        updateAssignment(selectedAssignmentForFocus.id, {
          focusMinutesLogged: newLogged,
        });
        setTimerMode('break');
        setTimeLeft(5 * 60);
      } else {
        setTimerMode('focus');
        setTimeLeft(25 * 60);
      }
      setIsTimerRunning(false);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timeLeft, timerMode, selectedAssignmentForFocus, updateAssignment]);

  if (!selectedAssignmentForFocus) return null;

  const assignment = selectedAssignmentForFocus;
  const subject = subjects.find(
    (s) => s.code === assignment.subjectId || s.id === assignment.subjectId
  );

  const subtasks: AssignmentSubtask[] = assignment.subtasks ?? [];
  const completedSubtasks = subtasks.filter((s) => s.completed).length;
  const subtaskProgress =
    subtasks.length > 0 ? Math.round((completedSubtasks / subtasks.length) * 100) : 0;
  const focusMinutes = assignment.focusMinutesLogged ?? 0;

  const handleAddSubtask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubtaskTitle.trim()) return;

    const newSub: AssignmentSubtask = {
      id: `sub-${Date.now()}`,
      title: newSubtaskTitle.trim(),
      completed: false,
    };

    const updated = [...subtasks, newSub];
    updateAssignment(assignment.id, { subtasks: updated });
    setNewSubtaskTitle('');
    playSoftTick();
  };

  const handleToggleSubtask = (subId: string) => {
    const updated = subtasks.map((s) =>
      s.id === subId ? { ...s, completed: !s.completed } : s
    );
    const completedNow = updated.find((s) => s.id === subId)?.completed;
    if (completedNow) {
      playSoftTick();
    }
    updateAssignment(assignment.id, { subtasks: updated });
  };

  const handleDeleteSubtask = (subId: string) => {
    const updated = subtasks.filter((s) => s.id !== subId);
    updateAssignment(assignment.id, { subtasks: updated });
  };

  const handleStageChange = (newStage: KanbanStage) => {
    const isSubmitted = newStage === 'Submitted';
    updateAssignment(assignment.id, {
      kanbanStage: newStage,
      status: isSubmitted
        ? 'Submitted'
        : newStage === 'In Progress' || newStage === 'Drafting/Review'
        ? 'In Progress'
        : 'Pending',
      submittedAt: isSubmitted ? assignment.submittedAt || new Date().toISOString() : undefined,
    });
    if (isSubmitted) {
      playStudyChime();
      triggerStudyConfetti();
    } else {
      playSoftTick();
    }
  };

  const handleLogManualMinutes = (minutesToAdd: number) => {
    const current = assignment.focusMinutesLogged ?? 0;
    updateAssignment(assignment.id, {
      focusMinutesLogged: Math.max(0, current + minutesToAdd),
    });
    playSoftTick();
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      {/* Dimmed Backdrop */}
      <div
        onClick={() => setSelectedAssignmentForFocus(null)}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      {/* Slide-out Panel */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-xl bg-white dark:bg-[#0F172A] border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/60 sticky top-0 z-10 backdrop-blur-md">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                  <span
                    className="text-xs font-mono font-black px-2.5 py-0.5 rounded-lg text-white shadow-xs"
                    style={{ backgroundColor: subject?.color || '#004B93' }}
                  >
                    {assignment.subjectId}
                  </span>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    {subject?.name || 'HSB Course Deliverable'}
                  </span>
                  <span
                    className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${
                      assignment.priority === 'High'
                        ? 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
                        : assignment.priority === 'Medium'
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                        : 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300'
                    }`}
                  >
                    {assignment.priority} Priority
                  </span>
                </div>

                <h3 className="text-xl font-black text-slate-900 dark:text-white leading-snug">
                  {assignment.title}
                </h3>
              </div>

              <button
                onClick={() => setSelectedAssignmentForFocus(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                title="Close drawer (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Due date & Urgency Ring */}
            <div className="mt-4 pt-3 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2.5">
                <UrgencyRing
                  dueDate={assignment.dueDate}
                  isSubmitted={assignment.status === 'Submitted'}
                  size={30}
                  strokeWidth={3.5}
                />
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block text-[10px] uppercase font-bold">
                    Target Deadline
                  </span>
                  <span className="font-extrabold text-slate-900 dark:text-white">
                    {formatDate(assignment.dueDate)}
                  </span>
                </div>
              </div>

              {/* Kanban Stage Pill Selector */}
              <div className="flex items-center space-x-1">
                {(['Queued', 'In Progress', 'Drafting/Review', 'Submitted'] as KanbanStage[]).map(
                  (stage) => {
                    const isCurrent =
                      (assignment.kanbanStage ?? (assignment.status === 'Submitted' ? 'Submitted' : 'Queued')) ===
                      stage;
                    return (
                      <button
                        key={stage}
                        onClick={() => handleStageChange(stage)}
                        className={`px-2.5 py-1 text-[11px] font-black rounded-lg transition ${
                          isCurrent
                            ? 'bg-[#004B93] text-white shadow-xs'
                            : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
                        }`}
                      >
                        {stage === 'Drafting/Review' ? 'Review' : stage}
                      </button>
                    );
                  }
                )}
              </div>
            </div>
          </div>

          {/* Drawer Body */}
          <div className="p-6 space-y-6 flex-1">
            {/* Description if present */}
            {assignment.description && (
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300">
                <p className="font-bold text-slate-900 dark:text-white mb-1">Brief & Notes:</p>
                <p className="whitespace-pre-wrap">{assignment.description}</p>
              </div>
            )}

            {/* SECTION 1: SUB-TASK CHECKLIST */}
            <div className="bg-white dark:bg-slate-900/60 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 space-y-4 shadow-xs">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#004B93] dark:text-[#38BDF8]" />
                    <span>Sub-task Checklist</span>
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Break down this assignment into manageable steps
                  </p>
                </div>

                <span className="text-xs font-mono font-black text-slate-700 dark:text-slate-300">
                  {completedSubtasks} / {subtasks.length} ({subtaskProgress}%)
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#004B93] to-emerald-500 transition-all duration-500"
                  style={{ width: `${subtaskProgress}%` }}
                />
              </div>

              {/* Subtasks List */}
              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {subtasks.length === 0 ? (
                  <p className="text-xs text-slate-400 italic py-2">
                    No sub-tasks added yet. Add your first step below.
                  </p>
                ) : (
                  subtasks.map((st) => (
                    <div
                      key={st.id}
                      className={`flex items-center justify-between p-2.5 rounded-xl border transition group ${
                        st.completed
                          ? 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/60 text-slate-400 dark:text-slate-500 line-through'
                          : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200'
                      }`}
                    >
                      <button
                        onClick={() => handleToggleSubtask(st.id)}
                        className="flex items-center space-x-2.5 text-left flex-1"
                      >
                        {st.completed ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        ) : (
                          <Circle className="w-4 h-4 text-slate-400 hover:text-[#004B93] shrink-0" />
                        )}
                        <span className="text-xs font-semibold">{st.title}</span>
                      </button>

                      <button
                        onClick={() => handleDeleteSubtask(st.id)}
                        className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-rose-600 transition"
                        title="Delete sub-task"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Add Subtask Input */}
              <form onSubmit={handleAddSubtask} className="flex items-center space-x-2 pt-2">
                <input
                  type="text"
                  value={newSubtaskTitle}
                  onChange={(e) => setNewSubtaskTitle(e.target.value)}
                  placeholder="Add a step (e.g. Conduct interview #1)..."
                  className="flex-1 px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#004B93]"
                />
                <button
                  type="submit"
                  disabled={!newSubtaskTitle.trim()}
                  className="px-3 py-2 text-xs font-bold rounded-xl bg-[#004B93] hover:bg-[#003870] disabled:opacity-40 text-white transition flex items-center space-x-1"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add</span>
                </button>
              </form>
            </div>

            {/* SECTION 2: EMBEDDED POMODORO FOCUS TIMER */}
            <div className="bg-gradient-to-br from-[#004B93]/5 to-indigo-50/40 dark:from-[#004B93]/20 dark:to-slate-900/60 rounded-3xl border border-[#004B93]/20 dark:border-[#004B93]/40 p-5 space-y-4 shadow-xs">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center space-x-2">
                    <Timer className="w-4 h-4 text-[#004B93] dark:text-[#38BDF8]" />
                    <span>Embedded Focus Timer</span>
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Track deep work dedicated specifically to this task
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Time Logged
                  </span>
                  <span className="text-sm font-black text-[#004B93] dark:text-[#38BDF8] tabular-nums">
                    {focusMinutes} mins
                  </span>
                </div>
              </div>

              {/* Mode switch */}
              <div className="flex items-center justify-center space-x-2 p-1 bg-white/60 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-700/80 w-fit mx-auto text-xs">
                <button
                  onClick={() => {
                    setTimerMode('focus');
                    setTimeLeft(25 * 60);
                    setIsTimerRunning(false);
                  }}
                  className={`px-3 py-1 rounded-lg font-bold transition ${
                    timerMode === 'focus'
                      ? 'bg-[#004B93] text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  Focus (25m)
                </button>
                <button
                  onClick={() => {
                    setTimerMode('break');
                    setTimeLeft(5 * 60);
                    setIsTimerRunning(false);
                  }}
                  className={`px-3 py-1 rounded-lg font-bold transition ${
                    timerMode === 'break'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  Rest Break (5m)
                </button>
              </div>

              {/* Digital Countdown Display */}
              <div className="text-center py-2">
                <div className="text-4xl sm:text-5xl font-black tracking-tight font-mono text-slate-900 dark:text-white tabular-nums">
                  {formattedTime}
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  {isTimerRunning
                    ? timerMode === 'focus'
                      ? 'Deep Work Session in Progress...'
                      : 'Rest & Recharge...'
                    : 'Ready to focus'}
                </p>
              </div>

              {/* Timer Controls */}
              <div className="flex items-center justify-center space-x-3">
                <button
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  className={`px-5 py-2 rounded-xl text-xs font-black text-white shadow-md transition flex items-center space-x-2 ${
                    isTimerRunning
                      ? 'bg-amber-600 hover:bg-amber-700'
                      : 'bg-[#004B93] hover:bg-[#003870]'
                  }`}
                >
                  {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{isTimerRunning ? 'Pause Session' : 'Start Focus Session'}</span>
                </button>

                <button
                  onClick={() => {
                    setIsTimerRunning(false);
                    setTimeLeft(timerMode === 'focus' ? 25 * 60 : 5 * 60);
                  }}
                  className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 transition"
                  title="Reset timer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                <button
                  onClick={() => handleLogManualMinutes(15)}
                  className="px-2.5 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-[#004B93] text-xs font-bold transition"
                  title="Log 15 offline minutes"
                >
                  +15m
                </button>
              </div>
            </div>

            {/* SECTION 3: SUBMISSION ATTACHMENT */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 text-xs space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-slate-900 dark:text-white flex items-center space-x-1.5">
                  <FileCheck2 className="w-4 h-4 text-emerald-600" />
                  <span>Submission Deliverable:</span>
                </span>
                <span className="font-mono text-slate-500">
                  {assignment.status === 'Submitted' ? 'Completed' : 'Awaiting Submission'}
                </span>
              </div>

              {assignment.submissionFileName ? (
                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-emerald-300 dark:border-emerald-800 flex items-center justify-between">
                  <div className="flex items-center space-x-2 truncate">
                    <FileText className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="font-mono font-bold truncate text-slate-900 dark:text-white">
                      {assignment.submissionFileName}
                    </span>
                  </div>
                  {assignment.submissionFileId && (
                    <button
                      onClick={() => openFilePreview(assignment.submissionFileId!)}
                      className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950/60 dark:text-emerald-300 transition shrink-0"
                    >
                      Preview
                    </button>
                  )}
                </div>
              ) : (
                <label className="flex items-center justify-center space-x-2 p-3 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 hover:border-[#004B93] cursor-pointer transition text-slate-600 dark:text-slate-400">
                  <UploadCloud className="w-4 h-4 text-[#004B93]" />
                  <span className="font-bold">Attach Submission File (.pdf, .docx, .pptx)</span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) submitAssignmentWithFile(assignment.id, file);
                    }}
                  />
                </label>
              )}
            </div>
          </div>

          {/* Drawer Footer */}
          <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/60 flex items-center justify-between text-xs">
            <span className="text-slate-400">
              Auto-saved to local IndexedDB store
            </span>
            <button
              onClick={() => setSelectedAssignmentForFocus(null)}
              className="px-4 py-2 rounded-xl bg-[#004B93] hover:bg-[#003870] text-white font-bold transition shadow-xs"
            >
              Done & Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
