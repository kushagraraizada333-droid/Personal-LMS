import React from 'react';
import { useLMS } from '../../context/LMSContext';
import { HSBLogo } from '../common/HSBLogo';
import {
  GraduationCap,
  ShieldCheck,
  CreditCard,
  Building2,
  Calendar,
  Sparkles,
  Award,
  Layers,
} from 'lucide-react';
import { calculateOverallAttendance } from '../../utils/formatters';

export const StudentProfileBanner: React.FC = () => {
  const { student, subjects, attendance } = useLMS();

  const totalCredits = subjects.reduce((sum, s) => sum + s.credits, 0);
  const attendanceMetrics = calculateOverallAttendance(attendance, subjects);

  return (
    <div className="relative rounded-3xl overflow-hidden shadow-hsb-lg border border-slate-200/90 dark:border-slate-800 flex flex-col md:flex-row items-stretch bg-white dark:bg-[#0F172A] transition-all">
      {/* 1. Clean White Left-Hand Brand Block with HSB Logo */}
      <div className="bg-white dark:bg-[#0B1426] p-6 sm:p-7 flex flex-col items-center justify-center shrink-0 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800 text-center min-w-[210px] sm:min-w-[230px] group">
        <HSBLogo size="xl" allowUpload={true} />
        <div className="mt-3.5 space-y-0.5">
          <h2 className="font-extrabold text-sm sm:text-base tracking-tight text-[#004B93] dark:text-[#38BDF8]">
            HSB JAIPUR
          </h2>
          <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 tracking-wider uppercase">
            School of Business
          </p>
        </div>
        <div className="mt-3 inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-[#EBF3FA] dark:bg-slate-800 text-[10px] font-bold text-[#004B93] dark:text-[#38BDF8] border border-[#D6E6F5] dark:border-slate-700">
          <span className="w-1.5 h-1.5 rounded-full bg-[#004B93] animate-pulse"></span>
          <span>Official Study Portal</span>
        </div>
      </div>

      {/* 2. Rich #004B93 Blue Executive Banner */}
      <div className="flex-1 p-6 sm:p-7 bg-gradient-to-r from-[#004B93] via-[#003870] to-[#002B5B] text-white flex flex-col justify-between space-y-5 relative overflow-hidden">
        {/* Subtle geometric light glow */}
        <div className="absolute -right-16 -top-16 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-1/3 bottom-0 w-64 h-64 bg-[#38BDF8]/10 rounded-full blur-2xl pointer-events-none" />

        {/* Top Institutional Row */}
        <div className="relative flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-white/15 text-white border border-white/20 backdrop-blur-md">
              <ShieldCheck className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>{student.institution}</span>
            </span>
            <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-white/10 text-white/90">
              {student.batch} • {student.academicYear}
            </span>
          </div>

          <div className="inline-flex items-center space-x-1 text-xs font-mono font-medium text-white/80 bg-black/20 px-2.5 py-1 rounded-lg border border-white/10">
            <Calendar className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>Trimester II (Oct – Dec 2026)</span>
          </div>
        </div>

        {/* Middle Student Credential Section */}
        <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center space-x-2">
                <span>{student.name}</span>
              </h1>
              <Sparkles className="w-5 h-5 text-[#38BDF8]" />
            </div>
            <p className="text-sm sm:text-base text-white/90 font-medium">
              {student.program} —{' '}
              <span className="text-[#38BDF8] font-bold">{student.term}</span>
            </p>
          </div>

          {/* KPI Snapshot Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="p-3 rounded-2xl bg-black/30 border border-white/15 backdrop-blur-md text-xs min-w-[130px]">
              <span className="text-[10px] text-white/70 block uppercase tracking-wider font-semibold">
                Overall Attendance
              </span>
              <span className="text-lg font-black font-mono text-emerald-300">
                {attendanceMetrics.percentage}%
              </span>
              <span className="text-[10px] text-white/60 block">
                {attendanceMetrics.totalAttended}/{attendanceMetrics.totalConducted} conducted
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-black/30 border border-white/15 backdrop-blur-md text-xs min-w-[130px]">
              <span className="text-[10px] text-white/70 block uppercase tracking-wider font-semibold">
                Term Credit Load
              </span>
              <span className="text-lg font-black font-mono text-white">
                {totalCredits} Credits
              </span>
              <span className="text-[10px] text-[#38BDF8] block">
                8 Courses Roster
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Identification Badges (Kushagra Raizada | 2026MBAPM018 | MBA26/0463) */}
        <div className="relative flex flex-wrap items-center gap-2.5 pt-2 border-t border-white/15 text-xs">
          <div className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-white/10 border border-white/20">
            <CreditCard className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span className="text-white/70">Roll No:</span>
            <span className="font-mono font-extrabold text-white">{student.rollNumber}</span>
          </div>

          <div className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-white/10 border border-white/20">
            <span className="text-white/70">Resource ID:</span>
            <span className="font-mono font-extrabold text-[#38BDF8]">{student.resourceId}</span>
          </div>

          <div className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-white/10 border border-white/20">
            <GraduationCap className="w-3.5 h-3.5 text-emerald-300" />
            <span className="text-white/70">Program:</span>
            <span className="font-bold text-white">MBA (Product Management)</span>
          </div>

          <div className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-white/10 border border-white/20">
            <Award className="w-3.5 h-3.5 text-amber-300" />
            <span className="text-white/70">Target CGPA:</span>
            <span className="font-mono font-bold text-white">9.0 / 10.0</span>
          </div>
        </div>
      </div>
    </div>
  );
};
