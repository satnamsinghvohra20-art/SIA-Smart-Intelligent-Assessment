import React from 'react';
import { GraduationCap, FolderOpen, Key, Sparkles, PlusCircle } from 'lucide-react';

interface HeaderProps {
  onOpenSavedPapers: () => void;
  onOpenApiKeyModal: () => void;
  onResetNewPaper: () => void;
  hasApiKey: boolean;
  savedPapersCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSavedPapers,
  onOpenApiKeyModal,
  onResetNewPaper,
  hasApiKey,
  savedPapersCount
}) => {
  return (
    <header className="no-print bg-slate-900/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-40 px-4 sm:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={onResetNewPaper}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/25 ring-1 ring-white/20">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent">
                B.Sc. PaperCraft
              </span>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center space-x-1">
                <Sparkles className="w-3 h-3 text-indigo-400" />
                <span>University Degree Edition</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">Undergraduate B.Sc. Question Paper & Solutions Generator</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Saved Papers Button */}
          <button
            onClick={onOpenSavedPapers}
            className="flex items-center space-x-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 transition hover:border-slate-600 active:scale-95"
            title="View Saved University Papers"
          >
            <FolderOpen className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">Saved Papers</span>
            {savedPapersCount > 0 && (
              <span className="px-1.5 py-0.2 text-[10px] font-bold bg-amber-500/20 text-amber-300 rounded-full border border-amber-500/30">
                {savedPapersCount}
              </span>
            )}
          </button>

          {/* AI Settings Button */}
          <button
            onClick={onOpenApiKeyModal}
            className={`flex items-center space-x-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg border transition active:scale-95 ${
              hasApiKey
                ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/30 hover:bg-emerald-900/50'
                : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
            title="Configure Gemini AI Key (Optional)"
          >
            <Key className={`w-3.5 h-3.5 ${hasApiKey ? 'text-emerald-400' : 'text-slate-400'}`} />
            <span className="hidden sm:inline">
              {hasApiKey ? 'Gemini AI Active' : 'AI Key'}
            </span>
          </button>

          {/* New Paper Button */}
          <button
            onClick={onResetNewPaper}
            className="flex items-center space-x-1.5 px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30 transition hover:shadow-indigo-600/50 active:scale-95"
            title="Create New B.Sc. Paper"
          >
            <PlusCircle className="w-4 h-4" />
            <span>New Exam Paper</span>
          </button>
        </div>
      </div>
    </header>
  );
};
