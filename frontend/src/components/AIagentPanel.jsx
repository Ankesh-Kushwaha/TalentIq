import { useEffect, useRef, useState } from "react";

/* =======================
   MOCK STREAMING AI SOCKET
======================= */
function createMockAIWebSocket(onMessage, onThinking) {
  return {
    send(payload) {
      const { action, hintLevel } = JSON.parse(payload);
      onThinking(true);

      const responses = {
        hint: [
          [
            "I notice repeated computations in your approach.",
            "This can become slow for large inputs.",
            "Think about storing results you’ve already seen.",
          ],
          [
            "You are recomputing values unnecessarily.",
            "Can memory be used to reduce time complexity?",
          ],
          ["This problem benefits from constant-time lookups."],
        ],
        debug: [
          "Your code fails when duplicate values appear.",
          "The assumption of uniqueness breaks here.",
          "Track elements more safely.",
        ],
        explain: [
          "Your solution checks all pairs (O(n²)).",
          "This works for small inputs but fails at scale.",
        ],
      };

      const stream =
        action === "hint"
          ? responses.hint[Math.min(hintLevel, 2)]
          : responses[action];

      stream.forEach((msg, i) => {
        setTimeout(() => {
          onMessage(msg);
          if (i === stream.length - 1) onThinking(false);
        }, i * 700);
      });
    },
    close() {},
  };
}

export default function AIagentPanel({
  problemId,
  code,
  submissionResult,
  attemptCount,
  timeSpent,
  onClose,
}) {
  const wsRef = useRef(null);

  const [messages, setMessages] = useState([]);
  const [hintLevel, setHintLevel] = useState(0);
  const [thinking, setThinking] = useState(false);
  const [locked, setLocked] = useState(false);

  /* =======================
     LOAD MEMORY
  ======================= */
  useEffect(() => {
    const saved = localStorage.getItem(`ai-${problemId}`);
    if (saved) {
      const data = JSON.parse(saved);
      setMessages(data.messages || []);
      setHintLevel(data.hintLevel || 0);
    }
  }, [problemId]);

  useEffect(() => {
    localStorage.setItem(
      `ai-${problemId}`,
      JSON.stringify({ messages, hintLevel }),
    );
  }, [messages, hintLevel, problemId]);

  /* =======================
     ANTI-CHEAT
  ======================= */
  useEffect(() => {
    setLocked(attemptCount === 0 && timeSpent < 60);
  }, [attemptCount, timeSpent]);

  /* =======================
     INIT AI SOCKET
  ======================= */
  useEffect(() => {
    wsRef.current = createMockAIWebSocket(
      (msg) => setMessages((prev) => [...prev, { from: "ai", text: msg }]),
      setThinking,
    );
    return () => wsRef.current.close();
  }, []);

  const send = (action) => {
    if (locked) return;

    wsRef.current.send(
      JSON.stringify({
        action,
        hintLevel,
        code,
        verdict: submissionResult?.status,
      }),
    );

    setMessages((prev) => [...prev, { from: "user", text: action }]);
    if (action === "hint") setHintLevel((h) => h + 1);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="px-4 py-2 border-b border-[#1f2937] flex justify-between">
        <h3 className="font-semibold text-purple-400">AI Coach</h3>
        <button onClick={onClose}>✕</button>
      </div>

      <div className="p-3 flex gap-2 flex-wrap">
        <button onClick={() => send("hint")}>
          💡 Hint (Lv {hintLevel + 1})
        </button>
        <button disabled={!submissionResult} onClick={() => send("debug")}>
          🐞 Debug
        </button>
        <button onClick={() => send("explain")}>🧠 Explain</button>
      </div>

      {locked && (
        <div className="px-3 text-xs text-red-400">
          Try solving before using AI
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`p-2 rounded text-sm ${
              m.from === "ai" ? "bg-[#020617]" : "bg-purple-900/40"
            }`}
          >
            {m.text}
          </div>
        ))}

        {thinking && (
          <div className="text-xs text-gray-400 animate-pulse">
            AI is thinking…
          </div>
        )}
      </div>
    </div>
  );
}
