import React from 'react';
import { useLMS } from '../../context/LMSContext';
import {
  calculateOverallAttendance,
  calculateOverallCGPA,
} from '../../utils/formatters';
import {
  CheckCircle2,
  FolderArchive,
  CalendarClock,
  GraduationCap,
  ArrowUpRight,
  ShieldCheck,
  Plus,
} from 'lucide-react';

export const KPICards: React.FC = () => {
  const {
    subjects,
    attendance,
    files,
    assignments,
    setActiveView,
  } = useLMS();

  const attendanceStats = calculateOverallAttendance(attendance, subjects);
  const cgpaStats = calculateOverallCGPA(subjects);
  const pendingAssignments = assignments.filter((a) => a.status !== 'Submitted');

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* KPI 1: Overall Attendance % */}
      <div
        onClick={() => setActiveView('attendance')}
        className="group relative p-5 bg-white dark:bg-[#0F172A] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-[#004B93]/50 transition cursor-pointer"
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Overall Attendance
          </span>
          <div className="p-2 rounded-xl bg-[#EBF3FA] dark:bg-slate-800 text-[#004B93] dark:text-[#38BDF8] group-hover:scale-110 transition">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        <div className="flex items-baseline space-x-2">
          <span className="text-3xl font-extrabold text-[#0F172A] dark:text-white tabular-nums">
            {attendanceStats.percentage}%
          </span>
          <span className="text-xs font-semibold text-slate-500">
            ({attendanceStats.totalAttended}/{attendanceStats.totalConducted} classes)
          </span>
        </div>

        {/* Progress Bar */}
        <div className="mt-3 w-full bg-[#EBF3FA] dark:bg-slate-800 rounded-full h-2 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-700 ${
              attendanceStats.percentage >= 80
                ? 'bg-emerald-500'
                : attendanceStats.percentage >= 75
                ? 'bg-amber-500'
                : 'bg-rose-500'
            }`}
            style={{ width: `${Math.min(100, attendanceStats.percentage)}%` }}
          />
        </div>

        <div className="mt-2.5 flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
          <span
            className={`font-bold text-[11px] flex items-center space-x-1 ${
              attendanceStats.percentage >= 80
                ? 'text-emerald-600 dark:text-emerald-400'
                : attendanceStats.percentage >= 75
                ? 'text-amber-600 dark:text-amber-400'
                : 'text-rose-600 dark:text-rose-400'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>
              {attendanceStats.percentage >= 80
                ? 'Safe Zone (≥ 80%)'
                : attendanceStats.percentage >= 75
                ? 'Warning Zone (75-80%)'
                : 'Critical (< 75%)'}
            </span>
          </span>
          <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#004B93] transition" />
        </div>
      </div>

      {/* KPI 2: Uploaded Study Files (Starts at 0 / Empty State) */}
      <div
        onClick={() => setActiveView('subject')}
        className="group relative p-5 bg-white dark:bg-[#0F172A] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-[#004B93]/50 transition cursor-pointer"
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Study Files in Vault
          </span>
          <div className="p-2 rounded-xl bg-[#EBF3FA] dark:bg-slate-800 text-[#004B93] dark:text-[#38BDF8] group-hover:scale-110 transition">
            <FolderArchive className="w-5 h-5" />
          </div>
        </div>

        <div className="flex items-baseline space-x-2">
          <span className="text-3xl font-extrabold text-[#0F172A] dark:text-white tabular-nums">
            {files.length}
          </span>
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            Local Blobs
          </span>
        </div>

        <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
          {files.length === 0 ? (
            <span className="text-slate-400 text-[11px]">0 uploaded — Drag & Drop in Vault</span>
          ) : (
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold text-[11px]">
              Stored offline in IndexedDB
            </span>
          )}
          <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#004B93] transition" />
        </div>
      </div>

      {/* KPI 3: Pending Deadlines (Starts at 0 / Empty State) */}
      <div
        onClick={() => setActiveView('assignments')}
        className="group relative p-5 bg-white dark:bg-[#0F172A] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-[#004B93]/50 transition cursor-pointer"
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Pending Deliverables
          </span>
          <div className="p-2 rounded-xl bg-[#EBF3FA] dark:bg-slate-800 text-[#004B93] dark:text-[#38BDF8] group-hover:scale-110 transition">
            <CalendarClock className="w-5 h-5" />
          </div>
        </div>

        <div className="flex items-baseline space-x-2">
          <span className="text-3xl font-extrabold text-[#0F172A] dark:text-white tabular-nums">
            {pendingAssignments.length}
          </span>
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            Submissions Due
          </span>
        </div>

        <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
          {pendingAssignments.length === 0 ? (
            <span className="text-slate-400 text-[11px]">0 pending — Click to add deliverable</span>
          ) : (
            <span className="text-amber-600 dark:text-amber-400 font-bold text-[11px]">
              {pendingAssignments.length} deliverable(s) in progress
            </span>
          )}
          <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#004B93] transition" />
        </div>
      </div>

      {/* KPI 4: Weighted Marks Summary (Starts at 0 / Empty State) */}
      <div
        onClick={() => setActiveView('gradebook')}
        className="group relative p-5 bg-white dark:bg-[#0F172A] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-[#004B93]/50 transition cursor-pointer"
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Academic Performance
          </span>
          <div className="p-2 rounded-xl bg-[#EBF3FA] dark:bg-slate-800 text-[#004B93] dark:text-[#38BDF8] group-hover:scale-110 transition">
            <GraduationCap className="w-5 h-5" />
          </div>
        </div>

        <div className="flex items-baseline space-x-2">
          {cgpaStats.hasEvaluations ? (
            <>
              <span className="text-3xl font-extrabold text-[#0F172A] dark:text-white tabular-nums">
                {cgpaStats.cgpa}
              </span>
              <span className="text-xs font-semibold text-slate-400">/ 10.0 GPA</span>
            </>
          ) : (
            <>
              <span className="text-3xl font-extrabold text-slate-400 dark:text-slate-500 tabular-nums">
                0.0
              </span>
              <span className="text-xs font-semibold text-slate-400">No marks entered</span>
            </>
          )}
        </div>

        <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
          {cgpaStats.hasEvaluations ? (
            <span className="text-emerald-600 dark:text-emerald-400 font-bold text-[11px]">
              {cgpaStats.evaluatedCredits} Credits Evaluated ({cgpaStats.overallPercentage}%)
            </span>
          ) : (
            <span className="text-[#004B93] dark:text-[#38BDF8] font-bold text-[11px] flex items-center space-x-1">
              <Plus className="w-3 h-3" />
              <span>Enter marks or upload sheet</span>
            </span>
          )}
          <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#004B93] transition" />
        </div>
      </div>
    </div>
  );
};
