/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { globalSearch } from "../../apis/problems.api";
import { useDebounce } from "../../hooks/usedebounce";
import { createTestCase } from "../../apis/problems.api";


const SetTestCases = () => {
  const [search, setSearch] = useState("");
  const [problems, setProblems] = useState([]);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [testCases, setTestCases] = useState([]);

const debouncedSearch = useDebounce(search, 500);

useEffect(() => {
  if (!debouncedSearch.trim()) {
    setProblems([]);
    return;
  }

  const fetchProblems = async () => {
    const data = await globalSearch(debouncedSearch);
    setProblems(data.data);
  };

  fetchProblems();
}, [debouncedSearch]);


  const addTestCase = () => {
    if (!selectedProblem) return alert("Select a problem first");

    setTestCases((prev) => [
      ...prev,
      {
        problemId: selectedProblem._id,
        input: "",
        output: "",
        isSample: false,
      },
    ]);
  };

  const updateTestCase = (index, field, value) => {
    setTestCases((prev) =>
      prev.map((tc, i) => (i === index ? { ...tc, [field]: value } : tc)),
    );
  };

  const removeTestCase = (index) => {
    if (!confirm("Delete this testcase?")) return;
    setTestCases((prev) => prev.filter((_, i) => i !== index));
  };

  const saveTestCases = async() => {
    if (!selectedProblem) return;

    const payload = testCases.map((tc) => ({
      problemId: selectedProblem._id,
      input: tc.input,
      output: tc.output,
      isSample: tc.isSample,
    }));

    console.log("STRICT PAYLOAD:", payload);
    
    const auth = JSON.parse(localStorage.getItem('auth'));
    const token = auth.token;
    await createTestCase({payload,token})
  };


  return (
    <div className="max-w-5xl space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Set Test Cases</h2>
        <p className="text-sm text-gray-400">
          Search a problem and manage its testcases
        </p>
      </div>

      <div className="relative">
        <input
          type="text"
          placeholder="Search problem by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-black border border-gray-700 rounded p-2"
        />

        {problems.length > 0 && (
          <div className="absolute z-10 w-full bg-[#111] border border-[#1f2937] rounded mt-1 max-h-48 overflow-y-auto">
            {problems.map((p) => (
              <div
                key={p._id}
                onClick={() => {
                  setSelectedProblem(p);
                  setProblems([]);
                  setSearch(p.title);
                  setTestCases([]);
                }}
                className="px-3 py-2 hover:bg-gray-800 cursor-pointer"
              >
                <p className="text-sm text-white">{p.title}</p>
                <p className="text-xs text-gray-400">{p.slug}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedProblem && (
        <div className="text-sm text-green-400">
          Selected Problem: <b>{selectedProblem.title}</b>
        </div>
      )}

      {/* -------- Testcases -------- */}
      <div className="space-y-4">
        {testCases.map((tc, index) => (
          <div
            key={index}
            className="bg-[#111] border border-[#1f2937] rounded-xl p-4 space-y-4"
          >
            <div className="flex justify-between">
              <h4 className="font-semibold">Testcase #{index + 1}</h4>
              <button
                onClick={() => removeTestCase(index)}
                className="text-red-400 text-sm"
              >
                Delete
              </button>
            </div>

            <textarea
              placeholder="Input"
              value={tc.input}
              onChange={(e) => updateTestCase(index, "input", e.target.value)}
              rows={4}
              className="w-full bg-black border border-gray-700 rounded p-2 text-sm"
            />

            <textarea
              placeholder="Output"
              value={tc.output}
              onChange={(e) => updateTestCase(index, "output", e.target.value)}
              rows={2}
              className="w-full bg-black border border-gray-700 rounded p-2 text-sm"
            />

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={tc.isSample}
                onChange={(e) =>
                  updateTestCase(index, "isSample", e.target.checked)
                }
              />
              Sample Testcase
            </label>
          </div>
        ))}
      </div>

      {/* -------- Actions -------- */}
      <div className="flex gap-3">
        <button
          onClick={addTestCase}
          className="px-4 py-2 bg-gray-800 rounded hover:bg-gray-700"
        >
          + Add Testcase
        </button>

        <button
          onClick={saveTestCases}
          className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-500"
        >
          Save Testcases
        </button>
      </div>
    </div>
  );
};

export default SetTestCases;
