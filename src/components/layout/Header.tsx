import React from 'react';
import { useLMS } from '../../context/LMSContext';
import {
  FileSpreadsheet,
  Plus,
  Timer,
  Database,
  Search,
  Building2,
} from 'lucide-react';

interface HeaderProps {
  onOpenNewAssignment: () => void;
  onOpenSyncExcel: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenNewAssignment,
  onOpenSyncExcel,
  searchQuery,
  setSearchQuery,
}) => {
  const {
    student,
    setIsPomodoroModalOpen,
    setIsBackupModalOpen,
    activeView,
    subjects,
    selectedSubjectCode,
  } = useLMS();

  const selectedSubject = subjects.find((s) => s.code === selectedSubjectCode);

  const getBreadcrumbTitle = () => {
    switch (activeView) {
      case 'dashboard':
        return 'Executive Overview & Academic Metrics';
      case 'attendance':
        return 'Attendance Tracker (Session Forensics & Bunk Buffer)';
      case 'timetable':
        return 'Interactive Weekly Timetable (Weeks 1 to 12)';
      case 'subject':
        return selectedSubject
          ? `${selectedSubject.code}: ${selectedSubject.name}`
          : 'Subject Workspace';
      case 'assignments':
        return 'Assignments & Deliverables Hub';
      case 'gradebook':
        return 'Academic Gradebook & Trimester II Marks';
      default:
        return 'Personal Study Portal';
    }
  };

  return (
    <header className="sticky top-0 z-20 bg-white/95 dark:bg-[#0F172A]/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-6 sm:px-8 py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-3 transition-colors shadow-sm">
      {/* Left: Institution Branding & Active View Title */}
      <div>
        <div className="flex items-center space-x-2 text-xs font-semibold text-[#004B93] dark:text-[#38BDF8]">
          <Building2 className="w-4 h-4 text-[#004B93] dark:text-[#38BDF8]" />
          <span className="font-extrabold tracking-wide uppercase text-[11px]">
            {student.institution}
          </span>
          <span className="text-slate-300 dark:text-slate-700">•</span>
          <span className="text-slate-500 dark:text-slate-400 font-mono text-[11px]">
            {student.term} ({student.academicYear})
          </span>
        </div>
        <h2 className="text-base sm:text-lg font-extrabold text-[#0F172A] dark:text-white tracking-tight leading-tight mt-0.5">
          {getBreadcrumbTitle()}
        </h2>
      </div>

      {/* Right: Search, Sync Excel, Quick Actions, Student Avatar */}
      <div className="flex items-center space-x-2.5 flex-wrap gap-y-2">
        {/* Search */}
        <div className="relative hidden xl:block w-56">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search classes, topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#F4F7FA] dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#004B93] font-medium"
          />
        </div>

        {/* Sync Excel Prominent Button */}
        <button
          onClick={onOpenSyncExcel}
          className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition active:scale-95"
          title="Upload or sync your HSB timetable/attendance workbook"
        >
          <FileSpreadsheet className="w-3.5 h-3.5" />
          <span>Sync Excel (.xlsx)</span>
        </button>

        {/* New Deliverable Button */}
        <button
          onClick={onOpenNewAssignment}
          className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#004B93] hover:bg-[#003870] text-white font-bold text-xs transition shadow-sm active:scale-95"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>+ Deliverable</span>
        </button>

        {/* Pomodoro Focus Button */}
        <button
          onClick={() => setIsPomodoroModalOpen(true)}
          className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-[#EBF3FA] dark:hover:bg-slate-800 transition hover:text-[#004B93]"
          title="Launch Pomodoro Focus Timer"
        >
          <Timer className="w-4 h-4 text-[#004B93] dark:text-[#38BDF8]" />
        </button>

        {/* Backup Modal Button */}
        <button
          onClick={() => setIsBackupModalOpen(true)}
          className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-[#EBF3FA] dark:hover:bg-slate-800 transition hover:text-[#004B93]"
          title="Backup & Restore Portal Data"
        >
          <Database className="w-4 h-4 text-[#004B93] dark:text-[#38BDF8]" />
        </button>

        {/* Student Avatar & Identification Badge */}
        <div className="flex items-center space-x-2 pl-2 border-l border-slate-200 dark:border-slate-700">
          <div className="w-8 h-8 rounded-xl bg-[#004B93] text-white font-black text-xs flex items-center justify-center shadow-sm">
            KR
          </div>
          <div className="hidden lg:block text-left">
            <p className="text-xs font-extrabold text-[#0F172A] dark:text-white leading-tight">
              {student.name}
            </p>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
              {student.rollNumber} • {student.resourceId}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};
