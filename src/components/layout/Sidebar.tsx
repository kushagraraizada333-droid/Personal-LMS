import React, { useState } from 'react';
import { useLMS } from '../../context/LMSContext';
import { ActiveNavView } from '../../types';
import { HSBLogo } from '../common/HSBLogo';
import {
  LayoutDashboard,
  CheckCircle2,
  CalendarDays,
  BookOpen,
  FileCheck2,
  GraduationCap,
  FileSpreadsheet,
  Database,
  Moon,
  Sun,
  ChevronRight,
  HardDrive,
  Trash2,
  RotateCcw,
} from 'lucide-react';
import { formatFileSize } from '../../utils/formatters';

interface SidebarProps {
  onOpenSyncExcel: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onOpenSyncExcel }) => {
  const {
    activeView,
    setActiveView,
    subjects,
    selectedSubjectCode,
    setSelectedSubjectCode,
    isDarkMode,
    toggleDarkMode,
    setIsBackupModalOpen,
    storageUsage,
    student,
    clearAllData,
    resetToInitialRoster,
  } = useLMS();

  const [isSubjectsExpanded, setIsSubjectsExpanded] = useState(true);

  const navItems: { id: ActiveNavView; label: string; icon: React.FC<{ className?: string }>; badge?: string }[] = [
    { id: 'dashboard', label: 'Executive Dashboard', icon: LayoutDashboard },
    { id: 'attendance', label: 'Attendance Tracker', icon: CheckCircle2 },
    { id: 'timetable', label: 'Timetable & Calendar', icon: CalendarDays },
    { id: 'subject', label: 'Subject Workspace', icon: BookOpen },
    { id: 'assignments', label: 'Assignments & Deadlines', icon: FileCheck2 },
    { id: 'gradebook', label: 'Marks & Gradebook', icon: GraduationCap },
  ];

  return (
    <aside className="w-72 shrink-0 h-screen sticky top-0 bg-white dark:bg-[#0F172A] text-slate-800 dark:text-slate-100 flex flex-col justify-between border-r border-slate-200 dark:border-slate-800 shadow-sm z-30 select-none transition-colors">
      {/* Top Brand Header & Student Profile Snapshot */}
      <div className="flex flex-col flex-1 overflow-y-auto">
        {/* Brand Banner with Exact HSB Logo */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-[#F4F7FA]/70 dark:bg-[#0B1426]/70">
          <div className="flex items-center space-x-3">
            {/* HSB Logo container: Crisp White Rounded Container */}
            <HSBLogo size="md" allowUpload={true} />

            <div className="overflow-hidden min-w-0">
              <div className="flex items-center space-x-1.5">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#004B93] dark:text-[#38BDF8]">
                  HSB JAIPUR
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span className="text-[10px] text-slate-400 font-mono">Offline LMS</span>
              </div>
              <h1 className="text-xs font-extrabold text-[#0F172A] dark:text-white tracking-tight truncate leading-tight">
                Harishankar Singhania
              </h1>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium truncate">
                School of Business • Study Portal
              </p>
            </div>
          </div>

          {/* Student Profile Card Header */}
          <div className="mt-3 p-3 rounded-2xl bg-[#EBF3FA] dark:bg-slate-800/80 border border-[#D6E6F5] dark:border-slate-700/80 text-xs space-y-1">
            <div className="flex items-center justify-between">
              <p className="font-extrabold text-[#0F172A] dark:text-white text-xs tracking-tight truncate">
                {student.name}
              </p>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#004B93] text-white">
                {student.rollNumber}
              </span>
            </div>
            <p className="text-[11px] text-[#334155] dark:text-slate-300 font-medium truncate">
              {student.program}
            </p>
            <div className="flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 font-mono pt-1 border-t border-[#D6E6F5] dark:border-slate-700">
              <span className="font-semibold text-[#004B93] dark:text-[#38BDF8]">{student.term}</span>
              <span>{student.resourceId}</span>
            </div>
          </div>
        </div>

        {/* Sync Excel Prominent Button */}
        <div className="p-3">
          <button
            onClick={onOpenSyncExcel}
            className="w-full flex items-center justify-center space-x-2 px-3.5 py-2.5 rounded-xl bg-[#004B93] hover:bg-[#003870] text-white font-bold text-xs shadow-sm transition active:scale-98"
            title="Parse & Sync Tentative_Timetable_TermII_Batch2026-28.xlsx"
          >
            <FileSpreadsheet className="w-4 h-4 text-white" />
            <span>Sync HSB Excel (.xlsx)</span>
          </button>
        </div>

        {/* 6 Primary Navigation Views */}
        <div className="px-3 py-1 space-y-1">
          <p className="px-3 text-[10px] font-extrabold uppercase tracking-widest text-slate-700 dark:text-slate-300 mb-1.5">
            Academic Management
          </p>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-[#004B93] text-white shadow-sm shadow-[#004B93]/20'
                    : 'text-[#0F172A] dark:text-slate-100 hover:text-[#004B93] dark:hover:text-white hover:bg-[#EBF3FA] dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#004B93] dark:text-[#38BDF8]'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${isActive ? 'bg-white/20 text-white' : 'bg-[#EBF3FA] text-[#004B93]'}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Trimester II Course Catalog (8 Subjects) */}
        <div className="px-3 py-3">
          <div className="flex items-center justify-between px-3 mb-1.5">
            <button
              onClick={() => setIsSubjectsExpanded(!isSubjectsExpanded)}
              className="flex items-center space-x-1.5 text-[10px] font-extrabold uppercase tracking-widest text-slate-700 dark:text-slate-300 hover:text-[#004B93] dark:hover:text-white transition"
            >
              <ChevronRight
                className={`w-3 h-3 transition-transform ${isSubjectsExpanded ? 'rotate-90' : ''}`}
              />
              <span>Trimester II Courses ({subjects.length})</span>
            </button>
            <span className="text-[10px] font-mono text-slate-700 dark:text-slate-300 font-extrabold">16 Credits</span>
          </div>

          {isSubjectsExpanded && (
            <div className="space-y-1 mt-1">
              {subjects.map((s) => {
                const isSelected = activeView === 'subject' && selectedSubjectCode === s.code;
                return (
                  <button
                    key={s.code}
                    onClick={() => {
                      setSelectedSubjectCode(s.code);
                      setActiveView('subject');
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition text-left group ${
                      isSelected
                        ? 'bg-[#EBF3FA] dark:bg-slate-800 text-[#004B93] dark:text-white border-l-4 border-[#004B93]'
                        : 'text-[#334155] dark:text-slate-300 hover:text-[#004B93] dark:hover:text-white hover:bg-[#F4F7FA] dark:hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="flex items-center space-x-2 truncate">
                      <span
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{ backgroundColor: s.color || '#004B93' }}
                      />
                      <span className="font-extrabold font-mono text-[#004B93] dark:text-[#38BDF8] text-[11px] shrink-0">
                        {s.code}
                      </span>
                      <span className="truncate text-slate-700 dark:text-slate-200 group-hover:text-[#004B93] dark:group-hover:text-white">
                        {s.name}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 shrink-0 ml-1">
                      {s.credits}c
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Sticky Footer: Storage stats, Backup & Reset */}
      <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-[#F4F7FA]/70 dark:bg-[#0B1426]/70 space-y-2">
        {/* Storage footprint */}
        <div className="px-2 py-1 space-y-1">
          <div className="flex items-center justify-between text-[11px] text-[#334155] dark:text-slate-300">
            <span className="flex items-center space-x-1 text-slate-500 dark:text-slate-400">
              <HardDrive className="w-3.5 h-3.5 text-[#004B93] dark:text-[#38BDF8]" />
              <span>Offline Vault:</span>
            </span>
            <span className="font-mono text-[#004B93] dark:text-[#38BDF8] font-bold">
              {formatFileSize(storageUsage.totalBytes)} ({storageUsage.fileCount} {storageUsage.fileCount === 1 ? 'file' : 'files'})
            </span>
          </div>
          {storageUsage.quotaBytes && (
            <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium">
              <span>IndexedDB Quota:</span>
              <span className="font-mono">~{formatFileSize(storageUsage.quotaBytes)}</span>
            </div>
          )}
        </div>

        {/* Action Buttons: Backup & Sync + Dark Mode Toggle */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={() => setIsBackupModalOpen(true)}
            className="flex items-center justify-center space-x-1.5 py-2 px-2.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-[#EBF3FA] dark:hover:bg-slate-700 text-[#0F172A] dark:text-slate-200 text-xs font-bold border border-slate-200 dark:border-slate-700 transition shadow-sm"
            title="Backup & Restore JSON Data"
          >
            <Database className="w-3.5 h-3.5 text-[#004B93] dark:text-[#38BDF8]" />
            <span>Backup / Sync</span>
          </button>

          <button
            onClick={toggleDarkMode}
            className="flex items-center justify-center space-x-1.5 py-2 px-2.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-[#EBF3FA] dark:hover:bg-slate-700 text-[#0F172A] dark:text-slate-200 text-xs font-bold border border-slate-200 dark:border-slate-700 transition shadow-sm"
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDarkMode ? (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span>Light Mode</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-[#004B93]" />
                <span>Dark Mode</span>
              </>
            )}
          </button>
        </div>

        {/* Clear Data & Reset buttons */}
        <div className="flex items-center justify-between pt-1 border-t border-slate-200 dark:border-slate-800 px-1 text-[11px]">
          <button
            onClick={async () => {
              if (window.confirm('Reset to initial official HSB Trimester II course catalog & timetable?')) {
                await resetToInitialRoster();
              }
            }}
            className="flex items-center space-x-1 text-slate-500 hover:text-[#004B93] dark:text-slate-400 dark:hover:text-white font-medium"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Roster</span>
          </button>

          <button
            onClick={async () => {
              if (window.confirm('Clear all local data in this browser? All uploads and custom notes will be removed.')) {
                await clearAllData();
              }
            }}
            className="flex items-center space-x-1 text-rose-600 hover:text-rose-700 dark:text-rose-400 font-medium"
          >
            <Trash2 className="w-3 h-3" />
            <span>Clear All</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
