import React from 'react';
import { useLMS } from '../../context/LMSContext';
import {
  FileSpreadsheet,
  Plus,
  Timer,
  Search,
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
    activeView,
    subjects,
    selectedSubjectCode,
  } = useLMS();

  const selectedSubject = subjects.find((s) => s.code === selectedSubjectCode);

  const getBreadcrumbTitle = () => {
    switch (activeView) {
      case 'dashboard':
        return 'Dashboard';
      case 'attendance':
        return 'Attendance Tracker';
      case 'timetable':
        return 'Timetable & Calendar';
      case 'subject':
        return selectedSubject
          ? `${selectedSubject.code} — ${selectedSubject.name}`
          : 'Course Workspace';
      case 'assignments':
        return 'Assignments & Deadlines';
      case 'gradebook':
        return 'Marks & Gradebook';
      default:
        return 'HSB Portal';
    }
  };

  return (
    <header className="sticky top-0 z-20 bg-white/95 dark:bg-[#0F172A]/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-6 sm:px-8 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors shadow-xs">
      {/* Left: Active View Title */}
      <div>
        <h2 className="text-lg sm:text-xl font-extrabold text-[#0F172A] dark:text-white tracking-tight">
          {getBreadcrumbTitle()}
        </h2>
      </div>

      {/* Right: Search & Actions */}
      <div className="flex items-center space-x-2.5 flex-wrap gap-y-2">
        {/* Search */}
        <div className="relative hidden md:block w-48 lg:w-56">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search portal..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-[#F4F7FA] dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#004B93] font-medium"
          />
        </div>

        {/* Sync Excel Button */}
        <button
          onClick={onOpenSyncExcel}
          className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition"
          title="Sync timetable and attendance from Excel"
        >
          <FileSpreadsheet className="w-3.5 h-3.5" />
          <span>Sync Excel</span>
        </button>

        {/* New Deliverable Button */}
        <button
          onClick={onOpenNewAssignment}
          className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#004B93] hover:bg-[#003870] text-white font-bold text-xs shadow-xs transition"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Task</span>
        </button>

        {/* Pomodoro Timer Shortcut */}
        <button
          onClick={() => setIsPomodoroModalOpen(true)}
          className="p-1.5 rounded-xl bg-[#EBF3FA] hover:bg-[#D6E6F5] dark:bg-slate-800 dark:hover:bg-slate-700 text-[#004B93] dark:text-[#38BDF8] border border-[#D6E6F5] dark:border-slate-700 transition"
          title="Pomodoro Focus Timer"
        >
          <Timer className="w-4 h-4" />
        </button>

        {/* Student Avatar */}
        <div className="flex items-center space-x-2 pl-2 border-l border-slate-200 dark:border-slate-800">
          <div className="w-8 h-8 rounded-full bg-[#004B93] text-white font-extrabold flex items-center justify-center text-xs shadow-xs">
            {student.name
              .split(' ')
              .map((n) => n[0])
              .join('')}
          </div>
        </div>
      </div>
    </header>
  );
};
