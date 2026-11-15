import {
  LMSBackupData,
  Subject,
  Assignment,
  StoredFileMetadata,
  StoredFileBlob,
  PomodoroSession,
  SubjectAttendance,
  TimetableDay,
  ExamReminder,
  StudentProfile,
} from '../types';
import {
  setMeta,
  getAllFileMetadata,
  getFileBlob,
  saveFileBlobsBatch,
  initDB,
} from './indexedDB';

const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

const base64ToBlob = async (base64DataUrl: string): Promise<Blob> => {
  const res = await fetch(base64DataUrl);
  return await res.blob();
};

export const generateBackupObject = async (
  subjects: Subject[],
  attendance: SubjectAttendance[],
  timetable: TimetableDay[],
  examReminders: ExamReminder[],
  assignments: Assignment[],
  student: StudentProfile,
  pomodoroSessions: PomodoroSession[],
  darkMode: boolean,
  includeFiles: boolean = true
): Promise<LMSBackupData> => {
  const fileMetadata: StoredFileMetadata[] = await getAllFileMetadata();

  let storedFiles: Array<StoredFileMetadata & { base64Data?: string }> | undefined;

  if (includeFiles && fileMetadata.length > 0) {
    storedFiles = [];
    for (const meta of fileMetadata) {
      try {
        const fullBlob = await getFileBlob(meta.id);
        if (fullBlob && fullBlob.blob) {
          const b64 = await blobToBase64(fullBlob.blob);
          storedFiles.push({
            ...meta,
            base64Data: b64,
          });
        } else {
          storedFiles.push(meta);
        }
      } catch (e) {
        console.warn(`Could not export blob for ${meta.name}:`, e);
        storedFiles.push(meta);
      }
    }
  }

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
    storedFiles,
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
  darkMode: boolean,
  includeFiles: boolean = true
): Promise<void> => {
  const backupData = await generateBackupObject(
    subjects,
    attendance,
    timetable,
    examReminders,
    assignments,
    student,
    pomodoroSessions,
    darkMode,
    includeFiles
  );
  const jsonStr = JSON.stringify(backupData);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const now = new Date();
  const dateStr = now.toISOString().split('T')[0];
  const a = document.createElement('a');
  a.href = url;
  a.download = `HSB_LMS_Backup_${student.rollNumber || '2026MBAPM018'}_${dateStr}.json`;
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
  // Use correct Trimester II database keys
  await setMeta('subjects_t2', backup.subjects);
  if (backup.attendance) await setMeta('attendance_t2', backup.attendance);
  if (backup.timetable) await setMeta('timetable_t2', backup.timetable);
  if (backup.examReminders) await setMeta('exam_reminders_t2', backup.examReminders);
  if (backup.assignments) await setMeta('assignments_t2', backup.assignments);
  if (backup.student) await setMeta('student_t2', backup.student);
  if (backup.pomodoroSessions) await setMeta('pomodoroSessions', backup.pomodoroSessions);
  if (backup.settings) await setMeta('settings', backup.settings);

  // Restore uploaded file blobs if included in the backup
  if (backup.storedFiles && backup.storedFiles.length > 0) {
    const blobsToRestore: StoredFileBlob[] = [];
    for (const f of backup.storedFiles) {
      if (f.base64Data) {
        try {
          const blob = await base64ToBlob(f.base64Data);
          blobsToRestore.push({
            id: f.id,
            subjectId: f.subjectId,
            name: f.name,
            size: f.size,
            type: f.type,
            moduleTag: f.moduleTag,
            uploadDate: f.uploadDate,
            assignmentId: f.assignmentId,
            blob,
          });
        } catch (e) {
          console.warn(`Failed to restore blob for ${f.name}:`, e);
        }
      }
    }
    if (blobsToRestore.length > 0) {
      await saveFileBlobsBatch(blobsToRestore);
    }
  }
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
