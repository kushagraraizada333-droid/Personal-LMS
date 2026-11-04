import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import {
  Subject,
  Assignment,
  StoredFileMetadata,
  StoredFileBlob,
  PomodoroSession,
  ActiveNavView,
  EvaluationComponent,
  StudentProfile,
  SubjectAttendance,
  TimetableDay,
  ExamReminder,
  SessionAttendanceStatus,
} from '../types';
import {
  initDB,
  saveFileBlob,
  getFileBlob,
  deleteFileBlob,
  getAllFileMetadata,
  setMeta,
  getMeta,
  getStorageUsage,
} from '../db/indexedDB';
import {
  INITIAL_STUDENT,
  INITIAL_SUBJECTS,
  INITIAL_ATTENDANCE,
  getInitialTimetable,
  INITIAL_EXAM_REMINDERS,
} from '../db/initialData';
import {
  downloadBackupJSON,
  parseAndValidateBackupJSON,
  saveBackupToStorage,
  clearAllLocalData,
} from '../db/backupService';
import { parseHSBWorkbook, parseAssignmentsFile, parseMarksFile } from '../utils/excelParser';
import { playStudyChime, triggerStudyConfetti } from '../utils/sound';

interface PomodoroState {
  mode: 'focus' | 'shortBreak' | 'longBreak';
  timeLeft: number;
  isRunning: boolean;
  activeSubjectCode?: string;
  completedSessions: number;
}

interface LMSContextType {
  // Navigation & View
  activeView: ActiveNavView;
  setActiveView: (view: ActiveNavView) => void;
  selectedSubjectCode: string;
  setSelectedSubjectCode: (code: string) => void;
  activeSubjectTab: 'vault' | 'assignments' | 'gradebook' | 'syllabus';
  setActiveSubjectTab: (tab: 'vault' | 'assignments' | 'gradebook' | 'syllabus') => void;

  // Theme
  isDarkMode: boolean;
  toggleDarkMode: () => void;

  // Student Profile
  student: StudentProfile;
  updateStudent: (updates: Partial<StudentProfile>) => void;

  // Academic Data
  subjects: Subject[];
  attendance: SubjectAttendance[];
  timetable: TimetableDay[];
  examReminders: ExamReminder[];
  assignments: Assignment[];
  files: StoredFileMetadata[];
  storageUsage: { fileCount: number; totalBytes: number };
  isLoading: boolean;

  // Excel Master Sync
  syncExcelWorkbook: (file: File) => Promise<{ message: string }>;
  importAssignmentsExcel: (file: File) => Promise<void>;
  importMarksExcel: (file: File, subjectCode: string) => Promise<void>;

  // Attendance Actions
  toggleSessionAttendance: (
    subjectCode: string,
    sessionNumber: number,
    newStatus: SessionAttendanceStatus,
    isConducted?: boolean
  ) => Promise<void>;

  // Exam / Quiz Reminder Actions
  addExamReminder: (reminder: Omit<ExamReminder, 'id'>) => Promise<void>;
  deleteExamReminder: (id: string) => Promise<void>;

  // File Vault Actions (IndexedDB Blobs)
  uploadFile: (file: File, subjectId: string, moduleTag: string, assignmentId?: string) => Promise<StoredFileMetadata>;
  deleteFile: (fileId: string) => Promise<void>;
  loadFileBlob: (fileId: string) => Promise<StoredFileBlob | null>;

  // Assignment Actions
  addAssignment: (assignmentData: Omit<Assignment, 'id'>) => Promise<Assignment>;
  updateAssignment: (id: string, updates: Partial<Assignment>) => Promise<void>;
  deleteAssignment: (id: string) => Promise<void>;
  submitAssignmentWithFile: (assignmentId: string, file?: File) => Promise<void>;

  // Syllabus & Topics (Starts at 0)
  toggleTopicCompletion: (subjectCode: string, moduleId: string, topicId: string) => Promise<void>;
  addTopic: (subjectCode: string, moduleId: string, title: string) => Promise<void>;
  addModule: (subjectCode: string, title: string) => Promise<void>;

