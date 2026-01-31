// import {
//   hintPrompt,
//   debugPrompt,
//   explainPrompt,
//   optimizationPrompt
// } from "./prompts.js";

// export function routePrompt(payload) {
//   const {
//     action,
//     verdict,
//     hintLevel,
//     code,
//     language,
//     problemId
//   } = payload;

//   if (action === "hint") {
//     return hintPrompt({
//       code,
//       hintLevel
//     });
//   }

//   if (action === "debug") {
//     if (verdict === "TLE") {
//       return optimizationPrompt({ code });
//     }
//     return debugPrompt({ code });
//   }

//   if (action === "explain") {
//     return explainPrompt({ code });
//   }

//   throw new Error("Unknown AI action");
// }
