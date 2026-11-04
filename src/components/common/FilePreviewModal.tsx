import React, { useEffect, useState } from 'react';
import { useLMS } from '../../context/LMSContext';
import { formatFileSize, formatDate } from '../../utils/formatters';
import { X, Download, ExternalLink, FileText, FileSpreadsheet, Presentation, File } from 'lucide-react';

export const FilePreviewModal: React.FC = () => {
  const { previewFile, setPreviewFile } = useLMS();
  const [objectUrl, setObjectUrl] = useState<string | null>(null);

  useEffect(() => {
    if (previewFile && previewFile.blob) {
      const url = URL.createObjectURL(previewFile.blob);
      setObjectUrl(url);
      return () => {
        URL.revokeObjectURL(url);
      };
    } else {
      setObjectUrl(null);
    }
  }, [previewFile]);

  if (!previewFile) return null;

  const handleDownload = () => {
    if (!objectUrl) return;
    const a = document.createElement('a');
    a.href = objectUrl;
    a.download = previewFile.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const isPdf =
    previewFile.type.includes('pdf') ||
    previewFile.name.toLowerCase().endsWith('.pdf');

  const isExcel =
    previewFile.type.includes('spreadsheet') ||
    previewFile.type.includes('excel') ||
    previewFile.name.endsWith('.xlsx') ||
    previewFile.name.endsWith('.xls');

  const isPpt =
    previewFile.type.includes('presentation') ||
    previewFile.type.includes('powerpoint') ||
    previewFile.name.endsWith('.ppt') ||
    previewFile.name.endsWith('.pptx');

  const isDoc =
    previewFile.type.includes('word') ||
    previewFile.type.includes('document') ||
    previewFile.name.endsWith('.doc') ||
    previewFile.name.endsWith('.docx');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl h-[88vh] bg-white dark:bg-[#111827] rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-[#F4F7FA] dark:bg-[#0F172A]">
          <div className="flex items-center space-x-3 overflow-hidden">
            <div className="p-2.5 rounded-xl bg-[#EBF3FA] text-[#004B93] dark:bg-slate-800 dark:text-[#38BDF8]">
              {isPdf ? (
                <FileText className="w-5 h-5 text-[#004B93] dark:text-[#38BDF8]" />
              ) : isExcel ? (
                <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
              ) : isPpt ? (
                <Presentation className="w-5 h-5 text-amber-600" />
              ) : (
                <File className="w-5 h-5 text-blue-600" />
              )}
            </div>
            <div className="truncate">
              <h3 className="text-base font-extrabold text-[#0F172A] dark:text-white truncate">
                {previewFile.name}
              </h3>
              <div className="flex items-center space-x-3 text-xs text-slate-500 dark:text-slate-400">
                <span className="font-bold text-[#004B93] dark:text-[#38BDF8]">
                  {previewFile.moduleTag}
                </span>
                <span>•</span>
                <span>{formatFileSize(previewFile.size)}</span>
                <span>•</span>
                <span>Uploaded {formatDate(previewFile.uploadDate)}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            {objectUrl && (
              <a
                href={objectUrl}
                target="_blank"
                rel="noreferrer"
                className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Open in Tab</span>
              </a>
            )}
            <button
              onClick={handleDownload}
              className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 text-xs font-bold rounded-lg bg-[#004B93] hover:bg-[#003870] text-white transition shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </button>
            <button
              onClick={() => setPreviewFile(null)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-200 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-slate-100 dark:bg-[#0B1120] relative overflow-hidden flex items-center justify-center">
          {isPdf && objectUrl ? (
            <iframe
              src={objectUrl}
              title={previewFile.name}
              className="w-full h-full border-none"
            />
          ) : (
            <div className="max-w-md p-8 text-center bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800 mx-4">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/50 flex items-center justify-center text-amber-600 dark:text-amber-400">
                {isPpt ? (
                  <Presentation className="w-8 h-8" />
                ) : isExcel ? (
                  <FileSpreadsheet className="w-8 h-8 text-emerald-600" />
                ) : isDoc ? (
                  <FileText className="w-8 h-8 text-blue-600" />
                ) : (
                  <File className="w-8 h-8" />
                )}
              </div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                {isPpt ? 'PowerPoint Presentation' : isExcel ? 'Excel Spreadsheet' : isDoc ? 'Word Document' : 'Study Resource Document'}
              </h4>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
                This {previewFile.name.split('.').pop()?.toUpperCase()} file is securely stored locally in your browser's IndexedDB. Download or open with your local Office suite for full editing.
              </p>
              <div className="flex justify-center gap-3">
                <button
                  onClick={handleDownload}
                  className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-[#004B93] hover:bg-[#003870] text-white font-bold text-sm shadow-md transition"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Local File ({formatFileSize(previewFile.size)})</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
