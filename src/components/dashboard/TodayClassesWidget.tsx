import React, { useState } from 'react';
import { useLMS } from '../../context/LMSContext';
import {
  CalendarDays,
  Clock,
  ArrowRight,
  GraduationCap,
  Sparkles,
  Coffee,
  AlertTriangle,
} from 'lucide-react';

export const TodayClassesWidget: React.FC = () => {
  const { timetable, setActiveView, setSelectedSubjectCode } = useLMS();

  // Pick a sample or active date from timetable (defaults to an active timetable date, e.g. Oct 27 or current date)
  const defaultDate = timetable.length > 0 ? timetable[13]?.date || timetable[0]?.date : '';
  const [selectedDate, setSelectedDate] = useState<string>(defaultDate);

  const selectedDay = timetable.find((t) => t.date === selectedDate) || timetable[0];

  if (!selectedDay) return null;

  const slots = [
    selectedDay.slots['0930_1100'],
    selectedDay.slots['1115_1245'],
    selectedDay.slots['1245_1400'],
    selectedDay.slots['1400_1530'],
    selectedDay.slots['1545_1715'],
    selectedDay.slots['1730_1900'],
  ].filter((s) => s.type !== 'free');

  return (
    <div className="bg-white dark:bg-[#0F172A] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center space-x-2.5">
          <div className="p-2.5 rounded-2xl bg-[#EBF3FA] dark:bg-slate-800 text-[#004B93] dark:text-[#38BDF8]">
            <CalendarDays className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-[#0F172A] dark:text-white">
              Schedule & Today&apos;s Sessions
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Week {selectedDay.weekNumber} • {selectedDay.dayName}, {selectedDay.date}
            </p>
          </div>
        </div>

        {/* Date Selector Dropdown from Timetable */}
        <div className="flex items-center space-x-2">
          <select
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-3 py-1.5 text-xs font-semibold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200"
          >
            {timetable.slice(0, 20).map((t) => (
              <option key={t.date} value={t.date}>
                W{t.weekNumber} {t.dayName.slice(0, 3)}: {t.date}
              </option>
            ))}
          </select>

          <button
            onClick={() => setActiveView('timetable')}
            className="inline-flex items-center space-x-1 text-xs font-bold text-[#004B93] dark:text-[#38BDF8] hover:underline ml-1"
          >
            <span>Full 12 Weeks</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Slots List */}
      <div className="space-y-2.5">
        {slots.length === 0 ? (
          <div className="p-6 text-center text-xs text-slate-400">
            No scheduled sessions or lectures for this date.
          </div>
        ) : (
          slots.map((slot, idx) => {
            const isLunch = slot.type === 'lunch';
            const isQuizOrExam = slot.type === 'quiz' || slot.type === 'midterm' || slot.type === 'endterm';
            const isCxo = slot.type === 'cxo';

            return (
              <div
                key={idx}
                className={`p-3.5 rounded-2xl border transition flex items-center justify-between gap-3 ${
                  isLunch
                    ? 'bg-slate-50/70 dark:bg-slate-900/40 border-dashed border-slate-300 dark:border-slate-800'
                    : isQuizOrExam
                    ? 'bg-amber-50/80 dark:bg-amber-950/30 border-amber-300 dark:border-amber-800'
                    : isCxo
                    ? 'bg-purple-50/80 dark:bg-purple-950/30 border-purple-200 dark:border-purple-800'
                    : 'bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/80'
                }`}
              >
                <div className="flex items-center space-x-3 overflow-hidden">
                  <div className="text-center font-mono shrink-0 min-w-[90px]">
                    <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300 flex items-center space-x-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span>{slot.timeRange.split('–')[0]?.trim()}</span>
                    </span>
                    <span className="text-[10px] text-slate-400">
                      to {slot.timeRange.split('–')[1]?.trim()}
                    </span>
                  </div>

                  <div className="h-8 w-px bg-slate-200 dark:bg-slate-700 shrink-0" />

                  <div className="truncate">
                    <div className="flex items-center space-x-2">
                      {slot.subjectCode && (
                        <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#EBF3FA] dark:bg-slate-800 text-[#004B93] dark:text-[#38BDF8] border border-[#D6E6F5] dark:border-slate-700">
                          {slot.subjectCode}
                        </span>
                      )}
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        {slot.title}
                      </h4>
                    </div>
                  </div>
                </div>

                <div className="shrink-0">
                  {isLunch ? (
                    <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      <Coffee className="w-3 h-3" />
                      <span>Lunch</span>
                    </span>
                  ) : isQuizOrExam ? (
                    <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500 text-slate-950">
                      <AlertTriangle className="w-3 h-3" />
                      <span>Evaluation</span>
                    </span>
                  ) : isCxo ? (
                    <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300">
                      <Sparkles className="w-3 h-3" />
                      <span>CXO Talk</span>
                    </span>
                  ) : slot.subjectCode ? (
                    <button
                      onClick={() => {
                        setSelectedSubjectCode(slot.subjectCode!);
                        setActiveView('subject');
                      }}
                      className="px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-blue-50 text-hsb-royal dark:bg-blue-950/60 dark:text-hsb-cyan hover:bg-blue-100 transition"
                    >
                      Workspace
                    </button>
                  ) : null}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
