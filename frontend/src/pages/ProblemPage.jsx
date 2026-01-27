import { useEffect, useState, useRef } from "react";
import Editor from "@monaco-editor/react";
import { useParams } from "react-router-dom";

import ProblemNavbar from "../components/ProblemNavBar";
import ProblemFooter from "../components/ProblemFooter";

import { boilerplate } from "../utils/boilerPlate";
import { runCodeAPI, submitCodeAPI } from "../apis/judge";
import {
  getASingleProblem,
  getAsingleProblemStats,
  getTestCases,
} from "../apis/problems.api";
import { useAuthContext } from "../hooks/useAuthContext";

const wss_url = import.meta.env.VITE_WS_URL;

export default function ProblemPage() {
  const { problemId } = useParams();
  const { user ,token} = useAuthContext();

  const wsRef = useRef(null);

  const [layout, setLayout] = useState("split");
  const [language, setLanguage] = useState("cpp");
  const [code, setCode] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const [problem, setProblem] = useState(null);
  const [problemStats, setProblemStats] = useState(null);
  const [testCases, setTestCases] = useState([]);

  const [submissionResult, setSubmissionResult] = useState(null);

  /* =======================
     FETCH PROBLEM DATA
  ======================= */
  useEffect(() => {
    const fetchData = async () => {
      const problemRes = await getASingleProblem(problemId);
      if (problemRes?.success) {
        setProblem({
          ...problemRes.problem,
          tags: problemRes.problem.tags || [],
        });
      }

      const statsRes = await getAsingleProblemStats(problemId);
      if (statsRes?.success) setProblemStats(statsRes);

      const tcRes = await getTestCases(problemId);
      setTestCases(tcRes?.testCases || []);
    };

    fetchData();
  }, [problemId]);

  /* =======================
     LOAD / SAVE CODE
  ======================= */
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

  /* =======================
     WEBSOCKET (VERDICT)
  ======================= */
  useEffect(() => {
    if (!user || wsRef.current) return; // FIX: prevent reconnect

    wsRef.current = new WebSocket(`${wss_url}/ws?userId=${user.userId}`);

    wsRef.current.onmessage = (event) => {
      const msg = JSON.parse(event.data);

      if (msg.type === "SUBMISSION_RESULT") {
        setSubmissionResult(msg.payload);
        setLoading(false);
      }
    };

    wsRef.current.onerror = () => {
      setLoading(false); // FIX
    };

    return () => wsRef.current?.close();
  }, [user]);

  /* =======================
     RUN CODE
  ======================= */
  const runCode = async () => {
    try {
      setLoading(true);
      setOutput("Running...");

      const res = await runCodeAPI({
        userId: user?.userId,
        problemId,
        code,
        language,
        input, // FIX: missing input
        token
      });

      setOutput(
        `Output:\n${res.output}\n\nRuntime: ${res.runtime}\nMemory: ${res.memory}`,
      );
    } catch (err) {
      setOutput("Error while running code"); // FIX
    } finally {
      setLoading(false); // FIX
    }
  };

  /* =======================
     SUBMIT CODE
  ======================= */
  const submitCode = async () => {
    try {
      setLoading(true);

      await submitCodeAPI({
        userId: user?.userId,
        problemId,
        code,
        language,
        token
      });
      // verdict arrives via WebSocket
    } catch (err) {
      setLoading(false); // FIX
    }
  };

  if (!problem) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-400">
        Loading problem...
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <ProblemNavbar layout={layout} setLayout={setLayout} />

      <div
        className={`flex-1 ${
          layout === "split"
            ? "grid grid-cols-1 lg:grid-cols-2"
            : "grid grid-cols-1"
        } overflow-hidden`}
      >
        {/* =======================
            LEFT PANEL
        ======================= */}
        {layout !== "editor" && (
          <section className="border-r border-[#1f2937] flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto p-6">
              <h1 className="text-2xl font-semibold">{problem.title}</h1>

              <div className="flex gap-2 my-3">
                <span className="text-xs px-2 py-1 bg-green-900 text-green-300 rounded">
                  {problem.difficulty}
                </span>
                {problem.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 bg-[#1a1a1a] rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <p className="whitespace-pre-line">{problem.description}</p>

              <h3 className="mt-6 font-semibold">Sample Testcases</h3>
              {testCases.slice(0, 3).map((tc, i) => (
                <pre key={i} className="bg-[#020617] p-3 rounded mt-2">
                  Input:
                  {"\n"}
                  {tc.input}
                  {"\n\n"}Output:
                  {"\n"}
                  {tc.output}
                </pre>
              ))}
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

        {/* =======================
            RIGHT PANEL
        ======================= */}
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

            <div className="flex-1">
              <Editor
                height="100%"
                theme="vs-dark"
                language={language}
                value={code}
                onChange={setCode}
                options={{ minimap: { enabled: false } }}
              />
            </div>

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
      </div>

      {/* =======================
          VERDICT MODAL
      ======================= */}
      {submissionResult && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-[#111] p-6 rounded w-[420px] max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-semibold text-green-400">
              {submissionResult.status}
            </h2>

            <p>Total Time: {submissionResult.totalTime} ms</p>

            <h3 className="mt-4 font-semibold">Testcases</h3>

            {submissionResult.results.map((tc, i) => (
              <div key={i} className="bg-[#020617] p-2 rounded mt-2">
                <div className="flex justify-between text-sm">
                  <span>#{i + 1}</span>
                  <span>{tc.status}</span>
                </div>
                <div className="text-xs">Time: {tc.time} ms</div>
                {tc.stdout && <pre className="mt-1">{tc.stdout}</pre>}
              </div>
            ))}

            <button
              onClick={() => setSubmissionResult(null)}
              className="mt-4 w-full bg-yellow-400 text-black py-1 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
