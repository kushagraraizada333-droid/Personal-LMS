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
  FileSpreadsheet,
  Filter,
  Users,
  User,
  RotateCcw,
  Search,
  Sparkles,
  Download,
} from 'lucide-react';
import { playStudyChime, playSoftTick } from '../../utils/sound';
import { BATCH_ATTENDANCE_ROSTER } from '../../db/batchRosterData';
import { AttendanceSimulator } from '../simulation/AttendanceSimulator';
import { Sliders } from 'lucide-react';

interface AttendanceTrackerViewProps {
  onOpenSyncExcel: () => void;
}

export const AttendanceTrackerView: React.FC<AttendanceTrackerViewProps> = ({
  onOpenSyncExcel,
}) => {
  const { subjects, attendance, toggleSessionAttendance, student, reloadOfficialAttendance } =
    useLMS();

  const [activeTab, setActiveTab] = useState<'personal' | 'batch'>('personal');
  const [isSimulatorOpen, setIsSimulatorOpen] = useState<boolean>(false);
  const [filterCode, setFilterCode] = useState<string>('all');
  const [batchSearch, setBatchSearch] = useState<string>('');

  const overall = calculateOverallAttendance(attendance, subjects);

  const filteredSubjects =
    filterCode === 'all' ? subjects : subjects.filter((s) => s.code === filterCode);

  const filteredBatch = BATCH_ATTENDANCE_ROSTER.filter((st) => {
    const q = batchSearch.toLowerCase().trim();
    if (!q) return true;
    return (
      st.name.toLowerCase().includes(q) ||
      st.rollNumber.toLowerCase().includes(q) ||
      st.resourceId.toLowerCase().includes(q)
    );
  });

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

  const handleForceReload = async () => {
    await reloadOfficialAttendance();
  };

  return (
    <div className="space-y-6">
      {/* Cached partial attendance detector banner */}
      {overall.totalConducted < 57 && (
        <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center space-x-2.5 text-xs">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
            <div>
              <span className="font-extrabold block">Notice: Showing older cached session records ({overall.totalConducted} sessions).</span>
              <span className="text-amber-800 dark:text-amber-300">The updated Term-II workbook contains 57 conducted sessions (89.5% attendance). Click to update immediately.</span>
            </div>
          </div>
          <button
            onClick={handleForceReload}
            className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs transition shadow-sm shrink-0 flex items-center space-x-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Load Updated Official Attendance (89.5%)</span>
          </button>
        </div>
      )}

      {/* Primary Header Banner */}
      <div className="p-5 sm:p-6 bg-gradient-to-r from-[#004B93] via-[#003870] to-[#002B5B] text-white rounded-3xl shadow-sm border border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-[10px] font-mono uppercase font-black px-2 py-0.5 rounded-md bg-white/20 text-white">
                HSB Term-II · Batch 2026–28
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
              Attendance Intelligence Tracker
            </h2>
            <p className="text-xs text-slate-300 mt-0.5">
              Official HSB records for {student.name} ({student.rollNumber})
            </p>
          </div>

          {/* Quick Metrics & Actions */}
          <div className="flex items-center space-x-2.5 shrink-0 flex-wrap">
            <div className="text-right px-3.5 py-2 rounded-2xl bg-black/25 border border-white/10 backdrop-blur-md">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-300 block">
                Overall Rate
              </span>
              <span className="text-2xl font-black text-white tabular-nums">
                {overall.percentage}%
              </span>
            </div>

            <button
              onClick={() => {
                setIsSimulatorOpen(!isSimulatorOpen);
                playSoftTick();
              }}
              className={`flex items-center space-x-1.5 px-3.5 py-2.5 rounded-2xl font-bold text-xs transition border ${
                isSimulatorOpen
                  ? 'bg-indigo-600 text-white border-indigo-400 shadow-md ring-2 ring-indigo-400/40'
                  : 'bg-white/15 hover:bg-white/25 text-white border-white/20'
              }`}
            >
              <Sliders className="w-4 h-4 text-indigo-200" />
              <span>Simulator Mode</span>
            </button>

            <button
              onClick={handleForceReload}
              title="Force reload latest official attendance"
              className="p-2.5 rounded-2xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold transition border border-white/20"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenSyncExcel}
              className="flex items-center space-x-1.5 px-3.5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm transition"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Sync Excel</span>
            </button>
          </div>
        </div>

        {/* Aggregate Threshold Diagnostics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-white/10 text-xs">
          <div>
            <p className="text-slate-400 text-[10px] uppercase font-bold">Conducted</p>
            <p className="text-base font-black text-white">{overall.totalConducted} Sessions</p>
          </div>
          <div>
            <p className="text-slate-400 text-[10px] uppercase font-bold">Attended</p>
            <p className="text-base font-black text-emerald-400">{overall.totalAttended} Sessions</p>
          </div>
          <div>
            <p className="text-slate-400 text-[10px] uppercase font-bold">Absences</p>
            <p className="text-base font-black text-rose-300">{overall.totalAbsent} Missed</p>
          </div>
          <div>
            <p className="text-slate-400 text-[10px] uppercase font-bold">Status Zone</p>
            <p className="text-base font-black text-amber-300">
              {overall.percentage >= 80 ? 'Safe Zone (≥ 80%)' : 'Caution Zone'}
            </p>
          </div>
        </div>
      </div>

      {/* Simulator Mode Panel */}
      {isSimulatorOpen && <AttendanceSimulator />}

      {/* Main Tabs: My Attendance vs. Batch Roster (All 39 Students) */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setActiveTab('personal')}
            className={`flex items-center space-x-2 px-4 py-3 text-xs font-extrabold border-b-2 transition ${
              activeTab === 'personal'
                ? 'border-[#004B93] text-[#004B93] dark:text-[#38BDF8] dark:border-[#38BDF8]'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <User className="w-4 h-4" />
            <span>My Attendance ({student.name})</span>
            <span className="px-2 py-0.5 rounded-full bg-[#EBF3FA] dark:bg-slate-800 text-[#004B93] dark:text-[#38BDF8] text-[10px] font-mono font-black">
              {overall.percentage}%
            </span>
          </button>

          <button
            onClick={() => setActiveTab('batch')}
            className={`flex items-center space-x-2 px-4 py-3 text-xs font-extrabold border-b-2 transition ${
              activeTab === 'batch'
                ? 'border-[#004B93] text-[#004B93] dark:text-[#38BDF8] dark:border-[#38BDF8]'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Batch Roster (All 39 Students)</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-[10px] font-mono font-black">
              39 Enrolled
            </span>
          </button>
        </div>
      </div>

      {/* VIEW A: PERSONAL ATTENDANCE (SESSION BY SESSION) */}
      {activeTab === 'personal' && (
        <div className="space-y-6">
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
                    ? 'bg-[#004B93] text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:text-[#004B93]'
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
                      ? 'bg-[#004B93] text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:text-[#004B93]'
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
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                          {subject.credits} Credits • {subject.plannedSessions} Planned Sessions
                        </span>
                      </div>
                      <h3 className="text-lg font-extrabold text-[#0F172A] dark:text-white">
                        {subject.name}
                      </h3>
                      <p className="text-xs text-slate-700 dark:text-slate-300 font-semibold">
                        Faculty: <span className="font-extrabold text-[#0F172A] dark:text-white">{subject.faculty}</span> • TA: {subject.ta}
                      </p>
                    </div>

                    {/* Subject Attendance Metrics & Bunk Buffer */}
                    <div className="flex flex-wrap items-center gap-3">
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
                          {metrics.attended}/{metrics.conducted} Conducted
                        </p>
                      </div>

                      <div className="text-right px-4 py-2 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                        <p className="text-[10px] font-bold uppercase text-slate-400">Safe Bunks (≥80%)</p>
                        <p className="text-2xl font-black text-[#004B93] dark:text-[#38BDF8] tabular-nums">
                          {metrics.safeBunks80}
                        </p>
                        <p className="text-[10px] text-slate-500 font-medium">buffer remaining</p>
                      </div>
                    </div>
                  </div>

                  {/* Sessions Grid */}
                  <div>
                    <h4 className="text-xs font-extrabold text-slate-800 dark:text-slate-200 mb-3 flex items-center justify-between">
                      <span>Interactive Session Checkpoints:</span>
                      <span className="text-[10px] font-normal text-slate-500">Click any card to toggle status</span>
                    </h4>

                    {sessions.length === 0 ? (
                      <p className="text-xs text-slate-400 italic py-4">
                        No sessions recorded yet. Upcoming sessions will appear automatically.
                      </p>
                    ) : (
                      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-10 gap-2">
                        {sessions.map((session) => {
                          const isPresent = session.isConducted && session.status === 'Present';
                          const isAbsent = session.isConducted && session.status === 'Absent';
                          const isUpcoming = !session.isConducted;

                          return (
                            <div
                              key={session.sessionNumber}
                              onClick={() =>
                                handleCycleStatus(subject.code, session.sessionNumber, session.status)
                              }
                              className={`p-2.5 rounded-2xl border cursor-pointer select-none transition-all hover:scale-105 ${
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
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW B: BATCH ROSTER (ALL 39 STUDENTS FROM HSB EXCEL WORKBOOK) */}
      {activeTab === 'batch' && (
        <div className="space-y-4">
          {/* Top Search & Filter */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-white dark:bg-[#111827] rounded-2xl border border-slate-200 dark:border-slate-800">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={batchSearch}
                onChange={(e) => setBatchSearch(e.target.value)}
                placeholder="Search student by name, roll number (e.g. 018), or resource ID..."
                className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#004B93]"
              />
            </div>
            <div className="text-xs text-slate-500 font-bold">
              Showing {filteredBatch.length} of {BATCH_ATTENDANCE_ROSTER.length} Students
            </div>
          </div>

          {/* Full Table */}
          <div className="bg-white dark:bg-[#0F172A] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-black uppercase text-[10px] tracking-wider">
                    <th className="py-3.5 px-4">Roll Number</th>
                    <th className="py-3.5 px-4">Student Name</th>
                    <th className="py-3.5 px-3 text-center">IET</th>
                    <th className="py-3.5 px-3 text-center">MRM</th>
                    <th className="py-3.5 px-3 text-center">ME</th>
                    <th className="py-3.5 px-3 text-center">PM2</th>
                    <th className="py-3.5 px-3 text-center">LA</th>
                    <th className="py-3.5 px-4 text-center">Attended / Total</th>
                    <th className="py-3.5 px-4 text-right">Overall %</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                  {filteredBatch.map((st) => {
                    const isYou = st.rollNumber === student.rollNumber;
                    return (
                      <tr
                        key={st.rollNumber}
                        className={`transition ${
                          isYou
                            ? 'bg-[#EBF3FA] dark:bg-slate-800/90 font-bold border-l-4 border-[#004B93]'
                            : 'hover:bg-slate-50 dark:hover:bg-slate-800/40 text-slate-800 dark:text-slate-200'
                        }`}
                      >
                        <td className="py-3 px-4 font-mono font-black text-slate-900 dark:text-white">
                          <div className="flex items-center space-x-1.5">
                            <span>{st.rollNumber}</span>
                            {isYou && (
                              <span className="px-1.5 py-0.5 rounded text-[9px] font-black uppercase bg-[#004B93] text-white">
                                You
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <p className="font-bold text-slate-900 dark:text-white">{st.name}</p>
                          <p className="text-[10px] text-slate-400 font-mono">{st.resourceId}</p>
                        </td>
                        <td className="py-3 px-3 text-center font-mono font-bold">
                          <span
                            className={
                              (st.subjects.IET?.percentage ?? 0) >= 80
                                ? 'text-emerald-600 dark:text-emerald-400'
                                : 'text-rose-600 dark:text-rose-400'
                            }
                          >
                            {st.subjects.IET?.percentage ?? 0}%
                          </span>
                        </td>
                        <td className="py-3 px-3 text-center font-mono font-bold">
                          <span
                            className={
                              (st.subjects.MRM?.percentage ?? 0) >= 80
                                ? 'text-emerald-600 dark:text-emerald-400'
                                : 'text-rose-600 dark:text-rose-400'
                            }
                          >
                            {st.subjects.MRM?.percentage ?? 0}%
                          </span>
                        </td>
                        <td className="py-3 px-3 text-center font-mono font-bold">
                          <span
                            className={
                              (st.subjects.ME?.percentage ?? 0) >= 80
                                ? 'text-emerald-600 dark:text-emerald-400'
                                : 'text-rose-600 dark:text-rose-400'
                            }
                          >
                            {st.subjects.ME?.percentage ?? 0}%
                          </span>
                        </td>
                        <td className="py-3 px-3 text-center font-mono font-bold">
                          <span
                            className={
                              (st.subjects.PM2?.percentage ?? 0) >= 80
                                ? 'text-emerald-600 dark:text-emerald-400'
                                : 'text-rose-600 dark:text-rose-400'
                            }
                          >
                            {st.subjects.PM2?.percentage ?? 0}%
                          </span>
                        </td>
                        <td className="py-3 px-3 text-center font-mono font-bold">
                          <span
                            className={
                              (st.subjects.LA?.percentage ?? 0) >= 80
                                ? 'text-emerald-600 dark:text-emerald-400'
                                : 'text-amber-600 dark:text-amber-400'
                            }
                          >
                            {st.subjects.LA?.percentage ?? 0}%
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center font-mono text-slate-600 dark:text-slate-300">
                          {st.totalAttended} / {st.totalConducted}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <span
                            className={`inline-block px-2.5 py-1 rounded-xl text-xs font-black tabular-nums ${
                              st.overallPercentage >= 80
                                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                                : st.overallPercentage >= 75
                                ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                                : 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
                            }`}
                          >
                            {st.overallPercentage}%
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
