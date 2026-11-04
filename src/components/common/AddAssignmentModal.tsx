import React, { useState } from 'react';
import { useLMS } from '../../context/LMSContext';
import { X, Calendar, BookOpen, AlertCircle, UploadCloud, Flag } from 'lucide-react';
import { playStudyChime } from '../../utils/sound';

interface AddAssignmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultSubjectCode?: string;
}

export const AddAssignmentModal: React.FC<AddAssignmentModalProps> = ({
  isOpen,
  onClose,
  defaultSubjectCode,
}) => {
  const { subjects, addAssignment, uploadFile } = useLMS();

  const [subjectCode, setSubjectCode] = useState(defaultSubjectCode || subjects[0]?.code || 'PM2');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 3);
    d.setHours(23, 59, 0, 0);
    return d.toISOString().slice(0, 16);
  });
  const [priority, setPriority] = useState<'High' | 'Medium' | 'Low'>('Medium');
  const [weightage, setWeightage] = useState<number>(20);
  const [status, setStatus] = useState<'Pending' | 'In Progress' | 'Submitted'>('Pending');
  const [fileToUpload, setFileToUpload] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Please provide an assignment title.');
      return;
    }
    if (!subjectCode) {
      setError('Please select a course.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const created = await addAssignment({
        subjectId: subjectCode,
        title: title.trim(),
        description: description.trim(),
        dueDate: new Date(dueDate).toISOString(),
        priority,
        status,
        weightage: Number(weightage) || 0,
      });

      if (fileToUpload) {
        await uploadFile(
          fileToUpload,
          subjectCode,
          'Assignment Submissions',
          created.id
        );
        if (status === 'Submitted') {
          playStudyChime();
        }
      }

      onClose();
    } catch (err) {
      setError((err as Error).message || 'Failed to save assignment.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white dark:bg-[#111827] rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-[#004B93] via-[#003870] to-[#002B5B] text-white">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-white/15 text-[#38BDF8] border border-white/20">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                Log New Deliverable / Assignment
              </h3>
              <p className="text-xs text-slate-300">
                HSB Jaipur Trimester II Academic Tracker
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 text-rose-800 dark:bg-rose-950/40 dark:text-rose-300 text-xs flex items-center space-x-2 border border-rose-200 dark:border-rose-900">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Subject & Priority in 2 columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5 flex items-center space-x-1.5">
                <BookOpen className="w-3.5 h-3.5 text-hsb-royal dark:text-hsb-cyan" />
                <span>Target Course *</span>
              </label>
              <select
                value={subjectCode}
                onChange={(e) => setSubjectCode(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 font-bold"
                required
              >
                {subjects.map((s) => (
                  <option key={s.code} value={s.code}>
                    {s.code} • {s.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5 flex items-center space-x-1.5">
                <Flag className="w-3.5 h-3.5 text-amber-500" />
                <span>Priority</span>
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as 'High' | 'Medium' | 'Low')}
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 font-bold"
              >
                <option value="High">High Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="Low">Low Priority</option>
              </select>
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
              Deliverable Title *
            </label>
            <input
              type="text"
              placeholder="e.g. PRD Specification & Wireframe Deck"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-hsb-royal"
              required
            />
          </div>

          {/* Due Date & Weightage in 2 columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
                Due Date & Time *
              </label>
              <input
                type="datetime-local"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 font-mono"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
                Weightage (% of Grade)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={weightage}
                onChange={(e) => setWeightage(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono"
              />
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
              Current Submission Status
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['Pending', 'In Progress', 'Submitted'] as const).map((st) => (
                <button
                  type="button"
                  key={st}
                  onClick={() => setStatus(st)}
                  className={`py-2 text-xs font-semibold rounded-xl border transition ${
                    status === st
                      ? st === 'Submitted'
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : st === 'In Progress'
                        ? 'bg-amber-600 text-white border-amber-600'
                        : 'bg-hsb-navy text-hsb-cyan border-hsb-royal'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
              Instructions & Notes
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Submit PDF and slide deck..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
            />
          </div>

          {/* Optional Direct File Upload */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5 flex items-center space-x-1.5">
              <UploadCloud className="w-3.5 h-3.5 text-hsb-royal dark:text-hsb-cyan" />
              <span>Attach Deliverable File (Saved in IndexedDB)</span>
            </label>
            <input
              type="file"
              accept=".pdf,.ppt,.pptx,.doc,.docx,.xlsx"
              onChange={(e) => setFileToUpload(e.target.files?.[0] || null)}
              className="w-full text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-hsb-royal hover:file:bg-blue-100"
            />
          </div>

          {/* Actions */}
          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 text-xs font-bold rounded-xl bg-[#004B93] hover:bg-[#003870] text-white shadow-sm transition"
            >
              {isSubmitting ? 'Saving...' : 'Create Deliverable'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
