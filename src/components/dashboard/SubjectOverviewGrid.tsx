import React from 'react';
import { useLMS } from '../../context/LMSContext';
import {
  calculateAttendanceMetrics,
  calculateSubjectProgress,
  calculateSubjectGrade,
} from '../../utils/formatters';
import {
  BookOpen,
  User,
  Users,
  CheckCircle2,
  Layers,
  ArrowRight,
  Upload,
  ShieldCheck,
  AlertTriangle,
} from 'lucide-react';

export const SubjectOverviewGrid: React.FC = () => {
  const {
    subjects,
    attendance,
    setSelectedSubjectCode,
    setActiveView,
    setActiveSubjectTab,
  } = useLMS();

  const handleOpenSubject = (
    code: string,
    tab: 'vault' | 'assignments' | 'gradebook' | 'syllabus' = 'vault'
  ) => {
    setSelectedSubjectCode(code);
    setActiveSubjectTab(tab);
    setActiveView('subject');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center space-x-2">
            <BookOpen className="w-4 h-4 text-[#004B93] dark:text-[#38BDF8]" />
            <span>Course Catalog</span>
          </h3>
        </div>
        <span className="text-xs font-mono font-bold text-slate-400">
          8 Courses • 16 Credits
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {subjects.map((subject) => {
          const subjectAtt = attendance.find((a) => a.subjectCode === subject.code);
          const attMetrics = calculateAttendanceMetrics(
            subjectAtt?.sessions || [],
            subject.plannedSessions,
            subjectAtt?.lates || 0
          );
          const progress = calculateSubjectProgress(subject.modules);
          const grade = calculateSubjectGrade(subject.evaluations);

          return (
            <div
              key={subject.code}
              className="bg-white dark:bg-[#111827] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-hsb hover:border-hsb-royal/40 transition flex flex-col justify-between overflow-hidden group"
            >
              {/* Header with Top Color Stripe */}
              <div>
                <div
                  className="h-1.5 w-full"
                  style={{ backgroundColor: subject.color || '#2563EB' }}
                />

                <div className="p-5 pb-3">
                  {/* Code, Credits & Planned Sessions */}
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-xs font-mono font-black px-2 py-0.5 rounded-lg bg-[#EBF3FA] dark:bg-slate-800 text-[#004B93] dark:text-[#38BDF8] border border-[#D6E6F5] dark:border-slate-700">
                          {subject.code}
                        </span>
                        <span className="text-xs font-extrabold text-slate-800 dark:text-slate-200">
                          {subject.credits} {subject.credits === 1 ? 'Credit' : 'Credits'}
                        </span>
                        <span className="text-[11px] text-slate-700 dark:text-slate-300 font-bold font-mono">
                          • {subject.plannedSessions} Planned Sessions
                        </span>
                      </div>
                      <h4
                        onClick={() => handleOpenSubject(subject.code)}
                        className="text-base font-extrabold text-[#0F172A] dark:text-white group-hover:text-[#004B93] dark:group-hover:text-[#38BDF8] transition cursor-pointer"
                      >
                        {subject.name}
                      </h4>
                    </div>

                    {/* Attendance Pill */}
                    <div className="text-right">
                      <span
                        className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-xl text-xs font-black tabular-nums border ${
                          attMetrics.percentage >= 80
                            ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
                            : attMetrics.percentage >= 75
                            ? 'bg-amber-50 text-amber-800 dark:bg-amber-950/60 dark:text-gold-400 border-amber-300 dark:border-amber-800'
                            : 'bg-rose-50 text-rose-800 dark:bg-rose-950/60 dark:text-rose-400 border-rose-300 dark:border-rose-800'
                        }`}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{attMetrics.percentage}%</span>
                      </span>
                    </div>
                  </div>

                  {/* Faculty & TA */}
                  <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-800 dark:text-slate-200 font-bold">
                    <span className="flex items-center space-x-1.5">
                      <User className="w-3.5 h-3.5 text-slate-700 dark:text-slate-300" />
                      <span>{subject.faculty}</span>
                    </span>
                    <span className="flex items-center space-x-1.5 text-slate-700 dark:text-slate-300">
                      <Users className="w-3.5 h-3.5 text-slate-700 dark:text-slate-300" />
                      <span>TA: {subject.ta}</span>
                    </span>
                  </div>

                  {/* Dual Metrics Bars: Attendance % and Study Progress % */}
                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2.5">
                    {/* Attendance Bar */}
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-slate-800 dark:text-slate-200 font-bold flex items-center space-x-1">
                          <CheckCircle2 className="w-3 h-3 text-[#004B93] dark:text-[#38BDF8]" />
                          <span>Attendance Progress</span>
                        </span>
                        <span className="font-extrabold text-[#0F172A] dark:text-white tabular-nums">
                          {attMetrics.attended} / {attMetrics.conducted} Conducted
                          {attMetrics.upcoming > 0 && (
                            <span className="text-slate-400 font-normal ml-1">
                              ({attMetrics.upcoming} upcoming)
                            </span>
                          )}
                        </span>
                      </div>
                      <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-700 ${
                            attMetrics.percentage >= 80 ? 'bg-emerald-500' : 'bg-amber-500'
                          }`}
                          style={{ width: `${Math.min(100, attMetrics.percentage)}%` }}
                        />
                      </div>
                    </div>

                    {/* Syllabus Progress Bar (starts at 0% / empty) */}
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-slate-500 dark:text-slate-400 font-medium flex items-center space-x-1">
                          <Layers className="w-3 h-3 text-slate-400" />
                          <span>Syllabus Covered</span>
                        </span>
                        <span className="font-bold text-slate-800 dark:text-slate-200 tabular-nums">
                          {progress.percentage}% ({progress.completed}/{progress.total} topics)
                        </span>
                      </div>
                      <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[#004B93] to-[#38BDF8] transition-all duration-700"
                          style={{ width: `${progress.percentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Card Footer: Safe Bunks & Quick Actions */}
              <div className="px-5 py-3 bg-[#F4F7FA]/70 dark:bg-slate-900/60 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                {/* Safe Bunk pill */}
                <div>
                  {attMetrics.safeBunks75 > 0 ? (
                    <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 flex items-center space-x-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Safe buffer: {attMetrics.safeBunks75} {attMetrics.safeBunks75 === 1 ? 'class' : 'classes'}</span>
                    </span>
                  ) : (
                    <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 flex items-center space-x-1">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>Buffer: 0 (Required)</span>
                    </span>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleOpenSubject(subject.code, 'vault')}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-[#004B93] dark:hover:text-[#38BDF8] hover:bg-white dark:hover:bg-slate-800 transition"
                    title="Upload Study Material (.pdf, .ppt, .docx)"
                  >
                    <Upload className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleOpenSubject(subject.code, 'vault')}
                    className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-[#EBF3FA] dark:hover:bg-slate-700 text-[#004B93] dark:text-[#38BDF8] font-bold text-xs border border-slate-200 dark:border-slate-700 transition shadow-sm"
                  >
                    <span>Workspace</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
