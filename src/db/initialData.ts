import {
  StudentProfile,
  Subject,
  SubjectAttendance,
  TimetableDay,
  ExamReminder,
} from '../types';

export const INITIAL_STUDENT: StudentProfile = {
  name: 'Kushagra Raizada',
  rollNumber: '2026MBAPM018',
  resourceId: 'MBA26/0463',
  institution: 'Harishankar Singhania School of Business (HSB), Jaipur',
  program: 'MBA (Product Management)',
  term: 'Trimester II',
  batch: 'Batch 2026–28',
  academicYear: 'AY 2026–27',
  targetCGPA: 9.0,
};

/**
 * EXACT 8 TRIMESTER II SUBJECTS FROM HSB COURSE DB (16 TOTAL CREDITS)
 * All evaluations and modules start at [] (Zero dummy marks, zero fake progress)
 */
export const INITIAL_SUBJECTS: Subject[] = [
  {
    id: 'subj-iet',
    code: 'IET',
    name: 'Introduction to Emerging Technologies',
    faculty: 'Mr. Laxminarayanan G',
    ta: 'Aman',
    term: 'Trimester II',
    credits: 2,
    plannedSessions: 15,
    color: '#0284C7', // Sky Blue
    modules: [],
    evaluations: [],
  },
  {
    id: 'subj-ux',
    code: 'UX',
    name: 'Introduction to UI/UX',
    faculty: 'Ms. Avni Mathur',
    ta: 'Kusum',
    term: 'Trimester II',
    credits: 1,
    plannedSessions: 10,
    color: '#8B5CF6', // Violet
    modules: [],
    evaluations: [],
  },
  {
    id: 'subj-la',
    code: 'LA',
    name: 'Leadership Accelerator',
    faculty: 'Col. Rajiv Bhargava',
    ta: 'Kusum',
    term: 'Trimester II',
    credits: 3,
    plannedSessions: 20,
    color: '#D97706', // Amber / Gold
    modules: [],
    evaluations: [],
  },
  {
    id: 'subj-mrm',
    code: 'MRM',
    name: 'Market Research Methods',
    faculty: 'Dr. Amar Saxena',
    ta: 'Aman',
    term: 'Trimester II',
    credits: 3,
    plannedSessions: 20,
    color: '#2563EB', // Royal Blue
    modules: [],
    evaluations: [],
  },
  {
    id: 'subj-me',
    code: 'ME',
    name: 'Micro Economics',
    faculty: 'Prof. Gopal Naik',
    ta: 'Aman',
    term: 'Trimester II',
    credits: 2,
    plannedSessions: 15,
    color: '#0D9488', // Teal
    modules: [],
    evaluations: [],
  },
  {
    id: 'subj-pm2',
    code: 'PM2',
    name: 'Product Management-II',
    faculty: 'Dr. Anand Fadte',
    ta: 'Kusum',
    term: 'Trimester II',
    credits: 3,
    plannedSessions: 20,
    color: '#0A2540', // HSB Deep Corporate Blue
    modules: [],
    evaluations: [],
  },
  {
    id: 'subj-cv2',
    code: 'CV2',
    name: 'CV Interview Workshop (26-28)',
    faculty: 'The Career Company',
    ta: 'N/A',
    term: 'Trimester II',
    credits: 1,
    plannedSessions: 6,
    color: '#4F46E5', // Indigo
    modules: [],
    evaluations: [],
  },
  {
    id: 'subj-em',
    code: 'EM',
    name: 'Entrepreneurial Mindset (combined batch)',
    faculty: 'Mr. Gagan Jain',
    ta: 'Aman',
    term: 'Trimester II',
    credits: 1,
    plannedSessions: 10,
    color: '#E11D48', // Rose
    modules: [],
    evaluations: [],
  },
];

/**
 * EXACT ATTENDANCE DATA FOR KUSHAGRA RAIZADA (2026MBAPM018)
 * Directly parsed from HSB Attendance Sheets (IET, MRM, ME, PM2)
 */
