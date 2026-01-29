import { useState } from "react";

const SetContests = () => {
  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
    startTime: "",
    endTime: "",
    isPublic: true,
    isPublished: false,
    leaderboardEnabled: true,
    problems: [],
  });

  const [problemInput, setProblemInput] = useState("");

  /* ---------------- HANDLERS ---------------- */

  const update = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const addProblem = () => {
    if (!problemInput.trim()) return;
    update("problems", [...form.problems, problemInput.trim()]);
    setProblemInput("");
  };

  const removeProblem = (id) => {
    update(
      "problems",
      form.problems.filter((p) => p !== id),
    );
  };

  const submit = () => {
    console.log("Contest Payload:", form);

    /*
      POST /api/admin/contests
      body: form
    */
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Setup Contest</h2>
        <p className="text-sm text-gray-400">
          Create and control contests from here
        </p>
      </div>

      <div className="bg-[#111] border border-[#1f2937] rounded-xl p-6 space-y-4">
        {/* TITLE */}
        <Input
          label="Contest Title"
          value={form.title}
          onChange={(v) => update("title", v)}
        />

        {/* SLUG */}
        <Input
          label="Slug"
          value={form.slug}
          onChange={(v) => update("slug", v)}
          hint="Used in contest URL"
        />

        {/* DESCRIPTION */}
        <Textarea
          label="Description"
          value={form.description}
          onChange={(v) => update("description", v)}
        />

        {/* TIME WINDOW */}
        <div className="grid grid-cols-2 gap-4">
          <Input
            type="datetime-local"
            label="Start Time"
            value={form.startTime}
            onChange={(v) => update("startTime", v)}
          />
          <Input
            type="datetime-local"
            label="End Time"
            value={form.endTime}
            onChange={(v) => update("endTime", v)}
          />
        </div>

        {/* PROBLEMS */}
        <div>
          <label className="text-sm text-gray-400">
            Contest Problems (IDs)
          </label>

          <div className="flex gap-2 mt-1">
            <input
              value={problemInput}
              onChange={(e) => setProblemInput(e.target.value)}
              className="flex-1 bg-black border border-gray-700 rounded px-3 py-2"
              placeholder="Problem ID"
            />
            <button onClick={addProblem} className="bg-gray-700 px-3 rounded">
              Add
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mt-2">
            {form.problems.map((p) => (
              <span
                key={p}
                className="bg-gray-800 px-3 py-1 rounded flex items-center gap-2 text-sm"
              >
                {p}
                <button
                  onClick={() => removeProblem(p)}
                  className="text-red-400"
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* FLAGS */}
        <div className="grid grid-cols-2 gap-4">
          <Toggle
            label="Public Contest"
            checked={form.isPublic}
            onChange={(v) => update("isPublic", v)}
          />
          <Toggle
            label="Publish Contest"
            checked={form.isPublished}
            onChange={(v) => update("isPublished", v)}
          />
          <Toggle
            label="Leaderboard Enabled"
            checked={form.leaderboardEnabled}
            onChange={(v) => update("leaderboardEnabled", v)}
          />
        </div>

        {/* ACTIONS */}
        <div className="flex gap-3 pt-4">
          <button
            onClick={submit}
            className="bg-yellow-400 text-black px-4 py-2 rounded"
          >
            Save Contest
          </button>

          <button className="border px-4 py-2 rounded">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default SetContests;

/* ---------------- SMALL COMPONENTS ---------------- */

const Input = ({ label, value, onChange, type = "text", hint }) => (
  <div>
    <label className="text-sm text-gray-400">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-black border border-gray-700 rounded px-3 py-2 mt-1"
    />
    {hint && <p className="text-xs text-gray-500 mt-1">{hint}</p>}
  </div>
);

const Textarea = ({ label, value, onChange }) => (
  <div>
    <label className="text-sm text-gray-400">{label}</label>
    <textarea
      rows={4}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-black border border-gray-700 rounded px-3 py-2 mt-1"
    />
  </div>
);

const Toggle = ({ label, checked, onChange }) => (
  <label className="flex items-center gap-2 text-sm">
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
    />
    {label}
  </label>
);
