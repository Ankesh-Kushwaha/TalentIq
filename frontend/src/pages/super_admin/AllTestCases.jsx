import React, { useState } from "react";

const mockTestCases = [
  {
    id: 1,
    input: "2\n1 2",
    output: "3",
    visibility: "hidden",
    status: "active",
    weight: 1,
  },
  {
    id: 2,
    input: "5\n1 2 3 4 5",
    output: "15",
    visibility: "hidden",
    status: "active",
    weight: 2,
  },
  {
    id: 3,
    input: "1\n100",
    output: "100",
    visibility: "public",
    status: "disabled",
    weight: 1,
  },
];

function AllTestCases() {
  const [testCases, setTestCases] = useState(mockTestCases);
  const [search, setSearch] = useState("");
  const [selectedProblem] = useState("Two Sum");

  const filteredTestCases = testCases.filter(
    (t) =>
      t.input.toLowerCase().includes(search.toLowerCase()) ||
      t.output.toLowerCase().includes(search.toLowerCase()),
  );

  const updateTestCase = (id, updates) => {
    setTestCases((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates } : t)),
    );
  };

  const deleteTestCase = (id) => {
    if (!confirm("Are you sure you want to delete this test case?")) return;
    setTestCases((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold">Test Case Management</h2>
        <p className="text-sm text-gray-400">
          Managing test cases for:{" "}
          <span className="text-indigo-400">{selectedProblem}</span>
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-3 items-center">
        <input
          type="text"
          placeholder="Search test cases..."
          className="bg-[#111] border border-[#1f2937] rounded px-4 py-2 text-sm outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button className="bg-indigo-600 hover:bg-indigo-500 text-sm px-4 py-2 rounded">
          + Add Test Case
        </button>
      </div>

      {/* Test Case Table */}
      <div className="overflow-x-auto bg-[#111] border border-[#1f2937] rounded">
        <table className="w-full text-sm">
          <thead className="bg-[#0b0b0b] text-gray-400">
            <tr>
              <th className="text-left px-4 py-3">Input</th>
              <th className="text-left px-4 py-3">Expected Output</th>
              <th className="text-left px-4 py-3">Weight</th>
              <th className="text-left px-4 py-3">Visibility</th>
              <th className="text-left px-4 py-3">Status</th>
              <th className="text-right px-4 py-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredTestCases.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500">
                  No test cases found
                </td>
              </tr>
            )}

            {filteredTestCases.map((tc) => (
              <tr
                key={tc.id}
                className="border-t border-[#1f2937] hover:bg-[#0f172a]"
              >
                <td className="px-4 py-3 max-w-xs truncate font-mono">
                  {tc.input}
                </td>

                <td className="px-4 py-3 max-w-xs truncate font-mono">
                  {tc.output}
                </td>

                <td className="px-4 py-3 text-gray-400">{tc.weight}</td>

                <td className="px-4 py-3">
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      tc.visibility === "hidden"
                        ? "bg-purple-500/10 text-purple-400"
                        : "bg-green-500/10 text-green-400"
                    }`}
                  >
                    {tc.visibility}
                  </span>
                </td>

                <td className="px-4 py-3">
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      tc.status === "active"
                        ? "bg-green-500/10 text-green-400"
                        : "bg-red-500/10 text-red-400"
                    }`}
                  >
                    {tc.status}
                  </span>
                </td>

                <td className="px-4 py-3 text-right space-x-2">
                  <button
                    onClick={() =>
                      updateTestCase(tc.id, {
                        visibility:
                          tc.visibility === "hidden" ? "public" : "hidden",
                      })
                    }
                    className="text-xs text-indigo-400 hover:underline"
                  >
                    Toggle Visibility
                  </button>

                  <button
                    onClick={() =>
                      updateTestCase(tc.id, {
                        status: tc.status === "active" ? "disabled" : "active",
                      })
                    }
                    className="text-xs text-yellow-400 hover:underline"
                  >
                    {tc.status === "active" ? "Disable" : "Enable"}
                  </button>

                  <button className="text-xs text-indigo-400 hover:underline">
                    Edit
                  </button>

                  <button
                    onClick={() => deleteTestCase(tc.id)}
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
        <SummaryCard title="Total Test Cases" value={testCases.length} />
        <SummaryCard
          title="Hidden"
          value={testCases.filter((t) => t.visibility === "hidden").length}
        />
        <SummaryCard
          title="Public"
          value={testCases.filter((t) => t.visibility === "public").length}
        />
        <SummaryCard
          title="Disabled"
          value={testCases.filter((t) => t.status === "disabled").length}
        />
      </div>
    </div>
  );
}

/* ---------- Small Components ---------- */

function SummaryCard({ title, value }) {
  return (
    <div className="bg-[#111] border border-[#1f2937] rounded p-4">
      <p className="text-sm text-gray-400">{title}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
  );
}

export default AllTestCases;
