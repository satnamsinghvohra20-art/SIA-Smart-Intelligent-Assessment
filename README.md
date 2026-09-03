# 🎓 SIA — Smart Intelligent Assessment & B.Sc. Question Paper Studio

> A modern, web application engineered for undergraduate university professors, examiners, and B.Sc. science students to structure, configure, and generate examination question papers and model answer keys with ease.

---

## 🚀 Key Highlights & 3-Step Flow

1. **Step 1: Degree & Exam Format**
   - Configure College Department, Degree Program (B.Sc. Computer Science, Physics, Mathematics, Chemistry, Biotechnology, Electronics, Statistics, etc.), Course Code, Course Title, and Semester (Semester I - VI).
   - Configure undergraduate question allocations: Short Conceptual Questions, Mathematical Derivations & Algorithmic Proofs, Long Analytical / Unit-wise Essays, and Numerical Problem Solving.

2. **Step 2: B.Sc. Syllabus & Units**
   - 1-click insert preloaded curriculum units and modules for major B.Sc. science disciplines.
   - Paste custom university syllabus descriptions, course outcomes, or upload lecture notes (`.txt`/`.md`).

3. **Step 3: University Question Paper & Model Answer Key**
   - Authentic printable A4 examination layout with College Department header, Degree & Semester title, Student Roll Number box `Roll No.: [ ____________ ]`, and right-aligned marks.
   - Comprehensive model solution and step-by-step marking rubrics for examiners.
   - In-place question editing, single-question swapping, and reordering.
   - Multi-format Export: **Print / PDF**, **Word (.docx)**, **Clipboard Markdown**, and **Local Library Storage**.

---

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + Custom Academic Typography + Lucide Icons
- **Export Engines**: `docx`, `file-saver`, Browser Print `@media print`
- **AI / Synthesis**: Built-in Offline Curriculum Engine + Optional Google Gemini AI API integration

---

## 💻 Local Development Setup

```bash
# 1. Clone the repository
git clone https://github.com/satnamsinghvohra20-art/SIA-Smart-Intelligent-Assessment.git
cd SIA-Smart-Intelligent-Assessment

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Production Build

```bash
npm run build
```
