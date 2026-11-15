import React, { useState, useRef } from 'react';
import { useLMS } from '../../context/LMSContext';
import { Assignment } from '../../types';
import { getTimeRemaining, formatDate } from '../../utils/formatters';
import {
  FileCheck2,
  Plus,
  CheckCircle2,
  Clock,
  Filter,
  Flame,
  Upload,
  FileSpreadsheet,
  FileText,
  Eye,
  Download,
  Trash2,
} from 'lucide-react';
import { playStudyChime } from '../../utils/sound';

interface AssignmentsHubViewProps {
  onOpenNewAssignment: () => void;
}

export const AssignmentsHubView: React.FC<AssignmentsHubViewProps> = ({
  onOpenNewAssignment,
}) => {
  const {
    assignments,
    subjects,
    submitAssignmentWithFile,
    updateAssignment,
    deleteAssignment,
    importAssignmentsExcel,
    openFilePreview,
    loadFileBlob,
  } = useLMS();

  const [filterSubject, setFilterSubject] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const excelFileRef = useRef<HTMLInputElement>(null);

  const filtered = assignments.filter((a) => {
    if (filterSubject !== 'all' && a.subjectId !== filterSubject) return false;
    if (filterStatus !== 'all' && a.status !== filterStatus) return false;
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (a.status === 'Submitted' && b.status !== 'Submitted') return 1;
    if (a.status !== 'Submitted' && b.status === 'Submitted') return -1;
    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
  });

  const handleFileUpload = async (assignmentId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await submitAssignmentWithFile(assignmentId, file);
  };

  const handleExcelUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await importAssignmentsExcel(file);
    if (excelFileRef.current) excelFileRef.current.value = '';
  };

  const handleDownloadSubmission = async (fileId: string, fileName: string) => {
    const fileWithBlob = await loadFileBlob(fileId);
    if (!fileWithBlob || !fileWithBlob.blob) {
      alert('Could not retrieve submission file from local storage.');
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

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-5 sm:p-6 bg-gradient-to-r from-[#004B93] via-[#003870] to-[#002B5B] text-white rounded-3xl shadow-sm border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            Assignments & Deadlines
          </h2>
          <p className="text-xs text-slate-300 mt-0.5">
            {assignments.length} total tasks ({assignments.filter((a) => a.status === 'Submitted').length} submitted)
          </p>
        </div>

        <div className="flex items-center space-x-2 flex-wrap gap-y-2 shrink-0">
          <input
            ref={excelFileRef}
            type="file"
            accept=".xlsx,.xls,.csv"
            className="hidden"
            onChange={handleExcelUpload}
          />
          <button
            onClick={() => excelFileRef.current?.click()}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
            <span>Import Excel</span>
          </button>

          <button
            onClick={onOpenNewAssignment}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-white text-[#004B93] hover:bg-[#EBF3FA] font-bold text-xs shadow-sm transition"
          >
            <Plus className="w-4 h-4" />
            <span>Add Task</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-white dark:bg-[#111827] rounded-2xl border border-slate-200 dark:border-slate-800">
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Filter By:</span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <select
            value={filterSubject}
            onChange={(e) => setFilterSubject(e.target.value)}
            className="px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 font-medium"
          >
            <option value="all">All HSB Courses ({assignments.length})</option>
            {subjects.map((s) => (
              <option key={s.code} value={s.code}>
                {s.code} • {s.name}
              </option>
            ))}
          </select>

          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-semibold">
            {['all', 'Pending', 'In Progress', 'Submitted'].map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-3 py-1 rounded-lg transition capitalize ${
                  filterStatus === st
                    ? 'bg-hsb-navy text-hsb-cyan shadow-sm border border-hsb-royal/40'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Deliverables List (Starts empty) */}
      <div className="space-y-3">
        {sorted.length === 0 ? (
          <div className="p-16 text-center bg-white dark:bg-[#111827] rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 text-xs text-slate-400 space-y-3">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-hsb-royal dark:text-hsb-cyan flex items-center justify-center">
              <FileCheck2 className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
              No Assignments or Deadlines Logged Yet
            </h4>
            <p className="text-slate-400 max-w-md mx-auto">
              Your tracker starts clean. Click below to add an assignment deadline or upload an Excel schedule (.xlsx/.csv).
            </p>
            <div className="flex justify-center gap-2 pt-2">
              <button
                onClick={onOpenNewAssignment}
                className="px-4 py-2 rounded-xl bg-hsb-royal text-white font-bold text-xs"
              >
                + Add Deliverable
              </button>
              <button
                onClick={() => excelFileRef.current?.click()}
                className="px-4 py-2 rounded-xl border text-slate-700 dark:text-slate-300 font-semibold text-xs"
              >
                Import from Excel
              </button>
            </div>
          </div>
        ) : (
          sorted.map((asg) => {
            const subject = subjects.find(
              (s) => s.code === asg.subjectId || s.id === asg.subjectId
            );
            const isSubmitted = asg.status === 'Submitted';
            const timeInfo = getTimeRemaining(asg.dueDate, isSubmitted);

            return (
              <div
                key={asg.id}
                className={`p-5 rounded-2xl border transition shadow-sm ${
                  isSubmitted
                    ? 'bg-slate-50/50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 opacity-80'
                    : timeInfo.urgency === 'urgent'
                    ? 'bg-rose-50/50 dark:bg-rose-950/20 border-rose-300 dark:border-rose-900/60'
                    : 'bg-white dark:bg-[#111827] border-slate-200 dark:border-slate-800'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-hsb-navy text-hsb-cyan">
                        {subject?.code || asg.subjectId}
                      </span>
                      <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        {subject?.name}
                      </span>
                      <span className="text-[10px] font-semibold text-slate-400">
                        • Priority: {asg.priority}
                      </span>
                      {asg.weightage && (
                        <span className="text-[10px] text-slate-400">
                          • {asg.weightage}% weight
                        </span>
                      )}
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      {asg.title}
                    </h4>

                    {asg.description && (
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                        {asg.description}
                      </p>
                    )}

                    {/* Attached Submission File */}
                    {asg.submissionFileName && (
                      <div className="mt-2 flex items-center space-x-2 text-xs font-mono text-emerald-600 dark:text-emerald-400">
                        <FileText className="w-3.5 h-3.5" />
                        <span>{asg.submissionFileName}</span>
                        {asg.submissionFileId && (
                          <div className="flex items-center space-x-1.5 ml-2">
                            <button
                              onClick={() => openFilePreview(asg.submissionFileId!)}
                              className="text-xs underline font-semibold text-emerald-700 hover:text-emerald-800"
                            >
                              Preview
                            </button>
                            <span>•</span>
                            <button
                              onClick={() =>
                                handleDownloadSubmission(
                                  asg.submissionFileId!,
                                  asg.submissionFileName!
                                )
                              }
                              className="text-xs underline font-semibold text-emerald-700 hover:text-emerald-800"
                            >
                              Download
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center space-x-3 shrink-0 self-end md:self-center">
                    <div className="text-right">
                      <p className="text-xs font-mono font-bold text-slate-900 dark:text-white">
                        {formatDate(asg.dueDate)}
                      </p>
                      {isSubmitted ? (
                        <span className="inline-flex items-center space-x-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Submitted</span>
                        </span>
                      ) : timeInfo.urgency === 'urgent' ? (
                        <span className="inline-flex items-center space-x-1 text-[11px] font-bold text-rose-600 dark:text-rose-400 animate-pulse">
                          <Flame className="w-3 h-3 fill-current" />
                          <span>{timeInfo.label}</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center space-x-1 text-[11px] font-bold text-amber-600 dark:text-gold-400">
                          <Clock className="w-3 h-3" />
                          <span>{timeInfo.label}</span>
                        </span>
                      )}
                    </div>

                    {!isSubmitted && (
                      <div>
                        <label
                          htmlFor={`asg-hub-sub-${asg.id}`}
                          className="inline-flex items-center space-x-1 px-3 py-1.5 text-xs font-bold rounded-xl bg-blue-50 dark:bg-blue-950/60 text-hsb-royal dark:text-hsb-cyan border border-blue-200 dark:border-blue-900/60 hover:bg-blue-100 cursor-pointer transition shadow-xs"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          <span>Attach File</span>
                        </label>
                        <input
                          id={`asg-hub-sub-${asg.id}`}
                          type="file"
                          accept=".pdf,.ppt,.pptx,.doc,.docx,.xlsx"
                          className="hidden"
                          onChange={(e) => handleFileUpload(asg.id, e)}
                        />
                      </div>
                    )}

                    <select
                      value={asg.status}
                      onChange={(e) =>
                        updateAssignment(asg.id, {
                          status: e.target.value as Assignment['status'],
                        })
                      }
                      className="text-xs font-bold px-2.5 py-1.5 rounded-xl border bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200"
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Submitted">Submitted</option>
                    </select>

                    <button
                      onClick={() => {
                        if (window.confirm('Delete this deliverable?')) {
                          deleteAssignment(asg.id);
                        }
                      }}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
