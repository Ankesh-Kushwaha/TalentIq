export const solutionData = {
  approach: `
### 💡 Approach

We use a hashmap to store numbers we have already seen.

For each element:
- Compute the complement = target - current number
- If complement exists in the map → solution found
- Otherwise, store current number with its index

This guarantees O(n) time complexity.
  `,
  complexity: `
### ⏱ Complexity Analysis

- Time Complexity: O(n)
- Space Complexity: O(n)
  `,
};

export const submissionHistory = [
  {
    id: 1,
    language: "C++",
    status: "Accepted",
    runtime: "3 ms",
    memory: "6.2 MB",
    time: "2 minutes ago",
  },
  {
    id: 2,
    language: "Python",
    status: "Wrong Answer",
    runtime: "-",
    memory: "-",
    time: "10 minutes ago",
  },
  {
    id: 3,
    language: "Java",
    status: "Time Limit Exceeded",
    runtime: "—",
    memory: "—",
    time: "1 hour ago",
  },
];
