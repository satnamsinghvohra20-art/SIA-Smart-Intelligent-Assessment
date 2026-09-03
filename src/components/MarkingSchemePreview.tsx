import React from 'react';
import { QuestionPaper } from '../types/paper';
import { Award, GraduationCap } from 'lucide-react';

interface MarkingSchemePreviewProps {
  paper: QuestionPaper;
  fontMode: 'serif' | 'sans';
}

export const MarkingSchemePreview: React.FC<MarkingSchemePreviewProps> = ({
  paper,
  fontMode
}) => {
  const { details, questions } = paper;

  return (
    <div className="w-full flex justify-center py-6 px-2 sm:px-4 bg-slate-950/40">
      <div
        className={`paper-sheet ${
          fontMode === 'sans' ? 'font-sans-mode' : ''
        } relative text-gray-900 border border-slate-300 print:border-none print:shadow-none`}
      >
        {/* Header */}
        <div className="section-header-block text-center border-b-2 border-emerald-900 pb-3 mb-4 space-y-1">
          <div className="inline-block px-3 py-1 rounded bg-emerald-100 text-emerald-900 font-black text-xs uppercase tracking-widest border border-emerald-300 mb-1">
            B.SC. DEGREE EXAMINATION — MODEL ANSWER KEY & EVALUATION SCHEME
          </div>

          <h1 className="text-base sm:text-lg font-bold uppercase tracking-wide text-gray-900">
            {details.degreeProgram} ({details.courseTitle}) — {details.semester}
          </h1>

          <div className="pt-2 border-t border-gray-300 mt-2 grid grid-cols-2 text-xs sm:text-sm font-semibold text-gray-800">
            <div className="text-left">
              <p><span className="font-bold">Paper Code:</span> {details.courseCode || 'N/A'}</p>
              <p><span className="font-bold">Total Questions:</span> {questions.length}</p>
            </div>
            <div className="text-right">
              <p><span className="font-bold">Maximum Marks:</span> {paper.totalMarks || details.totalMarks}</p>
              <p><span className="font-bold">Semester:</span> {details.semester}</p>
            </div>
          </div>
        </div>

        {/* University Evaluator Notice */}
        <div className="section-header-block mb-6 p-3 rounded border border-emerald-300 bg-emerald-50/60 text-[11px] sm:text-xs text-gray-800 space-y-1">
          <p className="font-bold uppercase tracking-wider text-emerald-950 flex items-center space-x-1.5">
            <Award className="w-4 h-4 text-emerald-700" />
            <span>Guidelines for University Examiners:</span>
          </p>
          <ul className="list-disc pl-4 space-y-0.5 text-gray-800">
            <li>Step-marking must be awarded for all intermediate derivations, theorem proofs, and calculation steps.</li>
            <li>Alternative mathematically / logically sound undergraduate proofs must be awarded appropriate partial / full credit.</li>
          </ul>
        </div>

        {/* Solutions List */}
        <div className="space-y-4">
          {questions.map((q, qIdx) => (
            <div
              key={q.id || qIdx}
              className="question-item p-3 rounded-lg border border-gray-200 bg-gray-50/40 text-xs sm:text-sm space-y-2"
            >
              <div className="flex items-start justify-between font-bold text-gray-900">
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-0.5 rounded bg-emerald-700 text-white text-xs font-black">
                    Q{q.number}
                  </span>
                  {q.topic && (
                    <span className="text-gray-700 text-xs">[{q.topic}]</span>
                  )}
                </div>
                <span className="text-emerald-800 font-extrabold">[{q.marks} Marks]</span>
              </div>

              {/* Question Statement Preview */}
              <p className="text-gray-600 text-xs italic line-clamp-2">
                {q.text}
              </p>

              {/* Model Solution Box */}
              <div className="p-2.5 rounded bg-white border border-gray-300 space-y-1.5">
                <div className="flex items-start space-x-1.5">
                  <span className="font-extrabold text-emerald-800 shrink-0">Model Summary:</span>
                  <span className="font-medium text-gray-900">
                    {q.answer || 'Standard undergraduate derivation/proof as formulated.'}
                  </span>
                </div>

                {q.solution && (
                  <div className="pt-1.5 border-t border-gray-200 text-xs text-gray-800 whitespace-pre-line">
                    <span className="font-bold text-gray-700 text-[11px] uppercase tracking-wider block mb-0.5">
                      Step-by-Step Marking Points & Derivation Breakdown:
                    </span>
                    <p className="text-gray-800">{q.solution}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="section-header-block text-center mt-12 pt-4 border-t border-gray-400 text-xs font-bold uppercase tracking-widest text-emerald-800">
          *** END OF B.SC. MARKING SCHEME ***
        </div>
      </div>
    </div>
  );
};