  // Marks & Gradebook (Starts at 0)
  addEvaluationComponent: (subjectCode: string, comp: Omit<EvaluationComponent, 'id'>) => Promise<void>;
  updateEvaluationComponent: (subjectCode: string, compId: string, updates: Partial<EvaluationComponent>) => Promise<void>;
  deleteEvaluationComponent: (subjectCode: string, compId: string) => Promise<void>;

  // Pomodoro
  pomodoro: PomodoroState;
  startPomodoro: () => void;
  pausePomodoro: () => void;
  resetPomodoro: (mode?: 'focus' | 'shortBreak' | 'longBreak') => void;
  setPomodoroSubject: (code: string | undefined) => void;
  isPomodoroModalOpen: boolean;
  setIsPomodoroModalOpen: (open: boolean) => void;

  // Backup & Reset
  isBackupModalOpen: boolean;
  setIsBackupModalOpen: (open: boolean) => void;
  exportBackup: () => Promise<void>;
  importBackup: (fileContent: string) => Promise<void>;
  resetToInitialRoster: () => Promise<void>;
  clearAllData: () => Promise<void>;

  // Preview Modal
  previewFile: StoredFileBlob | null;
  setPreviewFile: (file: StoredFileBlob | null) => void;
  openFilePreview: (fileId: string) => Promise<void>;
}

const LMSContext = createContext<LMSContextType | undefined>(undefined);

const FOCUS_TIME = 25 * 60;
const SHORT_BREAK = 5 * 60;
const LONG_BREAK = 15 * 60;

