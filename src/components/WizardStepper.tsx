import React from 'react';
import { Sliders, BookOpen, GraduationCap, CheckCircle2, ChevronRight } from 'lucide-react';

interface WizardStepperProps {
  currentStep: number;
  onStepChange: (step: number) => void;
  canNavigateToStep: (step: number) => boolean;
}

export const WizardStepper: React.FC<WizardStepperProps> = ({
  currentStep,
  onStepChange,
  canNavigateToStep
}) => {
  const steps = [
    {
      id: 1,
      name: '1. Degree & Exam Format',
      subtitle: 'Course, Semester & Marks',
      icon: Sliders
    },
    {
      id: 2,
      name: '2. B.Sc. Syllabus & Units',
      subtitle: 'Modules, Topics & Derivations',
      icon: BookOpen
    },
    {
      id: 3,
      name: '3. University Question Paper',
      subtitle: 'Paper, Model Solutions & Export',
      icon: GraduationCap
    }
  ];

  return (
    <div className="no-print w-full bg-slate-900/60 backdrop-blur border-b border-slate-800/80 px-4 py-3.5">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isCurrent = currentStep === step.id;
            const isCompleted = currentStep > step.id;
            const isClickable = canNavigateToStep(step.id);

            return (
              <button
                key={step.id}
                onClick={() => isClickable && onStepChange(step.id)}
                disabled={!isClickable}
                className={`relative flex items-center p-3 rounded-xl border text-left transition-all ${
                  isCurrent
                    ? 'bg-gradient-to-r from-indigo-950/80 to-slate-900 border-indigo-500/50 shadow-md shadow-indigo-900/20 ring-1 ring-indigo-500/30'
                    : isCompleted
                    ? 'bg-slate-900/50 border-emerald-500/30 text-slate-300'
                    : 'bg-slate-900/20 border-slate-800 opacity-60 cursor-not-allowed text-slate-400'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs mr-3 shrink-0 transition-colors ${
                    isCurrent
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/40'
                      : isCompleted
                      ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {isCompleted ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Icon className="w-4 h-4" />}
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className={`text-xs sm:text-sm font-bold truncate ${isCurrent ? 'text-white' : 'text-slate-200'}`}>
                    {step.name}
                  </h4>
                  <p className="text-[11px] text-slate-400 truncate">{step.subtitle}</p>
                </div>

                {idx < steps.length - 1 && (
                  <ChevronRight className="hidden sm:block w-3.5 h-3.5 text-slate-600 ml-1 shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
