import React, { useState, useRef } from 'react';
import { useLMS } from '../../context/LMSContext';
import {
  FileSpreadsheet,
  UploadCloud,
  CheckCircle2,
  AlertCircle,
  X,
  FileCheck,
  CalendarDays,
  Users,
} from 'lucide-react';
import { playStudyChime, triggerStudyConfetti } from '../../utils/sound';

interface SyncExcelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SyncExcelModal: React.FC<SyncExcelModalProps> = ({ isOpen, onClose }) => {
  const { syncExcelWorkbook, student } = useLMS();

  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultMessage, setResultMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleProcessFile = async (file: File) => {
    setIsProcessing(true);
    setResultMessage(null);
    setErrorMessage(null);

    try {
      const res = await syncExcelWorkbook(file);
      setResultMessage(
        res.message || `Successfully synced ${file.name} for Roll Number ${student.rollNumber}!`
      );
      playStudyChime();
      triggerStudyConfetti();
    } catch (err) {
      setErrorMessage((err as Error).message || 'Failed to parse workbook.');
    } finally {
      setIsProcessing(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white dark:bg-[#111827] rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-[#004B93] via-[#003870] to-[#002B5B] text-white">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-2xl bg-white/15 text-white border border-white/20">
              <FileSpreadsheet className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white">
                Sync HSB Master Workbook (.xlsx)
              </h3>
              <p className="text-xs text-slate-200">
                Parses Timetable (Weeks 1–12) & Attendance for {student.rollNumber}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Instructions Banner */}
          <div className="p-4 rounded-2xl bg-[#EBF3FA] dark:bg-slate-800/60 border border-[#D6E6F5] dark:border-slate-700 text-xs space-y-2">
            <p className="font-extrabold text-[#004B93] dark:text-[#38BDF8] flex items-center space-x-1.5">
              <span>Automatic SheetJS Parsing Engine:</span>
            </p>
            <ul className="space-y-1 text-slate-600 dark:text-slate-300 list-disc list-inside">
              <li>
                <span className="font-bold text-[#0F172A] dark:text-white">Timetable Tab:</span> Extracts Weeks 1 to 12 slots, CXO talks, TCC, Quizzes, Mid-Terms, and End-Terms.
              </li>
              <li>
                <span className="font-bold text-[#0F172A] dark:text-white">Attendance Tabs (IET, MRM, ME, PM2...):</span> Auto-locates row for <span className="font-mono font-bold text-[#004B93] dark:text-[#38BDF8]">{student.rollNumber}</span> ({student.name}) and computes conducted vs. upcoming sessions.
              </li>
            </ul>
          </div>

          {/* Drag & Drop Upload Zone */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
              const file = e.dataTransfer.files?.[0];
              if (file) handleProcessFile(file);
            }}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-3xl p-8 text-center cursor-pointer transition-all ${
              isDragging
                ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20 scale-[1.01]'
                : 'border-slate-300 dark:border-slate-700 hover:border-emerald-500 bg-slate-50/50 dark:bg-slate-900/40'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".xlsx,.xls,.csv"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleProcessFile(file);
              }}
            />

            <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <UploadCloud className="w-7 h-7" />
            </div>

            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              {isProcessing ? 'Parsing HSB Master Sheets...' : 'Drop Tentative_Timetable_TermII_Batch2026-28.xlsx Here'}
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Supports <span className="font-semibold text-slate-700 dark:text-slate-300">.xlsx, .xls, .csv</span> • 100% processed locally in-browser
            </p>

            <button
              type="button"
              disabled={isProcessing}
              className="mt-4 px-5 py-2 text-xs font-bold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-md transition"
            >
              Select Excel File from Device
            </button>
          </div>

          {/* Feedback Messages */}
          {resultMessage && (
            <div className="p-3.5 rounded-2xl bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 text-xs flex items-center space-x-2 border border-emerald-200 dark:border-emerald-800">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>{resultMessage}</span>
            </div>
          )}

          {errorMessage && (
            <div className="p-3.5 rounded-2xl bg-rose-50 text-rose-800 dark:bg-rose-950/40 dark:text-rose-300 text-xs flex items-center space-x-2 border border-rose-200 dark:border-rose-900">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{errorMessage}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
