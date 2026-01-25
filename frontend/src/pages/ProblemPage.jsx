import { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";

import ProblemNavbar from "../components/ProblemNavBar";
import ProblemFooter from "../components/ProblemFooter";

import { problem, problemStats } from "../mock/problemData";
import { boilerplate } from "../utils/boilerPlate";
import { runCodeAPI, submitCodeAPI } from "../apis/judge";

export default function ProblemPage() {
  /* =======================
     STATE
  ======================== */
  const [layout, setLayout] = useState("split");
  const [language, setLanguage] = useState("cpp");
  const [code, setCode] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [verdict, setVerdict] = useState(null);

  /* =======================
     LOAD + AUTOSAVE CODE
  ======================== */
  useEffect(() => {
    const saved =
      localStorage.getItem(`${problem.id}-${language}`) ||
      boilerplate[language];
    setCode(saved);
  }, [language]);

  useEffect(() => {
    localStorage.setItem(`${problem.id}-${language}`, code);
  }, [code, language]);

  /* =======================
     RUN / SUBMIT
  ======================== */
  const runCode = async () => {
    try {
      setLoading(true);
      setOutput("Running...");
      const res = await runCodeAPI({ code, language, input });
      setOutput(
        `Output:\n${res.output}\n\nRuntime: ${res.runtime}\nMemory: ${res.memory}`,
      );
    } finally {
      setLoading(false);
    }
  };

  const submitCode = async () => {
    try {
      setLoading(true);
      const res = await submitCodeAPI({ code, language });
      setVerdict(res);
    } finally {
      setLoading(false);
    }
  };

  /* =======================
     RENDER
  ======================== */
  return (
    <div className="h-screen">
      {/* Top Navbar */}
      <ProblemNavbar layout={layout} setLayout={setLayout} />

      {/* Main Layout */}
      <div
        className={`h-[calc(100vh-96px)] ${
          layout === "split"
            ? "grid grid-cols-1 lg:grid-cols-2"
            : "grid grid-cols-1"
        }`}
      >
        {/* =======================
            LEFT: PROBLEM PANEL
        ======================== */}
        {layout !== "editor" && (
          <section className="border-r border-[#1f2937] flex flex-col h-full">
            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <h1 className="text-2xl font-semibold mb-1">{problem.title}</h1>

              {/* Difficulty + Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-xs px-2 py-1 bg-green-900 text-green-300 rounded">
                  {problem.difficulty}
                </span>
                {problem.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 bg-[#1a1a1a] text-gray-300 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Description */}
              <p className="text-gray-300 whitespace-pre-line">
                {problem.description}
              </p>

              {/* Examples */}
              <h3 className="font-semibold mt-6 mb-2">Examples</h3>
              {problem.examples.map((ex, idx) => (
                <pre key={idx} className="mb-3">
                  Input: {ex.input}
                  Output: {ex.output}
                </pre>
              ))}

              {/* Constraints */}
              <h3 className="font-semibold mt-6 mb-2">Constraints</h3>
              <ul className="list-disc pl-6 text-gray-300">
                {problem.constraints.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>

            {/* Sticky Footer */}
            <ProblemFooter stats={problemStats} />
          </section>
        )}

        {/* =======================
            RIGHT: EDITOR PANEL
        ======================== */}
        {layout !== "problem" && (
          <section className="flex flex-col h-full">
            {/* Toolbar */}
            <div className="flex justify-between items-center px-4 py-2 bg-[#111] border-b border-[#1f2937]">
              <div className="flex gap-2">
                {["cpp", "java", "python"].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={`px-3 py-1 text-sm rounded ${
                      language === lang
                        ? "bg-yellow-400 text-black"
                        : "bg-[#1a1a1a] text-gray-300 hover:bg-[#2a2a2a]"
                    }`}
                  >
                    {lang.toUpperCase()}
                  </button>
                ))}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={runCode}
                  disabled={loading}
                  className="px-4 py-1.5 border border-[#2a2a2a] rounded hover:bg-[#1a1a1a]"
                >
                  Run
                </button>
                <button
                  onClick={submitCode}
                  disabled={loading}
                  className="px-4 py-1.5 bg-green-600 text-white rounded hover:bg-green-500"
                >
                  Submit
                </button>
              </div>
            </div>

            {/* Monaco Editor */}
            <Editor
              height="55%"
              theme="vs-dark"
              language={language === "cpp" ? "cpp" : language}
              value={code}
              onChange={setCode}
              options={{
                fontSize: 14,
                minimap: { enabled: false },
                automaticLayout: true,
                scrollBeyondLastLine: false,
              }}
            />

            {/* Console */}
            <div className="h-[25%] bg-[#0b0f19] border-t border-[#1f2937] p-3">
              <textarea
                placeholder="Custom Input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full bg-[#020617] p-2 text-sm rounded mb-2 resize-none"
              />
              <pre className="text-sm text-gray-300 whitespace-pre-wrap">
                {output || "Output will appear here"}
              </pre>
            </div>
          </section>
        )}
      </div>

      {/* =======================
          VERDICT MODAL
      ======================== */}
      {verdict && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-[#111] p-6 rounded-xl border border-[#1f2937] w-[300px]">
            <h2 className="text-xl font-semibold text-green-400">
              {verdict.verdict}
            </h2>
            <p className="mt-2 text-gray-300">Runtime: {verdict.runtime}</p>
            <p className="text-gray-300">Memory: {verdict.memory}</p>
            <button
              onClick={() => setVerdict(null)}
              className="mt-4 w-full px-4 py-1.5 bg-yellow-400 text-black rounded hover:bg-yellow-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