export const LMSProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeView, setActiveView] = useState<ActiveNavView>('dashboard');
  const [selectedSubjectCode, setSelectedSubjectCode] = useState<string>('PM2');
  const [activeSubjectTab, setActiveSubjectTab] = useState<'vault' | 'assignments' | 'gradebook' | 'syllabus'>('vault');

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('hsb_dark_mode');
    return saved !== null ? saved === 'true' : false;
  });

  const [student, setStudent] = useState<StudentProfile>(INITIAL_STUDENT);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [attendance, setAttendance] = useState<SubjectAttendance[]>([]);
  const [timetable, setTimetable] = useState<TimetableDay[]>([]);
  const [examReminders, setExamReminders] = useState<ExamReminder[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [files, setFiles] = useState<StoredFileMetadata[]>([]);
  const [storageUsage, setStorageUsage] = useState({ fileCount: 0, totalBytes: 0 });
  const [isLoading, setIsLoading] = useState(true);

  // Modals
  const [isBackupModalOpen, setIsBackupModalOpen] = useState(false);
  const [isPomodoroModalOpen, setIsPomodoroModalOpen] = useState(false);
  const [previewFile, setPreviewFile] = useState<StoredFileBlob | null>(null);

  // Pomodoro
  const [pomodoro, setPomodoro] = useState<PomodoroState>({
    mode: 'focus',
    timeLeft: FOCUS_TIME,
    isRunning: false,
    activeSubjectCode: 'PM2',
    completedSessions: 0,
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('hsb_dark_mode', String(isDarkMode));
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  // Load Data
  const loadInitialData = useCallback(async () => {
    setIsLoading(true);
    try {
      await initDB();

      let storedSubjects = await getMeta<Subject[]>('subjects_t2');
      let storedAttendance = await getMeta<SubjectAttendance[]>('attendance_t2');
      let storedTimetable = await getMeta<TimetableDay[]>('timetable_t2');
      let storedReminders = await getMeta<ExamReminder[]>('exam_reminders_t2');
      let storedAssignments = await getMeta<Assignment[]>('assignments_t2');
      let storedStudent = await getMeta<StudentProfile>('student_t2');

      if (!storedSubjects || storedSubjects.length === 0) {
        // Pre-configure the 8 Trimester II subjects & timetable
        storedSubjects = INITIAL_SUBJECTS;
        storedAttendance = INITIAL_ATTENDANCE;
        storedTimetable = getInitialTimetable();
        storedReminders = INITIAL_EXAM_REMINDERS;
        storedAssignments = []; // Zero demo assignments
        storedStudent = INITIAL_STUDENT;

        await setMeta('subjects_t2', storedSubjects);
        await setMeta('attendance_t2', storedAttendance);
        await setMeta('timetable_t2', storedTimetable);
        await setMeta('exam_reminders_t2', storedReminders);
        await setMeta('assignments_t2', storedAssignments);
        await setMeta('student_t2', storedStudent);
      }

      setSubjects(storedSubjects);
      setAttendance(storedAttendance || INITIAL_ATTENDANCE);
      setTimetable(storedTimetable || getInitialTimetable());
      setExamReminders(storedReminders || INITIAL_EXAM_REMINDERS);
      setAssignments(storedAssignments || []);
      setStudent(storedStudent || INITIAL_STUDENT);

      const fileMetaList = await getAllFileMetadata();
      setFiles(fileMetaList);

      const usage = await getStorageUsage();
      setStorageUsage(usage);
    } catch (err) {
      console.error('Error loading HSB LMS data:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  // Pomodoro Interval
  useEffect(() => {
    let interval: number | undefined;

    if (pomodoro.isRunning && pomodoro.timeLeft > 0) {
      interval = window.setInterval(() => {
        setPomodoro((prev) => ({
          ...prev,
          timeLeft: prev.timeLeft - 1,
        }));
      }, 1000);
    } else if (pomodoro.isRunning && pomodoro.timeLeft === 0) {
      playStudyChime();
      triggerStudyConfetti();

      if (pomodoro.mode === 'focus') {
        const nextCount = pomodoro.completedSessions + 1;
        const nextMode = nextCount % 4 === 0 ? 'longBreak' : 'shortBreak';
        const nextTime = nextMode === 'longBreak' ? LONG_BREAK : SHORT_BREAK;

        setPomodoro((prev) => ({
          ...prev,
          mode: nextMode,
          timeLeft: nextTime,
          isRunning: false,
          completedSessions: nextCount,
        }));
      } else {
        setPomodoro((prev) => ({
          ...prev,
          mode: 'focus',
          timeLeft: FOCUS_TIME,
          isRunning: false,
        }));
      }
    }

    return () => clearInterval(interval);
  }, [pomodoro.isRunning, pomodoro.timeLeft, pomodoro.mode, pomodoro.completedSessions]);

  const startPomodoro = () => setPomodoro((prev) => ({ ...prev, isRunning: true }));
  const pausePomodoro = () => setPomodoro((prev) => ({ ...prev, isRunning: false }));
  const resetPomodoro = (mode?: 'focus' | 'shortBreak' | 'longBreak') => {
    const targetMode = mode || pomodoro.mode;
    let targetTime = FOCUS_TIME;
    if (targetMode === 'shortBreak') targetTime = SHORT_BREAK;
    if (targetMode === 'longBreak') targetTime = LONG_BREAK;

    setPomodoro((prev) => ({
      ...prev,
      mode: targetMode,
      timeLeft: targetTime,
      isRunning: false,
    }));
  };
  const setPomodoroSubject = (code: string | undefined) => {
    setPomodoro((prev) => ({ ...prev, activeSubjectCode: code }));
  };

  const updateStudent = async (updates: Partial<StudentProfile>) => {
    const updated = { ...student, ...updates };
    setStudent(updated);
    await setMeta('student_t2', updated);
  };

  // Excel Master Sync
  const syncExcelWorkbook = async (file: File): Promise<{ message: string }> => {
    const parsed = await parseHSBWorkbook(file);

    if (parsed.timetable && parsed.timetable.length > 0) {
      setTimetable(parsed.timetable);
      await setMeta('timetable_t2', parsed.timetable);
    }

    if (parsed.attendance && parsed.attendance.length > 0) {
      // Merge with existing attendance
      const updatedAttendance = [...attendance];
      for (const newAtt of parsed.attendance) {
        const existingIdx = updatedAttendance.findIndex((a) => a.subjectCode === newAtt.subjectCode);
        if (existingIdx !== -1) {
          updatedAttendance[existingIdx] = newAtt;
        } else {
          updatedAttendance.push(newAtt);
        }
      }
      setAttendance(updatedAttendance);
      await setMeta('attendance_t2', updatedAttendance);
    }

    playStudyChime();
    triggerStudyConfetti();
    return { message: parsed.message };
  };

  const importAssignmentsExcel = async (file: File): Promise<void> => {
    const newAsgs = await parseAssignmentsFile(file);
    const createdList: Assignment[] = newAsgs.map((a, i) => ({
      ...a,
      id: `asg-import-${Date.now()}-${i}`,
    }));
    const updated = [...createdList, ...assignments];
    setAssignments(updated);
    await setMeta('assignments_t2', updated);
    playStudyChime();
    triggerStudyConfetti();
  };

  const importMarksExcel = async (file: File, subjectCode: string): Promise<void> => {
    const newComps = await parseMarksFile(file, subjectCode);
    const createdComps: EvaluationComponent[] = newComps.map((c, i) => ({
      ...c,
      id: `eval-import-${Date.now()}-${i}`,
    }));

    const updated = subjects.map((s) => {
      if (s.code === subjectCode) {
        return {
          ...s,
          evaluations: [...s.evaluations, ...createdComps],
        };
      }
      return s;
    });

    setSubjects(updated);
    await setMeta('subjects_t2', updated);
    playStudyChime();
    triggerStudyConfetti();
  };

  // Toggle Session Attendance
  const toggleSessionAttendance = async (
    subjectCode: string,
    sessionNumber: number,
    newStatus: SessionAttendanceStatus,
    isConducted: boolean = true
  ): Promise<void> => {
    const updated = attendance.map((att) => {
      if (att.subjectCode !== subjectCode) return att;

      const updatedSessions = att.sessions.map((s) => {
        if (s.sessionNumber === sessionNumber) {
          return {
            ...s,
            status: newStatus,
            isConducted: newStatus === 'Upcoming' ? false : isConducted,
          };
        }
        return s;
      });

      return { ...att, sessions: updatedSessions };
    });

    setAttendance(updated);
    await setMeta('attendance_t2', updated);
  };

  // Exam Reminders
  const addExamReminder = async (reminderData: Omit<ExamReminder, 'id'>) => {
    const newRem: ExamReminder = {
      ...reminderData,
      id: `rem-${Date.now()}`,
    };
    const updated = [newRem, ...examReminders];
    setExamReminders(updated);
    await setMeta('exam_reminders_t2', updated);
  };

  const deleteExamReminder = async (id: string) => {
    const updated = examReminders.filter((r) => r.id !== id);
    setExamReminders(updated);
    await setMeta('exam_reminders_t2', updated);
  };

  // File Vault Actions
  const uploadFile = async (
    file: File,
    subjectId: string,
    moduleTag: string,
    assignmentId?: string
  ): Promise<StoredFileMetadata> => {
    const newFile: StoredFileBlob = {
      id: `file-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      subjectId,
      name: file.name,
      size: file.size,
      type: file.type || 'application/octet-stream',
      moduleTag: moduleTag || 'General Resources',
      uploadDate: new Date().toISOString(),
      assignmentId,
      blob: file,
    };

    await saveFileBlob(newFile);

    const updatedFiles = await getAllFileMetadata();
    setFiles(updatedFiles);

    const usage = await getStorageUsage();
    setStorageUsage(usage);

    return {
      id: newFile.id,
      subjectId: newFile.subjectId,
      name: newFile.name,
      size: newFile.size,
      type: newFile.type,
      moduleTag: newFile.moduleTag,
      uploadDate: newFile.uploadDate,
      assignmentId: newFile.assignmentId,
    };
  };

  const deleteFile = async (fileId: string): Promise<void> => {
    await deleteFileBlob(fileId);
    setFiles((prev) => prev.filter((f) => f.id !== fileId));
    const usage = await getStorageUsage();
    setStorageUsage(usage);
  };

  const loadFileBlob = async (fileId: string): Promise<StoredFileBlob | null> => {
    return await getFileBlob(fileId);
  };

  const openFilePreview = async (fileId: string) => {
    const fileWithBlob = await getFileBlob(fileId);
    if (fileWithBlob) {
      setPreviewFile(fileWithBlob);
    }
  };

  // Assignment Actions
  const addAssignment = async (assignmentData: Omit<Assignment, 'id'>): Promise<Assignment> => {
    const newAssignment: Assignment = {
      ...assignmentData,
      id: `asg-${Date.now()}`,
    };
    const updated = [newAssignment, ...assignments];
    setAssignments(updated);
    await setMeta('assignments_t2', updated);
    return newAssignment;
  };

  const updateAssignment = async (id: string, updates: Partial<Assignment>): Promise<void> => {
    const updated = assignments.map((a) => (a.id === id ? { ...a, ...updates } : a));
    setAssignments(updated);
    await setMeta('assignments_t2', updated);
  };

  const deleteAssignment = async (id: string): Promise<void> => {
    const updated = assignments.filter((a) => a.id !== id);
    setAssignments(updated);
    await setMeta('assignments_t2', updated);
  };

  const submitAssignmentWithFile = async (assignmentId: string, file?: File): Promise<void> => {
    let submissionFileId: string | undefined;
    let submissionFileName: string | undefined;

    const targetAsg = assignments.find((a) => a.id === assignmentId);
    if (!targetAsg) return;

    if (file) {
      const uploaded = await uploadFile(file, targetAsg.subjectId, 'Assignment Submissions', assignmentId);
      submissionFileId = uploaded.id;
      submissionFileName = uploaded.name;
    }

    const updated = assignments.map((a) => {
      if (a.id === assignmentId) {
        return {
          ...a,
          status: 'Submitted' as const,
          submittedAt: new Date().toISOString(),
          submissionFileId: submissionFileId || a.submissionFileId,
          submissionFileName: submissionFileName || a.submissionFileName,
        };
      }
      return a;
    });

    setAssignments(updated);
    await setMeta('assignments_t2', updated);
    playStudyChime();
    triggerStudyConfetti();
  };

  // Syllabus & Topics (Zero fake data)
  const toggleTopicCompletion = async (subjectCode: string, moduleId: string, topicId: string): Promise<void> => {
    let completedNow = false;

    const updated = subjects.map((subj) => {
      if (subj.code !== subjectCode) return subj;

      const updatedModules = subj.modules.map((mod) => {
        if (mod.id !== moduleId) return mod;

        const updatedTopics = mod.topics.map((top) => {
          if (top.id === topicId) {
            completedNow = !top.completed;
            return { ...top, completed: completedNow };
          }
          return top;
        });

        return { ...mod, topics: updatedTopics };
      });

      return { ...subj, modules: updatedModules };
    });

    setSubjects(updated);
    await setMeta('subjects_t2', updated);

    if (completedNow) {
      triggerStudyConfetti();
    }
  };

  const addTopic = async (subjectCode: string, moduleId: string, title: string): Promise<void> => {
    const updated = subjects.map((subj) => {
      if (subj.code !== subjectCode) return subj;

      const updatedModules = subj.modules.map((mod) => {
        if (mod.id !== moduleId) return mod;

        const newTopic = {
          id: `top-${Date.now()}`,
          title: title.trim(),
          completed: false,
        };

        return { ...mod, topics: [...mod.topics, newTopic] };
      });

      return { ...subj, modules: updatedModules };
    });

    setSubjects(updated);
    await setMeta('subjects_t2', updated);
  };

  const addModule = async (subjectCode: string, title: string): Promise<void> => {
    const updated = subjects.map((subj) => {
      if (subj.code !== subjectCode) return subj;

      const newModule = {
        id: `mod-${Date.now()}`,
        title: title.trim(),
        topics: [],
      };

      return { ...subj, modules: [...subj.modules, newModule] };
    });

    setSubjects(updated);
    await setMeta('subjects_t2', updated);
  };

  // Marks & Evaluation Components (Zero fake data)
  const addEvaluationComponent = async (
    subjectCode: string,
    compData: Omit<EvaluationComponent, 'id'>
  ): Promise<void> => {
    const newComp: EvaluationComponent = {
      ...compData,
      id: `eval-${Date.now()}`,
    };

    const updated = subjects.map((subj) => {
      if (subj.code !== subjectCode) return subj;
      return {
        ...subj,
        evaluations: [...subj.evaluations, newComp],
      };
    });

    setSubjects(updated);
    await setMeta('subjects_t2', updated);
  };

  const updateEvaluationComponent = async (
    subjectCode: string,
    compId: string,
    updates: Partial<EvaluationComponent>
  ): Promise<void> => {
    const updated = subjects.map((subj) => {
      if (subj.code !== subjectCode) return subj;
      return {
        ...subj,
        evaluations: subj.evaluations.map((c) => (c.id === compId ? { ...c, ...updates } : c)),
      };
    });

    setSubjects(updated);
    await setMeta('subjects_t2', updated);
  };

  const deleteEvaluationComponent = async (subjectCode: string, compId: string): Promise<void> => {
    const updated = subjects.map((subj) => {
      if (subj.code !== subjectCode) return subj;
      return {
        ...subj,
        evaluations: subj.evaluations.filter((c) => c.id !== compId),
      };
    });

    setSubjects(updated);
    await setMeta('subjects_t2', updated);
  };

  // Backup & Reset
  const exportBackup = async () => {
    await downloadBackupJSON(
      subjects,
      attendance,
      timetable,
      examReminders,
      assignments,
      student,
      [],
      isDarkMode
    );
  };

  const importBackup = async (fileContent: string) => {
    const parsed = parseAndValidateBackupJSON(fileContent);
    await saveBackupToStorage(parsed);

    setSubjects(parsed.subjects);
    if (parsed.attendance) setAttendance(parsed.attendance);
    if (parsed.timetable) setTimetable(parsed.timetable);
    if (parsed.examReminders) setExamReminders(parsed.examReminders);
    setAssignments(parsed.assignments || []);
    if (parsed.student) setStudent(parsed.student);
    if (parsed.settings?.darkMode !== undefined) {
      setIsDarkMode(parsed.settings.darkMode);
    }

    const currentFiles = await getAllFileMetadata();
    setFiles(currentFiles);
  };

  const resetToInitialRoster = async () => {
    await setMeta('subjects_t2', INITIAL_SUBJECTS);
    await setMeta('attendance_t2', INITIAL_ATTENDANCE);
    await setMeta('timetable_t2', getInitialTimetable());
    await setMeta('exam_reminders_t2', INITIAL_EXAM_REMINDERS);
    await setMeta('assignments_t2', []);
    await setMeta('student_t2', INITIAL_STUDENT);

    setSubjects(INITIAL_SUBJECTS);
    setAttendance(INITIAL_ATTENDANCE);
    setTimetable(getInitialTimetable());
    setExamReminders(INITIAL_EXAM_REMINDERS);
    setAssignments([]);
    setStudent(INITIAL_STUDENT);

    const currentFiles = await getAllFileMetadata();
    setFiles(currentFiles);
  };

  const clearAllData = async () => {
    await clearAllLocalData();
    setSubjects(INITIAL_SUBJECTS);
    setAttendance(INITIAL_ATTENDANCE);
    setTimetable(getInitialTimetable());
    setExamReminders([]);
    setAssignments([]);
    setFiles([]);
    setStorageUsage({ fileCount: 0, totalBytes: 0 });
  };

  return (
    <LMSContext.Provider
      value={{
        activeView,
        setActiveView,
        selectedSubjectCode,
        setSelectedSubjectCode,
        activeSubjectTab,
        setActiveSubjectTab,
        isDarkMode,
        toggleDarkMode,
        student,
        updateStudent,
        subjects,
        attendance,
        timetable,
        examReminders,
        assignments,
        files,
        storageUsage,
        isLoading,
        syncExcelWorkbook,
        importAssignmentsExcel,
        importMarksExcel,
        toggleSessionAttendance,
        addExamReminder,
        deleteExamReminder,
        uploadFile,
        deleteFile,
        loadFileBlob,
        addAssignment,
        updateAssignment,
        deleteAssignment,
        submitAssignmentWithFile,
        toggleTopicCompletion,
        addTopic,
        addModule,
        addEvaluationComponent,
        updateEvaluationComponent,
        deleteEvaluationComponent,
        pomodoro,
        startPomodoro,
        pausePomodoro,
        resetPomodoro,
        setPomodoroSubject,
        isPomodoroModalOpen,
        setIsPomodoroModalOpen,
        isBackupModalOpen,
        setIsBackupModalOpen,
        exportBackup,
        importBackup,
        resetToInitialRoster,
        clearAllData,
        previewFile,
        setPreviewFile,
        openFilePreview,
      }}
    >
      {children}
    </LMSContext.Provider>
  );
};

export const useLMS = (): LMSContextType => {
  const context = useContext(LMSContext);
  if (!context) {
    throw new Error('useLMS must be used within an LMSProvider');
  }
  return context;
};
