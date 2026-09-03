import {
  type ChangeEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  Check,
  FileText,
  MessageSquareText,
  Search,
  Sparkles,
  Upload,
  LoaderCircle,
} from "lucide-react";
import { motion } from "motion/react";
import WorkspaceBackground from "./WorkspaceBackground";

type WorkspaceTab = "overview" | "search" | "qa";
type WorkspacePhase = "upload" | "processing" | "ready";

interface WorkspaceProps {
  onBack: () => void;
}

/*
|--------------------------------------------------------------------------
| STATIC DEMO DATA
|--------------------------------------------------------------------------
*/

const DEMO_DOCUMENT = {
  name: "University Academic Regulations.pdf",
  pages: 42,
  chunks: 186,
  embeddingDimension: 384,
};

const PROCESSING_STAGES = [
  {
    id: "extract",
    label: "Text Extraction",
    tech: "PyMuPDF / EasyOCR / Tesseract",
  },
  {
    id: "process",
    label: "Text Processing",
    tech: "Cleaning and normalization",
  },
  {
    id: "chunk",
    label: "Chunking",
    tech: "Context-preserving text segmentation",
  },
  {
    id: "embed",
    label: "Embedding Generation",
    tech: "Sentence Transformers",
  },
  {
    id: "index",
    label: "FAISS Vector Indexing",
    tech: "384-dimensional vector index",
  },
];


/*
|--------------------------------------------------------------------------
| MAIN WORKSPACE
|--------------------------------------------------------------------------
*/

