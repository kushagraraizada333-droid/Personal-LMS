import React from 'react';
import { useLMS } from '../../context/LMSContext';
import { playStudyChime, playSoftTick } from '../../utils/sound';
import { Play, Pause, RotateCcw, X, BookOpen, CheckCircle, Sparkles } from 'lucide-react';

export const PomodoroModal: React.FC = () => {
  const {
    isPomodoroModalOpen,
    setIsPomodoroModalOpen,
    pomodoro,
    startPomodoro,
    pausePomodoro,
    resetPomodoro,
    setPomodoroSubject,
    subjects,
  } = useLMS();

  if (!isPomodoroModalOpen) return null;

  const minutes = Math.floor(pomodoro.timeLeft / 60);
  const seconds = pomodoro.timeLeft % 60;
  const timeFormatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const totalDuration =
    pomodoro.mode === 'focus' ? 25 * 60 : pomodoro.mode === 'shortBreak' ? 5 * 60 : 15 * 60;
  const progressPercent = ((totalDuration - pomodoro.timeLeft) / totalDuration) * 100;

  const currentSubject = subjects.find((s) => s.code === pomodoro.activeSubjectCode);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white dark:bg-[#111827] rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Top Banner */}
        <div className="relative px-6 pt-6 pb-4 bg-gradient-to-r from-[#004B93] via-[#003870] to-[#002B5B] text-white">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <span className="p-1.5 rounded-lg bg-white/15 text-[#38BDF8] border border-white/20">
                <Sparkles className="w-4 h-4" />
              </span>
              <span className="text-xs font-semibold tracking-wider uppercase text-[#38BDF8]">
                Executive Focus Suite
              </span>
            </div>
            <button
              onClick={() => setIsPomodoroModalOpen(false)}
              className="p-1 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <h2 className="text-xl font-bold tracking-tight">HSB Pomodoro Study Engine</h2>
          <p className="text-xs text-slate-300 mt-1">
            Deep focus intervals with synthesized acoustic chime transitions.
          </p>
        </div>

        {/* Mode Selector Tabs */}
        <div className="px-6 pt-5">
          <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl text-xs font-semibold">
            <button
              onClick={() => {
                playSoftTick();
                resetPomodoro('focus');
              }}
              className={`py-2 rounded-lg transition ${
                pomodoro.mode === 'focus'
                  ? 'bg-[#004B93] text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              Deep Focus (25m)
            </button>
            <button
              onClick={() => {
                playSoftTick();
                resetPomodoro('shortBreak');
              }}
              className={`py-2 rounded-lg transition ${
                pomodoro.mode === 'shortBreak'
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              Short Break (5m)
            </button>
            <button
              onClick={() => {
                playSoftTick();
                resetPomodoro('longBreak');
              }}
              className={`py-2 rounded-lg transition ${
                pomodoro.mode === 'longBreak'
                  ? 'bg-slate-700 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              Long Break (15m)
            </button>
          </div>
        </div>

        {/* Timer Dial & Display */}
        <div className="p-6 flex flex-col items-center">
          <div className="relative w-56 h-56 flex items-center justify-center my-2">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="112"
                cy="112"
                r="96"
                stroke="currentColor"
                strokeWidth="10"
                className="text-slate-100 dark:text-slate-800"
                fill="none"
              />
              <circle
                cx="112"
                cy="112"
                r="96"
                stroke="currentColor"
                strokeWidth="10"
                strokeDasharray={2 * Math.PI * 96}
                strokeDashoffset={2 * Math.PI * 96 * (1 - progressPercent / 100)}
                strokeLinecap="round"
                className={`transition-all duration-500 ${
                  pomodoro.mode === 'focus' ? 'text-[#004B93]' : 'text-sky-500'
                }`}
                fill="none"
              />
            </svg>

            <div className="absolute flex flex-col items-center text-center">
              <span className="text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white font-mono tabular-nums">
                {timeFormatted}
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 mt-2">
                {pomodoro.mode === 'focus'
                  ? 'Deep Work Session'
                  : pomodoro.mode === 'shortBreak'
                  ? 'Recharge & Hydrate'
                  : 'Executive Rest'}
              </span>
            </div>
          </div>

          {/* Active Subject Selector */}
          <div className="w-full mt-2 mb-6">
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 flex items-center justify-between">
              <span className="flex items-center space-x-1.5">
                <BookOpen className="w-3.5 h-3.5 text-[#004B93] dark:text-[#38BDF8]" />
                <span>Tagging to HSB Course:</span>
              </span>
              <span className="text-[11px] text-slate-400">
                {pomodoro.completedSessions} Sprints Completed
              </span>
            </label>
            <select
              value={pomodoro.activeSubjectCode || ''}
              onChange={(e) => setPomodoroSubject(e.target.value || undefined)}
              className="w-full px-3.5 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-hsb-royal font-medium"
            >
              <option value="">General Academic Study</option>
              {subjects.map((s) => (
                <option key={s.code} value={s.code}>
                  {s.name} ({s.code})
                </option>
              ))}
            </select>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-4 w-full justify-center">
            <button
              onClick={() => {
                playSoftTick();
                resetPomodoro();
              }}
              title="Reset Timer"
              className="p-3 rounded-2xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <RotateCcw className="w-5 h-5" />
            </button>

            {pomodoro.isRunning ? (
              <button
                onClick={() => {
                  playSoftTick();
                  pausePomodoro();
                }}
                className="flex items-center space-x-2 px-8 py-3.5 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-base shadow-lg hover:shadow-amber-600/30 transition transform active:scale-95"
              >
                <Pause className="w-5 h-5" />
                <span>Pause</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  playSoftTick();
                  startPomodoro();
                }}
                className="flex items-center space-x-2 px-8 py-3.5 rounded-2xl bg-[#004B93] hover:bg-[#003870] text-white font-bold text-base shadow-lg hover:shadow-[#004B93]/30 transition transform active:scale-95"
              >
                <Play className="w-5 h-5 fill-current" />
                <span>Begin Sprint</span>
              </button>
            )}

            <button
              onClick={() => playStudyChime()}
              title="Test Executive Chime"
              className="p-3 rounded-2xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition text-xs font-semibold"
            >
              🔔
            </button>
          </div>

          {/* Session Counter Footnote */}
          <div className="mt-5 flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
            <span>
              Target: 4 sprints for deep retention. Next break:{' '}
              {pomodoro.completedSessions % 4 === 3 ? 'Long (15 min)' : 'Short (5 min)'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
