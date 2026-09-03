import { PaperDetails, QuestionTypeConfig, QuestionPaper, Question } from '../types/paper';
import { generateQuestionPaper } from './paperGenerator';

const GEMINI_API_KEY_STORAGE_KEY = 'papercraft_gemini_api_key';

export function getStoredApiKey(): string {
  return localStorage.getItem(GEMINI_API_KEY_STORAGE_KEY) || '';
}

export function saveStoredApiKey(key: string): void {
  localStorage.setItem(GEMINI_API_KEY_STORAGE_KEY, key.trim());
}

export function removeStoredApiKey(): void {
  localStorage.removeItem(GEMINI_API_KEY_STORAGE_KEY);
}

export async function generatePaperWithGeminiAI(
  apiKey: string,
  details: PaperDetails,
  syllabus: string,
  questionConfigs: QuestionTypeConfig[]
): Promise<QuestionPaper> {
  if (!apiKey) {
    return generateQuestionPaper(details, syllabus, questionConfigs);
  }

  const enabledConfigs = questionConfigs.filter(c => c.enabled && c.count > 0);

  const prompt = `
You are a distinguished University Professor and Chief Examiner for Bachelor of Science (B.Sc. / B.Sc. Hons) Degree Examinations.
Generate an authentic, academically rigorous University Question Paper and Model Answer Key for undergraduate B.Sc. students based on the following syllabus:

UNIVERSITY EXAM SPECIFICATIONS:
- University/College Department: ${details.collegeName}
- Degree Program: ${details.degreeProgram}
- Course Code & Title: ${details.courseCode} - ${details.courseTitle}
- Semester / Year: ${details.semester}
- Examination Title: ${details.examTitle}
- Time Allowed: ${details.duration}
- Difficulty Level: ${details.difficulty}

UNDERGRADUATE SYLLABUS / COURSE OUTLINE:
${syllabus}

QUESTION SPECIFICATIONS:
${enabledConfigs.map(c => `- ${c.count} x ${c.label} (${c.marksPerQuestion} Marks each, type: ${c.type})`).join('\n')}

ACADEMIC REQUIREMENTS:
1. Ensure all questions are strictly appropriate for undergraduate B.Sc. degree standards (include proper mathematical notations, rigorous derivations, algorithmic proofs, chemical mechanisms, or theoretical models as appropriate for the subject).
2. For Derivations & Long questions, write clear multi-part prompts (e.g. (a) Define/state..., (b) Derive/prove..., (c) Discuss applications...).
3. Provide rigorous, detailed step-by-step model solutions and marking distribution points for every question.

Return ONLY a valid JSON object matching this schema with NO markdown code blocks:
{
  "questions": [
    {
      "number": 1,
      "text": "Question text...",
      "marks": 5,
      "type": "derivation_proof",
      "difficulty": "hard",
      "topic": "Topic Name",
      "options": [],
      "answer": "Summary model solution...",
      "solution": "1. Step 1 breakdown (2 Marks)\n2. Step 2 derivation (3 Marks)"
    }
  ]
}
`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.3,
            responseMimeType: 'application/json'
          }
        })
      }
    );

    if (!response.ok) {
      return generateQuestionPaper(details, syllabus, questionConfigs);
    }

    const data = await response.json();
    const rawJson = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawJson) {
      throw new Error('Empty AI response');
    }

    const parsed = JSON.parse(rawJson);
    const questions: Question[] = (parsed.questions || []).map((q: any, idx: number) => ({
      id: `bsc-q-ai-${idx + 1}`,
      number: idx + 1,
      text: q.text || `Question ${idx + 1}`,
      marks: q.marks || 5,
      type: q.type || 'short',
      difficulty: q.difficulty || details.difficulty,
      topic: q.topic || details.courseTitle,
      options: q.options || undefined,
      answer: q.answer || '',
      solution: q.solution || ''
    }));

    const totalMarks = questions.reduce((acc, q) => acc + q.marks, 0);

    return {
      id: `bsc-paper-ai-${Date.now()}`,
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
  } catch (err) {
    console.error('AI generation fallback:', err);
    return generateQuestionPaper(details, syllabus, questionConfigs);
  }
}
