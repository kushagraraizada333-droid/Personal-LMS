import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useLMS } from '../../context/LMSContext';
import {
  Search,
  BookOpen,
  CheckSquare,
  FileText,
  Calendar,
  BarChart3,
  GraduationCap,
  Clock,
  LayoutDashboard,
  FileSpreadsheet,
  Download,
  Moon,
  Sun,
  X,
  ArrowRight,
  Sparkles,
  Zap,
} from 'lucide-react';
import { playSoftTick, playStudyChime } from '../../utils/sound';

interface CommandItem {
  id: string;
  category: 'Courses' | 'Assignments' | 'Vault Files' | 'Quick Actions';
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  action: () => void;
}

interface CommandPaletteModalProps {
  onOpenSyncExcel?: () => void;
  onOpenNewAssignment?: () => void;
}

export const CommandPaletteModal: React.FC<CommandPaletteModalProps> = ({
  onOpenSyncExcel,
  onOpenNewAssignment,
}) => {
  const {
    isCommandPaletteOpen,
    setIsCommandPaletteOpen,
    subjects,
    assignments,
    files,
    setActiveView,
    setSelectedSubjectCode,
    setSelectedAssignmentForFocus,
    openFilePreview,
    setIsPomodoroModalOpen,
    exportBackup,
  } = useLMS();

  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Global keydown listener for Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(!isCommandPaletteOpen);
        if (!isCommandPaletteOpen) {
          playSoftTick();
        }
      } else if (e.key === 'Escape' && isCommandPaletteOpen) {
        setIsCommandPaletteOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCommandPaletteOpen, setIsCommandPaletteOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isCommandPaletteOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isCommandPaletteOpen]);

  // Build searchable items list
  const allItems = useMemo<CommandItem[]>(() => {
    const list: CommandItem[] = [];

    // 1. Courses (8 Trimester II subjects)
    subjects.forEach((s) => {
      list.push({
        id: `course-${s.code}`,
        category: 'Courses',
        title: `${s.code} — ${s.name}`,
        subtitle: `${s.credits} Credits • Faculty: ${s.faculty}`,
        icon: <BookOpen className="w-4 h-4 text-[#004B93] dark:text-[#38BDF8]" />,
        action: () => {
          setSelectedSubjectCode(s.code);
          setActiveView('subject');
        },
      });
    });

    // 2. Assignments
    assignments.forEach((a) => {
      list.push({
        id: `asg-${a.id}`,
        category: 'Assignments',
        title: a.title,
        subtitle: `${a.subjectId} • Due ${a.dueDate} • Stage: ${a.kanbanStage ?? 'Queued'}`,
        icon: <CheckSquare className="w-4 h-4 text-amber-500" />,
        action: () => {
          setSelectedAssignmentForFocus(a);
          setActiveView('assignments');
        },
      });
    });

    // 3. Vault Files
    files.forEach((f) => {
      list.push({
        id: `file-${f.id}`,
        category: 'Vault Files',
        title: f.name,
        subtitle: `${f.subjectId} • ${f.moduleTag} • Tag: ${f.tag ?? 'General'}`,
        icon: <FileText className="w-4 h-4 text-emerald-600" />,
        action: () => {
          openFilePreview(f.id);
        },
      });
    });

    // 4. Quick Actions
    list.push(
      {
        id: 'action-dashboard',
        category: 'Quick Actions',
        title: 'Jump to Executive Dashboard',
        subtitle: 'Overview of courses, timetable, attendance & deliverables',
        icon: <LayoutDashboard className="w-4 h-4 text-[#004B93] dark:text-[#38BDF8]" />,
        action: () => setActiveView('dashboard'),
      },
      {
        id: 'action-attendance',
        category: 'Quick Actions',
        title: 'Open Attendance Intelligence Tracker',
        subtitle: 'Official sessions, conduct status & simulator mode',
        icon: <GraduationCap className="w-4 h-4 text-blue-600" />,
        action: () => setActiveView('attendance'),
      },
      {
        id: 'action-marks',
        category: 'Quick Actions',
        title: 'Open Marks & Gradebook',
        subtitle: 'Course evaluations, What-If sandbox & CGPA calculation',
        icon: <BarChart3 className="w-4 h-4 text-purple-600" />,
        action: () => setActiveView('gradebook'),
      },
      {
        id: 'action-timetable',
        category: 'Quick Actions',
        title: 'View Timetable & Calendar',
        subtitle: 'Weekly class schedule, sessions & exam dates',
        icon: <Calendar className="w-4 h-4 text-teal-600" />,
        action: () => setActiveView('timetable'),
      },
      {
        id: 'action-assignments-hub',
        category: 'Quick Actions',
        title: 'Open Assignments & Deadlines Hub',
        subtitle: 'Kanban board, urgency rings & subtask checklists',
        icon: <CheckSquare className="w-4 h-4 text-amber-600" />,
        action: () => setActiveView('assignments'),
      },
      {
        id: 'action-pomodoro',
        category: 'Quick Actions',
        title: 'Start Pomodoro Focus Timer',
        subtitle: '25-minute deep focus study block with chimes',
        icon: <Clock className="w-4 h-4 text-rose-500" />,
        action: () => setIsPomodoroModalOpen(true),
      }
    );

    if (onOpenSyncExcel) {
      list.push({
        id: 'action-sync-excel',
        category: 'Quick Actions',
        title: 'Sync HSB Excel Workbook (.xlsx)',
        subtitle: 'Re-parse Term-II timetable and Kushagra Raizada attendance sheet',
        icon: <FileSpreadsheet className="w-4 h-4 text-emerald-600" />,
        action: () => onOpenSyncExcel(),
      });
    }

    if (onOpenNewAssignment) {
      list.push({
        id: 'action-new-assignment',
        category: 'Quick Actions',
        title: 'Create New Assignment / Task',
        subtitle: 'Add a new deadline or deliverable to your roster',
        icon: <Zap className="w-4 h-4 text-blue-600" />,
        action: () => onOpenNewAssignment(),
      });
    }

    list.push({
      id: 'action-export-backup',
      category: 'Quick Actions',
      title: 'Backup & Export All Data',
      subtitle: 'Download a JSON snapshot of your LMS state & records',
      icon: <Download className="w-4 h-4 text-slate-600 dark:text-slate-300" />,
      action: () => exportBackup(false),
    });

    return list;
  }, [
    subjects,
    assignments,
    files,
    setActiveView,
    setSelectedSubjectCode,
    setSelectedAssignmentForFocus,
    openFilePreview,
    setIsPomodoroModalOpen,
    onOpenSyncExcel,
    onOpenNewAssignment,
    exportBackup,
  ]);

  // Filter items based on query
  const filteredItems = useMemo(() => {
    if (!query.trim()) {
      return allItems;
    }
    const q = query.toLowerCase().trim();
    return allItems.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        (item.subtitle && item.subtitle.toLowerCase().includes(q)) ||
        item.category.toLowerCase().includes(q)
    );
  }, [allItems, query]);

  // Clamp selection index
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  if (!isCommandPaletteOpen) return null;

  const handleSelect = (item: CommandItem) => {
    playStudyChime();
    setIsCommandPaletteOpen(false);
    item.action();
  };

  const handleKeyDownInInput = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < filteredItems.length - 1 ? prev + 1 : 0));
      playSoftTick();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filteredItems.length - 1));
      playSoftTick();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        handleSelect(filteredItems[selectedIndex]);
      }
    }
  };

  // Group items by category
  const grouped = filteredItems.reduce<{ [cat: string]: CommandItem[] }>((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  const categories = Object.keys(grouped);

  let flatIndexCounter = -1;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 backdrop-blur-sm p-4 pt-16 sm:pt-24 animate-in fade-in duration-150"
      onClick={() => setIsCommandPaletteOpen(false)}
    >
      <div
        className="relative w-full max-w-2xl bg-white dark:bg-[#111827] rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[75vh] animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-200 dark:border-slate-800 bg-[#F4F7FA] dark:bg-[#0F172A] gap-3">
          <Search className="w-5 h-5 text-[#004B93] dark:text-[#38BDF8] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDownInInput}
            placeholder="Type a course, assignment, document, or command..."
            className="w-full text-sm font-semibold bg-transparent text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
          />
          <div className="flex items-center space-x-1.5 shrink-0">
            <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono font-bold bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded text-slate-500 shadow-2xs">
              ESC
            </kbd>
            <button
              onClick={() => setIsCommandPaletteOpen(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-2 divide-y divide-slate-100 dark:divide-slate-800/60 select-none">
          {filteredItems.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-400 space-y-1">
              <p className="font-semibold text-slate-600 dark:text-slate-300">
                No matching results found for "{query}".
              </p>
              <p>Try searching for a course code like "PM2", an assignment, or an action.</p>
            </div>
          ) : (
            categories.map((category) => {
              const items = grouped[category];
              return (
                <div key={category} className="py-2 first:pt-1 last:pb-1">
                  <div className="px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center justify-between">
                    <span>{category}</span>
                    <span className="font-mono">{items.length}</span>
                  </div>

                  <div className="mt-1 space-y-0.5">
                    {items.map((item) => {
                      flatIndexCounter++;
                      const isCurrent = flatIndexCounter === selectedIndex;
                      const itemIdx = flatIndexCounter;

                      return (
                        <div
                          key={item.id}
                          onClick={() => handleSelect(item)}
                          onMouseEnter={() => setSelectedIndex(itemIdx)}
                          className={`flex items-center justify-between px-3 py-2 rounded-2xl cursor-pointer transition text-xs ${
                            isCurrent
                              ? 'bg-[#EBF3FA] dark:bg-slate-800 text-[#004B93] dark:text-[#38BDF8] ring-1 ring-[#004B93]/20 shadow-2xs'
                              : 'text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                          }`}
                        >
                          <div className="flex items-center space-x-3 truncate min-w-0">
                            <div
                              className={`p-1.5 rounded-xl shrink-0 ${
                                isCurrent
                                  ? 'bg-[#004B93] text-white shadow-2xs'
                                  : 'bg-slate-100 dark:bg-slate-800'
                              }`}
                            >
                              {item.icon}
                            </div>
                            <div className="truncate min-w-0">
                              <p className="font-bold truncate">{item.title}</p>
                              {item.subtitle && (
                                <p className="text-[11px] text-slate-700 dark:text-slate-300 truncate font-semibold">
                                  {item.subtitle}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center space-x-1 shrink-0 ml-3">
                            {isCurrent && (
                              <span className="flex items-center space-x-1 text-[10px] font-bold text-[#004B93] dark:text-[#38BDF8] bg-white/80 dark:bg-slate-900/80 px-2 py-0.5 rounded-md border border-[#D6E6F5] dark:border-slate-700">
                                <span>Select</span>
                                <ArrowRight className="w-3 h-3 inline" />
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Shortcut Hints */}
        <div className="px-4 py-2 border-t border-slate-100 dark:border-slate-800 bg-[#F8FAFC] dark:bg-slate-900 text-[10px] text-slate-500 flex items-center justify-between font-medium">
          <div className="flex items-center space-x-3">
            <span>
              <kbd className="px-1 py-0.5 bg-white dark:bg-slate-800 border rounded shadow-2xs font-mono font-bold">
                ↑
              </kbd>{' '}
              <kbd className="px-1 py-0.5 bg-white dark:bg-slate-800 border rounded shadow-2xs font-mono font-bold">
                ↓
              </kbd>{' '}
              Navigate
            </span>
            <span>
              <kbd className="px-1 py-0.5 bg-white dark:bg-slate-800 border rounded shadow-2xs font-mono font-bold">
                ↵
              </kbd>{' '}
              Open
            </span>
            <span>
              <kbd className="px-1 py-0.5 bg-white dark:bg-slate-800 border rounded shadow-2xs font-mono font-bold">
                ESC
              </kbd>{' '}
              Dismiss
            </span>
          </div>
          <span className="font-bold text-[#004B93] dark:text-[#38BDF8]">
            HSB Spotlight
          </span>
        </div>
      </div>
    </div>
  );
};