export const INITIAL_ATTENDANCE: SubjectAttendance[] = [
  {
    "subjectCode": "IET",
    "sessions": [
      {
        "sessionNumber": 1,
        "label": "S1",
        "date": "2026-10-19",
        "timeSlot": "09:30- 11:00",
        "isConducted": true,
        "status": "Present"
      },
      {
        "sessionNumber": 2,
        "label": "S2",
        "date": "2026-10-19",
        "timeSlot": "11:15- 12:45",
        "isConducted": true,
        "status": "Present"
      },
      {
        "sessionNumber": 3,
        "label": "S3",
        "date": "2026-10-20",
        "timeSlot": "09:30- 11:00",
        "isConducted": true,
        "status": "Present"
      },
      {
        "sessionNumber": 4,
        "label": "S4",
        "date": "2026-10-20",
        "timeSlot": "11:15- 12:45",
        "isConducted": true,
        "status": "Present"
      },
      {
        "sessionNumber": 5,
        "label": "S5",
        "date": "2026-10-20",
        "timeSlot": "14:00- 15:30",
        "isConducted": true,
        "status": "Absent"
      },
      {
        "sessionNumber": 6,
        "label": "S6",
        "date": "2026-11-11",
        "timeSlot": "14:00- 15:30",
        "isConducted": false,
        "status": "Upcoming"
      },
      {
        "sessionNumber": 7,
        "label": "S7",
        "date": "2026-11-11",
        "timeSlot": "15:45- 17:15",
        "isConducted": false,
        "status": "Upcoming"
      },
      {
        "sessionNumber": 8,
        "label": "S8",
        "date": "2026-11-12",
        "timeSlot": "09:00- 10:30",
        "isConducted": false,
        "status": "Upcoming"
      },
      {
        "sessionNumber": 9,
        "label": "S9",
        "date": "2026-11-12",
        "timeSlot": "14:00- 15:30",
        "isConducted": false,
        "status": "Upcoming"
      },
      {
        "sessionNumber": 10,
        "label": "S10",
        "date": "2026-11-12",
        "timeSlot": "15:45- 17:15",
        "isConducted": false,
        "status": "Upcoming"
      },
      {
        "sessionNumber": 11,
        "label": "S11",
        "date": "2026-11-12",
        "timeSlot": "19:30- 21:00",
        "isConducted": false,
        "status": "Upcoming"
      },
      {
        "sessionNumber": 12,
        "label": "S12",
        "date": "2026-11-13",
        "timeSlot": "09:00- 10:30",
        "isConducted": false,
        "status": "Upcoming"
      },
      {
        "sessionNumber": 13,
        "label": "S13",
        "date": "2026-11-13",
        "timeSlot": "11:15- 12:45",
        "isConducted": false,
        "status": "Upcoming"
      },
      {
        "sessionNumber": 14,
        "label": "S14",
        "date": "2026-11-14",
        "timeSlot": "14:00- 15:30",
        "isConducted": false,
        "status": "Upcoming"
      },
      {
        "sessionNumber": 15,
        "label": "S15",
        "date": "2026-11-14",
        "timeSlot": "15:45- 17:15",
        "isConducted": false,
        "status": "Upcoming"
      }
    ],
    "lates": 0
  },
  {
    "subjectCode": "MRM",
    "sessions": [
      {
        "sessionNumber": 1,
        "label": "S1",
        "date": "2026-10-08",
        "timeSlot": "14:00- 15:30",
        "isConducted": true,
        "status": "Present"
      },
      {
        "sessionNumber": 2,
        "label": "S2",
        "date": "2026-10-08",
        "timeSlot": "15:45- 17:15",
        "isConducted": true,
        "status": "Present"
      },
      {
        "sessionNumber": 3,
        "label": "S3",
        "date": "2026-10-09",
        "timeSlot": "14:00- 15:30",
        "isConducted": true,
        "status": "Present"
      },
      {
        "sessionNumber": 4,
        "label": "S4",
        "date": "2026-10-09",
        "timeSlot": "15:45- 17:15",
        "isConducted": true,
        "status": "Present"
      },
      {
        "sessionNumber": 5,
        "label": "S5",
        "date": "2026-10-10",
        "timeSlot": "14:00- 15:30",
        "isConducted": true,
        "status": "Present"
      },
      {
        "sessionNumber": 6,
        "label": "S6",
        "date": "2026-10-10",
        "timeSlot": "15:45- 17:15",
        "isConducted": true,
        "status": "Present"
      },
      {
        "sessionNumber": 7,
        "label": "S7",
        "date": "2026-10-22",
        "timeSlot": "14:00- 15:30",
        "isConducted": true,
        "status": "Present"
      },
      {
        "sessionNumber": 8,
        "label": "S8",
        "date": "2026-10-22",
        "timeSlot": "15:45- 17:15",
        "isConducted": true,
        "status": "Present"
      },
      {
        "sessionNumber": 9,
        "label": "S9",
        "date": "2026-10-23",
        "timeSlot": "14:00- 15:30",
        "isConducted": true,
        "status": "Present"
      },
      {
        "sessionNumber": 10,
        "label": "S10",
        "date": "2026-10-23",
        "timeSlot": "15:45- 17:15",
        "isConducted": true,
        "status": "Present"
      },
      {
        "sessionNumber": 11,
        "label": "S11",
        "date": "2026-10-24",
        "timeSlot": "14:00- 15:30",
        "isConducted": true,
        "status": "Present"
      },
      {
        "sessionNumber": 12,
        "label": "S12",
        "date": "2026-10-24",
        "timeSlot": "15:45- 17:15",
        "isConducted": true,
        "status": "Present"
      },
      {
        "sessionNumber": 13,
        "label": "S13",
        "date": "2026-11-12",
        "timeSlot": "14:00- 15:30",
        "isConducted": false,
        "status": "Upcoming"
      },
      {
        "sessionNumber": 14,
        "label": "S14",
        "date": "2026-11-12",
        "timeSlot": "15:45- 17:15",
        "isConducted": false,
        "status": "Upcoming"
      },
      {
        "sessionNumber": 15,
        "label": "S15",
        "date": "2026-11-13",
        "timeSlot": "14:00- 15:30",
        "isConducted": false,
        "status": "Upcoming"
      },
      {
        "sessionNumber": 16,
        "label": "S16",
        "date": "2026-11-13",
        "timeSlot": "15:45- 17:15",
        "isConducted": false,
        "status": "Upcoming"
      },
      {
        "sessionNumber": 17,
        "label": "S17",
        "date": "2026-11-14",
        "timeSlot": "09:30- 11:00",
        "isConducted": false,
        "status": "Upcoming"
      },
      {
        "sessionNumber": 18,
        "label": "S18",
        "date": "2026-11-14",
        "timeSlot": "11:15- 12:45",
        "isConducted": false,
        "status": "Upcoming"
      },
      {
        "sessionNumber": 19,
        "label": "S19",
        "date": "2026-11-19",
        "timeSlot": "09:30- 11:00",
        "isConducted": false,
        "status": "Upcoming"
      },
      {
        "sessionNumber": 20,
        "label": "S20",
        "date": "2026-11-19",
        "timeSlot": "11:15- 12:45",
        "isConducted": false,
        "status": "Upcoming"
      }
    ],
    "lates": 0
  },
  {
    "subjectCode": "ME",
    "sessions": [
      {
        "sessionNumber": 1,
        "label": "S1",
        "date": "2026-10-09",
        "timeSlot": "09:30- 11:00",
        "isConducted": true,
        "status": "Present"
      },
      {
        "sessionNumber": 2,
        "label": "S2",
        "date": "2026-10-09",
        "timeSlot": "11:15- 12:45",
        "isConducted": true,
        "status": "Present"
      },
      {
        "sessionNumber": 3,
        "label": "S3",
        "date": "2026-10-10",
        "timeSlot": "09:30- 11:00",
        "isConducted": true,
        "status": "Absent"
      },
      {
        "sessionNumber": 4,
        "label": "S4",
        "date": "2026-10-10",
        "timeSlot": "11:15- 12:45",
        "isConducted": true,
        "status": "Present"
      },
      {
        "sessionNumber": 5,
        "label": "S5",
        "date": "2026-10-26",
        "timeSlot": "09:30- 11:00",
        "isConducted": true,
        "status": "Absent"
      },
      {
        "sessionNumber": 6,
        "label": "S6",
        "date": "2026-10-26",
        "timeSlot": "11:15- 12:45",
        "isConducted": true,
        "status": "Present"
      },
      {
        "sessionNumber": 7,
        "label": "S7",
        "date": "2026-10-26",
        "timeSlot": "14:00- 15:30",
        "isConducted": true,
        "status": "Present"
      },
      {
        "sessionNumber": 8,
        "label": "S8",
        "date": "2026-10-27",
        "timeSlot": "09:30- 11:00",
        "isConducted": true,
        "status": "Present"
      },
      {
        "sessionNumber": 9,
        "label": "S9",
        "date": "2026-10-27",
        "timeSlot": "11:15- 12:45",
        "isConducted": true,
        "status": "Present"
      },
      {
        "sessionNumber": 10,
        "label": "S10",
        "date": "2026-10-27",
        "timeSlot": "14:00- 15:30",
        "isConducted": true,
        "status": "Present"
      },
      {
        "sessionNumber": 11,
        "label": "S11",
        "date": "2026-11-10",
        "timeSlot": "09:30- 11:00",
        "isConducted": false,
        "status": "Upcoming"
      },
      {
        "sessionNumber": 12,
        "label": "S12",
        "date": "2026-11-10",
        "timeSlot": "11:15- 12:45",
        "isConducted": false,
        "status": "Upcoming"
      },
      {
        "sessionNumber": 13,
        "label": "S13",
        "date": "2026-11-10",
        "timeSlot": "14:00- 15:30",
        "isConducted": false,
        "status": "Upcoming"
      },
      {
        "sessionNumber": 14,
        "label": "S14",
        "date": "2026-11-11",
        "timeSlot": "09:30- 11:00",
        "isConducted": false,
        "status": "Upcoming"
      },
      {
        "sessionNumber": 15,
        "label": "S15",
        "date": "2026-11-11",
        "timeSlot": "11:15- 12:45",
        "isConducted": false,
        "status": "Upcoming"
      }
    ],
    "lates": 0
  },
  {
    "subjectCode": "PM2",
    "sessions": [
      {
        "sessionNumber": 1,
        "label": "S1",
        "date": "2026-10-12",
        "timeSlot": "09:30- 11:00",
        "isConducted": true,
        "status": "Present"
      },
      {
        "sessionNumber": 2,
        "label": "S2",
        "date": "2026-10-12",
        "timeSlot": "11:15- 12:45",
        "isConducted": true,
        "status": "Present"
      },
      {
        "sessionNumber": 3,
        "label": "S3",
        "date": "2026-10-13",
        "timeSlot": "14:00- 15:30",
        "isConducted": true,
        "status": "Present"
      },
      {
        "sessionNumber": 4,
        "label": "S4",
        "date": "2026-10-13",
        "timeSlot": "18:00- 19:30",
        "isConducted": true,
        "status": "Present"
      },
      {
        "sessionNumber": 5,
        "label": "S5",
        "date": "2026-10-14",
        "timeSlot": "09:30- 11:00",
        "isConducted": true,
        "status": "Present"
      },
      {
        "sessionNumber": 6,
        "label": "S6",
        "date": "2026-10-14",
        "timeSlot": "11:15- 12:45",
        "isConducted": true,
        "status": "Present"
      },
      {
        "sessionNumber": 7,
        "label": "S7",
        "date": "2026-10-15",
        "timeSlot": "09:30- 11:00",
        "isConducted": true,
        "status": "Present"
      },
      {
        "sessionNumber": 8,
        "label": "S8",
        "date": "2026-10-15",
        "timeSlot": "11:15- 12:45",
        "isConducted": true,
        "status": "Present"
      },
      {
        "sessionNumber": 9,
        "label": "S9",
        "date": "2026-10-16",
        "timeSlot": "14:00- 15:30",
        "isConducted": true,
        "status": "Present"
      },
      {
        "sessionNumber": 10,
        "label": "S10",
        "date": "2026-10-16",
        "timeSlot": "15:45- 17:15",
        "isConducted": true,
        "status": "Present"
      },
      {
        "sessionNumber": 11,
        "label": "S11",
        "date": "2026-10-28",
        "timeSlot": "14:00- 15:30",
        "isConducted": true,
        "status": "Present"
      },
      {
        "sessionNumber": 12,
        "label": "S12",
        "date": "2026-10-28",
        "timeSlot": "15:45- 17:15",
        "isConducted": true,
        "status": "Present"
      },
      {
        "sessionNumber": 13,
        "label": "S13",
        "date": "2026-10-29",
        "timeSlot": "09:30- 11:00",
        "isConducted": true,
        "status": "Present"
      },
      {
        "sessionNumber": 14,
        "label": "S14",
        "date": "2026-10-29",
        "timeSlot": "11:15- 12:45",
        "isConducted": true,
        "status": "Present"
      },
      {
        "sessionNumber": 15,
        "label": "S15",
        "date": "2026-10-30",
        "timeSlot": "09:30- 11:00",
        "isConducted": true,
        "status": "Absent"
      },
      {
        "sessionNumber": 16,
        "label": "S16",
        "date": "2026-10-30",
        "timeSlot": "11:15- 12:45",
        "isConducted": true,
        "status": "Absent"
      },
      {
        "sessionNumber": 17,
        "label": "S17",
        "date": "2026-10-30",
        "timeSlot": "14:00- 15:30",
        "isConducted": true,
        "status": "Present"
      },
      {
        "sessionNumber": 18,
        "label": "S18",
        "date": "2026-11-02",
        "timeSlot": "15:45- 17:15",
        "isConducted": true,
        "status": "Present"
      },
      {
        "sessionNumber": 19,
        "label": "S19",
        "date": "2026-11-03",
        "timeSlot": "14:00- 15:30",
        "isConducted": true,
        "status": "Present"
      },
      {
        "sessionNumber": 20,
        "label": "S20",
        "date": "2026-11-03",
        "timeSlot": "15:45- 17:15",
        "isConducted": true,
        "status": "Present"
      }
    ],
    "lates": 0
  },
  {
    "subjectCode": "LA",
    "sessions": [
      {
        "sessionNumber": 1,
        "label": "S1",
        "date": "2026-10-21",
        "timeSlot": "09:30- 11:00",
        "isConducted": true,
        "status": "Present"
      },
      {
        "sessionNumber": 2,
        "label": "S2",
        "date": "2026-10-21",
        "timeSlot": "11:15- 12:45",
        "isConducted": true,
        "status": "Present"
      },
      {
        "sessionNumber": 3,
        "label": "S3",
        "date": "2026-10-22",
        "timeSlot": "09:30- 11:00",
        "isConducted": true,
        "status": "Present"
      },
      {
        "sessionNumber": 4,
        "label": "S4",
        "date": "2026-10-22",
        "timeSlot": "11:15- 12:45",
        "isConducted": true,
        "status": "Absent"
      },
      {
        "sessionNumber": 5,
        "label": "S5",
        "date": "2026-10-23",
        "timeSlot": "09:30- 11:00",
        "isConducted": true,
        "status": "Present"
      },
      {
        "sessionNumber": 6,
        "label": "S6",
        "date": "2026-11-02",
        "timeSlot": "09:30- 11:00",
        "isConducted": true,
        "status": "Present"
      },
      {
        "sessionNumber": 7,
        "label": "S7",
        "date": "2026-11-02",
        "timeSlot": "11:15- 12:45",
        "isConducted": true,
        "status": "Present"
      },
      {
        "sessionNumber": 8,
        "label": "S8",
        "date": "2026-11-02",
        "timeSlot": "14:00- 15:30",
        "isConducted": true,
        "status": "Present"
      },
      {
        "sessionNumber": 9,
        "label": "S9",
        "date": "2026-11-03",
        "timeSlot": "09:30- 11:00",
        "isConducted": true,
        "status": "Present"
      },
      {
        "sessionNumber": 10,
        "label": "S10",
        "date": "2026-11-03",
        "timeSlot": "11:15- 12:45",
        "isConducted": true,
        "status": "Present"
      },
      {
        "sessionNumber": 11,
        "label": "S11",
        "date": "2026-11-16",
        "timeSlot": "09:30- 11:00",
        "isConducted": false,
        "status": "Upcoming"
      },
      {
        "sessionNumber": 12,
        "label": "S12",
        "date": "2026-11-16",
        "timeSlot": "11:15- 12:45",
        "isConducted": false,
        "status": "Upcoming"
      },
      {
        "sessionNumber": 13,
        "label": "S13",
        "date": "2026-11-17",
        "timeSlot": "09:30- 11:00",
        "isConducted": false,
        "status": "Upcoming"
      },
      {
        "sessionNumber": 14,
        "label": "S14",
        "date": "2026-11-17",
        "timeSlot": "11:15- 12:45",
        "isConducted": false,
        "status": "Upcoming"
      },
      {
        "sessionNumber": 15,
        "label": "S15",
        "date": "2026-11-18",
        "timeSlot": "09:30- 11:00",
        "isConducted": false,
        "status": "Upcoming"
      },
      {
        "sessionNumber": 16,
        "label": "S16",
        "date": "2026-12-02",
        "timeSlot": "09:30- 11:00",
        "isConducted": false,
        "status": "Upcoming"
      },
      {
        "sessionNumber": 17,
        "label": "S17",
        "date": "2026-12-02",
        "timeSlot": "11:15- 12:45",
        "isConducted": false,
        "status": "Upcoming"
      },
      {
        "sessionNumber": 18,
        "label": "S18",
        "date": "2026-12-03",
        "timeSlot": "09:30- 11:00",
        "isConducted": false,
        "status": "Upcoming"
      },
      {
        "sessionNumber": 19,
        "label": "S19",
        "date": "2026-12-03",
        "timeSlot": "11:15- 12:45",
        "isConducted": false,
        "status": "Upcoming"
      },
      {
        "sessionNumber": 20,
        "label": "S20",
        "date": "2026-12-04",
        "timeSlot": "09:30- 11:00",
        "isConducted": false,
        "status": "Upcoming"
      }
    ],
    "lates": 0
  },
  {
    "subjectCode": "UX",
    "lates": 0,
    "sessions": [
      {
        "sessionNumber": 1,
        "label": "S1",
        "date": "2026-11-20",
        "timeSlot": "14:00 - 15:30",
        "isConducted": false,
        "status": "Upcoming"
      },
      {
        "sessionNumber": 2,
        "label": "S2",
        "date": "2026-11-20",
        "timeSlot": "14:00 - 15:30",
        "isConducted": false,
        "status": "Upcoming"
      },
      {
        "sessionNumber": 3,
        "label": "S3",
        "date": "2026-11-20",
        "timeSlot": "14:00 - 15:30",
        "isConducted": false,
        "status": "Upcoming"
      },
      {
        "sessionNumber": 4,
        "label": "S4",
        "date": "2026-11-20",
        "timeSlot": "14:00 - 15:30",
        "isConducted": false,
        "status": "Upcoming"
      },
      {
        "sessionNumber": 5,
        "label": "S5",
        "date": "2026-11-20",
        "timeSlot": "14:00 - 15:30",
        "isConducted": false,
        "status": "Upcoming"
      },
      {
        "sessionNumber": 6,
        "label": "S6",
        "date": "2026-11-20",
        "timeSlot": "14:00 - 15:30",
        "isConducted": false,
        "status": "Upcoming"
      },
      {
        "sessionNumber": 7,
        "label": "S7",
        "date": "2026-11-20",
        "timeSlot": "14:00 - 15:30",
        "isConducted": false,
        "status": "Upcoming"
      },
      {
        "sessionNumber": 8,
        "label": "S8",
        "date": "2026-11-20",
        "timeSlot": "14:00 - 15:30",
        "isConducted": false,
        "status": "Upcoming"
      },
      {
        "sessionNumber": 9,
        "label": "S9",
        "date": "2026-11-20",
        "timeSlot": "14:00 - 15:30",
        "isConducted": false,
        "status": "Upcoming"
      },
      {
        "sessionNumber": 10,
        "label": "S10",
        "date": "2026-11-20",
        "timeSlot": "14:00 - 15:30",
        "isConducted": false,
        "status": "Upcoming"
      }
    ]
  },
  {
    "subjectCode": "EM",
    "lates": 0,
    "sessions": [
      {
        "sessionNumber": 1,
        "label": "S1",
        "date": "2026-11-26",
        "timeSlot": "09:30 - 11:00",
        "isConducted": false,
        "status": "Upcoming"
      },
      {
        "sessionNumber": 2,
        "label": "S2",
        "date": "2026-11-26",
        "timeSlot": "09:30 - 11:00",
        "isConducted": false,
        "status": "Upcoming"
      },
      {
        "sessionNumber": 3,
        "label": "S3",
        "date": "2026-11-26",
        "timeSlot": "09:30 - 11:00",
        "isConducted": false,
        "status": "Upcoming"
      },
      {
        "sessionNumber": 4,
        "label": "S4",
        "date": "2026-11-26",
        "timeSlot": "09:30 - 11:00",
        "isConducted": false,
        "status": "Upcoming"
      },
      {
        "sessionNumber": 5,
        "label": "S5",
        "date": "2026-11-26",
        "timeSlot": "09:30 - 11:00",
        "isConducted": false,
        "status": "Upcoming"
      },
      {
        "sessionNumber": 6,
        "label": "S6",
        "date": "2026-11-26",
        "timeSlot": "09:30 - 11:00",
        "isConducted": false,
        "status": "Upcoming"
      },
      {
        "sessionNumber": 7,
        "label": "S7",
        "date": "2026-11-26",
        "timeSlot": "09:30 - 11:00",
        "isConducted": false,
        "status": "Upcoming"
      },
      {
        "sessionNumber": 8,
        "label": "S8",
        "date": "2026-11-26",
        "timeSlot": "09:30 - 11:00",
        "isConducted": false,
        "status": "Upcoming"
      },
      {
        "sessionNumber": 9,
        "label": "S9",
        "date": "2026-11-26",
        "timeSlot": "09:30 - 11:00",
        "isConducted": false,
        "status": "Upcoming"
      },
      {
        "sessionNumber": 10,
        "label": "S10",
        "date": "2026-11-26",
        "timeSlot": "09:30 - 11:00",
        "isConducted": false,
        "status": "Upcoming"
      }
    ]
  },
  {
    "subjectCode": "CV2",
    "lates": 0,
    "sessions": [
      {
        "sessionNumber": 1,
        "label": "S1",
        "date": "2026-10-07",
        "timeSlot": "08:30 - 13:00",
        "isConducted": false,
        "status": "Upcoming"
      },
      {
        "sessionNumber": 2,
        "label": "S2",
        "date": "2026-10-07",
        "timeSlot": "08:30 - 13:00",
        "isConducted": false,
        "status": "Upcoming"
      },
      {
        "sessionNumber": 3,
        "label": "S3",
        "date": "2026-10-07",
        "timeSlot": "08:30 - 13:00",
        "isConducted": false,
        "status": "Upcoming"
      },
      {
        "sessionNumber": 4,
        "label": "S4",
        "date": "2026-10-07",
        "timeSlot": "08:30 - 13:00",
        "isConducted": false,
        "status": "Upcoming"
      },
      {
        "sessionNumber": 5,
        "label": "S5",
        "date": "2026-10-07",
        "timeSlot": "08:30 - 13:00",
        "isConducted": false,
        "status": "Upcoming"
      },
      {
        "sessionNumber": 6,
        "label": "S6",
        "date": "2026-10-07",
        "timeSlot": "08:30 - 13:00",
        "isConducted": false,
        "status": "Upcoming"
      }
    ]
  }
];

