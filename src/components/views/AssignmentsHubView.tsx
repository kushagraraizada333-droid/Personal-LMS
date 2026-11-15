import React, { useState, useRef } from 'react';
import { useLMS } from '../../context/LMSContext';
import { Assignment, KanbanStage } from '../../types';
import { getTimeRemaining, formatDate } from '../../utils/formatters';
import { UrgencyRing } from '../assignments/UrgencyRing';
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
  Trash2,
  LayoutList,
  Kanban,
  CheckSquare,
  Timer,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { playStudyChime, triggerStudyConfetti, playSoftTick } from '../../utils/sound';

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
    setSelectedAssignmentForFocus,
  } = useLMS();

  const [viewMode, setViewMode] = useState<'list' | 'kanban'>('list');
  const [filterSubject, setFilterSubject] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [draggedAssignmentId, setDraggedAssignmentId] = useState<string | null>(null);
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

  const getStageForAssignment = (a: Assignment): KanbanStage => {
    if (a.kanbanStage) return a.kanbanStage;
    if (a.status === 'Submitted') return 'Submitted';
    if (a.status === 'In Progress') return 'In Progress';
    return 'Queued';
  };

  const handleDropToStage = (assignmentId: string, newStage: KanbanStage) => {
    const target = assignments.find((a) => a.id === assignmentId);
    if (!target) return;

    const isSubmitted = newStage === 'Submitted';
    updateAssignment(assignmentId, {
      kanbanStage: newStage,
      status: isSubmitted
        ? 'Submitted'
        : newStage === 'In Progress' || newStage === 'Drafting/Review'
        ? 'In Progress'
        : 'Pending',
      submittedAt: isSubmitted ? target.submittedAt || new Date().toISOString() : undefined,
    });

    if (isSubmitted) {
      playStudyChime();
      triggerStudyConfetti();
    } else {
      playSoftTick();
    }
    setDraggedAssignmentId(null);
  };

  const kanbanColumns: { stage: KanbanStage; label: string; color: string; bg: string }[] = [
    { stage: 'Queued', label: 'Queued', color: 'text-slate-700 dark:text-slate-300', bg: 'bg-slate-100 dark:bg-slate-800' },
    { stage: 'In Progress', label: 'In Progress', color: 'text-[#004B93] dark:text-[#38BDF8]', bg: 'bg-[#EBF3FA] dark:bg-blue-950/40' },
    { stage: 'Drafting/Review', label: 'Drafting / Review', color: 'text-amber-700 dark:text-amber-300', bg: 'bg-amber-50 dark:bg-amber-950/40' },
    { stage: 'Submitted', label: 'Submitted', color: 'text-emerald-700 dark:text-emerald-300', bg: 'bg-emerald-50 dark:bg-emerald-950/40' },
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-5 sm:p-6 bg-gradient-to-r from-[#004B93] via-[#003870] to-[#002B5B] text-white rounded-3xl shadow-sm border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-[10px] font-mono uppercase font-black px-2 py-0.5 rounded-md bg-white/20 text-white">
              Deliverables & Workflow
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            Assignments & Task Pipeline
          </h2>
          <p className="text-xs text-slate-300 mt-0.5">
            {assignments.length} total tasks ({assignments.filter((a) => a.status === 'Submitted').length} submitted) • Click any card for subtasks & focus timer
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

      {/* View Switcher & Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-white dark:bg-[#111827] rounded-2xl border border-slate-200 dark:border-slate-800">
        {/* Left: View Mode Toggle */}
        <div className="flex items-center space-x-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
          <button
            onClick={() => {
              setViewMode('list');
              playSoftTick();
            }}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-extrabold transition ${
              viewMode === 'list'
                ? 'bg-white dark:bg-[#0F172A] text-[#004B93] dark:text-[#38BDF8] shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <LayoutList className="w-3.5 h-3.5" />
            <span>List View</span>
          </button>

          <button
            onClick={() => {
              setViewMode('kanban');
              playSoftTick();
            }}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-extrabold transition ${
              viewMode === 'kanban'
                ? 'bg-white dark:bg-[#0F172A] text-[#004B93] dark:text-[#38BDF8] shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Kanban className="w-3.5 h-3.5" />
            <span>Kanban Board</span>
          </button>
        </div>

        {/* Right: Subject & Status Filter */}
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

          {viewMode === 'list' && (
            <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-semibold">
              {['all', 'Pending', 'In Progress', 'Submitted'].map((st) => (
                <button
                  key={st}
                  onClick={() => setFilterStatus(st)}
                  className={`px-3 py-1 rounded-lg transition capitalize ${
                    filterStatus === st
                      ? 'bg-[#004B93] text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* VIEW 1: TRADITIONAL LIST VIEW */}
      {viewMode === 'list' && (
        <div className="space-y-3">
          {sorted.length === 0 ? (
            <div className="p-16 text-center bg-white dark:bg-[#111827] rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 text-xs text-slate-400 space-y-3">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-[#004B93] dark:text-[#38BDF8] flex items-center justify-center">
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
                  className="px-4 py-2 rounded-xl bg-[#004B93] text-white font-bold text-xs"
                >
                  + Add Deliverable
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
              const subtasks = asg.subtasks ?? [];
              const completedCount = subtasks.filter((s) => s.completed).length;

              return (
                <div
                  key={asg.id}
                  className={`p-5 rounded-2xl border transition shadow-sm hover:border-[#004B93]/40 ${
                    isSubmitted
                      ? 'bg-slate-50/50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 opacity-85'
                      : timeInfo.urgency === 'urgent'
                      ? 'bg-rose-50/50 dark:bg-rose-950/20 border-rose-300 dark:border-rose-900/60'
                      : 'bg-white dark:bg-[#111827] border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div
                      onClick={() => setSelectedAssignmentForFocus(asg)}
                      className="space-y-1.5 flex-1 cursor-pointer group"
                    >
                      <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                        <span
                          className="text-[10px] font-bold font-mono px-2 py-0.5 rounded text-white shadow-xs"
                          style={{ backgroundColor: subject?.color || '#004B93' }}
                        >
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
                        {asg.kanbanStage && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold">
                            {asg.kanbanStage}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center space-x-2">
                        <h4 className="text-sm font-extrabold text-slate-900 dark:text-white group-hover:text-[#004B93] dark:group-hover:text-[#38BDF8] transition">
                          {asg.title}
                        </h4>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                      </div>

                      {asg.description && (
                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                          {asg.description}
                        </p>
                      )}

                      {/* Productivity Micro-badges: Subtasks & Focus Minutes */}
                      <div className="flex items-center space-x-3 pt-1 text-[11px] text-slate-500">
                        {subtasks.length > 0 && (
                          <span className="flex items-center space-x-1 font-mono font-bold text-slate-700 dark:text-slate-300">
                            <CheckSquare className="w-3.5 h-3.5 text-[#004B93] dark:text-[#38BDF8]" />
                            <span>
                              {completedCount}/{subtasks.length} steps
                            </span>
                          </span>
                        )}
                        {(asg.focusMinutesLogged ?? 0) > 0 && (
                          <span className="flex items-center space-x-1 font-mono font-bold text-indigo-600 dark:text-indigo-400">
                            <Timer className="w-3.5 h-3.5" />
                            <span>{asg.focusMinutesLogged}m focus</span>
                          </span>
                        )}
                      </div>

                      {/* Attached Submission File */}
                      {asg.submissionFileName && (
                        <div className="mt-2 flex items-center space-x-2 text-xs font-mono text-emerald-600 dark:text-emerald-400">
                          <FileText className="w-3.5 h-3.5" />
                          <span>{asg.submissionFileName}</span>
                          {asg.submissionFileId && (
                            <div className="flex items-center space-x-1.5 ml-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  openFilePreview(asg.submissionFileId!);
                                }}
                                className="text-xs underline font-semibold text-emerald-700 hover:text-emerald-800"
                              >
                                Preview
                              </button>
                              <span>•</span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDownloadSubmission(
                                    asg.submissionFileId!,
                                    asg.submissionFileName!
                                  );
                                }}
                                className="text-xs underline font-semibold text-emerald-700 hover:text-emerald-800"
                              >
                                Download
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Right Deadline & Action controls */}
                    <div className="flex items-center space-x-3 shrink-0 self-end md:self-center">
                      <div className="flex items-center space-x-2 text-right">
                        <div>
                          <p className="text-xs font-mono font-bold text-slate-900 dark:text-white">
                            {formatDate(asg.dueDate)}
                          </p>
                          {isSubmitted ? (
                            <span className="inline-flex items-center space-x-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                              <CheckCircle2 className="w-3 h-3" />
                              <span>Submitted</span>
                            </span>
                          ) : timeInfo.urgency === 'urgent' ? (
                            <span className="inline-flex items-center space-x-1 text-[11px] font-bold text-rose-600 dark:text-rose-400">
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

                        {/* Circular SVG Urgency Ring */}
                        <UrgencyRing dueDate={asg.dueDate} isSubmitted={isSubmitted} size={28} />
                      </div>

                      {!isSubmitted && (
                        <div>
                          <label
                            htmlFor={`asg-hub-sub-${asg.id}`}
                            className="inline-flex items-center space-x-1 px-3 py-1.5 text-xs font-bold rounded-xl bg-blue-50 dark:bg-blue-950/60 text-[#004B93] dark:text-[#38BDF8] border border-blue-200 dark:border-blue-900/60 hover:bg-blue-100 cursor-pointer transition shadow-xs"
                          >
                            <Upload className="w-3.5 h-3.5" />
                            <span>Attach</span>
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
                        onChange={(e) => {
                          const newStatus = e.target.value as Assignment['status'];
                          updateAssignment(asg.id, {
                            status: newStatus,
                            kanbanStage: newStatus === 'Submitted' ? 'Submitted' : newStatus === 'In Progress' ? 'In Progress' : 'Queued',
                            submittedAt: newStatus === 'Submitted' ? new Date().toISOString() : undefined,
                          });
                          if (newStatus === 'Submitted') {
                            playStudyChime();
                            triggerStudyConfetti();
                          }
                        }}
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
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 transition"
                        title="Delete task"
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
      )}

      {/* VIEW 2: INTERACTIVE KANBAN BOARD WITH DRAG & DROP */}
      {viewMode === 'kanban' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
          {kanbanColumns.map((col) => {
            const colAssignments = filtered.filter(
              (a) => getStageForAssignment(a) === col.stage
            );

            return (
              <div
                key={col.stage}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => {
                  if (draggedAssignmentId) {
                    handleDropToStage(draggedAssignmentId, col.stage);
                  }
                }}
                className="bg-slate-50/70 dark:bg-slate-900/50 rounded-3xl border border-slate-200 dark:border-slate-800 p-4 min-h-[500px] flex flex-col space-y-3 shadow-xs"
              >
                {/* Column Header */}
                <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-slate-800">
                  <div className="flex items-center space-x-2">
                    <span className={`text-xs font-black uppercase tracking-wider ${col.color}`}>
                      {col.label}
                    </span>
                  </div>
                  <span className="text-xs font-mono font-black px-2 py-0.5 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                    {colAssignments.length}
                  </span>
                </div>

                {/* Column Cards Dropzone */}
                <div className="space-y-3 flex-1">
                  {colAssignments.length === 0 ? (
                    <div className="h-32 flex items-center justify-center border-2 border-dashed border-slate-200 dark:border-slate-800/80 rounded-2xl text-slate-400 text-xs italic">
                      Drop tasks here
                    </div>
                  ) : (
                    colAssignments.map((asg) => {
                      const subject = subjects.find(
                        (s) => s.code === asg.subjectId || s.id === asg.subjectId
                      );
                      const isSubmitted = col.stage === 'Submitted' || asg.status === 'Submitted';
                      const timeInfo = getTimeRemaining(asg.dueDate, isSubmitted);
                      const subtasks = asg.subtasks ?? [];
                      const completedCount = subtasks.filter((s) => s.completed).length;

                      return (
                        <div
                          key={asg.id}
                          draggable
                          onDragStart={() => setDraggedAssignmentId(asg.id)}
                          onClick={() => setSelectedAssignmentForFocus(asg)}
                          className="bg-white dark:bg-[#0F172A] rounded-2xl border border-slate-200 dark:border-slate-800 p-4 space-y-2.5 shadow-xs hover:shadow-md hover:border-[#004B93]/50 cursor-grab active:cursor-grabbing transition group select-none"
                        >
                          {/* Subject & Priority tag */}
                          <div className="flex items-center justify-between">
                            <span
                              className="text-[10px] font-mono font-black px-2 py-0.5 rounded text-white shadow-xs"
                              style={{ backgroundColor: subject?.color || '#004B93' }}
                            >
                              {asg.subjectId}
                            </span>
                            <span
                              className={`text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded ${
                                asg.priority === 'High'
                                  ? 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
                                  : asg.priority === 'Medium'
                                  ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                                  : 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300'
                              }`}
                            >
                              {asg.priority}
                            </span>
                          </div>

                          {/* Title */}
                          <h5 className="text-xs font-extrabold text-slate-900 dark:text-white group-hover:text-[#004B93] dark:group-hover:text-[#38BDF8] line-clamp-2 leading-snug">
                            {asg.title}
                          </h5>

                          {/* Subtasks & Focus minutes summary */}
                          {(subtasks.length > 0 || (asg.focusMinutesLogged ?? 0) > 0) && (
                            <div className="flex items-center space-x-2.5 text-[10px] text-slate-500 pt-0.5">
                              {subtasks.length > 0 && (
                                <span className="flex items-center space-x-1 font-mono font-bold">
                                  <CheckSquare className="w-3 h-3 text-[#004B93] dark:text-[#38BDF8]" />
                                  <span>
                                    {completedCount}/{subtasks.length}
                                  </span>
                                </span>
                              )}
                              {(asg.focusMinutesLogged ?? 0) > 0 && (
                                <span className="flex items-center space-x-1 font-mono font-bold text-indigo-600 dark:text-indigo-400">
                                  <Timer className="w-3 h-3" />
                                  <span>{asg.focusMinutesLogged}m</span>
                                </span>
                              )}
                            </div>
                          )}

                          {/* Footer: Urgency Ring & Due Date */}
                          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px]">
                            <span className="font-mono text-slate-500 dark:text-slate-400 font-semibold truncate max-w-[120px]">
                              {formatDate(asg.dueDate).split(',')[0]}
                            </span>
                            <div className="flex items-center space-x-1.5 shrink-0">
                              <UrgencyRing
                                dueDate={asg.dueDate}
                                isSubmitted={isSubmitted}
                                size={22}
                                strokeWidth={2.5}
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
