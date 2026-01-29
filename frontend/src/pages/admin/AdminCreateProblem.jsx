import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

/* ---------------- MOCK FETCH ---------------- */

const mockFetchProblemById = async (id) => {
  await new Promise((r) => setTimeout(r, 500));
  if (id !== "1") return null;

  return {
    slug: "number-of-islands",
    title: "Number of Islands",
    description:
      "Given a 2D grid map of '1's (land) and '0's (water), return the number of islands.",
    difficulty: "HARD",
    tags: ["dfs", "bfs", "graph"],
    constraints: "1 <= m, n <= 300",
    inputFormat:
      "Grid rows separated by new lines with space-separated values.",
    outputFormat: "Single integer representing number of islands.",
    timeLimit: 2000,
    memoryLimit: 256,
    supportedLanguages: ["cpp", "python"],
    isPublished: true,
  };
};

const ALL_LANGUAGES = ["cpp", "python", "java", "javascript"];

export default function CreateEditProblem() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [form, setForm] = useState({
    slug: "",
    title: "",
    description: "",
    difficulty: "EASY",
    tags: "",
    constraints: "",
    inputFormat: "",
    outputFormat: "",
    timeLimit: 2000,
    memoryLimit: 256,
    supportedLanguages: [],
    isPublished: false,
  });

  const [loading, setLoading] = useState(isEditMode);
  const [error, setError] = useState(null);

  /* ---------------- LOAD (EDIT MODE) ---------------- */

  useEffect(() => {
    if (!isEditMode) return;

    const load = async () => {
      try {
        const data = await mockFetchProblemById(id);
        if (!data) {
          setError("Problem not found");
          return;
        }

        setForm({
          ...data,
          tags: data.tags.join(","),
        });
      } catch {
        setError("Failed to load problem");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id, isEditMode]);

  /* ---------------- SUBMIT ---------------- */

  const submit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      tags: form.tags.split(",").map((t) => t.trim()),
    };

    try {
      if (isEditMode) {
        console.log("PUT /api/admin/problems/" + id, payload);
      } else {
        console.log("POST /api/admin/problems", payload);
      }

      navigate("../");
    } catch {
      alert("Failed to save problem");
    }
  };

  /* ---------------- STATES ---------------- */

  if (loading) return <div className="text-gray-400">Loading problem…</div>;

  if (error)
    return (
      <div className="text-red-400">
        {error}{" "}
        <button className="underline ml-2" onClick={() => navigate(-1)}>
          Go back
        </button>
      </div>
    );

  /* ---------------- UI ---------------- */

  return (
    <div className="max-w-4xl">
      <h2 className="text-xl font-semibold mb-6">
        {isEditMode ? "Edit Problem" : "Create Problem"}
      </h2>

      <form
        onSubmit={submit}
        className="bg-[#111] border border-[#1f2937] rounded-xl p-6 space-y-4"
      >
        <Input
          label="Slug (unique)"
          value={form.slug}
          onChange={(v) => setForm({ ...form, slug: v })}
        />

        <Input
          label="Title"
          value={form.title}
          onChange={(v) => setForm({ ...form, title: v })}
        />

        <Select
          label="Difficulty"
          value={form.difficulty}
          options={["EASY", "MEDIUM", "HARD"]}
          onChange={(v) => setForm({ ...form, difficulty: v })}
        />

        <Textarea
          label="Description"
          value={form.description}
          onChange={(v) => setForm({ ...form, description: v })}
        />

        <Textarea
          label="Constraints"
          value={form.constraints}
          onChange={(v) => setForm({ ...form, constraints: v })}
        />

        <Textarea
          label="Input Format"
          value={form.inputFormat}
          onChange={(v) => setForm({ ...form, inputFormat: v })}
        />

        <Textarea
          label="Output Format"
          value={form.outputFormat}
          onChange={(v) => setForm({ ...form, outputFormat: v })}
        />

        <Input
          label="Tags (comma separated)"
          value={form.tags}
          onChange={(v) => setForm({ ...form, tags: v })}
        />

        <div className="grid grid-cols-2 gap-4">
          <NumberInput
            label="Time Limit (ms)"
            value={form.timeLimit}
            onChange={(v) => setForm({ ...form, timeLimit: v })}
          />
          <NumberInput
            label="Memory Limit (MB)"
            value={form.memoryLimit}
            onChange={(v) => setForm({ ...form, memoryLimit: v })}
          />
        </div>

        <CheckboxGroup
          label="Supported Languages"
          options={ALL_LANGUAGES}
          values={form.supportedLanguages}
          onChange={(vals) => setForm({ ...form, supportedLanguages: vals })}
        />

        <Toggle
          label="Publish Problem"
          value={form.isPublished}
          onChange={(v) => setForm({ ...form, isPublished: v })}
        />

        <div className="flex flex-wrap gap-3 pt-4">
          <button
            type="submit"
            className="bg-yellow-400 text-black px-4 py-2 rounded"
          >
            {isEditMode ? "Update Problem" : "Create Problem"}
          </button>

          {isEditMode && (
            <button
              type="button"
              onClick={() =>
                navigate("../problems/set/testcases", {
                  state: { problemId: id },
                })
              }
              className="bg-blue-500 px-4 py-2 rounded"
            >
              Set Testcases
            </button>
          )}

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="border border-[#2a2a2a] px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

/* ---------------- FIELD COMPONENTS ---------------- */

function Input({ label, value, onChange }) {
  return (
    <div>
      <label className="text-sm text-gray-400">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-[#0b0f19] border border-[#1f2937] rounded px-3 py-2 mt-1"
      />
    </div>
  );
}

function Textarea({ label, value, onChange }) {
  return (
    <div>
      <label className="text-sm text-gray-400">{label}</label>
      <textarea
        rows={4}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-[#0b0f19] border border-[#1f2937] rounded px-3 py-2 mt-1"
      />
    </div>
  );
}

function Select({ label, value, options, onChange }) {
  return (
    <div>
      <label className="text-sm text-gray-400">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-[#0b0f19] border border-[#1f2937] rounded px-3 py-2 mt-1"
      >
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}

function NumberInput({ label, value, onChange }) {
  return (
    <div>
      <label className="text-sm text-gray-400">{label}</label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full bg-[#0b0f19] border border-[#1f2937] rounded px-3 py-2 mt-1"
      />
    </div>
  );
}

function CheckboxGroup({ label, options, values, onChange }) {
  const toggle = (val) =>
    values.includes(val)
      ? onChange(values.filter((v) => v !== val))
      : onChange([...values, val]);

  return (
    <div>
      <label className="text-sm text-gray-400 block mb-2">{label}</label>
      <div className="flex flex-wrap gap-4">
        {options.map((o) => (
          <label key={o} className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={values.includes(o)}
              onChange={() => toggle(o)}
            />
            {o}
          </label>
        ))}
      </div>
    </div>
  );
}

function Toggle({ label, value, onChange }) {
  return (
    <div className="flex items-center justify-between border border-[#1f2937] rounded px-4 py-2">
      <span className="text-sm">{label}</span>
      <button
        type="button"
        onClick={() => onChange(!value)}
        className={`w-12 h-6 rounded-full relative ${
          value ? "bg-green-600" : "bg-gray-600"
        }`}
      >
        <span
          className={`absolute top-1 left-1 w-4 h-4 bg-white rounded transition ${
            value ? "translate-x-6" : ""
          }`}
        />
      </button>
    </div>
  );
}
