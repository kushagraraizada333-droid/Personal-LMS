import React, { useEffect, useState } from 'react';
import { useLMS } from '../../context/LMSContext';
import { formatFileSize, formatDate } from '../../utils/formatters';
import {
  X,
  Download,
  ExternalLink,
  FileText,
  FileSpreadsheet,
  Presentation,
  File,
  Video,
  Music,
  Image as ImageIcon,
  Archive,
  ZoomIn,
  ZoomOut,
  Maximize2,
} from 'lucide-react';

export const FilePreviewModal: React.FC = () => {
  const { previewFile, setPreviewFile } = useLMS();
  const [objectUrl, setObjectUrl] = useState<string | null>(null);
  const [textContent, setTextContent] = useState<string | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    if (previewFile && previewFile.blob) {
      const url = URL.createObjectURL(previewFile.blob);
      setObjectUrl(url);

      // Check if text/csv file
      const name = previewFile.name.toLowerCase();
      const type = previewFile.type.toLowerCase();
      const isText =
        name.endsWith('.txt') ||
        name.endsWith('.csv') ||
        name.endsWith('.md') ||
        name.endsWith('.json') ||
        name.endsWith('.log') ||
        name.endsWith('.py') ||
        name.endsWith('.js') ||
        name.endsWith('.ts') ||
        name.endsWith('.tsx') ||
        name.endsWith('.jsx') ||
        type.startsWith('text/');

      if (isText && previewFile.size < 5 * 1024 * 1024) {
        // Read text if < 5MB
        previewFile.blob
          .text()
          .then((text) => setTextContent(text))
          .catch(() => setTextContent(null));
      } else {
        setTextContent(null);
      }

      return () => {
        URL.revokeObjectURL(url);
      };
    } else {
      setObjectUrl(null);
      setTextContent(null);
    }
  }, [previewFile]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setPreviewFile(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setPreviewFile]);

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

  const nameLower = previewFile.name.toLowerCase();
  const typeLower = previewFile.type.toLowerCase();

  const isPdf =
    typeLower.includes('pdf') || nameLower.endsWith('.pdf');

  const isVideo =
    typeLower.startsWith('video/') ||
    nameLower.endsWith('.mp4') ||
    nameLower.endsWith('.webm') ||
    nameLower.endsWith('.mov') ||
    nameLower.endsWith('.mkv') ||
    nameLower.endsWith('.avi');

  const isAudio =
    typeLower.startsWith('audio/') ||
    nameLower.endsWith('.mp3') ||
    nameLower.endsWith('.wav') ||
    nameLower.endsWith('.m4a') ||
    nameLower.endsWith('.aac') ||
    nameLower.endsWith('.ogg');

  const isImage =
    typeLower.startsWith('image/') ||
    nameLower.endsWith('.png') ||
    nameLower.endsWith('.jpg') ||
    nameLower.endsWith('.jpeg') ||
    nameLower.endsWith('.webp') ||
    nameLower.endsWith('.gif') ||
    nameLower.endsWith('.svg');

  const isExcel =
    typeLower.includes('spreadsheet') ||
    typeLower.includes('excel') ||
    nameLower.endsWith('.xlsx') ||
    nameLower.endsWith('.xls') ||
    nameLower.endsWith('.csv');

  const isPpt =
    typeLower.includes('presentation') ||
    typeLower.includes('powerpoint') ||
    nameLower.endsWith('.ppt') ||
    nameLower.endsWith('.pptx');

  const isDoc =
    typeLower.includes('word') ||
    typeLower.includes('document') ||
    nameLower.endsWith('.doc') ||
    nameLower.endsWith('.docx');

  const isArchive =
    typeLower.includes('zip') ||
    typeLower.includes('compressed') ||
    typeLower.includes('tar') ||
    nameLower.endsWith('.zip') ||
    nameLower.endsWith('.rar') ||
    nameLower.endsWith('.7z') ||
    nameLower.endsWith('.tar') ||
    nameLower.endsWith('.gz');

  const getHeaderIcon = () => {
    if (isPdf) return <FileText className="w-5 h-5 text-[#004B93] dark:text-[#38BDF8]" />;
    if (isVideo) return <Video className="w-5 h-5 text-purple-600 dark:text-purple-400" />;
    if (isAudio) return <Music className="w-5 h-5 text-pink-600 dark:text-pink-400" />;
    if (isImage) return <ImageIcon className="w-5 h-5 text-teal-600 dark:text-teal-400" />;
    if (isExcel) return <FileSpreadsheet className="w-5 h-5 text-emerald-600" />;
    if (isPpt) return <Presentation className="w-5 h-5 text-amber-600" />;
    if (isDoc) return <FileText className="w-5 h-5 text-blue-600" />;
    if (isArchive) return <Archive className="w-5 h-5 text-orange-600" />;
    return <File className="w-5 h-5 text-slate-600 dark:text-slate-300" />;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-6xl h-[90vh] bg-white dark:bg-[#111827] rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-[#F4F7FA] dark:bg-[#0F172A] shrink-0">
          <div className="flex items-center space-x-3 overflow-hidden">
            <div className="p-2.5 rounded-xl bg-[#EBF3FA] dark:bg-slate-800 shadow-sm shrink-0">
              {getHeaderIcon()}
            </div>
            <div className="truncate">
              <h3 className="text-sm sm:text-base font-extrabold text-[#0F172A] dark:text-white truncate">
                {previewFile.name}
              </h3>
              <div className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                <span className="font-bold text-[#004B93] dark:text-[#38BDF8]">
                  {previewFile.moduleTag}
                </span>
                <span>•</span>
                <span className="font-mono font-semibold">{formatFileSize(previewFile.size)}</span>
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
                className="hidden md:inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition shadow-sm"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Open in Tab</span>
              </a>
            )}

            <button
              onClick={handleDownload}
              className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 text-xs font-bold rounded-xl bg-[#004B93] hover:bg-[#003870] text-white transition shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </button>

            <button
              onClick={() => setPreviewFile(null)}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-200 transition"
              title="Close Preview (ESC)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Viewer Body */}
        <div className="flex-1 bg-slate-100 dark:bg-[#0B1120] relative overflow-auto flex items-center justify-center p-4">
          {/* PDF Viewer */}
          {isPdf && objectUrl && (
            <iframe
              src={objectUrl}
              title={previewFile.name}
              className="w-full h-full border-none rounded-xl bg-white shadow-sm"
            />
          )}

          {/* Video Player */}
          {isVideo && objectUrl && (
            <div className="w-full max-w-4xl max-h-full flex flex-col items-center justify-center bg-black rounded-2xl overflow-hidden shadow-2xl">
              <video
                controls
                autoPlay={false}
                src={objectUrl}
                className="w-full max-h-[75vh] object-contain"
              >
                Your browser does not support the video tag.
              </video>
              <div className="w-full px-4 py-2 bg-slate-900/90 text-xs text-slate-300 flex items-center justify-between">
                <span>{previewFile.name}</span>
                <span className="font-mono">{formatFileSize(previewFile.size)}</span>
              </div>
            </div>
          )}

          {/* Audio Player */}
          {isAudio && objectUrl && (
            <div className="w-full max-w-lg p-8 bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 text-center space-y-6">
              <div className="w-20 h-20 mx-auto rounded-3xl bg-pink-50 dark:bg-pink-950/40 text-pink-600 flex items-center justify-center shadow-inner">
                <Music className="w-10 h-10" />
              </div>
              <div>
                <h4 className="text-base font-extrabold text-slate-900 dark:text-white">
                  {previewFile.name}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Audio Recording • {formatFileSize(previewFile.size)}
                </p>
              </div>
              <audio controls src={objectUrl} className="w-full">
                Your browser does not support the audio element.
              </audio>
            </div>
          )}

          {/* Image Viewer */}
          {isImage && objectUrl && (
            <div className="relative w-full h-full flex flex-col items-center justify-center overflow-auto p-4">
              <div className="absolute top-4 right-4 z-10 flex items-center space-x-1.5 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-1.5 rounded-xl shadow-md border border-slate-200 dark:border-slate-700">
                <button
                  onClick={() => setIsZoomed((prev) => !prev)}
                  className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  title={isZoomed ? 'Fit to Screen' : 'View Actual Size'}
                >
                  {isZoomed ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
                </button>
              </div>
              <img
                src={objectUrl}
                alt={previewFile.name}
                className={`transition-all duration-200 rounded-xl shadow-xl object-contain ${
                  isZoomed ? 'max-w-none' : 'max-h-[75vh] max-w-full'
                }`}
              />
            </div>
          )}

          {/* Text / CSV / Code Viewer */}
          {textContent !== null && !isPdf && !isVideo && !isAudio && !isImage && (
            <div className="w-full h-full bg-white dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col shadow-inner">
              <div className="px-4 py-2 bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
                <span className="font-mono">{previewFile.name}</span>
                <span>{textContent.split('\n').length} lines • {formatFileSize(previewFile.size)}</span>
              </div>
              <pre className="flex-1 p-4 font-mono text-xs text-slate-800 dark:text-slate-200 overflow-auto whitespace-pre-wrap leading-relaxed select-text">
                {textContent}
              </pre>
            </div>
          )}

          {/* Fallback for Documents, Spreadsheets, Presentations, Archives */}
          {!isPdf &&
            !isVideo &&
            !isAudio &&
            !isImage &&
            textContent === null && (
              <div className="max-w-md w-full p-8 text-center bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 mx-4">
                <div className="w-20 h-20 mx-auto mb-4 rounded-3xl bg-[#EBF3FA] dark:bg-slate-800 border border-[#D6E6F5] dark:border-slate-700/60 flex items-center justify-center text-[#004B93] dark:text-[#38BDF8]">
                  {isPpt ? (
                    <Presentation className="w-10 h-10 text-amber-600" />
                  ) : isExcel ? (
                    <FileSpreadsheet className="w-10 h-10 text-emerald-600" />
                  ) : isDoc ? (
                    <FileText className="w-10 h-10 text-blue-600" />
                  ) : isArchive ? (
                    <Archive className="w-10 h-10 text-orange-600" />
                  ) : (
                    <File className="w-10 h-10" />
                  )}
                </div>

                <h4 className="text-lg font-extrabold text-slate-900 dark:text-white mb-2">
                  {isPpt
                    ? 'PowerPoint Presentation'
                    : isExcel
                    ? 'Excel Spreadsheet'
                    : isDoc
                    ? 'Word Document'
                    : isArchive
                    ? 'Archive File (ZIP/RAR/7Z)'
                    : 'Course Resource File'}
                </h4>

                <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
                  This <span className="font-bold text-slate-700 dark:text-slate-300">.{previewFile.name.split('.').pop()?.toUpperCase()}</span> file is stored offline as a binary Blob in your browser's IndexedDB. Download or open in your native desktop application for full fidelity.
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-3">
                  <button
                    onClick={handleDownload}
                    className="inline-flex items-center justify-center space-x-2 px-6 py-2.5 rounded-xl bg-[#004B93] hover:bg-[#003870] text-white font-bold text-xs shadow-md transition"
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
