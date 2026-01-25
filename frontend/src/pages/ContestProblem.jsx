const problems = [
  { id: "A", title: "Array Rotation", solved: true, score: 100, attempts: 1 },
  { id: "B", title: "Graph Paths", solved: false, score: 0, attempts: 2 },
  { id: "C", title: "DP Optimization", solved: true, score: 200, attempts: 3 },
];

export default function ContestProblems() {
  return (
    <div className="min-h-screen bg-[#0f0f0f] text-gray-200 px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6">Contest Problems</h1>

        <table className="w-full text-sm bg-[#111] border border-[#1f2937] rounded-xl">
          <thead className="bg-[#0b0f19] text-gray-400">
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Status</th>
              <th>Score</th>
              <th>Attempts</th>
            </tr>
          </thead>
          <tbody>
            {problems.map((p) => (
              <tr key={p.id} className="border-t border-[#1f2937]">
                <td className="text-center">{p.id}</td>
                <td className="text-white">{p.title}</td>
                <td className="text-center">
                  {p.solved ? (
                    <span className="text-green-400">Solved</span>
                  ) : (
                    <span className="text-yellow-400">Unsolved</span>
                  )}
                </td>
                <td className="text-center">{p.score}</td>
                <td className="text-center">{p.attempts}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
