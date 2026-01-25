import { MessageSquare } from "lucide-react";

const discussions = [
  {
    id: 1,
    title: "Problem C explanation",
    author: "topcoder99",
    replies: 12,
  },
  {
    id: 2,
    title: "Is problem B wrong?",
    author: "ankesh_k",
    replies: 6,
  },
];

export default function ContestDiscussion() {
  return (
    <div className="min-h-screen bg-[#0f0f0f] text-gray-200 px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6">Contest Discussions</h1>

        {discussions.map((d) => (
          <div
            key={d.id}
            className="bg-[#111] border border-[#1f2937] rounded-xl p-5 mb-4"
          >
            <h2 className="text-lg text-white">{d.title}</h2>
            <div className="flex justify-between text-sm text-gray-400 mt-2">
              <span>by {d.author}</span>
              <span className="flex items-center gap-1">
                <MessageSquare size={14} /> {d.replies}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
