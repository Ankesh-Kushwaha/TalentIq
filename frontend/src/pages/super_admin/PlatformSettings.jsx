import React, { useState } from "react";

/* ---------------- MOCK DATA (maps 1:1 to Language schema) ---------------- */

const initialLanguages = [
  {
    _id: "1",
    key: "cpp",
    name: "C++",
    dockerImage: "judge0/cpp",
    sourceFile: "main.cpp",
    compileCmd: "g++ main.cpp -O2 -o main",
    runCmd: "./main",
    timeLimit: 2000,
    memoryLimit: 256,
  },
  {
    _id: "2",
    key: "python",
    name: "Python 3",
    dockerImage: "judge0/python",
    sourceFile: "main.py",
    compileCmd: "",
    runCmd: "python3 main.py",
    timeLimit: 2000,
    memoryLimit: 256,
  },
];

export default function PlatformSettings() {
  const [languages, setLanguages] = useState(initialLanguages);
  const [editing, setEditing] = useState(null);

  const emptyLang = {
    key: "",
    name: "",
    dockerImage: "",
    sourceFile: "",
    compileCmd: "",
    runCmd: "",
    timeLimit: 2000,
    memoryLimit: 256,
  };

  const [form, setForm] = useState(emptyLang);

  /* ---------------- CRUD OPERATIONS ---------------- */

  const saveLanguage = () => {
    if (!form.key || !form.name || !form.dockerImage || !form.runCmd) {
      alert("Required fields missing");
      return;
    }

    if (editing) {
      setLanguages((prev) =>
        prev.map((l) => (l._id === editing ? { ...form, _id: editing } : l)),
      );
    } else {
      setLanguages((prev) => [...prev, { ...form, _id: crypto.randomUUID() }]);
    }

    setForm(emptyLang);
    setEditing(null);
  };

  const editLanguage = (lang) => {
    setForm(lang);
    setEditing(lang._id);
  };

  const deleteLanguage = (id) => {
    if (!confirm("Delete this judge container?")) return;
    setLanguages((prev) => prev.filter((l) => l._id !== id));
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold">Platform Settings</h2>
        <p className="text-sm text-gray-400">
          Manage judge workers, containers, and execution environments
        </p>
      </div>

      {/* ---------------- JUDGE WORKERS ---------------- */}
      <Section title="Judge Workers / Language Runtimes">
        {/* Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Language Key *"
            value={form.key}
            onChange={(v) => setForm({ ...form, key: v })}
          />
          <Input
            label="Display Name *"
            value={form.name}
            onChange={(v) => setForm({ ...form, name: v })}
          />

          <Input
            label="Docker Image *"
            value={form.dockerImage}
            onChange={(v) => setForm({ ...form, dockerImage: v })}
          />
          <Input
            label="Source File *"
            value={form.sourceFile}
            onChange={(v) => setForm({ ...form, sourceFile: v })}
          />

          <Input
            label="Compile Command"
            value={form.compileCmd}
            onChange={(v) => setForm({ ...form, compileCmd: v })}
          />
          <Input
            label="Run Command *"
            value={form.runCmd}
            onChange={(v) => setForm({ ...form, runCmd: v })}
          />

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

        <div className="flex justify-end gap-2 mt-4">
          {editing && (
            <button
              onClick={() => {
                setEditing(null);
                setForm(emptyLang);
              }}
              className="px-4 py-2 text-sm border border-[#1f2937] rounded"
            >
              Cancel
            </button>
          )}

          <button
            onClick={saveLanguage}
            className="bg-indigo-600 hover:bg-indigo-500 px-5 py-2 rounded text-sm"
          >
            {editing ? "Update Language" : "Add Language"}
          </button>
        </div>
      </Section>

      {/* ---------------- TABLE ---------------- */}
      <Section title="Registered Judge Containers">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#0b0b0b] text-gray-400">
              <tr>
                <th className="px-4 py-3 text-left">Key</th>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Docker Image</th>
                <th className="px-4 py-3 text-left">Run Cmd</th>
                <th className="px-4 py-3 text-left">Limits</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {languages.map((l) => (
                <tr
                  key={l._id}
                  className="border-t border-[#1f2937] hover:bg-[#0f172a]"
                >
                  <td className="px-4 py-3 font-mono">{l.key}</td>
                  <td className="px-4 py-3">{l.name}</td>
                  <td className="px-4 py-3 text-gray-400">{l.dockerImage}</td>
                  <td className="px-4 py-3 text-gray-400">{l.runCmd}</td>
                  <td className="px-4 py-3 text-gray-400">
                    {l.timeLimit}ms / {l.memoryLimit}MB
                  </td>

                  <td className="px-4 py-3 text-right space-x-2">
                    <button
                      onClick={() => editLanguage(l)}
                      className="text-xs text-indigo-400 hover:underline"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteLanguage(l._id)}
                      className="text-xs text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {languages.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-gray-500">
                    No judge workers registered
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Section>
    </div>
  );
}

/* ---------------- UI COMPONENTS ---------------- */

function Section({ title, children }) {
  return (
    <div className="bg-[#111] border border-[#1f2937] rounded p-6 space-y-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      {children}
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
        className="mt-1 w-full bg-[#0b0b0b] border border-[#1f2937] rounded px-3 py-2 text-sm"
      />
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
        className="mt-1 w-full bg-[#0b0b0b] border border-[#1f2937] rounded px-3 py-2 text-sm"
      />
    </div>
  );
}
