import React from 'react';
import { useLMS } from '../../context/LMSContext';
import { HSBLogo } from '../common/HSBLogo';
import { CreditCard, GraduationCap, Award, ShieldCheck } from 'lucide-react';
import { calculateOverallAttendance } from '../../utils/formatters';

export const StudentProfileBanner: React.FC = () => {
  const { student, subjects, attendance } = useLMS();

  const totalCredits = subjects.reduce((sum, s) => sum + s.credits, 0);
  const attendanceMetrics = calculateOverallAttendance(attendance, subjects);

  return (
    <div className="relative rounded-3xl overflow-hidden shadow-sm border border-slate-200/90 dark:border-slate-800 flex flex-col md:flex-row items-stretch bg-white dark:bg-[#0F172A]">
      {/* 1. White Left-Hand Brand Block with HSB Logo */}
      <div className="bg-white dark:bg-[#0B1426] p-5 sm:p-6 flex flex-col items-center justify-center shrink-0 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800 text-center min-w-[190px]">
        <HSBLogo size="xl" allowUpload={true} />
        <div className="mt-2.5">
          <h2 className="font-extrabold text-sm tracking-tight text-[#004B93] dark:text-[#38BDF8]">
            HSB JAIPUR
          </h2>
        </div>
      </div>

      {/* 2. Executive Blue Banner */}
      <div className="flex-1 p-5 sm:p-6 bg-gradient-to-r from-[#004B93] via-[#003870] to-[#002B5B] text-white flex flex-col justify-between space-y-4">
        {/* Student Credential & KPI Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              {student.name}
            </h1>
            <p className="text-xs sm:text-sm text-white/80 font-medium mt-0.5">
              {student.program} • <span className="text-[#38BDF8] font-bold">{student.term}</span>
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-2.5">
            <div className="px-3.5 py-2 rounded-2xl bg-black/25 border border-white/10 backdrop-blur-md text-right">
              <span className="text-[10px] text-white/70 block uppercase font-bold tracking-wider">
                Attendance
              </span>
              <span className="text-lg font-black font-mono text-emerald-300">
                {attendanceMetrics.percentage}%
              </span>
            </div>

            <div className="px-3.5 py-2 rounded-2xl bg-black/25 border border-white/10 backdrop-blur-md text-right">
              <span className="text-[10px] text-white/70 block uppercase font-bold tracking-wider">
                Credits
              </span>
              <span className="text-lg font-black font-mono text-white">
                {totalCredits}
              </span>
            </div>
          </div>
        </div>

        {/* Minimal ID Badges Row */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/10 text-xs">
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-xl bg-white/10 border border-white/15">
            <CreditCard className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span className="text-white/70">Roll:</span>
            <span className="font-mono font-bold text-white">{student.rollNumber}</span>
          </div>

          <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-xl bg-white/10 border border-white/15">
            <span className="text-white/70">ID:</span>
            <span className="font-mono font-bold text-[#38BDF8]">{student.resourceId}</span>
          </div>

          <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-xl bg-white/10 border border-white/15">
            <span className="text-white/70">Batch:</span>
            <span className="font-bold text-white">{student.batch}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
