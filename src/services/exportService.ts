import { Document, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell, WidthType, AlignmentType, BorderStyle, Packer } from 'docx';
import { saveAs } from 'file-saver';
import { QuestionPaper, SavedPaper } from '../types/paper';

const SAVED_PAPERS_STORAGE_KEY = 'papercraft_bsc_saved_papers_v1';

export function getSavedPapers(): SavedPaper[] {
  try {
    const raw = localStorage.getItem(SAVED_PAPERS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function savePaperToLibrary(paper: QuestionPaper): SavedPaper {
  const list = getSavedPapers();
  const newSaved: SavedPaper = {
    id: paper.id,
    title: paper.details.examTitle,
    degreeProgram: paper.details.degreeProgram,
    courseTitle: paper.details.courseTitle,
    semester: paper.details.semester,
    totalMarks: paper.totalMarks || paper.details.totalMarks,
    createdAt: new Date().toISOString(),
    paper
  };

  const filtered = list.filter(p => p.id !== paper.id);
  const updated = [newSaved, ...filtered];
  localStorage.setItem(SAVED_PAPERS_STORAGE_KEY, JSON.stringify(updated));
  return newSaved;
}

export function deleteSavedPaper(id: string): void {
  const list = getSavedPapers();
  const updated = list.filter(p => p.id !== id);
  localStorage.setItem(SAVED_PAPERS_STORAGE_KEY, JSON.stringify(updated));
}

// B.Sc. DOCX Export
export async function exportPaperToDocx(paper: QuestionPaper, includeSolutions: boolean = false): Promise<void> {
  const { details, questions } = paper;
  const docChildren: any[] = [];

  // University / College Department
  if (details.collegeName) {
    docChildren.push(
      new Paragraph({
        text: details.collegeName.toUpperCase(),
        heading: HeadingLevel.HEADING_2,
        alignment: AlignmentType.CENTER,
        spacing: { after: 80 }
      })
    );
  }

  // Degree & Examination Title
  docChildren.push(
    new Paragraph({
      text: `${details.degreeProgram} — ${details.semester} Examination`.toUpperCase(),
      heading: HeadingLevel.HEADING_1,
      alignment: AlignmentType.CENTER,
      spacing: { after: 120 }
    })
  );

  // Metadata Table
  const metaTable = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({ text: 'Paper / Course: ', bold: true }),
                  new TextRun({ text: `${details.courseCode} — ${details.courseTitle}` })
                ]
              })
            ],
            borders: {
              top: { style: BorderStyle.SINGLE, size: 1 },
              bottom: { style: BorderStyle.SINGLE, size: 1 },
              left: { style: BorderStyle.NONE },
              right: { style: BorderStyle.NONE }
            }
          }),
          new TableCell({
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [
                  new TextRun({ text: 'Roll No.: [ _____________________ ]', bold: true })
                ]
              })
            ],
            borders: {
              top: { style: BorderStyle.SINGLE, size: 1 },
              bottom: { style: BorderStyle.SINGLE, size: 1 },
              left: { style: BorderStyle.NONE },
              right: { style: BorderStyle.NONE }
            }
          })
        ]
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({ text: 'Time Allowed: ', bold: true }),
                  new TextRun({ text: details.duration })
                ]
              })
            ],
            borders: {
              top: { style: BorderStyle.NONE },
              bottom: { style: BorderStyle.SINGLE, size: 1 },
              left: { style: BorderStyle.NONE },
              right: { style: BorderStyle.NONE }
            }
          }),
          new TableCell({
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [
                  new TextRun({ text: 'Maximum Marks: ', bold: true }),
                  new TextRun({ text: `${paper.totalMarks || details.totalMarks}` })
                ]
              })
            ],
            borders: {
              top: { style: BorderStyle.NONE },
              bottom: { style: BorderStyle.SINGLE, size: 1 },
              left: { style: BorderStyle.NONE },
              right: { style: BorderStyle.NONE }
            }
          })
        ]
      })
    ]
  });

  docChildren.push(metaTable);
  docChildren.push(new Paragraph({ text: '', spacing: { after: 180 } }));

  // Instructions
  if (details.instructions && details.instructions.length > 0) {
    docChildren.push(
      new Paragraph({
        children: [new TextRun({ text: 'Instructions for Candidates:', bold: true, underline: {} })],
        spacing: { after: 60 }
      })
    );

    details.instructions.forEach((inst, idx) => {
      docChildren.push(
        new Paragraph({
          children: [
            new TextRun({ text: `(${idx + 1}) `, bold: true }),
            new TextRun({ text: inst })
          ],
          spacing: { after: 40 }
        })
      );
    });

    docChildren.push(new Paragraph({ text: '', spacing: { after: 200 } }));
  }

  // Questions
  questions.forEach((q) => {
    docChildren.push(
      new Paragraph({
        children: [
          new TextRun({ text: `Q${q.number}.  `, bold: true }),
          new TextRun({ text: q.text }),
          new TextRun({ text: `   [${q.marks} Marks]`, bold: true })
        ],
        spacing: { before: 120, after: 60 }
      })
    );

    if (q.options && q.options.length > 0) {
      q.options.forEach((opt) => {
        docChildren.push(
          new Paragraph({
            indent: { left: 400 },
            children: [
              new TextRun({ text: `[${opt.id}]  `, bold: true }),
              new TextRun({ text: opt.text })
            ],
            spacing: { after: 30 }
          })
        );
      });
    }
  });

  // Solutions
  if (includeSolutions) {
    docChildren.push(
      new Paragraph({
        pageBreakBefore: true,
        alignment: AlignmentType.CENTER,
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun({ text: 'UNIVERSITY MODEL ANSWER KEY & SOLUTIONS', bold: true })],
        spacing: { after: 180 }
      })
    );

    questions.forEach((q) => {
      docChildren.push(
        new Paragraph({
          children: [
            new TextRun({ text: `Q${q.number} Model Solution: `, bold: true }),
            new TextRun({ text: q.answer ? q.answer : '' })
          ],
          spacing: { before: 80, after: 30 }
        })
      );

      if (q.solution) {
        docChildren.push(
          new Paragraph({
            indent: { left: 300 },
            children: [new TextRun({ text: q.solution })],
            spacing: { after: 40 }
          })
        );
      }
    });
  }

  const doc = new Document({
    sections: [{ properties: {}, children: docChildren }]
  });

  const blob = await Packer.toBlob(doc);
  const cleanName = `${details.degreeProgram}_${details.courseCode}_Question_Paper.docx`.replace(/[^a-zA-Z0-9._]/g, '_');
  saveAs(blob, cleanName);
}

export function formatPaperAsMarkdown(paper: QuestionPaper): string {
  const { details, questions } = paper;
  let md = `# ${details.collegeName || 'FACULTY OF SCIENCE'}\n`;
  md += `## ${details.degreeProgram} — ${details.semester} EXAMINATION\n\n`;
  md += `**Course:** ${details.courseCode}: ${details.courseTitle}\n`;
  md += `**Time Allowed:** ${details.duration} | **Maximum Marks:** ${paper.totalMarks || details.totalMarks}\n\n`;
  md += `---\n\n### Instructions:\n`;
  details.instructions.forEach((inst, i) => {
    md += `${i + 1}. ${inst}\n`;
  });
  md += `\n---\n\n### Questions:\n\n`;

  questions.forEach((q) => {
    md += `**Q${q.number}.** ${q.text} **[${q.marks} Marks]**\n`;
    if (q.options) {
      q.options.forEach(opt => {
        md += `   (${opt.id}) ${opt.text}\n`;
      });
    }
    md += `\n`;
  });

  return md;
}
