import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


const mockFetchProblemById = async (id) => {
  await new Promise((r) => setTimeout(r, 500));

  if (id !== "1") return null;

  return {
    title: "Two Sum",
    difficulty: "Easy",
    description: "Find two numbers that add up to target",
    constraints: "2 ≤ n ≤ 10^5",
    tags: "array,hashmap",
  };
};

export default function CreateEditProblem() {
  const { id } = useParams();
  const navigate = useNavigate();

  const isEditMode = Boolean(id);

  const [form, setForm] = useState({
    title: "",
    difficulty: "Easy",
    description: "",
    constraints: "",
    tags: "",
  });

  const [loading, setLoading] = useState(isEditMode);
  const [error, setError] = useState(null);


  useEffect(() => {
    if (!isEditMode) return;

    const loadProblem = async () => {
      try {
        const data = await mockFetchProblemById(id);

        if (!data) {
          setError("Problem not found");
          return;
        }

        setForm(data);
      } catch {
        setError("Failed to load problem");
      } finally {
        setLoading(false);
      }
    };

    loadProblem();
  }, [id, isEditMode]);


  if (error) {
    return (
      <div className="text-red-400">
        <p className="mb-4">{error}</p>
        <button
          onClick={() => navigate("/admin/control/problems")}
          className="underline"
        >
          Go back
        </button>
      </div>
    );
  }

  if (loading) {
    return <div className="text-gray-400">Loading problem...</div>;
  }

  const submit = async (e) => {
    e.preventDefault();

    try {
      if (isEditMode) {
        console.log("PUT /api/admin/problem/" + id, form);
      } else {
        console.log("POST /api/admin/problem", form);
      }

      navigate("../"); // /admin/control/problems
    } catch {
      alert("Failed to save problem");
    }
  };

  return (
    <div className="max-w-3xl">
      <h2 className="text-xl font-semibold mb-6">
        {isEditMode ? "Edit Problem" : "Create Problem"}
      </h2>

      <form
        onSubmit={submit}
        className="bg-[#111] border border-[#1f2937] rounded-xl p-6 space-y-4"
      >
        <Input
          label="Title"
          value={form.title}
          onChange={(v) => setForm({ ...form, title: v })}
        />

        <Select
          label="Difficulty"
          value={form.difficulty}
          options={["Easy", "Medium", "Hard"]}
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

        <Input
          label="Tags (comma separated)"
          value={form.tags}
          onChange={(v) => setForm({ ...form, tags: v })}
        />

      
        <div className="flex flex-wrap gap-3 pt-4">
          {/* CREATE / UPDATE */}
          <button
            type="submit"
            className="bg-yellow-400 text-black px-4 py-2 rounded"
          >
            {isEditMode ? "Update Problem" : "Create Problem"}
          </button>

          {/* SET TESTCASES (EDIT ONLY) */}
          {isEditMode && (
            <button
              type="button"
              onClick={() =>
                navigate("../problems/set/testcases", {
                  state: { problemId: id },
                })
              }
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Set Testcases
            </button>
          )}

          {/* CANCEL */}
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
