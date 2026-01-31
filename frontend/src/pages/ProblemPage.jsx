import { useEffect, useState, useRef } from "react";
import Editor from "@monaco-editor/react";
import { useParams } from "react-router-dom";
import ProblemNavbar from "../components/ProblemNavBar";
import ProblemFooter from "../components/ProblemFooter";
import AIagentPanel from "../components/AIagentPanel";
import { boilerplate } from "../utils/boilerPlate";
import { runCodeAPI, submitCodeAPI } from "../apis/judge";
import {
  getASingleProblem,
  getAsingleProblemStats,
  getTestCases,
} from "../apis/problems.api";
import { useAuthContext } from "../hooks/useAuthContext";
import { toast } from "react-toastify";

const wss_url = import.meta.env.VITE_WS_URL;

export default function ProblemPage() {
  const { problemId } = useParams();
  const { user, token } = useAuthContext();
  const wsRef = useRef(null);

  const [layout, setLayout] = useState("split");
  const [aiOpen, setAiOpen] = useState(false);
  const [language, setLanguage] = useState("cpp");
  const [code, setCode] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const [problem, setProblem] = useState(null);
  const [problemStats, setProblemStats] = useState(null);
  const [testCases, setTestCases] = useState([]);
  const [submissionResult, setSubmissionResult] = useState(null);

  /* ---------------- FETCH DATA ---------------- */
  useEffect(() => {
    const fetchData = async () => {
      const problemRes = await getASingleProblem(problemId);
      if (problemRes?.success) {
        setProblem(problemRes.problem);
      }

      const statsRes = await getAsingleProblemStats(problemId);
      if (statsRes?.success) setProblemStats(statsRes);

      const tcRes = await getTestCases(problemId);
      setTestCases(tcRes?.testCases || []);
    };

    fetchData();
  }, [problemId]);

  /* ---------------- LOAD CODE ---------------- */
  useEffect(() => {
    if (!problem) return;

    const saved =
      localStorage.getItem(`${problem._id}-${language}`) ||
      boilerplate[language];

    setCode(saved);
  }, [language, problem]);

  useEffect(() => {
    if (!problem) return;
    localStorage.setItem(`${problem._id}-${language}`, code);
  }, [code, language, problem]);

  /* ---------------- WEBSOCKET ---------------- */
  useEffect(() => {
    if (!user || wsRef.current) return;

    wsRef.current = new WebSocket(`${wss_url}/ws?userId=${user.userId}`);

    wsRef.current.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.type === "SUBMISSION_RESULT") {
        setSubmissionResult(msg.payload);
        setLoading(false);
      }
    };

    wsRef.current.onerror = () => setLoading(false);
    return () => wsRef.current?.close();
  }, [user]);

  /* ---------------- RUN CODE ---------------- */
  const runCode = async () => {
    try {
      setLoading(true);
      toast.loading("Running code...");
      setOutput("Running...");

      const res = await runCodeAPI({
        userId: user?.userId,
        problemId,
        code,
        language,
        input,
        token,
      });

      toast.dismiss();
      setOutput(
        `Output:\n${res.output}\n\nRuntime: ${res.runtime}\nMemory: ${res.memory}`,
      );
    } catch {
      toast.error("Error while running code");
      setOutput("Runtime error");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- SUBMIT CODE ---------------- */
  const submitCode = async () => {
    try {
      setLoading(true);
      await submitCodeAPI({
        userId: user?.userId,
        problemId,
        code,
        language,
        token,
      });

      toast.info("Code submitted successfully");
    } catch {
      toast.error("Submission failed");
      setLoading(false);
    }
  };

  if (!problem) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-400">
        Loading problem...
      </div>
    );
  }

  /* ====================== UI ====================== */
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <ProblemNavbar layout={layout} setLayout={setLayout} />

      <div
        className={`flex-1 grid overflow-hidden transition-all duration-300
        ${
          layout === "split"
            ? aiOpen
              ? "grid-cols-1 lg:grid-cols-[30%_40%_30%]"
              : "grid-cols-1 lg:grid-cols-2"
            : "grid-cols-1"
        }`}
      >
        {/* -------- PROBLEM PANEL -------- */}
        {layout !== "editor" && (
          <section className="border-r border-[#1f2937] overflow-y-auto p-6">
            <h1 className="text-2xl font-semibold">{problem.title}</h1>

            <div className="flex gap-2 my-3">
              <span className="text-xs px-2 py-1 bg-green-900 text-green-300 rounded">
                {problem.difficulty}
              </span>
              {problem.tags?.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-1 bg-[#1a1a1a] rounded"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="space-y-6 text-sm leading-relaxed text-gray-300">
              <section>
                <h3 className="font-semibold text-lg mb-2">Description</h3>
                <p className="whitespace-pre-line">{problem.description}</p>
              </section>

              {problem.constraints && (
                <section>
                  <h3 className="font-semibold text-lg mb-2">Constraints</h3>
                  <pre className="bg-[#020617] p-3 rounded">
                    {problem.constraints}
                  </pre>
                </section>
              )}

              {problem.inputFormat && (
                <section>
                  <h3 className="font-semibold text-lg mb-2">Input Format</h3>
                  <pre className="bg-[#020617] p-3 rounded">
                    {problem.inputFormat}
                  </pre>
                </section>
              )}

              {problem.outputFormat && (
                <section>
                  <h3 className="font-semibold text-lg mb-2">Output Format</h3>
                  <pre className="bg-[#020617] p-3 rounded">
                    {problem.outputFormat}
                  </pre>
                </section>
              )}

              <section>
                <h3 className="font-semibold text-lg mb-2">Sample Testcases</h3>
                {testCases
                  .filter((tc) => tc.isSample)
                  .slice(0, 3)
                  .map((tc, i) => (
                    <pre key={i} className="bg-[#020617] p-3 rounded mt-2">
                      Input:
                      {"\n"}
                      {tc.input}
                      {"\n\n"}Output:
                      {"\n"}
                      {tc.output}
                    </pre>
                  ))}
              </section>
            </div>

            {problemStats && (
              <ProblemFooter
                stats={{
                  totalSubmissions: problemStats.totalSubmissions,
                  acceptedSubmissions: problemStats.submissionAccepted,
                  usersSolvingNow: problemStats.usersSolvingNow ?? 0,
                }}
              />
            )}
          </section>
        )}

        {/* -------- EDITOR PANEL -------- */}
        {layout !== "problem" && (
          <section className="flex flex-col overflow-hidden">
            <div className="flex justify-between px-4 py-2 border-b border-[#1f2937]">
              <div className="flex gap-2">
                {["cpp", "java", "python"].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={`px-3 py-1 rounded ${
                      language === lang
                        ? "bg-yellow-400 text-black"
                        : "bg-[#1a1a1a]"
                    }`}
                  >
                    {lang.toUpperCase()}
                  </button>
                ))}
              </div>

              <div className="flex gap-2">
                <button onClick={() => setAiOpen((p) => !p)}>🧠 AI</button>
                <button onClick={runCode} disabled={loading}>
                  Run
                </button>
                <button
                  onClick={submitCode}
                  disabled={loading}
                  className="bg-green-600 px-3 rounded"
                >
                  Submit
                </button>
              </div>
            </div>

            <Editor
              height="100%"
              theme="vs-dark"
              language={language}
              value={code}
              onChange={setCode}
              options={{ minimap: { enabled: false } }}
            />

            <div className="h-[30%] border-t border-[#1f2937] flex flex-col">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="bg-[#020617] p-2"
                placeholder="Custom input"
              />
              <pre className="flex-1 overflow-y-auto p-2">
                {output || "Output here"}
              </pre>
            </div>
          </section>
        )}

        {/* -------- AI PANEL -------- */}
        {aiOpen && (
          <section className="border-l border-[#1f2937] bg-[#0b1020]">
            <AIagentPanel
              problemId={problem._id}
              code={code}
              submissionResult={submissionResult}
              attemptCount={submissionResult ? 1 : 0}
              timeSpent={120}
              onClose={() => setAiOpen(false)}
            />
          </section>
        )}
      </div>
    </div>
  );
}
