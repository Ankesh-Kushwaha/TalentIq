import { useState } from "react";
import { Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

/* MOCK DATA */
const initialProblems = [
  { id: 1, title: "Two Sum", difficulty: "Easy", tags: ["Array"] },
  { id: 2, title: "Longest Substring", difficulty: "Medium", tags: ["String"] },
  { id: 2, title: "Longest Substring", difficulty: "Medium", tags: ["String"] },
  { id: 2, title: "Longest Substring", difficulty: "Medium", tags: ["String"] },
  { id: 2, title: "Longest Substring", difficulty: "Medium", tags: ["String"] },
  { id: 2, title: "Longest Substring", difficulty: "Medium", tags: ["String"] },
  { id: 2, title: "Longest Substring", difficulty: "Medium", tags: ["String"] },
  { id: 2, title: "Longest Substring", difficulty: "Medium", tags: ["String"] },
  { id: 2, title: "Longest Substring", difficulty: "Medium", tags: ["String"] },
  { id: 2, title: "Longest Substring", difficulty: "Medium", tags: ["String"] },
  { id: 2, title: "Longest Substring", difficulty: "Medium", tags: ["String"] },
  { id: 2, title: "Longest Substring", difficulty: "Medium", tags: ["String"] },
];

export default function AdminProblems() {
  const [problems, setProblems] = useState(initialProblems);
  const navigate = useNavigate();

  const deleteProblem = (id) => {
    if (!confirm("Delete this problem?")) return;
    setProblems((prev) => prev.filter((p) => p.id !== id));
    // 🔗 DELETE /api/admin/problem/:id
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Problems</h2>

      <div className="bg-[#111] border border-[#1f2937] rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[#0b0f19] text-gray-400">
            <tr>
              <th className="px-4 py-3 text-left">Title</th>
              <th>Difficulty</th>
              <th>Tags</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {problems.map((p) => (
              <tr key={p.id} className="border-t border-[#1f2937]">
                <td className="px-4 py-3 text-white">{p.title}</td>
                <td className="text-center">{p.difficulty}</td>
                <td className="text-center text-gray-400">
                  {p.tags.join(", ")}
                </td>
                <td className="text-center flex justify-center gap-3 py-3">
                  <Edit
                    size={16}
                    className="cursor-pointer text-blue-400"
                    onClick={() => navigate(`/admin/problems/${p.id}/edit`)}
                  />
                  <Trash2
                    size={16}
                    className="cursor-pointer text-red-400"
                    onClick={() => deleteProblem(p.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {problems.length === 0 && (
          <div className="p-6 text-center text-gray-400">
            No problems found.
          </div>
        )}
      </div>
    </div>
  );
}
