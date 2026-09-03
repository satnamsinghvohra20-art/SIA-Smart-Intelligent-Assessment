export type Difficulty = 'easy' | 'medium' | 'hard' | 'mixed';

export type QuestionType = 
  | 'short' 
  | 'long' 
  | 'derivation_proof' 
  | 'numerical' 
  | 'mcq';

export interface QuestionOption {
  id: string; // 'A', 'B', 'C', 'D'
  text: string;
}

export interface Question {
  id: string;
  number: number;
  text: string;
  marks: number;
  type: QuestionType;
  difficulty: Difficulty;
  topic?: string;
  options?: QuestionOption[]; // for MCQ
  answer?: string; // model solution summary
  solution?: string; // step-by-step mathematical derivation / proof / explanation
}

export interface QuestionTypeConfig {
  type: QuestionType;
  label: string;
  description: string;
  enabled: boolean;
  count: number;
  marksPerQuestion: number;
}

export interface PaperDetails {
  collegeName: string; // e.g. "Department of Science & Technology / University Faculty of Physical Sciences"
  examTitle: string; // e.g. "B.Sc. Semester-V Degree Examination"
  degreeProgram: string; // e.g. "B.Sc. Computer Science", "B.Sc. Physics", "B.Sc. Mathematics", "B.Sc. Chemistry"
  courseCode: string; // e.g. "CS-501", "PHY-302", "MATH-401"
  courseTitle: string; // e.g. "Data Structures & Algorithms", "Quantum Mechanics"
  semester: string; // e.g. "Semester V", "Semester III", "Year 2"
  duration: string; // e.g. "3 Hours", "2 Hours"
  totalMarks: number; // e.g. 75, 100, 50
  instructions: string[];
  difficulty: Difficulty;
}

export interface QuestionPaper {
  id: string;
  createdAt: string;
  details: PaperDetails;
  syllabus: string;
  questionConfigs: QuestionTypeConfig[];
  questions: Question[];
  totalMarks: number;
}

export interface SavedPaper {
  id: string;
  title: string;
  degreeProgram: string;
  courseTitle: string;
  semester: string;
  totalMarks: number;
  createdAt: string;
  paper: QuestionPaper;
}
