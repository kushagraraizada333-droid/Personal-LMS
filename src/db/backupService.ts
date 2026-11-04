import {
  LMSBackupData,
  Subject,
  Assignment,
  StoredFileMetadata,
  PomodoroSession,
  SubjectAttendance,
  TimetableDay,
  ExamReminder,
  StudentProfile,
} from '../types';
import { setMeta, getAllFileMetadata, initDB } from './indexedDB';

export const generateBackupObject = async (
  subjects: Subject[],
  attendance: SubjectAttendance[],
  timetable: TimetableDay[],
  examReminders: ExamReminder[],
  assignments: Assignment[],
  student: StudentProfile,
  pomodoroSessions: PomodoroSession[],
  darkMode: boolean
): Promise<LMSBackupData> => {
  const fileMetadata: StoredFileMetadata[] = await getAllFileMetadata();

  return {
    version: '2.0.0',
    exportedAt: new Date().toISOString(),
    institution: 'Harishankar Singhania School of Business (HSB), Jaipur',
    student,
    subjects,
    attendance,
    timetable,
    examReminders,
    assignments,
    fileMetadata,
    pomodoroSessions,
    settings: {
      darkMode,
    },
  };
};

export const downloadBackupJSON = async (
  subjects: Subject[],
  attendance: SubjectAttendance[],
  timetable: TimetableDay[],
  examReminders: ExamReminder[],
  assignments: Assignment[],
  student: StudentProfile,
  pomodoroSessions: PomodoroSession[],
  darkMode: boolean
): Promise<void> => {
  const backupData = await generateBackupObject(
    subjects,
    attendance,
    timetable,
    examReminders,
    assignments,
    student,
    pomodoroSessions,
    darkMode
  );
  const jsonStr = JSON.stringify(backupData, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const now = new Date();
  const dateStr = now.toISOString().split('T')[0];
  const a = document.createElement('a');
  a.href = url;
  a.download = `HSB_Jaipur_Kushagra_LMS_${dateStr}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const parseAndValidateBackupJSON = (fileContent: string): LMSBackupData => {
  let parsed: unknown;
  try {
    parsed = JSON.parse(fileContent);
  } catch {
    throw new Error('Invalid JSON file format.');
  }

  const obj = parsed as Partial<LMSBackupData>;
  if (!obj.subjects || !Array.isArray(obj.subjects)) {
    throw new Error('Backup file is missing valid subjects array.');
  }

  return parsed as LMSBackupData;
};

export const saveBackupToStorage = async (backup: LMSBackupData): Promise<void> => {
  await setMeta('subjects', backup.subjects);
  if (backup.attendance) await setMeta('attendance', backup.attendance);
  if (backup.timetable) await setMeta('timetable', backup.timetable);
  if (backup.examReminders) await setMeta('examReminders', backup.examReminders);
  if (backup.assignments) await setMeta('assignments', backup.assignments);
  if (backup.student) await setMeta('student', backup.student);
  if (backup.pomodoroSessions) await setMeta('pomodoroSessions', backup.pomodoroSessions);
  if (backup.settings) await setMeta('settings', backup.settings);
};

export const clearAllLocalData = async (): Promise<void> => {
  localStorage.clear();
  const db = await initDB();
  const tx = db.transaction(['files', 'metadata'], 'readwrite');
  tx.objectStore('files').clear();
  tx.objectStore('metadata').clear();
  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
};
