import React, { useState, useRef, useMemo } from 'react';
import { useLMS } from '../../context/LMSContext';
import { Subject, StoredFileMetadata, BatchUploadProgress } from '../../types';
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
  Search,
  LayoutGrid,
  List,
  CheckSquare,
  Square,
  ShieldCheck,
  Video,
  Music,
  Image as ImageIcon,
  Archive,
  ArrowUpDown,
  Sparkles,
  Loader2,
} from 'lucide-react';
import { triggerStudyConfetti } from '../../utils/sound';

interface TabStudyVaultProps {
  subject: Subject;
}

type FileCategory = 'all' | 'pdf' | 'ppt' | 'excel' | 'doc' | 'media' | 'archive';
type SortOption = 'newest' | 'oldest' | 'name' | 'size-desc' | 'size-asc';

export const TabStudyVault: React.FC<TabStudyVaultProps> = ({ subject }) => {
  const {
    files,
    uploadFilesBatch,
    deleteFile,
    deleteFilesBatch,
    openFilePreview,
    loadFileBlob,
    storageUsage,
    requestPersistentStorage,
  } = useLMS();

  const [selectedModule, setSelectedModule] = useState<string>('All');
  const [uploadModuleTag, setUploadModuleTag] = useState<string>('General Coursepack');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<FileCategory>('all');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [selectedFileIds, setSelectedFileIds] = useState<string[]>([]);

  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<BatchUploadProgress | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Filter files belonging to this subject
  const subjectFiles = useMemo(() => {
    return files.filter(
      (f) => f.subjectId === subject.code || f.subjectId === subject.id
    );
  }, [files, subject.code, subject.id]);

  // Extract unique module tags for module filter dropdown
  const uniqueModules = useMemo(() => {
    const set = new Set<string>();
    subjectFiles.forEach((f) => {
      if (f.moduleTag) set.add(f.moduleTag);
    });
    return Array.from(set);
  }, [subjectFiles]);

  // Categorize file by extension & mime type
  const getFileCategory = (name: string, type: string): FileCategory => {
    const n = name.toLowerCase();
    const t = type.toLowerCase();
    if (n.endsWith('.pdf') || t.includes('pdf')) return 'pdf';
    if (
      n.endsWith('.ppt') ||
      n.endsWith('.pptx') ||
      t.includes('presentation') ||
      t.includes('powerpoint')
    )
      return 'ppt';
    if (
      n.endsWith('.xls') ||
      n.endsWith('.xlsx') ||
      n.endsWith('.csv') ||
      t.includes('spreadsheet') ||
      t.includes('excel')
    )
      return 'excel';
    if (
      n.endsWith('.doc') ||
      n.endsWith('.docx') ||
      n.endsWith('.txt') ||
      t.includes('word') ||
      t.includes('document')
    )
      return 'doc';
    if (
      t.startsWith('video/') ||
      t.startsWith('audio/') ||
      t.startsWith('image/') ||
      n.endsWith('.mp4') ||
      n.endsWith('.webm') ||
      n.endsWith('.mov') ||
      n.endsWith('.mp3') ||
      n.endsWith('.wav') ||
      n.endsWith('.m4a') ||
      n.endsWith('.png') ||
      n.endsWith('.jpg') ||
      n.endsWith('.jpeg')
    )
      return 'media';
    if (
      n.endsWith('.zip') ||
      n.endsWith('.rar') ||
      n.endsWith('.7z') ||
      t.includes('zip') ||
      t.includes('tar') ||
      t.includes('compressed')
    )
      return 'archive';
    return 'doc';
  };

  // Filtered & Sorted files list
  const filteredAndSortedFiles = useMemo(() => {
    let result = [...subjectFiles];

    // Module filter
    if (selectedModule !== 'All') {
      result = result.filter((f) => f.moduleTag === selectedModule);
    }

    // Category filter
    if (categoryFilter !== 'all') {
      result = result.filter((f) => getFileCategory(f.name, f.type) === categoryFilter);
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (f) =>
          f.name.toLowerCase().includes(q) ||
          f.moduleTag.toLowerCase().includes(q)
      );
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime();
      }
      if (sortBy === 'oldest') {
        return new Date(a.uploadDate).getTime() - new Date(b.uploadDate).getTime();
      }
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      if (sortBy === 'size-desc') {
        return b.size - a.size;
      }
      if (sortBy === 'size-asc') {
        return a.size - b.size;
      }
      return 0;
    });

    return result;
  }, [subjectFiles, selectedModule, categoryFilter, searchQuery, sortBy]);

  // Handle batch file upload
  const handleFiles = async (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    const filesArray = Array.from(fileList);

    setIsUploading(true);
    setUploadSuccess(null);
    setUploadProgress({
      current: 0,
      total: filesArray.length,
      currentFileName: filesArray[0].name,
      currentFileSize: filesArray[0].size,
      percent: 0,
    });

    try {
      await uploadFilesBatch(
        filesArray,
        subject.code,
        uploadModuleTag,
        (progress) => {
          setUploadProgress(progress);
        }
      );

      const totalBytes = filesArray.reduce((acc, f) => acc + f.size, 0);
      setUploadSuccess(
        `Successfully saved ${filesArray.length} file(s) (${formatFileSize(totalBytes)}) directly into local IndexedDB for ${subject.code}.`
      );
      triggerStudyConfetti();
    } catch (err) {
      alert(`Upload failed: ${(err as Error).message}`);
    } finally {
      setIsUploading(false);
      setUploadProgress(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDownloadSingle = async (fileId: string, fileName: string) => {
    const fileWithBlob = await loadFileBlob(fileId);
    if (!fileWithBlob || !fileWithBlob.blob) {
      alert('File blob could not be retrieved from local IndexedDB.');
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

  const handleDeleteSingle = async (fileId: string, fileName: string) => {
    if (window.confirm(`Are you sure you want to delete "${fileName}" from your local vault?`)) {
      await deleteFile(fileId);
      setSelectedFileIds((prev) => prev.filter((id) => id !== fileId));
    }
  };

  // Bulk actions
  const handleSelectAll = () => {
    if (selectedFileIds.length === filteredAndSortedFiles.length) {
      setSelectedFileIds([]);
    } else {
      setSelectedFileIds(filteredAndSortedFiles.map((f) => f.id));
    }
  };

  const handleToggleSelect = (fileId: string) => {
    setSelectedFileIds((prev) =>
      prev.includes(fileId) ? prev.filter((id) => id !== fileId) : [...prev, fileId]
    );
  };

  const handleDeleteSelected = async () => {
    if (selectedFileIds.length === 0) return;
    if (
      window.confirm(
        `Are you sure you want to permanently delete the ${selectedFileIds.length} selected file(s) from your local vault?`
      )
    ) {
      await deleteFilesBatch(selectedFileIds);
      setSelectedFileIds([]);
    }
  };

  const handleDownloadSelected = async () => {
    if (selectedFileIds.length === 0) return;
    for (const id of selectedFileIds) {
      const meta = files.find((f) => f.id === id);
      if (meta) {
        await handleDownloadSingle(meta.id, meta.name);
      }
    }
  };

  const getFileIcon = (fileName: string, fileType: string) => {
    const cat = getFileCategory(fileName, fileType);
    if (cat === 'pdf') {
      return <FileText className="w-5 h-5 text-rose-600 dark:text-rose-400" />;
    }
    if (cat === 'ppt') {
      return <Presentation className="w-5 h-5 text-amber-600" />;
    }
    if (cat === 'excel') {
      return <FileSpreadsheet className="w-5 h-5 text-emerald-600" />;
    }
    if (cat === 'archive') {
      return <Archive className="w-5 h-5 text-orange-600" />;
    }
    if (cat === 'media') {
      if (fileType.includes('video') || fileName.match(/\.(mp4|webm|mov)$/i)) {
        return <Video className="w-5 h-5 text-purple-600 dark:text-purple-400" />;
      }
      if (fileType.includes('audio') || fileName.match(/\.(mp3|wav|m4a)$/i)) {
        return <Music className="w-5 h-5 text-pink-600 dark:text-pink-400" />;
      }
      return <ImageIcon className="w-5 h-5 text-teal-600 dark:text-teal-400" />;
    }
    return <File className="w-5 h-5 text-[#004B93] dark:text-[#38BDF8]" />;
  };

  // Calculate subject total size
  const subjectTotalSize = useMemo(() => {
    return subjectFiles.reduce((acc, f) => acc + f.size, 0);
  }, [subjectFiles]);

  return (
    <div className="space-y-6">
      {/* Storage Capacity & Persistence Status Card */}
      <div className="bg-[#F4F7FA]/90 dark:bg-slate-800/60 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3.5">
          <div className="p-3 rounded-2xl bg-[#004B93] text-white shadow-md">
            <HardDrive className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h4 className="text-sm font-extrabold text-[#0F172A] dark:text-white">
                High-Capacity Offline IndexedDB Vault
              </h4>
              <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300">
                <ShieldCheck className="w-3 h-3" />
                <span>Zero Cloud • 100% Private</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Supports large files (up to 1 GB+ per file, videos & slide decks). Stored directly on disk via Chromium IndexedDB.
            </p>
          </div>
        </div>

        {/* Quota stats */}
        <div className="flex items-center gap-3 self-start md:self-auto text-xs bg-white dark:bg-slate-900/80 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700/80">
          <div className="text-right">
            <p className="text-[11px] text-slate-400 font-medium">Vault Footprint</p>
            <p className="font-mono font-bold text-[#004B93] dark:text-[#38BDF8]">
              {formatFileSize(storageUsage.totalBytes)} ({storageUsage.fileCount} files)
            </p>
          </div>
          {storageUsage.quotaBytes && (
            <>
              <div className="h-8 w-px bg-slate-200 dark:bg-slate-700" />
              <div>
                <p className="text-[11px] text-slate-400 font-medium">Available Disk Quota</p>
                <p className="font-mono font-bold text-slate-700 dark:text-slate-200">
                  ~{formatFileSize(storageUsage.quotaBytes)}
                </p>
              </div>
            </>
          )}
          {!storageUsage.isPersistent && (
            <button
              onClick={() => requestPersistentStorage()}
              className="ml-2 px-2.5 py-1 text-[11px] font-bold rounded-lg bg-[#EBF3FA] hover:bg-[#D6E6F5] text-[#004B93] dark:bg-slate-800 dark:text-[#38BDF8] transition"
              title="Request browser to prevent storage eviction"
            >
              Enable Persistent
            </button>
          )}
        </div>
      </div>

      {/* Upload Drop Zone & Target Module */}
      <div className="bg-white dark:bg-[#111827] rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        {/* Module tag selector */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800/80">
          <div className="flex items-center space-x-2">
            <FolderOpen className="w-4 h-4 text-[#004B93] dark:text-[#38BDF8]" />
            <span className="text-xs font-bold text-[#0F172A] dark:text-white uppercase tracking-wider">
              Upload Target for {subject.code}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 whitespace-nowrap">
              Tag Files With Module:
            </label>
            <input
              type="text"
              placeholder="e.g. Session 1 Slides, Coursepack, Case Study"
              value={uploadModuleTag}
              onChange={(e) => setUploadModuleTag(e.target.value)}
              className="px-3 py-1.5 text-xs bg-[#F4F7FA] dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 font-medium focus:outline-none focus:ring-2 focus:ring-[#004B93] min-w-[220px]"
            />
          </div>
        </div>

        {/* Interactive Drag & Drop Box */}
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
          className={`border-2 border-dashed rounded-2xl p-7 text-center cursor-pointer transition-all ${
            isDragging
              ? 'border-[#004B93] bg-[#EBF3FA] dark:bg-slate-800/80 scale-[1.01]'
              : 'border-[#D6E6F5] dark:border-slate-700 hover:border-[#004B93] bg-[#F4F7FA]/40 dark:bg-[#0B1120]'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".pdf,.ppt,.pptx,.doc,.docx,.xls,.xlsx,.csv,.txt,.zip,.rar,.7z,.mp4,.mov,.webm,.mp3,.m4a,.wav,.png,.jpg,.jpeg,.webp"
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />

          <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-[#EBF3FA] dark:bg-slate-800 text-[#004B93] dark:text-[#38BDF8] flex items-center justify-center shadow-sm">
            {isUploading ? (
              <Loader2 className="w-7 h-7 animate-spin" />
            ) : (
              <UploadCloud className="w-7 h-7" />
            )}
          </div>

          <h3 className="text-sm font-extrabold text-[#0F172A] dark:text-white">
            {isUploading
              ? 'Storing Binary Blobs into IndexedDB...'
              : `Drop Any Course Materials for ${subject.code} (${subject.name}) Here`}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xl mx-auto">
            Drop single files or <span className="font-bold text-slate-700 dark:text-slate-300">entire batches</span>. Supports <span className="font-semibold text-slate-700 dark:text-slate-300">PDFs, Slide Decks, Excel Models, Word Docs, ZIP archives, Video & Audio recordings</span>.
          </p>

          <button
            type="button"
            className="mt-4 px-5 py-2 text-xs font-bold rounded-xl bg-[#004B93] hover:bg-[#003870] text-white shadow-md transition"
          >
            Select Files to Upload (Batch Supported)
          </button>
        </div>

        {/* Real-time Multi-File Progress Bar */}
        {isUploading && uploadProgress && (
          <div className="p-4 rounded-2xl bg-[#EBF3FA] dark:bg-slate-800 border border-[#D6E6F5] dark:border-slate-700 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[#004B93] dark:text-[#38BDF8] flex items-center space-x-1.5">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>
                  Uploading file {uploadProgress.current} of {uploadProgress.total}:{' '}
                  <span className="font-mono">{uploadProgress.currentFileName}</span>
                </span>
              </span>
              <span className="font-mono font-bold text-slate-700 dark:text-slate-200">
                {uploadProgress.percent}% ({formatFileSize(uploadProgress.currentFileSize)})
              </span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-[#004B93] h-full transition-all duration-150 rounded-full"
                style={{ width: `${uploadProgress.percent}%` }}
              />
            </div>
          </div>
        )}

        {/* Success message */}
        {uploadSuccess && (
          <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 text-xs flex items-center space-x-2 border border-emerald-200 dark:border-emerald-800 animate-in fade-in">
            <CheckCircle className="w-4 h-4 shrink-0" />
            <span>{uploadSuccess}</span>
          </div>
        )}
      </div>

      {/* Files Section: Toolbar with Search, Category Filter, Sort, View Toggle */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <h4 className="text-sm font-extrabold text-[#0F172A] dark:text-white flex items-center space-x-2">
              <FolderOpen className="w-4 h-4 text-[#004B93] dark:text-[#38BDF8]" />
              <span>
                Vault Contents for {subject.code} ({subjectFiles.length}{' '}
                {subjectFiles.length === 1 ? 'file' : 'files'} • {formatFileSize(subjectTotalSize)})
              </span>
            </h4>
          </div>

          {/* View Toggle */}
          <div className="flex items-center space-x-2 self-end md:self-auto">
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg text-xs font-semibold transition ${
                  viewMode === 'grid'
                    ? 'bg-white dark:bg-slate-700 text-[#004B93] dark:text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
                }`}
                title="Grid Card View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-lg text-xs font-semibold transition ${
                  viewMode === 'table'
                    ? 'bg-white dark:bg-slate-700 text-[#004B93] dark:text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
                }`}
                title="Table List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white dark:bg-[#111827] p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            {/* Search input */}
            <div className="md:col-span-5 relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search files by name or module tag..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-[#F4F7FA] dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#004B93]"
              />
            </div>

            {/* Module dropdown filter */}
            <div className="md:col-span-4 flex items-center space-x-2">
              <label className="text-xs font-bold text-slate-500 shrink-0">Module:</label>
              <select
                value={selectedModule}
                onChange={(e) => setSelectedModule(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#F4F7FA] dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 font-semibold focus:outline-none focus:ring-2 focus:ring-[#004B93]"
              >
                <option value="All">All Modules ({subjectFiles.length})</option>
                {uniqueModules.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="md:col-span-3 flex items-center space-x-2">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="w-full px-3 py-2 text-xs bg-[#F4F7FA] dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 font-semibold focus:outline-none focus:ring-2 focus:ring-[#004B93]"
              >
                <option value="newest">Newest Uploads</option>
                <option value="oldest">Oldest First</option>
                <option value="name">File Name (A–Z)</option>
                <option value="size-desc">Largest Size First</option>
                <option value="size-asc">Smallest Size First</option>
              </select>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100 dark:border-slate-800/80">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">
              Types:
            </span>
            {(
              [
                { id: 'all', label: 'All Files' },
                { id: 'pdf', label: 'PDFs' },
                { id: 'ppt', label: 'Slide Decks (PPT)' },
                { id: 'excel', label: 'Sheets (XLSX/CSV)' },
                { id: 'doc', label: 'Docs' },
                { id: 'media', label: 'Media (Video/Audio)' },
                { id: 'archive', label: 'Archives (ZIP)' },
              ] as const
            ).map((cat) => {
              const isActive = categoryFilter === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setCategoryFilter(cat.id)}
                  className={`px-3 py-1 text-xs font-bold rounded-xl transition ${
                    isActive
                      ? 'bg-[#004B93] text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Multi-Selection Action Bar (appears when items are selected) */}
        {selectedFileIds.length > 0 && (
          <div className="p-3 bg-[#EBF3FA] dark:bg-slate-800 rounded-2xl border border-[#D6E6F5] dark:border-slate-700 flex items-center justify-between animate-in fade-in">
            <div className="flex items-center space-x-3">
              <button
                onClick={handleSelectAll}
                className="flex items-center space-x-1.5 text-xs font-bold text-[#004B93] dark:text-[#38BDF8]"
              >
                <CheckSquare className="w-4 h-4" />
                <span>
                  {selectedFileIds.length} of {filteredAndSortedFiles.length} Selected
                </span>
              </button>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={handleDownloadSelected}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-bold rounded-xl bg-white dark:bg-slate-700 hover:bg-slate-50 text-slate-700 dark:text-white border border-slate-200 dark:border-slate-600 transition shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download ({selectedFileIds.length})</span>
              </button>

              <button
                onClick={handleDeleteSelected}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-bold rounded-xl bg-rose-600 hover:bg-rose-700 text-white transition shadow-sm"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Selected</span>
              </button>
            </div>
          </div>
        )}

        {/* Files Display: Empty State vs Grid vs Table */}
        {filteredAndSortedFiles.length === 0 ? (
          <div className="p-12 text-center bg-white dark:bg-[#111827] rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 text-xs text-slate-400 space-y-2">
            <FolderOpen className="w-8 h-8 mx-auto text-slate-300 dark:text-slate-600" />
            <p className="font-semibold text-slate-600 dark:text-slate-300">
              No files found matching your filters.
            </p>
            <p className="text-slate-400">
              Drag & drop lecture slides, case studies, or video recordings above to store them directly in your browser.
            </p>
          </div>
        ) : viewMode === 'grid' ? (
          /* Grid View */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3.5">
            {filteredAndSortedFiles.map((file) => {
              const isSelected = selectedFileIds.includes(file.id);
              return (
                <div
                  key={file.id}
                  className={`p-4 bg-white dark:bg-[#111827] rounded-2xl border transition shadow-sm hover:shadow-md flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'border-[#004B93] bg-[#F4F7FA]/70 dark:bg-slate-800/50 ring-2 ring-[#004B93]/20'
                      : 'border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <div className="flex items-center space-x-3 overflow-hidden min-w-0">
                    {/* Checkbox */}
                    <button
                      onClick={() => handleToggleSelect(file.id)}
                      className="text-slate-400 hover:text-[#004B93] dark:hover:text-[#38BDF8] shrink-0"
                    >
                      {isSelected ? (
                        <CheckSquare className="w-4 h-4 text-[#004B93] dark:text-[#38BDF8]" />
                      ) : (
                        <Square className="w-4 h-4" />
                      )}
                    </button>

                    {/* Icon */}
                    <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 shrink-0">
                      {getFileIcon(file.name, file.type)}
                    </div>

                    {/* Metadata */}
                    <div className="truncate min-w-0">
                      <p
                        className="text-xs font-bold text-slate-900 dark:text-white truncate cursor-pointer hover:text-[#004B93] dark:hover:text-[#38BDF8]"
                        onClick={() => openFilePreview(file.id)}
                        title={file.name}
                      >
                        {file.name}
                      </p>
                      <div className="flex items-center space-x-2 text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        <span className="font-semibold text-[#004B93] dark:text-[#38BDF8] truncate max-w-[130px]">
                          {file.moduleTag}
                        </span>
                        <span>•</span>
                        <span className="font-mono font-medium">{formatFileSize(file.size)}</span>
                        <span>•</span>
                        <span>{formatDate(file.uploadDate)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-1.5 shrink-0">
                    <button
                      onClick={() => openFilePreview(file.id)}
                      className="inline-flex items-center space-x-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition"
                      title="Preview in Browser"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Preview</span>
                    </button>

                    <button
                      onClick={() => handleDownloadSingle(file.id, file.name)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-[#004B93] hover:bg-[#EBF3FA] dark:hover:bg-slate-800 dark:hover:text-[#38BDF8] transition"
                      title="Download Blob"
                    >
                      <Download className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleDeleteSingle(file.id, file.name)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-slate-800 transition"
                      title="Delete File"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Table View (ideal for high file volumes) */
          <div className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F4F7FA] dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700">
                  <tr>
                    <th className="py-3 px-4 w-10">
                      <button
                        onClick={handleSelectAll}
                        className="text-slate-400 hover:text-[#004B93]"
                      >
                        {selectedFileIds.length === filteredAndSortedFiles.length &&
                        filteredAndSortedFiles.length > 0 ? (
                          <CheckSquare className="w-4 h-4 text-[#004B93]" />
                        ) : (
                          <Square className="w-4 h-4" />
                        )}
                      </button>
                    </th>
                    <th className="py-3 px-4 font-bold">File Name</th>
                    <th className="py-3 px-4 font-bold">Module Tag</th>
                    <th className="py-3 px-4 font-bold">Size</th>
                    <th className="py-3 px-4 font-bold">Uploaded Date</th>
                    <th className="py-3 px-4 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredAndSortedFiles.map((file) => {
                    const isSelected = selectedFileIds.includes(file.id);
                    return (
                      <tr
                        key={file.id}
                        className={`hover:bg-[#F4F7FA]/70 dark:hover:bg-slate-800/50 transition ${
                          isSelected ? 'bg-[#EBF3FA]/60 dark:bg-slate-800/40' : ''
                        }`}
                      >
                        <td className="py-3 px-4">
                          <button
                            onClick={() => handleToggleSelect(file.id)}
                            className="text-slate-400 hover:text-[#004B93]"
                          >
                            {isSelected ? (
                              <CheckSquare className="w-4 h-4 text-[#004B93] dark:text-[#38BDF8]" />
                            ) : (
                              <Square className="w-4 h-4" />
                            )}
                          </button>
                        </td>
                        <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">
                          <div className="flex items-center space-x-2.5">
                            <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 shrink-0">
                              {getFileIcon(file.name, file.type)}
                            </div>
                            <span
                              onClick={() => openFilePreview(file.id)}
                              className="cursor-pointer hover:text-[#004B93] dark:hover:text-[#38BDF8] truncate max-w-xs md:max-w-md"
                              title={file.name}
                            >
                              {file.name}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-semibold text-[#004B93] dark:text-[#38BDF8] bg-[#EBF3FA] dark:bg-slate-800 px-2.5 py-0.5 rounded-full text-[11px]">
                            {file.moduleTag}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-mono text-slate-600 dark:text-slate-300">
                          {formatFileSize(file.size)}
                        </td>
                        <td className="py-3 px-4 text-slate-500 dark:text-slate-400">
                          {formatDate(file.uploadDate)}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end space-x-1.5">
                            <button
                              onClick={() => openFilePreview(file.id)}
                              className="p-1.5 rounded-lg text-slate-500 hover:text-[#004B93] hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                              title="Preview"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDownloadSingle(file.id, file.name)}
                              className="p-1.5 rounded-lg text-slate-500 hover:text-[#004B93] hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                              title="Download"
                            >
                              <Download className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteSingle(file.id, file.name)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-slate-800 transition"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
