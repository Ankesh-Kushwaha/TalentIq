// export async function* callLLMStream(prompt) {
//   const stream = await openai.responses.stream({
//     model: "gpt-4.1-mini",
//     input: prompt
//   });

//   for await (const event of stream) {
//     if (event.type === "response.output_text.delta") {
//       yield event.delta;
//     }
//   }
// }
