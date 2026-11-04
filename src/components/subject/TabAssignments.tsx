import React, { useState, useRef } from 'react';
import { useLMS } from '../../context/LMSContext';
import { Subject, Assignment } from '../../types';
import { getTimeRemaining, formatDate } from '../../utils/formatters';
import {
  FileCheck2,
  Plus,
  CheckCircle2,
  Clock,
  Upload,
  FileText,
  Trash2,
  Eye,
  Download,
  Flame,
  FileSpreadsheet,
} from 'lucide-react';
import { playStudyChime } from '../../utils/sound';

interface TabAssignmentsProps {
  subject: Subject;
  onOpenNewAssignment: () => void;
}

export const TabAssignments: React.FC<TabAssignmentsProps> = ({
  subject,
  onOpenNewAssignment,
}) => {
  const {
    assignments,
    updateAssignment,
    deleteAssignment,
    submitAssignmentWithFile,
    openFilePreview,
    loadFileBlob,
    importAssignmentsExcel,
  } = useLMS();

  const [filterStatus, setFilterStatus] = useState<'All' | 'Pending' | 'In Progress' | 'Submitted'>('All');
  const excelFileRef = useRef<HTMLInputElement>(null);

  const subjectAssignments = assignments.filter(
    (a) => a.subjectId === subject.code || a.subjectId === subject.id
  );

  const filteredAssignments =
    filterStatus === 'All'
      ? subjectAssignments
      : subjectAssignments.filter((a) => a.status === filterStatus);

  const handleStatusChange = async (asgId: string, newStatus: Assignment['status']) => {
    await updateAssignment(asgId, {
      status: newStatus,
      submittedAt: newStatus === 'Submitted' ? new Date().toISOString() : undefined,
    });
    if (newStatus === 'Submitted') {
      playStudyChime();
    }
  };

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
      {/* Top Bar with Filter & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
            <FileCheck2 className="w-5 h-5 text-hsb-royal dark:text-hsb-cyan" />
            <span>Assignments & Case Submissions • {subject.code}</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Log deadlines or upload completed submission proofs directly into IndexedDB
          </p>
        </div>

        <div className="flex items-center space-x-2 flex-wrap gap-y-2">
          {/* Status Filters */}
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-semibold">
            {(['All', 'Pending', 'In Progress', 'Submitted'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-3 py-1 rounded-lg transition ${
                  filterStatus === st
                    ? 'bg-hsb-navy text-hsb-cyan shadow-sm border border-hsb-royal/40'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          {/* Import Schedule */}
          <input
            ref={excelFileRef}
            type="file"
            accept=".xlsx,.xls,.csv"
            className="hidden"
            onChange={handleExcelUpload}
          />
          <button
            onClick={() => excelFileRef.current?.click()}
            className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 transition"
            title="Import assignments from Excel (.xlsx/.csv)"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
            <span>Import Schedule</span>
          </button>

          <button
            onClick={onOpenNewAssignment}
            className="inline-flex items-center space-x-1 px-3.5 py-1.5 rounded-xl bg-hsb-royal hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Deliverable</span>
          </button>
        </div>
      </div>

      {/* Assignments List (Starts empty) */}
      {filteredAssignments.length === 0 ? (
        <div className="p-12 text-center bg-white dark:bg-[#111827] rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 text-xs text-slate-400">
          No assignments logged for {subject.code} yet. Click &quot;Add Deliverable&quot; above to add your first deadline or upload an Excel schedule.
        </div>
      ) : (
        <div className="space-y-4">
          {filteredAssignments.map((asg) => {
            const isSubmitted = asg.status === 'Submitted';
            const timeInfo = getTimeRemaining(asg.dueDate, isSubmitted);

            return (
              <div
                key={asg.id}
                className={`p-5 rounded-2xl border transition shadow-sm ${
                  isSubmitted
                    ? 'bg-slate-50/60 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800'
                    : timeInfo.urgency === 'urgent'
                    ? 'bg-rose-50/50 dark:bg-rose-950/20 border-rose-300 dark:border-rose-900/60'
                    : 'bg-white dark:bg-[#111827] border-slate-200 dark:border-slate-800'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  {/* Left Column */}
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      {isSubmitted ? (
                        <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Submitted</span>
                        </span>
                      ) : timeInfo.urgency === 'urgent' ? (
                        <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300 border border-rose-300 dark:border-rose-700 animate-pulse">
                          <Flame className="w-3.5 h-3.5 fill-current text-rose-600" />
                          <span>{timeInfo.label}</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-gold-400 border border-amber-300 dark:border-amber-800">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{timeInfo.label}</span>
                        </span>
                      )}

                      <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        Priority: {asg.priority}
                      </span>

                      {asg.weightage && (
                        <span className="text-xs font-mono text-slate-500">
                          {asg.weightage}% weight
                        </span>
                      )}

                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        Due: {formatDate(asg.dueDate)}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-slate-900 dark:text-white">
                      {asg.title}
                    </h4>

                    {asg.description && (
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        {asg.description}
                      </p>
                    )}

                    {/* Submission Attachment Details */}
                    {asg.submissionFileName ? (
                      <div className="mt-3 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-xs text-emerald-800 dark:text-emerald-300 font-medium">
                          <FileText className="w-4 h-4 text-emerald-600" />
                          <span className="font-semibold">Submitted File:</span>
                          <span className="font-mono">{asg.submissionFileName}</span>
                        </div>

                        <div className="flex items-center space-x-2">
                          {asg.submissionFileId && (
                            <>
                              <button
                                onClick={() => openFilePreview(asg.submissionFileId!)}
                                className="inline-flex items-center space-x-1 px-2.5 py-1 text-xs font-bold rounded-lg bg-emerald-700 text-white hover:bg-emerald-800 transition"
                              >
                                <Eye className="w-3 h-3" />
                                <span>Preview</span>
                              </button>
                              <button
                                onClick={() =>
                                  handleDownloadSubmission(
                                    asg.submissionFileId!,
                                    asg.submissionFileName!
                                  )
                                }
                                className="p-1 rounded-lg text-emerald-700 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition"
                                title="Download File"
                              >
                                <Download className="w-4 h-4" />
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="pt-2 flex items-center space-x-3">
                        <label
                          htmlFor={`file-sub-${asg.id}`}
                          className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-xl border border-dashed border-hsb-royal/60 dark:border-hsb-cyan/60 bg-blue-50/50 dark:bg-blue-950/30 text-hsb-royal dark:text-hsb-cyan hover:bg-blue-100 font-semibold text-xs cursor-pointer transition shadow-xs"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          <span>Attach Completed Assignment (.pdf, .docx, .pptx, .xlsx)</span>
                        </label>
                        <input
                          id={`file-sub-${asg.id}`}
                          type="file"
                          accept=".pdf,.ppt,.pptx,.doc,.docx,.xlsx"
                          className="hidden"
                          onChange={(e) => handleFileUpload(asg.id, e)}
                        />
                      </div>
                    )}
                  </div>

                  {/* Right Column */}
                  <div className="flex md:flex-col items-center md:items-end justify-between gap-3 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-slate-800">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-semibold text-slate-500">Status:</span>
                      <select
                        value={asg.status}
                        onChange={(e) =>
                          handleStatusChange(asg.id, e.target.value as Assignment['status'])
                        }
                        className={`text-xs font-bold px-3 py-1.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-hsb-royal ${
                          asg.status === 'Submitted'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300'
                            : asg.status === 'In Progress'
                            ? 'bg-amber-50 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-gold-400'
                            : 'bg-white text-slate-700 border-slate-300 dark:bg-slate-800 dark:text-slate-300'
                        }`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Submitted">Submitted</option>
                      </select>
                    </div>

                    <button
                      onClick={() => {
                        if (window.confirm('Delete this deliverable?')) {
                          deleteAssignment(asg.id);
                        }
                      }}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-slate-800 transition"
                      title="Delete Deliverable"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
