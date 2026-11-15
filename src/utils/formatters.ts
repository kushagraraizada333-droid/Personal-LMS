import { Subject, EvaluationComponent, SubjectModule, UrgencyLevel, AttendanceSession, SubjectAttendance } from '../types';

export const formatFileSize = (bytes: number): string => {
  if (!bytes || bytes <= 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.min(Math.floor(Math.log(bytes) / Math.log(k)), sizes.length - 1);
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
};

export const formatDate = (dateString: string): string => {
  try {
    const d = new Date(dateString);
    return d.toLocaleDateString('en-IN', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return dateString;
  }
};

export const formatDateShort = (dateString: string): string => {
  try {
    const d = new Date(dateString);
    return d.toLocaleDateString('en-IN', {
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return dateString;
  }
};

export const getTimeRemaining = (
  dueDateString: string,
  isSubmitted: boolean = false
): {
  label: string;
  hoursLeft: number;
  isOverdue: boolean;
  urgency: UrgencyLevel;
} => {
  if (isSubmitted) {
    return {
      label: 'Submitted',
      hoursLeft: 0,
      isOverdue: false,
      urgency: 'submitted',
    };
  }

  const due = new Date(dueDateString).getTime();
  const now = Date.now();
  const diffMs = due - now;
  const hoursLeft = diffMs / (1000 * 60 * 60);

  if (diffMs <= 0) {
    const hoursAgo = Math.abs(Math.floor(hoursLeft));
    return {
      label: hoursAgo > 24 ? `Overdue by ${Math.floor(hoursAgo / 24)}d` : `Overdue by ${hoursAgo}h`,
      hoursLeft,
      isOverdue: true,
      urgency: 'urgent',
    };
  }

  if (hoursLeft <= 24) {
    const h = Math.floor(hoursLeft);
    const m = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    return {
      label: `${h}h ${m}m left (< 24 hrs)`,
      hoursLeft,
      isOverdue: false,
      urgency: 'urgent',
    };
  }

  if (hoursLeft <= 168) {
    const days = Math.floor(hoursLeft / 24);
    const remHours = Math.floor(hoursLeft % 24);
    return {
      label: `${days}d ${remHours}h left (This Week)`,
      hoursLeft,
      isOverdue: false,
      urgency: 'soon',
    };
  }

  const days = Math.floor(hoursLeft / 24);
  return {
    label: `${days} days left`,
    hoursLeft,
    isOverdue: false,
    urgency: 'normal',
  };
};

/**
 * Calculates session-by-session attendance forensics and safe-bunk thresholds
 */
export const calculateAttendanceMetrics = (
  sessions: AttendanceSession[],
  plannedSessionsTotal: number = 20,
  lates: number = 0
) => {
  if (!sessions || sessions.length === 0) {
    return {
      conducted: 0,
      attended: 0,
      absent: 0,
      upcoming: plannedSessionsTotal,
      percentage: 100,
      lates,
      safeBunks75: Math.floor(plannedSessionsTotal * 0.25),
      safeBunks80: Math.floor(plannedSessionsTotal * 0.2),
      mustAttendCount: 0,
      statusBadge: 'Good Standing',
    };
  }

  const conductedSessions = sessions.filter((s) => s.isConducted);
  const conducted = conductedSessions.length;
  const attended = conductedSessions.filter((s) => s.status === 'Present').length;
  const absent = conductedSessions.filter((s) => s.status === 'Absent').length;
  const upcoming = sessions.filter((s) => !s.isConducted).length;

  const percentage = conducted > 0 ? parseFloat(((attended / conducted) * 100).toFixed(1)) : 100;

  // Total term threshold calculations
  const totalPlanned = Math.max(sessions.length, plannedSessionsTotal);
  const minRequired75 = Math.ceil(totalPlanned * 0.75);
  const minRequired80 = Math.ceil(totalPlanned * 0.8);

  // If student attends all remaining classes, max possible attended
  const maxPossibleAttended = attended + upcoming;

  // Safe bunks remaining for the term:
  // How many more classes can the student miss and still achieve >= 75%?
  const safeBunks75 = Math.max(0, maxPossibleAttended - minRequired75);
  const safeBunks80 = Math.max(0, maxPossibleAttended - minRequired80);

  // If current percentage < 75%, how many consecutive classes must be attended to recover?
  // (attended + X) / (conducted + X) >= 0.75  =>  X >= (0.75*conducted - attended) / 0.25
  let mustAttendCount = 0;
  if (percentage < 75 && conducted > 0) {
    mustAttendCount = Math.max(0, Math.ceil((0.75 * conducted - attended) / 0.25));
  }

  let statusBadge = 'In Safe Zone (≥ 80%)';
  if (percentage < 75) statusBadge = 'Critical (< 75% Threshold)';
  else if (percentage < 80) statusBadge = 'Warning (75% – 80%)';

  return {
    conducted,
    attended,
    absent,
    upcoming,
    percentage,
    lates,
    safeBunks75,
    safeBunks80,
    mustAttendCount,
    statusBadge,
  };
};

/**
 * Calculates overall attendance across all subjects
 */
export const calculateOverallAttendance = (
  attendanceList: SubjectAttendance[],
  subjects: Subject[]
) => {
  let totalConducted = 0;
  let totalAttended = 0;
  let totalLates = 0;

  for (const subj of subjects) {
    const att = attendanceList.find((a) => a.subjectCode === subj.code);
    if (att) {
      totalLates += att.lates || 0;
      for (const s of att.sessions) {
        if (s.isConducted) {
          totalConducted++;
          if (s.status === 'Present') totalAttended++;
        }
      }
    }
  }

  const percentage =
    totalConducted > 0 ? parseFloat(((totalAttended / totalConducted) * 100).toFixed(1)) : 100;

  return {
    totalConducted,
    totalAttended,
    totalAbsent: totalConducted - totalAttended,
    totalLates,
    percentage,
  };
};

/**
 * Calculates grade summary for a subject (starts empty if no evaluation components)
 */
export const calculateSubjectGrade = (evaluations: EvaluationComponent[]) => {
  if (!evaluations || evaluations.length === 0) {
    return {
      totalWeightedScore: 0,
      totalCompletedWeight: 0,
      percentage: 0,
      letterGrade: '—',
      gpaPoints: 0,
    };
  }

  let totalWeightedScore = 0;
  let totalCompletedWeight = 0;

  for (const comp of evaluations) {
    if (comp.maxMarks > 0 && comp.marksObtained >= 0) {
      const componentPercentage = (comp.marksObtained / comp.maxMarks) * 100;
      const componentWeighted = (componentPercentage * comp.weightage) / 100;
      totalWeightedScore += componentWeighted;
      totalCompletedWeight += comp.weightage;
    }
  }

  const normalizedPercentage =
    totalCompletedWeight > 0 ? (totalWeightedScore / totalCompletedWeight) * 100 : 0;

  let letterGrade = '—';
  let gpaPoints = 0;

  if (totalCompletedWeight > 0) {
    if (normalizedPercentage >= 90) {
      letterGrade = 'A+';
      gpaPoints = 10.0;
    } else if (normalizedPercentage >= 80) {
      letterGrade = 'A';
      gpaPoints = 9.0;
    } else if (normalizedPercentage >= 75) {
      letterGrade = 'B+';
      gpaPoints = 8.0;
    } else if (normalizedPercentage >= 70) {
      letterGrade = 'B';
      gpaPoints = 7.0;
    } else if (normalizedPercentage >= 60) {
      letterGrade = 'C+';
      gpaPoints = 6.0;
    } else if (normalizedPercentage >= 50) {
      letterGrade = 'C';
      gpaPoints = 5.0;
    } else {
      letterGrade = 'F';
      gpaPoints = 0.0;
    }
  }

  return {
    totalWeightedScore: parseFloat(totalWeightedScore.toFixed(2)),
    totalCompletedWeight: parseFloat(totalCompletedWeight.toFixed(1)),
    percentage: parseFloat(normalizedPercentage.toFixed(1)),
    letterGrade,
    gpaPoints,
  };
};

/**
 * Computes syllabus progress (starts at 0% if empty)
 */
export const calculateSubjectProgress = (modules: SubjectModule[]) => {
  if (!modules || modules.length === 0) {
    return { completed: 0, total: 0, percentage: 0 };
  }

  let total = 0;
  let completed = 0;

  for (const mod of modules) {
    for (const topic of mod.topics) {
      total++;
      if (topic.completed) completed++;
    }
  }

  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  return { completed, total, percentage };
};

/**
 * Calculates overall CGPA across subjects weighted by credits
 */
export const calculateOverallCGPA = (subjects: Subject[]) => {
  let evaluatedCredits = 0;
  let weightedPoints = 0;
  let totalWeightedPercent = 0;

  for (const s of subjects) {
    const grade = calculateSubjectGrade(s.evaluations);
    if (grade.totalCompletedWeight > 0) {
      evaluatedCredits += s.credits;
      weightedPoints += grade.gpaPoints * s.credits;
      totalWeightedPercent += grade.percentage * s.credits;
    }
  }

  const cgpa = evaluatedCredits > 0 ? parseFloat((weightedPoints / evaluatedCredits).toFixed(2)) : 0;
  const overallPercentage =
    evaluatedCredits > 0 ? parseFloat((totalWeightedPercent / evaluatedCredits).toFixed(1)) : 0;

  return {
    cgpa,
    evaluatedCredits,
    overallPercentage,
    hasEvaluations: evaluatedCredits > 0,
  };
};
