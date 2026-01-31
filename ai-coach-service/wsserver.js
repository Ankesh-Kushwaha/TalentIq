// import WebSocket from "ws";
// import { routePrompt } from "./promptRouter.js";
// import { callLLMStream } from "./llmAdapter.js";

// const wss = new WebSocket.Server({ port: 8081 });

// wss.on("connection", (ws) => {
//   ws.on("message", async (raw) => {
//     const msg = JSON.parse(raw);

//     if (msg.type !== "AI_REQUEST") return;

//     const { payload } = msg;

//     /* =========================
//        ANTI-CHEAT GUARD
//     ========================= */
//     if (
//       payload.attemptCount === 0 &&
//       payload.timeSpent < 60
//     ) {
//       ws.send(JSON.stringify({
//         type: "AI_MESSAGE",
//         content: "Try solving a bit before using AI."
//       }));
//       return;
//     }

//     /* =========================
//        PROMPT ROUTING
//     ========================= */
//     const prompt = routePrompt(payload);

//     ws.send(JSON.stringify({ type: "THINKING_START" }));

//     /* =========================
//        STREAM FROM LLM
//     ========================= */
//     for await (const chunk of callLLMStream(prompt)) {
//       ws.send(JSON.stringify({
//         type: "AI_MESSAGE",
//         content: chunk
//       }));
//     }

//     ws.send(JSON.stringify({ type: "THINKING_END" }));
//   });
// });

// console.log("AI WS Server running on :8081");


//client -> request server =>
//   {
//   "type": "AI_REQUEST",
//   "payload": {
//     "action": "hint" | "debug" | "explain",
//     "problemId": "two-sum",
//     "code": "user code here",
//     "language": "cpp",
//     "verdict": "WA",
//     "hintLevel": 1,
//     "attemptCount": 1,
//     "timeSpent": 120
//   }
// }

//server -> stream to the client 
// { "type": "THINKING_START" }
// { "type": "AI_MESSAGE", "content": "Observation…" }
// { "type": "AI_MESSAGE", "content": "Another thought…" }
// { "type": "THINKING_END" }

