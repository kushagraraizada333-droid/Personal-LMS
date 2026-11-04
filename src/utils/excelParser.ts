import * as XLSX from 'xlsx';
import {
  TimetableDay,
  TimetableSlot,
  SubjectAttendance,
  AttendanceSession,
  Assignment,
  EvaluationComponent,
} from '../types';

export interface ParsedWorkbookResult {
  timetable?: TimetableDay[];
  attendance?: SubjectAttendance[];
  message: string;
}

const parseSlotType = (
  text: string
): { type: TimetableSlot['type']; subjectCode?: string; title: string } => {
  if (!text || text.trim() === '' || text.trim().toLowerCase() === 'lunch') {
    return {
      type: text.trim().toLowerCase() === 'lunch' ? 'lunch' : 'free',
      title: text.trim().toLowerCase() === 'lunch' ? 'Lunch Break' : 'Free Slot',
    };
  }

  const upper = text.toUpperCase();

  if (
    upper.includes('DUSSEHRA') ||
    upper.includes('DEEPAWALI') ||
    upper.includes('GOVARDHAN') ||
    upper.includes('GURU NANAK') ||
    upper.includes('CHRISTMAS') ||
    upper.includes('TOIL') ||
    upper.includes('SANGAM')
  ) {
    return { type: 'holiday', title: text.trim() };
  }

  if (upper.includes('END TERM')) {
    return { type: 'endterm', title: text.trim() };
  }

  if (upper.includes('MID TERM') || upper.includes('MID-TERM')) {
    let subjectCode: string | undefined;
    if (upper.includes('ME')) subjectCode = 'ME';
    return { type: 'midterm', subjectCode, title: text.trim() };
  }

  if (upper.includes('QUIZ')) {
    let subjectCode: string | undefined;
    if (upper.includes('ME')) subjectCode = 'ME';
    if (upper.includes('PM2')) subjectCode = 'PM2';
    return { type: 'quiz', subjectCode, title: text.trim() };
  }

  if (upper.includes('CXO')) {
    return { type: 'cxo', title: text.trim() };
  }

  if (upper.includes('TCC')) {
    return { type: 'tcc', title: text.trim() };
  }

  // Detect course codes
  const codes = ['IET', 'UX', 'LA', 'MRM', 'ME', 'PM2', 'CV2', 'EM'];
  for (const c of codes) {
    if (upper.startsWith(c) || upper.includes(c + '-') || upper.includes(c + ' ')) {
      return { type: 'class', subjectCode: c, title: text.trim() };
    }
  }

  return { type: 'other', title: text.trim() };
};

/**
 * Parses the Timetable Sheet from the HSB Workbook
 */
export const parseTimetableSheet = (sheet: XLSX.WorkSheet): TimetableDay[] => {
  const data: (string | number | undefined)[][] = XLSX.utils.sheet_to_json(sheet, {
    header: 1,
    defval: '',
  });

  const timetableDays: TimetableDay[] = [];
  let currentWeek = 1;

  for (let r = 0; r < data.length; r++) {
    const row = data[r];
    if (!row || row.length === 0) continue;

    const firstCol = String(row[0] || '').trim();

    // Check for Week header
    if (firstCol.toLowerCase().startsWith('week ')) {
      const match = firstCol.match(/\d+/);
      if (match) {
        currentWeek = parseInt(match[0], 10);
      }
      continue;
    }

    // Check if this row is a date row (e.g. 2026-10-05)
    if (/^\d{4}-\d{2}-\d{2}$/.test(firstCol)) {
      const dateStr = firstCol;
      const dayName = String(row[1] || '').trim();

      const slot1 = String(row[2] || '');
      const slot2 = String(row[3] || '');
      const slotLunch = String(row[4] || 'LUNCH');
      const slot3 = String(row[5] || '');
      const slot4 = String(row[6] || '');
      const slot5 = String(row[7] || '');
      const remarks = String(row[8] || '');

      const parsedSlot1 = parseSlotType(slot1);
      const parsedSlot2 = parseSlotType(slot2);
      const parsedLunch = parseSlotType(slotLunch);
      const parsedSlot3 = parseSlotType(slot3);
      const parsedSlot4 = parseSlotType(slot4);
      const parsedSlot5 = parseSlotType(slot5);

      timetableDays.push({
        date: dateStr,
        dayName,
        weekNumber: currentWeek,
        remarks: remarks.trim() || undefined,
        slots: {
          '0930_1100': {
            timeRange: '09:30 – 11:00',
            rawText: slot1,
            ...parsedSlot1,
          },
          '1115_1245': {
            timeRange: '11:15 – 12:45',
            rawText: slot2,
            ...parsedSlot2,
          },
          '1245_1400': {
            timeRange: '12:45 – 14:00',
            rawText: slotLunch,
            ...parsedLunch,
          },
          '1400_1530': {
            timeRange: '14:00 – 15:30',
            rawText: slot3,
            ...parsedSlot3,
          },
          '1545_1715': {
            timeRange: '15:45 – 17:15',
            rawText: slot4,
            ...parsedSlot4,
          },
          '1730_1900': {
            timeRange: '17:30 – 19:00',
            rawText: slot5,
            ...parsedSlot5,
          },
        },
      });
    }
  }

  return timetableDays;
};

