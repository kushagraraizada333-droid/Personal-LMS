import React, { useState, useRef } from 'react';
import { useLMS } from '../../context/LMSContext';
import { calculateOverallCGPA, calculateSubjectGrade } from '../../utils/formatters';
import {
  GraduationCap,
  Award,
  Plus,
  Trash2,
  FileSpreadsheet,
  Target,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { triggerStudyConfetti } from '../../utils/sound';

export const MarksGradebookView: React.FC = () => {
  const {
    subjects,
    student,
    addEvaluationComponent,
    deleteEvaluationComponent,
    importMarksExcel,
    setSelectedSubjectCode,
    setActiveSubjectTab,
    setActiveView,
  } = useLMS();

  const [activeSubjectCode, setActiveSubjectCode] = useState<string>('PM2');
  const [isAdding, setIsAdding] = useState(false);
  const [compName, setCompName] = useState('');
  const [compWeight, setCompWeight] = useState(25);
  const [compMarks, setCompMarks] = useState(20);
  const [compMax, setCompMax] = useState(25);

  const fileInputRefs = useRef<{ [code: string]: HTMLInputElement | null }>({});

  const cgpaStats = calculateOverallCGPA(subjects);

  const handleAddComponent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!compName.trim()) return;

    await addEvaluationComponent(activeSubjectCode, {
      name: compName.trim(),
      weightage: Number(compWeight),
      marksObtained: Number(compMarks),
      maxMarks: Number(compMax),
    });

    setCompName('');
    setIsAdding(false);
    triggerStudyConfetti();
  };

  const handleMarksFileUpload = async (code: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await importMarksExcel(file, code);
  };

  const jumpToSubject = (code: string) => {
    setSelectedSubjectCode(code);
    setActiveSubjectTab('gradebook');
    setActiveView('subject');
  };

  const totalEvaluationsCount = subjects.reduce((sum, s) => sum + s.evaluations.length, 0);

  return (
    <div className="space-y-6">
      {/* Executive Academic Standing Banner */}
      <div className="p-5 sm:p-6 bg-gradient-to-r from-[#004B93] via-[#003870] to-[#002B5B] text-white rounded-3xl shadow-sm border border-white/10 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
              Marks & Gradebook
            </h2>
            <p className="text-xs text-slate-300 mt-0.5">
              Course evaluations and CGPA calculation
            </p>
          </div>

          {/* Big CGPA Metric Box */}
          <div className="flex items-center space-x-3 px-4 py-2.5 rounded-2xl bg-black/25 border border-white/10 shrink-0">
            <div className="text-right">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-300 block">
                Current CGPA
              </span>
              <div className="flex items-baseline space-x-1 justify-end">
                <span className="text-2xl sm:text-3xl font-black text-white tabular-nums">
                  {cgpaStats.hasEvaluations ? cgpaStats.cgpa : '—'}
                </span>
                <span className="text-xs text-slate-300">/ 10.0</span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-white/10 text-white flex items-center justify-center">
              <GraduationCap className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Sub-KPIs Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-white/10 text-xs">
          <div>
            <p className="text-slate-400 text-[10px]">Courses</p>
            <p className="text-base font-bold text-white">8 Subjects</p>
          </div>
          <div>
            <p className="text-slate-400 text-[10px]">Credits</p>
            <p className="text-base font-bold text-white">16 Units</p>
          </div>
          <div>
            <p className="text-slate-400 text-[10px]">Components</p>
            <p className="text-base font-bold text-[#38BDF8]">{totalEvaluationsCount} Logged</p>
          </div>
          <div>
            <p className="text-slate-400 text-[10px]">Target</p>
            <p className="text-base font-bold text-emerald-400">{student.targetCGPA || 9.0} / 10.0</p>
          </div>
        </div>
      </div>

      {/* Course Evaluation Matrix */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
            <GraduationCap className="w-5 h-5 text-hsb-royal dark:text-hsb-cyan" />
            <span>Trimester II Course Evaluation Roster (8 Subjects)</span>
          </h3>
          <span className="text-xs text-slate-400">
            Upload marks sheet (.xlsx) or log marks manually per subject
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {subjects.map((subject) => {
            const grade = calculateSubjectGrade(subject.evaluations);

            return (
              <div
                key={subject.code}
                className="bg-white dark:bg-[#0F172A] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 space-y-4"
              >
                {/* Subject Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-mono font-black px-2 py-0.5 rounded bg-[#EBF3FA] dark:bg-slate-800 text-[#004B93] dark:text-[#38BDF8] border border-[#D6E6F5] dark:border-slate-700">
                        {subject.code}
                      </span>
                      <h4 className="text-base font-extrabold text-[#0F172A] dark:text-white">
                        {subject.name}
                      </h4>
                      <span className="text-xs font-mono text-slate-400">
                        • {subject.credits} Credits • Faculty: {subject.faculty}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <span className="text-[10px] font-bold uppercase text-slate-400">Standing:</span>
                      <span className="text-base font-black text-[#004B93] dark:text-[#38BDF8] ml-1">
                        {grade.letterGrade}
                      </span>
                      <span className="text-xs text-slate-400 ml-1">
                        ({grade.percentage}%)
                      </span>
                    </div>

                    {/* Upload Marks Sheet for this subject */}
                    <input
                      ref={(el) => {
                        fileInputRefs.current[subject.code] = el;
                      }}
                      type="file"
                      accept=".xlsx,.xls,.csv"
                      className="hidden"
                      onChange={(e) => handleMarksFileUpload(subject.code, e)}
                    />
                    <button
                      onClick={() => fileInputRefs.current[subject.code]?.click()}
                      className="inline-flex items-center space-x-1 px-3 py-1.5 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                      title="Upload marks sheet (.xlsx/.csv)"
                    >
                      <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Upload Sheet</span>
                    </button>

                    <button
                      onClick={() => {
                        setActiveSubjectCode(subject.code);
                        setIsAdding(true);
                      }}
                      className="inline-flex items-center space-x-1 px-3 py-1.5 text-xs font-bold rounded-xl bg-hsb-royal hover:bg-blue-700 text-white transition"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Component</span>
                    </button>
                  </div>
                </div>

                {/* Inline Add Component Form if active */}
                {isAdding && activeSubjectCode === subject.code && (
                  <form
                    onSubmit={handleAddComponent}
                    className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3 animate-in fade-in"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                          Component Name (e.g. Mid-Term Exam, Case Analysis, Quiz)
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Mid-Term Examination"
                          value={compName}
                          onChange={(e) => setCompName(e.target.value)}
                          className="w-full px-3 py-1.5 text-xs bg-white dark:bg-slate-900 border rounded-xl"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                          Weightage (%)
                        </label>
                        <input
                          type="number"
                          min="1"
                          max="100"
                          value={compWeight}
                          onChange={(e) => setCompWeight(Number(e.target.value))}
                          className="w-full px-3 py-1.5 text-xs bg-white dark:bg-slate-900 border rounded-xl font-mono"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                            Marks
                          </label>
                          <input
                            type="number"
                            step="0.5"
                            value={compMarks}
                            onChange={(e) => setCompMarks(Number(e.target.value))}
                            className="w-full px-2 py-1.5 text-xs bg-white dark:bg-slate-900 border rounded-xl font-mono"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                            Max
                          </label>
                          <input
                            type="number"
                            step="0.5"
                            value={compMax}
                            onChange={(e) => setCompMax(Number(e.target.value))}
                            className="w-full px-2 py-1.5 text-xs bg-white dark:bg-slate-900 border rounded-xl font-mono"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-2">
                      <button
                        type="button"
                        onClick={() => setIsAdding(false)}
                        className="px-3 py-1.5 text-xs font-semibold text-slate-500"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-1.5 text-xs font-bold rounded-xl bg-hsb-royal text-white"
                      >
                        Save Component
                      </button>
                    </div>
                  </form>
                )}

                {/* Table of Components */}
                {subject.evaluations.length === 0 ? (
                  <p className="text-xs text-slate-400 py-3 text-center">
                    No evaluations recorded for {subject.code}. Click &quot;Add Component&quot; or upload a marks sheet.
                  </p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-[10px] font-bold uppercase text-slate-400">
                          <th className="py-2 px-3">Component</th>
                          <th className="py-2 px-3 text-center">Weight</th>
                          <th className="py-2 px-3 text-center">Score</th>
                          <th className="py-2 px-3 text-center">Percentage</th>
                          <th className="py-2 px-3 text-center">Weighted Score</th>
                          <th className="py-2 px-3 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {subject.evaluations.map((comp) => {
                          const percent =
                            comp.maxMarks > 0
                              ? ((comp.marksObtained / comp.maxMarks) * 100).toFixed(1)
                              : '0';
                          const weighted =
                            comp.maxMarks > 0
                              ? (((comp.marksObtained / comp.maxMarks) * comp.weightage)).toFixed(2)
                              : '0';

                          return (
                            <tr key={comp.id}>
                              <td className="py-2.5 px-3 font-bold text-slate-900 dark:text-white">
                                {comp.name}
                              </td>
                              <td className="py-2.5 px-3 text-center font-mono font-semibold">
                                {comp.weightage}%
                              </td>
                              <td className="py-2.5 px-3 text-center font-mono font-bold">
                                {comp.marksObtained} / {comp.maxMarks}
                              </td>
                              <td className="py-2.5 px-3 text-center font-mono font-bold text-emerald-600">
                                {percent}%
                              </td>
                              <td className="py-2.5 px-3 text-center font-mono font-extrabold text-hsb-royal dark:text-hsb-cyan">
                                {weighted}%
                              </td>
                              <td className="py-2.5 px-3 text-right">
                                <button
                                  onClick={() => deleteEvaluationComponent(subject.code, comp.id)}
                                  className="text-slate-400 hover:text-rose-600 p-1"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Official 10-Point Grading Scale Reference */}
      <div className="p-6 bg-white dark:bg-[#111827] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <div className="flex items-center space-x-2">
          <Target className="w-4 h-4 text-hsb-royal dark:text-hsb-cyan" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            HSB Jaipur Grading Scale Reference (10-Point Norm)
          </h4>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
          {[
            { grade: 'A+', points: '10.0', range: '≥ 90%' },
            { grade: 'A', points: '9.0', range: '80% – 89.9%' },
            { grade: 'B+', points: '8.0', range: '75% – 79.9%' },
            { grade: 'B', points: '7.0', range: '70% – 74.9%' },
            { grade: 'C+', points: '6.0', range: '60% – 69.9%' },
            { grade: 'C', points: '5.0', range: '50% – 59.9%' },
            { grade: 'F', points: '0.0', range: '< 50%' },
          ].map((item) => (
            <div
              key={item.grade}
              className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-center"
            >
              <span className="text-base font-black text-hsb-navy dark:text-hsb-cyan">
                {item.grade}
              </span>
              <p className="text-[11px] font-mono font-bold text-slate-900 dark:text-white">
                {item.points} GPA
              </p>
              <p className="text-[10px] text-slate-400 font-mono">{item.range}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
