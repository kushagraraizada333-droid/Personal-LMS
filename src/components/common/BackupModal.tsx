import React, { useState, useRef } from 'react';
import { useLMS } from '../../context/LMSContext';
import { formatFileSize } from '../../utils/formatters';
import { playSoftTick, triggerStudyConfetti } from '../../utils/sound';
import {
  Download,
  Upload,
  Database,
  X,
  AlertTriangle,
  CheckCircle2,
  HardDrive,
  RotateCcw,
} from 'lucide-react';

export const BackupModal: React.FC = () => {
  const {
    isBackupModalOpen,
    setIsBackupModalOpen,
    exportBackup,
    importBackup,
    resetToInitialRoster,
    storageUsage,
    subjects,
    assignments,
  } = useLMS();

  const [importStatus, setImportStatus] = useState<{
    type: 'idle' | 'success' | 'error';
    message?: string;
  }>({ type: 'idle' });

  const [isExporting, setIsExporting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isBackupModalOpen) return null;

  const handleExport = async () => {
    setIsExporting(true);
    playSoftTick();
    try {
      await exportBackup();
      setImportStatus({
        type: 'success',
        message: 'JSON metadata backup successfully downloaded!',
      });
    } catch (err) {
      setImportStatus({
        type: 'error',
        message: (err as Error).message || 'Export failed.',
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      await importBackup(text);
      setImportStatus({
        type: 'success',
        message: `Successfully restored backup from "${file.name}"!`,
      });
      triggerStudyConfetti();
    } catch (err) {
      setImportStatus({
        type: 'error',
        message: (err as Error).message || 'Failed to parse JSON backup file.',
      });
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleResetData = async () => {
    const confirmed = window.confirm(
      'Are you sure you want to restore the official HSB Jaipur Trimester II curriculum? All courses will reset to their pristine roster with zero fake data.'
    );
    if (!confirmed) return;

    try {
      await resetToInitialRoster();
      setImportStatus({
        type: 'success',
        message: 'Reset to official HSB Jaipur Trimester II curriculum complete!',
      });
      triggerStudyConfetti();
    } catch (err) {
      setImportStatus({
        type: 'error',
        message: (err as Error).message || 'Reset failed.',
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white dark:bg-[#111827] rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200 dark:border-slate-800 bg-[#F4F7FA] dark:bg-[#0B1426]">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-[#EBF3FA] text-[#004B93] dark:bg-slate-800 dark:text-[#38BDF8]">
              <Database className="w-5 h-5 text-[#004B93] dark:text-[#38BDF8]" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Offline Backup & Data Utility
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Private Portal Storage • Export & Restore
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsBackupModalOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-200 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Storage Footprint Widget */}
          <div className="p-4 rounded-2xl bg-[#EBF3FA] dark:bg-slate-800/60 border border-[#D6E6F5] dark:border-slate-700/80">
            <div className="flex items-center justify-between mb-2">
              <span className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                <HardDrive className="w-4 h-4 text-[#004B93] dark:text-[#38BDF8]" />
                <span>Browser IndexedDB Storage Engine</span>
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400">
                100% Offline
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-[#D6E6F5] dark:border-slate-700/60 text-center">
              <div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">Courses</p>
                <p className="text-base font-extrabold text-[#0F172A] dark:text-white tabular-nums">
                  {subjects.length}
                </p>
              </div>
              <div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">Deliverables</p>
                <p className="text-base font-extrabold text-[#0F172A] dark:text-white tabular-nums">
                  {assignments.length}
                </p>
              </div>
              <div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">Blob Footprint</p>
                <p className="text-base font-extrabold text-[#004B93] dark:text-[#38BDF8] tabular-nums">
                  {formatFileSize(storageUsage.totalBytes)} ({storageUsage.fileCount} files)
                </p>
              </div>
            </div>
          </div>

          {/* Status Message */}
          {importStatus.type !== 'idle' && (
            <div
              className={`p-3.5 rounded-xl text-xs flex items-center space-x-2.5 ${
                importStatus.type === 'success'
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800'
                  : 'bg-rose-50 text-rose-800 border border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800'
              }`}
            >
              {importStatus.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 shrink-0" />
              ) : (
                <AlertTriangle className="w-4 h-4 shrink-0" />
              )}
              <span>{importStatus.message}</span>
            </div>
          )}

          {/* Export Action */}
          <div className="flex items-center justify-between p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50">
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Export Metadata Backup</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Download all courses, marks, deadlines, and progress as a structured .json file.
              </p>
            </div>
            <button
              onClick={handleExport}
              disabled={isExporting}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-[#004B93] hover:bg-[#003870] text-white font-semibold text-xs transition shadow-sm shrink-0"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export JSON</span>
            </button>
          </div>

          {/* Import Action */}
          <div className="flex items-center justify-between p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50">
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Restore from JSON</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Restore previously exported curriculum, assignments, or grade records.
              </p>
            </div>
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json,application/json"
                onChange={handleFileChange}
                className="hidden"
                id="backup-file-input"
              />
              <label
                htmlFor="backup-file-input"
                className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl border border-[#004B93]/40 bg-[#EBF3FA] dark:bg-slate-800 text-[#004B93] dark:text-[#38BDF8] hover:bg-[#D6E6F5] font-semibold text-xs cursor-pointer transition shadow-sm shrink-0"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Import JSON</span>
              </label>
            </div>
          </div>

          {/* Reset to Default */}
          <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-400">Restore official Trimester II catalog?</span>
            <button
              onClick={handleResetData}
              className="inline-flex items-center space-x-1.5 text-xs text-slate-600 dark:text-slate-400 hover:text-[#004B93] dark:hover:text-[#38BDF8] font-medium py-1 px-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Roster</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
