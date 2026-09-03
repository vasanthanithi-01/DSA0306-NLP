export const mockDocument = {
  name: "University_Academic_Regulations.pdf",
  type: "PDF",
  pages: 42,
  size: "2.8 MB",
  status: "Processed",
};

export const processingStages = [
  { id: "extract", label: "Text Extraction", tech: "PyMuPDF + EasyOCR/Tesseract", status: "complete" },
  { id: "process", label: "Text Processing", tech: "OpenCV + text cleaning", status: "complete" },
  { id: "chunk", label: "Chunking", tech: "LangChain text splitter", status: "complete" },
  { id: "embed", label: "Embedding Generation", tech: "Sentence Transformers", status: "complete" },
  { id: "index", label: "FAISS Vector Indexing", tech: "FAISS", status: "complete" },
];

export const mockChunks = [
  { id: "chunk-18", score: 0.94, page: 18, text: "Students must maintain a minimum attendance of 75% in each course to be eligible to appear for the end-semester examination." },
  { id: "chunk-19", score: 0.88, page: 19, text: "Condonation of attendance may be considered in exceptional circumstances, subject to the conditions prescribed by the institution." },
  { id: "chunk-17", score: 0.81, page: 17, text: "Attendance is recorded for every scheduled academic session and students are responsible for monitoring their attendance percentage." },
];

export const mockAnswer = {
  question: "What is the minimum attendance required for the end-semester examination?",
  answer: "Students must maintain at least 75% attendance in each course to be eligible to appear for the end-semester examination. Exceptional cases may be considered for attendance condonation according to institutional rules.",
  sources: [
    { page: 18, relevance: 0.94 },
    { page: 19, relevance: 0.88 },
  ],
};