/**
 * Parses a Subject Attendance Sheet for Kushagra Raizada (Roll: 2026MBAPM018)
 */
export const parseSubjectAttendanceSheet = (
  sheet: XLSX.WorkSheet,
  subjectCode: string,
  targetRollNumber: string = '2026MBAPM018'
): SubjectAttendance | null => {
  const data: (string | number | undefined)[][] = XLSX.utils.sheet_to_json(sheet, {
    header: 1,
    defval: '',
  });

  if (data.length < 6) return null;

  // Find Header Row containing Roll Number, Student Name, S1, S2...
  let headerRowIdx = -1;
  for (let r = 0; r < Math.min(10, data.length); r++) {
    const row = data[r];
    const joined = row.join(' ').toLowerCase();
    if (joined.includes('roll number') && joined.includes('s1')) {
      headerRowIdx = r;
      break;
    }
  }

  if (headerRowIdx === -1) return null;

  const headerRow = data[headerRowIdx];
  const dateRow = data[headerRowIdx + 1] || [];
  const timingRow = data[headerRowIdx + 2] || [];

  // Find session columns
  const sessionCols: { colIdx: number; sessionNum: number; date: string; timeSlot: string }[] = [];
  let latesColIdx = -1;

  for (let c = 0; c < headerRow.length; c++) {
    const val = String(headerRow[c] || '').trim();
    if (/^S\d+$/i.test(val)) {
      const sNum = parseInt(val.replace(/\D/g, ''), 10);
      const rawDate = String(dateRow[c] || '').replace('Date ->', '').trim();
      const rawTime = String(timingRow[c] || '').replace('Timing ->', '').replace(/\r?\n/g, ' ').trim();
      sessionCols.push({
        colIdx: c,
        sessionNum: sNum,
        date: rawDate,
        timeSlot: rawTime,
      });
    } else if (val.toLowerCase().includes('late')) {
      latesColIdx = c;
    }
  }

  // Find target student row
  let studentRow: (string | number | undefined)[] | null = null;
  const allStudentRows: (string | number | undefined)[][] = [];

  for (let r = headerRowIdx + 1; r < data.length; r++) {
    const row = data[r];
    const roll = String(row[0] || '').trim();
    if (roll.startsWith('2026MBAPM')) {
      allStudentRows.push(row);
      if (roll === targetRollNumber) {
        studentRow = row;
      }
    }
  }

  if (!studentRow) return null;

  // Determine which sessions have been CONDUCTED vs UPCOMING
  // A session is conducted if any student in the batch has a 1 or if attendance was marked
  const sessions: AttendanceSession[] = [];

  for (const sCol of sessionCols) {
    let hasBatchMark = false;
    for (const stRow of allStudentRows) {
      const cellVal = Number(stRow[sCol.colIdx]);
      if (cellVal > 0) {
        hasBatchMark = true;
        break;
      }
    }

    const studentVal = Number(studentRow[sCol.colIdx]);

    if (hasBatchMark) {
      sessions.push({
        sessionNumber: sCol.sessionNum,
        label: `S${sCol.sessionNum}`,
        date: sCol.date,
        timeSlot: sCol.timeSlot,
        isConducted: true,
        status: studentVal === 1 ? 'Present' : 'Absent',
      });
    } else {
      sessions.push({
        sessionNumber: sCol.sessionNum,
        label: `S${sCol.sessionNum}`,
        date: sCol.date,
        timeSlot: sCol.timeSlot,
        isConducted: false,
        status: 'Upcoming',
      });
    }
  }

  const lates = latesColIdx !== -1 ? Number(studentRow[latesColIdx]) || 0 : 0;

  return {
    subjectCode,
    sessions,
    lates,
  };
};

