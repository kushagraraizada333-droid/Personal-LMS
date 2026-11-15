import React, { useState } from 'react';
import { useLMS } from '../../context/LMSContext';
import { Subject, EvaluationComponent } from '../../types';
import {
  Sliders,
  Target,
  Plus,
  Trash2,
  RotateCcw,
  Sparkles,
  TrendingUp,
  Award,
  AlertCircle,
  CheckCircle2,
  HelpCircle,
} from 'lucide-react';

interface HypotheticalComponent {
  id: string;
  name: string;
  weightage: number;
  projectedPercent: number; // 0 to 100
}

interface MarksSimulatorProps {
  initialSubjectCode?: string;
  onClose?: () => void;
}

export const MarksSimulator: React.FC<MarksSimulatorProps> = ({
  initialSubjectCode = 'PM2',
  onClose,
}) => {
  const { subjects } = useLMS();

  const [selectedSubjectCode, setSelectedSubjectCode] = useState<string>(initialSubjectCode);
  const [targetCoursePercent, setTargetCoursePercent] = useState<number>(85);
  const [hypotheticalComps, setHypotheticalComps] = useState<HypotheticalComponent[]>([
    { id: 'hypo-1', name: 'End-Term Examination', weightage: 40, projectedPercent: 85 },
    { id: 'hypo-2', name: 'Group Project / Case Report', weightage: 20, projectedPercent: 90 },
  ]);

  const subject = subjects.find((s) => s.code === selectedSubjectCode) || subjects[0];
  const existingEvaluations: EvaluationComponent[] = subject?.evaluations || [];

  // Current real evaluated stats
  let totalEvaluatedWeight = 0;
  let totalSecuredWeightedScore = 0;

  for (const evalComp of existingEvaluations) {
    totalEvaluatedWeight += evalComp.weightage;
    const ratio = evalComp.maxMarks > 0 ? evalComp.marksObtained / evalComp.maxMarks : 0;
    totalSecuredWeightedScore += ratio * evalComp.weightage;
  }

  const remainingUnevaluatedWeight = Math.max(0, 100 - totalEvaluatedWeight);

  // Exact score needed on remaining evaluations to hit targetCoursePercent
  // targetCoursePercent = totalSecuredWeightedScore + (remainingScore% / 100) * remainingUnevaluatedWeight
  // remainingScore% = ((targetCoursePercent - totalSecuredWeightedScore) / remainingUnevaluatedWeight) * 100
  const scoreNeededOnRemaining =
    remainingUnevaluatedWeight > 0
      ? ((targetCoursePercent - totalSecuredWeightedScore) / remainingUnevaluatedWeight) * 100
      : 0;

  // Add hypothetical components to simulation
  let simulatedAdditionalWeight = 0;
  let simulatedAdditionalSecured = 0;

  for (const h of hypotheticalComps) {
    simulatedAdditionalWeight += h.weightage;
    simulatedAdditionalSecured += (h.projectedPercent / 100) * h.weightage;
  }

  const totalSimulatedWeight = totalEvaluatedWeight + simulatedAdditionalWeight;
  const totalSimulatedSecured = totalSecuredWeightedScore + simulatedAdditionalSecured;

  const simulatedCourseFinalPercent =
    totalSimulatedWeight > 0
      ? parseFloat(((totalSimulatedSecured / totalSimulatedWeight) * 100).toFixed(1))
      : 0;

  const handleAddHypothetical = () => {
    const newComp: HypotheticalComponent = {
      id: `hypo-${Date.now()}`,
      name: `Upcoming Evaluation ${hypotheticalComps.length + 1}`,
      weightage: 20,
      projectedPercent: 80,
    };
    setHypotheticalComps([...hypotheticalComps, newComp]);
  };

  const handleUpdateHypothetical = (id: string, updates: Partial<HypotheticalComponent>) => {
    setHypotheticalComps((prev) =>
      prev.map((h) => (h.id === id ? { ...h, ...updates } : h))
    );
  };

  const handleDeleteHypothetical = (id: string) => {
    setHypotheticalComps((prev) => prev.filter((h) => h.id !== id));
  };

  const handleResetSandbox = () => {
    setTargetCoursePercent(85);
    setHypotheticalComps([
      { id: 'hypo-1', name: 'End-Term Examination', weightage: 40, projectedPercent: 85 },
      { id: 'hypo-2', name: 'Group Project / Case Report', weightage: 20, projectedPercent: 90 },
    ]);
  };

  return (
    <div className="bg-gradient-to-br from-amber-50/50 via-white to-blue-50/40 dark:from-slate-900 dark:via-[#0F172A] dark:to-slate-900 rounded-3xl border-2 border-amber-200 dark:border-amber-900/60 p-6 space-y-6 shadow-md animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-amber-100 dark:border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-2xl bg-[#004B93] text-white shadow-sm">
            <Target className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                Target Grade & What-If Sandbox
              </h3>
              <span className="text-[10px] font-mono uppercase font-black px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300">
                Non-Destructive Simulation
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
              Simulate scores on upcoming exams and projects to find exactly what you need for an A/A+ grade.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <button
            onClick={handleResetSandbox}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-[#004B93] transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Sandbox</span>
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-xs font-bold text-slate-700 dark:text-slate-200 transition"
            >
              Close
            </button>
          )}
        </div>
      </div>

      {/* Course & Target Grade Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300 block mb-1.5">
            Select Course to Simulate:
          </label>
          <select
            value={selectedSubjectCode}
            onChange={(e) => setSelectedSubjectCode(e.target.value)}
            className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 font-bold focus:outline-none focus:ring-2 focus:ring-[#004B93]"
          >
            {subjects.map((s) => (
              <option key={s.code} value={s.code}>
                {s.code} • {s.name} ({s.credits} Credits)
              </option>
            ))}
          </select>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300">
              Target Overall Course Percentage:
            </label>
            <span className="text-xs font-mono font-black text-[#004B93] dark:text-[#38BDF8]">
              {targetCoursePercent}% ({(targetCoursePercent / 10).toFixed(1)} GPA)
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <input
              type="range"
              min={60}
              max={98}
              step={1}
              value={targetCoursePercent}
              onChange={(e) => setTargetCoursePercent(Number(e.target.value))}
              className="flex-1 accent-[#004B93] cursor-pointer"
            />
            <div className="flex space-x-1">
              {[80, 85, 90, 95].map((val) => (
                <button
                  key={val}
                  onClick={() => setTargetCoursePercent(val)}
                  className={`px-2 py-0.5 rounded-lg text-[10px] font-mono font-bold transition ${
                    targetCoursePercent === val
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

      {/* Target Feasibility Diagnostic Banner */}
      <div
        className={`p-4 rounded-2xl border transition-all ${
          scoreNeededOnRemaining <= 0
            ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200'
            : scoreNeededOnRemaining > 100
            ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-900 text-rose-950 dark:text-rose-200'
            : 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-300 dark:border-indigo-800 text-indigo-950 dark:text-indigo-200'
        }`}
      >
        <div className="flex items-start space-x-3">
          {scoreNeededOnRemaining <= 0 ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
          ) : scoreNeededOnRemaining > 100 ? (
            <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
          ) : (
            <Award className="w-5 h-5 text-[#004B93] dark:text-[#38BDF8] shrink-0 mt-0.5" />
          )}

          <div className="flex-1 space-y-1">
            <h4 className="text-xs font-black uppercase tracking-wider">
              {scoreNeededOnRemaining <= 0
                ? 'Target Already Secured! 🏆'
                : scoreNeededOnRemaining > 100
                ? `Mathematically Unattainable with Remaining Weight (${scoreNeededOnRemaining.toFixed(1)}% needed)`
                : `Target Achievable: Need an Average of ${scoreNeededOnRemaining.toFixed(1)}% on Remaining Assessments`}
            </h4>
            <p className="text-xs opacity-90 leading-relaxed">
              {remainingUnevaluatedWeight > 0 ? (
                <>
                  You have secured <strong>{totalSecuredWeightedScore.toFixed(1)}%</strong> out of <strong>{totalEvaluatedWeight}%</strong> evaluated so far. The remaining <strong>{remainingUnevaluatedWeight}%</strong> will determine if you reach {targetCoursePercent}%.
                </>
              ) : (
                'All 100% evaluation components have already been marked for this subject.'
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Hypothetical / Upcoming Components Sliders */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-extrabold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
            Simulate Upcoming Assessments (Sliders):
          </h4>
          <button
            onClick={handleAddHypothetical}
            className="flex items-center space-x-1 px-3 py-1 text-xs font-bold rounded-xl bg-[#004B93] hover:bg-[#003870] text-white transition shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Hypothetical Exam/Project</span>
          </button>
        </div>

        <div className="space-y-3">
          {hypotheticalComps.map((h) => (
            <div
              key={h.id}
              className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-3 shadow-xs"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <input
                  type="text"
                  value={h.name}
                  onChange={(e) => handleUpdateHypothetical(h.id, { name: e.target.value })}
                  className="font-bold text-xs bg-transparent border-b border-transparent hover:border-slate-300 dark:hover:border-slate-600 focus:border-[#004B93] focus:outline-none text-slate-900 dark:text-white"
                />

                <div className="flex items-center space-x-3 text-xs">
                  <div className="flex items-center space-x-1.5">
                    <span className="text-slate-500 font-semibold">Weight:</span>
                    <input
                      type="number"
                      min={5}
                      max={60}
                      step={5}
                      value={h.weightage}
                      onChange={(e) =>
                        handleUpdateHypothetical(h.id, { weightage: Number(e.target.value) })
                      }
                      className="w-14 px-2 py-0.5 text-xs font-mono font-bold bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-center"
                    />
                    <span className="text-slate-400 font-mono">%</span>
                  </div>

                  <button
                    onClick={() => handleDeleteHypothetical(h.id)}
                    className="p-1 text-slate-400 hover:text-rose-600 transition"
                    title="Remove hypothetical component"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Slider for projected score */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-600 dark:text-slate-400 font-medium">
                    Projected Score:
                  </span>
                  <span className="font-mono font-black text-[#004B93] dark:text-[#38BDF8]">
                    {h.projectedPercent}% ({((h.projectedPercent / 100) * h.weightage).toFixed(1)} weighted pts)
                  </span>
                </div>
                <input
                  type="range"
                  min={40}
                  max={100}
                  step={1}
                  value={h.projectedPercent}
                  onChange={(e) =>
                    handleUpdateHypothetical(h.id, {
                      projectedPercent: Number(e.target.value),
                    })
                  }
                  className="w-full accent-[#004B93] cursor-pointer"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Live Projected Final Course Grade Banner */}
      <div className="p-4 rounded-2xl bg-white dark:bg-[#0B1426] border border-slate-200 dark:border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            Evaluated So Far
          </span>
          <span className="text-lg font-black text-slate-800 dark:text-slate-200 tabular-nums">
            {totalSecuredWeightedScore.toFixed(1)}%
          </span>
          <span className="text-[10px] text-slate-400 block font-mono">
            out of {totalEvaluatedWeight}% evaluated
          </span>
        </div>

        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            Projected Course Total
          </span>
          <span
            className={`text-xl font-black tabular-nums ${
              simulatedCourseFinalPercent >= targetCoursePercent
                ? 'text-emerald-600 dark:text-emerald-400'
                : 'text-amber-600 dark:text-amber-400'
            }`}
          >
            {simulatedCourseFinalPercent}%
          </span>
          <span className="text-[10px] text-slate-400 block font-mono">
            {totalSimulatedSecured.toFixed(1)} / {totalSimulatedWeight}%
          </span>
        </div>

        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            Target Status
          </span>
          <span
            className={`text-xs font-black px-2 py-0.5 rounded-lg inline-block mt-1 ${
              simulatedCourseFinalPercent >= targetCoursePercent
                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                : 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
            }`}
          >
            {simulatedCourseFinalPercent >= targetCoursePercent ? 'Target Reached 🎯' : 'Below Target'}
          </span>
        </div>

        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            Projected Grade
          </span>
          <span className="text-lg font-black text-[#004B93] dark:text-[#38BDF8]">
            {simulatedCourseFinalPercent >= 90
              ? 'A+ (10.0)'
              : simulatedCourseFinalPercent >= 80
              ? 'A (9.0)'
              : simulatedCourseFinalPercent >= 70
              ? 'B+ (8.0)'
              : 'B (7.0)'}
          </span>
          <span className="text-[10px] text-slate-400 block">estimated</span>
        </div>
      </div>
    </div>
  );
};
