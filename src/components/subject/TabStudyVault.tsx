import React, { useState, useRef } from 'react';
import { useLMS } from '../../context/LMSContext';
import { Subject } from '../../types';
import { formatFileSize, formatDate } from '../../utils/formatters';
import {
  UploadCloud,
  FileText,
  FileSpreadsheet,
  Presentation,
  File,
  Eye,
  Download,
  Trash2,
  Filter,
  CheckCircle,
  HardDrive,
  FolderOpen,
} from 'lucide-react';
import { triggerStudyConfetti } from '../../utils/sound';

interface TabStudyVaultProps {
  subject: Subject;
}

export const TabStudyVault: React.FC<TabStudyVaultProps> = ({ subject }) => {
  const { files, uploadFile, deleteFile, openFilePreview, loadFileBlob } = useLMS();

  const [selectedModule, setSelectedModule] = useState<string>('All');
  const [uploadModuleTag, setUploadModuleTag] = useState<string>('General Coursepack');
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Match by code or id
  const subjectFiles = files.filter(
    (f) => f.subjectId === subject.code || f.subjectId === subject.id
  );

  const filteredFiles =
    selectedModule === 'All'
      ? subjectFiles
      : subjectFiles.filter((f) => f.moduleTag === selectedModule);

  const handleFiles = async (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    setIsUploading(true);
    setUploadSuccess(null);

    try {
      for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i];
        await uploadFile(file, subject.code, uploadModuleTag);
      }
      setUploadSuccess(`Saved ${fileList.length} file(s) into local IndexedDB for ${subject.code}.`);
      triggerStudyConfetti();
    } catch (err) {
      alert(`Upload failed: ${(err as Error).message}`);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDownload = async (fileId: string, fileName: string) => {
    const fileWithBlob = await loadFileBlob(fileId);
    if (!fileWithBlob || !fileWithBlob.blob) {
      alert('File blob could not be retrieved from IndexedDB.');
      return;
    }

    const url = URL.createObjectURL(fileWithBlob.blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDelete = async (fileId: string, fileName: string) => {
    if (window.confirm(`Are you sure you want to delete "${fileName}" from your local vault?`)) {
      await deleteFile(fileId);
    }
  };

  const getFileIcon = (fileName: string, fileType: string) => {
    const lowerName = fileName.toLowerCase();
    if (lowerName.endsWith('.pdf') || fileType.includes('pdf')) {
      return <FileText className="w-5 h-5 text-rose-600 dark:text-rose-400" />;
    }
    if (
      lowerName.endsWith('.ppt') ||
      lowerName.endsWith('.pptx') ||
      fileType.includes('presentation')
    ) {
      return <Presentation className="w-5 h-5 text-amber-600" />;
    }
    if (
      lowerName.endsWith('.xls') ||
      lowerName.endsWith('.xlsx') ||
      fileType.includes('spreadsheet')
    ) {
      return <FileSpreadsheet className="w-5 h-5 text-emerald-600" />;
    }
    return <File className="w-5 h-5 text-blue-600" />;
  };

  return (
    <div className="space-y-6">
      {/* Top Bar: Study Material Vault & Module Tag */}
      <div className="bg-[#F4F7FA]/70 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-2.5">
          <FolderOpen className="w-5 h-5 text-[#004B93] dark:text-[#38BDF8] shrink-0" />
          <div>
            <h4 className="text-xs font-extrabold text-[#0F172A] dark:text-white uppercase tracking-wider">
              Study Material Vault • {subject.code}
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Lecture slides, reading packs, case studies, and reference notes
            </p>
          </div>
        </div>

        {/* Target Module Picker for Uploads */}
        <div className="flex items-center space-x-2">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 whitespace-nowrap">
            Tag Upload To:
          </label>
          <input
            type="text"
            placeholder="e.g. Session 1 Slides, Coursepack"
            value={uploadModuleTag}
            onChange={(e) => setUploadModuleTag(e.target.value)}
            className="px-3 py-1.5 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 font-medium focus:outline-none focus:ring-2 focus:ring-[#004B93]"
          />
        </div>
      </div>

      {/* Drag & Drop File Upload Box */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          handleFiles(e.dataTransfer.files);
        }}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-3xl p-8 text-center cursor-pointer transition-all ${
          isDragging
            ? 'border-[#004B93] bg-[#EBF3FA] dark:bg-slate-800 scale-[1.01]'
            : 'border-[#D6E6F5] dark:border-slate-700 hover:border-[#004B93] bg-white dark:bg-[#0F172A]'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.ppt,.pptx,.doc,.docx,.xlsx,.xls"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />

        <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-[#EBF3FA] dark:bg-slate-800 text-[#004B93] dark:text-[#38BDF8] flex items-center justify-center">
          <UploadCloud className="w-7 h-7" />
        </div>

        <h3 className="text-sm font-extrabold text-[#0F172A] dark:text-white">
          {isUploading
            ? 'Saving Binary Blobs into IndexedDB...'
            : `Drop Study Materials for ${subject.code} (${subject.name}) Here`}
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Supports <span className="font-semibold text-slate-700 dark:text-slate-300">.pdf, .ppt, .pptx, .doc, .docx, .xlsx</span> files
        </p>

        <button
          type="button"
          className="mt-4 px-4 py-1.5 text-xs font-bold rounded-xl bg-[#004B93] hover:bg-[#003870] text-white shadow-sm transition"
        >
          Select Files to Upload
        </button>
      </div>

      {uploadSuccess && (
        <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 text-xs flex items-center space-x-2 border border-emerald-200 dark:border-emerald-800">
          <CheckCircle className="w-4 h-4 shrink-0" />
          <span>{uploadSuccess}</span>
        </div>
      )}

      {/* Files List / Grid (Starts at 0 / Empty State) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-2">
            <FolderOpen className="w-4 h-4 text-hsb-royal dark:text-hsb-cyan" />
            <span>Stored Files for {subject.code} ({subjectFiles.length})</span>
          </h4>
        </div>

        {filteredFiles.length === 0 ? (
          <div className="p-12 text-center bg-white dark:bg-[#111827] rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 text-xs text-slate-400">
            No study materials uploaded for {subject.code} yet. Drag & drop lecture slides or coursepack PDFs above to store them locally.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredFiles.map((file) => (
              <div
                key={file.id}
                className="p-4 bg-white dark:bg-[#111827] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition flex items-center justify-between gap-3"
              >
                <div className="flex items-center space-x-3 overflow-hidden">
                  <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 shrink-0">
                    {getFileIcon(file.name, file.type)}
                  </div>
                  <div className="truncate">
                    <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {file.name}
                    </p>
                    <div className="flex items-center space-x-2 text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      <span className="font-semibold text-hsb-royal dark:text-hsb-cyan truncate max-w-[140px]">
                        {file.moduleTag}
                      </span>
                      <span>•</span>
                      <span>{formatFileSize(file.size)}</span>
                      <span>•</span>
                      <span>{formatDate(file.uploadDate)}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-1.5 shrink-0">
                  <button
                    onClick={() => openFilePreview(file.id)}
                    className="inline-flex items-center space-x-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition"
                    title="In-browser Preview"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Preview</span>
                  </button>

                  <button
                    onClick={() => handleDownload(file.id, file.name)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-hsb-royal hover:bg-blue-50 dark:hover:bg-slate-800 dark:hover:text-hsb-cyan transition"
                    title="Download Blob"
                  >
                    <Download className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleDelete(file.id, file.name)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-slate-800 transition"
                    title="Delete File"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
