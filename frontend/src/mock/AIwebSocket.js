export function createMockAIWebSocket(onMessage, onThinking) {
  return {
    send(payload) {
      const { action, hintLevel } = JSON.parse(payload);

      onThinking(true);

      const streams = {
        hint: [
          [
            "I notice you're looping multiple times.",
            "This could be inefficient for large inputs.",
            "Think about storing previously seen values."
          ],
          [
            "You’re recomputing results unnecessarily.",
            "Is there a way to trade memory for speed?"
          ],
          [
            "This problem is commonly solved using a hash-based lookup."
          ]
        ],
        debug: [
          "Your code fails when duplicate elements appear.",
          "The assumption that values are unique breaks.",
          "Consider tracking seen elements safely."
        ],
        explain: [
          "Your code checks all pairs, which is O(n²).",
          "This works for small inputs but fails at scale."
        ]
      };

      const msgs =
        action === "hint"
          ? streams.hint[Math.min(hintLevel, 2)]
          : streams[action];

      msgs.forEach((msg, i) => {
        setTimeout(() => {
          onMessage(msg);
          if (i === msgs.length - 1) onThinking(false);
        }, i * 700);
      });
    },
    close() {}
  };
}
