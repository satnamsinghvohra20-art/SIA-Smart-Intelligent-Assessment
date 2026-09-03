import { 
  PaperDetails, 
  QuestionTypeConfig, 
  QuestionPaper, 
  Question, 
  Difficulty, 
  QuestionType 
} from '../types/paper';

export const generateId = () => Math.random().toString(36).substring(2, 9);

function parseTopicsFromSyllabus(syllabusText: string, fallbackSubject: string): string[] {
  if (!syllabusText || !syllabusText.trim()) {
    return [
      `Foundational theoretical principles of ${fallbackSubject}`,
      `Mathematical modeling and derivations in ${fallbackSubject}`,
      `Analytical algorithms and experimental frameworks in ${fallbackSubject}`
    ];
  }

  const lines = syllabusText
    .split(/[\n,;•\-]+/)
    .map(t => t.trim())
    .filter(t => t.length > 2);

  return lines.length > 0 ? lines : [syllabusText.trim()];
}

// B.Sc. University Level Question Synthesis
function createBscQuestion(
  type: QuestionType,
  topic: string,
  details: PaperDetails,
  marks: number,
  difficulty: Difficulty,
  number: number
): Question {
  const cleanTopic = topic || details.courseTitle || 'Core Domain Concept';
  const id = `bsc-q-${generateId()}`;
  const subject = details.degreeProgram || details.courseTitle || 'B.Sc. Science';

  if (type === 'mcq') {
    return {
      id,
      number,
      type: 'mcq',
      marks,
      difficulty,
      topic: cleanTopic,
      text: `In the theoretical framework of ${cleanTopic} (${details.courseTitle}), which of the following boundary conditions holds true?`,
      options: [
        { id: 'A', text: `The governing state function satisfies orthogonality and normalization across the Hilbert/solution space.` },
        { id: 'B', text: `The differential eigenvalue vanishes identically for all non-trivial eigenmodes.` },
        { id: 'C', text: `The system exhibits non-conservative asymptotic divergence under steady-state equilibrium.` },
        { id: 'D', text: `The response parameter remains independent of the characteristic Hamiltonian/matrix spectrum.` }
      ],
      answer: 'A',
      solution: `Option (A) is correct. In ${details.courseTitle}, ${cleanTopic} requires standard boundary compliance and unitary normalization in undergraduate formulations.`
    };
  }

  if (type === 'derivation_proof') {
    return {
      id,
      number,
      type: 'derivation_proof',
      marks,
      difficulty: 'hard',
      topic: cleanTopic,
      text: `(a) State the fundamental theorem / postulates governing ${cleanTopic}.\n(b) From first principles, derive the governing mathematical expression / differential equation for ${cleanTopic}.\n(c) Discuss the physical / computational significance of the boundary conditions and limiting cases.`,
      answer: `Rigorous mathematical proof/derivation from first principles including statement of postulates, step-by-step intermediate formulations, and boundary condition evaluation.`,
      solution: `1. Statement of theorem/postulates and initial coordinate/state setup (2 Marks)\n2. Step-by-step algebraic/calculus derivation of intermediate expressions (3 Marks)\n3. Final mathematical formulation and physical/computational interpretation (2 Marks)\n4. Boundary conditions & limiting cases analysis (1 Mark)`
    };
  }

  if (type === 'short') {
    return {
      id,
      number,
      type: 'short',
      marks,
      difficulty,
      topic: cleanTopic,
      text: `(a) Define ${cleanTopic} in the context of ${details.courseTitle}.\n(b) State its key mathematical/algorithmic properties and write the corresponding governing equation.`,
      answer: `Precise B.Sc. level technical definition, key properties, and standard formula/mechanism for ${cleanTopic}.`,
      solution: `1. Precise technical definition and conceptual foundation (${marks >= 3 ? '1.5' : '1'} Marks)\n2. Stating core properties, formula/mechanism, and diagram/notation (${marks >= 3 ? '1.5' : '1'} Marks)`
    };
  }

  if (type === 'numerical') {
    return {
      id,
      number,
      type: 'numerical',
      marks,
      difficulty: 'medium',
      topic: cleanTopic,
      text: `A physical/computational system operating under ${cleanTopic} has initial parameters: Parameter A = 4.5 × 10³ SI units, Parameter B = 0.25 units. Calculate:\n(i) The resultant eigenstate / equilibrium response.\n(ii) The percentage change in output if Parameter B increases by 20%.\nShow all mathematical calculation steps clearly.`,
      answer: `Analytical calculation with substitution into standard formula, intermediate value calculation, and final result with proper SI units.`,
      solution: `1. Stating appropriate governing formula & identifying given values (1.5 Marks)\n2. Part (i) Step-by-step numerical computation and correct SI units (2 Marks)\n3. Part (ii) Sensitivity/Percentage change calculation (1.5 Marks)`
    };
  }

  // Long / Essay / Analytical
  return {
    id,
    number,
    type: 'long',
    marks,
    difficulty: 'hard',
    topic: cleanTopic,
    text: `(a) Give a comprehensive analytical treatment of ${cleanTopic} in ${details.courseTitle}.\n(b) With the aid of suitable schematic diagrams / mathematical formulations, describe its experimental or algorithmic implementation.\n(c) Critically compare ${cleanTopic} with related classical or contemporary methodologies, highlighting two merits and two limitations.`,
    answer: `In-depth university degree essay covering theoretical foundations, schematic/mathematical framework, working mechanism, and critical comparative analysis.`,
    solution: `1. Part (a): Comprehensive theoretical principles and foundations (3 Marks)\n2. Part (b): Working mechanism with neat labeled schematic diagram / algorithmic trace (4 Marks)\n3. Part (c): Comparative analysis, merits, and limitations (3 Marks)`
  };
}

// Generate full B.Sc. question paper
export function generateQuestionPaper(
  details: PaperDetails,
  syllabus: string,
  questionConfigs: QuestionTypeConfig[]
): QuestionPaper {
  const topics = parseTopicsFromSyllabus(syllabus, details.courseTitle);
  const questions: Question[] = [];
  let currentNumber = 1;

  const enabledConfigs = questionConfigs.filter(c => c.enabled && c.count > 0);

  enabledConfigs.forEach((config) => {
    for (let i = 0; i < config.count; i++) {
      const topicIndex = (currentNumber - 1) % topics.length;
      const chosenTopic = topics[topicIndex] || details.courseTitle;

      let qDiff: Difficulty = details.difficulty;
      if (details.difficulty === 'mixed') {
        const diffs: Difficulty[] = ['easy', 'medium', 'hard'];
        qDiff = diffs[currentNumber % 3];
      }

      const q = createBscQuestion(
        config.type,
        chosenTopic,
        details,
        config.marksPerQuestion,
        qDiff,
        currentNumber
      );

      questions.push(q);
      currentNumber++;
    }
  });

  const totalMarks = questions.reduce((acc, q) => acc + q.marks, 0);

  return {
    id: `bsc-paper-${Date.now()}`,
    createdAt: new Date().toISOString(),
    details: {
      ...details,
      totalMarks: totalMarks || details.totalMarks
    },
    syllabus,
    questionConfigs,
    questions,
    totalMarks: totalMarks || details.totalMarks
  };
}
