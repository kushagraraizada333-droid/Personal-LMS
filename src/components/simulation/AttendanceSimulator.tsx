import React, { useState } from 'react';
import { useLMS } from '../../context/LMSContext';
import {
  calculateAttendanceMetrics,
  calculateOverallAttendance,
} from '../../utils/formatters';
import {
  Sliders,
  ShieldCheck,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  XCircle,
  HelpCircle,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';

export const AttendanceSimulator: React.FC = () => {
  const { subjects, attendance } = useLMS();

  const [selectedSubjectCode, setSelectedSubjectCode] = useState<string>('overall');
  const [targetThreshold, setTargetThreshold] = useState<number>(75);
  const [simulatedAttend, setSimulatedAttend] = useState<number>(0);
  const [simulatedMiss, setSimulatedMiss] = useState<number>(0);

  // Compute base figures based on selection
  let baseConducted = 0;
  let baseAttended = 0;
  let plannedSessions = 20;

  if (selectedSubjectCode === 'overall') {
    const overall = calculateOverallAttendance(attendance, subjects);
    baseConducted = overall.totalConducted;
    baseAttended = overall.totalAttended;
    plannedSessions = subjects.reduce((sum, s) => sum + s.plannedSessions, 0);
  } else {
    const sub = subjects.find((s) => s.code === selectedSubjectCode);
    const subAtt = attendance.find((a) => a.subjectCode === selectedSubjectCode);
    const metrics = calculateAttendanceMetrics(
      subAtt?.sessions || [],
      sub?.plannedSessions || 20,
      subAtt?.lates || 0
    );
    baseConducted = metrics.conducted;
    baseAttended = metrics.attended;
    plannedSessions = sub?.plannedSessions || 20;
  }

  const basePercentage =
    baseConducted > 0 ? parseFloat(((baseAttended / baseConducted) * 100).toFixed(1)) : 100;

  // Simulated metrics
  const newConducted = baseConducted + simulatedAttend + simulatedMiss;
  const newAttended = baseAttended + simulatedAttend;
  const simulatedPercentage =
    newConducted > 0 ? parseFloat(((newAttended / newConducted) * 100).toFixed(1)) : 100;

  const percentageDelta = parseFloat((simulatedPercentage - basePercentage).toFixed(1));

  // Threshold math
  // How many more classes can be missed while staying >= targetThreshold?
  // (newAttended) / (newConducted + X) >= targetThreshold / 100
  // newAttended * 100 >= targetThreshold * (newConducted + X)
  // X <= (newAttended * 100 / targetThreshold) - newConducted
  const safeBufferRemaining = Math.max(
    0,
    Math.floor((newAttended * 100) / targetThreshold - newConducted)
  );

  // How many consecutive classes must be attended to recover to >= targetThreshold?
  // (newAttended + Y) / (newConducted + Y) >= targetThreshold / 100
  // 100 * newAttended + 100 * Y >= targetThreshold * newConducted + targetThreshold * Y
  // Y * (100 - targetThreshold) >= targetThreshold * newConducted - 100 * newAttended
  const recoveryNeeded =
    simulatedPercentage < targetThreshold && newConducted > 0
      ? Math.max(
          0,
          Math.ceil(
            (targetThreshold * newConducted - 100 * newAttended) / (100 - targetThreshold)
          )
        )
      : 0;

  const handleReset = () => {
    setSimulatedAttend(0);
    setSimulatedMiss(0);
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50/60 via-white to-blue-50/40 dark:from-slate-900 dark:via-[#0F172A] dark:to-blue-950/20 rounded-3xl border-2 border-indigo-200 dark:border-indigo-900/60 p-6 space-y-6 shadow-md animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-indigo-100 dark:border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-2xl bg-[#004B93] text-white shadow-sm">
            <Sliders className="w-5 h-5 text-indigo-300" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                What-If Attendance Simulator
              </h3>
              <span className="text-[10px] font-mono uppercase font-black px-2 py-0.5 rounded-md bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300">
                Non-Destructive Sandbox
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
              Simulate future class attendance to forecast safe bunks and recovery targets without changing your records.
            </p>
          </div>
        </div>

        <button
          onClick={handleReset}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-[#004B93] transition shrink-0"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Simulation</span>
        </button>
      </div>

      {/* Scope & Target Threshold Selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Course Scope */}
        <div>
          <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300 block mb-1.5">
            Simulation Scope:
          </label>
          <select
            value={selectedSubjectCode}
            onChange={(e) => {
              setSelectedSubjectCode(e.target.value);
              handleReset();
            }}
            className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 font-bold focus:outline-none focus:ring-2 focus:ring-[#004B93]"
          >
            <option value="overall">Overall Term II Cumulative (All Courses)</option>
            {subjects.map((s) => (
              <option key={s.code} value={s.code}>
                {s.code} • {s.name}
              </option>
            ))}
          </select>
        </div>

        {/* Required Minimum Threshold */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300">
              Minimum Required Threshold:
            </label>
            <span className="text-xs font-mono font-black text-[#004B93] dark:text-[#38BDF8]">
              {targetThreshold}%
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <input
              type="range"
              min={60}
              max={90}
              step={1}
              value={targetThreshold}
              onChange={(e) => setTargetThreshold(Number(e.target.value))}
              className="flex-1 accent-[#004B93] cursor-pointer"
            />
            <div className="flex space-x-1">
              {[75, 80, 85].map((val) => (
                <button
                  key={val}
                  onClick={() => setTargetThreshold(val)}
                  className={`px-2 py-0.5 rounded-lg text-[10px] font-mono font-bold transition ${
                    targetThreshold === val
                      ? 'bg-[#004B93] text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {val}%
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Real-time Diagnostics Badge */}
      <div
        className={`p-4 rounded-2xl border transition-all ${
          simulatedPercentage >= targetThreshold
            ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200'
            : 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-900 text-rose-950 dark:text-rose-200'
        }`}
      >
        <div className="flex items-start space-x-3">
          {simulatedPercentage >= targetThreshold ? (
            <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
          ) : (
            <AlertTriangle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
          )}

          <div className="flex-1 space-y-1">
            <h4 className="text-xs font-black uppercase tracking-wider">
              {simulatedPercentage >= targetThreshold
                ? `Safe Buffer: You can safely miss ${safeBufferRemaining} upcoming classes`
                : `Recovery Alert: Attend next ${recoveryNeeded} consecutive classes to reach ${targetThreshold}%`}
            </h4>
            <p className="text-xs opacity-90 leading-relaxed">
              {simulatedPercentage >= targetThreshold
                ? `Under this simulation, your attendance will stand at ${simulatedPercentage}%, comfortably above the ${targetThreshold}% HSB requirement.`
                : `Under this simulation, attendance drops to ${simulatedPercentage}%, which is below your target ${targetThreshold}%.`}
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Simulation Sliders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
        {/* Slider 1: Attending Next Classes */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Simulate Attending Next Classes:</span>
            </span>
            <span className="text-sm font-mono font-black text-emerald-600 dark:text-emerald-400">
              +{simulatedAttend}
            </span>
          </div>

          <input
            type="range"
            min={0}
            max={20}
            step={1}
            value={simulatedAttend}
            onChange={(e) => setSimulatedAttend(Number(e.target.value))}
            className="w-full accent-emerald-600 cursor-pointer"
          />

          <div className="flex justify-between text-[10px] text-slate-400 font-mono">
            <span>0 classes</span>
            <span>+10</span>
            <span>+20 classes</span>
          </div>
        </div>

        {/* Slider 2: Missing Next Classes */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center space-x-1.5">
              <XCircle className="w-4 h-4 text-rose-600" />
              <span>Simulate Missing / Bunking Next Classes:</span>
            </span>
            <span className="text-sm font-mono font-black text-rose-600 dark:text-rose-400">
              +{simulatedMiss}
            </span>
          </div>

          <input
            type="range"
            min={0}
            max={20}
            step={1}
            value={simulatedMiss}
            onChange={(e) => setSimulatedMiss(Number(e.target.value))}
            className="w-full accent-rose-600 cursor-pointer"
          />

          <div className="flex justify-between text-[10px] text-slate-400 font-mono">
            <span>0 classes</span>
            <span>+10</span>
            <span>+20 classes</span>
          </div>
        </div>
      </div>

      {/* Simulation Result Comparison Card */}
      <div className="p-4 rounded-2xl bg-white dark:bg-[#0B1426] border border-slate-200 dark:border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            Actual Attendance
          </span>
          <span className="text-lg font-black text-slate-800 dark:text-slate-200 tabular-nums">
            {basePercentage}%
          </span>
          <span className="text-[10px] text-slate-400 block font-mono">
            {baseAttended} / {baseConducted}
          </span>
        </div>

        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            Simulated Rate
          </span>
          <span
            className={`text-xl font-black tabular-nums ${
              simulatedPercentage >= targetThreshold
                ? 'text-emerald-600 dark:text-emerald-400'
                : 'text-rose-600 dark:text-rose-400'
            }`}
          >
            {simulatedPercentage}%
          </span>
          <span className="text-[10px] text-slate-400 block font-mono">
            {newAttended} / {newConducted}
          </span>
        </div>

        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            Projected Shift
          </span>
          <div className="flex items-center justify-center space-x-1">
            {percentageDelta > 0 ? (
              <TrendingUp className="w-4 h-4 text-emerald-600" />
            ) : percentageDelta < 0 ? (
              <TrendingDown className="w-4 h-4 text-rose-600" />
            ) : null}
            <span
              className={`text-base font-black tabular-nums ${
                percentageDelta > 0
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : percentageDelta < 0
                  ? 'text-rose-600 dark:text-rose-400'
                  : 'text-slate-400'
              }`}
            >
              {percentageDelta > 0 ? `+${percentageDelta}%` : `${percentageDelta}%`}
            </span>
          </div>
          <span className="text-[10px] text-slate-400 block">vs current</span>
        </div>

        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            Buffer Remaining
          </span>
          <span className="text-lg font-black text-[#004B93] dark:text-[#38BDF8] tabular-nums">
            {safeBufferRemaining}
          </span>
          <span className="text-[10px] text-slate-400 block">safe classes</span>
        </div>
      </div>
    </div>
  );
};
