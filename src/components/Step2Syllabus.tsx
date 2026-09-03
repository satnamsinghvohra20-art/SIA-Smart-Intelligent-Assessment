import React from 'react';
import { PaperDetails, QuestionTypeConfig } from '../types/paper';
import { 
  BookOpen, 
  ArrowLeft, 
  ArrowRight, 
  Wand2, 
  Sparkles, 
  UploadCloud, 
  Plus, 
  Check,
  GraduationCap 
} from 'lucide-react';

interface Step2SyllabusProps {
  details: PaperDetails;
  syllabus: string;
  onSyllabusChange: (text: string) => void;
  questionConfigs: QuestionTypeConfig[];
  onBack: () => void;
  onGenerate: () => void;
  isGenerating: boolean;
  hasApiKey: boolean;
}

export const Step2Syllabus: React.FC<Step2SyllabusProps> = ({
  details,
  syllabus,
  onSyllabusChange,
  questionConfigs,
  onBack,
  onGenerate,
  isGenerating,
  hasApiKey
}) => {
  // Comprehensive B.Sc. Degree Subject Topic Catalogs
  const bscTopicCatalogs: Record<string, string[]> = {
    'B.Sc. Computer Science': [
      'Data Structures: Linked Lists, Stacks, Queues, Binary Search Trees, Graphs & AVL Trees',
      'Algorithms: Divide & Conquer, Dynamic Programming, Greedy Methods, Graph Traversal (BFS/DFS), Asymptotic Complexity',
      'Operating Systems: Process Synchronization, Semaphores, CPU Scheduling, Deadlock Avoidance, Virtual Memory & Paging',
      'Database Management Systems: Relational Algebra, SQL Queries, Normalization (1NF to BCNF), Transaction ACID Properties',
      'Object-Oriented Programming: Inheritance, Polymorphism, Virtual Functions, Templates & Exception Handling in C++/Java',
      'Theory of Computation: Finite Automata (DFA/NFA), Regular Expressions, Context-Free Grammars & Turing Machines',
      'Computer Networks: OSI & TCP/IP Model, Flow & Error Control, IP Addressing, Routing Algorithms & Network Security'
    ],
    'B.Sc. Information Technology': [
      'Web Technologies: HTML5, CSS3, JavaScript ES6+, DOM Manipulation, REST APIs & Responsive Frameworks',
      'Cloud Computing & Virtualization: Hypervisors, IaaS/PaaS/SaaS, AWS/Azure Core Architecture & Containerization (Docker)',
      'Information Security & Cryptography: Symmetric/Asymmetric Ciphers, RSA, AES, Hash Functions, Digital Signatures & Firewalls',
      'Mobile Application Development: Android/iOS App Lifecycle, Intents, UI Components, SQLite & State Management',
      'Software Engineering: Agile Methodologies, SDLC, UML Modeling, Software Testing & Quality Assurance'
    ],
    'B.Sc. Data Science & Analytics': [
      'Statistical Computing & Probability: Random Variables, Probability Distributions, Sampling Theory & Hypothesis Testing (t-test/ANOVA)',
      'Machine Learning: Linear/Logistic Regression, Decision Trees, Random Forests, SVM, k-Means Clustering & PCA',
      'Big Data Technologies: Hadoop HDFS, MapReduce, Apache Spark, PySpark RDDs & Distributed Data Processing',
      'Data Mining & Feature Engineering: Outlier Detection, Imputation, Dimensionality Reduction & Association Rule Mining (Apriori)',
      'Data Visualization & Business Intelligence: Exploratory Data Analysis, Tableau, Power BI & Seaborn/Matplotlib Storytelling'
    ],
    'B.Sc. Artificial Intelligence & ML': [
      'Deep Learning & Neural Networks: Perceptrons, Multi-Layer Perceptrons, Backpropagation, CNNs & Recurrent Neural Networks (RNN/LSTM)',
      'Natural Language Processing: Tokenization, TF-IDF, Word Embeddings (Word2Vec), Transformers & Attention Mechanisms',
      'Reinforcement Learning: Markov Decision Processes, Bellman Equation, Q-Learning & Policy Gradients',
      'Computer Vision: Image Filtering, Edge Detection, Object Detection (YOLO), Image Segmentation & Feature Extraction'
    ],
    'B.Sc. Cyber Security & Forensics': [
      'Network Security: Intrusion Detection Systems (IDS/IPS), Packet Sniffing (Wireshark), VPNs & SSL/TLS Protocol Analysis',
      'Ethical Hacking & Penetration Testing: Vulnerability Scanning, OWASP Top 10, SQL Injection, XSS & Metasploit Framework',
      'Digital Forensics: Evidence Acquisition, Disk Imaging, Memory Forensics, File System Artifacts & Chain of Custody'
    ],
    'B.Sc. Physics': [
      'Quantum Mechanics: Wave-particle duality, Schrödinger Wave Equation, Particle in a 1D Box, Harmonic Oscillator & Hydrogen Atom',
      'Electrodynamics & Wave Optics: Maxwell Equations, Electromagnetic Wave Propagation, Interference, Diffraction & Polarization',
      'Thermodynamics & Statistical Physics: Laws of Thermodynamics, Carnot Engine, Maxwell-Boltzmann, Bose-Einstein & Fermi-Dirac Statistics',
      'Classical Mechanics: Lagrangian and Hamiltonian Formulations, Central Force Motion, Rigid Body Dynamics & Special Relativity',
      'Solid State Physics: Crystal Structures, X-ray Diffraction (Bragg Law), Free Electron Theory, Band Theory & Superconductivity',
      'Nuclear Physics: Nuclear Binding Energy, Liquid Drop Model, Shell Model, Radioactive Decay Laws & Particle Accelerators'
    ],
    'B.Sc. Applied Physics': [
      'Semiconductor Devices: PN Junction Diodes, BJT, MOSFET, Optoelectronic Devices (LEDs, Solar Cells & Laser Diodes)',
      'Fiber Optics & Photonics: Total Internal Reflection, Numerical Aperture, Optical Fibers, Dispersion, Attenuation & Waveguides',
      'Vacuum & Thin Film Technology: Thermal Evaporation, Sputtering, Chemical Vapor Deposition (CVD) & Thickness Characterization'
    ],
    'B.Sc. Electronics': [
      'Digital Electronics: Boolean Algebra, Karnaugh Maps, Combinational Logic (Multiplexers/Decoders) & Sequential Logic (Flip-Flops, Counters)',
      'Microprocessors & Microcontrollers: 8085/8086 Architecture, Instruction Set, Memory Interfacing & Embedded C Programming',
      'Signals & Systems: Continuous/Discrete Signals, LTI Systems, Fourier Transform, Laplace Transform & Z-Transform Analysis',
      'Analog Electronic Circuits: Op-Amp Applications (Inverting, Non-inverting, Integrator, Differentiator), Oscillators & Active Filters'
    ],
    'B.Sc. Astrophysics & Space Science': [
      'Stellar Physics: Hertzsprung-Russell Diagram, Stellar Nucleosynthesis, Hydrostatic Equilibrium & Stellar Evolution',
      'Cosmology & General Relativity: Hubble Law, Expanding Universe, Big Bang Model, Dark Matter & Gravitational Waves',
      'Observational Astronomy: Optical/Radio Telescopes, Spectroscopy, Photometry & Celestial Coordinate Systems'
    ],
    'B.Sc. Nanotechnology & Materials Science': [
      'Synthesis of Nanomaterials: Top-Down vs Bottom-Up Approaches, Sol-Gel, Ball Milling & Hydrothermal Synthesis',
      'Characterization Techniques: SEM, TEM, AFM, XRD (Scherrer Equation) & UV-Vis Spectroscopy',
      'Nanostructured Materials: Quantum Dots, Carbon Nanotubes, Graphene, Nanocomposites & Nanomedicine Applications'
    ],
    'B.Sc. Chemistry': [
      'Organic Chemistry: Reaction Mechanisms (SN1, SN2, E1, E2), Electrophilic Aromatic Substitution, Carbonyl Reactions, Aldol & Claisen Condensation',
      'Inorganic Chemistry: Crystal Field Theory, Ligand Field Theory, Coordination Complexes (Isomerism & Magnetic Properties), Organometallics',
      'Physical Chemistry: Chemical Kinetics (Order of Reaction, Arrhenius), Chemical Thermodynamics, Phase Equilibria, Electrochemistry (Nernst Eq)',
      'Spectroscopy: UV-Visible, IR, NMR (1H-NMR Chemical Shifts), Mass Spectrometry & Structural Elucidation',
      'Quantum Chemistry: Postulates of Quantum Mechanics, Operators, Particle in a Box, Valence Bond & Molecular Orbital (MO) Theory'
    ],
    'B.Sc. Biochemistry': [
      'Enzymology: Enzyme Classification, Michaelis-Menten Kinetics, Enzyme Inhibition (Competitive/Non-competitive) & Coenzymes',
      'Metabolic Pathways: Glycolysis, TCA Cycle, Oxidative Phosphorylation, Gluconeogenesis, Beta-Oxidation of Fatty Acids & Urea Cycle',
      'Molecular Genetics & Bioenergetics: Nucleic Acid Structure, DNA Repair Mechanisms, High-energy Phosphates & ATP Synthesis'
    ],
    'B.Sc. Biotechnology': [
      'Molecular Biology: DNA Replication, Transcription, RNA Splicing, Translation, Genetic Code & Operon Models (lac Operon)',
      'Genetic Engineering & Recombinant DNA: Restriction Enzymes, Cloning Vectors (Plasmids, Bacteriophages), PCR, Gel Electrophoresis & CRISPR-Cas9',
      'Bioprocess Engineering: Bioreactor Design, Fermentation Kinetics, Upstream & Downstream Processing, Scale-Up Strategies',
      'Immunology: Innate & Adaptive Immunity, Structure of Antibodies, Antigen-Antibody Interactions, ELISA & Monoclonal Antibodies'
    ],
    'B.Sc. Microbiology': [
      'General Bacteriology: Bacterial Morphology, Gram Staining, Cell Wall Ultrastructure, Growth Curve & Culture Techniques',
      'Virology & Mycology: Viral Replication Cycles (Lytic/Lysogenic), Retroviruses, Fungal Taxonomy & Medical Mycology',
      'Microbial Genetics: Conjugation, Transformation, Transduction, Plasmids, Transposons & Mutation Mechanisms',
      'Industrial & Medical Microbiology: Antibiotics Mode of Action, Vaccine Production, Pathogenicity & Food Preservation'
    ],
    'B.Sc. Zoology': [
      'Non-Chordates & Chordates: Comparative Anatomy, Classification, Evolutionary Adaptations & Organ Systems',
      'Animal Physiology & Endocrinology: Respiration, Excretion (Nephron Function), Nervous Transmission & Hormonal Regulation',
      'Genetics & Developmental Biology: Mendelian Genetics, Linkage & Crossing Over, Embryogenesis, Cleavage & Gastrulation'
    ],
    'B.Sc. Botany': [
      'Plant Anatomy & Physiology: Photosynthesis (C3/C4/CAM), Transpiration, Phytohormones (Auxin, Gibberellin, Cytokinin), Nitrogen Metabolism',
      'Plant Taxonomy & Systematics: Bentham & Hooker Classification, Herbarium Techniques, Floral Morphology & Key Botanical Families',
      'Cryptogams & Phanerogams: Algae, Fungi, Bryophytes, Pteridophytes, Gymnosperms & Angiosperm Life Cycles'
    ],
    'B.Sc. Genetics & Genomics': [
      'Classical & Cytogenetics: Chromosome Mapping, Karyotyping, Chromosomal Aberrations, Non-Mendelian Inheritance & Epigenetics',
      'Genomic Technologies: Next-Generation Sequencing (NGS), Sanger Sequencing, Microarray Analysis & Genome Annotation'
    ],
    'B.Sc. Biomedical Science': [
      'Human Anatomy & Pathology: Cellular Adaptations, Inflammation, Neoplasia, Cardiovascular & Renal Pathophysiology',
      'Pharmacology & Toxicology: Pharmacokinetics (ADME), Pharmacodynamics, Drug Receptors & Mechanisms of Drug Toxicity'
    ],
    'B.Sc. Forensic Science': [
      'Forensic Ballistics & Trace Evidence: Firearms Identification, Striation Marks, Glass, Soil, Hair & Fiber Analysis',
      'Forensic Biology & Serology: Bloodstain Pattern Analysis, DNA Fingerprinting (STR/CODIS), Forensic Toxicology & Autopsy Protocols'
    ],
    'B.Sc. Mathematics': [
      'Real Analysis: Sequences & Series Convergence, Metric Spaces, Bolzano-Weierstrass Theorem, Riemann Integration & Uniform Continuity',
      'Abstract Algebra: Groups, Subgroups, Lagrange Theorem, Normal Subgroups, Homomorphisms, Rings, Integral Domains & Fields',
      'Linear Algebra: Vector Spaces, Subspaces, Linear Independence, Basis & Dimension, Linear Transformations, Eigenvalues & Diagonalization',
      'Differential Equations: First & Second Order Linear ODEs, Laplace Transforms, Series Solutions (Frobenius Method) & PDEs',
      'Complex Analysis: Analytic Functions, Cauchy-Riemann Equations, Cauchy Integral Theorem, Residue Calculus & Laurent Series',
      'Numerical Analysis: Newton-Raphson, Gauss Elimination, Interpolation (Lagrange/Newton), Numerical Integration (Simpson/Trapezoidal)'
    ],
    'B.Sc. Statistics': [
      'Probability & Random Variables: Joint/Marginal Probability, Characteristic Functions, Law of Large Numbers & Central Limit Theorem',
      'Statistical Inference: Point Estimation (MLE, Method of Moments), Confidence Intervals, Neyman-Pearson Lemma & Likelihood Ratio Tests',
      'Design of Experiments & Regression: CRD, RBD, Latin Square Design, Multiple Linear Regression & ANOVA'
    ],
    'B.Sc. Environmental Science & Ecology': [
      'Ecosystem Dynamics: Energy Flow, Food Webs, Biogeochemical Cycles (Carbon/Nitrogen/Phosphorus), Ecological Succession',
      'Environmental Pollution & Waste Management: Air Quality Indices, Wastewater Treatment, Solid/Hazardous Waste Management & EIA (Environmental Impact Assessment)',
      'Biodiversity Conservation & Climate Change: In-situ/Ex-situ Conservation, Global Warming, Greenhouse Gases & International Environmental Treaties'
    ],
    'B.Sc. Agriculture': [
      'Agronomy & Crop Production: Seed Germination, Irrigation Management, Crop Rotation, Weed Control & Organic Farming Practices',
      'Soil Science & Agricultural Chemistry: Soil Texture, Nutrient Management (NPK), Soil pH, Cation Exchange Capacity & Fertilizer Formulations',
      'Plant Breeding & Genetics: Hybridization, Heterosis, Mass Selection, Pure Line Selection & Disease Resistance Breeding'
    ],
    'B.Sc. Food Technology & Nutrition': [
      'Food Chemistry & Preservation: Food Spoilage Mechanisms, Thermal Processing (Pasteurization, Retorting), Freezing, Dehydration & Food Additives',
      'Food Quality Control & Safety: HACCP, ISO 22000, FSSAI Standards, Sensory Evaluation & Microbiological Safety Testing'
    ],
    'B.Sc. Geology & Earth Science': [
      'Mineralogy & Petrology: Crystal Systems, Optical Mineralogy, Igneous, Sedimentary & Metamorphic Rock Formations',
      'Structural Geology & Stratigraphy: Folds, Faults, Unconformities, Geological Mapping, Plate Tectonics & Fossil Chronology'
    ]
  };

  const currentProgramTopics = bscTopicCatalogs[details.degreeProgram] || [
    'Unit 1: Theoretical Foundations, Axioms & Core Mathematical/Scientific Formulations',
    'Unit 2: Analytical Modeling, Derivations & Characteristic Solutions',
    'Unit 3: Algorithmic / Experimental Methodologies & System Architecture',
    'Unit 4: Advanced Problem Solving, Boundary Analysis & Case Studies'
  ];

  const handleAddPresetTopic = (topic: string) => {
    if (syllabus.includes(topic)) return;
    const newText = syllabus.trim() ? `${syllabus.trim()}\n• ${topic}` : `• ${topic}`;
    onSyllabusChange(newText);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        onSyllabusChange(content);
      }
    };
    reader.readAsText(file);
  };

  const totalQuestions = questionConfigs.filter(c => c.enabled).reduce((acc, c) => acc + c.count, 0);

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-purple-950/80 via-slate-900 to-indigo-950/70 border border-purple-500/20 rounded-2xl p-6 sm:p-8 backdrop-blur shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-semibold mb-3">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Step 2 of 3: B.Sc. Syllabus & Modules</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Enter Undergraduate Syllabus / Units
            </h1>
            <p className="text-slate-300 text-sm mt-1.5 max-w-xl">
              Add curriculum units, course modules, or lecture topics for <strong>{details.degreeProgram} ({details.courseTitle})</strong>.
            </p>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={onBack}
              className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition"
            >
              <ArrowLeft className="w-4 h-4 inline mr-1" />
              <span>Back</span>
            </button>

            <button
              onClick={onGenerate}
              disabled={isGenerating || !syllabus.trim()}
              className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white font-bold text-sm shadow-xl shadow-emerald-600/30 transition transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Synthesizing B.Sc. Exam Paper...</span>
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4" />
                  <span>Generate B.Sc. Question Paper</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* College Topic Suggestions */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center space-x-1.5">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>Standard B.Sc. Modules for {details.degreeProgram}:</span>
          </label>
          <span className="text-[11px] text-slate-400">Click to insert into syllabus</span>
        </div>

        <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
          {currentProgramTopics.map((topic, idx) => {
            const isAdded = syllabus.includes(topic);
            return (
              <div
                key={idx}
                onClick={() => handleAddPresetTopic(topic)}
                className={`cursor-pointer p-3 rounded-xl border text-xs transition flex items-center justify-between gap-3 ${
                  isAdded
                    ? 'bg-purple-950/60 border-purple-500/60 text-purple-200'
                    : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-700/80 hover:text-white'
                }`}
              >
                <div className="flex items-start space-x-2">
                  <span className="font-bold text-purple-400 shrink-0">Unit {idx + 1}:</span>
                  <span>{topic}</span>
                </div>
                {isAdded ? (
                  <span className="text-[11px] font-bold text-emerald-400 shrink-0 flex items-center space-x-1">
                    <Check className="w-3.5 h-3.5" />
                    <span>Added</span>
                  </span>
                ) : (
                  <span className="text-[11px] text-indigo-400 font-semibold shrink-0 flex items-center space-x-1">
                    <Plus className="w-3.5 h-3.5" />
                    <span>Insert</span>
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Syllabus Textarea */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white flex items-center space-x-2">
            <GraduationCap className="w-5 h-5 text-indigo-400" />
            <span>Undergraduate Course Syllabus & Lecture Notes</span>
          </h2>

          <label className="cursor-pointer flex items-center space-x-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium rounded-lg border border-slate-700 transition">
            <UploadCloud className="w-3.5 h-3.5 text-indigo-400" />
            <span>Upload Syllabus (.txt/.md)</span>
            <input type="file" accept=".txt,.md,.text" onChange={handleFileUpload} className="hidden" />
          </label>
        </div>

        <textarea
          value={syllabus}
          onChange={(e) => onSyllabusChange(e.target.value)}
          rows={9}
          placeholder="Type or paste the complete university course units, theorem names, topics, or lecture outlines..."
          className="w-full px-4 py-3 rounded-xl bg-slate-800/90 border border-slate-700 text-slate-100 text-sm placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition resize-y font-mono leading-relaxed"
        />

        <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
          <span>{syllabus.trim() ? `${syllabus.split('\n').filter(l => l.trim()).length} topic lines entered` : 'Please enter syllabus topics'}</span>
          <span>Ready to generate {totalQuestions} undergraduate level questions</span>
        </div>
      </div>

      {/* Bottom Action */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-800">
        <button
          onClick={onBack}
          className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs border border-slate-700 transition"
        >
          <ArrowLeft className="w-3.5 h-3.5 inline mr-1" />
          <span>Previous: Degree Setup</span>
        </button>

        <button
          onClick={onGenerate}
          disabled={isGenerating || !syllabus.trim()}
          className="flex items-center space-x-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white font-bold text-sm shadow-xl shadow-emerald-600/30 transition transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
        >
          {isGenerating ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Synthesizing B.Sc. Paper...</span>
            </>
          ) : (
            <>
              <Wand2 className="w-4 h-4" />
              <span>Generate B.Sc. Question Paper</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
