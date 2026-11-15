import React, { useState, useEffect } from 'react';
import { LMSProvider, useLMS } from './context/LMSContext';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { StudentProfileBanner } from './components/dashboard/StudentProfileBanner';
import { KPICards } from './components/dashboard/KPICards';
import { TodayClassesWidget } from './components/dashboard/TodayClassesWidget';
import { SubjectOverviewGrid } from './components/dashboard/SubjectOverviewGrid';
import { SubjectWorkspace } from './components/subject/SubjectWorkspace';
import { AttendanceTrackerView } from './components/views/AttendanceTrackerView';
import { TimetableView } from './components/views/TimetableView';
import { AssignmentsHubView } from './components/views/AssignmentsHubView';
import { MarksGradebookView } from './components/views/MarksGradebookView';
import { SyncExcelModal } from './components/common/SyncExcelModal';
import { FilePreviewModal } from './components/common/FilePreviewModal';
import { PomodoroModal } from './components/common/PomodoroModal';
import { BackupModal } from './components/common/BackupModal';
import { AddAssignmentModal } from './components/common/AddAssignmentModal';
import { AssignmentFocusDrawer } from './components/assignments/AssignmentFocusDrawer';
import { CommandPaletteModal } from './components/common/CommandPaletteModal';
import { Loader2 } from 'lucide-react';
import { playClickSound } from './utils/sound';

const MainContent: React.FC = () => {
  const { activeView, isLoading, student } = useLMS();

  const [isAddAssignmentOpen, setIsAddAssignmentOpen] = useState(false);
  const [isSyncExcelOpen, setIsSyncExcelOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Universal sound feedback on every mouse click
  useEffect(() => {
    const handleGlobalClick = () => {
      playClickSound();
    };

    window.addEventListener('click', handleGlobalClick, { capture: true, passive: true });
    return () => {
      window.removeEventListener('click', handleGlobalClick, { capture: true });
    };
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#F4F7FA] dark:bg-[#0B1426] text-slate-800 dark:text-slate-100">
        <div className="w-16 h-16 rounded-2xl bg-white p-2 text-[#004B93] flex items-center justify-center shadow-xl mb-4 animate-pulse border border-[#D6E6F5]">
          <img src="/hsb.jpg" alt="HSB" className="w-12 h-12 object-contain" />
        </div>
        <div className="flex items-center space-x-2 text-sm font-semibold text-slate-600 dark:text-slate-300">
          <Loader2 className="w-4 h-4 animate-spin text-[#004B93] dark:text-[#38BDF8]" />
          <span>Mounting Local IndexedDB Storage Engine...</span>
        </div>
        <p className="text-xs text-slate-400 mt-1">Harishankar Singhania School of Business • Jaipur</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-[#F4F7FA] dark:bg-[#0B1426] text-slate-900 dark:text-slate-100 font-sans transition-colors">
      {/* Responsive HSB Blue Left Sidebar */}
      <Sidebar onOpenSyncExcel={() => setIsSyncExcelOpen(true)} />

      {/* Main Content Workspace */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto min-h-screen">
        <Header
          onOpenNewAssignment={() => setIsAddAssignmentOpen(true)}
          onOpenSyncExcel={() => setIsSyncExcelOpen(true)}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        <main className="flex-1 p-6 sm:p-8 max-w-7xl w-full mx-auto space-y-8 animate-in fade-in duration-300">
          {/* View 1: Executive Dashboard */}
          {activeView === 'dashboard' && (
            <div className="space-y-8">
              {/* Student Identification Banner */}
              <StudentProfileBanner />

              {/* Top 4 KPI Cards (Dynamically calculated from real data) */}
              <KPICards />

              {/* Two Column Layout: Today's Classes & Course Catalog */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                  <SubjectOverviewGrid />
                </div>
                <div className="space-y-8">
                  <TodayClassesWidget />
                </div>
              </div>
            </div>
          )}

          {/* View 2: Attendance Tracker */}
          {activeView === 'attendance' && (
            <AttendanceTrackerView
              onOpenSyncExcel={() => setIsSyncExcelOpen(true)}
            />
          )}

          {/* View 3: Timetable & Calendar */}
          {activeView === 'timetable' && (
            <TimetableView onOpenSyncExcel={() => setIsSyncExcelOpen(true)} />
          )}

          {/* View 4: Subject Workspace */}
          {activeView === 'subject' && (
            <SubjectWorkspace
              onOpenNewAssignment={() => setIsAddAssignmentOpen(true)}
            />
          )}

          {/* View 5: Assignments & Deadlines Hub */}
          {activeView === 'assignments' && (
            <AssignmentsHubView
              onOpenNewAssignment={() => setIsAddAssignmentOpen(true)}
            />
          )}

          {/* View 6: Marks & Gradebook */}
          {activeView === 'gradebook' && <MarksGradebookView />}
        </main>

        {/* Executive Footer */}
        <footer className="mt-auto px-8 py-3.5 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-2 bg-white/50 dark:bg-[#0B1120]/50">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-[#004B93] dark:text-[#38BDF8]">HSB Jaipur</span>
            <span>•</span>
            <span>{student.name} ({student.rollNumber})</span>
          </div>
          <div className="text-[11px] text-slate-400">
            Trimester II (2026–28)
          </div>
        </footer>
      </div>

      {/* Global Modals & Drawers */}
      <SyncExcelModal
        isOpen={isSyncExcelOpen}
        onClose={() => setIsSyncExcelOpen(false)}
      />
      <FilePreviewModal />
      <PomodoroModal />
      <BackupModal />
      <AddAssignmentModal
        isOpen={isAddAssignmentOpen}
        onClose={() => setIsAddAssignmentOpen(false)}
      />
      <AssignmentFocusDrawer />
      <CommandPaletteModal
        onOpenSyncExcel={() => setIsSyncExcelOpen(true)}
        onOpenNewAssignment={() => setIsAddAssignmentOpen(true)}
      />
    </div>
  );
};

export default function App() {
  return (
    <LMSProvider>
      <MainContent />
    </LMSProvider>
  );
}
