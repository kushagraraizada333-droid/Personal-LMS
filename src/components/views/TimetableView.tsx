import React, { useState } from 'react';
import { useLMS } from '../../context/LMSContext';
import { TimetableSlot, ExamReminder } from '../../types';
import {
  CalendarDays,
  Clock,
  Sparkles,
  AlertTriangle,
  Coffee,
  Plus,
  Trash2,
  FileSpreadsheet,
  ChevronLeft,
  ChevronRight,
  Bookmark,
} from 'lucide-react';
import { playStudyChime } from '../../utils/sound';

interface TimetableViewProps {
  onOpenSyncExcel: () => void;
}

export const TimetableView: React.FC<TimetableViewProps> = ({ onOpenSyncExcel }) => {
  const { timetable, examReminders, addExamReminder, deleteExamReminder } = useLMS();

  const [selectedWeek, setSelectedWeek] = useState<number>(1);
  const [isAddingReminder, setIsAddingReminder] = useState(false);
  const [newReminderTitle, setNewReminderTitle] = useState('');
  const [newReminderDate, setNewReminderDate] = useState('2026-10-28');
  const [newReminderTime, setNewReminderTime] = useState('12:30');
  const [newReminderSubject, setNewReminderSubject] = useState('PM2');
  const [newReminderType, setNewReminderType] = useState<ExamReminder['type']>('Quiz');
  const [newReminderNotes, setNewReminderNotes] = useState('');

  // Group timetable days by week
  const weekDays = timetable.filter((t) => t.weekNumber === selectedWeek);

  const handleCreateReminder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReminderTitle.trim()) return;

    await addExamReminder({
      title: newReminderTitle.trim(),
      date: newReminderDate,
      time: newReminderTime,
      subjectCode: newReminderSubject,
      type: newReminderType,
      notes: newReminderNotes.trim() || undefined,
    });

    setNewReminderTitle('');
    setNewReminderNotes('');
    setIsAddingReminder(false);
    playStudyChime();
  };

  const renderSlotCell = (slot: TimetableSlot) => {
    if (slot.type === 'free' || !slot.title || slot.title === 'Free Slot') {
      return (
        <span className="text-[11px] text-slate-300 dark:text-slate-600 font-mono">—</span>
      );
    }

    if (slot.type === 'lunch') {
      return (
        <div className="py-1 px-1.5 rounded-lg bg-slate-100 dark:bg-slate-800/80 text-[10px] font-semibold text-slate-500 text-center flex items-center justify-center space-x-1">
          <Coffee className="w-3 h-3 text-slate-400" />
          <span>LUNCH</span>
        </div>
      );
    }

    if (slot.type === 'holiday') {
      return (
        <div className="py-1 px-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-[11px] font-bold text-center">
          {slot.title}
        </div>
      );
    }

    if (slot.type === 'endterm') {
      return (
        <div className="py-1.5 px-2 rounded-xl bg-rose-600 text-white font-extrabold text-[11px] text-center shadow-xs">
          {slot.title}
        </div>
      );
    }

    if (slot.type === 'midterm' || slot.type === 'quiz') {
      return (
        <div className="py-1 px-2 rounded-xl bg-amber-500 text-slate-950 font-black text-[11px] text-center shadow-xs flex items-center justify-center space-x-1">
          <AlertTriangle className="w-3 h-3 shrink-0" />
          <span>{slot.title}</span>
        </div>
      );
    }

    if (slot.type === 'cxo') {
      return (
        <div className="py-1 px-2 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-900 dark:text-purple-300 border border-purple-200 dark:border-purple-800 text-[11px] font-bold text-center flex items-center justify-center space-x-1">
          <Sparkles className="w-3 h-3 text-purple-600 shrink-0" />
          <span className="truncate">{slot.title}</span>
        </div>
      );
    }

    if (slot.type === 'tcc') {
      return (
        <div className="py-1 px-2 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-hsb-navy dark:text-hsb-cyan border border-blue-200 dark:border-blue-800 text-[11px] font-bold text-center">
          {slot.title}
        </div>
      );
    }

    return (
      <div className="py-1 px-2 rounded-xl bg-[#004B93] text-white text-[11px] font-bold text-center shadow-xs flex items-center justify-center space-x-1">
        {slot.subjectCode && (
          <span className="text-[10px] font-mono text-[#38BDF8] font-black mr-0.5">
            {slot.subjectCode}
          </span>
        )}
        <span className="truncate">{slot.title}</span>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-5 sm:p-6 bg-gradient-to-r from-[#004B93] via-[#003870] to-[#002B5B] text-white rounded-3xl shadow-sm border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            Timetable & Calendar
          </h2>
          <p className="text-xs text-slate-300 mt-0.5">
            Trimester II schedule (Weeks 1 to 12)
          </p>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <button
            onClick={onOpenSyncExcel}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm transition"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Sync Excel</span>
          </button>
        </div>
      </div>

      {/* Week Selector Bar (1 to 12) */}
      <div className="p-4 bg-white dark:bg-[#111827] rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2 overflow-x-auto">
        <div className="flex items-center space-x-1">
          <button
            disabled={selectedWeek <= 1}
            onClick={() => setSelectedWeek((w) => Math.max(1, w - 1))}
            className="p-1.5 rounded-lg border text-slate-500 disabled:opacity-30 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300 px-2 whitespace-nowrap">
            Weeks:
          </span>
        </div>

        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1">
          {Array.from({ length: 12 }, (_, i) => i + 1).map((w) => {
            const isSelected = selectedWeek === w;
            const isExamWeek = w === 12;
            const isQuizWeek = w === 4 || w === 6;

            return (
              <button
                key={w}
                onClick={() => setSelectedWeek(w)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                  isSelected
                    ? 'bg-hsb-navy text-hsb-cyan border border-hsb-royal shadow-sm'
                    : isExamWeek
                    ? 'bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 hover:bg-rose-100'
                    : isQuizWeek
                    ? 'bg-amber-50 text-amber-800 dark:bg-amber-950/40 dark:text-gold-400 hover:bg-amber-100'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                <span>Week {w}</span>
                {isExamWeek && <span className="ml-1 text-[10px] text-rose-600">★</span>}
              </button>
            );
          })}
        </div>

        <button
          disabled={selectedWeek >= 12}
          onClick={() => setSelectedWeek((w) => Math.min(12, w + 1))}
          className="p-1.5 rounded-lg border text-slate-500 disabled:opacity-30 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Week Grid Table */}
      <div className="bg-white dark:bg-[#0F172A] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-4 bg-slate-50/70 dark:bg-slate-800/40 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <h3 className="text-sm font-extrabold text-[#0F172A] dark:text-white flex items-center space-x-2">
            <span>Week {selectedWeek} Schedule</span>
            <span className="text-xs text-slate-400 font-normal">
              ({weekDays[0]?.date || 'Oct 2026'} to {weekDays[weekDays.length - 1]?.date || 'Dec 2026'})
            </span>
          </h3>

          <div className="flex items-center space-x-2 text-[11px] text-slate-500">
            <span className="flex items-center space-x-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#004B93]"></span>
              <span>Classes</span>
            </span>
            <span className="flex items-center space-x-1">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
              <span>CXO Talk</span>
            </span>
            <span className="flex items-center space-x-1">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              <span>Quiz/Exam</span>
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100/60 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold uppercase text-slate-600 dark:text-slate-400">
                <th className="py-3 px-4 w-36">Day & Date</th>
                <th className="py-3 px-3 text-center">09:30 – 11:00</th>
                <th className="py-3 px-3 text-center">11:15 – 12:45</th>
                <th className="py-3 px-2 text-center w-24">12:45 – 14:00</th>
                <th className="py-3 px-3 text-center">14:00 – 15:30</th>
                <th className="py-3 px-3 text-center">15:45 – 17:15</th>
                <th className="py-3 px-3 text-center">17:30 – 19:00</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {weekDays.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    No scheduled sessions for Week {selectedWeek}.
                  </td>
                </tr>
              ) : (
                weekDays.map((day) => (
                  <tr
                    key={day.date}
                    className="hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition"
                  >
                    <td className="py-3 px-4 border-r border-slate-100 dark:border-slate-800/80">
                      <p className="font-bold text-slate-900 dark:text-white">{day.dayName}</p>
                      <p className="text-[10px] font-mono text-slate-400">{day.date}</p>
                      {day.remarks && (
                        <p className="text-[10px] text-amber-600 dark:text-gold-400 font-semibold truncate max-w-[130px]">
                          {day.remarks}
                        </p>
                      )}
                    </td>
                    <td className="py-2.5 px-2 text-center">{renderSlotCell(day.slots['0930_1100'])}</td>
                    <td className="py-2.5 px-2 text-center">{renderSlotCell(day.slots['1115_1245'])}</td>
                    <td className="py-2.5 px-1.5 text-center">{renderSlotCell(day.slots['1245_1400'])}</td>
                    <td className="py-2.5 px-2 text-center">{renderSlotCell(day.slots['1400_1530'])}</td>
                    <td className="py-2.5 px-2 text-center">{renderSlotCell(day.slots['1545_1715'])}</td>
                    <td className="py-2.5 px-2 text-center">{renderSlotCell(day.slots['1730_1900'])}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Exam & Quiz Reminders Section */}
      <div className="p-6 bg-white dark:bg-[#111827] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center space-x-2">
            <Bookmark className="w-5 h-5 text-amber-500" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Exams, Quizzes & Critical Academic Deadlines
            </h3>
          </div>

          <button
            onClick={() => setIsAddingReminder(!isAddingReminder)}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-bold rounded-xl bg-hsb-royal text-white hover:bg-blue-700 transition"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Reminder</span>
          </button>
        </div>

        {/* Add Reminder Form */}
        {isAddingReminder && (
          <form
            onSubmit={handleCreateReminder}
            className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3 animate-in fade-in"
          >
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. ME Quiz 2 / Capstone Presentation"
                  value={newReminderTitle}
                  onChange={(e) => setNewReminderTitle(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-white dark:bg-slate-900 border rounded-xl"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  value={newReminderDate}
                  onChange={(e) => setNewReminderDate(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-white dark:bg-slate-900 border rounded-xl font-mono"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                  Type
                </label>
                <select
                  value={newReminderType}
                  onChange={(e) => setNewReminderType(e.target.value as ExamReminder['type'])}
                  className="w-full px-3 py-1.5 text-xs bg-white dark:bg-slate-900 border rounded-xl font-semibold"
                >
                  <option value="Quiz">Quiz</option>
                  <option value="Mid-Term">Mid-Term</option>
                  <option value="End-Term">End-Term</option>
                  <option value="Presentation">Presentation</option>
                  <option value="Deadline">Deadline</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setIsAddingReminder(false)}
                className="px-3 py-1.5 text-xs font-semibold text-slate-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 text-xs font-bold rounded-xl bg-hsb-royal text-white"
              >
                Save Reminder
              </button>
            </div>
          </form>
        )}

        {/* Reminders List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {examReminders.map((rem) => (
            <div
              key={rem.id}
              className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 flex items-start justify-between gap-3"
            >
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-hsb-navy text-hsb-cyan">
                    {rem.subjectCode}
                  </span>
                  <span className="text-xs font-bold text-amber-600 dark:text-gold-400">
                    {rem.type}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    {rem.date} {rem.time && `• ${rem.time}`}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                  {rem.title}
                </h4>
                {rem.notes && (
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {rem.notes}
                  </p>
                )}
              </div>

              <button
                onClick={() => deleteExamReminder(rem.id)}
                className="p-1 text-slate-400 hover:text-rose-600 transition"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
