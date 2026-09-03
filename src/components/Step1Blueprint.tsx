import React, { useState } from 'react';
import { PaperDetails, QuestionTypeConfig, Difficulty } from '../types/paper';
import { 
  ArrowRight, 
  GraduationCap, 
  Building2, 
  CheckCircle2, 
  Trash2,
  Sparkles
} from 'lucide-react';

interface Step1BlueprintProps {
  details: PaperDetails;
  onDetailsChange: (details: PaperDetails) => void;
  questionConfigs: QuestionTypeConfig[];
  onQuestionConfigsChange: (configs: QuestionTypeConfig[]) => void;
  onNext: () => void;
}

export const Step1Blueprint: React.FC<Step1BlueprintProps> = ({
  details,
  onDetailsChange,
  questionConfigs,
  onQuestionConfigsChange,
  onNext
}) => {
  const [newInstruction, setNewInstruction] = useState('');
  const [degreeCategory, setDegreeCategory] = useState<'all' | 'cs' | 'phys' | 'chem' | 'bio' | 'math' | 'applied'>('all');

  const calculatedTotalMarks = questionConfigs
    .filter(c => c.enabled)
    .reduce((acc, c) => acc + (c.count * c.marksPerQuestion), 0);

  const totalQuestionsCount = questionConfigs
    .filter(c => c.enabled)
    .reduce((acc, c) => acc + c.count, 0);

  const handleToggleType = (index: number) => {
    const updated = [...questionConfigs];
    updated[index] = { ...updated[index], enabled: !updated[index].enabled };
    onQuestionConfigsChange(updated);
  };

  const handleUpdateConfig = (index: number, updates: Partial<QuestionTypeConfig>) => {
    const updated = [...questionConfigs];
    updated[index] = { ...updated[index], ...updates };
    onQuestionConfigsChange(updated);
  };

  const handleAddInstruction = () => {
    if (!newInstruction.trim()) return;
    onDetailsChange({
      ...details,
      instructions: [...details.instructions, newInstruction.trim()]
    });
    setNewInstruction('');
  };

  const handleDeleteInstruction = (index: number) => {
    onDetailsChange({
      ...details,
      instructions: details.instructions.filter((_, i) => i !== index)
    });
  };

  // Comprehensive Catalog of B.Sc. Degree Programs
  const bscProgramsCategorized = [
    // Computing & Data
    { name: 'B.Sc. Computer Science', category: 'cs' },
    { name: 'B.Sc. Information Technology', category: 'cs' },
    { name: 'B.Sc. Data Science & Analytics', category: 'cs' },
    { name: 'B.Sc. Artificial Intelligence & ML', category: 'cs' },
    { name: 'B.Sc. Cyber Security & Forensics', category: 'cs' },
    { name: 'B.Sc. Bioinformatics', category: 'cs' },

    // Physical Sciences & Electronics
    { name: 'B.Sc. Physics', category: 'phys' },
    { name: 'B.Sc. Applied Physics', category: 'phys' },
    { name: 'B.Sc. Electronics', category: 'phys' },
    { name: 'B.Sc. Astrophysics & Space Science', category: 'phys' },
    { name: 'B.Sc. Nanotechnology & Materials Science', category: 'phys' },
    { name: 'B.Sc. Geophysics & Meteorology', category: 'phys' },

    // Chemical & Biochemical
    { name: 'B.Sc. Chemistry', category: 'chem' },
    { name: 'B.Sc. Biochemistry', category: 'chem' },
    { name: 'B.Sc. Industrial & Analytical Chemistry', category: 'chem' },
    { name: 'B.Sc. Polymer Chemistry', category: 'chem' },

    // Life Sciences & Medical/Bio
    { name: 'B.Sc. Biotechnology', category: 'bio' },
    { name: 'B.Sc. Microbiology', category: 'bio' },
    { name: 'B.Sc. Zoology', category: 'bio' },
    { name: 'B.Sc. Botany', category: 'bio' },
    { name: 'B.Sc. Genetics & Genomics', category: 'bio' },
    { name: 'B.Sc. Biomedical Science', category: 'bio' },
    { name: 'B.Sc. Forensic Science', category: 'bio' },
    { name: 'B.Sc. Neuroscience', category: 'bio' },

    // Mathematical & Statistical
    { name: 'B.Sc. Mathematics', category: 'math' },
    { name: 'B.Sc. Applied Mathematics & Computing', category: 'math' },
    { name: 'B.Sc. Statistics', category: 'math' },
    { name: 'B.Sc. Actuarial Science', category: 'math' },

    // Applied, Earth & Environmental
    { name: 'B.Sc. Environmental Science & Ecology', category: 'applied' },
    { name: 'B.Sc. Agriculture', category: 'applied' },
    { name: 'B.Sc. Horticulture', category: 'applied' },
    { name: 'B.Sc. Food Technology & Nutrition', category: 'applied' },
    { name: 'B.Sc. Geology & Earth Science', category: 'applied' },
    { name: 'B.Sc. Forestry & Wildlife Biology', category: 'applied' }
  ];

  const filteredPrograms = degreeCategory === 'all' 
    ? bscProgramsCategorized 
    : bscProgramsCategorized.filter(p => p.category === degreeCategory);

  const semesterOptions = [
    'Semester I', 'Semester II', 'Semester III', 'Semester IV', 'Semester V', 'Semester VI',
    'Year 1', 'Year 2', 'Year 3'
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-indigo-950/80 via-slate-900 to-purple-950/70 border border-indigo-500/20 rounded-2xl p-6 sm:p-8 backdrop-blur shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-3">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>B.Sc. Degree Examination Setup</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              B.Sc. Question Paper Configuration
            </h1>
            <p className="text-slate-300 text-sm mt-1.5 max-w-xl">
              Choose from 30+ undergraduate B.Sc. disciplines or enter a custom program, semester, course code, and mark distribution.
            </p>
          </div>

          <button
            onClick={onNext}
            className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 transition transform hover:scale-[1.02] active:scale-[0.98] shrink-0"
          >
            <span>Next: B.Sc. Syllabus</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* University & Degree Details Form */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
        <h2 className="text-base font-bold text-white flex items-center space-x-2">
          <Building2 className="w-5 h-5 text-indigo-400" />
          <span>University & Course Details</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
              College / University Department
            </label>
            <input
              type="text"
              value={details.collegeName}
              onChange={(e) => onDetailsChange({ ...details, collegeName: e.target.value })}
              placeholder="e.g. Faculty of Science / Department of Computer Science"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-indigo-500 transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
              Examination Title
            </label>
            <input
              type="text"
              value={details.examTitle}
              onChange={(e) => onDetailsChange({ ...details, examTitle: e.target.value })}
              placeholder="e.g. B.Sc. Semester-V Degree Examination 2026"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-indigo-500 transition"
            />
          </div>

          <div className="sm:col-span-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                B.Sc. Degree Program ({bscProgramsCategorized.length} Programs Available)
              </label>
              {/* Category Filter Chips */}
              <div className="flex flex-wrap gap-1 text-[11px]">
                {[
                  { id: 'all', label: 'All' },
                  { id: 'cs', label: 'Computing & IT' },
                  { id: 'phys', label: 'Physics & Electronics' },
                  { id: 'chem', label: 'Chemistry' },
                  { id: 'bio', label: 'Bio & Life Sciences' },
                  { id: 'math', label: 'Math & Stats' },
                  { id: 'applied', label: 'Earth & Applied' }
                ].map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setDegreeCategory(cat.id as any)}
                    className={`px-2 py-0.5 rounded-md border transition ${
                      degreeCategory === cat.id
                        ? 'bg-indigo-600 text-white border-indigo-500 font-bold'
                        : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:text-white'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            <input
              type="text"
              value={details.degreeProgram}
              onChange={(e) => onDetailsChange({ ...details, degreeProgram: e.target.value })}
              placeholder="e.g. B.Sc. Computer Science / Type any custom degree"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 text-sm font-semibold focus:outline-none focus:border-indigo-500 transition mb-2"
            />

            {/* Quick Degree Chips */}
            <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pr-1">
              {filteredPrograms.map((prog) => (
                <button
                  key={prog.name}
                  type="button"
                  onClick={() => onDetailsChange({ ...details, degreeProgram: prog.name })}
                  className={`text-[11px] px-2.5 py-1 rounded-lg border transition ${
                    details.degreeProgram === prog.name
                      ? 'bg-indigo-600/40 border-indigo-500 text-indigo-200 font-bold shadow-sm ring-1 ring-indigo-500'
                      : 'bg-slate-800/70 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  {prog.name}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                Semester / Year
              </label>
              <select
                value={details.semester}
                onChange={(e) => onDetailsChange({ ...details, semester: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-indigo-500 transition"
              >
                {semesterOptions.map((sem) => (
                  <option key={sem} value={sem}>{sem}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                Paper / Course Code
              </label>
              <input
                type="text"
                value={details.courseCode}
                onChange={(e) => onDetailsChange({ ...details, courseCode: e.target.value })}
                placeholder="e.g. CS-501 / PHY-302 / MATH-401"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-indigo-500 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
              Course / Paper Title
            </label>
            <input
              type="text"
              value={details.courseTitle}
              onChange={(e) => onDetailsChange({ ...details, courseTitle: e.target.value })}
              placeholder="e.g. Data Structures & Algorithms, Quantum Mechanics, Molecular Biology"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-indigo-500 transition"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                Time Allowed
              </label>
              <input
                type="text"
                value={details.duration}
                onChange={(e) => onDetailsChange({ ...details, duration: e.target.value })}
                placeholder="e.g. 3 Hours, 2 Hours"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-indigo-500 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                Difficulty Level
              </label>
              <select
                value={details.difficulty}
                onChange={(e) => onDetailsChange({ ...details, difficulty: e.target.value as Difficulty })}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-indigo-500 transition"
              >
                <option value="medium">Standard University Degree Level</option>
                <option value="hard">Advanced / Honours Level</option>
                <option value="easy">Foundational / Core</option>
                <option value="mixed">Mixed Distribution</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Question Formats & Quantities */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-base font-bold text-white flex items-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-indigo-400" />
              <span>B.Sc. Question Types & Mark Allocations</span>
            </h2>
            <p className="text-xs text-slate-400">Configure undergraduate question weightages</p>
          </div>

          <div className="px-3.5 py-1.5 rounded-xl bg-indigo-950/60 border border-indigo-500/40 text-xs font-bold text-indigo-300 flex items-center space-x-2">
            <span>{totalQuestionsCount} Questions</span>
            <span>•</span>
            <span className="text-amber-300">Total: {calculatedTotalMarks} Marks</span>
          </div>
        </div>

        {/* Question Type Cards */}
        <div className="space-y-3">
          {questionConfigs.map((config, idx) => (
            <div
              key={config.type}
              className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl border transition ${
                config.enabled
                  ? 'bg-slate-800/90 border-indigo-500/40 shadow-sm'
                  : 'bg-slate-900/40 border-slate-800/80 opacity-60'
              }`}
            >
              <label className="flex items-center space-x-3 cursor-pointer flex-1">
                <input
                  type="checkbox"
                  checked={config.enabled}
                  onChange={() => handleToggleType(idx)}
                  className="rounded bg-slate-900 border-slate-700 text-indigo-600 focus:ring-indigo-500 w-5 h-5 cursor-pointer"
                />
                <div>
                  <h4 className="font-bold text-sm text-slate-100">{config.label}</h4>
                  <p className="text-[11px] text-slate-400">{config.description}</p>
                </div>
              </label>

              {config.enabled && (
                <div className="flex items-center space-x-4 shrink-0">
                  <div className="flex items-center space-x-1.5">
                    <label className="text-xs text-slate-400">Questions:</label>
                    <input
                      type="number"
                      min="1"
                      max="30"
                      value={config.count}
                      onChange={(e) => handleUpdateConfig(idx, { count: Math.max(1, Number(e.target.value) || 1) })}
                      className="w-14 text-center text-xs font-bold bg-slate-900 border border-slate-700 px-2 py-1.5 rounded-lg text-slate-100 focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div className="flex items-center space-x-1.5">
                    <label className="text-xs text-slate-400">Marks each:</label>
                    <input
                      type="number"
                      min="1"
                      max="50"
                      value={config.marksPerQuestion}
                      onChange={(e) => handleUpdateConfig(idx, { marksPerQuestion: Math.max(1, Number(e.target.value) || 1) })}
                      className="w-14 text-center text-xs font-bold bg-slate-900 border border-slate-700 px-2 py-1.5 rounded-lg text-amber-300 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Exam Instructions */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <h2 className="text-base font-bold text-white flex items-center space-x-2">
          <span>Instructions for Candidates</span>
        </h2>

        <div className="space-y-2">
          {details.instructions.map((inst, idx) => (
            <div key={idx} className="flex items-center space-x-2 bg-slate-800/60 p-2.5 rounded-lg border border-slate-700/60 text-xs">
              <span className="font-bold text-slate-400 w-5">({idx + 1})</span>
              <input
                type="text"
                value={inst}
                onChange={(e) => {
                  const copy = [...details.instructions];
                  copy[idx] = e.target.value;
                  onDetailsChange({ ...details, instructions: copy });
                }}
                className="flex-1 bg-transparent text-slate-200 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => handleDeleteInstruction(idx)}
                className="text-slate-400 hover:text-red-400 p-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}

          <div className="flex items-center space-x-2 mt-2">
            <input
              type="text"
              value={newInstruction}
              onChange={(e) => setNewInstruction(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddInstruction()}
              placeholder="Add candidate instruction..."
              className="flex-1 px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
            <button
              type="button"
              onClick={handleAddInstruction}
              className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold"
            >
              Add
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Action */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-800">
        <div className="text-xs text-slate-400">
          Degree: {details.degreeProgram} | Total: {calculatedTotalMarks} Marks
        </div>
        <button
          onClick={onNext}
          className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 transition transform hover:scale-[1.02] active:scale-[0.98]"
        >
          <span>Continue to Step 2: B.Sc. Syllabus</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
