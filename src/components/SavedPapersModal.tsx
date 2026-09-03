import React from 'react';
import { SavedPaper } from '../types/paper';
import { X, FolderOpen, Calendar, Trash2, ArrowUpRight, GraduationCap } from 'lucide-react';

interface SavedPapersModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedPapers: SavedPaper[];
  onLoadPaper: (saved: SavedPaper) => void;
  onDeletePaper: (id: string) => void;
}

export const SavedPapersModal: React.FC<SavedPapersModalProps> = ({
  isOpen,
  onClose,
  savedPapers,
  onLoadPaper,
  onDeletePaper
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center space-x-2">
            <GraduationCap className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-white text-base">Saved B.Sc. Question Papers</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List */}
        <div className="p-6 overflow-y-auto space-y-3 flex-1">
          {savedPapers.length === 0 ? (
            <div className="text-center py-12 space-y-3 text-slate-400">
              <FolderOpen className="w-12 h-12 mx-auto text-slate-600 stroke-[1.5]" />
              <p className="text-sm font-medium">No saved B.Sc. exam papers yet.</p>
              <p className="text-xs text-slate-500">
                Generate a question paper and click "Save" in Step 3 to store it in your university repository.
              </p>
            </div>
          ) : (
            savedPapers.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 hover:border-slate-600 transition group"
              >
                <div className="space-y-1 min-w-0 flex-1 mr-4">
                  <h4 className="font-bold text-slate-100 text-sm truncate">{item.title}</h4>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                    <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-semibold border border-indigo-500/30">
                      {item.degreeProgram}
                    </span>
                    <span>{item.courseTitle}</span>
                    <span>•</span>
                    <span className="text-amber-300 font-bold">{item.totalMarks} Marks</span>
                    <span>•</span>
                    <span className="flex items-center space-x-1 text-slate-500">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 shrink-0">
                  <button
                    onClick={() => {
                      onLoadPaper(item);
                      onClose();
                    }}
                    className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow transition"
                  >
                    <span>Open</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onDeletePaper(item.id)}
                    className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition"
                    title="Delete saved paper"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end px-6 py-3 border-t border-slate-800 bg-slate-900/90 text-xs text-slate-400">
          <span>{savedPapers.length} B.Sc. Question Papers in Storage</span>
        </div>
      </div>
    </div>
  );
};
