import React, { useState, useRef } from 'react';
import { useLMS } from '../../context/LMSContext';
import { Subject, EvaluationComponent } from '../../types';
import { calculateSubjectGrade } from '../../utils/formatters';
import {
  GraduationCap,
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  Award,
  BarChart3,
  Sparkles,
  FileSpreadsheet,
} from 'lucide-react';
import { triggerStudyConfetti } from '../../utils/sound';

interface TabGradebookProps {
  subject: Subject;
}

export const TabGradebook: React.FC<TabGradebookProps> = ({ subject }) => {
  const {
    addEvaluationComponent,
    updateEvaluationComponent,
    deleteEvaluationComponent,
    importMarksExcel,
  } = useLMS();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editWeightage, setEditWeightage] = useState(0);
  const [editMarksObtained, setEditMarksObtained] = useState(0);
  const [editMaxMarks, setEditMaxMarks] = useState(0);

  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState('');
  const [newWeightage, setNewWeightage] = useState(25);
  const [newMarksObtained, setNewMarksObtained] = useState(0);
  const [newMaxMarks, setNewMaxMarks] = useState(100);

  const marksFileRef = useRef<HTMLInputElement>(null);

  const gradeStats = calculateSubjectGrade(subject.evaluations);

  const startEdit = (comp: EvaluationComponent) => {
    setEditingId(comp.id);
    setEditName(comp.name);
    setEditWeightage(comp.weightage);
    setEditMarksObtained(comp.marksObtained);
    setEditMaxMarks(comp.maxMarks);
  };

  const saveEdit = async (compId: string) => {
    await updateEvaluationComponent(subject.code, compId, {
      name: editName.trim(),
      weightage: Number(editWeightage),
      marksObtained: Number(editMarksObtained),
      maxMarks: Number(editMaxMarks),
    });
    setEditingId(null);
  };

  const handleAddNew = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    await addEvaluationComponent(subject.code, {
      name: newName.trim(),
      weightage: Number(newWeightage),
      marksObtained: Number(newMarksObtained),
      maxMarks: Number(newMaxMarks),
    });

    setNewName('');
    setIsAdding(false);
    triggerStudyConfetti();
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await importMarksExcel(file, subject.code);
    if (marksFileRef.current) marksFileRef.current.value = '';
  };

  const totalWeightLogged = subject.evaluations.reduce((sum, c) => sum + c.weightage, 0);

  return (
    <div className="space-y-6">
      {/* Grade Summary Banner */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-5 bg-gradient-to-r from-[#07162C] via-hsb-navy to-[#0F2C59] text-white rounded-3xl shadow-sm border border-blue-900/60">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-hsb-cyan flex items-center space-x-1">
            <Award className="w-4 h-4" />
            <span>Subject Standing</span>
          </span>
          <div className="flex items-baseline space-x-2 mt-1">
            <span className="text-3xl font-extrabold text-white">
              {gradeStats.letterGrade}
            </span>
            {gradeStats.gpaPoints > 0 && (
              <span className="text-sm font-semibold text-hsb-cyan">
                ({gradeStats.gpaPoints.toFixed(1)} GPA)
              </span>
            )}
          </div>
          <p className="text-[11px] text-slate-300 mt-0.5">
            {subject.credits} Credits • 10-point scale
          </p>
        </div>

        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-hsb-cyan">
            Weighted Score Achieved
          </span>
          <div className="text-3xl font-extrabold text-white mt-1 tabular-nums">
            {gradeStats.totalWeightedScore}%
          </div>
          <p className="text-[11px] text-slate-300 mt-0.5">
            Out of {gradeStats.totalCompletedWeight}% evaluated
          </p>
        </div>

        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-hsb-cyan">
            Normalized Performance
          </span>
          <div className="text-3xl font-extrabold text-white mt-1 tabular-nums">
            {gradeStats.percentage}%
          </div>
          <p className="text-[11px] text-slate-300 mt-0.5">
            Pro-rated academic score
          </p>
        </div>

        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-hsb-cyan">
            Weight Allocation
          </span>
          <div className="text-3xl font-extrabold text-white mt-1 tabular-nums">
            {totalWeightLogged}% / 100%
          </div>
          <p className="text-[11px] text-slate-300 mt-0.5">
            {100 - totalWeightLogged}% remaining to allocate
          </p>
        </div>
      </div>

      {/* Header with Add & Upload Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center space-x-2">
          <BarChart3 className="w-5 h-5 text-hsb-royal dark:text-hsb-cyan" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Evaluation Breakdown ({subject.code})
          </h3>
        </div>

        <div className="flex items-center space-x-2">
          <input
            ref={marksFileRef}
            type="file"
            accept=".xlsx,.xls,.csv"
            className="hidden"
            onChange={handleFileUpload}
          />
          <button
            onClick={() => marksFileRef.current?.click()}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 transition"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
            <span>Upload Marks Sheet</span>
          </button>

          <button
            onClick={() => setIsAdding(!isAdding)}
            className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-hsb-royal hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition"
          >
            {isAdding ? <X className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
            <span>{isAdding ? 'Cancel' : 'Add Evaluation Component'}</span>
          </button>
        </div>
      </div>

      {/* Add Component Form */}
      {isAdding && (
        <form
          onSubmit={handleAddNew}
          className="p-5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4 animate-in fade-in"
        >
          <div className="flex items-center space-x-2 text-xs font-bold text-hsb-navy dark:text-hsb-cyan uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>New Evaluation Component for {subject.code}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                Component Name (e.g. Quiz 1, Mid-Term, Group Case Analysis, End-Term)
              </label>
              <input
                type="text"
                placeholder="Component Name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
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
                value={newWeightage}
                onChange={(e) => setNewWeightage(Number(e.target.value))}
                className="w-full px-3 py-1.5 text-xs bg-white dark:bg-slate-900 border rounded-xl font-mono"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                  Marks Obtained
                </label>
                <input
                  type="number"
                  step="0.5"
                  min="0"
                  value={newMarksObtained}
                  onChange={(e) => setNewMarksObtained(Number(e.target.value))}
                  className="w-full px-2.5 py-1.5 text-xs bg-white dark:bg-slate-900 border rounded-xl font-mono"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                  Max Marks
                </label>
                <input
                  type="number"
                  step="0.5"
                  min="1"
                  value={newMaxMarks}
                  onChange={(e) => setNewMaxMarks(Number(e.target.value))}
                  className="w-full px-2.5 py-1.5 text-xs bg-white dark:bg-slate-900 border rounded-xl font-mono"
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold rounded-xl bg-hsb-royal hover:bg-blue-700 text-white shadow-sm transition"
            >
              Save Component
            </button>
          </div>
        </form>
      )}

      {/* Table (Starts empty) */}
      {subject.evaluations.length === 0 ? (
        <div className="p-12 text-center bg-white dark:bg-[#111827] rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 text-xs text-slate-400">
          No evaluation marks logged for {subject.code} yet. Click &quot;Add Evaluation Component&quot; above to log marks or upload a marks sheet.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827]">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-100/70 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-4">Evaluation Component</th>
                <th className="py-3.5 px-4 text-center">Weightage (%)</th>
                <th className="py-3.5 px-4 text-center">Marks Obtained</th>
                <th className="py-3.5 px-4 text-center">Max Marks</th>
                <th className="py-3.5 px-4 text-center">Score %</th>
                <th className="py-3.5 px-4 text-center">Weighted Score</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {subject.evaluations.map((comp) => {
                const isEditing = editingId === comp.id;
                const percent =
                  comp.maxMarks > 0
                    ? ((comp.marksObtained / comp.maxMarks) * 100).toFixed(1)
                    : '0';
                const weighted =
                  comp.maxMarks > 0
                    ? ((comp.marksObtained / comp.maxMarks) * comp.weightage).toFixed(2)
                    : '0';

                if (isEditing) {
                  return (
                    <tr key={comp.id} className="bg-slate-50 dark:bg-slate-800/40">
                      <td className="py-3 px-4">
                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="w-full px-2 py-1 bg-white dark:bg-slate-900 border rounded text-xs"
                        />
                      </td>
                      <td className="py-3 px-4 text-center">
                        <input
                          type="number"
                          value={editWeightage}
                          onChange={(e) => setEditWeightage(Number(e.target.value))}
                          className="w-16 px-2 py-1 bg-white dark:bg-slate-900 border rounded text-xs text-center font-mono"
                        />
                      </td>
                      <td className="py-3 px-4 text-center">
                        <input
                          type="number"
                          step="0.5"
                          value={editMarksObtained}
                          onChange={(e) => setEditMarksObtained(Number(e.target.value))}
                          className="w-16 px-2 py-1 bg-white dark:bg-slate-900 border rounded text-xs text-center font-mono"
                        />
                      </td>
                      <td className="py-3 px-4 text-center">
                        <input
                          type="number"
                          step="0.5"
                          value={editMaxMarks}
                          onChange={(e) => setEditMaxMarks(Number(e.target.value))}
                          className="w-16 px-2 py-1 bg-white dark:bg-slate-900 border rounded text-xs text-center font-mono"
                        />
                      </td>
                      <td className="py-3 px-4 text-center font-mono text-slate-400">Auto</td>
                      <td className="py-3 px-4 text-center font-mono text-slate-400">Auto</td>
                      <td className="py-3 px-4 text-right space-x-1">
                        <button
                          onClick={() => saveEdit(comp.id)}
                          className="p-1.5 rounded-lg bg-emerald-600 text-white"
                        >
                          <Check className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="p-1.5 rounded-lg bg-slate-300 dark:bg-slate-700"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                }

                return (
                  <tr
                    key={comp.id}
                    className="hover:bg-slate-50/70 dark:hover:bg-slate-800/30 transition"
                  >
                    <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">
                      {comp.name}
                    </td>
                    <td className="py-3.5 px-4 text-center font-mono font-semibold text-slate-700 dark:text-slate-300">
                      {comp.weightage}%
                    </td>
                    <td className="py-3.5 px-4 text-center font-mono font-bold text-slate-900 dark:text-white">
                      {comp.marksObtained}
                    </td>
                    <td className="py-3.5 px-4 text-center font-mono text-slate-500">
                      {comp.maxMarks}
                    </td>
                    <td className="py-3.5 px-4 text-center font-mono font-bold">
                      <span
                        className={`px-2 py-0.5 rounded ${
                          Number(percent) >= 80
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400'
                            : Number(percent) >= 60
                            ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-gold-400'
                            : 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-400'
                        }`}
                      >
                        {percent}%
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center font-mono font-extrabold text-hsb-royal dark:text-hsb-cyan">
                      {weighted}%
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-1.5">
                      <button
                        onClick={() => startEdit(comp)}
                        className="p-1.5 text-slate-400 hover:text-slate-600"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete evaluation "${comp.name}"?`)) {
                            deleteEvaluationComponent(subject.code, comp.id);
                          }
                        }}
                        className="p-1.5 text-slate-400 hover:text-rose-600"
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
};
