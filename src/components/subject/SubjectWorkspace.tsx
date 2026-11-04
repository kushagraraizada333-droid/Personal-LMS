import React from 'react';
import { useLMS } from '../../context/LMSContext';
import {
  calculateAttendanceMetrics,
  calculateSubjectProgress,
  calculateSubjectGrade,
} from '../../utils/formatters';
import { TabStudyVault } from './TabStudyVault';
import { TabAssignments } from './TabAssignments';
import { TabGradebook } from './TabGradebook';
import { TabSyllabus } from './TabSyllabus';
import {
  FolderArchive,
  FileCheck2,
  GraduationCap,
  Layers,
  User,
  Users,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';

interface SubjectWorkspaceProps {
  onOpenNewAssignment: () => void;
}

export const SubjectWorkspace: React.FC<SubjectWorkspaceProps> = ({
  onOpenNewAssignment,
}) => {
  const {
    subjects,
    selectedSubjectCode,
    setSelectedSubjectCode,
    activeSubjectTab,
    setActiveSubjectTab,
    setActiveView,
    attendance,
  } = useLMS();

  const currentSubject =
    subjects.find((s) => s.code === selectedSubjectCode) || subjects[0];

  if (!currentSubject) return null;

  const subjectAtt = attendance.find((a) => a.subjectCode === currentSubject.code);
  const attMetrics = calculateAttendanceMetrics(
    subjectAtt?.sessions || [],
    currentSubject.plannedSessions,
    subjectAtt?.lates || 0
  );
  const progressStats = calculateSubjectProgress(currentSubject.modules);
  const gradeStats = calculateSubjectGrade(currentSubject.evaluations);

  const tabs: {
    id: 'vault' | 'assignments' | 'gradebook' | 'syllabus';
    label: string;
    icon: React.FC<{ className?: string }>;
  }[] = [
    { id: 'vault', label: 'Tab A — Study Material Vault', icon: FolderArchive },
    { id: 'assignments', label: 'Tab B — Assignments & Deadlines', icon: FileCheck2 },
    { id: 'gradebook', label: 'Tab C — Marks & Gradebook', icon: GraduationCap },
    { id: 'syllabus', label: 'Tab D — Study Progress & Syllabus', icon: Layers },
  ];

  return (
    <div className="space-y-6">
      {/* Back to Dashboard Navigation & Course Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <button
          onClick={() => setActiveView('dashboard')}
          className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-500 hover:text-hsb-royal dark:hover:text-hsb-cyan transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Executive Dashboard</span>
        </button>

        {/* Course Switcher */}
        <div className="flex items-center space-x-2">
          <span className="text-xs font-semibold text-slate-400 hidden sm:inline">
            Switch Course:
          </span>
          <select
            value={currentSubject.code}
            onChange={(e) => setSelectedSubjectCode(e.target.value)}
            className="px-3.5 py-1.5 text-xs font-mono font-bold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white shadow-xs focus:ring-2 focus:ring-hsb-royal"
          >
            {subjects.map((s) => (
              <option key={s.code} value={s.code}>
                {s.code} • {s.name} ({s.credits}c)
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Course Executive Header Card */}
      <div className="relative p-6 sm:p-7 bg-white dark:bg-[#111827] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        {/* Color stripe */}
        <div
          className="absolute top-0 left-0 right-0 h-1.5"
          style={{ backgroundColor: currentSubject.color || '#2563EB' }}
        />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          {/* Details */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono font-black px-2.5 py-0.5 rounded-lg bg-[#EBF3FA] dark:bg-slate-800 text-[#004B93] dark:text-[#38BDF8] border border-[#D6E6F5] dark:border-slate-700">
                {currentSubject.code}
              </span>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                {currentSubject.term} • {currentSubject.credits} Credit Units • {currentSubject.plannedSessions} Planned Sessions
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {currentSubject.name}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 dark:text-slate-300">
              <span className="flex items-center space-x-1.5 font-medium">
                <User className="w-3.5 h-3.5 text-slate-400" />
                <span>Faculty: {currentSubject.faculty}</span>
              </span>
              <span className="flex items-center space-x-1.5 text-slate-400 font-medium">
                <Users className="w-3.5 h-3.5 text-slate-400" />
                <span>Teaching Assistant: {currentSubject.ta}</span>
              </span>
            </div>
          </div>

          {/* Right Metrics: Attendance & Syllabus */}
          <div className="flex items-center space-x-4 border-t lg:border-t-0 lg:border-l border-slate-100 dark:border-slate-800 pt-4 lg:pt-0 lg:pl-6 shrink-0">
            {/* Attendance pill */}
            <div className="text-center sm:text-right">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Attendance
              </span>
              <div className="text-2xl font-black text-slate-900 dark:text-white tabular-nums">
                {attMetrics.percentage}%
              </div>
              <p className="text-[10px] text-slate-500">
                {attMetrics.attended}/{attMetrics.conducted} Conducted
              </p>
            </div>

            {/* Syllabus progress */}
            <div className="text-center sm:text-right">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Syllabus
              </span>
              <div className="text-2xl font-black text-slate-900 dark:text-white tabular-nums">
                {progressStats.percentage}%
              </div>
              <p className="text-[10px] text-slate-500">
                {progressStats.completed}/{progressStats.total} Topics
              </p>
            </div>

            {/* Grade summary */}
            <div className="text-center sm:text-right">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Score
              </span>
              <div className="text-2xl font-black text-[#004B93] dark:text-[#38BDF8] tabular-nums">
                {gradeStats.percentage > 0 ? `${gradeStats.percentage}%` : '—'}
              </div>
              <p className="text-[10px] text-slate-500">
                {gradeStats.totalCompletedWeight}% Evaluated
              </p>
            </div>
          </div>
        </div>

        {/* 4 Tabs Bar */}
        <div className="flex space-x-1.5 overflow-x-auto mt-6 pt-2 border-t border-slate-100 dark:border-slate-800">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSubjectTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubjectTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[#004B93] text-white shadow-sm'
                    : 'text-[#334155] dark:text-slate-400 hover:text-[#004B93] hover:bg-[#EBF3FA] dark:hover:bg-slate-800'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content Rendering */}
      <div>
        {activeSubjectTab === 'vault' && <TabStudyVault subject={currentSubject} />}
        {activeSubjectTab === 'assignments' && (
          <TabAssignments
            subject={currentSubject}
            onOpenNewAssignment={onOpenNewAssignment}
          />
        )}
        {activeSubjectTab === 'gradebook' && <TabGradebook subject={currentSubject} />}
        {activeSubjectTab === 'syllabus' && <TabSyllabus subject={currentSubject} />}
      </div>
    </div>
  );
};
