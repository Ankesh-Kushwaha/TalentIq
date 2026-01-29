import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const SetTestCases = () => {
  const { state } = useLocation();
  const problemId = state?.problemId || "696e933e23962c3153a8202f";

  const [testCases, setTestCases] = useState([]);

  /* ---------------- LOAD EXISTING TESTCASES ---------------- */
  useEffect(() => {
    // MOCK DATA – replace with API later
    setTestCases([
      {
        problemId,
        input: "4\n2 7 11 15\n9",
        output: "0 1",
        isSample: true,
      },
      {
        problemId,
        input: "3\n3 2 4\n6",
        output: "1 2",
        isSample: true,
      },
      {
        problemId,
        input: "5\n1 2 3 4 5\n9",
        output: "3 4",
        isSample: false,
      },
    ]);
  }, [problemId]);

  /* ---------------- HANDLERS ---------------- */

  const addTestCase = () => {
    setTestCases((prev) => [
      ...prev,
      {
        problemId,
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

  const saveTestCases = () => {
    // STRICT FORMAT OUTPUT
    console.log("Submitting Testcases:", testCases);

    /*
      POST /api/testcases
      body: testCases
    */
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="max-w-5xl space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Set Test Cases</h2>
        <p className="text-sm text-gray-400">
          Manage input/output testcases for this problem
        </p>
      </div>

      {/* Testcase Cards */}
      <div className="space-y-4">
        {testCases.map((tc, index) => (
          <div
            key={index}
            className="bg-[#111] border border-[#1f2937] rounded-xl p-4 space-y-4"
          >
            <div className="flex justify-between items-center">
              <h4 className="font-semibold">Testcase #{index + 1}</h4>
              <button
                onClick={() => removeTestCase(index)}
                className="text-red-400 text-sm"
              >
                Delete
              </button>
            </div>

            {/* Input */}
            <div>
              <label className="text-sm text-gray-400">Input</label>
              <textarea
                value={tc.input}
                onChange={(e) => updateTestCase(index, "input", e.target.value)}
                className="w-full bg-black border border-gray-700 rounded p-2 mt-1 text-sm"
                rows={4}
                required
              />
            </div>

            {/* Output */}
            <div>
              <label className="text-sm text-gray-400">Output</label>
              <textarea
                value={tc.output}
                onChange={(e) =>
                  updateTestCase(index, "output", e.target.value)
                }
                className="w-full bg-black border border-gray-700 rounded p-2 mt-1 text-sm"
                rows={2}
                required
              />
            </div>

            {/* Sample Toggle */}
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

      {/* Actions */}
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
