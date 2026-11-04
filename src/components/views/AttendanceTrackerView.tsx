import React, { useState } from 'react';
import { useLMS } from '../../context/LMSContext';
import {
  calculateAttendanceMetrics,
  calculateOverallAttendance,
} from '../../utils/formatters';
import { SessionAttendanceStatus } from '../../types';
import {
  CheckCircle2,
  XCircle,
  Clock,
  ShieldCheck,
  AlertTriangle,
  Upload,
  FileSpreadsheet,
  Calendar,
  Filter,
  Check,
} from 'lucide-react';
import { playStudyChime, playSoftTick } from '../../utils/sound';

interface AttendanceTrackerViewProps {
  onOpenSyncExcel: () => void;
}

export const AttendanceTrackerView: React.FC<AttendanceTrackerViewProps> = ({
  onOpenSyncExcel,
}) => {
  const { subjects, attendance, toggleSessionAttendance, student } = useLMS();

  const [filterCode, setFilterCode] = useState<string>('all');

  const overall = calculateOverallAttendance(attendance, subjects);

  const filteredSubjects =
    filterCode === 'all' ? subjects : subjects.filter((s) => s.code === filterCode);

  const handleCycleStatus = (
    subjectCode: string,
    sessionNum: number,
    currentStatus: SessionAttendanceStatus
  ) => {
    playSoftTick();
    let nextStatus: SessionAttendanceStatus;
    if (currentStatus === 'Present') nextStatus = 'Absent';
    else if (currentStatus === 'Absent') nextStatus = 'Upcoming';
    else nextStatus = 'Present';

    toggleSessionAttendance(
      subjectCode,
      sessionNum,
      nextStatus,
      nextStatus !== 'Upcoming'
    );
  };

  return (
    <div className="space-y-6">
      {/* Overall Attendance Forensics Banner */}
      <div className="p-6 sm:p-8 bg-gradient-to-r from-[#004B93] via-[#003870] to-[#002B5B] text-white rounded-3xl shadow-hsb-lg border border-white/10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold text-[#38BDF8] uppercase tracking-widest mb-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>Official HSB Attendance Forensics</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Session Attendance & Safe-Bunk Forensics
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-xl">
              Tracked for <span className="font-bold text-white">{student.name}</span> ({student.rollNumber}).
              Click on any session in the grid to toggle status between Present, Absent, and Upcoming.
            </p>
          </div>

          {/* Quick Metrics & Excel Upload */}
          <div className="flex items-center space-x-4 shrink-0">
            <div className="text-right p-4 rounded-2xl bg-black/30 border border-white/10 backdrop-blur-sm">
              <span className="text-[11px] font-bold uppercase tracking-wider text-hsb-cyan">
                Batch Cumulative
              </span>
              <div className="flex items-baseline space-x-1 justify-end mt-0.5">
                <span className="text-3xl font-black text-white tabular-nums">
                  {overall.percentage}%
                </span>
              </div>
              <p className="text-[10px] text-emerald-400 font-bold mt-0.5">
                {overall.totalAttended} / {overall.totalConducted} Sessions Attended
              </p>
            </div>

            <button
              onClick={onOpenSyncExcel}
              className="flex items-center space-x-2 px-4 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition active:scale-95"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Upload Attendance (.xlsx)</span>
            </button>
          </div>
        </div>

        {/* Aggregate Threshold Diagnostics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-white/10 text-xs">
          <div>
            <p className="text-slate-400 text-[11px]">Conducted Classes</p>
            <p className="text-lg font-bold text-white mt-0.5">{overall.totalConducted} Sessions</p>
          </div>
          <div>
            <p className="text-slate-400 text-[11px]">Attended</p>
            <p className="text-lg font-bold text-emerald-400 mt-0.5">{overall.totalAttended} Sessions</p>
          </div>
          <div>
            <p className="text-slate-400 text-[11px]">Absences / Missed</p>
            <p className="text-lg font-bold text-rose-400 mt-0.5">{overall.totalAbsent} Classes</p>
          </div>
          <div>
            <p className="text-slate-400 text-[11px]">Recorded Lates</p>
            <p className="text-lg font-bold text-amber-400 mt-0.5">{overall.totalLates} Instances</p>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-white dark:bg-[#111827] rounded-2xl border border-slate-200 dark:border-slate-800">
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
            Filter Subject:
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setFilterCode('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              filterCode === 'all'
                ? 'bg-hsb-navy text-hsb-cyan border border-hsb-royal'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            All 8 Subjects
          </button>
          {subjects.map((s) => (
            <button
              key={s.code}
              onClick={() => setFilterCode(s.code)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition ${
                filterCode === s.code
                  ? 'bg-hsb-navy text-hsb-cyan border border-hsb-royal'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              {s.code}
            </button>
          ))}
        </div>
      </div>

      {/* Subject-by-Subject Session Grids */}
      <div className="space-y-6">
        {filteredSubjects.map((subject) => {
          const subjectAtt = attendance.find((a) => a.subjectCode === subject.code);
          const sessions = subjectAtt?.sessions || [];
          const metrics = calculateAttendanceMetrics(
            sessions,
            subject.plannedSessions,
            subjectAtt?.lates || 0
          );

          return (
            <div
              key={subject.code}
              className="bg-white dark:bg-[#0F172A] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 space-y-5"
            >
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono font-black px-2.5 py-0.5 rounded-lg bg-[#EBF3FA] dark:bg-slate-800 text-[#004B93] dark:text-[#38BDF8] border border-[#D6E6F5] dark:border-slate-700">
                      {subject.code}
                    </span>
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                      {subject.credits} Credits • {subject.plannedSessions} Planned Sessions
                    </span>
                  </div>
                  <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                    {subject.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Faculty: <span className="font-semibold text-slate-800 dark:text-slate-200">{subject.faculty}</span> • TA: {subject.ta}
                  </p>
                </div>

                {/* Subject Attendance Metrics & Bunk Buffer */}
                <div className="flex flex-wrap items-center gap-3">
                  {/* Attendance Percentage Badge */}
                  <div className="text-right px-4 py-2 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                    <p className="text-[10px] font-bold uppercase text-slate-400">Attendance</p>
                    <p
                      className={`text-2xl font-black tabular-nums ${
                        metrics.percentage >= 80
                          ? 'text-emerald-600 dark:text-emerald-400'
                          : metrics.percentage >= 75
                          ? 'text-amber-600 dark:text-amber-400'
                          : 'text-rose-600 dark:text-rose-400'
                      }`}
                    >
                      {metrics.percentage}%
                    </p>
                    <p className="text-[10px] text-slate-500">
                      {metrics.attended} / {metrics.conducted} Conducted
                    </p>
                  </div>

                  {/* Safe Bunk Threshold Pill */}
                  <div className="px-4 py-2 rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/60 text-xs space-y-0.5">
                    <p className="text-[10px] font-bold uppercase text-hsb-royal dark:text-hsb-cyan flex items-center space-x-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Safe Bunk Forensics</span>
                    </p>
                    <p className="font-bold text-slate-900 dark:text-white">
                      Can miss: <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">{metrics.safeBunks75} classes</span> (≥ 75%)
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Can miss: <span className="text-blue-600 dark:text-blue-400 font-bold">{metrics.safeBunks80} classes</span> (≥ 80%)
                    </p>
                  </div>
                </div>
              </div>

              {/* Sessions Grid (S1 to S20) */}
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Session Log ({sessions.length} Sessions)
                  </span>
                  <span className="text-[11px] text-slate-400">
                    Click session chip to cycle: <span className="text-emerald-600 font-bold">Present</span> → <span className="text-rose-600 font-bold">Absent</span> → <span className="text-slate-400 font-bold">Upcoming</span>
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-10 gap-2">
                  {sessions.map((session) => {
                    const isPresent = session.status === 'Present';
                    const isAbsent = session.status === 'Absent';
                    const isUpcoming = session.status === 'Upcoming' || !session.isConducted;

                    return (
                      <div
                        key={session.sessionNumber}
                        onClick={() =>
                          handleCycleStatus(
                            subject.code,
                            session.sessionNumber,
                            session.status
                          )
                        }
                        className={`p-2.5 rounded-2xl border transition cursor-pointer select-none text-center group hover:scale-105 active:scale-95 shadow-xs ${
                          isPresent
                            ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                            : isAbsent
                            ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-900 text-rose-900 dark:text-rose-200'
                            : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700/60 text-slate-400 dark:text-slate-500'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-mono font-black">
                            {session.label}
                          </span>
                          {isPresent && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                          {isAbsent && <XCircle className="w-3.5 h-3.5 text-rose-600" />}
                          {isUpcoming && <Clock className="w-3.5 h-3.5 text-slate-400" />}
                        </div>

                        <p className="text-[10px] font-mono truncate text-slate-600 dark:text-slate-300">
                          {session.date ? session.date.slice(5) : 'Scheduled'}
                        </p>

                        <div className="mt-1 pt-1 border-t border-black/5 dark:border-white/5">
                          <span
                            className={`text-[9px] font-black uppercase tracking-wider block ${
                              isPresent
                                ? 'text-emerald-700 dark:text-emerald-400'
                                : isAbsent
                                ? 'text-rose-700 dark:text-rose-400'
                                : 'text-slate-400'
                            }`}
                          >
                            {session.status}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
