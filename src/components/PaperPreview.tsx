import React from 'react';
import { QuestionPaper, Question } from '../types/paper';
import { Edit3, RefreshCw, Trash2, ArrowUp, ArrowDown } from 'lucide-react';

interface PaperPreviewProps {
  paper: QuestionPaper;
  fontMode: 'serif' | 'sans';
  onEditQuestion: (questionIndex: number) => void;
  onRegenerateQuestion: (questionIndex: number) => void;
  onDeleteQuestion: (questionIndex: number) => void;
  onMoveQuestion: (questionIndex: number, direction: 'up' | 'down') => void;
}

export const PaperPreview: React.FC<PaperPreviewProps> = ({
  paper,
  fontMode,
  onEditQuestion,
  onRegenerateQuestion,
  onDeleteQuestion,
  onMoveQuestion
}) => {
  const { details, questions } = paper;

  return (
    <div className="w-full flex justify-center py-6 px-2 sm:px-4 bg-slate-950/40">
      <div
        className={`paper-sheet ${
          fontMode === 'sans' ? 'font-sans-mode' : ''
        } relative text-gray-900 border border-slate-300 print:border-none print:shadow-none transition-all duration-300`}
      >
        {/* University / College Department Header */}
        <div className="section-header-block text-center border-b-2 border-gray-900 pb-3 mb-4 space-y-1">
          {details.collegeName && (
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-gray-800">
              {details.collegeName}
            </h2>
          )}

          <h1 className="text-lg sm:text-xl font-black uppercase tracking-wider text-gray-950">
            {details.degreeProgram} — {details.semester} EXAMINATION
          </h1>

          <div className="text-xs sm:text-sm font-extrabold uppercase text-gray-800">
            {details.courseCode ? `${details.courseCode}: ` : ''}{details.courseTitle}
          </div>

          {/* Roll No, Time, Marks Grid */}
          <div className="pt-2 border-t border-gray-400 mt-2 grid grid-cols-2 text-xs sm:text-sm font-semibold text-gray-800">
            <div className="text-left space-y-0.5">
              <p>
                <span className="font-bold">Time Allowed:</span> {details.duration}
              </p>
              <p>
                <span className="font-bold">Maximum Marks:</span> {paper.totalMarks || details.totalMarks}
              </p>
            </div>

            <div className="text-right space-y-0.5">
              <p className="font-mono">
                <span className="font-bold">Roll No.:</span> [ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ]
              </p>
              <p>
                <span className="font-bold">Semester:</span> {details.semester}
              </p>
            </div>
          </div>
        </div>

        {/* Candidate Instructions Box */}
        {details.instructions && details.instructions.length > 0 && (
          <div className="section-header-block mb-6 p-3 rounded border border-gray-300 bg-gray-50/80 text-[11px] sm:text-xs text-gray-800 space-y-1">
            <p className="font-bold uppercase tracking-wider text-gray-900 underline">
              Instructions for Candidates:
            </p>
            <ol className="list-decimal pl-4 space-y-0.5">
              {details.instructions.map((inst, i) => (
                <li key={i}>{inst}</li>
              ))}
            </ol>
          </div>
        )}

        {/* Undergraduate Degree Questions List */}
        <div className="space-y-4">
          {questions.map((question, qIdx) => (
            <div
              key={question.id || qIdx}
              className="question-item group relative p-3 rounded hover:bg-indigo-50/40 transition border border-transparent hover:border-indigo-200"
            >
              {/* Hover Action Controls (Non-print) */}
              <div className="no-print absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity flex items-center space-x-1 bg-slate-900 text-white px-2 py-1 rounded-lg shadow-lg z-20 text-[11px]">
                <button
                  onClick={() => onEditQuestion(qIdx)}
                  className="p-1 hover:text-indigo-300 hover:bg-slate-800 rounded"
                  title="Edit question text, solution, marks"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onRegenerateQuestion(qIdx)}
                  className="p-1 hover:text-emerald-300 hover:bg-slate-800 rounded"
                  title="Swap / Regenerate this B.Sc. question"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onMoveQuestion(qIdx, 'up')}
                  disabled={qIdx === 0}
                  className="p-1 hover:text-indigo-300 hover:bg-slate-800 rounded disabled:opacity-30"
                  title="Move Up"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onMoveQuestion(qIdx, 'down')}
                  disabled={qIdx === questions.length - 1}
                  className="p-1 hover:text-indigo-300 hover:bg-slate-800 rounded disabled:opacity-30"
                  title="Move Down"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onDeleteQuestion(qIdx)}
                  className="p-1 hover:text-red-400 hover:bg-slate-800 rounded"
                  title="Delete question"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Question Statement */}
              <div className="flex items-start justify-between gap-2 text-xs sm:text-sm text-gray-900 leading-relaxed">
                <div className="flex items-start space-x-2 flex-1">
                  <span className="font-black shrink-0 text-gray-950">
                    Q{question.number}.
                  </span>
                  <div className="flex-1 whitespace-pre-line font-medium text-gray-900">
                    {question.text}
                  </div>
                </div>

                <div className="shrink-0 font-bold text-gray-950 ml-2">
                  [{question.marks} Marks]
                </div>
              </div>

              {/* Options for MCQ if applicable */}
              {question.options && question.options.length > 0 && (
                <div className="mt-2.5 ml-6 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 text-xs sm:text-[13px] text-gray-800">
                  {question.options.map((opt) => (
                    <div key={opt.id} className="flex items-start space-x-2">
                      <span className="font-bold text-gray-950">({opt.id})</span>
                      <span className="text-gray-800">{opt.text}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="section-header-block text-center mt-12 pt-4 border-t border-gray-400 text-xs font-bold uppercase tracking-widest text-gray-600">
          *** END OF B.SC. DEGREE EXAMINATION PAPER ***
        </div>
      </div>
    </div>
  );
};