/**
 * EXACT WEEKS 1–12 TIMETABLE PARSED FROM HSB WORKBOOK (OCT 2026 – DEC 2026)
 */
export const getInitialTimetable = (): TimetableDay[] => {
  return [
  {
    "date": "2026-10-05",
    "dayName": "Monday",
    "weekNumber": 1,
    "slots": {
      "0930_1100": {
        "timeRange": "09:30 – 11:00",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1115_1245": {
        "timeRange": "11:15 – 12:45",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1245_1400": {
        "timeRange": "12:45 – 14:00",
        "rawText": "LUNCH",
        "type": "lunch",
        "title": "Lunch Break"
      },
      "1400_1530": {
        "timeRange": "14:00 – 15:30",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1545_1715": {
        "timeRange": "15:45 – 17:15",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1730_1900": {
        "timeRange": "17:30 – 19:00",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      }
    }
  },
  {
    "date": "2026-10-06",
    "dayName": "Tuesday",
    "weekNumber": 1,
    "slots": {
      "0930_1100": {
        "timeRange": "09:30 – 11:00",
        "rawText": "CXO talk: Vijay Sharma (Silver Oak)\r\n09:30-11:30 AM",
        "type": "cxo",
        "title": "CXO talk: Vijay Sharma (Silver Oak)\r\n09:30-11:30 AM"
      },
      "1115_1245": {
        "timeRange": "11:15 – 12:45",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1245_1400": {
        "timeRange": "12:45 – 14:00",
        "rawText": "LUNCH",
        "type": "lunch",
        "title": "Lunch Break"
      },
      "1400_1530": {
        "timeRange": "14:00 – 15:30",
        "rawText": "CXO talk:Deep Jain (Niva Bupa)\r\n02:00-07:00",
        "type": "cxo",
        "title": "CXO talk:Deep Jain (Niva Bupa)\r\n02:00-07:00"
      },
      "1545_1715": {
        "timeRange": "15:45 – 17:15",
        "rawText": "CXO talk:Deep Jain (Niva Bupa)\r\n02:00-07:00",
        "type": "cxo",
        "title": "CXO talk:Deep Jain (Niva Bupa)\r\n02:00-07:00"
      },
      "1730_1900": {
        "timeRange": "17:30 – 19:00",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      }
    }
  },
  {
    "date": "2026-10-07",
    "dayName": "Wednesday",
    "weekNumber": 1,
    "slots": {
      "0930_1100": {
        "timeRange": "09:30 – 11:00",
        "rawText": "TCC-01\r\n08:30-01:00 PM",
        "type": "tcc",
        "title": "TCC-01\r\n08:30-01:00 PM"
      },
      "1115_1245": {
        "timeRange": "11:15 – 12:45",
        "rawText": "TCC-02\r\n08:30-01:00 PM",
        "type": "tcc",
        "title": "TCC-02\r\n08:30-01:00 PM"
      },
      "1245_1400": {
        "timeRange": "12:45 – 14:00",
        "rawText": "LUNCH",
        "type": "lunch",
        "title": "Lunch Break"
      },
      "1400_1530": {
        "timeRange": "14:00 – 15:30",
        "rawText": "CXO talk:Deep Jain (Niva Bupa)\r\n02:00-07:00",
        "type": "cxo",
        "title": "CXO talk:Deep Jain (Niva Bupa)\r\n02:00-07:00"
      },
      "1545_1715": {
        "timeRange": "15:45 – 17:15",
        "rawText": "CXO talk:Deep Jain (Niva Bupa)\r\n02:00-07:00",
        "type": "cxo",
        "title": "CXO talk:Deep Jain (Niva Bupa)\r\n02:00-07:00"
      },
      "1730_1900": {
        "timeRange": "17:30 – 19:00",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      }
    }
  },
  {
    "date": "2026-10-08",
    "dayName": "Thursday",
    "weekNumber": 1,
    "slots": {
      "0930_1100": {
        "timeRange": "09:30 – 11:00",
        "rawText": "TCC-03\r\n08:30-01:00 PM",
        "type": "tcc",
        "title": "TCC-03\r\n08:30-01:00 PM"
      },
      "1115_1245": {
        "timeRange": "11:15 – 12:45",
        "rawText": "TCC-04\r\n08:30-01:00 PM",
        "type": "tcc",
        "title": "TCC-04\r\n08:30-01:00 PM"
      },
      "1245_1400": {
        "timeRange": "12:45 – 14:00",
        "rawText": "LUNCH",
        "type": "lunch",
        "title": "Lunch Break"
      },
      "1400_1530": {
        "timeRange": "14:00 – 15:30",
        "rawText": "MRM-01",
        "type": "class",
        "subjectCode": "MRM",
        "title": "MRM-01"
      },
      "1545_1715": {
        "timeRange": "15:45 – 17:15",
        "rawText": "MRM-02",
        "type": "class",
        "subjectCode": "MRM",
        "title": "MRM-02"
      },
      "1730_1900": {
        "timeRange": "17:30 – 19:00",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      }
    }
  },
  {
    "date": "2026-10-09",
    "dayName": "Friday",
    "weekNumber": 1,
    "slots": {
      "0930_1100": {
        "timeRange": "09:30 – 11:00",
        "rawText": "ME-01",
        "type": "class",
        "subjectCode": "ME",
        "title": "ME-01"
      },
      "1115_1245": {
        "timeRange": "11:15 – 12:45",
        "rawText": "ME-02",
        "type": "class",
        "subjectCode": "ME",
        "title": "ME-02"
      },
      "1245_1400": {
        "timeRange": "12:45 – 14:00",
        "rawText": "LUNCH",
        "type": "lunch",
        "title": "Lunch Break"
      },
      "1400_1530": {
        "timeRange": "14:00 – 15:30",
        "rawText": "MRM-03",
        "type": "class",
        "subjectCode": "MRM",
        "title": "MRM-03"
      },
      "1545_1715": {
        "timeRange": "15:45 – 17:15",
        "rawText": "MRM-04",
        "type": "class",
        "subjectCode": "MRM",
        "title": "MRM-04"
      },
      "1730_1900": {
        "timeRange": "17:30 – 19:00",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      }
    }
  },
  {
    "date": "2026-10-10",
    "dayName": "Saturday",
    "weekNumber": 1,
    "slots": {
      "0930_1100": {
        "timeRange": "09:30 – 11:00",
        "rawText": "ME-03",
        "type": "class",
        "subjectCode": "ME",
        "title": "ME-03"
      },
      "1115_1245": {
        "timeRange": "11:15 – 12:45",
        "rawText": "ME-04",
        "type": "class",
        "subjectCode": "ME",
        "title": "ME-04"
      },
      "1245_1400": {
        "timeRange": "12:45 – 14:00",
        "rawText": "LUNCH",
        "type": "lunch",
        "title": "Lunch Break"
      },
      "1400_1530": {
        "timeRange": "14:00 – 15:30",
        "rawText": "MRM-05",
        "type": "class",
        "subjectCode": "MRM",
        "title": "MRM-05"
      },
      "1545_1715": {
        "timeRange": "15:45 – 17:15",
        "rawText": "MRM-06",
        "type": "class",
        "subjectCode": "MRM",
        "title": "MRM-06"
      },
      "1730_1900": {
        "timeRange": "17:30 – 19:00",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      }
    }
  },
  {
    "date": "2026-10-11",
    "dayName": "Sunday",
    "weekNumber": 1,
    "slots": {
      "0930_1100": {
        "timeRange": "09:30 – 11:00",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1115_1245": {
        "timeRange": "11:15 – 12:45",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1245_1400": {
        "timeRange": "12:45 – 14:00",
        "rawText": "LUNCH",
        "type": "lunch",
        "title": "Lunch Break"
      },
      "1400_1530": {
        "timeRange": "14:00 – 15:30",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1545_1715": {
        "timeRange": "15:45 – 17:15",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1730_1900": {
        "timeRange": "17:30 – 19:00",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      }
    }
  },
  {
    "date": "2026-10-12",
    "dayName": "Monday",
    "weekNumber": 2,
    "slots": {
      "0930_1100": {
        "timeRange": "09:30 – 11:00",
        "rawText": "PM2-01",
        "type": "class",
        "subjectCode": "PM2",
        "title": "PM2-01"
      },
      "1115_1245": {
        "timeRange": "11:15 – 12:45",
        "rawText": "PM2-02",
        "type": "class",
        "subjectCode": "PM2",
        "title": "PM2-02"
      },
      "1245_1400": {
        "timeRange": "12:45 – 14:00",
        "rawText": "LUNCH",
        "type": "lunch",
        "title": "Lunch Break"
      },
      "1400_1530": {
        "timeRange": "14:00 – 15:30",
        "rawText": "SAMAAGAM\r\n2:30 PM – 5:30 PM",
        "type": "other",
        "title": "SAMAAGAM\r\n2:30 PM – 5:30 PM"
      },
      "1545_1715": {
        "timeRange": "15:45 – 17:15",
        "rawText": "SAMAAGAM\r\n2:30 PM – 5:30 PM",
        "type": "other",
        "title": "SAMAAGAM\r\n2:30 PM – 5:30 PM"
      },
      "1730_1900": {
        "timeRange": "17:30 – 19:00",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      }
    }
  },
  {
    "date": "2026-10-13",
    "dayName": "Tuesday",
    "weekNumber": 2,
    "slots": {
      "0930_1100": {
        "timeRange": "09:30 – 11:00",
        "rawText": "TCC-05\r\n09:00-02:40",
        "type": "tcc",
        "title": "TCC-05\r\n09:00-02:40"
      },
      "1115_1245": {
        "timeRange": "11:15 – 12:45",
        "rawText": "TCC-06\r\n09:00-02:40",
        "type": "tcc",
        "title": "TCC-06\r\n09:00-02:40"
      },
      "1245_1400": {
        "timeRange": "12:45 – 14:00",
        "rawText": "LUNCH",
        "type": "lunch",
        "title": "Lunch Break"
      },
      "1400_1530": {
        "timeRange": "14:00 – 15:30",
        "rawText": "PM2-03\r\n02:45-04:15",
        "type": "class",
        "subjectCode": "PM2",
        "title": "PM2-03\r\n02:45-04:15"
      },
      "1545_1715": {
        "timeRange": "15:45 – 17:15",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1730_1900": {
        "timeRange": "17:30 – 19:00",
        "rawText": "PM2-04\r\n06:00-07:30",
        "type": "class",
        "subjectCode": "PM2",
        "title": "PM2-04\r\n06:00-07:30"
      }
    }
  },
  {
    "date": "2026-10-14",
    "dayName": "Wednesday",
    "weekNumber": 2,
    "slots": {
      "0930_1100": {
        "timeRange": "09:30 – 11:00",
        "rawText": "PM2-05",
        "type": "class",
        "subjectCode": "PM2",
        "title": "PM2-05"
      },
      "1115_1245": {
        "timeRange": "11:15 – 12:45",
        "rawText": "PM2-06",
        "type": "class",
        "subjectCode": "PM2",
        "title": "PM2-06"
      },
      "1245_1400": {
        "timeRange": "12:45 – 14:00",
        "rawText": "LUNCH",
        "type": "lunch",
        "title": "Lunch Break"
      },
      "1400_1530": {
        "timeRange": "14:00 – 15:30",
        "rawText": "02:30 Onwards",
        "type": "other",
        "title": "02:30 Onwards"
      },
      "1545_1715": {
        "timeRange": "15:45 – 17:15",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1730_1900": {
        "timeRange": "17:30 – 19:00",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      }
    }
  },
  {
    "date": "2026-10-15",
    "dayName": "Thursday",
    "weekNumber": 2,
    "slots": {
      "0930_1100": {
        "timeRange": "09:30 – 11:00",
        "rawText": "PM2-07",
        "type": "class",
        "subjectCode": "PM2",
        "title": "PM2-07"
      },
      "1115_1245": {
        "timeRange": "11:15 – 12:45",
        "rawText": "PM2-08",
        "type": "class",
        "subjectCode": "PM2",
        "title": "PM2-08"
      },
      "1245_1400": {
        "timeRange": "12:45 – 14:00",
        "rawText": "LUNCH",
        "type": "lunch",
        "title": "Lunch Break"
      },
      "1400_1530": {
        "timeRange": "14:00 – 15:30",
        "rawText": "02:30 Onwards",
        "type": "other",
        "title": "02:30 Onwards"
      },
      "1545_1715": {
        "timeRange": "15:45 – 17:15",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1730_1900": {
        "timeRange": "17:30 – 19:00",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      }
    }
  },
  {
    "date": "2026-10-16",
    "dayName": "Friday",
    "weekNumber": 2,
    "slots": {
      "0930_1100": {
        "timeRange": "09:30 – 11:00",
        "rawText": "CXO talk: Brij Mohan (Heritage Foods)\r\n",
        "type": "cxo",
        "title": "CXO talk: Brij Mohan (Heritage Foods)"
      },
      "1115_1245": {
        "timeRange": "11:15 – 12:45",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1245_1400": {
        "timeRange": "12:45 – 14:00",
        "rawText": "LUNCH",
        "type": "lunch",
        "title": "Lunch Break"
      },
      "1400_1530": {
        "timeRange": "14:00 – 15:30",
        "rawText": "PM2-09",
        "type": "class",
        "subjectCode": "PM2",
        "title": "PM2-09"
      },
      "1545_1715": {
        "timeRange": "15:45 – 17:15",
        "rawText": "PM2-10",
        "type": "class",
        "subjectCode": "PM2",
        "title": "PM2-10"
      },
      "1730_1900": {
        "timeRange": "17:30 – 19:00",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      }
    }
  },
  {
    "date": "2026-10-17",
    "dayName": "Saturday",
    "weekNumber": 2,
    "slots": {
      "0930_1100": {
        "timeRange": "09:30 – 11:00",
        "rawText": "ME-REMEDIAL      10:00 PM - 12:30 PM",
        "type": "class",
        "subjectCode": "ME",
        "title": "ME-REMEDIAL      10:00 PM - 12:30 PM"
      },
      "1115_1245": {
        "timeRange": "11:15 – 12:45",
        "rawText": "ME-REMEDIAL      10:00 PM - 12:30 PM",
        "type": "class",
        "subjectCode": "ME",
        "title": "ME-REMEDIAL      10:00 PM - 12:30 PM"
      },
      "1245_1400": {
        "timeRange": "12:45 – 14:00",
        "rawText": "LUNCH",
        "type": "lunch",
        "title": "Lunch Break"
      },
      "1400_1530": {
        "timeRange": "14:00 – 15:30",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1545_1715": {
        "timeRange": "15:45 – 17:15",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1730_1900": {
        "timeRange": "17:30 – 19:00",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      }
    }
  },
  {
    "date": "2026-10-18",
    "dayName": "Sunday",
    "weekNumber": 2,
    "slots": {
      "0930_1100": {
        "timeRange": "09:30 – 11:00",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1115_1245": {
        "timeRange": "11:15 – 12:45",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1245_1400": {
        "timeRange": "12:45 – 14:00",
        "rawText": "LUNCH",
        "type": "lunch",
        "title": "Lunch Break"
      },
      "1400_1530": {
        "timeRange": "14:00 – 15:30",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1545_1715": {
        "timeRange": "15:45 – 17:15",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1730_1900": {
        "timeRange": "17:30 – 19:00",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      }
    }
  },
  {
    "date": "2026-10-19",
    "dayName": "Monday",
    "weekNumber": 3,
    "slots": {
      "0930_1100": {
        "timeRange": "09:30 – 11:00",
        "rawText": "IET-01",
        "type": "class",
        "subjectCode": "IET",
        "title": "IET-01"
      },
      "1115_1245": {
        "timeRange": "11:15 – 12:45",
        "rawText": "IET-02",
        "type": "class",
        "subjectCode": "IET",
        "title": "IET-02"
      },
      "1245_1400": {
        "timeRange": "12:45 – 14:00",
        "rawText": "LUNCH",
        "type": "lunch",
        "title": "Lunch Break"
      },
      "1400_1530": {
        "timeRange": "14:00 – 15:30",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1545_1715": {
        "timeRange": "15:45 – 17:15",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1730_1900": {
        "timeRange": "17:30 – 19:00",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      }
    }
  },
  {
    "date": "2026-10-20",
    "dayName": "Tuesday",
    "weekNumber": 3,
    "slots": {
      "0930_1100": {
        "timeRange": "09:30 – 11:00",
        "rawText": "IET-03",
        "type": "class",
        "subjectCode": "IET",
        "title": "IET-03"
      },
      "1115_1245": {
        "timeRange": "11:15 – 12:45",
        "rawText": "IET-04",
        "type": "class",
        "subjectCode": "IET",
        "title": "IET-04"
      },
      "1245_1400": {
        "timeRange": "12:45 – 14:00",
        "rawText": "Dussehra",
        "type": "holiday",
        "title": "Dussehra"
      },
      "1400_1530": {
        "timeRange": "14:00 – 15:30",
        "rawText": "IET-05",
        "type": "class",
        "subjectCode": "IET",
        "title": "IET-05"
      },
      "1545_1715": {
        "timeRange": "15:45 – 17:15",
        "rawText": "Dussehra",
        "type": "holiday",
        "title": "Dussehra"
      },
      "1730_1900": {
        "timeRange": "17:30 – 19:00",
        "rawText": "Dussehra",
        "type": "holiday",
        "title": "Dussehra"
      }
    }
  },
  {
    "date": "2026-10-21",
    "dayName": "Wednesday",
    "weekNumber": 3,
    "slots": {
      "0930_1100": {
        "timeRange": "09:30 – 11:00",
        "rawText": "LA-1",
        "type": "class",
        "subjectCode": "LA",
        "title": "LA-1"
      },
      "1115_1245": {
        "timeRange": "11:15 – 12:45",
        "rawText": "LA-2",
        "type": "class",
        "subjectCode": "LA",
        "title": "LA-2"
      },
      "1245_1400": {
        "timeRange": "12:45 – 14:00",
        "rawText": "LUNCH",
        "type": "lunch",
        "title": "Lunch Break"
      },
      "1400_1530": {
        "timeRange": "14:00 – 15:30",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1545_1715": {
        "timeRange": "15:45 – 17:15",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1730_1900": {
        "timeRange": "17:30 – 19:00",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      }
    }
  },
  {
    "date": "2026-10-22",
    "dayName": "Thursday",
    "weekNumber": 3,
    "slots": {
      "0930_1100": {
        "timeRange": "09:30 – 11:00",
        "rawText": "LA-3",
        "type": "class",
        "subjectCode": "LA",
        "title": "LA-3"
      },
      "1115_1245": {
        "timeRange": "11:15 – 12:45",
        "rawText": "LA-4",
        "type": "class",
        "subjectCode": "LA",
        "title": "LA-4"
      },
      "1245_1400": {
        "timeRange": "12:45 – 14:00",
        "rawText": "LUNCH",
        "type": "lunch",
        "title": "Lunch Break"
      },
      "1400_1530": {
        "timeRange": "14:00 – 15:30",
        "rawText": "MRM-07",
        "type": "class",
        "subjectCode": "MRM",
        "title": "MRM-07"
      },
      "1545_1715": {
        "timeRange": "15:45 – 17:15",
        "rawText": "MRM-08",
        "type": "class",
        "subjectCode": "MRM",
        "title": "MRM-08"
      },
      "1730_1900": {
        "timeRange": "17:30 – 19:00",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      }
    }
  },
  {
    "date": "2026-10-23",
    "dayName": "Friday",
    "weekNumber": 3,
    "slots": {
      "0930_1100": {
        "timeRange": "09:30 – 11:00",
        "rawText": "LA-5",
        "type": "class",
        "subjectCode": "LA",
        "title": "LA-5"
      },
      "1115_1245": {
        "timeRange": "11:15 – 12:45",
        "rawText": "Reserved for LA",
        "type": "other",
        "title": "Reserved for LA"
      },
      "1245_1400": {
        "timeRange": "12:45 – 14:00",
        "rawText": "LUNCH",
        "type": "lunch",
        "title": "Lunch Break"
      },
      "1400_1530": {
        "timeRange": "14:00 – 15:30",
        "rawText": "MRM-09",
        "type": "class",
        "subjectCode": "MRM",
        "title": "MRM-09"
      },
      "1545_1715": {
        "timeRange": "15:45 – 17:15",
        "rawText": "MRM-10",
        "type": "class",
        "subjectCode": "MRM",
        "title": "MRM-10"
      },
      "1730_1900": {
        "timeRange": "17:30 – 19:00",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      }
    }
  },
  {
    "date": "2026-10-24",
    "dayName": "Saturday",
    "weekNumber": 3,
    "slots": {
      "0930_1100": {
        "timeRange": "09:30 – 11:00",
        "rawText": "CXO talk: Bushra Ahmed\r\n09:15-11:00 AM",
        "type": "cxo",
        "title": "CXO talk: Bushra Ahmed\r\n09:15-11:00 AM"
      },
      "1115_1245": {
        "timeRange": "11:15 – 12:45",
        "rawText": "CXO Talk: Sanjeev Sahrma (Oracle)\r\n11:15 AM-01:00 PM",
        "type": "cxo",
        "title": "CXO Talk: Sanjeev Sahrma (Oracle)\r\n11:15 AM-01:00 PM"
      },
      "1245_1400": {
        "timeRange": "12:45 – 14:00",
        "rawText": "LUNCH",
        "type": "lunch",
        "title": "Lunch Break"
      },
      "1400_1530": {
        "timeRange": "14:00 – 15:30",
        "rawText": "MRM-11",
        "type": "class",
        "subjectCode": "MRM",
        "title": "MRM-11"
      },
      "1545_1715": {
        "timeRange": "15:45 – 17:15",
        "rawText": "MRM-12",
        "type": "class",
        "subjectCode": "MRM",
        "title": "MRM-12"
      },
      "1730_1900": {
        "timeRange": "17:30 – 19:00",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      }
    }
  },
  {
    "date": "2026-10-25",
    "dayName": "Sunday",
    "weekNumber": 3,
    "slots": {
      "0930_1100": {
        "timeRange": "09:30 – 11:00",
        "rawText": "TCC-07",
        "type": "tcc",
        "title": "TCC-07"
      },
      "1115_1245": {
        "timeRange": "11:15 – 12:45",
        "rawText": "TCC-08",
        "type": "tcc",
        "title": "TCC-08"
      },
      "1245_1400": {
        "timeRange": "12:45 – 14:00",
        "rawText": "LUNCH",
        "type": "lunch",
        "title": "Lunch Break"
      },
      "1400_1530": {
        "timeRange": "14:00 – 15:30",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1545_1715": {
        "timeRange": "15:45 – 17:15",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1730_1900": {
        "timeRange": "17:30 – 19:00",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      }
    }
  },
  {
    "date": "2026-10-26",
    "dayName": "Monday",
    "weekNumber": 4,
    "slots": {
      "0930_1100": {
        "timeRange": "09:30 – 11:00",
        "rawText": "ME-05",
        "type": "class",
        "subjectCode": "ME",
        "title": "ME-05"
      },
      "1115_1245": {
        "timeRange": "11:15 – 12:45",
        "rawText": "ME-06",
        "type": "class",
        "subjectCode": "ME",
        "title": "ME-06"
      },
      "1245_1400": {
        "timeRange": "12:45 – 14:00",
        "rawText": "LUNCH",
        "type": "lunch",
        "title": "Lunch Break"
      },
      "1400_1530": {
        "timeRange": "14:00 – 15:30",
        "rawText": "ME-07",
        "type": "class",
        "subjectCode": "ME",
        "title": "ME-07"
      },
      "1545_1715": {
        "timeRange": "15:45 – 17:15",
        "rawText": "Discussion with Admin Team\r\n04:30-05:15",
        "type": "other",
        "title": "Discussion with Admin Team\r\n04:30-05:15"
      },
      "1730_1900": {
        "timeRange": "17:30 – 19:00",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      }
    }
  },
  {
    "date": "2026-10-27",
    "dayName": "Tuesday",
    "weekNumber": 4,
    "slots": {
      "0930_1100": {
        "timeRange": "09:30 – 11:00",
        "rawText": "ME-08",
        "type": "class",
        "subjectCode": "ME",
        "title": "ME-08"
      },
      "1115_1245": {
        "timeRange": "11:15 – 12:45",
        "rawText": "ME-09",
        "type": "class",
        "subjectCode": "ME",
        "title": "ME-09"
      },
      "1245_1400": {
        "timeRange": "12:45 – 14:00",
        "rawText": "LUNCH",
        "type": "lunch",
        "title": "Lunch Break"
      },
      "1400_1530": {
        "timeRange": "14:00 – 15:30",
        "rawText": "ME-10",
        "type": "class",
        "subjectCode": "ME",
        "title": "ME-10"
      },
      "1545_1715": {
        "timeRange": "15:45 – 17:15",
        "rawText": "ME QUIZ",
        "type": "quiz",
        "subjectCode": "ME",
        "title": "ME QUIZ"
      },
      "1730_1900": {
        "timeRange": "17:30 – 19:00",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      }
    }
  },
  {
    "date": "2026-10-28",
    "dayName": "Wednesday",
    "weekNumber": 4,
    "slots": {
      "0930_1100": {
        "timeRange": "09:30 – 11:00",
        "rawText": "ME-REMEDIAL                11:00 AM - 12:15 PM",
        "type": "class",
        "subjectCode": "ME",
        "title": "ME-REMEDIAL                11:00 AM - 12:15 PM"
      },
      "1115_1245": {
        "timeRange": "11:15 – 12:45",
        "rawText": "PM2 Ouiz - 1 (12.30PM)",
        "type": "class",
        "subjectCode": "PM2",
        "title": "PM2 Ouiz - 1 (12.30PM)"
      },
      "1245_1400": {
        "timeRange": "12:45 – 14:00",
        "rawText": "LUNCH",
        "type": "lunch",
        "title": "Lunch Break"
      },
      "1400_1530": {
        "timeRange": "14:00 – 15:30",
        "rawText": "PM2-11",
        "type": "class",
        "subjectCode": "PM2",
        "title": "PM2-11"
      },
      "1545_1715": {
        "timeRange": "15:45 – 17:15",
        "rawText": "PM2-12",
        "type": "class",
        "subjectCode": "PM2",
        "title": "PM2-12"
      },
      "1730_1900": {
        "timeRange": "17:30 – 19:00",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      }
    }
  },
  {
    "date": "2026-10-29",
    "dayName": "Thursday",
    "weekNumber": 4,
    "slots": {
      "0930_1100": {
        "timeRange": "09:30 – 11:00",
        "rawText": "PM2-13",
        "type": "class",
        "subjectCode": "PM2",
        "title": "PM2-13"
      },
      "1115_1245": {
        "timeRange": "11:15 – 12:45",
        "rawText": "PM2-14",
        "type": "class",
        "subjectCode": "PM2",
        "title": "PM2-14"
      },
      "1245_1400": {
        "timeRange": "12:45 – 14:00",
        "rawText": "LUNCH",
        "type": "lunch",
        "title": "Lunch Break"
      },
      "1400_1530": {
        "timeRange": "14:00 – 15:30",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1545_1715": {
        "timeRange": "15:45 – 17:15",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1730_1900": {
        "timeRange": "17:30 – 19:00",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      }
    }
  },
  {
    "date": "2026-10-30",
    "dayName": "Friday",
    "weekNumber": 4,
    "slots": {
      "0930_1100": {
        "timeRange": "09:30 – 11:00",
        "rawText": "PM2-15",
        "type": "class",
        "subjectCode": "PM2",
        "title": "PM2-15"
      },
      "1115_1245": {
        "timeRange": "11:15 – 12:45",
        "rawText": "PM2-16",
        "type": "class",
        "subjectCode": "PM2",
        "title": "PM2-16"
      },
      "1245_1400": {
        "timeRange": "12:45 – 14:00",
        "rawText": "LUNCH",
        "type": "lunch",
        "title": "Lunch Break"
      },
      "1400_1530": {
        "timeRange": "14:00 – 15:30",
        "rawText": "PM2-17",
        "type": "class",
        "subjectCode": "PM2",
        "title": "PM2-17"
      },
      "1545_1715": {
        "timeRange": "15:45 – 17:15",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1730_1900": {
        "timeRange": "17:30 – 19:00",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      }
    }
  },
  {
    "date": "2026-10-31",
    "dayName": "Saturday",
    "weekNumber": 4,
    "slots": {
      "0930_1100": {
        "timeRange": "09:30 – 11:00",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1115_1245": {
        "timeRange": "11:15 – 12:45",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1245_1400": {
        "timeRange": "12:45 – 14:00",
        "rawText": "LUNCH",
        "type": "lunch",
        "title": "Lunch Break"
      },
      "1400_1530": {
        "timeRange": "14:00 – 15:30",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1545_1715": {
        "timeRange": "15:45 – 17:15",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1730_1900": {
        "timeRange": "17:30 – 19:00",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      }
    }
  },
  {
    "date": "2026-11-01",
    "dayName": "Sunday",
    "weekNumber": 4,
    "slots": {
      "0930_1100": {
        "timeRange": "09:30 – 11:00",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1115_1245": {
        "timeRange": "11:15 – 12:45",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1245_1400": {
        "timeRange": "12:45 – 14:00",
        "rawText": "LUNCH",
        "type": "lunch",
        "title": "Lunch Break"
      },
      "1400_1530": {
        "timeRange": "14:00 – 15:30",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1545_1715": {
        "timeRange": "15:45 – 17:15",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1730_1900": {
        "timeRange": "17:30 – 19:00",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      }
    }
  },
  {
    "date": "2026-11-02",
    "dayName": "Monday",
    "weekNumber": 5,
    "slots": {
      "0930_1100": {
        "timeRange": "09:30 – 11:00",
        "rawText": "LA-6",
        "type": "class",
        "subjectCode": "LA",
        "title": "LA-6"
      },
      "1115_1245": {
        "timeRange": "11:15 – 12:45",
        "rawText": "LA-7",
        "type": "class",
        "subjectCode": "LA",
        "title": "LA-7"
      },
      "1245_1400": {
        "timeRange": "12:45 – 14:00",
        "rawText": "LUNCH",
        "type": "lunch",
        "title": "Lunch Break"
      },
      "1400_1530": {
        "timeRange": "14:00 – 15:30",
        "rawText": "LA-8",
        "type": "class",
        "subjectCode": "LA",
        "title": "LA-8"
      },
      "1545_1715": {
        "timeRange": "15:45 – 17:15",
        "rawText": "PM2-18",
        "type": "class",
        "subjectCode": "PM2",
        "title": "PM2-18"
      },
      "1730_1900": {
        "timeRange": "17:30 – 19:00",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      }
    }
  },
  {
    "date": "2026-11-03",
    "dayName": "Tuesday",
    "weekNumber": 5,
    "slots": {
      "0930_1100": {
        "timeRange": "09:30 – 11:00",
        "rawText": "LA-9",
        "type": "class",
        "subjectCode": "LA",
        "title": "LA-9"
      },
      "1115_1245": {
        "timeRange": "11:15 – 12:45",
        "rawText": "LA-10",
        "type": "class",
        "subjectCode": "LA",
        "title": "LA-10"
      },
      "1245_1400": {
        "timeRange": "12:45 – 14:00",
        "rawText": "LUNCH",
        "type": "lunch",
        "title": "Lunch Break"
      },
      "1400_1530": {
        "timeRange": "14:00 – 15:30",
        "rawText": "PM2-19",
        "type": "class",
        "subjectCode": "PM2",
        "title": "PM2-19"
      },
      "1545_1715": {
        "timeRange": "15:45 – 17:15",
        "rawText": "PM2-20",
        "type": "class",
        "subjectCode": "PM2",
        "title": "PM2-20"
      },
      "1730_1900": {
        "timeRange": "17:30 – 19:00",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      }
    }
  },
  {
    "date": "2026-11-04",
    "dayName": "Wednesday",
    "weekNumber": 5,
    "slots": {
      "0930_1100": {
        "timeRange": "09:30 – 11:00",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1115_1245": {
        "timeRange": "11:15 – 12:45",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1245_1400": {
        "timeRange": "12:45 – 14:00",
        "rawText": "LUNCH",
        "type": "lunch",
        "title": "Lunch Break"
      },
      "1400_1530": {
        "timeRange": "14:00 – 15:30",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1545_1715": {
        "timeRange": "15:45 – 17:15",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1730_1900": {
        "timeRange": "17:30 – 19:00",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      }
    }
  },
  {
    "date": "2026-11-05",
    "dayName": "Thursday",
    "weekNumber": 5,
    "slots": {
      "0930_1100": {
        "timeRange": "09:30 – 11:00",
        "rawText": "TOIL-20th Oct",
        "type": "holiday",
        "title": "TOIL-20th Oct"
      },
      "1115_1245": {
        "timeRange": "11:15 – 12:45",
        "rawText": "TOIL-20th Oct",
        "type": "holiday",
        "title": "TOIL-20th Oct"
      },
      "1245_1400": {
        "timeRange": "12:45 – 14:00",
        "rawText": "LUNCH",
        "type": "lunch",
        "title": "Lunch Break"
      },
      "1400_1530": {
        "timeRange": "14:00 – 15:30",
        "rawText": "TOIL-20th Oct",
        "type": "holiday",
        "title": "TOIL-20th Oct"
      },
      "1545_1715": {
        "timeRange": "15:45 – 17:15",
        "rawText": "TOIL-20th Oct",
        "type": "holiday",
        "title": "TOIL-20th Oct"
      },
      "1730_1900": {
        "timeRange": "17:30 – 19:00",
        "rawText": "TOIL-20th Oct",
        "type": "holiday",
        "title": "TOIL-20th Oct"
      }
    }
  },
  {
    "date": "2026-11-06",
    "dayName": "Friday",
    "weekNumber": 5,
    "slots": {
      "0930_1100": {
        "timeRange": "09:30 – 11:00",
        "rawText": "TOIL-18th Oct",
        "type": "holiday",
        "title": "TOIL-18th Oct"
      },
      "1115_1245": {
        "timeRange": "11:15 – 12:45",
        "rawText": "TOIL-18th Oct",
        "type": "holiday",
        "title": "TOIL-18th Oct"
      },
      "1245_1400": {
        "timeRange": "12:45 – 14:00",
        "rawText": "LUNCH",
        "type": "lunch",
        "title": "Lunch Break"
      },
      "1400_1530": {
        "timeRange": "14:00 – 15:30",
        "rawText": "TOIL-18th Oct",
        "type": "holiday",
        "title": "TOIL-18th Oct"
      },
      "1545_1715": {
        "timeRange": "15:45 – 17:15",
        "rawText": "TOIL-18th Oct",
        "type": "holiday",
        "title": "TOIL-18th Oct"
      },
      "1730_1900": {
        "timeRange": "17:30 – 19:00",
        "rawText": "TOIL-18th Oct",
        "type": "holiday",
        "title": "TOIL-18th Oct"
      }
    }
  },
  {
    "date": "2026-11-07",
    "dayName": "Saturday",
    "weekNumber": 5,
    "slots": {
      "0930_1100": {
        "timeRange": "09:30 – 11:00",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1115_1245": {
        "timeRange": "11:15 – 12:45",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1245_1400": {
        "timeRange": "12:45 – 14:00",
        "rawText": "LUNCH",
        "type": "lunch",
        "title": "Lunch Break"
      },
      "1400_1530": {
        "timeRange": "14:00 – 15:30",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1545_1715": {
        "timeRange": "15:45 – 17:15",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1730_1900": {
        "timeRange": "17:30 – 19:00",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      }
    }
  },
  {
    "date": "2026-11-08",
    "dayName": "Sunday",
    "weekNumber": 5,
    "slots": {
      "0930_1100": {
        "timeRange": "09:30 – 11:00",
        "rawText": "Deepawali",
        "type": "holiday",
        "title": "Deepawali"
      },
      "1115_1245": {
        "timeRange": "11:15 – 12:45",
        "rawText": "Deepawali",
        "type": "holiday",
        "title": "Deepawali"
      },
      "1245_1400": {
        "timeRange": "12:45 – 14:00",
        "rawText": "Deepawali",
        "type": "holiday",
        "title": "Deepawali"
      },
      "1400_1530": {
        "timeRange": "14:00 – 15:30",
        "rawText": "Deepawali",
        "type": "holiday",
        "title": "Deepawali"
      },
      "1545_1715": {
        "timeRange": "15:45 – 17:15",
        "rawText": "Deepawali",
        "type": "holiday",
        "title": "Deepawali"
      },
      "1730_1900": {
        "timeRange": "17:30 – 19:00",
        "rawText": "Deepawali",
        "type": "holiday",
        "title": "Deepawali"
      }
    }
  },
  {
    "date": "2026-11-09",
    "dayName": "Monday",
    "weekNumber": 6,
    "slots": {
      "0930_1100": {
        "timeRange": "09:30 – 11:00",
        "rawText": "Govardhan Pooja",
        "type": "holiday",
        "title": "Govardhan Pooja"
      },
      "1115_1245": {
        "timeRange": "11:15 – 12:45",
        "rawText": "Govardhan Pooja",
        "type": "holiday",
        "title": "Govardhan Pooja"
      },
      "1245_1400": {
        "timeRange": "12:45 – 14:00",
        "rawText": "Govardhan Pooja",
        "type": "holiday",
        "title": "Govardhan Pooja"
      },
      "1400_1530": {
        "timeRange": "14:00 – 15:30",
        "rawText": "Govardhan Pooja",
        "type": "holiday",
        "title": "Govardhan Pooja"
      },
      "1545_1715": {
        "timeRange": "15:45 – 17:15",
        "rawText": "Govardhan Pooja",
        "type": "holiday",
        "title": "Govardhan Pooja"
      },
      "1730_1900": {
        "timeRange": "17:30 – 19:00",
        "rawText": "Govardhan Pooja",
        "type": "holiday",
        "title": "Govardhan Pooja"
      }
    }
  },
  {
    "date": "2026-11-10",
    "dayName": "Tuesday",
    "weekNumber": 6,
    "slots": {
      "0930_1100": {
        "timeRange": "09:30 – 11:00",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1115_1245": {
        "timeRange": "11:15 – 12:45",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1245_1400": {
        "timeRange": "12:45 – 14:00",
        "rawText": "LUNCH",
        "type": "lunch",
        "title": "Lunch Break"
      },
      "1400_1530": {
        "timeRange": "14:00 – 15:30",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1545_1715": {
        "timeRange": "15:45 – 17:15",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1730_1900": {
        "timeRange": "17:30 – 19:00",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      }
    }
  },
  {
    "date": "2026-11-11",
    "dayName": "Wednesday",
    "weekNumber": 6,
    "slots": {
      "0930_1100": {
        "timeRange": "09:30 – 11:00",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1115_1245": {
        "timeRange": "11:15 – 12:45",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1245_1400": {
        "timeRange": "12:45 – 14:00",
        "rawText": "LUNCH",
        "type": "lunch",
        "title": "Lunch Break"
      },
      "1400_1530": {
        "timeRange": "14:00 – 15:30",
        "rawText": "IET-06\r\n",
        "type": "class",
        "subjectCode": "IET",
        "title": "IET-06"
      },
      "1545_1715": {
        "timeRange": "15:45 – 17:15",
        "rawText": "IET-07\r\n",
        "type": "class",
        "subjectCode": "IET",
        "title": "IET-07"
      },
      "1730_1900": {
        "timeRange": "17:30 – 19:00",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      }
    }
  },
  {
    "date": "2026-11-12",
    "dayName": "Thursday",
    "weekNumber": 6,
    "slots": {
      "0930_1100": {
        "timeRange": "09:30 – 11:00",
        "rawText": "IET-08                           8:30 AM to 10:30 AM",
        "type": "class",
        "subjectCode": "IET",
        "title": "IET-08                           8:30 AM to 10:30 AM"
      },
      "1115_1245": {
        "timeRange": "11:15 – 12:45",
        "rawText": "ME-MID TERM                        10:45 AM TO 12:45 PM",
        "type": "midterm",
        "subjectCode": "ME",
        "title": "ME-MID TERM                        10:45 AM TO 12:45 PM"
      },
      "1245_1400": {
        "timeRange": "12:45 – 14:00",
        "rawText": "LUNCH",
        "type": "lunch",
        "title": "Lunch Break"
      },
      "1400_1530": {
        "timeRange": "14:00 – 15:30",
        "rawText": "IET-09 & IET 10                                                          2:00 PM TO 4:00 PM",
        "type": "class",
        "subjectCode": "IET",
        "title": "IET-09 & IET 10                                                          2:00 PM TO 4:00 PM"
      },
      "1545_1715": {
        "timeRange": "15:45 – 17:15",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1730_1900": {
        "timeRange": "17:30 – 19:00",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      }
    }
  },
  {
    "date": "2026-11-13",
    "dayName": "Friday",
    "weekNumber": 6,
    "slots": {
      "0930_1100": {
        "timeRange": "09:30 – 11:00",
        "rawText": "MRM-13",
        "type": "class",
        "subjectCode": "MRM",
        "title": "MRM-13"
      },
      "1115_1245": {
        "timeRange": "11:15 – 12:45",
        "rawText": "MRM-14",
        "type": "class",
        "subjectCode": "MRM",
        "title": "MRM-14"
      },
      "1245_1400": {
        "timeRange": "12:45 – 14:00",
        "rawText": "LUNCH",
        "type": "lunch",
        "title": "Lunch Break"
      },
      "1400_1530": {
        "timeRange": "14:00 – 15:30",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1545_1715": {
        "timeRange": "15:45 – 17:15",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1730_1900": {
        "timeRange": "17:30 – 19:00",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      }
    }
  },
  {
    "date": "2026-11-14",
    "dayName": "Saturday",
    "weekNumber": 6,
    "slots": {
      "0930_1100": {
        "timeRange": "09:30 – 11:00",
        "rawText": "MRM-15",
        "type": "class",
        "subjectCode": "MRM",
        "title": "MRM-15"
      },
      "1115_1245": {
        "timeRange": "11:15 – 12:45",
        "rawText": "MRM-16",
        "type": "class",
        "subjectCode": "MRM",
        "title": "MRM-16"
      },
      "1245_1400": {
        "timeRange": "12:45 – 14:00",
        "rawText": "LUNCH",
        "type": "lunch",
        "title": "Lunch Break"
      },
      "1400_1530": {
        "timeRange": "14:00 – 15:30",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1545_1715": {
        "timeRange": "15:45 – 17:15",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1730_1900": {
        "timeRange": "17:30 – 19:00",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      }
    }
  },
  {
    "date": "2026-11-15",
    "dayName": "Sunday",
    "weekNumber": 6,
    "slots": {
      "0930_1100": {
        "timeRange": "09:30 – 11:00",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1115_1245": {
        "timeRange": "11:15 – 12:45",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1245_1400": {
        "timeRange": "12:45 – 14:00",
        "rawText": "LUNCH",
        "type": "lunch",
        "title": "Lunch Break"
      },
      "1400_1530": {
        "timeRange": "14:00 – 15:30",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1545_1715": {
        "timeRange": "15:45 – 17:15",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1730_1900": {
        "timeRange": "17:30 – 19:00",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      }
    }
  },
  {
    "date": "2026-11-16",
    "dayName": "Monday",
    "weekNumber": 7,
    "slots": {
      "0930_1100": {
        "timeRange": "09:30 – 11:00",
        "rawText": "LA-11",
        "type": "class",
        "subjectCode": "LA",
        "title": "LA-11"
      },
      "1115_1245": {
        "timeRange": "11:15 – 12:45",
        "rawText": "LA-12",
        "type": "class",
        "subjectCode": "LA",
        "title": "LA-12"
      },
      "1245_1400": {
        "timeRange": "12:45 – 14:00",
        "rawText": "LUNCH",
        "type": "lunch",
        "title": "Lunch Break"
      },
      "1400_1530": {
        "timeRange": "14:00 – 15:30",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1545_1715": {
        "timeRange": "15:45 – 17:15",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1730_1900": {
        "timeRange": "17:30 – 19:00",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      }
    }
  },
  {
    "date": "2026-11-17",
    "dayName": "Tuesday",
    "weekNumber": 7,
    "slots": {
      "0930_1100": {
        "timeRange": "09:30 – 11:00",
        "rawText": "LA-13",
        "type": "class",
        "subjectCode": "LA",
        "title": "LA-13"
      },
      "1115_1245": {
        "timeRange": "11:15 – 12:45",
        "rawText": "LA-14",
        "type": "class",
        "subjectCode": "LA",
        "title": "LA-14"
      },
      "1245_1400": {
        "timeRange": "12:45 – 14:00",
        "rawText": "LUNCH",
        "type": "lunch",
        "title": "Lunch Break"
      },
      "1400_1530": {
        "timeRange": "14:00 – 15:30",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1545_1715": {
        "timeRange": "15:45 – 17:15",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1730_1900": {
        "timeRange": "17:30 – 19:00",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      }
    }
  },
  {
    "date": "2026-11-18",
    "dayName": "Wednesday",
    "weekNumber": 7,
    "slots": {
      "0930_1100": {
        "timeRange": "09:30 – 11:00",
        "rawText": "LA-15",
        "type": "class",
        "subjectCode": "LA",
        "title": "LA-15"
      },
      "1115_1245": {
        "timeRange": "11:15 – 12:45",
        "rawText": "ME-11",
        "type": "class",
        "subjectCode": "ME",
        "title": "ME-11"
      },
      "1245_1400": {
        "timeRange": "12:45 – 14:00",
        "rawText": "LUNCH",
        "type": "lunch",
        "title": "Lunch Break"
      },
      "1400_1530": {
        "timeRange": "14:00 – 15:30",
        "rawText": "ME-12",
        "type": "class",
        "subjectCode": "ME",
        "title": "ME-12"
      },
      "1545_1715": {
        "timeRange": "15:45 – 17:15",
        "rawText": "ME-13",
        "type": "class",
        "subjectCode": "ME",
        "title": "ME-13"
      },
      "1730_1900": {
        "timeRange": "17:30 – 19:00",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      }
    }
  },
  {
    "date": "2026-11-19",
    "dayName": "Thursday",
    "weekNumber": 7,
    "slots": {
      "0930_1100": {
        "timeRange": "09:30 – 11:00",
        "rawText": "ME-14",
        "type": "class",
        "subjectCode": "ME",
        "title": "ME-14"
      },
      "1115_1245": {
        "timeRange": "11:15 – 12:45",
        "rawText": "ME-15                   PRESENTATIONS",
        "type": "class",
        "subjectCode": "ME",
        "title": "ME-15                   PRESENTATIONS"
      },
      "1245_1400": {
        "timeRange": "12:45 – 14:00",
        "rawText": "LUNCH",
        "type": "lunch",
        "title": "Lunch Break"
      },
      "1400_1530": {
        "timeRange": "14:00 – 15:30",
        "rawText": "ME-16 PRESENTATIONS",
        "type": "class",
        "subjectCode": "ME",
        "title": "ME-16 PRESENTATIONS"
      },
      "1545_1715": {
        "timeRange": "15:45 – 17:15",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1730_1900": {
        "timeRange": "17:30 – 19:00",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      }
    }
  },
  {
    "date": "2026-11-20",
    "dayName": "Friday",
    "weekNumber": 7,
    "slots": {
      "0930_1100": {
        "timeRange": "09:30 – 11:00",
        "rawText": "MRM-17",
        "type": "class",
        "subjectCode": "MRM",
        "title": "MRM-17"
      },
      "1115_1245": {
        "timeRange": "11:15 – 12:45",
        "rawText": "MRM-18",
        "type": "class",
        "subjectCode": "MRM",
        "title": "MRM-18"
      },
      "1245_1400": {
        "timeRange": "12:45 – 14:00",
        "rawText": "LUNCH",
        "type": "lunch",
        "title": "Lunch Break"
      },
      "1400_1530": {
        "timeRange": "14:00 – 15:30",
        "rawText": "UX-01",
        "type": "class",
        "subjectCode": "UX",
        "title": "UX-01"
      },
      "1545_1715": {
        "timeRange": "15:45 – 17:15",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1730_1900": {
        "timeRange": "17:30 – 19:00",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      }
    }
  },
  {
    "date": "2026-11-21",
    "dayName": "Saturday",
    "weekNumber": 7,
    "slots": {
      "0930_1100": {
        "timeRange": "09:30 – 11:00",
        "rawText": "MRM-19",
        "type": "class",
        "subjectCode": "MRM",
        "title": "MRM-19"
      },
      "1115_1245": {
        "timeRange": "11:15 – 12:45",
        "rawText": "MRM-20",
        "type": "class",
        "subjectCode": "MRM",
        "title": "MRM-20"
      },
      "1245_1400": {
        "timeRange": "12:45 – 14:00",
        "rawText": "LUNCH",
        "type": "lunch",
        "title": "Lunch Break"
      },
      "1400_1530": {
        "timeRange": "14:00 – 15:30",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1545_1715": {
        "timeRange": "15:45 – 17:15",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1730_1900": {
        "timeRange": "17:30 – 19:00",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      }
    }
  },
  {
    "date": "2026-11-22",
    "dayName": "Sunday",
    "weekNumber": 7,
    "slots": {
      "0930_1100": {
        "timeRange": "09:30 – 11:00",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1115_1245": {
        "timeRange": "11:15 – 12:45",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1245_1400": {
        "timeRange": "12:45 – 14:00",
        "rawText": "LUNCH",
        "type": "lunch",
        "title": "Lunch Break"
      },
      "1400_1530": {
        "timeRange": "14:00 – 15:30",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1545_1715": {
        "timeRange": "15:45 – 17:15",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1730_1900": {
        "timeRange": "17:30 – 19:00",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      }
    }
  },
  {
    "date": "2026-11-23",
    "dayName": "Monday",
    "weekNumber": 8,
    "slots": {
      "0930_1100": {
        "timeRange": "09:30 – 11:00",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1115_1245": {
        "timeRange": "11:15 – 12:45",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1245_1400": {
        "timeRange": "12:45 – 14:00",
        "rawText": "LUNCH",
        "type": "lunch",
        "title": "Lunch Break"
      },
      "1400_1530": {
        "timeRange": "14:00 – 15:30",
        "rawText": "UX-02",
        "type": "class",
        "subjectCode": "UX",
        "title": "UX-02"
      },
      "1545_1715": {
        "timeRange": "15:45 – 17:15",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1730_1900": {
        "timeRange": "17:30 – 19:00",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      }
    }
  },
  {
    "date": "2026-11-24",
    "dayName": "Tuesday",
    "weekNumber": 8,
    "slots": {
      "0930_1100": {
        "timeRange": "09:30 – 11:00",
        "rawText": "Guru Nanak Jayanti",
        "type": "holiday",
        "title": "Guru Nanak Jayanti"
      },
      "1115_1245": {
        "timeRange": "11:15 – 12:45",
        "rawText": "Guru Nanak Jayanti",
        "type": "holiday",
        "title": "Guru Nanak Jayanti"
      },
      "1245_1400": {
        "timeRange": "12:45 – 14:00",
        "rawText": "Guru Nanak Jayanti",
        "type": "holiday",
        "title": "Guru Nanak Jayanti"
      },
      "1400_1530": {
        "timeRange": "14:00 – 15:30",
        "rawText": "Guru Nanak Jayanti",
        "type": "holiday",
        "title": "Guru Nanak Jayanti"
      },
      "1545_1715": {
        "timeRange": "15:45 – 17:15",
        "rawText": "Guru Nanak Jayanti",
        "type": "holiday",
        "title": "Guru Nanak Jayanti"
      },
      "1730_1900": {
        "timeRange": "17:30 – 19:00",
        "rawText": "Guru Nanak Jayanti",
        "type": "holiday",
        "title": "Guru Nanak Jayanti"
      }
    }
  },
  {
    "date": "2026-11-25",
    "dayName": "Wednesday",
    "weekNumber": 8,
    "slots": {
      "0930_1100": {
        "timeRange": "09:30 – 11:00",
        "rawText": "Reserved End Term\r\nPM-2",
        "type": "endterm",
        "title": "Reserved End Term\r\nPM-2"
      },
      "1115_1245": {
        "timeRange": "11:15 – 12:45",
        "rawText": "Reserved End Term\r\nPM-2",
        "type": "endterm",
        "title": "Reserved End Term\r\nPM-2"
      },
      "1245_1400": {
        "timeRange": "12:45 – 14:00",
        "rawText": "LUNCH",
        "type": "lunch",
        "title": "Lunch Break"
      },
      "1400_1530": {
        "timeRange": "14:00 – 15:30",
        "rawText": "UX-03",
        "type": "class",
        "subjectCode": "UX",
        "title": "UX-03"
      },
      "1545_1715": {
        "timeRange": "15:45 – 17:15",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1730_1900": {
        "timeRange": "17:30 – 19:00",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      }
    }
  },
  {
    "date": "2026-11-26",
    "dayName": "Thursday",
    "weekNumber": 8,
    "slots": {
      "0930_1100": {
        "timeRange": "09:30 – 11:00",
        "rawText": "EM-01",
        "type": "class",
        "subjectCode": "EM",
        "title": "EM-01"
      },
      "1115_1245": {
        "timeRange": "11:15 – 12:45",
        "rawText": "EM-02",
        "type": "class",
        "subjectCode": "EM",
        "title": "EM-02"
      },
      "1245_1400": {
        "timeRange": "12:45 – 14:00",
        "rawText": "LUNCH",
        "type": "lunch",
        "title": "Lunch Break"
      },
      "1400_1530": {
        "timeRange": "14:00 – 15:30",
        "rawText": "UX-04",
        "type": "class",
        "subjectCode": "UX",
        "title": "UX-04"
      },
      "1545_1715": {
        "timeRange": "15:45 – 17:15",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1730_1900": {
        "timeRange": "17:30 – 19:00",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      }
    }
  },
  {
    "date": "2026-11-27",
    "dayName": "Friday",
    "weekNumber": 8,
    "slots": {
      "0930_1100": {
        "timeRange": "09:30 – 11:00",
        "rawText": "EM-03",
        "type": "class",
        "subjectCode": "EM",
        "title": "EM-03"
      },
      "1115_1245": {
        "timeRange": "11:15 – 12:45",
        "rawText": "EM-04",
        "type": "class",
        "subjectCode": "EM",
        "title": "EM-04"
      },
      "1245_1400": {
        "timeRange": "12:45 – 14:00",
        "rawText": "LUNCH",
        "type": "lunch",
        "title": "Lunch Break"
      },
      "1400_1530": {
        "timeRange": "14:00 – 15:30",
        "rawText": "UX-05",
        "type": "class",
        "subjectCode": "UX",
        "title": "UX-05"
      },
      "1545_1715": {
        "timeRange": "15:45 – 17:15",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1730_1900": {
        "timeRange": "17:30 – 19:00",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      }
    }
  },
  {
    "date": "2026-11-28",
    "dayName": "Saturday",
    "weekNumber": 8,
    "slots": {
      "0930_1100": {
        "timeRange": "09:30 – 11:00",
        "rawText": "Case Challenge: Sanjeev Sharma",
        "type": "other",
        "title": "Case Challenge: Sanjeev Sharma"
      },
      "1115_1245": {
        "timeRange": "11:15 – 12:45",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1245_1400": {
        "timeRange": "12:45 – 14:00",
        "rawText": "LUNCH",
        "type": "lunch",
        "title": "Lunch Break"
      },
      "1400_1530": {
        "timeRange": "14:00 – 15:30",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1545_1715": {
        "timeRange": "15:45 – 17:15",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1730_1900": {
        "timeRange": "17:30 – 19:00",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      }
    }
  },
  {
    "date": "2026-11-29",
    "dayName": "Sunday",
    "weekNumber": 8,
    "slots": {
      "0930_1100": {
        "timeRange": "09:30 – 11:00",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1115_1245": {
        "timeRange": "11:15 – 12:45",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1245_1400": {
        "timeRange": "12:45 – 14:00",
        "rawText": "LUNCH",
        "type": "lunch",
        "title": "Lunch Break"
      },
      "1400_1530": {
        "timeRange": "14:00 – 15:30",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1545_1715": {
        "timeRange": "15:45 – 17:15",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1730_1900": {
        "timeRange": "17:30 – 19:00",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      }
    }
  },
  {
    "date": "2026-11-30",
    "dayName": "Monday",
    "weekNumber": 9,
    "slots": {
      "0930_1100": {
        "timeRange": "09:30 – 11:00",
        "rawText": "LA - 16",
        "type": "class",
        "subjectCode": "LA",
        "title": "LA - 16"
      },
      "1115_1245": {
        "timeRange": "11:15 – 12:45",
        "rawText": "LA - 17",
        "type": "class",
        "subjectCode": "LA",
        "title": "LA - 17"
      },
      "1245_1400": {
        "timeRange": "12:45 – 14:00",
        "rawText": "LUNCH",
        "type": "lunch",
        "title": "Lunch Break"
      },
      "1400_1530": {
        "timeRange": "14:00 – 15:30",
        "rawText": "UX-06",
        "type": "class",
        "subjectCode": "UX",
        "title": "UX-06"
      },
      "1545_1715": {
        "timeRange": "15:45 – 17:15",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1730_1900": {
        "timeRange": "17:30 – 19:00",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      }
    }
  },
  {
    "date": "2026-12-01",
    "dayName": "Tuesday",
    "weekNumber": 9,
    "slots": {
      "0930_1100": {
        "timeRange": "09:30 – 11:00",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1115_1245": {
        "timeRange": "11:15 – 12:45",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1245_1400": {
        "timeRange": "12:45 – 14:00",
        "rawText": "LUNCH",
        "type": "lunch",
        "title": "Lunch Break"
      },
      "1400_1530": {
        "timeRange": "14:00 – 15:30",
        "rawText": "UX-07",
        "type": "class",
        "subjectCode": "UX",
        "title": "UX-07"
      },
      "1545_1715": {
        "timeRange": "15:45 – 17:15",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1730_1900": {
        "timeRange": "17:30 – 19:00",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      }
    }
  },
  {
    "date": "2026-12-02",
    "dayName": "Wednesday",
    "weekNumber": 9,
    "slots": {
      "0930_1100": {
        "timeRange": "09:30 – 11:00",
        "rawText": "LA - 18",
        "type": "class",
        "subjectCode": "LA",
        "title": "LA - 18"
      },
      "1115_1245": {
        "timeRange": "11:15 – 12:45",
        "rawText": "LA - 19",
        "type": "class",
        "subjectCode": "LA",
        "title": "LA - 19"
      },
      "1245_1400": {
        "timeRange": "12:45 – 14:00",
        "rawText": "LUNCH",
        "type": "lunch",
        "title": "Lunch Break"
      },
      "1400_1530": {
        "timeRange": "14:00 – 15:30",
        "rawText": "UX-08",
        "type": "class",
        "subjectCode": "UX",
        "title": "UX-08"
      },
      "1545_1715": {
        "timeRange": "15:45 – 17:15",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1730_1900": {
        "timeRange": "17:30 – 19:00",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      }
    }
  },
  {
    "date": "2026-12-03",
    "dayName": "Thursday",
    "weekNumber": 9,
    "slots": {
      "0930_1100": {
        "timeRange": "09:30 – 11:00",
        "rawText": "LA - 20",
        "type": "class",
        "subjectCode": "LA",
        "title": "LA - 20"
      },
      "1115_1245": {
        "timeRange": "11:15 – 12:45",
        "rawText": "Reserved LA",
        "type": "other",
        "title": "Reserved LA"
      },
      "1245_1400": {
        "timeRange": "12:45 – 14:00",
        "rawText": "LUNCH",
        "type": "lunch",
        "title": "Lunch Break"
      },
      "1400_1530": {
        "timeRange": "14:00 – 15:30",
        "rawText": "UX-09",
        "type": "class",
        "subjectCode": "UX",
        "title": "UX-09"
      },
      "1545_1715": {
        "timeRange": "15:45 – 17:15",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1730_1900": {
        "timeRange": "17:30 – 19:00",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      }
    }
  },
  {
    "date": "2026-12-04",
    "dayName": "Friday",
    "weekNumber": 9,
    "slots": {
      "0930_1100": {
        "timeRange": "09:30 – 11:00",
        "rawText": "Sangam",
        "type": "holiday",
        "title": "Sangam"
      },
      "1115_1245": {
        "timeRange": "11:15 – 12:45",
        "rawText": "Sangam",
        "type": "holiday",
        "title": "Sangam"
      },
      "1245_1400": {
        "timeRange": "12:45 – 14:00",
        "rawText": "LUNCH",
        "type": "lunch",
        "title": "Lunch Break"
      },
      "1400_1530": {
        "timeRange": "14:00 – 15:30",
        "rawText": "UX-10",
        "type": "class",
        "subjectCode": "UX",
        "title": "UX-10"
      },
      "1545_1715": {
        "timeRange": "15:45 – 17:15",
        "rawText": "Sangam",
        "type": "holiday",
        "title": "Sangam"
      },
      "1730_1900": {
        "timeRange": "17:30 – 19:00",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      }
    }
  },
  {
    "date": "2026-12-05",
    "dayName": "Saturday",
    "weekNumber": 9,
    "slots": {
      "0930_1100": {
        "timeRange": "09:30 – 11:00",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1115_1245": {
        "timeRange": "11:15 – 12:45",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1245_1400": {
        "timeRange": "12:45 – 14:00",
        "rawText": "LUNCH",
        "type": "lunch",
        "title": "Lunch Break"
      },
      "1400_1530": {
        "timeRange": "14:00 – 15:30",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1545_1715": {
        "timeRange": "15:45 – 17:15",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1730_1900": {
        "timeRange": "17:30 – 19:00",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      }
    }
  },
  {
    "date": "2026-12-06",
    "dayName": "Sunday",
    "weekNumber": 9,
    "slots": {
      "0930_1100": {
        "timeRange": "09:30 – 11:00",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1115_1245": {
        "timeRange": "11:15 – 12:45",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1245_1400": {
        "timeRange": "12:45 – 14:00",
        "rawText": "LUNCH",
        "type": "lunch",
        "title": "Lunch Break"
      },
      "1400_1530": {
        "timeRange": "14:00 – 15:30",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1545_1715": {
        "timeRange": "15:45 – 17:15",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1730_1900": {
        "timeRange": "17:30 – 19:00",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      }
    }
  },
  {
    "date": "2026-12-07",
    "dayName": "Monday",
    "weekNumber": 10,
    "slots": {
      "0930_1100": {
        "timeRange": "09:30 – 11:00",
        "rawText": "EM-05",
        "type": "class",
        "subjectCode": "EM",
        "title": "EM-05"
      },
      "1115_1245": {
        "timeRange": "11:15 – 12:45",
        "rawText": "EM-06",
        "type": "class",
        "subjectCode": "EM",
        "title": "EM-06"
      },
      "1245_1400": {
        "timeRange": "12:45 – 14:00",
        "rawText": "LUNCH",
        "type": "lunch",
        "title": "Lunch Break"
      },
      "1400_1530": {
        "timeRange": "14:00 – 15:30",
        "rawText": "IET-11",
        "type": "class",
        "subjectCode": "IET",
        "title": "IET-11"
      },
      "1545_1715": {
        "timeRange": "15:45 – 17:15",
        "rawText": "IET-12",
        "type": "class",
        "subjectCode": "IET",
        "title": "IET-12"
      },
      "1730_1900": {
        "timeRange": "17:30 – 19:00",
        "rawText": "IET-13                                6:00 PM to 7:30 PM",
        "type": "class",
        "subjectCode": "IET",
        "title": "IET-13                                6:00 PM to 7:30 PM"
      }
    }
  },
  {
    "date": "2026-12-08",
    "dayName": "Tuesday",
    "weekNumber": 10,
    "slots": {
      "0930_1100": {
        "timeRange": "09:30 – 11:00",
        "rawText": "IET-14                              9:00 AM to 10:30 PM",
        "type": "class",
        "subjectCode": "IET",
        "title": "IET-14                              9:00 AM to 10:30 PM"
      },
      "1115_1245": {
        "timeRange": "11:15 – 12:45",
        "rawText": "IET-15                                10:45 AM to 12:15 PM",
        "type": "class",
        "subjectCode": "IET",
        "title": "IET-15                                10:45 AM to 12:15 PM"
      },
      "1245_1400": {
        "timeRange": "12:45 – 14:00",
        "rawText": "LUNCH",
        "type": "lunch",
        "title": "Lunch Break"
      },
      "1400_1530": {
        "timeRange": "14:00 – 15:30",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1545_1715": {
        "timeRange": "15:45 – 17:15",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1730_1900": {
        "timeRange": "17:30 – 19:00",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      }
    }
  },
  {
    "date": "2026-12-09",
    "dayName": "Wednesday",
    "weekNumber": 10,
    "slots": {
      "0930_1100": {
        "timeRange": "09:30 – 11:00",
        "rawText": "EM-07",
        "type": "class",
        "subjectCode": "EM",
        "title": "EM-07"
      },
      "1115_1245": {
        "timeRange": "11:15 – 12:45",
        "rawText": "EM-08",
        "type": "class",
        "subjectCode": "EM",
        "title": "EM-08"
      },
      "1245_1400": {
        "timeRange": "12:45 – 14:00",
        "rawText": "LUNCH",
        "type": "lunch",
        "title": "Lunch Break"
      },
      "1400_1530": {
        "timeRange": "14:00 – 15:30",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1545_1715": {
        "timeRange": "15:45 – 17:15",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1730_1900": {
        "timeRange": "17:30 – 19:00",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      }
    }
  },
  {
    "date": "2026-12-10",
    "dayName": "Thursday",
    "weekNumber": 10,
    "slots": {
      "0930_1100": {
        "timeRange": "09:30 – 11:00",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1115_1245": {
        "timeRange": "11:15 – 12:45",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1245_1400": {
        "timeRange": "12:45 – 14:00",
        "rawText": "LUNCH",
        "type": "lunch",
        "title": "Lunch Break"
      },
      "1400_1530": {
        "timeRange": "14:00 – 15:30",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1545_1715": {
        "timeRange": "15:45 – 17:15",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1730_1900": {
        "timeRange": "17:30 – 19:00",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      }
    }
  },
  {
    "date": "2026-12-11",
    "dayName": "Friday",
    "weekNumber": 10,
    "slots": {
      "0930_1100": {
        "timeRange": "09:30 – 11:00",
        "rawText": "EM-09",
        "type": "class",
        "subjectCode": "EM",
        "title": "EM-09"
      },
      "1115_1245": {
        "timeRange": "11:15 – 12:45",
        "rawText": "EM-10",
        "type": "class",
        "subjectCode": "EM",
        "title": "EM-10"
      },
      "1245_1400": {
        "timeRange": "12:45 – 14:00",
        "rawText": "LUNCH",
        "type": "lunch",
        "title": "Lunch Break"
      },
      "1400_1530": {
        "timeRange": "14:00 – 15:30",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1545_1715": {
        "timeRange": "15:45 – 17:15",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1730_1900": {
        "timeRange": "17:30 – 19:00",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      }
    }
  },
  {
    "date": "2026-12-12",
    "dayName": "Saturday",
    "weekNumber": 10,
    "slots": {
      "0930_1100": {
        "timeRange": "09:30 – 11:00",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1115_1245": {
        "timeRange": "11:15 – 12:45",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1245_1400": {
        "timeRange": "12:45 – 14:00",
        "rawText": "LUNCH",
        "type": "lunch",
        "title": "Lunch Break"
      },
      "1400_1530": {
        "timeRange": "14:00 – 15:30",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1545_1715": {
        "timeRange": "15:45 – 17:15",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1730_1900": {
        "timeRange": "17:30 – 19:00",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      }
    }
  },
  {
    "date": "2026-12-13",
    "dayName": "Sunday",
    "weekNumber": 10,
    "slots": {
      "0930_1100": {
        "timeRange": "09:30 – 11:00",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1115_1245": {
        "timeRange": "11:15 – 12:45",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1245_1400": {
        "timeRange": "12:45 – 14:00",
        "rawText": "LUNCH",
        "type": "lunch",
        "title": "Lunch Break"
      },
      "1400_1530": {
        "timeRange": "14:00 – 15:30",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1545_1715": {
        "timeRange": "15:45 – 17:15",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1730_1900": {
        "timeRange": "17:30 – 19:00",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      }
    }
  },
  {
    "date": "2026-12-14",
    "dayName": "Monday",
    "weekNumber": 11,
    "slots": {
      "0930_1100": {
        "timeRange": "09:30 – 11:00",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1115_1245": {
        "timeRange": "11:15 – 12:45",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1245_1400": {
        "timeRange": "12:45 – 14:00",
        "rawText": "LUNCH",
        "type": "lunch",
        "title": "Lunch Break"
      },
      "1400_1530": {
        "timeRange": "14:00 – 15:30",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1545_1715": {
        "timeRange": "15:45 – 17:15",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1730_1900": {
        "timeRange": "17:30 – 19:00",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      }
    }
  },
  {
    "date": "2026-12-15",
    "dayName": "Tuesday",
    "weekNumber": 11,
    "slots": {
      "0930_1100": {
        "timeRange": "09:30 – 11:00",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1115_1245": {
        "timeRange": "11:15 – 12:45",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1245_1400": {
        "timeRange": "12:45 – 14:00",
        "rawText": "LUNCH",
        "type": "lunch",
        "title": "Lunch Break"
      },
      "1400_1530": {
        "timeRange": "14:00 – 15:30",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1545_1715": {
        "timeRange": "15:45 – 17:15",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1730_1900": {
        "timeRange": "17:30 – 19:00",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      }
    }
  },
  {
    "date": "2026-12-16",
    "dayName": "Wednesday",
    "weekNumber": 11,
    "slots": {
      "0930_1100": {
        "timeRange": "09:30 – 11:00",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1115_1245": {
        "timeRange": "11:15 – 12:45",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1245_1400": {
        "timeRange": "12:45 – 14:00",
        "rawText": "LUNCH",
        "type": "lunch",
        "title": "Lunch Break"
      },
      "1400_1530": {
        "timeRange": "14:00 – 15:30",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1545_1715": {
        "timeRange": "15:45 – 17:15",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1730_1900": {
        "timeRange": "17:30 – 19:00",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      }
    }
  },
  {
    "date": "2026-12-17",
    "dayName": "Thursday",
    "weekNumber": 11,
    "slots": {
      "0930_1100": {
        "timeRange": "09:30 – 11:00",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1115_1245": {
        "timeRange": "11:15 – 12:45",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1245_1400": {
        "timeRange": "12:45 – 14:00",
        "rawText": "LUNCH",
        "type": "lunch",
        "title": "Lunch Break"
      },
      "1400_1530": {
        "timeRange": "14:00 – 15:30",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1545_1715": {
        "timeRange": "15:45 – 17:15",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1730_1900": {
        "timeRange": "17:30 – 19:00",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      }
    }
  },
  {
    "date": "2026-12-18",
    "dayName": "Friday",
    "weekNumber": 11,
    "slots": {
      "0930_1100": {
        "timeRange": "09:30 – 11:00",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1115_1245": {
        "timeRange": "11:15 – 12:45",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1245_1400": {
        "timeRange": "12:45 – 14:00",
        "rawText": "LUNCH",
        "type": "lunch",
        "title": "Lunch Break"
      },
      "1400_1530": {
        "timeRange": "14:00 – 15:30",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1545_1715": {
        "timeRange": "15:45 – 17:15",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1730_1900": {
        "timeRange": "17:30 – 19:00",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      }
    }
  },
  {
    "date": "2026-12-19",
    "dayName": "Saturday",
    "weekNumber": 11,
    "slots": {
      "0930_1100": {
        "timeRange": "09:30 – 11:00",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1115_1245": {
        "timeRange": "11:15 – 12:45",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1245_1400": {
        "timeRange": "12:45 – 14:00",
        "rawText": "LUNCH",
        "type": "lunch",
        "title": "Lunch Break"
      },
      "1400_1530": {
        "timeRange": "14:00 – 15:30",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1545_1715": {
        "timeRange": "15:45 – 17:15",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1730_1900": {
        "timeRange": "17:30 – 19:00",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      }
    }
  },
  {
    "date": "2026-12-20",
    "dayName": "Sunday",
    "weekNumber": 11,
    "slots": {
      "0930_1100": {
        "timeRange": "09:30 – 11:00",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1115_1245": {
        "timeRange": "11:15 – 12:45",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1245_1400": {
        "timeRange": "12:45 – 14:00",
        "rawText": "LUNCH",
        "type": "lunch",
        "title": "Lunch Break"
      },
      "1400_1530": {
        "timeRange": "14:00 – 15:30",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1545_1715": {
        "timeRange": "15:45 – 17:15",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1730_1900": {
        "timeRange": "17:30 – 19:00",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      }
    }
  },
  {
    "date": "2026-12-21",
    "dayName": "Monday",
    "weekNumber": 12,
    "slots": {
      "0930_1100": {
        "timeRange": "09:30 – 11:00",
        "rawText": "End Term Exam",
        "type": "endterm",
        "title": "End Term Exam"
      },
      "1115_1245": {
        "timeRange": "11:15 – 12:45",
        "rawText": "End Term Exam",
        "type": "endterm",
        "title": "End Term Exam"
      },
      "1245_1400": {
        "timeRange": "12:45 – 14:00",
        "rawText": "LUNCH",
        "type": "lunch",
        "title": "Lunch Break"
      },
      "1400_1530": {
        "timeRange": "14:00 – 15:30",
        "rawText": "End Term Exam",
        "type": "endterm",
        "title": "End Term Exam"
      },
      "1545_1715": {
        "timeRange": "15:45 – 17:15",
        "rawText": "End Term Exam",
        "type": "endterm",
        "title": "End Term Exam"
      },
      "1730_1900": {
        "timeRange": "17:30 – 19:00",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      }
    }
  },
  {
    "date": "2026-12-22",
    "dayName": "Tuesday",
    "weekNumber": 12,
    "slots": {
      "0930_1100": {
        "timeRange": "09:30 – 11:00",
        "rawText": "End Term Exam",
        "type": "endterm",
        "title": "End Term Exam"
      },
      "1115_1245": {
        "timeRange": "11:15 – 12:45",
        "rawText": "End Term Exam",
        "type": "endterm",
        "title": "End Term Exam"
      },
      "1245_1400": {
        "timeRange": "12:45 – 14:00",
        "rawText": "LUNCH",
        "type": "lunch",
        "title": "Lunch Break"
      },
      "1400_1530": {
        "timeRange": "14:00 – 15:30",
        "rawText": "End Term Exam",
        "type": "endterm",
        "title": "End Term Exam"
      },
      "1545_1715": {
        "timeRange": "15:45 – 17:15",
        "rawText": "End Term Exam",
        "type": "endterm",
        "title": "End Term Exam"
      },
      "1730_1900": {
        "timeRange": "17:30 – 19:00",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      }
    }
  },
  {
    "date": "2026-12-23",
    "dayName": "Wednesday",
    "weekNumber": 12,
    "slots": {
      "0930_1100": {
        "timeRange": "09:30 – 11:00",
        "rawText": "End Term Exam",
        "type": "endterm",
        "title": "End Term Exam"
      },
      "1115_1245": {
        "timeRange": "11:15 – 12:45",
        "rawText": "End Term Exam",
        "type": "endterm",
        "title": "End Term Exam"
      },
      "1245_1400": {
        "timeRange": "12:45 – 14:00",
        "rawText": "LUNCH",
        "type": "lunch",
        "title": "Lunch Break"
      },
      "1400_1530": {
        "timeRange": "14:00 – 15:30",
        "rawText": "End Term Exam",
        "type": "endterm",
        "title": "End Term Exam"
      },
      "1545_1715": {
        "timeRange": "15:45 – 17:15",
        "rawText": "End Term Exam",
        "type": "endterm",
        "title": "End Term Exam"
      },
      "1730_1900": {
        "timeRange": "17:30 – 19:00",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      }
    }
  },
  {
    "date": "2026-12-24",
    "dayName": "Thursday",
    "weekNumber": 12,
    "slots": {
      "0930_1100": {
        "timeRange": "09:30 – 11:00",
        "rawText": "End Term Exam",
        "type": "endterm",
        "title": "End Term Exam"
      },
      "1115_1245": {
        "timeRange": "11:15 – 12:45",
        "rawText": "End Term Exam",
        "type": "endterm",
        "title": "End Term Exam"
      },
      "1245_1400": {
        "timeRange": "12:45 – 14:00",
        "rawText": "LUNCH",
        "type": "lunch",
        "title": "Lunch Break"
      },
      "1400_1530": {
        "timeRange": "14:00 – 15:30",
        "rawText": "End Term Exam",
        "type": "endterm",
        "title": "End Term Exam"
      },
      "1545_1715": {
        "timeRange": "15:45 – 17:15",
        "rawText": "End Term Exam",
        "type": "endterm",
        "title": "End Term Exam"
      },
      "1730_1900": {
        "timeRange": "17:30 – 19:00",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      }
    }
  },
  {
    "date": "2026-12-25",
    "dayName": "Friday",
    "weekNumber": 12,
    "slots": {
      "0930_1100": {
        "timeRange": "09:30 – 11:00",
        "rawText": "Christmas Day",
        "type": "holiday",
        "title": "Christmas Day"
      },
      "1115_1245": {
        "timeRange": "11:15 – 12:45",
        "rawText": "Christmas Day",
        "type": "holiday",
        "title": "Christmas Day"
      },
      "1245_1400": {
        "timeRange": "12:45 – 14:00",
        "rawText": "Christmas Day",
        "type": "holiday",
        "title": "Christmas Day"
      },
      "1400_1530": {
        "timeRange": "14:00 – 15:30",
        "rawText": "Christmas Day",
        "type": "holiday",
        "title": "Christmas Day"
      },
      "1545_1715": {
        "timeRange": "15:45 – 17:15",
        "rawText": "Christmas Day",
        "type": "holiday",
        "title": "Christmas Day"
      },
      "1730_1900": {
        "timeRange": "17:30 – 19:00",
        "rawText": "Christmas Day",
        "type": "holiday",
        "title": "Christmas Day"
      }
    }
  },
  {
    "date": "2026-12-26",
    "dayName": "Saturday",
    "weekNumber": 12,
    "slots": {
      "0930_1100": {
        "timeRange": "09:30 – 11:00",
        "rawText": "End Term Exam",
        "type": "endterm",
        "title": "End Term Exam"
      },
      "1115_1245": {
        "timeRange": "11:15 – 12:45",
        "rawText": "End Term Exam",
        "type": "endterm",
        "title": "End Term Exam"
      },
      "1245_1400": {
        "timeRange": "12:45 – 14:00",
        "rawText": "LUNCH",
        "type": "lunch",
        "title": "Lunch Break"
      },
      "1400_1530": {
        "timeRange": "14:00 – 15:30",
        "rawText": "End Term Exam",
        "type": "endterm",
        "title": "End Term Exam"
      },
      "1545_1715": {
        "timeRange": "15:45 – 17:15",
        "rawText": "End Term Exam",
        "type": "endterm",
        "title": "End Term Exam"
      },
      "1730_1900": {
        "timeRange": "17:30 – 19:00",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      }
    }
  },
  {
    "date": "2026-12-27",
    "dayName": "Sunday",
    "weekNumber": 12,
    "slots": {
      "0930_1100": {
        "timeRange": "09:30 – 11:00",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1115_1245": {
        "timeRange": "11:15 – 12:45",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1245_1400": {
        "timeRange": "12:45 – 14:00",
        "rawText": "LUNCH",
        "type": "lunch",
        "title": "Lunch Break"
      },
      "1400_1530": {
        "timeRange": "14:00 – 15:30",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1545_1715": {
        "timeRange": "15:45 – 17:15",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      },
      "1730_1900": {
        "timeRange": "17:30 – 19:00",
        "rawText": "",
        "type": "free",
        "title": "Free Slot"
      }
    }
  }
];
};

