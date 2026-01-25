export const problem = {
  id: "two-sum",
  title: "Two Sum",
  difficulty: "Easy",
  tags: ["Array", "Hash Table"],
  description: `
Given an array of integers nums and an integer target,
return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution,
and you may not use the same element twice.
`,
  examples: [
    {
      input: "nums = [2,7,11,15], target = 9",
      output: "[0,1]",
    },
    {
      input: "nums = [3,2,4], target = 6",
      output: "[1,2]",
    },
  ],
  constraints: [
    "2 ≤ nums.length ≤ 10⁴",
    "-10⁹ ≤ nums[i] ≤ 10⁹",
    "-10⁹ ≤ target ≤ 10⁹",
  ],
};

export const problemStats = {
  totalSubmissions: 102441,
  acceptedSubmissions: 52341,
  usersSolvingNow: 1248,
};


