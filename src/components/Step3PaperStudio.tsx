import React, { useState } from 'react';
import { QuestionPaper, Question } from '../types/paper';
import { PaperPreview } from './PaperPreview';
import { MarkingSchemePreview } from './MarkingSchemePreview';
import { QuestionEditorModal } from './QuestionEditorModal';
import { exportPaperToDocx, formatPaperAsMarkdown, savePaperToLibrary } from '../services/exportService';
import { 
  Printer, 
  Download, 
  Copy, 
  BookmarkCheck, 
  FileText, 
  Award, 
  Type, 
  RefreshCw, 
  Check, 
  ArrowLeft 
} from 'lucide-react';

interface Step3PaperStudioProps {
  paper: QuestionPaper;
  onPaperChange: (paper: QuestionPaper) => void;
  onBackToSyllabus: () => void;
  onRegenerateAll: () => void;
  onSavedPaperAdded: () => void;
}

export const Step3PaperStudio: React.FC<Step3PaperStudioProps> = ({
  paper,
  onPaperChange,
  onBackToSyllabus,
  onRegenerateAll,
  onSavedPaperAdded
}) => {
  const [activeView, setActiveView] = useState<'paper' | 'solutions'>('paper');
  const [fontMode, setFontMode] = useState<'serif' | 'sans'>('serif');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [copyToast, setCopyToast] = useState(false);
  const [saveToast, setSaveToast] = useState(false);

  // Edit question
  const handleSaveQuestion = (updatedQ: Question) => {
    if (editingIndex === null) return;
    const copyQuestions = [...paper.questions];
    copyQuestions[editingIndex] = updatedQ;

    const totalMarks = copyQuestions.reduce((acc, q) => acc + q.marks, 0);

    onPaperChange({
      ...paper,
      questions: copyQuestions,
      totalMarks
    });
  };

  // Single question regeneration
  const handleRegenerateSingleQuestion = (qIdx: number) => {
    const targetQ = paper.questions[qIdx];
    const copyQuestions = [...paper.questions];
    
    let updatedQ: Question = { ...targetQ };
    if (targetQ.type === 'mcq') {
      updatedQ = {
        ...targetQ,
        id: `bsc-q-swap-${Date.now()}`,
        text: `In the theoretical formulation of ${targetQ.topic || paper.details.courseTitle}, which of the following expressions represents the normalized boundary condition?`,
        options: [
          { id: 'A', text: `The state parameter converges asymptotically under standard unitary invariance.` },
          { id: 'B', text: `The characteristic operator spectrum vanishes identically on all subspaces.` },
          { id: 'C', text: `The scalar potential diverges continuously along the coordinate manifold.` },
          { id: 'D', text: `The system violates the conservation law in steady state.` }
        ],
        answer: 'A',
        solution: `Option (A) is correct. Standard undergraduate boundary condition in ${targetQ.topic || paper.details.courseTitle}.`
      };
    } else {
      updatedQ = {
        ...targetQ,
        id: `bsc-q-swap-${Date.now()}`,
        text: `(a) State and explain the governing theorem/principle for ${targetQ.topic || paper.details.courseTitle}.\n(b) From first principles, derive the fundamental mathematical formulation.\n(c) State two practical limitations or boundary assumptions.`,
        answer: `Comprehensive derivation and theoretical analysis for ${targetQ.topic || paper.details.courseTitle}.`,
        solution: `1. Statement of theorem & core assumptions (2 Marks)\n2. Step-by-step mathematical derivation (${targetQ.marks > 5 ? '4' : '2'} Marks)\n3. Discussion of physical/algorithmic interpretation & limitations (${targetQ.marks > 5 ? '2' : '1'} Marks)`
      };
    }

    copyQuestions[qIdx] = updatedQ;
    onPaperChange({
      ...paper,
      questions: copyQuestions
    });
  };

  // Delete question
  const handleDeleteQuestion = (qIdx: number) => {
    if (paper.questions.length <= 1) {
      alert('Question paper must have at least one question.');
      return;
    }
    const filtered = paper.questions.filter((_, i) => i !== qIdx);
    const reindexed = filtered.map((q, idx) => ({ ...q, number: idx + 1 }));
    const totalMarks = reindexed.reduce((acc, q) => acc + q.marks, 0);

    onPaperChange({
      ...paper,
      questions: reindexed,
      totalMarks
    });
  };

  // Move question
  const handleMoveQuestion = (qIdx: number, direction: 'up' | 'down') => {
    const questions = [...paper.questions];
    const targetIdx = direction === 'up' ? qIdx - 1 : qIdx + 1;
    if (targetIdx < 0 || targetIdx >= questions.length) return;

    const temp = questions[qIdx];
    questions[qIdx] = questions[targetIdx];
    questions[targetIdx] = temp;

    const reindexed = questions.map((q, idx) => ({ ...q, number: idx + 1 }));

    onPaperChange({
      ...paper,
      questions: reindexed
    });
  };

  // Export
  const handlePrint = () => {
    window.print();
  };

  const handleExportWord = async () => {
    await exportPaperToDocx(paper, true);
  };

  const handleCopyMarkdown = () => {
    const text = formatPaperAsMarkdown(paper);
    navigator.clipboard.writeText(text);
    setCopyToast(true);
    setTimeout(() => setCopyToast(false), 2000);
  };

  const handleSaveToLibrary = () => {
    savePaperToLibrary(paper);
    onSavedPaperAdded();
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2000);
  };

  const currentEditingQuestion = editingIndex !== null ? paper.questions[editingIndex] : null;

  return (
    <div className="w-full space-y-4 pb-20">
      {/* Action Toolbar */}
      <div className="no-print sticky top-[57px] z-30 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 px-4 py-3 shadow-xl">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          {/* View Switcher */}
          <div className="flex items-center space-x-1 bg-slate-800/90 p-1 rounded-xl border border-slate-700/80">
            <button
              onClick={() => setActiveView('paper')}
              className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
                activeView === 'paper'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>B.Sc. Exam Paper</span>
            </button>

            <button
              onClick={() => setActiveView('solutions')}
              className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
                activeView === 'solutions'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>Model Answer Key</span>
            </button>
          </div>

          {/* Export & Format Controls */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setFontMode(fontMode === 'serif' ? 'sans' : 'serif')}
              className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white text-xs border border-slate-700"
              title="Toggle Serif / Sans Font"
            >
              <Type className="w-3.5 h-3.5" />
              <span className="capitalize">{fontMode} Font</span>
            </button>

            <div className="h-5 w-[1px] bg-slate-700 mx-1 hidden sm:block" />

            <button
              onClick={handleCopyMarkdown}
              className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs border border-slate-700 transition"
              title="Copy text to clipboard"
            >
              {copyToast ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copyToast ? 'Copied!' : 'Copy'}</span>
            </button>

            <button
              onClick={handleSaveToLibrary}
              className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-amber-600/20 hover:bg-amber-600/30 text-amber-300 text-xs font-semibold border border-amber-500/40 transition"
              title="Save paper"
            >
              {saveToast ? <Check className="w-3.5 h-3.5 text-amber-400" /> : <BookmarkCheck className="w-3.5 h-3.5 text-amber-400" />}
              <span>{saveToast ? 'Saved!' : 'Save'}</span>
            </button>

            <button
              onClick={handleExportWord}
              className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow transition"
              title="Download Word docx"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Word (DOCX)</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/25 transition"
              title="Print or Save PDF"
            >
              <Printer className="w-4 h-4" />
              <span>Print / PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* Preview Sheet Area */}
      <div className="max-w-6xl mx-auto px-2 sm:px-4">
        {activeView === 'paper' ? (
          <PaperPreview
            paper={paper}
            fontMode={fontMode}
            onEditQuestion={(idx) => setEditingIndex(idx)}
            onRegenerateQuestion={handleRegenerateSingleQuestion}
            onDeleteQuestion={handleDeleteQuestion}
            onMoveQuestion={handleMoveQuestion}
          />
        ) : (
          <MarkingSchemePreview
            paper={paper}
            fontMode={fontMode}
          />
        )}
      </div>

      {/* Bottom Nav */}
      <div className="no-print max-w-4xl mx-auto flex items-center justify-between px-4 pt-6 border-t border-slate-800">
        <button
          onClick={onBackToSyllabus}
          className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Change Syllabus / Course</span>
        </button>

        <button
          onClick={onRegenerateAll}
          className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-200 text-xs font-semibold border border-indigo-500/40 transition"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Regenerate B.Sc. Paper</span>
        </button>
      </div>

      {/* Edit Modal */}
      <QuestionEditorModal
        question={currentEditingQuestion}
        isOpen={editingIndex !== null}
        onClose={() => setEditingIndex(null)}
        onSave={handleSaveQuestion}
      />
    </div>
  );
};
