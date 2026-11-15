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
  Globe,
  Loader2,
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

  const handleExportFull = async () => {
    setIsExporting(true);
    playSoftTick();
    try {
      await exportBackup(true);
      setImportStatus({
        type: 'success',
        message: 'Complete sync package (all data + uploaded files) downloaded!',
      });
      triggerStudyConfetti();
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
        message: `Restored successfully from "${file.name}"!`,
      });
      triggerStudyConfetti();
    } catch (err) {
      setImportStatus({
        type: 'error',
        message: (err as Error).message || 'Failed to parse backup file.',
      });
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleResetData = async () => {
    if (!window.confirm('Reset to official HSB Trimester II catalog?')) return;

    try {
      await resetToInitialRoster();
      setImportStatus({
        type: 'success',
        message: 'Reset complete.',
      });
    } catch (err) {
      setImportStatus({
        type: 'error',
        message: (err as Error).message || 'Reset failed.',
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white dark:bg-[#111827] rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-[#F4F7FA] dark:bg-[#0B1426]">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-[#EBF3FA] text-[#004B93] dark:bg-slate-800 dark:text-[#38BDF8]">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                Backup & Sync
              </h3>
              <p className="text-[11px] text-slate-400">Localhost ↔ Vercel Sync</p>
            </div>
          </div>
          <button
            onClick={() => setIsBackupModalOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Vercel ↔ Localhost Sync Guide Box */}
          <div className="p-3.5 rounded-2xl bg-[#EBF3FA] dark:bg-slate-800/60 border border-[#D6E6F5] dark:border-slate-700/80 text-xs">
            <div className="flex items-center space-x-2 font-bold text-[#004B93] dark:text-[#38BDF8] mb-1">
              <Globe className="w-4 h-4 shrink-0" />
              <span>Syncing Between Localhost and Vercel</span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-300">
              Export your sync file on localhost, then import it on your Vercel deployment to carry over all study materials, marks, and attendance.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-2 text-center p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-xs">
            <div>
              <p className="text-[10px] text-slate-400">Courses</p>
              <p className="font-bold text-slate-900 dark:text-white">{subjects.length}</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-400">Vault Files</p>
              <p className="font-bold text-[#004B93] dark:text-[#38BDF8]">
                {storageUsage.fileCount} ({formatFileSize(storageUsage.totalBytes)})
              </p>
            </div>
            <div>
              <p className="text-[10px] text-slate-400">Assignments</p>
              <p className="font-bold text-slate-900 dark:text-white">{assignments.length}</p>
            </div>
          </div>

          {/* Status Message */}
          {importStatus.type !== 'idle' && (
            <div
              className={`p-3 rounded-xl text-xs flex items-center space-x-2 ${
                importStatus.type === 'success'
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300'
                  : 'bg-rose-50 text-rose-800 border border-rose-200 dark:bg-rose-950/40 dark:text-rose-300'
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

          {/* Actions */}
          <div className="space-y-2.5">
            {/* Export */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">Export Data & Study Files</h4>
                <p className="text-[11px] text-slate-400">Packages all metadata and uploaded documents.</p>
              </div>
              <button
                onClick={handleExportFull}
                disabled={isExporting}
                className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-[#004B93] hover:bg-[#003870] text-white font-bold text-xs transition shadow-sm shrink-0"
              >
                {isExporting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}
                <span>Export Package</span>
              </button>
            </div>

            {/* Import */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">Import / Restore</h4>
                <p className="text-[11px] text-slate-400">Restore files and data from an exported package.</p>
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
                  className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl border border-[#004B93]/40 bg-[#EBF3FA] dark:bg-slate-800 text-[#004B93] dark:text-[#38BDF8] hover:bg-[#D6E6F5] font-bold text-xs cursor-pointer transition shadow-sm shrink-0"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Import Package</span>
                </label>
              </div>
            </div>
          </div>

          {/* Reset */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-400 text-[11px]">Reset course catalog?</span>
            <button
              onClick={handleResetData}
              className="inline-flex items-center space-x-1 text-slate-500 hover:text-rose-600 dark:text-slate-400 font-semibold"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset to Default</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
