import React, { useState } from 'react';
import { Question, QuestionOption, Difficulty, QuestionType } from '../types/paper';
import { X, Plus, Trash2, Check } from 'lucide-react';

interface QuestionEditorModalProps {
  question: Question | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedQuestion: Question) => void;
}

export const QuestionEditorModal: React.FC<QuestionEditorModalProps> = ({
  question,
  isOpen,
  onClose,
  onSave
}) => {
  if (!isOpen || !question) return null;

  const [formData, setFormData] = useState<Question>({ ...question });
  const [newOptionText, setNewOptionText] = useState('');

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  const handleAddOption = () => {
    if (!newOptionText.trim()) return;
    const currentOptions = formData.options || [];
    const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
    const nextLetter = letters[currentOptions.length] || `Opt${currentOptions.length + 1}`;
    
    setFormData({
      ...formData,
      options: [...currentOptions, { id: nextLetter, text: newOptionText.trim() }]
    });
    setNewOptionText('');
  };

  const handleUpdateOption = (index: number, text: string) => {
    if (!formData.options) return;
    const copy = [...formData.options];
    copy[index] = { ...copy[index], text };
    setFormData({ ...formData, options: copy });
  };

  const handleDeleteOption = (index: number) => {
    if (!formData.options) return;
    const copy = formData.options.filter((_, i) => i !== index);
    setFormData({ ...formData, options: copy });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-1 rounded-lg bg-indigo-600 text-white font-bold text-xs">
              Q{formData.number}
            </span>
            <h3 className="font-bold text-white text-base">Edit B.Sc. Question</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs text-slate-200 flex-1">
          <div>
            <label className="block font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
              Question Statement
            </label>
            <textarea
              value={formData.text}
              onChange={(e) => setFormData({ ...formData, text: e.target.value })}
              rows={4}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-indigo-500 transition resize-y font-sans leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-400 mb-1">Marks</label>
              <input
                type="number"
                min="1"
                max="50"
                value={formData.marks}
                onChange={(e) => setFormData({ ...formData, marks: Number(e.target.value) || 1 })}
                className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-amber-300 font-bold focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-400 mb-1">Topic / Unit</label>
              <input
                type="text"
                value={formData.topic || ''}
                onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* MCQ Options */}
          {formData.type === 'mcq' && (
            <div className="space-y-3 pt-3 border-t border-slate-800">
              <label className="block font-semibold uppercase tracking-wider text-slate-300">
                Options & Correct Answer
              </label>

              <div className="space-y-2">
                {(formData.options || []).map((opt, idx) => (
                  <div key={opt.id || idx} className="flex items-center space-x-2 bg-slate-800/80 p-2 rounded-lg border border-slate-700">
                    <span className="w-6 text-center font-bold text-indigo-400">[{opt.id}]</span>
                    <input
                      type="text"
                      value={opt.text}
                      onChange={(e) => handleUpdateOption(idx, e.target.value)}
                      className="flex-1 bg-transparent text-slate-200 text-xs focus:outline-none"
                    />
                    <label className="flex items-center space-x-1 cursor-pointer px-2 py-1 rounded bg-slate-900 border border-slate-700 text-[11px]">
                      <input
                        type="radio"
                        name="correct-answer"
                        checked={formData.answer === opt.id}
                        onChange={() => setFormData({ ...formData, answer: opt.id })}
                        className="text-emerald-500"
                      />
                      <span className={formData.answer === opt.id ? 'text-emerald-400 font-bold' : 'text-slate-400'}>
                        Correct
                      </span>
                    </label>
                    <button
                      type="button"
                      onClick={() => handleDeleteOption(idx)}
                      className="text-slate-400 hover:text-red-400 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}

                <div className="flex items-center space-x-2 mt-2">
                  <input
                    type="text"
                    value={newOptionText}
                    onChange={(e) => setNewOptionText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddOption()}
                    placeholder="Add option text..."
                    className="flex-1 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddOption}
                    className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Model Answer / Solution Steps */}
          <div className="space-y-3 pt-3 border-t border-slate-800">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Model Solution Summary</label>
              <input
                type="text"
                value={formData.answer || ''}
                onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                placeholder="Core solution statement..."
                className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-100 text-xs focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Step-by-Step Mathematical Derivation / Proof / Solution</label>
              <textarea
                value={formData.solution || ''}
                onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                rows={4}
                placeholder="Detailed derivation steps and mark allocations..."
                className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-100 text-xs focus:outline-none focus:border-indigo-500 resize-y whitespace-pre-line font-mono"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 px-6 py-4 border-t border-slate-800 bg-slate-900/90">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs border border-slate-700"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex items-center space-x-1.5 px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-md"
          >
            <Check className="w-4 h-4" />
            <span>Save Question</span>
          </button>
        </div>
      </div>
    </div>
  );
};
