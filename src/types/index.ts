export type UrgencyLevel = 'urgent' | 'soon' | 'normal' | 'submitted';

export interface StudentProfile {
  name: string;
  rollNumber: string;
  resourceId: string;
  institution: string;
  program: string;
  term: string;
  batch: string;
  academicYear: string;
  targetCGPA?: number;
}

export type SessionAttendanceStatus = 'Present' | 'Absent' | 'Upcoming';

export interface AttendanceSession {
  sessionNumber: number; // 1, 2, 3...
  label: string; // e.g. "S1"
  date: string; // YYYY-MM-DD
  timeSlot: string; // e.g. "09:30 - 11:00"
  status: SessionAttendanceStatus;
  isConducted: boolean;
}

export interface SubjectAttendance {
  subjectCode: string;
  sessions: AttendanceSession[];
  lates: number;
}

export interface SubjectModuleTopic {
  id: string;
  title: string;
  completed: boolean;
  notes?: string;
}

export interface SubjectModule {
  id: string;
  title: string;
  topics: SubjectModuleTopic[];
}

export interface EvaluationComponent {
  id: string;
  name: string; // e.g., "Quiz 1", "Mid-Term", "Group Project"
  weightage: number; // percentage, e.g., 20
  marksObtained: number; // e.g., 18.5
  maxMarks: number; // e.g., 20
}

export type DocumentTag =
  | 'All'
  | 'Lecture Slides'
  | 'Case Study'
  | 'Assignment Brief'
  | 'My Submission'
  | 'General';

export interface StoredFileMetadata {
  id: string;
  subjectId: string;
  name: string;
  size: number;
  type: string;
  moduleTag: string;
  uploadDate: string; // ISO string
  assignmentId?: string;
  tag?: string; // DocumentTag category
  scratchpadNotes?: string; // Persistent markdown/plain-text notes attached to this file
}

export interface StoredFileBlob extends StoredFileMetadata {
  blob: Blob;
}

export interface StorageQuotaInfo {
  fileCount: number;
  totalBytes: number;
  quotaBytes?: number;
  usageBytes?: number;
  availableBytes?: number;
  isPersistent?: boolean;
}

export interface BatchUploadProgress {
  current: number;
  total: number;
  currentFileName: string;
  currentFileSize: number;
  percent: number;
}

export type KanbanStage = 'Queued' | 'In Progress' | 'Drafting/Review' | 'Submitted';

export interface AssignmentSubtask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Assignment {
  id: string;
  subjectId: string;
  title: string;
  description?: string;
  dueDate: string; // ISO string with time
  priority: 'High' | 'Medium' | 'Low';
  status: 'Pending' | 'In Progress' | 'Submitted';
  weightage?: number;
  submissionFileId?: string;
  submissionFileName?: string;
  submittedAt?: string;
  kanbanStage?: KanbanStage;
  subtasks?: AssignmentSubtask[];
  focusMinutesLogged?: number;
}

export interface Subject {
  id: string;
  code: string; // e.g., "IET", "UX", "LA", "MRM", "ME", "PM2", "CV2", "EM"
  name: string;
  faculty: string;
  ta: string;
  term: string;
  credits: number;
  plannedSessions: number;
  color: string;
  modules: SubjectModule[];
  evaluations: EvaluationComponent[];
}

export interface TimetableSlot {
  timeRange: string; // e.g. "09:30 – 11:00"
  subjectCode?: string;
  title: string;
  rawText: string;
  type: 'class' | 'cxo' | 'tcc' | 'quiz' | 'midterm' | 'endterm' | 'holiday' | 'lunch' | 'free' | 'other';
}

export interface TimetableDay {
  date: string; // YYYY-MM-DD
  dayName: string; // Monday, Tuesday...
  weekNumber: number; // 1 to 12
  remarks?: string;
  slots: {
    '0930_1100': TimetableSlot;
    '1115_1245': TimetableSlot;
    '1245_1400': TimetableSlot; // LUNCH
    '1400_1530': TimetableSlot;
    '1545_1715': TimetableSlot;
    '1730_1900': TimetableSlot;
  };
}

export interface ExamReminder {
  id: string;
  title: string;
  date: string;
  time?: string;
  subjectCode: string;
  type: 'Quiz' | 'Mid-Term' | 'End-Term' | 'Presentation' | 'Deadline';
  notes?: string;
}

export interface PomodoroSession {
  id: string;
  subjectId?: string;
  durationMinutes: number;
  completedAt: string;
  type: 'focus' | 'shortBreak' | 'longBreak';
}

export interface LMSBackupData {
  version: string;
  exportedAt: string;
  institution: string;
  student: StudentProfile;
  subjects: Subject[];
  attendance: SubjectAttendance[];
  timetable: TimetableDay[];
  examReminders: ExamReminder[];
  assignments: Assignment[];
  fileMetadata: StoredFileMetadata[];
  storedFiles?: Array<StoredFileMetadata & { base64Data?: string }>;
  pomodoroSessions: PomodoroSession[];
  settings: {
    darkMode: boolean;
  };
}

export type ActiveNavView = 'dashboard' | 'attendance' | 'timetable' | 'subject' | 'assignments' | 'gradebook';