export default function Workspace({ onBack }: WorkspaceProps) {
  const [phase, setPhase] = useState<WorkspacePhase>("upload");
  const [tab, setTab] = useState<WorkspaceTab>("overview");
  const [documentName, setDocumentName] = useState("");

  const [documentData, setDocumentData] = useState<any>(null);

  const [processingIndex, setProcessingIndex] = useState(0);

  const startProcessing = (name?: string) => {
    setDocumentName(name || DEMO_DOCUMENT.name);
    setProcessingIndex(0);
    setPhase("processing");
    setTab("overview");
  };
const handleFileChange = async (
  event: ChangeEvent<HTMLInputElement>
) => {
  const file = event.target.files?.[0];

  if (!file) return;

  try {
    // Clear previous document data first
    setDocumentData(null);

    // Start processing animation
    startProcessing(file.name);

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(
      "http://127.0.0.1:8000/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const result = await response.json();

    if (!response.ok) {
      console.error("Backend error:", result);

      throw new Error(
        result.detail || "Document processing failed"
      );
    }

    console.log("Processed document:", result);

    // IMPORTANT: store actual backend data
    setDocumentData(result);

  } catch (error) {
    console.error("Upload error:", error);

    alert(
      error instanceof Error
        ? error.message
        : "Failed to process document."
    );

    setDocumentData(null);
    setPhase("upload");

  } finally {
    event.target.value = "";
  }
};
  /*
  |--------------------------------------------------------------------------
  | PROCESSING ANIMATION
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (phase !== "processing") return;

    if (processingIndex < PROCESSING_STAGES.length) {
      const timer = window.setTimeout(() => {
        setProcessingIndex((current) => current + 1);
      }, 750);
      return () => window.clearTimeout(timer);
    }

    if (documentData) {
      const timer = window.setTimeout(() => setPhase("ready"), 300);
      return () => window.clearTimeout(timer);
    }
  }, [phase, processingIndex, documentData]);

  /*
  |--------------------------------------------------------------------------
  | UPLOAD
  |--------------------------------------------------------------------------
  */

  if (phase === "upload") {
    return (
      <div className="workspace-body relative min-h-screen overflow-hidden bg-black text-white">
        <WorkspaceBackground />

        <div className="relative z-10">
          <WorkspaceHeader onBack={onBack} />

          <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-5 py-16">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65 }}
              className="w-full max-w-4xl text-center"
            >
              <p className="mb-5 text-xs font-medium uppercase tracking-[0.3em] text-blue-200/80">
                Document Intelligence
              </p>

              <h1 className="serif-display text-5xl leading-[0.9] text-white sm:text-7xl lg:text-[96px]">
                Bring a document
                <br />
                into focus.
              </h1>

              <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-white/60 sm:text-lg">
                Upload a document and move through the DocInsight pipeline —
                extraction, processing, chunking, embeddings, retrieval, and
                grounded answers.
              </p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.55 }}
                className="
                  mx-auto
                  mt-12
                  max-w-2xl
                  rounded-[30px]
                  border
                  border-white/10
                  bg-black/30
                  px-8
                  py-14
                  backdrop-blur-2xl
                "
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/[0.06] text-blue-300 ring-1 ring-white/10">
                  <Upload className="h-7 w-7" />
                </div>

                <h2 className="sans-display mt-6 text-2xl text-white">
                  Choose a document
                </h2>

                <p className="mt-3 text-sm text-white/40">
                  PDF · DOCX · JPG · PNG
                </p>

                <label className="mt-7 inline-flex cursor-pointer rounded-full bg-white py-3 pl-6 pr-2 text-sm font-semibold text-black transition hover:scale-[1.03]">
                  Upload Document

                  <span className="ml-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#3054ff] text-white">
                    <ArrowRight className="h-4 w-4" />
                  </span>

                  <input
                    type="file"
                    accept=".pdf,.docx,.jpg,.jpeg,.png,.tiff,.bmp"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              </motion.div>

              <div className="my-8 flex items-center gap-4 text-[10px] uppercase tracking-[0.25em] text-white/25">
                <span className="h-px flex-1 bg-white/10" />
                Demo Mode
                <span className="h-px flex-1 bg-white/10" />
              </div>

              <button
                onClick={() => alert("Demo mode is visual only. Upload a document to use real analysis.")}
                className="
                  rounded-full
                  border
                  border-white/10
                  bg-white/[0.04]
                  px-6
                  py-3
                  text-sm
                  text-white/65
                  backdrop-blur-xl
                  transition
                  hover:bg-white/[0.08]
                  hover:text-white
                "
              >
                Use Demo Document
              </button>

              <p className="mt-4 text-xs text-white/25">
                Upload a supported document to build a searchable knowledge base.
              </p>
            </motion.div>
          </main>
        </div>
      </div>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | PROCESSING
  |--------------------------------------------------------------------------
  */

  if (phase === "processing") {
    const completed =
      processingIndex >= PROCESSING_STAGES.length;

    const progress = completed
      ? 100
      : Math.round(
          (processingIndex / PROCESSING_STAGES.length) * 100
        );

    return (
      <div className="workspace-body relative min-h-screen overflow-hidden bg-black text-white">
        <WorkspaceBackground />

        <div className="relative z-10">
          <WorkspaceHeader onBack={onBack} />

          <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-5 py-16">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65 }}
              className="w-full max-w-3xl"
            >
              <div className="mb-10 text-center">
                <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-blue-200/80">
                  Building your knowledge base
                </p>

                <h1 className="serif-display text-5xl leading-[0.95] text-white sm:text-6xl lg:text-[76px]">
                  Processing your document.
                </h1>

                <p className="mt-5 text-sm text-white/40">
                  {documentName}
                </p>
              </div>

              <div className="rounded-[30px] border border-white/10 bg-black/30 p-6 backdrop-blur-2xl sm:p-8">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-white/30">
                      Document pipeline
                    </p>

                    <p className="mt-2 text-sm text-white/60">
                      {completed
                        ? "Document ready"
                        : PROCESSING_STAGES[
                            Math.min(
                              processingIndex,
                              PROCESSING_STAGES.length - 1
                            )
                          ]?.label}
                    </p>
                  </div>

                  <span className="text-sm text-blue-300">
                    {progress}%
                  </span>
                </div>

                <div className="mb-7 h-1 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                    className="h-full rounded-full bg-[#3054ff] shadow-[0_0_18px_rgba(48,84,255,0.6)]"
                  />
                </div>

                <div className="space-y-3">
                  {PROCESSING_STAGES.map((stage, index) => {
                    const done =
                      index < processingIndex || completed;

                    const active =
                      index === processingIndex && !completed;

                    return (
                      <div
                        key={stage.id}
                        className={`
                          flex items-center gap-4 rounded-2xl
                          border px-4 py-4
                          ${
                            active
                              ? "border-blue-400/30 bg-blue-500/[0.06]"
                              : "border-white/10 bg-white/[0.02]"
                          }
                        `}
                      >
                        <div
                          className={`
                            flex h-9 w-9 shrink-0 items-center
                            justify-center rounded-full
                            ${
                              done
                                ? "bg-emerald-400/10 text-emerald-300"
                                : active
                                  ? "bg-blue-500/10 text-blue-300"
                                  : "bg-white/5 text-white/20"
                            }
                          `}
                        >
                          {done ? (
                            <Check className="h-4 w-4" />
                          ) : active ? (
                            <LoaderCircle className="h-4 w-4 animate-spin" />
                          ) : (
                            <span className="text-xs">
                              {index + 1}
                            </span>
                          )}
                        </div>

                        <div className="flex-1">
                          <p className="text-sm font-medium text-white/85">
                            {stage.label}
                          </p>

                          <p className="mt-1 text-xs text-white/35">
                            {stage.tech}
                          </p>
                        </div>

                        <span className="text-[11px] text-white/30">
                          {done
                            ? "Complete"
                            : active
                              ? "Running"
                              : "Waiting"}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </main>
        </div>
      </div>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | READY WORKSPACE
  |--------------------------------------------------------------------------
  */

  return (
    <div className="workspace-body relative min-h-screen overflow-hidden bg-black text-white">
      <WorkspaceBackground />

      <div className="relative z-10">
        <WorkspaceHeader onBack={onBack} />

        <main className="mx-auto grid max-w-[1500px] gap-8 px-5 py-10 lg:grid-cols-[250px_1fr] lg:px-10">
          {/* SIDEBAR */}

          <aside
            className="
              h-fit
              rounded-[28px]
              border border-white/10
              bg-black/30
              p-4
              backdrop-blur-2xl
              lg:sticky
              lg:top-24
            "
          >
            <div className="mb-7 px-3">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-blue-200/80">
                DocInsight
              </p>

              <p className="mt-2 text-xs leading-5 text-white/30">
                Document intelligence workspace
              </p>
            </div>

            <nav className="space-y-1">
              <WorkspaceNav
                active={tab === "overview"}
                icon={<FileText className="h-4 w-4" />}
                label="Document Overview"
                onClick={() => setTab("overview")}
              />

              <WorkspaceNav
                active={tab === "search"}
                icon={<Search className="h-4 w-4" />}
                label="Semantic Search"
                onClick={() => setTab("search")}
              />

              <WorkspaceNav
                active={tab === "qa"}
                icon={<MessageSquareText className="h-4 w-4" />}
                label="Ask Document"
                onClick={() => setTab("qa")}
              />
            </nav>

            <div className="my-7 h-px bg-white/10" />

            <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-4">
              <div className="flex gap-3">
                <div className="rounded-xl bg-blue-500/10 p-2.5 text-blue-300">
                  <FileText className="h-4 w-4" />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-xs font-medium text-white/75">
                    {documentName}
                  </p>

                  <p className="mt-1 text-[11px] text-white/30">
                    {documentData?.pages ?? DEMO_DOCUMENT.pages} pages
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 text-[11px] text-emerald-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Indexed
              </div>
            </div>

            <button
              onClick={() => setPhase("upload")}
              className="
                mt-4
                w-full
                rounded-full
                border
                border-white/10
                bg-white/[0.04]
                py-2.5
                text-xs
                text-white/55
                transition
                hover:bg-white/[0.08]
                hover:text-white
              "
            >
              Analyze Another
            </button>
          </aside>

          {/* CONTENT */}

          <section className="min-w-0 pb-14">
            {tab === "overview" && (
              <Overview
  documentName={documentName}
  documentData={documentData}
  onSearch={() => setTab("search")}
  onAsk={() => setTab("qa")}
/>
            )}

            {tab === "search" && (
  <SemanticSearch
    documentId={documentData?.document_id}
  />
)}

            {tab === "qa" && (
  <AskDocument
    documentId={documentData?.document_id}
  />
)}
          </section>
        </main>
      </div>
    </div>
  );
}

/*
|--------------------------------------------------------------------------
| HEADER
|--------------------------------------------------------------------------
*/

function WorkspaceHeader({ onBack }: { onBack: () => void }) {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-black/20 backdrop-blur-2xl">
      <div className="mx-auto flex h-16 max-w-[1500px] items-center justify-between px-5 lg:px-10">
        <button
          onClick={onBack}
          className="group flex items-center gap-3 text-white/70 transition hover:text-white"
        >
          <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-1" />

          <span className="text-sm font-semibold tracking-tight">
            DocInsight AI
          </span>
        </button>

        <div className="flex items-center gap-2 text-xs text-white/35">
          <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.6)]" />
          Local workspace
        </div>
      </div>
    </header>
  );
}

/*
|--------------------------------------------------------------------------
| NAV ITEM
|--------------------------------------------------------------------------
*/

function WorkspaceNav({
  active,
  icon,
  label,
  onClick,
}: {
  active: boolean;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`
        flex w-full items-center gap-3 rounded-2xl px-4 py-3
        text-sm transition
        ${
          active
            ? "bg-white/[0.08] text-white ring-1 ring-white/10"
            : "text-white/40 hover:bg-white/[0.04] hover:text-white/75"
        }
      `}
    >
      <span className={active ? "text-blue-300" : "text-white/30"}>
        {icon}
      </span>

      {label}
    </button>
  );
}

/*
|--------------------------------------------------------------------------
| OVERVIEW
|--------------------------------------------------------------------------
*/

function Overview({
  documentName,
  documentData,
  onSearch,
  onAsk,
}: {
  documentName: string;
  documentData: any;
  onSearch: () => void;
  onAsk: () => void;
}) {
  const keywords = documentData?.keywords ?? [];
  const keyPoints = documentData?.key_points ?? [];
  const entities = documentData?.entities ?? {};

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65 }}
      className="mx-auto max-w-6xl space-y-8"
    >
      {/* HEADER */}
      <div className="pt-5 lg:pt-10">
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-blue-200/80">
          Document Intelligence
        </p>

        <h1 className="serif-display mt-4 text-4xl leading-[0.95] text-white sm:text-6xl">
          Document overview.
        </h1>

        <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-white/45">
          <span className="text-white/75">
            {documentData?.filename || documentName || "Uploaded document"}
          </span>

          <span className="h-1 w-1 rounded-full bg-white/30" />

          <span>{documentData?.file_type || "DOCUMENT"}</span>

          <span className="h-1 w-1 rounded-full bg-white/30" />

          <span>{documentData?.pages ?? 0} pages</span>

          <span className="h-1 w-1 rounded-full bg-white/30" />

          <span>~{documentData?.reading_time_minutes ?? 0} min read</span>
        </div>
      </div>

      {/* STATS */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <InfoCard
          label="Pages"
          value={String(documentData?.pages ?? 0)}
          detail="Document length"
        />

        <InfoCard
          label="Words"
          value={String(documentData?.words ?? 0)}
          detail="Extracted content"
        />

        <InfoCard
          label="Chunks"
          value={String(documentData?.chunks ?? 0)}
          detail="Semantic sections"
        />

        <InfoCard
          label="Read time"
          value={`${documentData?.reading_time_minutes ?? 0}m`}
          detail="Estimated reading"
        />
      </div>

      {/* SUMMARY */}
      <section className="rounded-[30px] border border-blue-400/15 bg-blue-500/[0.035] p-7 backdrop-blur-2xl sm:p-9">
        <div className="flex items-center gap-3">
          <Sparkles className="h-4 w-4 text-blue-300" />

          <p className="text-xs font-medium uppercase tracking-[0.25em] text-blue-200">
            AI Summary
          </p>
        </div>

        <h2 className="sans-display mt-5 text-3xl text-white">
          What this document is about
        </h2>

        <p className="mt-5 max-w-5xl text-base leading-8 text-white/70 sm:text-lg">
          {documentData?.summary ||
            "Document summary will appear here after processing."}
        </p>
      </section>

      {/* KEY POINTS */}
      <section>
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-blue-200/80">
          Key Findings
        </p>

        <h2 className="sans-display mt-3 text-3xl text-white md:text-4xl">
          Important points
        </h2>

        <div className="mt-6 grid gap-4">
          {keyPoints.length > 0 ? (
            keyPoints.map((point: any, index: number) => (
              <motion.div
                key={`${point.chunk_id}-${index}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06 }}
                className="rounded-[24px] border border-white/10 bg-black/30 p-6 backdrop-blur-2xl"
              >
                <div className="flex gap-5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-blue-400/20 bg-blue-500/[0.08] text-xs font-semibold text-blue-300">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div className="flex-1">
                    <p className="text-sm leading-7 text-white/70 sm:text-base">
                      {point.text}
                    </p>

                    <div className="mt-4">
                      <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-white/40">
                        Source · Page {point.page}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-sm text-white/35">
              No key points could be extracted.
            </p>
          )}
        </div>
      </section>

      {/* KEYWORDS */}
      <section className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="rounded-[28px] border border-white/10 bg-black/30 p-7 backdrop-blur-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-blue-200/80">
            Keywords & Topics
          </p>

          <h2 className="sans-display mt-3 text-2xl text-white">
            Main concepts
          </h2>

          <div className="mt-6 flex flex-wrap gap-2">
            {keywords.length > 0 ? (
              keywords.map((item: any, index: number) => (
                <span
                  key={`${item.keyword}-${index}`}
                  className="rounded-full border border-blue-400/15 bg-blue-500/[0.06] px-4 py-2 text-sm text-blue-100/75"
                >
                  {item.keyword}
                </span>
              ))
            ) : (
              <span className="text-sm text-white/35">
                No keywords extracted.
              </span>
            )}
          </div>
        </div>

        {/* DOCUMENT INSIGHTS */}
        <div className="rounded-[28px] border border-white/10 bg-black/30 p-7 backdrop-blur-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-blue-200/80">
            Document Insights
          </p>

          <div className="mt-6 space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="text-sm text-white/40">Characters</span>
              <span className="text-sm text-white/80">
                {documentData?.characters?.toLocaleString?.() ?? 0}
              </span>
            </div>

            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="text-sm text-white/40">Embedding</span>
              <span className="text-sm text-white/80">
                {documentData?.embedding_dimension ?? 0}D
              </span>
            </div>

            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="text-sm text-white/40">Keywords found</span>
              <span className="text-sm text-white/80">
                {keywords.length}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-white/40">Key findings</span>
              <span className="text-sm text-white/80">
                {keyPoints.length}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ENTITIES */}
      {(entities.names_or_organizations?.length > 0 ||
        entities.dates?.length > 0 ||
        entities.emails?.length > 0 ||
        entities.urls?.length > 0) && (
        <section className="rounded-[28px] border border-white/10 bg-black/30 p-7 backdrop-blur-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-blue-200/80">
            Extracted Entities
          </p>

          <h2 className="sans-display mt-3 text-2xl text-white">
            References found in the document
          </h2>

          <div className="mt-7 grid gap-6 md:grid-cols-2">
            {entities.names_or_organizations?.length > 0 && (
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-white/30">
                  Names & Organizations
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {entities.names_or_organizations.map(
                    (entity: string, index: number) => (
                      <span
                        key={`${entity}-${index}`}
                        className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/60"
                      >
                        {entity}
                      </span>
                    )
                  )}
                </div>
              </div>
            )}

            {entities.dates?.length > 0 && (
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-white/30">
                  Dates
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {entities.dates.map(
                    (date: string, index: number) => (
                      <span
                        key={`${date}-${index}`}
                        className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/60"
                      >
                        {date}
                      </span>
                    )
                  )}
                </div>
              </div>
            )}

            {entities.emails?.length > 0 && (
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-white/30">
                  Email Addresses
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {entities.emails.map(
                    (email: string, index: number) => (
                      <span
                        key={`${email}-${index}`}
                        className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/60"
                      >
                        {email}
                      </span>
                    )
                  )}
                </div>
              </div>
            )}

            {entities.urls?.length > 0 && (
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-white/30">
                  URLs
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {entities.urls.map(
                    (url: string, index: number) => (
                      <span
                        key={`${url}-${index}`}
                        className="max-w-full truncate rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/60"
                      >
                        {url}
                      </span>
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* NEXT ACTIONS */}
      <section className="grid gap-4 md:grid-cols-2">
        <ActionCard
          icon={<Search className="h-5 w-5" />}
          title="Semantic Search"
          text="Search for concepts and retrieve the most relevant passages."
          onClick={onSearch}
        />

        <ActionCard
          icon={<MessageSquareText className="h-5 w-5" />}
          title="Ask Document"
          text="Ask questions and generate answers grounded in your document."
          onClick={onAsk}
        />
      </section>
    </motion.div>
  );
}

/*
|--------------------------------------------------------------------------
| MODULE 3 — SEMANTIC SEARCH
|--------------------------------------------------------------------------
*/

function SemanticSearch({ documentId }: { documentId?: string }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<
    "idle" | "searching" | "results" | "error"
  >("idle");

  const [results, setResults] = useState<any[]>([]);
  const [error, setError] = useState("");

  const runSearch = async () => {
    if (!query.trim()) return;

    if (!documentId) {
      setError("No active document. Please upload a document first.");
      setStatus("error");
      return;
    }

    setError("");
    setResults([]);
    setStatus("searching");

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/search",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            document_id: documentId,
            query: query.trim(),
            top_k: 3,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Search failed");
      }

      setResults(data.results || []);
      setStatus("results");

    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while searching."
      );

      setStatus("error");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65 }}
      className="mx-auto max-w-5xl space-y-12"
    >
      {/* HEADER */}

      <div className="pt-5 text-center lg:pt-10">
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-blue-200/80">
          Module 3 · Semantic Retrieval
        </p>

        <h1 className="serif-display mt-5 text-5xl leading-[0.9] text-white md:text-6xl lg:text-7xl">
          Search by meaning
        </h1>

        <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-white/60 md:text-lg">
          Find relevant information based on semantic similarity rather
          than exact keyword matching.
        </p>
      </div>


      {/* SEARCH BAR */}

      <div className="rounded-[30px] border border-white/10 bg-black/30 p-3 backdrop-blur-2xl">

        <div className="flex flex-col gap-3 sm:flex-row">

          <div className="relative flex-1">

            <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-white/25" />

            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}

              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  runSearch();
                }
              }}

              className="h-14 w-full rounded-[22px] bg-white/[0.035] pl-14 pr-5 text-sm text-white outline-none placeholder:text-white/20 focus:bg-white/[0.05]"

              placeholder="Search your uploaded document..."
            />

          </div>


          <button
            onClick={runSearch}

            disabled={
              status === "searching" ||
              !query.trim()
            }

            className="group flex h-14 items-center justify-center gap-3 rounded-full bg-white px-6 text-sm font-semibold text-black transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
          >

            {status === "searching"
              ? "Searching..."
              : "Search"}

            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#3054ff] text-white">

              {status === "searching" ? (
                <LoaderCircle className="h-4 w-4 animate-spin" />
              ) : (
                <ArrowRight className="h-4 w-4" />
              )}

            </span>

          </button>

        </div>


        {/* ERROR */}

        {error && (
          <p className="px-4 pt-3 text-xs text-red-300">
            {error}
          </p>
        )}

      </div>


      {/* RESULTS */}

      {status === "results" && (

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >

          <div className="flex items-end justify-between">

            <div>

              <p className="text-xs font-medium uppercase tracking-[0.25em] text-blue-200/80">
                Retrieval Results
              </p>

              <h2 className="sans-display mt-3 text-3xl text-white md:text-4xl">
                Most relevant passages
              </h2>

            </div>


            <span className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-white/40">
              Top {results.length}
            </span>

          </div>


          <div className="space-y-4">

            {results.map((result, index) => (

              <motion.div
                key={result.chunk_id}

                initial={{ opacity: 0, y: 15 }}

                animate={{ opacity: 1, y: 0 }}

                transition={{
                  delay: index * 0.08,
                }}

                className="rounded-[26px] border border-white/10 bg-black/30 p-6 backdrop-blur-2xl"
              >

                <div className="flex flex-col gap-5 sm:flex-row">


                  {/* RANK */}

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-blue-400/20 bg-blue-500/[0.08] text-sm font-semibold text-blue-300">

                    {String(result.rank).padStart(2, "0")}

                  </div>


                  {/* TEXT */}

                  <div className="flex-1">

                    <div className="flex items-center gap-3">

                      <span className="text-xs text-white/35">
                        Page {result.page}
                      </span>

                      <span className="h-1 w-1 rounded-full bg-white/20" />

                      <span className="text-xs text-white/25">
                        Retrieved chunk
                      </span>

                    </div>


                    <p className="mt-4 text-sm leading-7 text-white/65 sm:text-base">
  {result.text.length > 280
    ? result.text.slice(0, 280) + "..."
    : result.text}
</p>

                  </div>


                  {/* SCORE */}

                  <div className="h-fit shrink-0 rounded-full border border-emerald-400/15 bg-emerald-400/[0.05] px-4 py-2 text-xs text-emerald-300">

                    {(result.score * 100).toFixed(0)}% similarity

                  </div>

                </div>

              </motion.div>

            ))}

          </div>


          {results.length === 0 && (

            <p className="text-center text-sm text-white/35">
              No relevant passages were found.
            </p>

          )}

        </motion.div>

      )}

    </motion.div>
  );
}
/*
|--------------------------------------------------------------------------
| ASK DOCUMENT
|--------------------------------------------------------------------------
*/

function AskDocument({ documentId }: { documentId?: string }) {
  const [question, setQuestion] = useState("");
  const [answered, setAnswered] = useState(false);
  const [answering, setAnswering] = useState(false);
  const [answerData, setAnswerData] = useState<any>(null);
  const [error, setError] = useState("");

  const generateAnswer = async () => {
    if (!question.trim() || answering || !documentId) return;
    setAnswered(false); setAnswering(true); setError("");
    try {
      const response = await fetch("http://127.0.0.1:8000/ask", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ document_id: documentId, question: question.trim(), top_k: 3 }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.detail || "Could not generate an answer.");
      setAnswerData(data); setAnswered(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not generate an answer.");
    } finally { setAnswering(false); }
  };

  const sources = answerData?.sources || [];
  return (
    <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }} className="mx-auto max-w-5xl space-y-12">
      <div className="pt-5 lg:pt-10"><p className="mb-5 text-xs font-medium uppercase tracking-[0.3em] text-blue-200/80">Module 4 · Retrieval Augmented Generation</p><h1 className="serif-display text-5xl leading-[0.9] text-white sm:text-7xl lg:text-[82px]">Ask your document.</h1><p className="mt-7 max-w-2xl text-base leading-7 text-white/60 sm:text-lg">Relevant chunks are retrieved first and the answer is generated from the uploaded document.</p></div>
      <div className="rounded-[30px] border border-white/10 bg-black/30 p-4 backdrop-blur-2xl"><div className="relative"><MessageSquareText className="absolute left-5 top-5 h-5 w-5 text-white/25" /><textarea value={question} onChange={(event) => setQuestion(event.target.value)} rows={4} className="w-full resize-none rounded-[22px] bg-white/[0.035] p-5 pl-14 text-sm leading-7 text-white outline-none placeholder:text-white/20 focus:bg-white/[0.05]" placeholder="Ask something about your document..." /></div><button onClick={generateAnswer} disabled={!question.trim() || answering || !documentId} className="mt-4 group inline-flex items-center gap-3 rounded-full bg-white py-2 pl-6 pr-2 text-sm font-semibold text-black transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50">{answering ? "Generating..." : "Generate Answer"}<span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#3054ff] text-white">{answering ? <LoaderCircle className="h-5 w-5 animate-spin" /> : <Sparkles className="h-5 w-5" />}</span></button>{!documentId && <p className="mt-3 text-xs text-red-300">No active document. Upload again.</p>}{error && <p className="mt-3 text-xs text-red-300">{error}</p>}</div>
      {answered && <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-7"><div className="rounded-[30px] border border-blue-400/15 bg-blue-500/[0.035] p-7 backdrop-blur-2xl sm:p-9"><div className="mb-6 flex items-center gap-3"><Sparkles className="h-4 w-4 text-blue-300" /><p className="text-xs font-medium uppercase tracking-[0.25em] text-blue-200">Grounded Answer</p></div><p className="max-w-4xl text-base leading-8 text-white/80 sm:text-lg">{answerData?.answer}</p><div className="mt-8 border-t border-white/10 pt-6"><p className="text-xs uppercase tracking-[0.2em] text-white/30">Context Sources</p><div className="mt-4 flex flex-wrap gap-2">{sources.map((s: any) => <span key={s.chunk_id} className="rounded-full border border-white/10 bg-black/20 px-4 py-2 text-xs text-white/45">Page {s.page} · {(s.score * 100).toFixed(0)}%</span>)}</div></div></div><div><p className="text-xs font-medium uppercase tracking-[0.25em] text-blue-200/80">Retrieved Context</p><h2 className="sans-display mt-3 text-3xl text-white md:text-4xl">Evidence used for the answer</h2><div className="mt-5 grid gap-4 md:grid-cols-2">{sources.map((s: any) => <div key={s.chunk_id} className="rounded-[24px] border border-white/10 bg-black/30 p-6 backdrop-blur-2xl"><div className="flex items-center justify-between"><span className="text-xs text-white/35">Page {s.page}</span><span className="text-xs text-emerald-300">{(s.score * 100).toFixed(0)}%</span></div><p className="mt-4 text-sm leading-7 text-white/55">{s.text}</p></div>)}</div></div></motion.div>}
    </motion.div>
  );
}

/*
|--------------------------------------------------------------------------
| SMALL COMPONENTS
|--------------------------------------------------------------------------
*/

function InfoCard({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-black/30 p-6 backdrop-blur-2xl">
      <p className="text-xs uppercase tracking-[0.18em] text-white/30">
        {label}
      </p>

      <p className="sans-display mt-4 text-4xl text-white">
        {value}
      </p>

      <p className="mt-2 text-xs text-white/30">
        {detail}
      </p>
    </div>
  );
}

function ActionCard({
  icon,
  title,
  text,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="
        group
        rounded-[26px]
        border border-white/10
        bg-black/30
        p-6
        text-left
        backdrop-blur-2xl
        transition
        hover:-translate-y-1
        hover:border-blue-400/25
        hover:bg-blue-500/[0.035]
      "
    >
      <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-300">
        {icon}
      </div>

      <div className="flex items-center justify-between">
        <h3 className="sans-display text-xl text-white">
          {title}
        </h3>

        <ArrowRight className="h-4 w-4 text-white/25 transition group-hover:translate-x-1 group-hover:text-white" />
      </div>

      <p className="mt-3 text-sm leading-6 text-white/40">
        {text}
      </p>
    </button>
  );
}