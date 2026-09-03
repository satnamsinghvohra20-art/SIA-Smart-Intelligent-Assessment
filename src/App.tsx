import React, { useState, useEffect } from 'react';
import { 
  PaperDetails, 
  QuestionTypeConfig, 
  QuestionPaper, 
  SavedPaper 
} from './types/paper';
import { Header } from './components/Header';
import { WizardStepper } from './components/WizardStepper';
import { Step1Blueprint } from './components/Step1Blueprint';
import { Step2Syllabus } from './components/Step2Syllabus';
import { Step3PaperStudio } from './components/Step3PaperStudio';
import { SavedPapersModal } from './components/SavedPapersModal';
import { ApiKeyModal } from './components/ApiKeyModal';
import { generateQuestionPaper } from './services/paperGenerator';
import { generatePaperWithGeminiAI, getStoredApiKey } from './services/geminiService';
import { getSavedPapers, deleteSavedPaper } from './services/exportService';

export function App() {
  const [currentStep, setCurrentStep] = useState<number>(1);

  // B.Sc. Paper Details
  const [details, setDetails] = useState<PaperDetails>({
    collegeName: 'Faculty of Mathematical & Physical Sciences / Department of Computer Science',
    examTitle: 'B.Sc. (Hons) Semester End Degree Examination 2026',
    degreeProgram: 'B.Sc. Computer Science',
    courseCode: 'CS-501',
    courseTitle: 'Data Structures & Algorithms',
    semester: 'Semester V',
    duration: '3 Hours',
    totalMarks: 75,
    difficulty: 'medium',
    instructions: [
      'Attempt all questions as specified. Figures in square brackets indicate maximum marks.',
      'Assume suitable parameters/data wherever necessary and state assumptions clearly.',
      'Standard scientific non-programmable calculators are permitted.'
    ]
  });

  // B.Sc. Question Type Configuration
  const [questionConfigs, setQuestionConfigs] = useState<QuestionTypeConfig[]>([
    {
      type: 'short',
      label: 'Short Conceptual & Definition Questions',
      description: 'Definitions, time-complexities, properties, brief explanations (3 Marks)',
      enabled: true,
      count: 5,
      marksPerQuestion: 3
    },
    {
      type: 'derivation_proof',
      label: 'Mathematical Derivations & Algorithmic Proofs',
      description: 'Theorems, derivations from first principles, correctness proofs (8 Marks)',
      enabled: true,
      count: 3,
      marksPerQuestion: 8
    },
    {
      type: 'long',
      label: 'Long Descriptive, Unit-Wise & Essay Questions',
      description: 'In-depth analytical formulations, architecture, code traces (12 Marks)',
      enabled: true,
      count: 3,
      marksPerQuestion: 12
    },
    {
      type: 'numerical',
      label: 'Numerical Problem Solving & Trace Analysis',
      description: 'Mathematical problem solving, numerical simulations (6 Marks)',
      enabled: false,
      count: 3,
      marksPerQuestion: 6
    },
    {
      type: 'mcq',
      label: 'Objective / Multiple Choice Questions',
      description: 'Conceptual screening / university entrance format (1 Mark)',
      enabled: false,
      count: 10,
      marksPerQuestion: 1
    }
  ]);

  // B.Sc. Syllabus Outline
  const [syllabus, setSyllabus] = useState<string>(
    '• Unit 1: Asymptotic Analysis, Recurrence Relations & Divide-and-Conquer Algorithms\n• Unit 2: Advanced Data Structures: Red-Black Trees, AVL Trees, B-Trees & Disjoint Sets\n• Unit 3: Dynamic Programming (Matrix Chain Multiplication, Longest Common Subsequence) & Greedy Algorithms\n• Unit 4: Graph Algorithms: Minimum Spanning Trees (Kruskal/Prim), Shortest Paths (Dijkstra/Bellman-Ford)\n• Unit 5: NP-Completeness, P vs NP, Reduction Techniques & Approximation Algorithms'
  );

  const [generatedPaper, setGeneratedPaper] = useState<QuestionPaper | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Modals
  const [isSavedPapersOpen, setIsSavedPapersOpen] = useState(false);
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(false);
  const [savedPapers, setSavedPapers] = useState<SavedPaper[]>([]);

  useEffect(() => {
    setHasApiKey(!!getStoredApiKey());
    setSavedPapers(getSavedPapers());
  }, []);

  const refreshSavedPapers = () => {
    setSavedPapers(getSavedPapers());
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    const apiKey = getStoredApiKey();

    try {
      let paper: QuestionPaper;
      if (apiKey) {
        paper = await generatePaperWithGeminiAI(
          apiKey,
          details,
          syllabus,
          questionConfigs
        );
      } else {
        paper = generateQuestionPaper(
          details,
          syllabus,
          questionConfigs
        );
      }

      setGeneratedPaper(paper);
      setCurrentStep(3);
    } catch (err) {
      console.error('Generation error:', err);
      const fallback = generateQuestionPaper(
        details,
        syllabus,
        questionConfigs
      );
      setGeneratedPaper(fallback);
      setCurrentStep(3);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleResetNewPaper = () => {
    setCurrentStep(1);
    setGeneratedPaper(null);
  };

  const handleLoadSavedPaper = (saved: SavedPaper) => {
    setDetails(saved.paper.details);
    setSyllabus(saved.paper.syllabus || '');
    if (saved.paper.questionConfigs) {
      setQuestionConfigs(saved.paper.questionConfigs);
    }
    setGeneratedPaper(saved.paper);
    setCurrentStep(3);
  };

  const handleDeleteSavedPaper = (id: string) => {
    deleteSavedPaper(id);
    refreshSavedPapers();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Header */}
      <Header
        onOpenSavedPapers={() => {
          refreshSavedPapers();
          setIsSavedPapersOpen(true);
        }}
        onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
        onResetNewPaper={handleResetNewPaper}
        hasApiKey={hasApiKey}
        savedPapersCount={savedPapers.length}
      />

      {/* 3 Step Stepper */}
      <WizardStepper
        currentStep={currentStep}
        onStepChange={(step) => setCurrentStep(step)}
        canNavigateToStep={(step) => {
          if (step === 3) return !!generatedPaper;
          return true;
        }}
      />

      {/* Main Wizard Views */}
      <main className="flex-1 w-full p-4 sm:p-6">
        {currentStep === 1 && (
          <Step1Blueprint
            details={details}
            onDetailsChange={setDetails}
            questionConfigs={questionConfigs}
            onQuestionConfigsChange={setQuestionConfigs}
            onNext={() => setCurrentStep(2)}
          />
        )}

        {currentStep === 2 && (
          <Step2Syllabus
            details={details}
            syllabus={syllabus}
            onSyllabusChange={setSyllabus}
            questionConfigs={questionConfigs}
            onBack={() => setCurrentStep(1)}
            onGenerate={handleGenerate}
            isGenerating={isGenerating}
            hasApiKey={hasApiKey}
          />
        )}

        {currentStep === 3 && generatedPaper && (
          <Step3PaperStudio
            paper={generatedPaper}
            onPaperChange={setGeneratedPaper}
            onBackToSyllabus={() => setCurrentStep(2)}
            onRegenerateAll={handleGenerate}
            onSavedPaperAdded={refreshSavedPapers}
          />
        )}
      </main>

      {/* Saved Papers Modal */}
      <SavedPapersModal
        isOpen={isSavedPapersOpen}
        onClose={() => setIsSavedPapersOpen(false)}
        savedPapers={savedPapers}
        onLoadPaper={handleLoadSavedPaper}
        onDeletePaper={handleDeleteSavedPaper}
      />

      {/* API Key Modal */}
      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        onApiKeySaved={(hasKey) => setHasApiKey(hasKey)}
      />
    </div>
  );
}

export default App;
