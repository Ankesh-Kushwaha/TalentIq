import React, { useState } from "react";

const mockProblems = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    status: "approved",
    submissions: 12450,
    acceptance: "62%",
    createdBy: "admin1",
  },
  {
    id: 2,
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    status: "pending",
    submissions: 5321,
    acceptance: "41%",
    createdBy: "admin2",
  },
  {
    id: 3,
    title: "Median of Two Sorted Arrays",
    difficulty: "Hard",
    status: "disabled",
    submissions: 2120,
    acceptance: "29%",
    createdBy: "admin1",
  },
];

const difficulties = ["All", "Easy", "Medium", "Hard"];
const statuses = ["All", "approved", "pending", "disabled"];

function AllProblems() {
  const [problems, setProblems] = useState(mockProblems);
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("All");
  const [status, setStatus] = useState("All");

  const filteredProblems = problems.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase());

    const matchesDifficulty =
      difficulty === "All" || p.difficulty === difficulty;

    const matchesStatus = status === "All" || p.status === status;

    return matchesSearch && matchesDifficulty && matchesStatus;
  });

  const updateProblem = (id, updates) => {
    setProblems((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p)),
    );
  };

  const deleteProblem = (id) => {
    if (!confirm("Are you sure you want to delete this problem?")) return;
    setProblems((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold">Problems Management</h2>
        <p className="text-sm text-gray-400">
          Review, approve, and control all coding problems
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <input
          type="text"
          placeholder="Search by problem title..."
          className="bg-[#111] border border-[#1f2937] rounded px-4 py-2 text-sm outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="bg-[#111] border border-[#1f2937] rounded px-3 py-2 text-sm"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          {difficulties.map((d) => (
            <option key={d}>{d}</option>
          ))}
        </select>

        <select
          className="bg-[#111] border border-[#1f2937] rounded px-3 py-2 text-sm"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          {statuses.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* Problems Table */}
      <div className="overflow-x-auto bg-[#111] border border-[#1f2937] rounded">
        <table className="w-full text-sm">
          <thead className="bg-[#0b0b0b] text-gray-400">
            <tr>
              <th className="text-left px-4 py-3">Title</th>
              <th className="text-left px-4 py-3">Difficulty</th>
              <th className="text-left px-4 py-3">Status</th>
              <th className="text-left px-4 py-3">Submissions</th>
              <th className="text-left px-4 py-3">Acceptance</th>
              <th className="text-left px-4 py-3">Created By</th>
              <th className="text-right px-4 py-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredProblems.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-500">
                  No problems found
                </td>
              </tr>
            )}

            {filteredProblems.map((problem) => (
              <tr
                key={problem.id}
                className="border-t border-[#1f2937] hover:bg-[#0f172a]"
              >
                <td className="px-4 py-3 font-medium">{problem.title}</td>

                <td className="px-4 py-3">
                  <DifficultyBadge level={problem.difficulty} />
                </td>

                <td className="px-4 py-3">
                  <StatusBadge status={problem.status} />
                </td>

                <td className="px-4 py-3 text-gray-400">
                  {problem.submissions}
                </td>

                <td className="px-4 py-3 text-gray-400">
                  {problem.acceptance}
                </td>

                <td className="px-4 py-3 text-gray-400">{problem.createdBy}</td>

                <td className="px-4 py-3 text-right space-x-2">
                  {problem.status === "pending" && (
                    <>
                      <button
                        onClick={() =>
                          updateProblem(problem.id, { status: "approved" })
                        }
                        className="text-xs text-green-400 hover:underline"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() =>
                          updateProblem(problem.id, { status: "disabled" })
                        }
                        className="text-xs text-red-400 hover:underline"
                      >
                        Reject
                      </button>
                    </>
                  )}

                  {problem.status === "approved" && (
                    <button
                      onClick={() =>
                        updateProblem(problem.id, { status: "disabled" })
                      }
                      className="text-xs text-yellow-400 hover:underline"
                    >
                      Disable
                    </button>
                  )}

                  {problem.status === "disabled" && (
                    <button
                      onClick={() =>
                        updateProblem(problem.id, { status: "approved" })
                      }
                      className="text-xs text-green-400 hover:underline"
                    >
                      Enable
                    </button>
                  )}

                  <button className="text-xs text-indigo-400 hover:underline">
                    Edit
                  </button>

                  <button
                    onClick={() => deleteProblem(problem.id)}
                    className="text-xs text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <SummaryCard title="Total Problems" value={problems.length} />
        <SummaryCard
          title="Approved"
          value={problems.filter((p) => p.status === "approved").length}
        />
        <SummaryCard
          title="Pending Review"
          value={problems.filter((p) => p.status === "pending").length}
        />
        <SummaryCard
          title="Disabled"
          value={problems.filter((p) => p.status === "disabled").length}
        />
      </div>
    </div>
  );
}

/* ---------- Small Components ---------- */

function DifficultyBadge({ level }) {
  const colors = {
    Easy: "bg-green-500/10 text-green-400",
    Medium: "bg-yellow-500/10 text-yellow-400",
    Hard: "bg-red-500/10 text-red-400",
  };

  return (
    <span className={`text-xs px-2 py-1 rounded ${colors[level]}`}>
      {level}
    </span>
  );
}

function StatusBadge({ status }) {
  const colors = {
    approved: "bg-green-500/10 text-green-400",
    pending: "bg-yellow-500/10 text-yellow-400",
    disabled: "bg-red-500/10 text-red-400",
  };

  return (
    <span className={`text-xs px-2 py-1 rounded ${colors[status]}`}>
      {status}
    </span>
  );
}

function SummaryCard({ title, value }) {
  return (
    <div className="bg-[#111] border border-[#1f2937] rounded p-4">
      <p className="text-sm text-gray-400">{title}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
  );
}

export default AllProblems;