/**
 * Universal HSB Excel Workbook Parser (.xlsx)
 */
export const parseHSBWorkbook = async (file: File): Promise<ParsedWorkbookResult> => {
  const buffer = await file.arrayBuffer();
  const workbook = XLSX.read(buffer, { type: 'array' });

  let parsedTimetable: TimetableDay[] | undefined;
  const parsedAttendance: SubjectAttendance[] = [];

  for (const sheetName of workbook.SheetNames) {
    const sheet = workbook.Sheets[sheetName];
    const lower = sheetName.toLowerCase();

    // Check for timetable sheet
    if (lower.includes('timetable') || lower.includes('time table') || lower.includes('term-ii')) {
      const tt = parseTimetableSheet(sheet);
      if (tt.length > 0) {
        parsedTimetable = tt;
      }
    }

    // Check for subject attendance sheets
    const codeMap: { [key: string]: string } = {
      iet: 'IET',
      'emerging technologies': 'IET',
      mrm: 'MRM',
      'market research': 'MRM',
      me: 'ME',
      'micro economics': 'ME',
      pm2: 'PM2',
      'product management': 'PM2',
      ux: 'UX',
      ui: 'UX',
      la: 'LA',
      leadership: 'LA',
      em: 'EM',
      entrepreneurial: 'EM',
      cv2: 'CV2',
    };

    for (const [key, code] of Object.entries(codeMap)) {
      if (lower.includes(key)) {
        const att = parseSubjectAttendanceSheet(sheet, code, '2026MBAPM018');
        if (att && att.sessions.length > 0) {
          // Avoid duplicate subject attendance
          if (!parsedAttendance.some((a) => a.subjectCode === code)) {
            parsedAttendance.push(att);
          }
        }
        break;
      }
    }
  }

  return {
    timetable: parsedTimetable,
    attendance: parsedAttendance,
    message: `Parsed workbook with ${parsedTimetable?.length || 0} timetable days and attendance for ${parsedAttendance.length} subjects.`,
  };
};

/**
 * Parses an Assignment Schedule file (.xlsx or .csv)
 */
export const parseAssignmentsFile = async (file: File): Promise<Omit<Assignment, 'id'>[]> => {
  const buffer = await file.arrayBuffer();
  const workbook = XLSX.read(buffer, { type: 'array' });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows: Record<string, string | number>[] = XLSX.utils.sheet_to_json(sheet, { defval: '' });

  const assignments: Omit<Assignment, 'id'>[] = [];

  for (const row of rows) {
    const title = String(row['Title'] || row['title'] || row['Assignment'] || '').trim();
    const subject = String(row['Subject'] || row['Course'] || row['Code'] || 'PM2').trim();
    const dueDate = String(row['Due Date'] || row['Deadline'] || row['Date'] || '').trim();

    if (title) {
      assignments.push({
        title,
        subjectId: subject,
        dueDate: dueDate ? new Date(dueDate).toISOString() : new Date().toISOString(),
        priority: 'Medium',
        status: 'Pending',
        weightage: Number(row['Weightage'] || row['Weight'] || 20) || 20,
        description: String(row['Description'] || row['Notes'] || ''),
      });
    }
  }

  return assignments;
};

/**
 * Parses a Marks / Grades Sheet (.xlsx or .csv)
 */
export const parseMarksFile = async (
  file: File,
  subjectId: string
): Promise<Omit<EvaluationComponent, 'id'>[]> => {
  const buffer = await file.arrayBuffer();
  const workbook = XLSX.read(buffer, { type: 'array' });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows: Record<string, string | number>[] = XLSX.utils.sheet_to_json(sheet, { defval: '' });

  const components: Omit<EvaluationComponent, 'id'>[] = [];

  for (const row of rows) {
    const name = String(row['Component'] || row['Name'] || row['Evaluation'] || '').trim();
    const marksObtained = Number(row['Marks Obtained'] || row['Score'] || row['Marks'] || 0);
    const maxMarks = Number(row['Max Marks'] || row['Total'] || 100);
    const weightage = Number(row['Weightage'] || row['Weight'] || 25);

    if (name) {
      components.push({
        name,
        marksObtained,
        maxMarks,
        weightage,
      });
    }
  }

  return components;
};