/**
 * INITIAL EXAM & QUIZ REMINDERS SYNCED FROM TIMETABLE
 */
export const INITIAL_EXAM_REMINDERS: ExamReminder[] = [
  {
    id: 'rem-1',
    subjectCode: 'ME',
    title: 'ME Quiz (15:45 - 17:15)',
    date: '2026-10-27',
    time: '15:45',
    type: 'Quiz',
    notes: 'Micro Economics Quiz covering Consumer Theory & Elasticity.',
  },
  {
    id: 'rem-2',
    subjectCode: 'PM2',
    title: 'PM2 Quiz - 1 (12:30 PM)',
    date: '2026-10-28',
    time: '12:30',
    type: 'Quiz',
    notes: 'Product Management-II Quiz covering PRD & Feature Prioritization.',
  },
  {
    id: 'rem-3',
    subjectCode: 'ME',
    title: 'ME Mid-Term Exam (15:45 - 17:15)',
    date: '2026-11-10',
    time: '15:45',
    type: 'Mid-Term',
    notes: 'Micro Economics Mid-Term covering Sessions 1-13.',
  },
  {
    id: 'rem-4',
    subjectCode: 'HSB',
    title: 'Trimester II End-Term Examinations',
    date: '2026-12-21',
    time: '09:30',
    type: 'End-Term',
    notes: 'Official HSB Jaipur Trimester II End-Term Exams (Dec 21 – Dec 26).',
  },
];
