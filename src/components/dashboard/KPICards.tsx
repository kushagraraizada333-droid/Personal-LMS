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
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
      {/* KPI 1: Overall Attendance % */}
      <div
        onClick={() => setActiveView('attendance')}
        className="group p-4 sm:p-5 bg-white dark:bg-[#0F172A] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs hover:border-[#004B93]/50 transition cursor-pointer"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Attendance
          </span>
          <div className="p-1.5 rounded-lg bg-[#EBF3FA] dark:bg-slate-800 text-[#004B93] dark:text-[#38BDF8]">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        </div>

        <div className="flex items-baseline space-x-1.5">
          <span className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] dark:text-white tabular-nums">
            {attendanceStats.percentage}%
          </span>
        </div>

        <div className="mt-2.5 flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800/80 text-[11px]">
          <span className="text-slate-700 dark:text-slate-300 font-bold">
            {attendanceStats.totalAttended}/{attendanceStats.totalConducted} sessions
          </span>
          <ArrowUpRight className="w-3.5 h-3.5 text-slate-700 dark:text-slate-300 group-hover:text-[#004B93] transition" />
        </div>
      </div>

      {/* KPI 2: Study Materials */}
      <div
        onClick={() => setActiveView('subject')}
        className="group p-4 sm:p-5 bg-white dark:bg-[#0F172A] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs hover:border-[#004B93]/50 transition cursor-pointer"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Study Files
          </span>
          <div className="p-1.5 rounded-lg bg-[#EBF3FA] dark:bg-slate-800 text-[#004B93] dark:text-[#38BDF8]">
            <FolderArchive className="w-4 h-4" />
          </div>
        </div>

        <div className="flex items-baseline space-x-1.5">
          <span className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] dark:text-white tabular-nums">
            {files.length}
          </span>
        </div>

        <div className="mt-2.5 flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800/80 text-[11px]">
          <span className="text-slate-700 dark:text-slate-300 font-bold">Vault resources</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-slate-700 dark:text-slate-300 group-hover:text-[#004B93] transition" />
        </div>
      </div>

      {/* KPI 3: Pending Deliverables */}
      <div
        onClick={() => setActiveView('assignments')}
        className="group p-4 sm:p-5 bg-white dark:bg-[#0F172A] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs hover:border-[#004B93]/50 transition cursor-pointer"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Pending Tasks
          </span>
          <div className="p-1.5 rounded-lg bg-[#EBF3FA] dark:bg-slate-800 text-[#004B93] dark:text-[#38BDF8]">
            <CalendarClock className="w-4 h-4" />
          </div>
        </div>

        <div className="flex items-baseline space-x-1.5">
          <span className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] dark:text-white tabular-nums">
            {pendingAssignments.length}
          </span>
        </div>

        <div className="mt-2.5 flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800/80 text-[11px]">
          <span className="text-slate-700 dark:text-slate-300 font-bold">Deadlines due</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-slate-700 dark:text-slate-300 group-hover:text-[#004B93] transition" />
        </div>
      </div>

      {/* KPI 4: Academic Performance (CGPA) */}
      <div
        onClick={() => setActiveView('gradebook')}
        className="group p-4 sm:p-5 bg-white dark:bg-[#0F172A] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs hover:border-[#004B93]/50 transition cursor-pointer"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Current CGPA
          </span>
          <div className="p-1.5 rounded-lg bg-[#EBF3FA] dark:bg-slate-800 text-[#004B93] dark:text-[#38BDF8]">
            <GraduationCap className="w-4 h-4" />
          </div>
        </div>

        <div className="flex items-baseline space-x-1">
          <span className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] dark:text-white tabular-nums">
            {cgpaStats.hasEvaluations ? cgpaStats.cgpa : '—'}
          </span>
          <span className="text-xs text-slate-700 dark:text-slate-300 font-bold">/ 10.0</span>
        </div>

        <div className="mt-2.5 flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800/80 text-[11px]">
          <span className="text-slate-700 dark:text-slate-300 font-bold">
            {cgpaStats.hasEvaluations ? `${cgpaStats.overallPercentage}% weighted` : 'Gradebook'}
          </span>
          <ArrowUpRight className="w-3.5 h-3.5 text-slate-700 dark:text-slate-300 group-hover:text-[#004B93] transition" />
        </div>
      </div>
    </div>
  );
};
