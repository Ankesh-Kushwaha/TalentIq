import { Briefcase } from "lucide-react";

const interviews = [
  {
    id: 1,
    company: "Google",
    role: "SDE Intern",
    author: "Sneha Gupta",
    difficulty: "Hard",
    summary:
      "2 DSA rounds, 1 system design. Focus was on graphs and optimization.",
  },
  {
    id: 2,
    company: "Amazon",
    role: "SDE-1",
    author: "Rohit Sharma",
    difficulty: "Medium",
    summary: "Mostly array and tree problems. Behavioral round was important.",
  },
];

export default function InterviewExperiencePage() {
  return (
    <div className="min-h-screen bg-[#0f0f0f] text-gray-200 px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6">Interview Experiences</h1>

        <div className="grid md:grid-cols-2 gap-6">
          {interviews.map((i) => (
            <div
              key={i.id}
              className="bg-[#111] border border-[#1f2937] rounded-xl p-6"
            >
              <div className="flex justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Briefcase size={16} />
                  <span className="font-medium text-white">{i.company}</span>
                </div>

                <span
                  className={`text-xs px-2 py-1 rounded ${
                    i.difficulty === "Hard"
                      ? "bg-red-900 text-red-300"
                      : "bg-yellow-900 text-yellow-300"
                  }`}
                >
                  {i.difficulty}
                </span>
              </div>

              <p className="text-sm text-gray-300 mb-3">
                <b>Role:</b> {i.role}
              </p>

              <p className="text-sm text-gray-400 mb-3">{i.summary}</p>

              <p className="text-xs text-gray-500">Shared by {i.author}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
