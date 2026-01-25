export const contestMode = {
  enabled: false,
  endsIn: "00:42:18",
};

export const runtimeDistribution = [
  { range: "<5ms", count: 420 },
  { range: "5–10ms", count: 312 },
  { range: "10–20ms", count: 180 },
  { range: ">20ms", count: 88 },
];

export const submissionHistory = Array.from({ length: 17 }).map((_, i) => ({
  id: i + 1,
  language: ["C++", "Java", "Python"][i % 3],
  status: i === 0 ? "Accepted" : i % 2 ? "Wrong Answer" : "TLE",
  runtime: i === 0 ? "3 ms" : "-",
  memory: i === 0 ? "6.2 MB" : "-",
  time: `${i + 1} hours ago`,
}));
